import type { SimDef } from '../../engine/types';

/** v3 generated — c12_leg_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_leg_ch12: SimDef = {
    id: 'v3_c12_leg_ch12',
    title: 'International Law',
    subtitle: 'This node covers the definition, historical evolution, classification (Public.',
    classLevel: 12, subject: 'leg', topic: 'International Law',
    chapters: ['c12_leg_ch12'],
    nodeIds: ['c12_leg_cbse_12_001', 'c12_leg_cbse_12_002', 'c12_leg_cbse_12_003', 'c12_leg_cbse_12_004', 'c12_leg_cbse_12_005', 'c12_leg_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world hook: "When India signed the Paris Agreement on climate change, did it automatically.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'An Indian company enters a joint venture with a German firm. The contract chooses English law and ICC arbitration in Singapore. A dispute arises.',
        options: ['the contract\'s validity, (', 'Indian law applies to all three', 'choice of law'],
        answer: 'the contract\'s validity, (',
        hook: 'Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for international law").',
    },
    teaching: [
        { title: 'International Law — Key Concepts and Institutions', text: 'International Law is a body of rules, norms, and standards that govern relations between sovereign states and other international actors (such as international organizations and individuals), derived.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_leg_cbse_12_001', title: 'International Law — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real-world hook: "When India signed the Paris Agreement on climate change, did it automatically become Indian law?',
            decisions: [{ prompt: 'Define International Law and state the two vital elements omitted in Bentham\'s classic definition that are included in the modern.', options: [
                { text: 'International Law is a framework of rules and principles binding relations between', outcome: 'International Law is a framework of rules and principles binding relations between states.' },
                { text: '**ratification of a treaty automatically makes it enforceable in Indian courts**', outcome: 'Not quite — Students often believe that **ratification of a treaty automatically makes it enforceable in Indian.', reveals: 'ratification-of-a-treaty-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_12_003', title: 'International Law — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real scenario: "An Indian tech startup signs a contract with a US client; the client refuses to pay. Which court?',
            decisions: [{ prompt: 'What is the primary difference between Public International Law and Private International Law in terms of the parties they regulate?', options: [
                { text: 'Public International Law regulates relations between sovereign states and international', outcome: 'Public International Law regulates relations between sovereign states and international.' },
                { text: 'Public deals with crimes, Private deals with contracts', outcome: 'Not quite — Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for.', reveals: 'ratification-domestic-law-in-india' },
                { text: 'ratification = domestic law', outcome: 'Not quite — Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for.', reveals: 'ratification-domestic-law-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_12_004', title: 'International Law — Processes and Procedures',
          caseStudy: { intro: 'Start with a real-world hook: *"India and Pakistan sign the Indus Waters Treaty (1960). A dispute arises over a dam.',
            decisions: [{ prompt: 'What is the primary difference between Public International Law and Private International Law (Conflict of Laws)?', options: [
                { text: 'Public International Law governs relations between states and international organizations', outcome: 'Public International Law governs relations between states and international organizations (e.g.' },
                { text: 'Public deals with governments, Private deals with companies', outcome: 'Not quite — Students think **"ratification = automatic domestic law"** in India.', reveals: 'ratification-automatic-domestic-law-in' },
                { text: 'ratification = automatic domestic law', outcome: 'Not quite — Students think **"ratification = automatic domestic law"** in India.', reveals: 'ratification-automatic-domestic-law-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_leg_cbse_12_006', title: 'International Law — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "India signs the Paris Agreement on climate change — but a new government wants to withdraw. Can it? What happens domestically?',
            decisions: [{ prompt: 'What is the primary difference between Public International Law and Private International Law in terms of the actors and subject matter.', options: [
                { text: 'Public International Law governs relations between states and international organizations', outcome: 'Public International Law governs relations between states and international organizations (e.g.' },
                { text: 'horizontal', outcome: 'Not quite — Students believe that once India ratifies a treaty, it automatically becomes enforceable in Indian.', reveals: 'once-india-ratifies-a-treaty' },
                { text: 'vertical', outcome: 'Not quite — Students believe that once India ratifies a treaty, it automatically becomes enforceable in Indian.', reveals: 'once-india-ratifies-a-treaty' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_leg_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'International Law', spots: [
            { id: 's1', label: 'International Law Key Concepts and Institutions', prompt: 'Which idea is this? — International Law is a body of rules, norms, and standards that govern relations between.', answer: 'International Law Key Concepts and Institutions', options: ['International Law Key Concepts and Institutions', 'International Law Constitutional and Legal Provisions', 'International Law Landmark Cases and Illustrations', 'International Law Processes and Procedures'] },
            { id: 's2', label: 'International Law Constitutional and Legal Provisions', prompt: 'Which idea is this? — International law is a body of rules and principles that governs relations between states.', answer: 'International Law Constitutional and Legal Provisions', options: ['International Law Constitutional and Legal Provisions', 'International Law Key Concepts and Institutions', 'International Law Landmark Cases and Illustrations', 'International Law Processes and Procedures'] },
            { id: 's3', label: 'International Law Landmark Cases and Illustrations', prompt: 'Which idea is this? — International law is a system of rules and principles governing relations between.', answer: 'International Law Landmark Cases and Illustrations', options: ['International Law Landmark Cases and Illustrations', 'International Law Key Concepts and Institutions', 'International Law Constitutional and Legal Provisions', 'International Law Processes and Procedures'] },
            { id: 's4', label: 'International Law Processes and Procedures', prompt: 'Which idea is this? — International Law is the body of rules, norms, and standards that govern relations.', answer: 'International Law Processes and Procedures', options: ['International Law Processes and Procedures', 'International Law Key Concepts and Institutions', 'International Law Constitutional and Legal Provisions', 'International Law Landmark Cases and Illustrations'] },
            { id: 's5', label: 'International Law Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — International Law is a system of rules and principles binding relations between states.', answer: 'International Law Exam-Oriented Questions and Answers', options: ['International Law Exam-Oriented Questions and Answers', 'International Law Key Concepts and Institutions', 'International Law Constitutional and Legal Provisions', 'International Law Landmark Cases and Illustrations'] },
            { id: 's6', label: 'International Law Critical Analysis and Application', prompt: 'Which idea is this? — International law is a system of rules, principles, and norms that governs the conduct.', answer: 'International Law Critical Analysis and Application', options: ['International Law Critical Analysis and Application', 'International Law Key Concepts and Institutions', 'International Law Constitutional and Legal Provisions', 'International Law Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c12_leg_cbse_12_006', title: 'You made it',
          caseStudy: { intro: 'You finished International Law — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_001', difficulty: 'standard',
          question: 'International Law is a body of rules, norms, and standards that govern.',
          hint: 'If stuck, review the \'Concept of State\' (Class 11, Unit 1) for statehood criteria and.',
          misconception: 'Students often believe that **ratification of a treaty automatically makes it enforceable in Indian courts**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'International Law is a body of rules, norms, and standards that govern relations between',
                  options: ['International Law is a body of rules, norms, and standards that govern relations between', 'International law is a body of rules and principles that governs relations between states', 'International law is a system of rules and principles governing relations between', 'International Law is the body of rules, norms, and standards that govern relations'],
                  hint: 'If stuck, review the \'Concept of State\' (Class 11, Unit 1) for statehood criteria and \'Salient.',
                  misconception: 'Students often believe that **ratification of a treaty automatically makes it enforceable in Indian courts**.' }
          ],
            remediations: { 'ratification-of-a-treaty-automatically': { steps: ['Re-read the *Magan Bhai Patel* and *Vishaka* summaries in the textbook (Unit 6, Section G).', 'Create a two-column table: \'Treaty ratified but NO domestic law passed\' vs \'Treaty + Domestic Act passed\' — list 2.', 'Practice the distinction: "Does this treaty restrict citizen rights or modify state law?', '→ Article 253 legislation needed.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **ratification of a treaty automatically makes it enforceable in Indian courts**.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "International Law is not true law because it lacks a legislature, executive, and judiciary with enforcement power.".', answer: 'Austin (positivist) argues law requires a sovereign command backed by sanctions',
                  options: ['Austin (positivist) argues law requires a sovereign command backed by sanctions', '**ratification of a treaty automatically makes it enforceable in Indian courts**'],
                  hint: 'If stuck, review the \'Concept of State\' (Class 11, Unit 1) for statehood criteria and \'Salient.',
                  misconception: 'Students often believe that **ratification of a treaty automatically makes it enforceable in Indian courts**.' }
          ],
            remediations: { 'ratification-of-a-treaty-automatically': { steps: ['Re-read the *Magan Bhai Patel* and *Vishaka* summaries in the textbook (Unit 6, Section G).', 'Create a two-column table: \'Treaty ratified but NO domestic law passed\' vs \'Treaty + Domestic Act passed\' — list 2.', 'Practice the distinction: "Does this treaty restrict citizen rights or modify state law?', '→ Article 253 legislation needed.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_002', difficulty: 'standard',
          question: 'International law is a body of rules and principles that governs relations.',
          hint: 'Review Class 11 node c11_leg_cbse_04_002 on Constitutional Provisions for International.',
          misconception: 'Students often believe that once India ratifies an international treaty, it automatically becomes enforceable in Indian.',
          parts: [
                { id: 'a', prompt: 'India ratifies the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW).', answer: 'No, she cannot directly invoke CEDAW',
                  options: ['No, she cannot directly invoke CEDAW', 'treaties are self-executing in India or does not know the Vishaka precedent'],
                  hint: 'Review Class 11 node c11_leg_cbse_04_002 on Constitutional Provisions for International Law and.',
                  misconception: 'Students often believe that once India ratifies an international treaty, it automatically becomes enforceable in Indian courts.' }
          ],
            remediations: { 'once-india-ratifies-an-international': { steps: ['If the student holds this misconception, first clarify the dualist vs monist distinction using a simple table.', 'Then walk through Article 253 and the Magan Bhai Patel case (legislative measure needed if treaty restricts rights).', 'Next, show how Vishaka used an unincorporated treaty as an interpretive aid — not as direct law.', 'Finally, assign a mini-task: "Find one treaty India has ratified but not yet implemented by legislation, and explain.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_003', difficulty: 'standard',
          question: 'International law is a system of rules and principles governing relations.',
          hint: 'If stuck on why ratification ≠ law in India, review Class 11 c11_leg_cbse_04_003.',
          misconception: 'Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for international law").',
          parts: [
                { id: 'a', prompt: 'An Indian company enters a joint venture with a German firm. The contract chooses English law and ICC arbitration in Singapore. A dispute arises.', answer: 'the contract\'s validity, (',
                  options: ['the contract\'s validity, (', 'Indian law applies to all three', 'choice of law', 'ratification = domestic law'],
                  hint: 'If stuck on why ratification ≠ law in India, review Class 11 c11_leg_cbse_04_003 (Kesavananda basic.',
                  misconception: 'Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for international law") and Article 253.' },
                { id: 'b', prompt: 'Compare the \'transformation doctrine\' (UK/India) and \'monist doctrine\' (US for self-executing treaties) for incorporating international treaties into domestic.', answer: 'Transformation doctrine: treaties do not automatically become domestic law',
                  options: ['Transformation doctrine: treaties do not automatically become domestic law', 'Ratification makes it law in India', 'ratification = domestic law', 'using a treaty as interpretive aid'],
                  hint: 'If stuck on why ratification ≠ law in India, review Class 11 c11_leg_cbse_04_003 (Kesavananda basic.',
                  misconception: 'Students believe "ratification = domestic law" in India. They read Article 51 ("foster respect for international law") and Article 253.' }
          ],
            remediations: { 'ratification-domestic-law-in-india': { steps: ['**Revisit the dualism/monism distinction**: Use a two-column table — UK/India (dualist) vs US/Netherlands (monist).', 'Write one sentence for each: "In India, treaty X becomes enforceable in courts ONLY after Parliament passes Act Y." 2.', '**Re-read *Magan Bhai* and *Vishaka* side-by-side**: Identify the *exact* condition in each — *Magan Bhai*: treaty.', '*Vishaka*: no domestic law on point, treaty fills gap → Court can use it as interpretive tool.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_004', difficulty: 'standard',
          question: 'International Law is the body of rules, norms, and standards that govern.',
          hint: 'If stuck on *why* *Vishaka* allowed direct application but *Magan Bhai* didn’t, revisit.',
          misconception: 'Students think **"ratification = automatic domestic law"** in India.',
          parts: [
                { id: 'a', prompt: 'Explain why the *North Sea Continental Shelf* cases (1969) are the landmark test for customary international law formation.', answer: 'The ICJ held that customary law requires **two elements**: (1) *State practice*',
                  options: ['The ICJ held that customary law requires **two elements**: (1) *State practice*', 'long usage', 'UN resolutions', 'ratification = automatic domestic law'],
                  hint: 'If stuck on *why* *Vishaka* allowed direct application but *Magan Bhai* didn’t, revisit the.',
                  misconception: 'Students think **"ratification = automatic domestic law"** in India.' },
                { id: 'b', prompt: 'Compare the jurisdiction and enforcement of the ICJ and the ICC. Why can the ICC prosecute a Head of State while the ICJ cannot?', answer: 'ICJ: Only **states** can be parties; jurisdiction requires **consent** (special',
                  options: ['ICJ: Only **states** can be parties; jurisdiction requires **consent** (special', 'ratification = automatic domestic law', '**"ratification = automatic domestic law"** in India'],
                  hint: 'If stuck on *why* *Vishaka* allowed direct application but *Magan Bhai* didn’t, revisit the.',
                  misconception: 'Students think **"ratification = automatic domestic law"** in India.' }
          ],
            remediations: { 'ratification-automatic-domestic-law-in': { steps: ['Re-read *Magan Bhai Patel v Union of India* (node: c12_leg_cbse_12_002) — identify the exact phrase: "if a treaty.', 'legislative measure required".', 'Contrast with *Vishaka v State of Rajasthan* (same node) — note: "no contradictory law...', 'direct application allowed".'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_005', difficulty: 'standard',
          question: 'International Law is a system of rules and principles binding relations between.',
          hint: 'If confused about when a treaty needs legislation vs when it applies directly, re-read.',
          misconception: 'Students often believe that once India ratifies a treaty, it automatically becomes enforceable in Indian courts like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'International Law is a system of rules and principles binding relations between states,',
                  options: ['International Law is a system of rules and principles binding relations between states,', 'International Law is a body of rules, norms, and standards that govern relations between', 'International law is a body of rules and principles that governs relations between states', 'International law is a system of rules and principles governing relations between'],
                  hint: 'If confused about when a treaty needs legislation vs when it applies directly, re-read the Magan.',
                  misconception: 'Students often believe that once India ratifies a treaty, it automatically becomes enforceable in Indian courts like a statute.' }
          ],
            remediations: { 'once-india-ratifies-a-treaty': { steps: ['Re-read the \'International Law & India\' section in NCERT (pages 175-176) focusing on the three landmark cases: Magan.', 'Create a two-column table: \'Treaty requires legislation\' vs \'Treaty directly applicable\' — place each case in the.', 'Practice the diagnostic question 3 again, explicitly citing the case that controls each step.', 'If still stuck, revisit c12_leg_cbse_12_001 (Key Concepts) for the dualism/monism distinction and c11_leg_cbse_04_001.'] } } },
        { type: 'subpart', nodeId: 'c12_leg_cbse_12_006', difficulty: 'standard',
          question: 'International law is a system of rules, principles, and norms that governs the.',
          hint: 'If stuck, review c12_leg_cbse_12_002 (constitutional provisions) and c12_leg_cbse_12_003.',
          misconception: 'Students believe that once India ratifies a treaty, it automatically becomes enforceable in Indian courts —.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'International law is a system of rules, principles, and norms that governs the conduct of',
                  options: ['International law is a system of rules, principles, and norms that governs the conduct of', 'International Law is a body of rules, norms, and standards that govern relations between', 'International law is a body of rules and principles that governs relations between states', 'International law is a system of rules and principles governing relations between'],
                  hint: 'If stuck, review c12_leg_cbse_12_002 (constitutional provisions) and c12_leg_cbse_12_003 (landmark.',
                  misconception: 'Students believe that once India ratifies a treaty, it automatically becomes enforceable in Indian courts — or conversely, that it never.' }
          ],
            remediations: { 'once-india-ratifies-a-treaty': { steps: ['Have the student re-read Articles 51, 253, and 372 of the Constitution — identify the textual hooks for international.', 'Create a three-column table: Treaty Type (rights-expanding / rights-restricting / commercial) | Constitutional.', 'Walk through each cell: why does the Court treat them differently?', 'Assign a practice problem: "India ratifies a treaty banning child labour.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
