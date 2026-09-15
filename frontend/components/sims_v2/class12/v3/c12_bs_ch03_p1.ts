import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch03_p1: SimDef = {
    id: 'v3_c12_bs_ch03_p1',
    title: 'Business Environment · Part 1/2',
    subtitle: 'Four shocks in one morning, none of them yours — welcome to the business environment.',
    classLevel: 12, subject: 'business_studies', topic: 'Business Environment · Part 1/2',
    chapters: ['c12_bs_ch03'],
    nodeIds: ['c12_bs_cbse_03_001', 'c12_bs_cbse_03_002', 'c12_bs_cbse_03_003', 'c12_bs_cbse_03_004', 'c12_bs_cbse_03_005', 'c12_bs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Strategy analyst', intro: 'No business operates in a vacuum — the environment writes half your strategy before you enter the room.', goal: 'Define the business environment and classify its economic, social, technological, political and legal dimensions.' },
    discovery: {
        question: 'Overnight: a new food-labelling law passes, consumers shift to millets, RBI cuts rates, and a rival launches 20% cheaper. Your cloud kitchen controlled none of it — what is this force called?',
        options: ['The business environment — external economic, social, legal, technological and political forces that shape performance but lie beyond the firm\'s control', 'Bad luck — random events with no systematic pattern', 'Internal weakness — the firm should have prevented these changes', 'Market demand — all four events are forms of consumer preference'],
        answer: 'The business environment — external economic, social, legal, technological and political forces that shape performance but lie beyond the firm\'s control',
        hook: 'Students confuse \'environment\' with \'competition\' — but the concept covers every external force: legal, social, economic, technological, political. You can\'t control it; you can only read it early.',
    },
    teaching: [
        { title: 'Business Environment: Meaning, Characteristics and Importance', text: 'Business environment refers to the sum total of all external individuals, institutions, and forces — such as economic, social, political, technological, and legal factors — that are outside the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run an environmental scan for a packaged-food company: sort five overnight shocks into economic, social, technological, political and legal dimensions, and decide which demand a strategy response.',
        labels: ['Business Environment: Meaning, Characteristics', 'Elements of Business Environment', 'Economic Environment in India', 'Social Environment: Demographics, Culture', 'Technological Environment: Impact', 'Political and Legal Environment'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_001', title: 'Business Environment: Meaning, Characteristics and Importance',
          caseStudy: { intro: 'Imagine you run a small cloud-kitchen selling millet-based snacks.',
            decisions: [{ prompt: 'State the NCERT definition of business environment in one sentence.', options: [
                { text: 'Business environment is the sum total of all individuals, institutions and other forces', outcome: 'Business environment is the sum total of all individuals, institutions and other forces that are.' },
                { text: 'outside the control', outcome: 'Not quite — Students often confuse "dimensions of business environment" (economic, social, technological.', reveals: 'students-often-confuse-dimensions-of' },
                { text: 'may affect its performance', outcome: 'Not quite — Students often confuse "dimensions of business environment" (economic, social, technological.', reveals: 'students-often-confuse-dimensions-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_002', title: 'Elements of Business Environment: Economic, Social, Technological, Political, Legal',
          caseStudy: { intro: 'Imagine you are the CEO of a mid-sized Indian packaged-food company.',
            decisions: [{ prompt: 'Define the term "Legal Environment" of business as per NCERT Class 12, and give one example of a specific legislation that constitutes this.', options: [
                { text: 'Correct answer: Legal environment includes various legislations passed by the Government,', outcome: 'Correct answer: Legal environment includes various legislations passed by the Government.' },
                { text: 'laws made by Parliament', outcome: 'Not quite — Students often memorise the five dimension names and a few bullet-point examples but treat them.', reveals: 'students-often-memorise-the-five' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_003', title: 'Economic Environment in India: Impact on Business',
          caseStudy: { intro: 'Imagine you are advising a family-owned textile manufacturing firm in Surat that has operated since 1985.',
            decisions: [{ prompt: 'Define \'economic environment of business in India\' as per NCERT, listing any four macro-level factors that constitute it.', options: [
                { text: 'The economic environment in India consists of various macro-level factors related to the', outcome: 'The economic environment in India consists of various macro-level factors related to the means.' },
                { text: 'lists only micro factors (e', outcome: 'Not quite — Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG.', reveals: 'students-conflate-liberalisation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_004', title: 'Social Environment: Demographics, Culture and Consumer Preferences',
          caseStudy: { intro: 'Imagine you are advising a startup that wants to launch a ready‑to‑cook millet‑based breakfast range in urban India. Where do you begin?',
            decisions: [{ prompt: 'Define "Social Environment" in the context of business environment as per NCERT Class 12.', options: [
                { text: 'Social Environment means the social forces like customs, traditions, values, social', outcome: 'Social Environment means the social forces like customs, traditions, values, social trends.' },
                { text: 'society', outcome: 'Not quite — Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone.', reveals: 'students-often-treat-social-environment' },
                { text: 'culture', outcome: 'Not quite — Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone.', reveals: 'students-often-treat-social-environment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_006', title: 'Political and Legal Environment: Government Policies and Regulations',
          caseStudy: { intro: 'Imagine you are the owner of a startup planning to launch a new energy drink in India.',
            decisions: [{ prompt: 'Define \'political environment\' and \'legal environment\' as dimensions of business environment. Give one example of each.', options: [
                { text: 'Political environment includes political stability, government ideology, and attitudes of', outcome: 'Political environment includes political stability, government ideology, and attitudes of elected.' },
                { text: 'political environment is the laws made by politicians', outcome: 'Not quite — Students often think "political environment = elections" and "legal environment = court cases.".', reveals: 'political-environment-elections-and-legal' },
                { text: 'political environment = elections', outcome: 'Not quite — Students often think "political environment = elections" and "legal environment = court cases.".', reveals: 'political-environment-elections-and-legal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An intern briefing a kirana-store owner says: \'A new competitor next door is a general force that affects all firms equally, while the new digital-billing mandate is a specific force aimed only at your shop.\'',
            decisions: [{ prompt: 'Did she classify the forces correctly?', options: [
                { text: 'She has it backwards — a new competitor is a specific force hitting this firm directly, while a billing mandate is a general (legal) force applying to all enterprises indirectly.', outcome: 'Specific forces (customers, competitors, suppliers, investors) act on one firm directly; general forces (social, political, legal, technological) press on every firm at once.' },
                { text: 'Yes — whatever affects many firms is \'specific\' to the industry, and a government rule naming a threshold targets only some firms.', outcome: 'Scope, not personal naming, decides the class: the mandate applies economy-wide even though it bites each firm differently.', reveals: 'specific-general-swapped' },
                { text: 'Yes — and since both are external forces, the distinction doesn\'t matter for planning.', outcome: 'It matters a lot: specific forces get firm-level responses (differentiate from the rival); general forces get compliance and positioning responses.', reveals: 'force-type-irrelevant' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now read the world as a manager does — five dimensions of forces you can\'t control but must anticipate. Environment dimensions are classic board content and the first skill of strategy.',
            decisions: [{ prompt: 'What comes next? Business Environment · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Business Environment · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_001', difficulty: 'standard',
          question: 'Business environment refers to the sum total of all external individuals.',
          hint: 'Revisit Class 11 Business Studies Chapter 1 (nodes c11_bs_cbse_01_003 and.',
          misconception: 'Students often confuse "dimensions of business environment" (economic, social, technological, political, legal) with.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Specific forces affect all firms equally, while general forces affect only one firm." Explain why this statement is incorrect and give one.', answer: 'The student has reversed the definitions',
                  options: ['The student has reversed the definitions', 'dimensions of business environment', 'characteristics of business environment'],
                  hint: 'Revisit Class 11 Business Studies Chapter 1 (nodes c11_bs_cbse_01_003 and c11_bs_cbse_01_010).',
                  misconception: 'Students often confuse "dimensions of business environment" (economic, social, technological, political, legal) with "characteristics.' }
          ],
            remediations: { 'students-often-confuse-dimensions-of': { steps: ['Have the student make two side-by-side columns — "Characteristics (7)" and "Dimensions (5)" — and write the NCERT.', 'Give three one-line scenarios (e.g., "GST rate changed", "Consumer preference shifted to vegan", "New competitor.', 'If they still mix them, re-read the NCERT paragraphs "On the basis of the foregoing discussion, it can be said business.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_002', difficulty: 'standard',
          question: 'The elements of business environment refer to the five broad external.',
          hint: 'If unable to recall the seven features or six importance points, revisit node.',
          misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent.',
          parts: [
                { id: 'a', prompt: 'A small furniture manufacturer in Jodhpur reads that the RBI has reduced the repo rate by 75 bps.', answer: 'Correct answer: Dimension = Economic Environment (interest rate change)',
                  options: ['Correct answer: Dimension = Economic Environment (interest rate change)', 'it will increase profits directly'],
                  hint: 'If unable to recall the seven features or six importance points, revisit node c12_bs_cbse_03_001.',
                  misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent checklists.' },
                { id: 'b', prompt: 'Compare the "Political Environment" and "Legal Environment" dimensions.', answer: 'Correct answer: Political environment refers to the broader political',
                  options: ['Correct answer: Political environment refers to the broader political', 'government policy'],
                  hint: 'If unable to recall the seven features or six importance points, revisit node c12_bs_cbse_03_001.',
                  misconception: 'Students often memorise the five dimension names and a few bullet-point examples but treat them as independent checklists.' }
          ],
            remediations: { 'students-often-memorise-the-five': { steps: ['Re-read the NCERT paragraph on "Inter-relatedness" (page 71) and the "Dimensions" section (pages 74-78).', 'Take the demonetisation example from the textbook (pages 86-87) and explicitly map each bullet (interest rates, private.', 'Practice writing one 4-mark answer daily for a week using the template: "Event → Dimension 1 impact → Dimension 2.', 'Self-check: Does my answer show arrows between dimensions? If not, rewrite.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_003', difficulty: 'standard',
          question: 'The economic environment in India refers to the aggregate of macro-level.',
          hint: 'If unable to separate liberalisation/privatisation/globalisation measures, revisit.',
          misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the.',
          parts: [
                { id: 'a', prompt: 'Explain why the pre-1991 Indian economic model, despite achieving self-reliance in heavy industry, led to a balance of payments crisis by 1991.', answer: 'The pre-1991 model prioritised heavy industry under public sector via import',
                  options: ['The pre-1991 model prioritised heavy industry under public sector via import', 'corruption', 'population'],
                  hint: 'If unable to separate liberalisation/privatisation/globalisation measures, revisit.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' },
                { id: 'b', prompt: 'Compare the impact of privatisation via disinvestment (post-1991) versus the pre-1991 public sector dominance on: (a) budgetary support to public sector, (b).', answer: 'budgetary support to public sector, (',
                  options: ['budgetary support to public sector, (', 'privatisation solved all inefficiencies'],
                  hint: 'If unable to separate liberalisation/privatisation/globalisation measures, revisit.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' }
          ],
            remediations: { 'students-conflate-liberalisation': { steps: ['Have the student draw a three-column table with headers "Liberalisation", "Privatisation", "Globalisation".', 'For each, list exactly two specific policy actions from the 1991 Industrial Policy (e.g., Liberalisation: abolished.', 'For each action, write one direct business impact (e.g., "Firm can now expand capacity without government permission").', 'Re-attempt Diagnostic Question 3 and 4. If the student still merges columns, revisit c12_bs_cbse_03_001 (meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Demonetisation (November 2016) was primarily a monetary policy tool to curb black money, and its impact on business environment was.', answer: 'The statement is partially correct on intent but incorrect on uniform negativity',
                  options: ['The statement is partially correct on intent but incorrect on uniform negativity', 'complete failure', 'masterstroke'],
                  hint: 'If unable to separate liberalisation/privatisation/globalisation measures, revisit.',
                  misconception: 'Students conflate \'liberalisation\', \'privatisation\', and \'globalisation\' as synonyms, writing "LPG reforms opened the economy" without.' }
          ],
            remediations: { 'students-conflate-liberalisation': { steps: ['Have the student draw a three-column table with headers "Liberalisation", "Privatisation", "Globalisation".', 'For each, list exactly two specific policy actions from the 1991 Industrial Policy (e.g., Liberalisation: abolished.', 'For each action, write one direct business impact (e.g., "Firm can now expand capacity without government permission").', 'Re-attempt Diagnostic Question 3 and 4. If the student still merges columns, revisit c12_bs_cbse_03_001 (meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_004', difficulty: 'standard',
          question: 'Social Environment refers to the aggregate of societal forces — customs.',
          hint: 'Revisit Class 8 Economics nodes c8_eco_ch2_1 to c8_eco_ch2_9 for demography basics, and.',
          misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how "inter‑relatedness" (a feature of business environment) operates between the social and economic environments.', answer: 'Inter‑relatedness means a change in one dimension triggers changes in another',
                  options: ['Inter‑relatedness means a change in one dimension triggers changes in another', 'treats social and economic as isolated silos, or gives only a one‑way link'],
                  hint: 'Revisit Class 8 Economics nodes c8_eco_ch2_1 to c8_eco_ch2_9 for demography basics, and Class 11.',
                  misconception: 'Students often treat "Social Environment" as synonymous with "Culture" or "Traditions" alone, ignoring the hard demographic variables.' }
          ],
            remediations: { 'students-often-treat-social-environment': { steps: ['Re‑read the "Major Elements of Social Environment" box in NCERT (page 76) and convert each of the 10 bullet points into.', 'Take the worked examples below and, for each, highlight which specific bullet point(s) drive the business decision.', 'Attempt Diagnostic Question 3 again, this time explicitly naming the NCERT bullet point for each factor identified.', 'If still stuck, revisit Class 8 Economics node c8_eco_ch2_1 (Demography: Study of Human Population) and c8_eco_ch2_9.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_005', difficulty: 'standard',
          question: 'The technological environment comprises forces relating to scientific.',
          hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and focus on the.',
          misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The technological environment comprises forces relating to scientific improvements and',
                  options: ['The technological environment comprises forces relating to scientific improvements and', 'Business environment refers to the sum total of all external individuals, institutions,', 'The elements of business environment refer to the five broad external', 'The economic environment in India refers to the aggregate of macro-level factors'],
                  hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and focus on the \'Technological.',
                  misconception: 'Students often equate \'technological environment\' with \'digital presence\' (having a website, using email).' }
          ],
            remediations: { 'students-often-equate-technological-environment': { steps: ['Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and re-read the \'Technological Environment\' subsection.', 'Watch a 10-minute case study on \'How Jio disrupted Indian telecom\' (available on YouTube) and map each disruption.', 'Re-attempt Diagnostic Question 4 with this broader lens.', 'If confusion persists, discuss with teacher using the \'inter-relatedness\' feature of business environment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_03_006', difficulty: 'standard',
          question: 'The political environment refers to the political conditions such as the.',
          hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and the NCERT table.',
          misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The legal environment only consists of laws passed by Parliament." Explain why this statement is incomplete.', answer: 'The legal environment also includes administrative orders issued by government',
                  options: ['The legal environment also includes administrative orders issued by government', 'political environment = elections', 'legal environment = court cases', '"political environment = elections" and "legal environment = court cases'],
                  hint: 'Revisit c12_bs_cbse_03_002 (Elements of Business Environment) and the NCERT table "Dimensions.',
                  misconception: 'Students often think "political environment = elections" and "legal environment = court cases." They miss that political environment.' }
          ],
            remediations: { 'political-environment-elections-and-legal': { steps: ['If the student conflates political and legal dimensions, do this 3-step remediation: (1) Re-read the NCERT box "Major.', '(2) Take a recent business news item (e.g., "Govt proposes new data protection bill") and classify each sentence.', '(3) Re-attempt Diagnostic Questions 2 and 4 — if still wrong, revisit Class 11 node c11_bs_cbse_06_007 (Social.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
