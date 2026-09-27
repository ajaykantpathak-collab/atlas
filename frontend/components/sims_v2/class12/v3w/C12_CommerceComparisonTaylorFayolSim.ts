import type { SimDef } from '../../engine/types';
import C12_CommerceComparisonTaylorFayolSim from '../../../simulations/c6_12/C12_CommerceComparisonTaylorFayolSim';

/** v3 wrapped master — C12_CommerceComparisonTaylorFayolSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercecomparisontaylorfayolsim: SimDef = {
    id: 'v3w_c12_commercecomparisontaylorfayolsim',
    title: 'Comparison Taylor Fayol',
    subtitle: 'This node covers the seven techniques explicitly listed in the NCERT text for Taylor\'s.',
    classLevel: 12, subject: 'business_studies', topic: 'Taylor\'s Techniques: Time Study, Motion Study and Functional Foremanship',
    chapters: [],
    nodeIds: ['c12_bs_cbse_02_003', 'c12_bs_cbse_02_005', 'c12_bs_cbse_02_007', 'c12_bs_cbse_02_001', 'c12_bs_cbse_02_008', 'c12_bs_cbse_02_009', 'c12_bs_cbse_02_002', 'c12_bs_cbse_02_004', 'c12_bs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the production manager of a bicycle factory in Ludhiana where workers assemble 50 frames per.', goal: 'Master Comparison Taylor Fayol.' },
    discovery: {
        question: 'A company has two divisions — one manufacturing electric scooters and another manufacturing electric bicycles.',
        options: ['Correct answer: This illustrates Unity of Direction', 'it shows Unity of Command', 'Unity of Direction means each employee should have only one boss'],
        answer: 'This illustrates Unity of Direction',
        hook: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should.',
    },
    teaching: [
        { title: 'Taylor\'s Techniques of Scientific Management.', text: 'Taylor\'s Techniques of Scientific Management are specific, standardized procedures — Time Study, Motion Study, Fatigue Study, Method Study, Functional Foremanship, Standardisation & Simplification,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_003', title: 'Taylor\'s Techniques of Scientific.',
          scaffold: { problem: 'A worker in a bicycle-handlebar bending unit currently takes an average of 8.4 minutes per handlebar (based on 20 stopwatch readings).',
            steps: [
            { text: 'Compute the mean of the 15 improved readings: Sum = 76.3, Mean = 76.3 / 15 = 5.0867 minutes (basic time).' },
            { text: 'Add fatigue allowance: 12% of 5.0867 = 0.6104 minutes. Standard time = 5.0867 + 0.6104 = 5.6971 ≈ 5.70 minutes per.' },
            { text: 'Compute effective working minutes per shift: 7.5 hours × 60 = 450 minutes – 30 minutes lunch = 420 minutes.' },
            { text: 'Daily standard output = 420 / 5.70 = 73.68 ≈ 73 handlebars (round down to whole units).' },
            { text: 'Verify: At old method (8.4 min), output was 50 handlebars; new method yields 46% increase — consistent with Taylor\'s.', faded: true, blankAnswer: 'Standard time = 5.70 minutes per handlebar; Daily standard.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_005', title: 'Unity of Direction states that each.',
          scaffold: { problem: 'A mid-sized auto-components factory has two production lines — Line A makes brake calipers, Line B makes brake discs.',
            steps: [
            { text: 'Map current state — document each line’s weekly schedule, machine-hour requirements, and conflict frequency over the.' },
            { text: 'Define the common objective — "maximise CNC machine utilisation while meeting both lines’ delivery commitments."' },
            { text: 'Appoint a single CNC Planning Head (could be a senior engineer) who reports to the plant manager and owns the.' },
            { text: 'Develop a unified weekly master schedule that sequences caliper and disc batches to minimise changeovers, with buffer.' },
            { text: 'Communicate the new schedule to both line supervisors; establish a daily 15-minute coordination huddle to review.' },
            { text: 'Monitor key metrics (machine utilisation %, on-time delivery %, changeover count) for 4 weeks; adjust the master.', faded: true, blankAnswer: 'Unified CNC Planning Head appointed; integrated weekly.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_007', title: 'Fayol vs Taylor comparison is the.',
          scaffold: { problem: 'A mid-sized auto-component manufacturer in Pune faces: (a) Workers use different methods for the same assembly task, causing quality.',
            steps: [
            { text: 'Identify Problem (a) — varying methods for same task → Taylor\'s Method Study (find one best way) + Standardisation (set.' },
            { text: 'Identify Problem (b) — conflicting instructions from two supervisors → Fayol\'s Unity of Command (one boss) directly.' },
            { text: 'Identify Problem (c) — perceived promotion bias → Fayol\'s Equity (kindliness + justice, no discrimination) + Stability.' },
            { text: 'Identify Problem (d) — factory manager overloaded with operational details → Fayol\'s Centralisation/Decentralisation.' },
            { text: 'Synthesise — Problems (a) and (d) need Taylor\'s shop-floor techniques; (b) and (c) need Fayol\'s administrative.', faded: true, blankAnswer: '(a) Taylor: Method Study + Standardisation; (b) Fayol:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_001', title: 'Principles of management are broad,.',
          scaffold: { problem: 'A hospital administrator notices that nurses frequently receive conflicting instructions from the Nursing Superintendent and the Resident.',
            steps: [
            { text: 'Identify the symptom — dual subordination (nurses getting orders from two superiors).' },
            { text: 'Map to Fayol\'s principle — Unity of Command is violated (one subordinate, one superior).' },
            { text: 'Link to nature — \'Cause and effect relationship\': violation → confusion → errors → low morale.' },
            { text: 'Apply significance — \'Scientific decisions\': redesign reporting based on objective assessment, not habit.' },
            { text: 'Propose solution — Establish a single protocol committee chaired by Nursing Superintendent with RMO as advisor; all.' },
            { text: 'Verify — Nurses now have one boss for daily work; coordination maintained via committee; morale and efficiency improve.', faded: true, blankAnswer: 'Core violation: Unity of Command. Solution: Unified.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_008', title: 'Principles of management are broad,.',
          scaffold: { problem: '"GreenFields Agro Ltd." produces organic fertilizers. The owner, Mr.',
            steps: [
            { text: 'Identify the decision-making approach — Mr. Singh uses personal judgment/rule of thumb (lucky day), not principles.' },
            { text: 'Map each significance point to the case: (a) Useful insights? Missing — no learning from past pest attacks, same.' },
            { text: 'Link each missing point to a specific consequence: (a) → recurring losses; (b) → owner burnout, low labour.' },
            { text: 'Synthesise — the root cause is treating management as personal prerogative, not a principle-guided discipline.' },
            { text: 'Verify — each consequence traces back to a specific significance gap; no overlap or omission.', faded: true, blankAnswer: 'All six significance points are absent. Consequences:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_02_009', title: 'Fayol\'s Principle of Initiative states.',
          scaffold: { problem: 'A 200-employee auto-components manufacturer in Pune faces recurring quality defects because shop-floor workers notice problems but never.',
            steps: [
            { text: 'Define the scope — Initiative applies to "thinking out and executing plans for improvements" within "established.' },
            { text: 'Establish the suggestion system — Install physical/digital \'Idea Boxes\' at each workstation with a simple form: Problem.' },
            { text: 'Create reward-recognition linkage — For implemented ideas: (a) monetary reward = 10% of first-year savings (capped at.' },
            { text: 'Monitor and iterate — Track metrics quarterly: ideas submitted per employee, implementation rate, savings generated,.', faded: true, blankAnswer: 'A 4-step Initiative Charter system with defined autonomy.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_02_005', title: 'Identify each idea',
          dissect: { specimen: 'Comparison Taylor Fayol', spots: [
            { id: 's1', label: 'Taylors Techniques of Scientific Management', prompt: 'Which idea is this? — Taylor\'s Techniques of Scientific Management are specific, standardized procedures — Time.', answer: 'Taylors Techniques of Scientific Management', options: ['Taylors Techniques of Scientific Management', 'Unity of Direction states that', 'Fayol vs Taylor comparison is', 'Principles of management are broad'] },
            { id: 's2', label: 'Unity of Direction states that', prompt: 'Which idea is this? — Unity of Direction states that each group of activities having the same objective must.', answer: 'Unity of Direction states that', options: ['Unity of Direction states that', 'Taylors Techniques of Scientific Management', 'Fayol vs Taylor comparison is', 'Principles of management are broad'] },
            { id: 's3', label: 'Fayol vs Taylor comparison is', prompt: 'Which idea is this? — Fayol vs Taylor comparison is the systematic analysis of differences between Henri.', answer: 'Fayol vs Taylor comparison is', options: ['Fayol vs Taylor comparison is', 'Taylors Techniques of Scientific Management', 'Unity of Direction states that', 'Principles of management are broad'] },
            { id: 's4', label: 'Principles of management are broad', prompt: 'Which idea is this? — Principles of management are broad, general guidelines derived from practice and.', answer: 'Principles of management are broad', options: ['Principles of management are broad', 'Taylors Techniques of Scientific Management', 'Unity of Direction states that', 'Fayol vs Taylor comparison is'] },
            { id: 's5', label: 'Fayols Principle of Initiative states', prompt: 'Which idea is this? — Fayol\'s Principle of Initiative states that employees at all levels should be encouraged.', answer: 'Fayols Principle of Initiative states', options: ['Fayols Principle of Initiative states', 'Taylors Techniques of Scientific Management', 'Unity of Direction states that', 'Fayol vs Taylor comparison is'] }
          ] } }
    ],
    explore: { component: C12_CommerceComparisonTaylorFayolSim, prompt: 'Explore the interactive — Comparison Taylor Fayol' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_003', difficulty: 'standard',
          question: 'Taylor\'s Techniques of Scientific Management are specific, standardized.',
          hint: 'Revisit node c12_bs_cbse_02_002 and focus on the "Science not Rule of Thumb" principle —.',
          misconception: 'Students often treat each technique as a standalone "tool" — e.g., "Time Study means using a stopwatch" or "Functional.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Taylor\'s Techniques of Scientific Management are specific, standardized procedures',
                  options: ['Taylor\'s Techniques of Scientific Management are specific, standardized procedures', 'Unity of Direction states that each group of activities having the same objective must', 'Fayol vs Taylor comparison is the systematic analysis of differences between Henri', 'Principles of management are broad, general guidelines derived from practice and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each technique as a standalone "tool" — e.g., "Time Study means using a stopwatch" or "Functional Foremanship means.' }
          ],
            remediations: { 'students-often-treat-each-technique': { steps: ['Re-read the NCERT paragraphs on Motion Study and Time Study side by side.', 'Draw a flowchart: Method Study → Motion Study → Time Study → Fatigue Study → Standardisation → Functional Foremanship →.', 'For each arrow, write one sentence on what passes forward (e.g., "Motion Study passes the *reduced motion sequence* to.', 'Re-attempt Diagnostic Question 3 and 6.', 'If still stuck, revisit node c12_bs_cbse_02_002 for Taylor\'s principle "Science not Rule of Thumb" — the system *is*.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_005', difficulty: 'standard',
          question: 'Unity of Direction states that each group of activities having the same.',
          hint: 'Revisit c12_bs_cbse_02_001 (Nature of Principles of Management) and c12_bs_cbse_02_004.',
          misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should.',
          parts: [
                { id: 'a', prompt: 'A company has two divisions — one manufacturing electric scooters and another manufacturing electric bicycles.', answer: 'This illustrates Unity of Direction',
                  options: ['Correct answer: This illustrates Unity of Direction', 'it shows Unity of Command', 'Unity of Direction means each employee should have only one boss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should have only one boss".' },
                { id: 'b', prompt: 'In a hospital, the radiology department stores X-ray films in three different cabinets across two floors without a labelling system.', answer: 'Correct answer (4-step plan): 1',
                  options: ['Correct answer (4-step plan): 1', 'put all films in one room', 'Unity of Direction means each employee should have only one boss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should have only one boss".' }
          ],
            remediations: { 'students-often-confuse-unity-of': { steps: ['If a student confuses Unity of Direction with Unity of Command, have them draw two side-by-side diagrams: (1) an org.', 'Ask them to label the "head" and "plan" in each.', 'For Order, give them a messy warehouse sketch and ask them to design a grid-based zoning plan with coordinates for each.', 'For Equity, present a mini-case with three employees of different genders/regions but identical output receiving.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should.',
          parts: [
                { id: 'a', prompt: 'Critique the following management decision using the principle of Equity: "To motivate the sales team, the VP announces that the top performer each quarter.', answer: 'The VP’s reasoning is invalid',
                  options: ['Correct answer: The VP’s reasoning is invalid', 'it’s equitable because rules are same for all', 'Unity of Direction means each employee should have only one boss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse Unity of Direction with Unity of Command, writing "Unity of Direction means each employee should have only one boss".' }
          ],
            remediations: { 'students-often-confuse-unity-of': { steps: ['If a student confuses Unity of Direction with Unity of Command, have them draw two side-by-side diagrams: (1) an org.', 'Ask them to label the "head" and "plan" in each.', 'For Order, give them a messy warehouse sketch and ask them to design a grid-based zoning plan with coordinates for each.', 'For Equity, present a mini-case with three employees of different genders/regions but identical output receiving.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_007', difficulty: 'standard',
          question: 'Fayol vs Taylor comparison is the systematic analysis of differences between.',
          hint: 'If stuck, revisit c12_bs_cbse_02_002 and c12_bs_cbse_02_004 for Taylor/Fayol core.',
          misconception: 'Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY layers (Taylor =.',
          parts: [
                { id: 'a', prompt: 'State the seven bases of difference between Fayol and Taylor as listed in the NCERT textbook, without looking at your notes.', answer: 'The seven bases are: (1) Perspective',
                  options: ['The seven bases are: (1) Perspective', 'Unity of Command', 'Perspective'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Fayol and Taylor as COMPETING alternatives ("choose one") rather than COMPLEMENTARY layers (Taylor = operational engine,.' }
          ],
            remediations: { 'students-treat-fayol-and-taylor': { steps: ['If the student cannot articulate complementarity: Step 1 — Re-read the Bhasin Ltd case (NCERT p.66-68) where Part 6.', 'Step 2 — Map each Fayol violation (Unity of Command, Unity of Direction, Discipline, Initiative, Esprit de Corps) to.', 'Step 3 — Write one paragraph explaining HOW Taylor\'s shop-floor fixes ENABLE Fayol\'s administrative principles to.', 'Step 4 — Re-attempt Diagnostic Q3 and Q6.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_001', difficulty: 'standard',
          question: 'Principles of management are broad, general guidelines derived from practice.',
          hint: 'If stuck, revisit Class 11 Chapter 1 \'Nature and Significance of Management\'.',
          misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail.',
          parts: [
                { id: 'a', prompt: 'State the exact NCERT definition of \'principles of management\' and give one example of a managerial decision where two different principles could lead to.', answer: '"A managerial principle is a broad and general guideline for',
                  options: ['Correct answer: "A managerial principle is a broad and general guideline for', 'principles are rigid rules like laws of physics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorise the 7 nature points and 6 significance points as isolated lists, but in board exams they fail to apply them to a.' }
          ],
            remediations: { 'students-often-memorise-the-7': { steps: ['Re-read the NCERT \'Nature\' and \'Significance\' subsections aloud, highlighting the verbs: \'apply\', \'guide\', \'establish\',.', 'For each of the 7 nature points, write a one-line *application* in a school club context (e.g., \'Flexible: Club.', 'Take the Bhasin Ltd case (NCERT p.66) and map each problem to a violated principle + its nature/significance link.', 'Re-attempt Diagnostic Questions 2, 4, 5 with this case-mapping lens.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_008', difficulty: 'standard',
          question: 'Principles of management are broad, general guidelines derived from managerial.',
          hint: 'Revisit c12_bs_cbse_02_001 sections on "Flexible" and "Contingent" — write two sentences.',
          misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.',
          parts: [
                { id: 'a', prompt: 'Why does NCERT describe principles of management as "general guidelines" rather than "ready-made solutions"? Give a concrete business example.', answer: 'Principles are general guidelines',
                  options: ['Principles are general guidelines', 'principles give exact solutions', 'Principles ensure optimum utilisation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' },
                { id: 'b', prompt: 'A mid-sized textile firm gives the same annual bonus to all 200 workers regardless of individual or department performance.', answer: '"Scientific decisions" is violated',
                  options: ['"Scientific decisions" is violated', 'optimum utilisation', 'social responsibility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' }
          ],
            remediations: { 'students-memorise-the-six-significance': { steps: ['Re-read node **c12_bs_cbse_02_001** (Nature of Principles) focusing on points (iv) Flexible, (vi) Cause-effect.', 'Take the Bhasin Limited case (NCERT Exercise Q6): identify which *nature* point explains each violation (e.g.,.', 'Write one paragraph: "Principles are a compass, not a map — they show direction but you must navigate the terrain.".'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.',
          parts: [
                { id: 'a', prompt: 'Critique: "Principles of management are less than perfect because they deal with human behaviour." Provide two arguments supporting and two challenging this.', answer: 'Supporting: (1) Human behaviour is unpredictable',
                  options: ['Supporting: (1) Human behaviour is unpredictable', 'Principles ensure optimum utilisation', 'This error stems from ignoring NCERT\'s explicit statements', 'accurate cause-effect relationships may be difficult to establish'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorise the six significance points as a list but believe principles *guarantee* those outcomes.' }
          ],
            remediations: { 'students-memorise-the-six-significance': { steps: ['Re-read node **c12_bs_cbse_02_001** (Nature of Principles) focusing on points (iv) Flexible, (vi) Cause-effect.', 'Take the Bhasin Limited case (NCERT Exercise Q6): identify which *nature* point explains each violation (e.g.,.', 'Write one paragraph: "Principles are a compass, not a map — they show direction but you must navigate the terrain.".'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_02_009', difficulty: 'standard',
          question: 'Fayol\'s Principle of Initiative states that employees at all levels should be.',
          hint: 'Revisit c12_bs_cbse_02_007 (Fayol vs Taylor comparison) to clarify the administrative vs.',
          misconception: 'Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\' with \'being friendly.\'.',
          parts: [
                { id: 'a', prompt: 'A startup with 15 employees has the founder making all decisions: hiring, vendor selection, pricing, leave approvals.', answer: 'Fayol states "The degree of centralisation will depend upon the',
                  options: ['Correct answer: Fayol states "The degree of centralisation will depend upon the', 'Initiative means employees can take decisions on their own', 'within the framework of organisational policies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse \'Initiative\' with \'doing whatever you want\' and \'Esprit de Corps\' with \'being friendly.\' They write in exams:.' }
          ],
            remediations: { 'students-consistently-confuse-initiative-with': { steps: ['If a student exhibits the above misconceptions: (1) Have them re-read the NCERT text on Initiative (page 60-61) and.', 'It is one of the traits of an intelligent person.', 'Initiative should be encouraged.', 'But it does not mean going against the established practices of the company for the sake of being different." (2) For.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
