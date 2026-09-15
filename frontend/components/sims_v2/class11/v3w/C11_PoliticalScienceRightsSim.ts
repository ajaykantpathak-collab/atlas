import type { SimDef } from '../../engine/types';
import C11_PoliticalScienceRightsSim from '../../../simulations/c6_12/C11_PoliticalScienceRightsSim';

/** v3 wrapped master — C11_PoliticalScienceRightsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_politicalsciencerightssim: SimDef = {
    id: 'v3w_c11_politicalsciencerightssim',
    title: 'Rights',
    subtitle: 'This node covers the core definition of rights as socially recognised claims enforced by.',
    classLevel: 11, subject: 'political_science', topic: 'What are rights: Claims recognised by society and enforced by the state',
    chapters: [],
    nodeIds: ['c11_ps_cbse_05_001', 'c11_ps_cbse_05_002', 'c11_ps_cbse_05_003', 'c11_ps_cbse_05_004', 'c11_ps_cbse_05_005', 'c11_ps_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a student demanding the "right" to use a mobile phone during class because they feel it helps them.', goal: 'Master Rights.' },
    discovery: {
        question: 'A group of citizens demands the "right to high-speed internet" in their village.',
        options: ['Step 1: Check social recognition', 'yes because Digital India exists', 'no because it\'s a luxury'],
        answer: 'Step 1: Check social recognition',
        hook: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited.',
    },
    teaching: [
        { title: 'A right is a justified claim or entitlement.', text: 'A right is a justified claim or entitlement that is recognised by society as necessary for a life of dignity and self-respect, and which is enforced by the state through legal and constitutional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_001', title: 'A right is a justified claim or.',
          scaffold: { problem: 'A village panchayat passes a resolution banning women from using mobile phones in public, claiming it protects "cultural rights".',
            steps: [
            { text: 'Identify the competing claims — panchayat claims "cultural right" to regulate community norms; women claim right to.' },
            { text: 'Apply social recognition test — does the broader society (beyond the panchayat) recognise a community\'s "right" to.' },
            { text: 'Apply state enforcement test — does the state have a duty to enforce the panchayat\'s ban?' },
            { text: 'Determine the right-holder and duty-bearer — women are right-holders; state (including panchayat as local government).' },
            { text: 'Conclusion — the panchayat\'s claim fails both criteria; it is not a right but an illegal restriction.', faded: true, blankAnswer: 'The panchayat\'s claim is not a valid right; it violates.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_002', title: 'Moral rights are justified claims.',
          scaffold: { problem: 'A group of urban waste-pickers demands a "right to dignified livelihood" from the municipal corporation.',
            steps: [
            { text: 'Identify the claim — "right to dignified livelihood" — and its source: the waste-pickers assert it based on human.' },
            { text: 'Check legal recognition — no specific statute guarantees waste-pickers\' livelihood, but Olga Tellis v.' },
            { text: 'Determine enforceability — since Article 21 is justiciable, waste-pickers can file a writ petition under Article 226 in.' },
            { text: 'Assess moral dimension — even if the Court denies relief (e.g., citing "public interest"), the moral claim persists and.' },
            { text: 'Conclude — the waste-pickers possess both a moral right (grounded in dignity, recognized by Court as part of life) and.', faded: true, blankAnswer: 'The waste-pickers have both a moral right (grounded in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_003', title: 'Negative rights are claims that require.',
          scaffold: { problem: 'A municipal corporation demolishes a slum settlement without notice or rehabilitation to build a metro rail depot.',
            steps: [
            { text: 'Identify the rights invoked. Right to shelter/livelihood under Article 21 are positive rights (state must.' },
            { text: 'Identify the state obligations. Negative: Corporation must not act arbitrarily — must follow procedure (notice,.' },
            { text: 'Apply constitutional standards. *Olga Tellis* (1985): Eviction without rehabilitation violates Article 21.' },
            { text: 'Analyse the conflict. The corporation\'s statutory power (public purpose) clashes with residents\' positive right to.' },
            { text: 'Conclusion. The demolition without rehabilitation violates both negative (procedural) and positive (substantive).', faded: true, blankAnswer: 'The residents\' negative right (protection from arbitrary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_004', title: 'Natural rights theory, as articulated.',
          scaffold: { problem: 'The Municipal Corporation of Delhi (MCD) issues a notification that all street vendors must pay a monthly "licence fee" of ₹5,000 or face.',
            steps: [
            { text: 'Identify the natural right at stake — Locke includes "property" broadly as "life, liberty, and estate"; livelihood.' },
            { text: 'Determine the state of nature baseline — vendors mixing labour with public space to create value have a pre-political.' },
            { text: 'Examine the social contract terms — government is trustee of natural rights; regulation must protect, not destroy, the.' },
            { text: 'Assess the MCD action — a ₹5,000 fee with no alternative vending zones effectively prohibits the exercise of the right;.' },
            { text: 'Conclude — the notification breaches the fiduciary trust; vendors retain a Lockean right to resist (petition, protest,.', faded: true, blankAnswer: 'The MCD notification violates the social contract because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_005', title: 'The Universal Declaration of Human.',
          scaffold: { problem: 'A Class 11 student reads a newspaper editorial arguing: "The UDHR is outdated because it was written by victorious Western powers in 1948.',
            steps: [
            { text: 'Identify the core claim — cultural relativism challenge to universality.' },
            { text: 'Recall the drafting committee composition — Eleanor Roosevelt (USA), René Cassin (France), Charles Malik (Lebanon),.' },
            { text: 'Examine UDHR Preamble and Article 29 — Preamble mentions "duties to the community"; Article 29(1) explicitly states.' },
            { text: 'Note that the UDHR was adopted by the UN General Assembly with 48 in favor, 0 against, 8 abstentions (Soviet bloc,.' },
            { text: 'Conclude that the critique misrepresents both the inclusive drafting process and the text\'s own recognition of.', faded: true, blankAnswer: 'The editorial\'s claim is historically inaccurate and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_05_006', title: 'Civil rights are protections guaranteed.',
          scaffold: { problem: 'A state government passes a law requiring all public protests to get prior police permission 30 days in advance.',
            steps: [
            { text: 'Identify the right affected: the right to assemble peaceably (Article 19(1)(b)) and the right to freedom of speech.' },
            { text: 'Classify these rights: Article 19(1)(a) and (b) are civil liberties (civil rights) because they protect individual.' },
            { text: 'Recognize that the right to protest is also a political right because it enables citizens to express dissent and.' },
            { text: 'Examine the restriction: The 30-day prior permission requirement is a prior restraint that effectively nullifies.' },
            { text: 'Check constitutional validity: Article 19(2) and (3) allow reasonable restrictions on grounds of public order, but the.' },
            { text: 'Conclude: The law violates both civil rights (freedom of assembly/speech) and political rights (ability to participate.', faded: true, blankAnswer: 'The law violates both civil and political rights. It.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_ps_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Rights', spots: [
            { id: 's1', label: 'A right is a justified', prompt: 'Which idea is this? — A right is a justified claim or entitlement that is recognised by society as necessary.', answer: 'A right is a justified', options: ['A right is a justified', 'Moral rights are justified claims', 'Negative rights are claims that', 'Natural rights theory as articulated'] },
            { id: 's2', label: 'Moral rights are justified claims', prompt: 'Which idea is this? — Moral rights are justified claims grounded in ethical principles, human dignity, and.', answer: 'Moral rights are justified claims', options: ['Moral rights are justified claims', 'A right is a justified', 'Negative rights are claims that', 'Natural rights theory as articulated'] },
            { id: 's3', label: 'Negative rights are claims that', prompt: 'Which idea is this? — Negative rights are claims that require the state to refrain from interfering in an.', answer: 'Negative rights are claims that', options: ['Negative rights are claims that', 'A right is a justified', 'Moral rights are justified claims', 'Natural rights theory as articulated'] },
            { id: 's4', label: 'Natural rights theory as articulated', prompt: 'Which idea is this? — Natural rights theory, as articulated by John Locke, posits that individuals possess.', answer: 'Natural rights theory as articulated', options: ['Natural rights theory as articulated', 'A right is a justified', 'Moral rights are justified claims', 'Negative rights are claims that'] },
            { id: 's5', label: 'The Universal Declaration of Human', prompt: 'Which idea is this? — The Universal Declaration of Human Rights (UDHR), adopted by the UN General Assembly on.', answer: 'The Universal Declaration of Human', options: ['The Universal Declaration of Human', 'A right is a justified', 'Moral rights are justified claims', 'Negative rights are claims that'] },
            { id: 's6', label: 'Civil rights are protections guaranteed', prompt: 'Which idea is this? — Civil rights are protections guaranteed by the state to ensure individual freedom and.', answer: 'Civil rights are protections guaranteed', options: ['Civil rights are protections guaranteed', 'A right is a justified', 'Moral rights are justified claims', 'Negative rights are claims that'] }
          ] } }
    ],
    explore: { component: C11_PoliticalScienceRightsSim, prompt: 'Explore the interactive — Rights' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_001', difficulty: 'standard',
          question: 'A right is a justified claim or entitlement that is recognised by society as.',
          hint: 'Revisit Class 10 "Dignity and Freedom of Citizens in a Democracy" (c10_civ_cbse_05_005).',
          misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited.',
          parts: [
                { id: 'a', prompt: 'A group of citizens demands the "right to high-speed internet" in their village.', answer: 'Step 1: Check social recognition',
                  options: ['Step 1: Check social recognition', 'yes because Digital India exists', 'no because it\'s a luxury'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' },
                { id: 'b', prompt: 'Compare the claim "right to life" and "right to drive a car at any speed".', answer: 'Right to life: universally recognised as essential for dignity',
                  options: ['Right to life: universally recognised as essential for dignity', 'freedoms', 'right to bunk class'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' }
          ],
            remediations: { 'any-strong-personal-desire-or': { steps: ['If a student conflates wants with rights, use the textbook\'s three-step test: (1) Is the claim necessary for.', '(2) Does society broadly agree it is necessary?', '(3) Does it impose a correlative duty on the state?', 'Apply to "right to smoke" — fails (1) health harm, (3) harms others\' right to health.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rights are gifts given by the government to citizens." Use the concept of rights as claims recognised by society to justify your.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'right to bunk class', 'right to unlimited data', 'any strong personal desire or preference (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' },
                { id: 'b', prompt: 'Compare the claim "right to life" and "right to drive a car at any speed".', answer: 'Right to life: universally recognised as essential for dignity',
                  options: ['Right to life: universally recognised as essential for dignity', 'freedoms', 'right to bunk class', 'right to unlimited data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' }
          ],
            remediations: { 'any-strong-personal-desire-or': { steps: ['If a student conflates wants with rights, use the textbook\'s three-step test: (1) Is the claim necessary for.', '(2) Does society broadly agree it is necessary?', '(3) Does it impose a correlative duty on the state?', 'Apply to "right to smoke" — fails (1) health harm, (3) harms others\' right to health.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_002', difficulty: 'standard',
          question: 'Moral rights are justified claims grounded in ethical principles, human.',
          hint: 'Revisit c11_ps_cbse_05_001 (What are rights) and c6_civics_ch10_002 (Fundamental Rights.',
          misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate.',
          parts: [
                { id: 'a', prompt: 'A student says: "The right to clean air is a Fundamental Right under Article 21 because the Supreme Court said so in Subhash Kumar v. State of Bihar (1991).', answer: 'No, the student is incorrect',
                  options: ['No, the student is incorrect', 'not a real right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' },
                { id: 'b', prompt: 'A tribal community in a Schedule V area claims a "moral right" to protect their sacred forest from mining, citing their cultural identity and the Forest Rights.', answer: 'The community\'s claim is both a moral right (grounded in cultural dignity,',
                  options: ['The community\'s claim is both a moral right (grounded in cultural dignity,', 'not a real right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' }
          ],
            remediations: { 'if-a-right-is-not': { steps: ['Have the student read the Puttaswamy judgment\'s reference to "natural rights" and "inalienable rights" in paragraphs.', 'Assign a mini-case study of the Right to Information movement — trace how a moral claim (citizens\' right to know).', 'Ask the student to identify one moral right in their school context (e.g., "right to be heard before punishment") that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Legal rights are superior to moral rights because only legal rights can be enforced by courts." Consider the role of moral rights in.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'not a real right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' },
                { id: 'b', prompt: 'Draft a one-paragraph argument that a student could use in a school debate to justify why "the right to dissent" should be recognized as both a moral right.', answer: 'A strong answer will: (1) Define moral right to dissent using Kantian dignity',
                  options: ['A strong answer will: (1) Define moral right to dissent using Kantian dignity', 'not a real right'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' }
          ],
            remediations: { 'if-a-right-is-not': { steps: ['Have the student read the Puttaswamy judgment\'s reference to "natural rights" and "inalienable rights" in paragraphs.', 'Assign a mini-case study of the Right to Information movement — trace how a moral claim (citizens\' right to know).', 'Ask the student to identify one moral right in their school context (e.g., "right to be heard before punishment") that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_003', difficulty: 'standard',
          question: 'Negative rights are claims that require the state to refrain from interfering.',
          hint: 'Revisit Article 19 (freedoms) and Article 21 (life/liberty) for negative rights; Article.',
          misconception: 'Students often believe \'negative rights = civil/political rights (always justiciable)\' and \'positive rights =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Negative rights are claims that require the state to refrain from interfering in an',
                  options: ['Negative rights are claims that require the state to refrain from interfering in an', 'A right is a justified claim or entitlement that is recognised by society as necessary', 'Moral rights are justified claims grounded in ethical principles, human dignity, and', 'Natural rights theory, as articulated by John Locke, posits that individuals possess'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe \'negative rights = civil/political rights (always justiciable)\' and \'positive rights = economic/social rights (never.' }
          ],
            remediations: { 'negative-rights-civil-political-rights': { steps: ['Re-read Article 21 (\'No person shall be deprived of life or personal liberty except according to procedure established.', 'List three state actions required by Article 21A (build schools, train teachers, mid-day meals) and three state.', 'Read the *PUCL v. Union of India* (2001) right to food case summary — note how the Court converted Directive Principles.', 'Write two columns: \'State MUST NOT\' vs \'State MUST\' — place each example in the correct column.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_004', difficulty: 'standard',
          question: 'Natural rights theory, as articulated by John Locke, posits that individuals.',
          hint: 'Revisit c11_ps_cbse_05_002\'s distinction: moral rights are claims we make *on* the legal.',
          misconception: 'Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war of all against all").',
          parts: [
                { id: 'a', prompt: 'According to Locke, what are the three natural rights individuals possess in the state of nature, and what makes them "inalienable"?', answer: 'The three natural rights are life, liberty, and property',
                  options: ['The three natural rights are life, liberty, and property', 'rights granted by the Constitution', 'state of nature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war of all against all") rather than a.' }
          ],
            remediations: { 'locke-s-state-of-nature': { steps: ['Re-read NCERT 5.2 ("Where Do Rights Come From?") — note the phrase "rights were not conferred by a ruler or a society,.', 'Draw a two-column table: "Pre-contract (State of Nature)" vs. "Post-contract (Civil Society)." In the left column,.', 'Apply to a current news item (e.g., a demolition drive without notice) — ask: "Which column does the violated claim.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_005', difficulty: 'standard',
          question: 'The Universal Declaration of Human Rights (UDHR), adopted by the UN General.',
          hint: 'Revisit c11_ps_cbse_05_001 (definition of rights as entitlements for dignity) and.',
          misconception: 'Students often think the UDHR is a legally binding treaty that countries sign and ratify like the ICCPR.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Universal Declaration of Human Rights (UDHR), adopted by the UN General Assembly on',
                  options: ['The Universal Declaration of Human Rights (UDHR), adopted by the UN General Assembly on', 'A right is a justified claim or entitlement that is recognised by society as necessary', 'Moral rights are justified claims grounded in ethical principles, human dignity, and', 'Negative rights are claims that require the state to refrain from interfering in an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the UDHR is a legally binding treaty that countries sign and ratify like the ICCPR.' }
          ],
            remediations: { 'the-udhr-is-a-legally': { steps: ['Show the student the UN document symbol "A/RES/217(III)A" and explain that "RES" means resolution, not "TREATY" or.', 'Contrast with the ICCPR (adopted 1966, entered force 1976) — have them check the UN Treaty Collection website to see.', 'Use the Indian example: Article 21 UDHR (right to democracy) → Article 19-22 Indian Constitution (enforceable.', 'Assign a one-paragraph writing task: "Explain why the UDHR\'s non-binding nature did not prevent it from becoming the.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_006', difficulty: 'standard',
          question: 'Civil rights are protections guaranteed by the state to ensure individual.',
          hint: 'If stuck, review Article 19 (six freedoms) and Article 326 (universal adult franchise).',
          misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.',
          parts: [
                { id: 'a', prompt: 'What is the primary constitutional basis for political rights in India, and which article guarantees universal adult franchise?', answer: 'The primary constitutional basis for political rights in India is Article 326',
                  options: ['The primary constitutional basis for political rights in India is Article 326', 'civil rights and political rights are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' },
                { id: 'b', prompt: 'Explain why the right to a fair trial (Article 21) is considered a civil right and not a political right, even though it involves the state.', answer: 'The right to a fair trial is a civil right',
                  options: ['The right to a fair trial is a civil right', 'civil rights and political rights are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' },
                { id: 'c', prompt: 'A journalist is arrested for criticizing government policy. Identify which specific civil and political rights are violated, citing constitutional articles.', answer: 'The arrest violates the civil right to freedom of speech and expression (Article',
                  options: ['The arrest violates the civil right to freedom of speech and expression (Article', 'civil rights and political rights are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' }
          ],
            remediations: { 'civil-rights-and-political-rights': { steps: ['If a student conflates the two, have them create a two-column table: Column A "Civil Rights" (protections from state),.', 'Fill with examples from Articles 19-22 and 326.', 'Then ask: "If Article 19(1)(a) is suspended, which column is affected?" Guide them to see it affects both.', 'Use the Emergency (1975-77) as a case study where both were suspended.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A country can have political rights without civil rights, but not civil rights without political rights." Use Indian constitutional.', answer: 'The statement is false',
                  options: ['The statement is false', 'civil rights and political rights are the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' }
          ],
            remediations: { 'civil-rights-and-political-rights': { steps: ['If a student conflates the two, have them create a two-column table: Column A "Civil Rights" (protections from state),.', 'Fill with examples from Articles 19-22 and 326.', 'Then ask: "If Article 19(1)(a) is suspended, which column is affected?" Guide them to see it affects both.', 'Use the Emergency (1975-77) as a case study where both were suspended.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
