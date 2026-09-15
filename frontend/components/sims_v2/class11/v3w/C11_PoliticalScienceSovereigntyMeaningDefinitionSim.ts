import type { SimDef } from '../../engine/types';
import C11_PoliticalScienceSovereigntyMeaningDefinitionSim from '../../../simulations/c6_12/C11_PoliticalScienceSovereigntyMeaningDefinitionSim';

/** v3 wrapped master — C11_PoliticalScienceSovereigntyMeaningDefinitionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_politicalsciencesovereigntymeaningdefinitionsim: SimDef = {
    id: 'v3w_c11_politicalsciencesovereigntymeaningdefinitionsim',
    title: 'Sovereignty Meaning Definition',
    subtitle: 'This node covers the core functions and importance of a constitution in a democratic.',
    classLevel: 11, subject: 'political_science', topic: 'Why do we need a constitution: Functions and importance',
    chapters: [],
    nodeIds: ['c11_ps_cbse_10_002', 'c11_ps_cbse_09_010', 'c11_ps_cbse_07_004', 'c11_ps_cbse_06_002', 'c11_ps_cbse_06_010', 'c11_ps_cbse_01_003', 'c11_ps_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are playing a cricket match without any agreed-upon rules: no fixed number of players, no.', goal: 'Master Sovereignty Meaning Definition.' },
    discovery: {
        question: 'Compare and contrast the role of "reason" in Political Theory versus its role in Mathematics, based on the NCERT\'s reference to Socrates and the statement:.',
        options: ['In Mathematics, reason operates on fixed, abstract axioms to derive necessary,', 'both use logic so they are the same', 'learning what famous dead philosophers like Plato or Marx said'],
        answer: 'In Mathematics, reason operates on fixed, abstract axioms to derive necessary,',
        hook: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e.,.',
    },
    teaching: [
        { title: 'A constitution is the fundamental law of a.', text: 'A constitution is the fundamental law of a country that establishes the framework of government, defines the relationship between different organs of government (legislature, executive, judiciary),.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ps_cbse_10_002', title: 'A constitution is the fundamental law.',
          scaffold: { problem: 'A newly independent country \'Navaland\' is drafting its first constitution.',
            steps: [
            { text: 'Identify the two core functions in debate: (a) establishing government structure (institutional design) and (b).' },
            { text: 'Recall that the Indian Constitution does both: Parts III (Fundamental Rights) and IV (Directive Principles) for rights;.' },
            { text: 'Apply the principle of constitutionalism: without structural checks (independent judiciary, separation of powers),.' },
            { text: 'Analyze the Navaland scenario: if they omit rights, the government could legally suppress dissent; if they omit.' },
            { text: 'Conclude that a constitution must perform both functions simultaneously – the Indian model integrates them (e.g.,.', faded: true, blankAnswer: 'Both functions are essential. The Indian Constitution.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_09_010', title: 'Human security is a paradigm that.',
          scaffold: { problem: 'Country X has a powerful military and nuclear weapons (ranked 4th globally) but ranks 130th on the Human Development Index.',
            steps: [
            { text: 'Identify the state-security claim: nuclear deterrent protects sovereignty from external attack.' },
            { text: 'Recall the seven dimensions of human security from UNDP 1994.' },
            { text: 'Map Country X\'s conditions: lack of clean water = environmental & health security failure; high maternal mortality =.' },
            { text: 'Compare referent objects: state security protects the regime/territory; human security protects the people.' },
            { text: 'Conclude: Country X has high state security but critically low human security.', faded: true, blankAnswer: 'Country X is state-secure but human-insecure. Nuclear.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_07_004', title: 'The French Revolution (1789).',
          scaffold: { problem: 'A 2024 board exam asks: "The French Revolution created the modern nation-state not by discovering a pre-existing French \'people\' but by.',
            steps: [
            { text: 'Identify the theoretical claim—nations are constructed (imagined), not primordial.' },
            { text: 'Select Measure 1—1789 Declaration Article 3: legally constitutes \'the nation\' as sovereign subject, replacing the.' },
            { text: 'Select Measure 2—1790/1791 Citizenship Laws: define who belongs (born in France, naturalized foreigners) regardless of.' },
            { text: 'Select Measure 3—1793 Levée en masse + 1794 Fêtes de la Fédération: turn abstract citizenship into lived ritual (mass.' },
            { text: 'Synthesize—each measure *creates* the very \'French people\' it claims to represent; no \'French nation\' existed legally.', faded: true, blankAnswer: 'The statement is accurate. The Revolution invented the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_010', title: 'Dual citizenship refers to the legal.',
          scaffold: { problem: 'Rahul, born in 2005 in New Jersey to Indian parents on H-1B visas, holds a US passport (jus soli) and an Indian passport (parents.',
            steps: [
            { text: 'Identify Rahul\'s citizenship status — he holds dual nationality by operation of two countries\' laws (US jus soli,.' },
            { text: 'Recall Article 9 Constitution: voluntary acquisition of foreign citizenship terminates Indian citizenship.' },
            { text: 'Check Section 9 Citizenship Act: "Any citizen of India who by naturalization, registration otherwise voluntarily.' },
            { text: 'Examine judicial interpretation: Supreme Court (2019, Dhananjay Kumar vs Union of India) held that automatic.' },
            { text: 'Check IFS eligibility: Requires Indian citizenship (single). Rahul qualifies as Indian citizen.' },
            { text: 'Conclusion: Rahul is dual national but single citizen (India).', faded: true, blankAnswer: 'Rahul is an Indian citizen (Section 9 not triggered by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_01_003', title: 'Political Theory is the systematic and.',
          scaffold: { problem: 'A Resident Welfare Association (RWA) bans tenants from using the community park, citing "owners\' property rights." Tenants protest,.',
            steps: [
            { text: 'Identify the core political concepts invoked by each side — "property rights" (owners) vs.' },
            { text: 'Clarify the meanings: Property rights = exclusive control over resources; Equality of access = non-discrimination in.' },
            { text: 'Recall relevant theoretical arguments: Locke (property as natural right) vs.' },
            { text: 'Analyze the institutional context: RWA is a private association performing quasi-governmental functions (managing.' },
            { text: 'Formulate a reasoned position: E.g., "While owners have property rights, the park functions as a common good; a just.', faded: true, blankAnswer: 'The conflict is between property-based exclusion and.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_ps_cbse_09_010', title: 'Identify each idea',
          dissect: { specimen: 'Sovereignty Meaning Definition', spots: [
            { id: 's1', label: 'A constitution is the fundamental', prompt: 'Which idea is this? — A constitution is the fundamental law of a country that establishes the framework of.', answer: 'A constitution is the fundamental', options: ['A constitution is the fundamental', 'Human security is a paradigm', 'The French Revolution 1789 inaugurated', 'Citizenship as legal status refers'] },
            { id: 's2', label: 'Human security is a paradigm', prompt: 'Which idea is this? — Human security is a paradigm that shifts the referent object of security from the state.', answer: 'Human security is a paradigm', options: ['Human security is a paradigm', 'A constitution is the fundamental', 'The French Revolution 1789 inaugurated', 'Citizenship as legal status refers'] },
            { id: 's3', label: 'The French Revolution 1789 inaugurated', prompt: 'Which idea is this? — The French Revolution (1789) inaugurated modern European nationalism by transferring.', answer: 'The French Revolution 1789 inaugurated', options: ['The French Revolution 1789 inaugurated', 'A constitution is the fundamental', 'Human security is a paradigm', 'Citizenship as legal status refers'] },
            { id: 's4', label: 'Citizenship as legal status refers', prompt: 'Which idea is this? — Citizenship as **legal status** refers to the formally recognized membership of an.', answer: 'Citizenship as legal status refers', options: ['Citizenship as legal status refers', 'A constitution is the fundamental', 'Human security is a paradigm', 'The French Revolution 1789 inaugurated'] },
            { id: 's5', label: 'Dual citizenship refers to the', prompt: 'Which idea is this? — Dual citizenship refers to the legal status where an individual is simultaneously.', answer: 'Dual citizenship refers to the', options: ['Dual citizenship refers to the', 'A constitution is the fundamental', 'Human security is a paradigm', 'The French Revolution 1789 inaugurated'] },
            { id: 's6', label: 'Political Theory is the systematic', prompt: 'Which idea is this? — Political Theory is the systematic and rational examination of fundamental political.', answer: 'Political Theory is the systematic', options: ['Political Theory is the systematic', 'A constitution is the fundamental', 'Human security is a paradigm', 'The French Revolution 1789 inaugurated'] }
          ] } }
    ],
    explore: { component: C11_PoliticalScienceSovereigntyMeaningDefinitionSim, prompt: 'Explore the interactive — Sovereignty Meaning Definition' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_10_002', difficulty: 'standard',
          question: 'A constitution is the fundamental law of a country that establishes the.',
          hint: 'If stuck, revisit the definition of constitution (node 001) and the Class 9 concept of.',
          misconception: 'Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook its structural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution is the fundamental law of a country that establishes the framework of',
                  options: ['A constitution is the fundamental law of a country that establishes the framework of', 'Human security is a paradigm that shifts the referent object of security from the state', 'The French Revolution (1789) inaugurated modern European nationalism by transferring', 'Citizenship as **legal status** refers to the formally recognized membership of an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a constitution is just a list of rights (like a \'bill of rights\') and overlook its structural functions: creating.' }
          ],
            remediations: { 'a-constitution-is-just-a': { steps: ['To address this, have students create a two-column table: Column A: "Structural Functions" (e.g., establishes.', 'Column B: "Rights-Protecting Functions" (e.g., Article 19, Article 21, Article 32).', 'Then ask: "If we only had Column B but no Column A, could rights be protected?" Guide them to see that without.', 'Use the Indian example: the Constituent Assembly spent months debating institutional design (Chapter 10 nodes 005-011).'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_010', difficulty: 'standard',
          question: 'Human security is a paradigm that shifts the referent object of security from.',
          hint: 'Revisit the definition of sovereignty and the state\'s monopoly on legitimate violence.',
          misconception: 'Students often think human security *replaces* state security, leading them to argue that armies are irrelevant.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human security is a paradigm that shifts the referent object of security from the state',
                  options: ['Human security is a paradigm that shifts the referent object of security from the state', 'A constitution is the fundamental law of a country that establishes the framework of', 'The French Revolution (1789) inaugurated modern European nationalism by transferring', 'Citizenship as **legal status** refers to the formally recognized membership of an'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think human security *replaces* state security, leading them to argue that armies are irrelevant.' }
          ],
            remediations: { 'human-security-replaces-state-security': { steps: ['Re-read the 1994 UNDP definition: "Human security means safety from chronic threats such as hunger, disease, and.', 'protection from sudden and hurtful disruptions." 2.', 'Create a two-column table: Column A = State Security (threat, referent, means), Column B = Human Security (threat,.', 'Fill using the seven dimensions.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_07_004', difficulty: 'standard',
          question: 'The French Revolution (1789) inaugurated modern European nationalism by.',
          hint: 'Revisit c11_ps_cbse_07_001 (definition of nation) and c10_hist_cbse_01_001 (French.',
          misconception: 'Students often think nationalism in Europe began *because* of shared language/culture (ethnic nationalism).',
          parts: [
                { id: 'a', prompt: 'What specific phrase in the 1789 Declaration of the Rights of Man and of the Citizen legally enshrined the principle that sovereignty resides in the nation?', answer: 'Article 3: "The principle of all sovereignty resides essentially in the nation',
                  options: ['Article 3: "The principle of all sovereignty resides essentially in the nation', 'A wrong answer (e.g., citing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think nationalism in Europe began *because* of shared language/culture (ethnic nationalism).' }
          ],
            remediations: { 'nationalism-in-europe-began-because': { steps: ['Re-read Article 3 of the 1789 Declaration (sovereignty in the nation).', 'Compare the 1791 Constitution\'s *active/passive citizen* distinction with the 1793 Jacobin universal male suffrage—note.', 'Map the Confederation of the Rhine (1806) vs.', 'Holy Roman Empire (1806 dissolution) to see how French *administrative* acts created the territorial template for later.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_002', difficulty: 'standard',
          question: 'Citizenship as **legal status** refers to the formally recognized membership of.',
          hint: 'If stuck, revisit **Article 51A** (Fundamental Duties) and the **Olga Tellis** case.',
          misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain why the Supreme Court in *Olga Tellis v. Bombay Municipal Corporation* (1985) linked the **right to livelihood** (Art.', answer: '**Answer**: The Court held that Art',
                  options: ['**Answer**: The Court held that Art', 'the Court gave them a right to stay on pavements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' },
                { id: 'b', prompt: '**ANALYZE**: Compare the **obligation to pay taxes** (legal duty) with **volunteering for a neighborhood clean-up** (desirable activity).', answer: '**Answer**: Taxes fund municipal services (legal-contractual)',
                  options: ['**Answer**: Taxes fund municipal services (legal-contractual)', 'both are duties of a good citizen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' }
          ],
            remediations: { 'students-equate-having-citizenship-documents': { steps: ['81–82: “Citizenship is not merely a legal concept… moral obligation to participate.” 2.', '**Map** the distinction: Create a two-column table—**Legal Status** (Articles 5–11, 14–32, 51A) vs.', '**Desirable Activity** (voting, RTI, Gram Sabha, community work).', '**Field task**: Interview a local ASHA worker or ward member—ask: “What do you do *beyond* your job description that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They.',
          parts: [
                { id: 'a', prompt: '**ANALYZE**: Compare the **obligation to pay taxes** (legal duty) with **volunteering for a neighborhood clean-up** (desirable activity).', answer: '**Answer**: Taxes fund municipal services (legal-contractual)',
                  options: ['**Answer**: Taxes fund municipal services (legal-contractual)', 'both are duties of a good citizen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' }
          ],
            remediations: { 'students-equate-having-citizenship-documents': { steps: ['81–82: “Citizenship is not merely a legal concept… moral obligation to participate.” 2.', '**Map** the distinction: Create a two-column table—**Legal Status** (Articles 5–11, 14–32, 51A) vs.', '**Desirable Activity** (voting, RTI, Gram Sabha, community work).', '**Field task**: Interview a local ASHA worker or ward member—ask: “What do you do *beyond* your job description that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_010', difficulty: 'standard',
          question: 'Dual citizenship refers to the legal status where an individual is.',
          hint: 'Revisit c11_ps_cbse_06_001 (What is citizenship) and c11_ps_cbse_06_006 (Jus soli vs jus.',
          misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dual citizenship refers to the legal status where an individual is simultaneously',
                  options: ['Dual citizenship refers to the legal status where an individual is simultaneously', 'A constitution is the fundamental law of a country that establishes the framework of', 'Human security is a paradigm that shifts the referent object of security from the state', 'The French Revolution (1789) inaugurated modern European nationalism by transferring'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.' }
          ],
            remediations: { 'students-confuse-oci-overseas-citizenship': { steps: ['Read Article 9 of Constitution and Section 7A of Citizenship Act (OCI provisions) side-by-side.', 'List every right an Indian citizen has (vote, public office, agricultural land, fundamental rights under Articles 15,.', 'Cross out each right that OCI holders lack (all political rights, Articles 16/19 equality in public employment,.', 'Conclude: OCI is a privileged residency status, not citizenship.', 'Watch the 2018 Supreme Court judgment summary (Dr. Subramanian Swamy vs Election Commission) on OCI voting rights to.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.',
          parts: [
                { id: 'a', prompt: 'Draft a constitutional amendment proposal (max 150 words) that would permit limited dual citizenship for Persons of Indian Origin (PIOs) from specified.', answer: 'A good proposal: "Insert Article 9A: Parliament may by law provide for Overseas',
                  options: ['A good proposal: "Insert Article 9A: Parliament may by law provide for Overseas', 'they can'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.' }
          ],
            remediations: { 'students-confuse-oci-overseas-citizenship': { steps: ['Read Article 9 of Constitution and Section 7A of Citizenship Act (OCI provisions) side-by-side.', 'List every right an Indian citizen has (vote, public office, agricultural land, fundamental rights under Articles 15,.', 'Cross out each right that OCI holders lack (all political rights, Articles 16/19 equality in public employment,.', 'Conclude: OCI is a privileged residency status, not citizenship.', 'Watch the 2018 Supreme Court judgment summary (Dr. Subramanian Swamy vs Election Commission) on OCI voting rights to.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_003', difficulty: 'standard',
          question: 'Political Theory is the systematic and rational examination of fundamental.',
          hint: 'If stuck, revisit c11_ps_cbse_01_001 ("What is Politics") and practice identifying the.',
          misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e.,.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the role of "reason" in Political Theory versus its role in Mathematics, based on the NCERT\'s reference to Socrates and the statement:.', answer: 'In Mathematics, reason operates on fixed, abstract axioms to derive necessary,',
                  options: ['In Mathematics, reason operates on fixed, abstract axioms to derive necessary,', 'both use logic so they are the same', 'learning what famous dead philosophers like Plato or Marx said'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e., a history of ideas.' }
          ],
            remediations: { 'political-theory-is-just-learning': { steps: ['Take a current news issue (e.g., "Should hate speech be banned?").', 'Identify the conflicting principles (free speech vs. dignity/equality).', 'Find one thinker\'s argument for each side (e.g., Mill for free speech, Waldron for dignity).', 'Use their reasoning to structure *your own* analysis of the specific law — not just summarize them.', 'Write a 100-word response showing how theory helped you reason, not just opine. Repeat with three issues.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e.,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Political theory is irrelevant for ordinary citizens because we already have a Constitution that guarantees our rights." Use the NCERT\'s.', answer: 'The claim is false',
                  options: ['The claim is false', 'Constitution is enough', 'learning what famous dead philosophers like Plato or Marx said'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e., a history of ideas.' },
                { id: 'b', prompt: 'Compare and contrast the role of "reason" in Political Theory versus its role in Mathematics, based on the NCERT\'s reference to Socrates and the statement:.', answer: 'In Mathematics, reason operates on fixed, abstract axioms to derive necessary,',
                  options: ['In Mathematics, reason operates on fixed, abstract axioms to derive necessary,', 'both use logic so they are the same', 'learning what famous dead philosophers like Plato or Marx said'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Political Theory is just "learning what famous dead philosophers like Plato or Marx said" — i.e., a history of ideas.' }
          ],
            remediations: { 'political-theory-is-just-learning': { steps: ['Take a current news issue (e.g., "Should hate speech be banned?").', 'Identify the conflicting principles (free speech vs. dignity/equality).', 'Find one thinker\'s argument for each side (e.g., Mill for free speech, Waldron for dignity).', 'Use their reasoning to structure *your own* analysis of the specific law — not just summarize them.', 'Write a 100-word response showing how theory helped you reason, not just opine. Repeat with three issues.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
