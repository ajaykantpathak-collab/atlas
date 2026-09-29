import type { SimDef } from '../../engine/types';
import C9_SocialScienceWorkingOfInstitutionsSim from '../../../simulations/c6_12/C9_SocialScienceWorkingOfInstitutionsSim';

/** v3 wrapped master — C9_SocialScienceWorkingOfInstitutionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_socialscienceworkingofinstitutionssim: SimDef = {
    id: 'v3w_c9_socialscienceworkingofinstitutionssim',
    title: 'Constitution: Role in a Democracy',
    subtitle: 'Covers the Constitution\'s role as the foundational legal-political framework in a.',
    classLevel: 9, subject: 'science', topic: 'Constitution: Role in a Democracy',
    chapters: [],
    nodeIds: ['c9_civ_ch1_3', 'c9_civ_ch1_10', 'c9_civ_ch1_8', 'c9_civ_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you see a news headline: "State Government Passes Law Banning All Protests in Capital City." Ask:.', goal: 'Master Constitution: Role in a Democracy.' },
    discovery: {
        question: 'Draft a one-paragraph preamble for a new democratic constitution of a diverse country that has just ended a dictatorship.',
        options: ['A good preamble would include: (1) source of authority ("We the people..."), (2)', 'constitutional amendment', 'ordinary law-making'],
        answer: 'A good preamble would include: (1) source of authority ("We the people..."), (2)',
        hook: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
    },
    teaching: [
        { title: 'A constitution in a democracy is the supreme.', text: 'A constitution in a democracy is the supreme fundamental law that establishes the structure of government, defines and limits the powers of each organ (legislature, executive, judiciary), guarantees.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_civ_ch1_3', title: 'A constitution in a democracy is the.',
          scaffold: { problem: 'The central government passes a law giving the Prime Minister power to dismiss any state government without Governor\'s report or.',
            steps: [
            { text: 'Identify the political situation — a central law attempting to centralize power to dismiss state governments, bypassing.' },
            { text: 'Recall the relevant constitutional provisions — Article 356 allows President\'s Rule only on Governor\'s report or.' },
            { text: 'Apply the principle of federalism as part of the basic structure — the Constitution distributes power between centre.' },
            { text: 'Analyze the roles — the Constitution (not Parliament) defines the federal scheme; Parliament cannot amend this core.' },
            { text: 'Conclude — the law is unconstitutional because it violates the federal basic structure and circumvents Article 356; the.', faded: true, blankAnswer: 'The law is unconstitutional. It violates the federal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_civ_ch1_10', title: 'Local Governance in India refers to the.',
          scaffold: { problem: 'A citizen in a village finds that the Gram Panchayat has not held elections for 6 years.',
            steps: [
            { text: 'Identify the constitutional mandate for regular elections — Article 243E states every Panchayat shall continue for five.' },
            { text: 'Recognize that "administrative delays" are not a valid ground for postponement — the State Election Commission (Article.' },
            { text: 'Determine the violated Articles — Article 243E (duration), Article 243K (SEC independence), and Article 324 (ECI.' },
            { text: 'Identify the remedy — The citizen can file a writ petition (mandamus) in the High Court under Article 226 compelling.' },
            { text: 'Conclude that the 73rd Amendment makes local elections a constitutional right, not a government privilege; judicial.', faded: true, blankAnswer: 'The citizen can approach the High Court under Article 226.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_civ_ch1_8', title: 'The media in a democracy acts as the.',
          scaffold: { problem: 'A regional news channel runs a week-long prime-time campaign alleging that a specific opposition MLA has "links with criminals," citing.',
            steps: [
            { text: 'Identify the democratic function claimed — watchdog role (exposing criminal-politician nexus).' },
            { text: 'Check adherence to journalistic standards — anonymous sources without corroboration, no right to reply aired, sustained.' },
            { text: 'Apply Article 19(2) — defamation is a reasonable restriction; the channel must prove truth/public good defense in court.' },
            { text: 'Assess impact on democratic discourse — trial by media undermines presumption of innocence (Article 21), polarizes.' },
            { text: 'Conclude — this harms democracy because it substitutes institutional accountability (police, courts, ethics committees).', faded: true, blankAnswer: 'The reporting harms democracy. While exposing corruption is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_civ_ch1_9', title: 'Federalism in India is a constitutional.',
          scaffold: { problem: 'The Union Government passes a law on "Regulation of Coaching Centres" under Entry 25 of Concurrent List ("Education").',
            steps: [
            { text: 'Identify the competing entries – Union relies on Concurrent List Entry 25 ("Education"), State relies on State List.' },
            { text: 'Recall the "pith and substance" doctrine: courts examine the *true character and nature* of the legislation, not its.' },
            { text: 'Analyze the law\'s primary purpose – if the law regulates curriculum, fees, teacher qualifications of coaching centres,.' },
            { text: 'Apply precedent – Supreme Court in *State of Maharashtra v. Bharat Shanti Lal Shah* (2008) upheld a Central law on.' },
            { text: 'Conclude – Union law is valid; incidental encroachment on State List does not invalidate it if the core falls in.', faded: true, blankAnswer: 'The Union law is constitutionally valid. Its dominant.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_civ_ch1_10', title: 'Identify each idea',
          dissect: { specimen: 'Constitution: Role in a Democracy', spots: [
            { id: 's1', label: 'A constitution in a democracy', prompt: 'Which idea is this? — A constitution in a democracy is the supreme fundamental law that establishes the.', answer: 'A constitution in a democracy', options: ['A constitution in a democracy', 'Local Governance in India refers', 'The media in a democracy', 'Federalism in India is a'] },
            { id: 's2', label: 'Local Governance in India refers', prompt: 'Which idea is this? — Local Governance in India refers to the constitutionally mandated third tier of.', answer: 'Local Governance in India refers', options: ['Local Governance in India refers', 'A constitution in a democracy', 'The media in a democracy', 'Federalism in India is a'] },
            { id: 's3', label: 'The media in a democracy', prompt: 'Which idea is this? — The media in a democracy acts as the "fourth estate" — an independent institution that.', answer: 'The media in a democracy', options: ['The media in a democracy', 'A constitution in a democracy', 'Local Governance in India refers', 'Federalism in India is a'] },
            { id: 's4', label: 'Federalism in India is a', prompt: 'Which idea is this? — Federalism in India is a constitutional system of governance where legislative,.', answer: 'Federalism in India is a', options: ['Federalism in India is a', 'A constitution in a democracy', 'Local Governance in India refers', 'The media in a democracy'] }
          ] } }
    ],
    explore: { component: C9_SocialScienceWorkingOfInstitutionsSim, prompt: 'Explore the interactive — Constitution: Role in a Democracy' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch1_3', difficulty: 'standard',
          question: 'A constitution in a democracy is the supreme fundamental law that establishes.',
          hint: 'Revisit Article 13 (voidness of laws inconsistent with Fundamental Rights) and the.',
          misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution in a democracy is the supreme fundamental law that establishes the',
                  options: ['A constitution in a democracy is the supreme fundamental law that establishes the', 'Local Governance in India refers to the constitutionally mandated third tier of', 'The media in a democracy acts as the "fourth estate"', 'Federalism in India is a constitutional system of governance where legislative,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its equally critical.' }
          ],
            remediations: { 'the-constitution-is-primarily-a': { steps: ['Give the student two short texts — Article 79 (Parliament constitution) and Article 13 (voidness of rights-violating.', 'Use a concrete case: the 2020 farm laws (repealed) vs. a hypothetical law banning a religion.', 'Have the student complete a table: Column A — Constitutional Provisions that Create Power (cite article); Column B —.', 'Discuss why the amendment procedure (Article 368) is stricter than ordinary law-making — connect to the idea that the.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph preamble for a new democratic constitution of a diverse country that has just ended a dictatorship.', answer: 'A good preamble would include: (1) source of authority ("We the people..."), (2)',
                  options: ['A good preamble would include: (1) source of authority ("We the people..."), (2)', 'constitutional amendment', 'ordinary law-making'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its equally critical.' }
          ],
            remediations: { 'the-constitution-is-primarily-a': { steps: ['Give the student two short texts — Article 79 (Parliament constitution) and Article 13 (voidness of rights-violating.', 'Use a concrete case: the 2020 farm laws (repealed) vs. a hypothetical law banning a religion.', 'Have the student complete a table: Column A — Constitutional Provisions that Create Power (cite article); Column B —.', 'Discuss why the amendment procedure (Article 368) is stricter than ordinary law-making — connect to the idea that the.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_10', difficulty: 'standard',
          question: 'Local Governance in India refers to the constitutionally mandated third tier of.',
          hint: 'If stuck, revisit **Article 40 (Directive Principle)** and **Articles 243G/243W.',
          misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects**.',
          parts: [
                { id: 'a', prompt: 'What are the two Constitutional Amendment Acts that granted constitutional status to Panchayati Raj Institutions and Municipalities in India, and in which year.', answer: 'The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th',
                  options: ['The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th', '42nd Amendment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects** (Eleventh/Twelfth.' },
                { id: 'b', prompt: 'Why did the Constitution originally not include local self-government as a mandatory tier, and what changed with the 73rd and 74th Amendments?', answer: 'Originally, local government was a Directive Principle (Article 40)',
                  options: ['Originally, local government was a Directive Principle (Article 40)', 'It was always in Fundamental Rights'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects** (Eleventh/Twelfth.' }
          ],
            remediations: { 'the-73rd-74th-amendments-automatically': { steps: ['Read Article 243G (Panchayats) and 243W (Municipalities) verbatim — note the phrase "subject to the provisions of this.', 'Pick your state\'s Panchayat/Municipal Act (e.g., UP Panchayat Raj Act, 1947 as amended; Maharashtra Municipal.', 'Find the latest State Finance Commission report (available on state finance department websites) — check the.', 'Write a 3-point comparison: Constitutional Schedule vs. State Act vs. Actual Practice.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_8', difficulty: 'standard',
          question: 'The media in a democracy acts as the "fourth estate" — an independent.',
          hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights in a Democracy) and c8_civ_ch4_7 (Right to.',
          misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article.',
          parts: [
                { id: 'a', prompt: 'A newspaper publishes an investigative report alleging corruption in a government housing scheme, based on documents obtained via an RTI application.', answer: 'Yes, it strengthens democracy',
                  options: ['Yes, it strengthens democracy', 'freedom of press', 'media freedom means media can publish anything without consequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article 19(1)(a) (right) with.' }
          ],
            remediations: { 'media-freedom-means-media-can': { steps: ['Show a real example — a 2023 news debate discussing a pending Supreme Court case on electoral bonds, violating the sub.', 'Have the student locate Article 19(2) "contempt of court" and "administration of justice" as grounds for restriction.', 'Ask: "If media tries the case publicly, how does that hurt the accused\'s right to fair trial (Article 21)?"', 'Conclude: Media freedom is not absolute; it is balanced against other democratic rights.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the Press Council of India (PCI) in ensuring media accountability. Cite one structural limitation and one functional limitation.', answer: 'The PCI has limited effectiveness',
                  options: ['The PCI has limited effectiveness', 'PCI is effective', 'media freedom means media can publish anything without consequences', '"media freedom means media can publish anything without consequences'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "media freedom means media can publish anything without consequences." They confuse Article 19(1)(a) (right) with.' }
          ],
            remediations: { 'media-freedom-means-media-can': { steps: ['Show a real example — a 2023 news debate discussing a pending Supreme Court case on electoral bonds, violating the sub.', 'Have the student locate Article 19(2) "contempt of court" and "administration of justice" as grounds for restriction.', 'Ask: "If media tries the case publicly, how does that hurt the accused\'s right to fair trial (Article 21)?"', 'Conclude: Media freedom is not absolute; it is balanced against other democratic rights.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_9', difficulty: 'standard',
          question: 'Federalism in India is a constitutional system of governance where legislative,.',
          hint: 'Revisit Class 6 \'Levels of Government: National, State, Local\' (c6_civics_ch11_013) and.',
          misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Federalism in India is a constitutional system of governance where legislative,',
                  options: ['Federalism in India is a constitutional system of governance where legislative,', 'A constitution in a democracy is the supreme fundamental law that establishes the', 'Local Governance in India refers to the constitutionally mandated third tier of', 'The media in a democracy acts as the "fourth estate"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government gives powers to.' }
          ],
            remediations: { 'federalism-states-have-sovereign-powers': { steps: ['Read Article 1 ("India, that is Bharat, shall be a Union of States") and Article 3 (Parliament can form new.', 'Create a two-column table: "Federal Features" (written constitution, division of powers, independent judiciary,.', 'For decentralisation, read Article 243E ("duration of Panchayats...', 'Re-attempt Diagnostic Q5 and Q6.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The 73rd Amendment made Panchayats truly independent of State Government control." Support your judgment with two constitutional.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'fully independent', 'may devolve', 'Federalism = States have sovereign powers like in the USA'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Federalism = States have sovereign powers like in the USA" and "Decentralisation = State Government gives powers to.' }
          ],
            remediations: { 'federalism-states-have-sovereign-powers': { steps: ['Read Article 1 ("India, that is Bharat, shall be a Union of States") and Article 3 (Parliament can form new.', 'Create a two-column table: "Federal Features" (written constitution, division of powers, independent judiciary,.', 'For decentralisation, read Article 243E ("duration of Panchayats...', 'Re-attempt Diagnostic Q5 and Q6.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
