import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch13_p1: SimDef = {
    id: 'v3_c11_ps_ch13_p1',
    title: 'Executive · Part 1/2',
    subtitle: 'Meet the executive that outlasts every minister.',
    classLevel: 11, subject: 'political_science', topic: 'Executive · Part 1/2',
    chapters: ['c11_ps_ch13'],
    nodeIds: ['c11_ps_cbse_13_001', 'c11_ps_cbse_13_002', 'c11_ps_cbse_13_003', 'c11_ps_cbse_13_004', 'c11_ps_cbse_13_005', 'c11_ps_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tracer following a law from cabinet to classroom', intro: 'The minister signs the policy; a thousand permanent officers make it real — both are \'the executive.\'', goal: 'Distinguish political and permanent executive and compare parliamentary with presidential design.' },
    discovery: {
        question: 'Who actually implements the Right to Education Act in a district — the Education Minister?',
        options: ['The permanent executive — District Education Officers, block officers, inspectors; the bureaucracy is an integral tier of the executive, not its servant', 'The Education Minister alone', 'The Lok Sabha\'s education committee', 'The President\'s secretariat'],
        answer: 'The permanent executive — District Education Officers, block officers, inspectors; the bureaucracy is an integral tier of the executive, not its servant',
        hook: 'And parliamentary doesn\'t mean \'no separation\' — ministers are MPs (fused personnel) but the functions stay distinct; presidential systems do the reverse.',
    },
    teaching: [
        { title: 'What is the executive: Branch responsible for implementing laws', text: 'The executive is the branch of government constitutionally mandated to implement, enforce, and administer laws enacted by the legislature, comprising the political executive (elected heads like Prime.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map political versus permanent executive on one Act\'s journey to a classroom, then test whether fixed-term presidentialism beats India\'s coalition instability.',
        labels: ['What is the executive', 'Parliamentary vs Presidential executive', 'Political executive vs permanent', 'The President of India', 'Discretionary powers of', 'The Prime Minister'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_002', title: 'Parliamentary vs Presidential executive systems',
          caseStudy: { intro: 'Imagine you are watching a news debate: in the UK, the Prime Minister faces hostile questions in Parliament every Wednesday and can be voted out tomorrow;.',
            decisions: [{ prompt: 'What is the fundamental constitutional difference between how the Prime Minister in India and the President in the USA assume office?', options: [
                { text: 'The Indian Prime Minister is appointed by the President but must command a majority in', outcome: 'The Indian Prime Minister is appointed by the President but must command a majority in the Lok.' },
                { text: 'both are directly elected', outcome: 'Not quite — Students think "parliamentary system = no separation of powers" and "presidential system = complete.', reveals: 'parliamentary-system-no-separation-of' },
                { text: 'parliamentary system = no separation of powers', outcome: 'Not quite — Students think "parliamentary system = no separation of powers" and "presidential system = complete.', reveals: 'parliamentary-system-no-separation-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_003', title: 'Political executive vs permanent executive (bureaucracy)',
          caseStudy: { intro: 'Imagine reading a news report where a new Education Minister announces a curriculum overhaul, but career bureaucrats in the Ministry raise feasibility concerns.',
            decisions: [{ prompt: 'What is the constitutional basis for the tenure and service conditions of the permanent executive (civil services) in India, and how does.', options: [
                { text: 'The permanent executive\'s tenure and service conditions are governed by Articles 308-314', outcome: 'The permanent executive\'s tenure and service conditions are governed by Articles 308-314 (Services.' },
                { text: 'both serve fixed 5-year terms', outcome: 'Not quite — Students believe the political executive (Minister) has *hierarchical command* over the permanent.', reveals: 'the-political-executive-minister-has' },
                { text: 'pleasure doctrine', outcome: 'Not quite — Students believe the political executive (Minister) has *hierarchical command* over the permanent.', reveals: 'the-political-executive-minister-has' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_004', title: 'The President of India: Election, powers, and role',
          caseStudy: { intro: 'Imagine you\'re reading a newspaper headline: "President Returns Bill for Reconsideration" or "President Appoints Prime Minister in Hung Parliament." These.',
            decisions: [{ prompt: 'What is the composition of the electoral college for the election of the President of India, and which constitutional articles govern this?', options: [
                { text: 'The electoral college consists of elected members of both Houses of Parliament (Lok Sabha', outcome: 'The electoral college consists of elected members of both Houses of Parliament (Lok Sabha and Rajya.' },
                { text: 'executive power of the Union', outcome: 'Not quite — Students believe the President\'s "executive power of the Union" (Article 53) means the President.', reveals: 'the-president-s-executive-power' },
                { text: 'formal constitutional authority', outcome: 'Not quite — Students believe the President\'s "executive power of the Union" (Article 53) means the President.', reveals: 'the-president-s-executive-power' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_005', title: 'Discretionary powers of the President: Conventions and debates',
          caseStudy: { intro: 'Imagine you\'re watching the 1996 election results: no party has a majority, three Prime Ministers in two years.',
            decisions: [{ prompt: 'Article 74(1) states "there shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall.', options: [
                { text: 'The contradiction is resolved by recognizing that Article 74(1) presupposes the existence', outcome: 'The contradiction is resolved by recognizing that Article 74(1) presupposes the existence of.' },
                { text: 'discretionary power', outcome: 'Not quite — Students believe "discretionary power" means the President can *freely choose* any action based.', reveals: 'discretionary-power-means-the-president' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_006', title: 'The Prime Minister and Council of Ministers: Real executive',
          caseStudy: { intro: 'Imagine you\'re watching the news: the Finance Minister announces a new tax policy, but the next day the Prime Minister\'s Office issues a clarification changing.',
            decisions: [{ prompt: 'What is the constitutional basis for the statement that the Council of Ministers is collectively responsible to the Lok Sabha, and which.', options: [
                { text: 'Article 75(3) of the Constitution states: "The Council of Ministers shall be collectively', outcome: 'Article 75(3) of the Constitution states: "The Council of Ministers shall be collectively.' },
                { text: 'the Prime Minister is directly elected by the people like a US President', outcome: 'Not quite — Students often think the Prime Minister is directly elected by the people like a US President.', reveals: 'the-prime-minister-is-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Tracking how the Right to Education Act reaches a village school, a student says \'the Education Minister implements it\' — and describes India\'s system as \'parliamentary, so no separation of powers exists.\'',
            decisions: [{ prompt: 'What does the executive actually comprise, and what does \'parliamentary\' mean?', options: [
                { text: 'Unpack the dual structure: the executive is political (PM/Council of Ministers) PLUS permanent (civil servants) — the Minister decides what; the District Education Officer and inspectors execute how, daily. And parliamentary doesn\'t mean no separation: it fuses PERSONNEL (ministers are MPs) while functions stay distinct — ministers pilot bills legislatively and run ministries executively.', outcome: 'He sees the machine whole: implementation runs through the permanent executive, and accountability to the Lok Sabha is the system\'s defining feature — not the absence of separated functions.' },
                { text: 'Keep the Minister-only view — the bureaucracy serves the executive but isn\'t part of it.', outcome: 'The permanent executive is integral to the executive branch: officers on the ground are how \'the executive implements laws\' actually happens.', reveals: 'executive-is-only-ministers' },
                { text: 'Accept \'no separation\' — ministers sit in Parliament, so powers are fused.', outcome: 'Fusion is of personnel, not function: Indian ministers both legislate and administer — the functions remain distinguishable even in the same hands.', reveals: 'parliamentary-means-no-separation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ministers answer to the Lok Sabha collectively — yet the same majority that sustains them is the leash that holds them.',
            decisions: [{ prompt: 'What comes next? Executive · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Executive · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_001', difficulty: 'standard',
          question: 'The executive is the branch of government constitutionally mandated.',
          hint: 'Revisit c7_civ_ch03_002 (three organs) and c8_civ_ch2_7 (Union executive components).',
          misconception: 'Students equate "the executive" solely with the Prime Minister or President, treating the bureaucracy as separate from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The executive is the branch of government constitutionally mandated to implement,',
                  options: ['The executive is the branch of government constitutionally mandated to implement,', 'A parliamentary executive system is one where the executive (Prime Minister and Council', 'The political executive consists of elected representatives (Prime Minister, Council of', 'The President of India is the constitutional head of state and the formal executive'],
                  hint: 'Revisit c7_civ_ch03_002 (three organs) and c8_civ_ch2_7 (Union executive components) to refresh the.',
                  misconception: 'Students equate "the executive" solely with the Prime Minister or President, treating the bureaucracy as separate from or subordinate.' }
          ],
            remediations: { 'students-equate-the-executive-solely': { steps: ['Re-read Articles 53, 74, 75 (Union) and 154, 163, 164 (States) side-by-side in the Constitution bare text.', 'Take a recent government scheme (e.g., Jal Jeevan Mission, Ayushman Bharat) and trace its implementation chain: Cabinet.', 'At each step, label the actor as "political executive" (elected/appointed on political basis) or "permanent executive".', 'Write one sentence explaining why *both* tiers are necessary for the scheme to reach the beneficiary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_002', difficulty: 'standard',
          question: 'A parliamentary executive system is one where the executive (Prime Minister and.',
          hint: 'Revisit c11_ps_cbse_13_001 (What is the executive) and Class 9 c9_civ_ch1_6.',
          misconception: 'Students think "parliamentary system = no separation of powers" and "presidential system = complete separation.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A parliamentary executive system is one where the executive (Prime Minister and Council',
                  options: ['A parliamentary executive system is one where the executive (Prime Minister and Council', 'The executive is the branch of government constitutionally mandated to implement,', 'The political executive consists of elected representatives (Prime Minister, Council of', 'The President of India is the constitutional head of state and the formal executive'],
                  hint: 'Revisit c11_ps_cbse_13_001 (What is the executive) and Class 9 c9_civ_ch1_6 (Parliamentary.',
                  misconception: 'Students think "parliamentary system = no separation of powers" and "presidential system = complete separation." In reality, parliamentary.' }
          ],
            remediations: { 'parliamentary-system-no-separation-of': { steps: ['Re-read Article 74 (Council of Ministers to aid and advise President) and Article 75(3) (collective responsibility).', 'Create a two-column table: "Personnel overlap?" and "Functional separation?" for India, UK, USA, France.', 'Watch a 5-minute clip of UK PMQs (Prime Minister\'s Questions) and a US Presidential press conference — note who.', 'Write one paragraph: "Fusion of personnel enables daily accountability; separation of personnel creates fixed-term.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "parliamentary system = no separation of powers" and "presidential system = complete separation.".',
          parts: [
                { id: 'a', prompt: 'Draft a constitutional provision for a hybrid semi-presidential system (like France) for a hypothetical diverse federal country.', answer: 'A good answer specifies: President directly elected (fixed term), Prime Minister',
                  options: ['A good answer specifies: President directly elected (fixed term), Prime Minister', 'parliamentary system = no separation of powers', 'presidential system = complete separation'],
                  hint: 'Revisit c11_ps_cbse_13_001 (What is the executive) and Class 9 c9_civ_ch1_6 (Parliamentary.',
                  misconception: 'Students think "parliamentary system = no separation of powers" and "presidential system = complete separation." In reality, parliamentary.' }
          ],
            remediations: { 'parliamentary-system-no-separation-of': { steps: ['Re-read Article 74 (Council of Ministers to aid and advise President) and Article 75(3) (collective responsibility).', 'Create a two-column table: "Personnel overlap?" and "Functional separation?" for India, UK, USA, France.', 'Watch a 5-minute clip of UK PMQs (Prime Minister\'s Questions) and a US Presidential press conference — note who.', 'Write one paragraph: "Fusion of personnel enables daily accountability; separation of personnel creates fixed-term.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_003', difficulty: 'standard',
          question: 'The political executive consists of elected representatives (Prime Minister.',
          hint: 'Revisit c11_ps_cbse_13_002 (parliamentary executive\'s legislative accountability) and.',
          misconception: 'Students believe the political executive (Minister) has *hierarchical command* over the permanent executive (civil.',
          parts: [
                { id: 'a', prompt: 'Compare the accountability mechanisms for the political executive and permanent executive.', answer: 'Political executive: collective responsibility to Lok Sabha (Article 75(3)),',
                  options: ['Political executive: collective responsibility to Lok Sabha (Article 75(3)),', 'both are accountable to Parliament'],
                  hint: 'Revisit c11_ps_cbse_13_002 (parliamentary executive\'s legislative accountability) and Article.',
                  misconception: 'Students believe the political executive (Minister) has *hierarchical command* over the permanent executive (civil servant) like a CEO over.' }
          ],
            remediations: { 'the-political-executive-minister-has': { steps: ['Re-read Article 310 (pleasure doctrine) and Article 311 (safeguards) side-by-side.', 'Study the *Prakash Singh v. Union of India* (2006) Supreme Court judgment on police reforms — it explicitly defines the.', 'Analyze a real RTI case where a Minister\'s "verbal order" was overturned because it lacked statutory backing (e.g., CIC.', 'Write one paragraph distinguishing "policy decision" (Minister\'s domain) from "administrative decision" (civil.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_004', difficulty: 'standard',
          question: 'The President of India is the constitutional head of state and the formal.',
          hint: 'Revisit c11_ps_cbse_13_002 (Parliamentary vs Presidential executive systems) and focus.',
          misconception: 'Students believe the President\'s "executive power of the Union" (Article 53) means the President personally runs the.',
          parts: [
                { id: 'a', prompt: 'Why does the Constitution provide for an indirect election of the President through an electoral college rather than direct election by the people?', answer: 'Indirect election maintains the parliamentary system\'s logic: the President is a',
                  options: ['Indirect election maintains the parliamentary system\'s logic: the President is a', 'to save money', 'because India is too large', 'executive power of the Union'],
                  hint: 'Revisit c11_ps_cbse_13_002 (Parliamentary vs Presidential executive systems) and focus on the "dual.',
                  misconception: 'Students believe the President\'s "executive power of the Union" (Article 53) means the President personally runs the government and makes.' }
          ],
            remediations: { 'the-president-s-executive-power': { steps: ['Have the student read Article 53 and Article 74 side-by-side.', 'Ask: "Who decides which judge to appoint?" Trace the process: Law Minister proposes → Cabinet approves → President.', 'Use a real example - President K.R. Narayanan returning the UP government\'s recommendation for President\'s Rule in 1997.', 'Create a two-column table: "Formal Power (Article)" vs "Actual Decision-Maker (Convention)" for 5 presidential powers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_005', difficulty: 'standard',
          question: 'Discretionary powers of the President of India refer to those constitutional.',
          hint: 'Revisit c11_ps_cbse_13_004: list all President\'s formal powers, then mark which require.',
          misconception: 'Students believe "discretionary power" means the President can *freely choose* any action based on personal preference.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discretionary powers of the President of India refer to those constitutional functions',
                  options: ['Discretionary powers of the President of India refer to those constitutional functions', 'The executive is the branch of government constitutionally mandated to implement,', 'A parliamentary executive system is one where the executive (Prime Minister and Council', 'The political executive consists of elected representatives (Prime Minister, Council of'],
                  hint: 'Revisit c11_ps_cbse_13_004: list all President\'s formal powers, then mark which require a Council.',
                  misconception: 'Students believe "discretionary power" means the President can *freely choose* any action based on personal preference.' }
          ],
            remediations: { 'discretionary-power-means-the-president': { steps: ['Re-read Article 74(1) and 75(1) side-by-side to see the textual gap.', 'Create a timeline of 1979, 1989, 1996, 1997, 1999 presidential decisions—note what was *discretionary* vs. *on advice*.', 'Apply the "who advises when there\'s no ministry?" test to each scenario.', 'Write one-sentence convention rules for each of the four domains.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_13_006', difficulty: 'standard',
          question: 'The Prime Minister is the head of government and real executive authority.',
          hint: 'Review c11_ps_cbse_13_002 (parliamentary vs presidential) and Article 75(3) (collective.',
          misconception: 'Students often think the Prime Minister is directly elected by the people like a US President.',
          parts: [
                { id: 'a', prompt: 'Compare the constitutional position of the Prime Minister in India with the President in the USA regarding: (a) membership of legislature, (b) power.', answer: 'membership of legislature, (',
                  options: ['membership of legislature, (', 'both can dissolve legislature', 'both directly elected', 'the Prime Minister is directly elected by the people like a US President'],
                  hint: 'Review c11_ps_cbse_13_002 (parliamentary vs presidential) and Article 75(3) (collective.',
                  misconception: 'Students often think the Prime Minister is directly elected by the people like a US President.' }
          ],
            remediations: { 'the-prime-minister-is-directly': { steps: ['If student believes PM is directly elected: 1) Show Article 75(1): "The Prime Minister shall be appointed by the.', '4) Contrast with presidential system: US President elected via Electoral College separately from Congress.', '5) Emphasize: In parliamentary system, executive power flows from legislative confidence, not separate popular mandate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
