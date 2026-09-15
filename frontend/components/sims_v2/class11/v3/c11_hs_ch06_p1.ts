import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch06_p1: SimDef = {
    id: 'v3_c11_hs_ch06_p1',
    title: 'Communication and Extension · Part 1/2',
    subtitle: 'Learn the difference between transmitting a message and sharing a meaning.',
    classLevel: 11, subject: 'home_science', topic: 'Communication and Extension · Part 1/2',
    chapters: ['c11_hs_ch06'],
    nodeIds: ['c11_hs_cbse_06_001', 'c11_hs_cbse_06_002', 'c11_hs_cbse_06_003', 'c11_hs_cbse_06_004', 'c11_hs_cbse_06_005', 'c11_hs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an extension worker choosing how to reach a village', intro: 'Explaining UPI to your grandmother by phone: she heard every word and pressed the wrong buttons — did communication happen?', goal: 'Apply the feedback criterion to distinguish one-way and two-way communication in extension work.' },
    discovery: {
        question: 'A YouTube livestream to 10,000 viewers has a chat box — so it\'s two-way communication, right?',
        options: ['No — the creator reads a sliver of comments and adapts for no one; technical interactivity isn\'t communicative reciprocity', 'Yes — any channel back makes it two-way', 'Yes — digital means interactive by definition', 'No — because only radio counts as one-way'],
        answer: 'No — the creator reads a sliver of comments and adapts for no one; technical interactivity isn\'t communicative reciprocity',
        hook: 'Speaking isn\'t communicating — if the receiver\'s picture doesn\'t match the sender\'s, communication never happened; that\'s why feedback both starts and ends the loop.',
    },
    teaching: [
        { title: 'Communication: Definition, Concept and Scope', text: 'Communication is the continuous, dynamic process of creating shared understanding by encoding and transmitting thoughts, feelings, information, or ideas from a source to a receiver through a channel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a radio forecast, a helpline call and a WhatsApp homework thread by the feedback test, then defend where one-way still wins — cyclone sirens.',
        labels: ['Communication: Definition, Concept', 'One-way vs Two-way Communication', 'Levels of Communication: Intra-personal,', 'Mass Communication and Organisational', 'Verbal and Non-verbal Communication', 'SMCRE Model: Overview'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_001', title: 'Communication: Definition, Concept and Scope',
          caseStudy: { intro: 'Imagine you\'re trying to explain to your grandmother how to use a UPI payment app over a phone call — she hears your words but keeps pressing wrong buttons.',
            decisions: [{ prompt: 'Define communication in one sentence using the precise terminology from the NCERT textbook, including the Latin etymological root and the.', options: [
                { text: 'Communication is the process of thinking, observing, understanding, analysing, sharing,', outcome: 'Communication is the process of thinking, observing, understanding, analysing, sharing, and.' },
                { text: 'sending messages', outcome: 'Not quite — Students equate "communication" with "information transfer" and therefore classify any scenario.', reveals: 'students-equate-communication-with-information' },
                { text: 'exchange of information', outcome: 'Not quite — Students equate "communication" with "information transfer" and therefore classify any scenario.', reveals: 'students-equate-communication-with-information' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_002', title: 'One-way vs Two-way Communication',
          caseStudy: { intro: 'Imagine you are watching a recorded video lecture on YouTube about nutrition. You hear the teacher explain vitamins, but you cannot ask a doubt instantly.',
            decisions: [{ prompt: 'Define one-way communication and give one example from a classroom setting that is NOT a lecture.', options: [
                { text: 'One-way communication: Sender transmits message', outcome: 'One-way communication: Sender transmits message; receiver cannot reciprocate or respond.' },
                { text: 'students taking notes', outcome: 'Not quite — Students believe "digital/interactive technology automatically makes communication two-way.".', reveals: 'digital-interactive-technology-automatically-mak' },
                { text: 'digital/interactive technology automatically makes communication two-way', outcome: 'Not quite — Students believe "digital/interactive technology automatically makes communication two-way.".', reveals: 'digital-interactive-technology-automatically-mak' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_003', title: 'Levels of Communication: Intra-personal, Inter-personal and Group',
          caseStudy: { intro: 'Imagine you are preparing for a class presentation: first you rehearse silently in your head, correcting your phrasing—that is intra-personal communication.',
            decisions: [{ prompt: 'A student says, "Writing a diary entry every night is inter-personal communication because I am expressing my feelings to the diary.".', options: [
                { text: 'Correct answer: No, it is intra-personal communication', outcome: 'Correct answer: No, it is intra-personal communication. The diary is not a separate person capable.' },
                { text: 'expressing to an object', outcome: 'Not quite — Students often believe the classification depends solely on the number of people present: "2 people.', reveals: 'the-classification-depends-solely-on' },
                { text: 'interacting with a person', outcome: 'Not quite — Students often believe the classification depends solely on the number of people present: "2 people.', reveals: 'the-classification-depends-solely-on' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_004', title: 'Mass Communication and Organisational Communication',
          caseStudy: { intro: 'Imagine you see a TV advertisement for polio drops (mass communication) and later your school principal sends a circular to all teachers about a staff meeting.',
            decisions: [{ prompt: 'Define mass communication and state two characteristics of its audience as per NCERT Class 11.', options: [
                { text: 'Mass communication is the process of multiplying messages with mechanical devices and', outcome: 'Mass communication is the process of multiplying messages with mechanical devices and disseminating.' },
                { text: 'audience is small and known', outcome: 'Not quite — Students often equate "mass communication" with "any communication to many people" and.', reveals: 'students-often-equate-mass-communication' },
                { text: 'feedback is immediate', outcome: 'Not quite — Students often equate "mass communication" with "any communication to many people" and.', reveals: 'students-often-equate-mass-communication' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_005', title: 'Verbal and Non-verbal Communication',
          caseStudy: { intro: 'Imagine you are watching a classmate give a presentation: they say "I\'m confident about this topic" (verbal), but their hands tremble, voice cracks, and they.',
            decisions: [{ prompt: 'Define verbal communication and non-verbal communication as per NCERT Class 11, and give one example of para-language that is often.', options: [
                { text: 'Verbal communication uses auditory-verbal modes (speaking, singing, tone of voice,', outcome: 'Verbal communication uses auditory-verbal modes (speaking, singing, tone of voice, reading aloud).' },
                { text: 'written words', outcome: 'Not quite — Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign.', reveals: 'verbal-words' },
                { text: 'spoken auditory modes', outcome: 'Not quite — Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign.', reveals: 'verbal-words' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 1/2', spots: [
            { id: 's1', label: 'Communication Definition Concept and Scope', prompt: 'Which idea is this? — Communication is the continuous, dynamic process of creating shared understanding.', answer: 'Communication Definition Concept and Scope', options: ['Communication Definition Concept and Scope', 'One-way vs Two-way Communication', 'Mass Communication and Organisational Communication', 'Verbal and Non-verbal Communication'] },
            { id: 's2', label: 'One-way vs Two-way Communication', prompt: 'Which idea is this? — One-way communication is a linear process where the sender transmits information to the.', answer: 'One-way vs Two-way Communication', options: ['One-way vs Two-way Communication', 'Communication Definition Concept and Scope', 'Mass Communication and Organisational Communication', 'Verbal and Non-verbal Communication'] },
            { id: 's3', label: 'Mass Communication and Organisational Communication', prompt: 'Which idea is this? — Mass Communication is the process of disseminating messages to large, heterogeneous.', answer: 'Mass Communication and Organisational Communication', options: ['Mass Communication and Organisational Communication', 'Communication Definition Concept and Scope', 'One-way vs Two-way Communication', 'Verbal and Non-verbal Communication'] },
            { id: 's4', label: 'Verbal and Non-verbal Communication', prompt: 'Which idea is this? — Verbal communication is the transmission of messages using auditory-verbal modes such.', answer: 'Verbal and Non-verbal Communication', options: ['Verbal and Non-verbal Communication', 'Communication Definition Concept and Scope', 'One-way vs Two-way Communication', 'Mass Communication and Organisational Communication'] },
            { id: 's5', label: 'SMCRE Model Overview of the Communication Process', prompt: 'Which idea is this? — The SMCRE model is a linear framework that describes the communication process through.', answer: 'SMCRE Model Overview of the Communication Process', options: ['SMCRE Model Overview of the Communication Process', 'Communication Definition Concept and Scope', 'One-way vs Two-way Communication', 'Mass Communication and Organisational Communication'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A doctor explains a diagnosis in medical jargon; the patient nods but misunderstands. In class, a student calls this \'effective two-way communication — the doctor spoke and the patient listened.\' He also calls a 10,000-viewer livestream with a chat box \'two-way, because comments exist.\'',
            decisions: [{ prompt: 'What does communication actually require?', options: [
                { text: 'Demand shared understanding: communication (from communis, \'common\') completes only when the receiver\'s mental model matches the sender\'s intent — the jargon case failed despite transmission. And two-way needs simultaneous feedback that adjusts the message: a chat where the creator reads 0.1% of comments is a parasitic side-channel on a one-to-many broadcast, not reciprocity.', outcome: 'Both cases get reclassified: speaking ≠ communicating, and technical interactivity ≠ a closed feedback loop.' },
                { text: 'Count the doctor case — the message was sent and received; that\'s communication.', outcome: 'Transmission isn\'t communication: when interpretation diverges from intent, no common model formed — feedback is the evidence, not the endpoint.', reveals: 'sent-and-received-is-communication' },
                { text: 'Count the livestream — a chat feature makes it interactive technology, hence two-way.', outcome: 'A feature isn\'t a loop: without the sender adjusting to receivers in real time, the structure stays one-way broadcast with comments attached.', reveals: 'chat-box-means-two-way' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'One-way isn\'t inferior — when a cyclone\'s coming you want reach and fidelity, not a dialogue.',
            decisions: [{ prompt: 'What comes next? Communication and Extension · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Communication and Extension · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_001', difficulty: 'standard',
          question: 'Communication is the continuous, dynamic process of creating shared.',
          hint: 'If stuck, revisit the Class 6 Civics node c6_civics_ch15_035 "What is Media and Its Role.',
          misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent.',
          parts: [
                { id: 'a', prompt: 'A teacher delivers a 40-minute lecture on photosynthesis while students listen silently and take notes. No questions are asked during or after the lecture.', answer: 'This is one-way communication',
                  options: ['This is one-way communication', 'students learned something'],
                  hint: 'If stuck, revisit the Class 6 Civics node c6_civics_ch15_035 "What is Media and Its Role.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received.' },
                { id: 'b', prompt: 'Classify the following scenario into the correct *level of communication*: A student lies in bed at night, mentally rehearsing answers for tomorrow\'s viva.', answer: 'Intra-personal communication',
                  options: ['Intra-personal communication', 'inter-personal', 'reveals the student equates'],
                  hint: 'If stuck, revisit the Class 6 Civics node c6_civics_ch15_035 "What is Media and Its Role.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received.' },
                { id: 'c', prompt: 'Compare and contrast the sensory involvement and expected retention percentage for: (a) a student reading a printed textbook chapter, and (b) the same student.', answer: 'a student reading a printed textbook chapter, and (',
                  options: ['a student reading a printed textbook chapter, and (', 'reading is visual so 30-35%'],
                  hint: 'If stuck, revisit the Class 6 Civics node c6_civics_ch15_035 "What is Media and Its Role.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received.' }
          ],
            remediations: { 'students-equate-communication-with-information': { steps: ['If a student exhibits this misconception, do NOT re-read the definition.', 'Instead: (1) Present two parallel scenarios — Scenario A: Teacher explains a concept, student nods, later fails test.', 'Scenario B: Teacher explains, student paraphrases back, teacher confirms, student aces test.', '(2) Ask: "In which scenario did communication *actually* happen?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_002', difficulty: 'standard',
          question: 'One-way communication is a linear process where the sender transmits.',
          hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios.',
          misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify.',
          parts: [
                { id: 'a', prompt: 'Define one-way communication and give one example from a classroom setting that is NOT a lecture.', answer: 'One-way communication: Sender transmits message',
                  options: ['One-way communication: Sender transmits message', 'students taking notes', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios (TV.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'b', prompt: 'A student watches a live Instagram session by a celebrity. The celebrity reads comments aloud but cannot reply to all.', answer: 'Structurally one-way: The primary flow is celebrity → mass audience',
                  options: ['Structurally one-way: The primary flow is celebrity → mass audience', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios (TV.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'c', prompt: 'Compare one-way and two-way communication on: (i) Error correction capability, (ii) Persuasion effectiveness for behaviour change, (iii) Cognitive load.', answer: '(i) Two-way allows immediate error detection/correction via feedback',
                  options: ['(i) Two-way allows immediate error detection/correction via feedback', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios (TV.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' }
          ],
            remediations: { 'digital-interactive-technology-automatically-mak': { steps: ['Draw the SMCRE loop for a radio broadcast — show Receiver has no arrow back to Source.', 'Draw SMCRE for a phone call — show double-headed arrows.', 'Ask student to draw for YouTube live stream; they will draw a thin dotted line from Receiver to Source labelled "chat".', 'Point out: "Does the Source *depend* on that line to complete the cycle? If the chat breaks, does the broadcast stop?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify.',
          parts: [
                { id: 'a', prompt: '"Two-way communication is always superior to one-way communication for extension work in rural areas." Evaluate this statement.', answer: 'Statement is false',
                  options: ['Statement is false', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios (TV.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'b', prompt: 'Design a communication strategy for a new government nutrition scheme targeting rural mothers.', answer: 'Good answer: Phase 1 (Awareness)',
                  options: ['Good answer: Phase 1 (Awareness)', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios (TV.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' }
          ],
            remediations: { 'digital-interactive-technology-automatically-mak': { steps: ['Draw the SMCRE loop for a radio broadcast — show Receiver has no arrow back to Source.', 'Draw SMCRE for a phone call — show double-headed arrows.', 'Ask student to draw for YouTube live stream; they will draw a thin dotted line from Receiver to Source labelled "chat".', 'Point out: "Does the Source *depend* on that line to complete the cycle? If the chat breaks, does the broadcast stop?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_003', difficulty: 'standard',
          question: 'Levels of communication refer to the categorization of communication based.',
          hint: 'Revisit c11_hs_cbse_06_001 for the "shared understanding" definition and.',
          misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal.',
          parts: [
                { id: 'a', prompt: 'A student says, "Writing a diary entry every night is inter-personal communication because I am expressing my feelings to the diary." Is this correct?', answer: 'Correct answer: No, it is intra-personal communication',
                  options: ['Correct answer: No, it is intra-personal communication', 'expressing to an object', 'interacting with a person', '2 people = inter-personal, 3+ = group'],
                  hint: 'Revisit c11_hs_cbse_06_001 for the "shared understanding" definition and c11_hs_cbse_06_002 for the.',
                  misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal, 3+ = group." This.' },
                { id: 'b', prompt: 'Your school\'s Eco Club (12 members) meets to plan a tree-plantation drive.', answer: 'the full club meeting, (',
                  options: ['the full club meeting, (', 'only 3 people', '2 people = inter-personal, 3+ = group', 'group communication'],
                  hint: 'Revisit c11_hs_cbse_06_001 for the "shared understanding" definition and c11_hs_cbse_06_002 for the.',
                  misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal, 3+ = group." This.' }
          ],
            remediations: { 'the-classification-depends-solely-on': { steps: ['Show the student two 30-second videos—(a) a TED talk speaker addressing an audience, (b) a jury deliberation.', 'Have them map each video to the NCERT definitions: highlight "direct and personal," "participatory approach,".', 'Give a sorting card deck with 10 scenarios (diary writing, doctor-patient, family dinner, WhatsApp broadcast, etc.).', 'Debrief by asking them to articulate the decision rule they used—this makes the implicit criteria explicit and replaces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_004', difficulty: 'standard',
          question: 'Mass Communication is the process of disseminating messages to large.',
          hint: 'Revisit node c11_hs_cbse_06_003 (Levels of Communication) and create a comparison table.',
          misconception: 'Students often equate "mass communication" with "any communication to many people" and "organisational communication".',
          parts: [
                { id: 'a', prompt: 'Explain why a WhatsApp group message sent by a school principal to 50 teachers is NOT mass communication, even though it reaches many people simultaneously.', answer: 'It is intra-organisational communication because: (1) the audience (teachers) is',
                  options: ['It is intra-organisational communication because: (1) the audience (teachers) is', 'number of recipients'],
                  hint: 'Revisit node c11_hs_cbse_06_003 (Levels of Communication) and create a comparison table of the five.',
                  misconception: 'Students often equate "mass communication" with "any communication to many people" and "organisational communication" with "formal written.' }
          ],
            remediations: { 'students-often-equate-mass-communication': { steps: ['If the student makes the above error: Step 1 — Have them create a 3-column table: "Scenario | Audience Nature.', 'Fill 5 scenarios (TV ad, staff meeting, collector-sarpanch VC, folk theatre, inter-ministerial letter).', 'Step 2 — Ask: "Which column determines mass vs organisational?" Guide them to see audience relationship and feedback.', 'Step 3 — Give a borderline case: "A university Dean emails 5,000 students about exam dates." Have them classify and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_005', difficulty: 'standard',
          question: 'Verbal communication is the transmission of messages using auditory-verbal.',
          hint: 'If stuck, revisit Class 10 Biology node c10_bio_cbse_02_002 (Human Nervous System.',
          misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since we spend 70% of our active time in verbal communication, verbal communication is more important than non-verbal communication." Using.', answer: 'The 70% figure refers to time spent, not effectiveness or information retention',
                  options: ['The 70% figure refers to time spent, not effectiveness or information retention', 'verbal = words, non-verbal = no words'],
                  hint: 'If stuck, revisit Class 10 Biology node c10_bio_cbse_02_002 (Human Nervous System: Neurons and.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' },
                { id: 'b', prompt: 'Compare the communication effectiveness of three scenarios using the NCERT sensory retention hierarchy: (A) Teacher reads textbook aloud (audio only), (B).', answer: 'Rank: C (90%+) > B (50%+) > A (20-25%)',
                  options: ['Rank: C (90%+) > B (50%+) > A (20-25%)', 'verbal = words, non-verbal = no words'],
                  hint: 'If stuck, revisit Class 10 Biology node c10_bio_cbse_02_002 (Human Nervous System: Neurons and.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' }
          ],
            remediations: { 'verbal-words': { steps: ['Have the student physically sort 10 communication examples (text message, speech, emoji, sign language, posture, tone.', 'Ask: "When you read a book silently, which sense organ receives the message? Eyes. So which channel? Visual.', 'Contrast reading silently (non-verbal visual) vs. reading aloud (verbal auditory) — same words, different channels.', 'Revisit the 70% statistic: it counts listening, speaking, reading aloud — all auditory-vocal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_006', difficulty: 'standard',
          question: 'The SMCRE model is a linear framework that describes the communication process.',
          hint: 'If stuck, revisit the definition of communication (c11_hs_cbse_06_001) and the comparison.',
          misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why the SMCRE model is described as a "cycle" even though it is often drawn as a linear sequence.', answer: 'The model is a cycle',
                  options: ['The model is a cycle', 'it\'s linear because the diagram shows arrows in one direction'],
                  hint: 'If stuck, revisit the definition of communication (c11_hs_cbse_06_001) and the comparison.',
                  misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent system where each.' },
                { id: 'b', prompt: 'A school principal sends a circular about a new uniform policy via email to all parents. Some parents do not check email regularly and miss the information.', answer: 'The Channel element failed',
                  options: ['The Channel element failed', 'parents should check email'],
                  hint: 'If stuck, revisit the definition of communication (c11_hs_cbse_06_001) and the comparison.',
                  misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent system where each.' }
          ],
            remediations: { 'students-often-treat-the-smcre': { steps: ['Draw the SMCRE diagram with arrows showing two-way influence (e.g., Receiver characteristics → Channel choice; Message.', 'Give the student a mismatched scenario (e.g., "Send a detailed legal notice via WhatsApp voice note to elderly.', 'Have them redesign the scenario by changing only one element at a time, observing how the whole chain adjusts.', 'Require them to write a one-sentence "dependency rule" for each element (e.g., "Channel must be accessible to Receiver.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
