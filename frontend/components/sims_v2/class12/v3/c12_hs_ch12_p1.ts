import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch12_p1: SimDef = {
    id: 'v3_c12_hs_ch12_p1',
    title: 'Communication and Extension · Part 1/2',
    subtitle: 'A lecture that changed nothing — and why',
    classLevel: 12, subject: 'home_science', topic: 'Communication and Extension · Part 1/2',
    chapters: ['c12_hs_ch12'],
    nodeIds: ['c12_hs_cbse_12_001', 'c12_hs_cbse_12_002', 'c12_hs_cbse_12_003', 'c12_hs_cbse_12_004', 'c12_hs_cbse_12_005', 'c12_hs_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Extension programme designer', intro: 'The village sells its nutritious crops and buys polished rice. Extension begins by asking why — not by telling.', goal: 'Distinguish extension\'s participatory, problem-solving philosophy from formal education\'s classroom model.' },
    discovery: {
        question: 'A worker lectures thirty mothers on breastfeeding with slides; they listen silently and leave. Information delivered — so why isn\'t this extension education?',
        options: ['It violated the philosophy — teacher-centred, expert-agenda, no participation; extension starts where the people are, not where the PowerPoint begins', 'The topic was wrong', 'Mothers were tired', 'No projector budget'],
        answer: 'It violated the philosophy — teacher-centred, expert-agenda, no participation; extension starts where the people are, not where the PowerPoint begins',
        hook: 'Extension\'s scope isn\'t just agriculture — it spans health, home science and community development as one participatory weave. And the real test is behaviour change and self-reliance, not awareness: a lecture measured by attendance is formal education in a field.',
    },
    teaching: [
        { title: 'Extension Education: Meaning, Philosophy and Scope', text: 'Extension Education is an applied behavioural science that brings about desirable changes in human behaviour through educational strategies, empowering individuals and communities to identify and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build an anaemia programme the extension way: needs assessment with the girls themselves, map local iron-rich foods, facilitate recipe trials — and spot why \'give tablets and lecture\' misses the point.',
        labels: ['Extension Education: Meaning, Philosophy', 'Principles of Extension Education', 'Communication in Extension: Process', 'Extension Teaching Methods: Individual,', 'Selection and Use', 'Community Development: Concept, Principles'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_001', title: 'Extension Education: Meaning, Philosophy and Scope',
          caseStudy: { intro: 'Imagine you are a Home Science graduate working in a rural village where families struggle with malnutrition despite growing diverse crops.',
            decisions: [{ prompt: 'State the NCERT definition of Extension Education in your own words, highlighting the three key phrases that distinguish it from formal.', options: [
                { text: 'Extension Education is an applied behavioural science that brings desirable changes in', outcome: 'Extension Education is an applied behavioural science that brings desirable changes in human.' },
                { text: 'teaching farmers new techniques', outcome: 'Not quite — Students equate Extension Education with "government schemes delivery" or "teaching modern.', reveals: 'students-equate-extension-education-with' },
                { text: 'government schemes delivery', outcome: 'Not quite — Students equate Extension Education with "government schemes delivery" or "teaching modern.', reveals: 'students-equate-extension-education-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_002', title: 'Principles of Extension Education and Extension Teaching',
          caseStudy: { intro: 'Imagine you are an extension worker visiting a rural village to promote kitchen gardening for nutritional security.',
            decisions: [{ prompt: 'Define the Principle of Cultural Sensitivity in extension education and give one example of violating it in a rural Indian context.', options: [
                { text: 'The Principle of Cultural Sensitivity requires extension workers to respect and work', outcome: 'The Principle of Cultural Sensitivity requires extension workers to respect and work within the.' },
                { text: 'it means translating materials into local language', outcome: 'Not quite — Students memorise principles as isolated definitions (e.g., "Principle of Participation = involve.', reveals: 'students-memorise-principles-as-isolated' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_003', title: 'Communication in Extension: Process and SMCRE Model Elements',
          caseStudy: { intro: 'Imagine you are an extension worker introducing millet-based recipes to a village where wheat rotis dominate daily meals.',
            decisions: [{ prompt: 'In the SMCRE model applied to extension, which element is primarily responsible for ensuring the message is encoded in a language, format.', options: [
                { text: 'The **Message** element', outcome: 'The **Message** element. A wrong answer (e.g., "Channel" or "Receiver") reveals the student.' },
                { text: 'Channel', outcome: 'Not quite — Students treat SMCRE as a **linear checklist** (Source → Message → Channel → Receiver → Effect).', reveals: 'students-treat-smcre-as-a' },
                { text: 'Receiver', outcome: 'Not quite — Students treat SMCRE as a **linear checklist** (Source → Message → Channel → Receiver → Effect).', reveals: 'students-treat-smcre-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_004', title: 'Extension Teaching Methods: Individual, Group and Mass Approaches',
          caseStudy: { intro: 'Imagine you are an extension worker in a rural village in Maharashtra trying to convince 500 farmers to adopt a new drought-resistant millet variety.',
            decisions: [{ prompt: 'A REMEMBER level question: List the three categories of extension teaching methods based on audience size and interaction level, and give.', options: [
                { text: 'Correct answer: The three categories are (1) Individual methods', outcome: 'Correct answer: The three categories are (1) Individual methods — e.g., farm/home visit; (2) Group.' },
                { text: 'lecture, demonstration, discussion', outcome: 'Not quite — Students believe "modern/digital methods (WhatsApp, YouTube) are always better than traditional.', reveals: 'modern-digital-methods-whatsapp' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_005', title: 'Selection and Use of Audio-Visual Aids in Extension',
          caseStudy: { intro: 'Imagine you are an extension worker visiting a village to teach women about balanced diets using locally available millets.',
            decisions: [{ prompt: 'List the three broad categories of audio-visual aids used in extension work and give one example of each.', options: [
                { text: 'The three categories are: (1) Audio aids – e.g., radio, audio recordings', outcome: 'The three categories are: (1) Audio aids – e.g., radio, audio recordings; (2) Visual aids – e.g.' },
                { text: 'projector', outcome: 'Not quite — Students believe "audio-visual aids" only means electronic devices like projectors, TVs, and.', reveals: 'audio-visual-aids-only-means' },
                { text: 'audio-visual aids', outcome: 'Not quite — Students believe "audio-visual aids" only means electronic devices like projectors, TVs, and.', reveals: 'audio-visual-aids-only-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_006', title: 'Community Development: Concept, Principles and Programmes in India',
          caseStudy: { intro: 'Imagine you are a Home Science extension worker visiting a village where women spend hours fetching water and have no say in village decisions.',
            decisions: [{ prompt: 'Define community development in one sentence and name any two principles that distinguish it from top-down government schemes.', options: [
                { text: 'Correct answer: Community development is a participatory process where community members', outcome: 'Correct answer: Community development is a participatory process where community members.' },
                { text: 'government providing services to villages', outcome: 'Not quite — Students often equate community development with government welfare schemes (e.g., "PM Awas Yojana.', reveals: 'students-often-equate-community-development' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 1/2', spots: [
            { id: 's1', label: 'Extension Education Meaning Philosophy and Scope', prompt: 'Which idea is this? — Extension Education is an applied behavioural science that brings about desirable changes.', answer: 'Extension Education Meaning Philosophy and Scope', options: ['Extension Education Meaning Philosophy and Scope', 'Principles of Extension Education and Extension Teaching', 'Communication in Extension Process and SMCRE Model Elements', 'Selection and Use of Audio-Visual Aids in Extension'] },
            { id: 's2', label: 'Principles of Extension Education and Extension Teaching', prompt: 'Which idea is this? — Principles of Extension Education are foundational guidelines that ensure effective.', answer: 'Principles of Extension Education and Extension Teaching', options: ['Principles of Extension Education and Extension Teaching', 'Extension Education Meaning Philosophy and Scope', 'Communication in Extension Process and SMCRE Model Elements', 'Selection and Use of Audio-Visual Aids in Extension'] },
            { id: 's3', label: 'Communication in Extension Process and SMCRE Model Elements', prompt: 'Which idea is this? — Communication in extension is the systematic, two-way exchange of information, ideas, and.', answer: 'Communication in Extension Process and SMCRE Model Elements', options: ['Communication in Extension Process and SMCRE Model Elements', 'Extension Education Meaning Philosophy and Scope', 'Principles of Extension Education and Extension Teaching', 'Selection and Use of Audio-Visual Aids in Extension'] },
            { id: 's4', label: 'Selection and Use of Audio-Visual Aids in Extension', prompt: 'Which idea is this? — Selection and Use of Audio-Visual Aids in Extension refers to the systematic process.', answer: 'Selection and Use of Audio-Visual Aids in Extension', options: ['Selection and Use of Audio-Visual Aids in Extension', 'Extension Education Meaning Philosophy and Scope', 'Principles of Extension Education and Extension Teaching', 'Communication in Extension Process and SMCRE Model Elements'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An agriculture officer pushes a high-yield paddy variety into a low-rainfall district because it topped the state trial charts. The first crop fails; next season, nobody turns up to her demonstrations. She concludes \'farmers here are resistant to science.\'',
            decisions: [{ prompt: 'Which extension principles broke down?', options: [
                { text: 'Adaptability first, then satisfaction — a variety proven for 1500 mm rainfall isn\'t adaptable to a 700 mm zone, and the failed crop destroyed the visible benefit that keeps farmers coming; she read the dropout as stubbornness when it was the feedback loop doing its job.', outcome: 'The chapter links the two: unadapted advice produces no tangible gain, and no gain means no trust — \'resistant to science\' misnames a community that was failed by unadapted science.' },
                { text: 'The farmers were resistant — proven yields should have been adopted on faith.', outcome: 'Extension doesn\'t run on faith — adoption follows demonstrated local benefit; a state-level trial chart isn\'t local proof, and the first season\'s failure confirmed for them exactly what their conditions predicted.', reveals: 'faith-equals-evidence' },
                { text: 'She should have used louder promotion — better posters and a bigger launch event.', outcome: 'Promotion solves awareness, not fit — the seed was wrong for the zone, so amplifying the message amplifies the failure; principles are operational guides, not marketing volume.', reveals: 'promotion-equals-adaptation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell education for life from education in a classroom — where the learner is partner, not audience.',
            decisions: [{ prompt: 'What comes next? Communication and Extension · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Communication and Extension · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_001', difficulty: 'standard',
          question: 'Extension Education is an applied behavioural science that brings about.',
          hint: 'If stuck, revisit Class 11 Communication node c11_hs_cbse_06_006 (SMCRE Model: Overview).',
          misconception: 'Students equate Extension Education with "government schemes delivery" or "teaching modern techniques to farmers." They.',
          parts: [
                { id: 'a', prompt: 'A Home Science extension programme plans to address anaemia in adolescent girls in a tribal block.', answer: 'Steps and scope dimensions: 1',
                  options: ['Steps and scope dimensions: 1', 'give iron tablets and lecture on nutrition', 'government schemes delivery', 'teaching modern techniques to farmers'],
                  hint: 'If stuck, revisit Class 11 Communication node c11_hs_cbse_06_006 (SMCRE Model: Overview) and.',
                  misconception: 'Students equate Extension Education with "government schemes delivery" or "teaching modern techniques to farmers." They write: "Extension.' },
                { id: 'b', prompt: 'Compare the philosophy of Extension Education with the philosophy of Formal Education across FOUR dimensions: (a) role of learner, (b) source of curriculum.', answer: '| Dimension | Extension Education Philosophy | Formal Education Philosophy |',
                  options: ['| Dimension | Extension Education Philosophy | Formal Education Philosophy |', 'both aim to educate', 'government schemes delivery', 'teaching modern techniques to farmers'],
                  hint: 'If stuck, revisit Class 11 Communication node c11_hs_cbse_06_006 (SMCRE Model: Overview) and.',
                  misconception: 'Students equate Extension Education with "government schemes delivery" or "teaching modern techniques to farmers." They write: "Extension.' }
          ],
            remediations: { 'students-equate-extension-education-with': { steps: ['If a student holds this misconception, do this 3-step remediation: 1.', '**Contrast Exercise**: Give two scenarios — (A) Scientist lectures 50 farmers on HYV wheat; (B) Facilitator helps 10.', 'Ask: "Which is Extension Education?', 'Why?" Guide them to identify philosophy elements in B (participation, empowerment, problem-solving) absent in A.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate Extension Education with "government schemes delivery" or "teaching modern techniques to farmers." They.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Extension Education is only for rural, illiterate populations — urban educated people don\'t need it." Use the scope and philosophy.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'government schemes delivery', 'teaching modern techniques to farmers', 'Extension Education means KVK scientists training farmers on new seeds'],
                  hint: 'If stuck, revisit Class 11 Communication node c11_hs_cbse_06_006 (SMCRE Model: Overview) and.',
                  misconception: 'Students equate Extension Education with "government schemes delivery" or "teaching modern techniques to farmers." They write: "Extension.' }
          ],
            remediations: { 'students-equate-extension-education-with': { steps: ['If a student holds this misconception, do this 3-step remediation: 1.', '**Contrast Exercise**: Give two scenarios — (A) Scientist lectures 50 farmers on HYV wheat; (B) Facilitator helps 10.', 'Ask: "Which is Extension Education?', 'Why?" Guide them to identify philosophy elements in B (participation, empowerment, problem-solving) absent in A.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_002', difficulty: 'standard',
          question: 'Principles of Extension Education are foundational guidelines that ensure.',
          hint: 'Re-read c12_hs_cbse_12_001 sections on "Philosophy of Extension Education" and "Extension.',
          misconception: 'Students memorise principles as isolated definitions (e.g., "Principle of Participation = involve people") and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Principles of Extension Education are foundational guidelines that ensure effective',
                  options: ['Principles of Extension Education are foundational guidelines that ensure effective', 'Extension Education is an applied behavioural science that brings about desirable changes', 'Communication in extension is the systematic, two-way exchange of information, ideas, and', 'Extension teaching methods are systematic approaches used by extension workers to'],
                  hint: 'Re-read c12_hs_cbse_12_001 sections on "Philosophy of Extension Education" and "Extension vs Formal.',
                  misconception: 'Students memorise principles as isolated definitions (e.g., "Principle of Participation = involve people") and reproduce them in exams.' }
          ],
            remediations: { 'students-memorise-principles-as-isolated': { steps: ['Revisit c12_hs_cbse_12_001 (Extension Education: Meaning, Philosophy and Scope) — specifically the section.', 'For each of the 10 principles, write a 2-sentence "violation consequence" statement (e.g., "If Cultural Sensitivity.', 'Take one real extension case study (e.g., ICDS nutrition education, PM-KUSUM solar pumps) and map *all 10 principles*.', 'Re-attempt Diagnostic Questions 3, 4, 5 — they require principle *integration*, not recall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_003', difficulty: 'standard',
          question: 'Communication in extension is the systematic, two-way exchange of information.',
          hint: 'Revisit c11_hs_cbse_06_006, c11_hs_cbse_06_007, c11_hs_cbse_06_008 — focus on the.',
          misconception: 'Students treat SMCRE as a **linear checklist** (Source → Message → Channel → Receiver → Effect) rather than a **dynamic.',
          parts: [
                { id: 'a', prompt: 'In the SMCRE model applied to extension, which element is primarily responsible for ensuring the message is encoded in a language, format, and cultural context.', answer: 'The **Message** element',
                  options: ['The **Message** element', 'Channel', 'Receiver'],
                  hint: 'Revisit c11_hs_cbse_06_006, c11_hs_cbse_06_007, c11_hs_cbse_06_008 — focus on the *interdependence*.',
                  misconception: 'Students treat SMCRE as a **linear checklist** (Source → Message → Channel → Receiver → Effect) rather than a **dynamic system with.' }
          ],
            remediations: { 'students-treat-smcre-as-a': { steps: ['**Revisit c11_hs_cbse_06_006, c11_hs_cbse_06_007, c11_hs_cbse_06_008** — re-learn SMCRE elements as *interdependent.', '**Do this exercise:** Take a failed extension case (e.g., low uptake of soil health cards).', 'Map it to SMCRE *backwards*: Start from Effect (low adoption) → ask "Which Receiver barrier?" → "Which Channel.', '**Re-diagnostic:** Given a new scenario (promoting kitchen waste composting in urban slums), write a 2-page SMCRE.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_004', difficulty: 'standard',
          question: 'Extension teaching methods are systematic approaches used by extension workers.',
          hint: 'Revisit c12_hs_cbse_12_003: Focus on the Channel element — list 3 interpersonal, 3 group.',
          misconception: 'Students believe "modern/digital methods (WhatsApp, YouTube) are always better than traditional methods" and classify.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List the three categories of extension teaching methods based on audience size and interaction level, and give one example of each.', answer: 'Correct answer: The three categories are (1) Individual methods',
                  options: ['Correct answer: The three categories are (1) Individual methods', 'lecture, demonstration, discussion'],
                  hint: 'Revisit c12_hs_cbse_12_003: Focus on the Channel element — list 3 interpersonal, 3 group, and 3.',
                  misconception: 'Students believe "modern/digital methods (WhatsApp, YouTube) are always better than traditional methods" and classify them as a separate.' },
                { id: 'b', prompt: 'An ANALYZE level question: Compare the cost-effectiveness of individual, group, and mass methods for reaching 1,000 farm families with a new composting.', answer: 'Correct answer: Mass methods (radio, TV)',
                  options: ['Correct answer: Mass methods (radio, TV)', 'individual is best'],
                  hint: 'Revisit c12_hs_cbse_12_003: Focus on the Channel element — list 3 interpersonal, 3 group, and 3.',
                  misconception: 'Students believe "modern/digital methods (WhatsApp, YouTube) are always better than traditional methods" and classify them as a separate.' }
          ],
            remediations: { 'modern-digital-methods-whatsapp': { steps: ['If the student cannot distinguish categories by audience/interaction rather than technology: Step 1 — Draw a 2×2 matrix.', 'Step 2 — Place 6 methods (farm visit, method demo, radio, WhatsApp personal, WhatsApp group, YouTube) in the matrix.', 'Step 3 — Derive the three categories from the clusters.', 'Step 4 — Re-attempt Diagnostic Question 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_005', difficulty: 'standard',
          question: 'Selection and Use of Audio-Visual Aids in Extension refers to the systematic.',
          hint: 'If stuck, revisit the "Channel" element in SMCRE model (c12_hs_cbse_12_003) and practice.',
          misconception: 'Students believe "audio-visual aids" only means electronic devices like projectors, TVs, and computers.',
          parts: [
                { id: 'a', prompt: 'List the three broad categories of audio-visual aids used in extension work and give one example of each.', answer: 'The three categories are: (1) Audio aids – e.g., radio, audio recordings',
                  options: ['The three categories are: (1) Audio aids – e.g., radio, audio recordings', 'projector', 'audio-visual aids', 'no audio-visual aids were used'],
                  hint: 'If stuck, revisit the "Channel" element in SMCRE model (c12_hs_cbse_12_003) and practice matching 5.',
                  misconception: 'Students believe "audio-visual aids" only means electronic devices like projectors, TVs, and computers.' },
                { id: 'b', prompt: 'You are conducting a demonstration on "correct handwashing technique" for school children in a rural primary school with no electricity.', answer: 'Best choice: (b) Flip chart with step-by-step photos',
                  options: ['Best choice: (b) Flip chart with step-by-step photos', 'audio-visual aids', 'no audio-visual aids were used'],
                  hint: 'If stuck, revisit the "Channel" element in SMCRE model (c12_hs_cbse_12_003) and practice matching 5.',
                  misconception: 'Students believe "audio-visual aids" only means electronic devices like projectors, TVs, and computers.' }
          ],
            remediations: { 'audio-visual-aids-only-means': { steps: ['Revisit c12_hs_cbse_12_003 (Communication in Extension: SMCRE Model) to recall that "Channel" includes all sensory.', 'Create a 3-column table: Audio / Visual / Audio-Visual. Fill with 5 examples each from memory, then verify against.', 'Practice classifying 10 random extension scenarios (e.g., "puppet show on sanitation," "WhatsApp voice note on market.', 'Re-attempt Diagnostic Questions 1 and 6. If classification errors persist, the gap is in understanding the sensory.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_006', difficulty: 'standard',
          question: 'Community Development is a participatory process where community members.',
          hint: 'If stuck, revisit c12_hs_cbse_12_002 Principles of Extension Education and identify which.',
          misconception: 'Students often equate community development with government welfare schemes (e.g., "PM Awas Yojana is community.',
          parts: [
                { id: 'a', prompt: 'Explain why the principle of \'equity\' in community development requires special provisions for marginalised groups (SC/ST, women, persons with disabilities).', answer: 'Correct answer: Equity means fairness, not sameness',
                  options: ['Correct answer: Equity means fairness, not sameness', 'equity means everyone gets the same resources'],
                  hint: 'If stuck, revisit c12_hs_cbse_12_002 Principles of Extension Education and identify which extension.',
                  misconception: 'Students often equate community development with government welfare schemes (e.g., "PM Awas Yojana is community development because.' },
                { id: 'b', prompt: 'A village has received MGNREGA funds to build a check dam. The sarpanch hires a contractor who uses machines and employs only 10 workers for 15 days.', answer: 'Correct answer: Violated principles: (1) Participation',
                  options: ['Correct answer: Violated principles: (1) Participation', 'corruption'],
                  hint: 'If stuck, revisit c12_hs_cbse_12_002 Principles of Extension Education and identify which extension.',
                  misconception: 'Students often equate community development with government welfare schemes (e.g., "PM Awas Yojana is community development because.' },
                { id: 'c', prompt: 'Compare the Community Development Programme (1952) and the National Rural Livelihoods Mission (NRLM) on three dimensions: (a) target group, (b) role.', answer: 'Correct answer: (a) CDP targeted whole villages through block-level officials',
                  options: ['Correct answer: (a) CDP targeted whole villages through block-level officials', 'both are government schemes for villages'],
                  hint: 'If stuck, revisit c12_hs_cbse_12_002 Principles of Extension Education and identify which extension.',
                  misconception: 'Students often equate community development with government welfare schemes (e.g., "PM Awas Yojana is community development because.' }
          ],
            remediations: { 'students-often-equate-community-development': { steps: ['If a student holds this misconception, do NOT just re-read the definition.', 'Instead: (1) Give two case cards — Case A: Contractor builds 50 toilets in a week; Case B: Women\'s group maps open.', '(2) Ask: "Which case builds community capacity to solve future problems?" (3) Have student identify the principles.', '(4) Revisit node c12_hs_cbse_12_002 (Principles of Extension Education) to link extension principles (participation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
