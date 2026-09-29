import type { SimDef } from '../../engine/types';
import C11_HomeScienceIndividualCommunicationVerbalSim from '../../../simulations/c6_12/C11_HomeScienceIndividualCommunicationVerbalSim';

/** v3 wrapped master — C11_HomeScienceIndividualCommunicationVerbalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_homescienceindividualcommunicationverbalsim: SimDef = {
    id: 'v3w_c11_homescienceindividualcommunicationverbalsim',
    title: 'Communication: Definition, Concept and Scope',
    subtitle: 'This node covers the definition, etymological basis, four-fold classification framework.',
    classLevel: 11, subject: 'science', topic: 'Communication: Definition, Concept and Scope',
    chapters: [],
    nodeIds: ['c11_hs_cbse_06_001', 'c11_hs_cbse_06_003', 'c11_hs_cbse_06_004', 'c11_hs_cbse_06_005', 'c11_hs_cbse_06_002', 'c11_hs_cbse_06_006', 'c11_hs_cbse_06_007', 'c11_hs_cbse_06_008', 'c11_hs_cbse_06_009', 'c11_hs_cbse_06_010', 'c11_hs_cbse_06_011', 'c11_hs_cbse_06_012', 'c11_hs_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re trying to explain to your grandmother how to use a UPI payment app over a phone call — she.', goal: 'Master Communication: Definition, Concept and Scope.' },
    discovery: {
        question: 'Classify the following scenario into the correct *level of communication*: A student lies in bed at night, mentally rehearsing answers for tomorrow\'s viva.',
        options: ['Intra-personal communication', 'inter-personal', 'reveals the student equates'],
        answer: 'Intra-personal communication',
        hook: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent.',
    },
    teaching: [
        { title: 'Communication is the continuous, dynamic.', text: 'Communication is the continuous, dynamic process of creating shared understanding by encoding and transmitting thoughts, feelings, information, or ideas from a source to a receiver through a channel,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_001', title: 'Communication is the continuous,.',
          scaffold: { problem: 'A government health department launches a radio campaign in Hindi promoting ORS (Oral Rehydration Solution) for childhood diarrhoea in.',
            steps: [
            { text: 'Map the campaign to SMCRE elements — Source: Health Department; Message: ORS preparation steps + importance; Channel:.' },
            { text: 'Identify the communication objective — not mere awareness (recall) but behavioural change (correct ORS preparation).' },
            { text: 'Diagnose the channel-audience mismatch — Radio is audio-only (10-25% retention per sensory table).' },
            { text: 'Diagnose the feedback failure — The survey measured *recall* (exposure), not *comprehension* or *performance*.' },
            { text: 'Determine why one-way mass communication failed for skill adoption — Radio is one-way (no immediate reciprocation).' },
            { text: 'Propose modification — Shift to inter-personal or group communication (ASHA worker home visits or village meetings).', faded: true, blankAnswer: 'The Channel (radio/audio-only) and Feedback (delayed recall.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_003', title: 'Levels of communication refer to the.',
          scaffold: { problem: 'Riya is the captain of her school\'s debate team (6 members). They have 20 minutes to prepare a case for the motion "Social media does more.',
            steps: [
            { text: 'Identify the first moment—Riya reads the motion silently in the prep room. Participants: Riya only.' },
            { text: 'Identify the next moment—Riya pairs with her co-captain to test arguments. Participants: 2 (Riya + co-captain).' },
            { text: 'Identify the next moment—Full team of 6 gathers, Riya facilitates. Participants: 6.' },
            { text: 'Verify boundaries—Is the full team discussion still inter-personal?' },
            { text: 'Synthesize—Riya\'s communication competence requires shifting self-talk (intra), active listening (inter), facilitation.', faded: true, blankAnswer: 'Level 1: Intra-personal (Riya alone, internal feedback,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_004', title: 'Mass Communication is the process of.',
          scaffold: { problem: 'Classify each scenario and justify using NCERT criteria: (i) A farmer calls the Kisan Call Centre (IVR) to hear a recorded message on pest.',
            steps: [
            { text: 'Identify the source, audience, channel, and feedback mechanism for each scenario.' },
            { text: 'For (i): Source = Kisan Call Centre (organisation), Audience = individual farmer (known, specific), Channel =.' },
            { text: 'For (ii): Source = BDO (organisational role), Audience = 15 Secretaries (known, specific roles, same administrative.' },
            { text: 'For (iii): Source = Doordarshan (broadcast institution), Audience = millions of anonymous viewers across regions,.' },
            { text: 'Verify each classification against NCERT definitions: mass communication requires mechanical multiplication, anonymous.', faded: true, blankAnswer: '(i) Intra-organisational (service interaction), (ii).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_005', title: 'Verbal communication is the.',
          scaffold: { problem: 'A health worker in a rural village must communicate "boil water before drinking" to a mixed-literacy audience.',
            steps: [
            { text: 'Identify the core message (boil water) and audience constraints (mixed literacy, rural setting, possible language.' },
            { text: 'Map NCERT retention hierarchy: Audio only (radio announcement) = 20-25%; Visual only (poster) = 30-35%; Audio-visual.' },
            { text: 'Design multi-mode strategy: (a) Verbal audio: Community radio announcement in local dialect (20-25% reach).' },
            { text: 'Justify mode selection: Verbal radio reaches those absent; visual poster persists over time; demonstration combines.' },
            { text: 'Calculate expected population-level retention: Weighted average assuming 20% radio-only, 30% poster-only, 30% demo.', faded: true, blankAnswer: 'Multi-mode strategy combining radio (verbal audio), poster.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_002', title: 'One-way communication is a linear.',
          scaffold: { problem: 'A District Health Officer must communicate a new vaccination schedule to 50,000 households across 200 villages in 10 days.',
            steps: [
            { text: 'Break the message into components: (a) Date/Time/Venue (fixed facts), (b) Age eligibility (fixed rule), (c) Documents.' },
            { text: 'Classify each component\'s feedback need: (a,b,c) Zero tolerance for error, high reach needed, no negotiation → one-way.' },
            { text: 'Select channels: For (a,b,c) → Radio spots, loudspeaker announcements, printed posters at Panchayat offices (one-way,.' },
            { text: 'Design transition: One-way blast on Day 1-3 creates awareness; ASHA visits Day 4-8 address (d,e); Helpline active.' },
            { text: 'Verify against constraints: 10 days, 50k households. One-way covers all in 3 days.', faded: true, blankAnswer: 'Mixed strategy: One-way for fixed facts (date, time, venue,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_06_006', title: 'The SMCRE model is a linear framework.',
          scaffold: { problem: 'A non-governmental organization (NGO) wants to promote handwashing with soap among 500 families in a rural block of Bihar.',
            steps: [
            { text: 'Identify the Source – Choose local ASHA workers and respected village elders as sources because they are trusted and.' },
            { text: 'Design the Message – Create a simple, visual message: "5 steps of handwashing" using pictures and a catchy Maithili.' },
            { text: 'Select the Channel – Use interpersonal channels (home visits, mothers\' group meetings) and traditional folk media.' },
            { text: 'Define the Receiver – Segment mothers into groups: pregnant women, mothers of under-5 children, grandmothers; tailor.' },
            { text: 'Plan for Effect (Feedback) – Conduct weekly spot-checks of handwashing practice at homes and use a simple tally sheet.', faded: true, blankAnswer: 'Source = ASHA workers/village elders; Message = visual.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_06_003', title: 'Identify each idea',
          dissect: { specimen: 'Communication: Definition, Concept and Scope', spots: [
            { id: 's1', label: 'Communication is the continuous dynamic', prompt: 'Which idea is this? — Communication is the continuous, dynamic process of creating shared understanding by.', answer: 'Communication is the continuous dynamic', options: ['Communication is the continuous dynamic', 'Levels of communication refer to', 'Mass Communication is the process', 'Verbal communication is the transmission'] },
            { id: 's2', label: 'Levels of communication refer to', prompt: 'Which idea is this? — Levels of communication refer to the categorization of communication based on the number.', answer: 'Levels of communication refer to', options: ['Levels of communication refer to', 'Communication is the continuous dynamic', 'Mass Communication is the process', 'Verbal communication is the transmission'] },
            { id: 's3', label: 'Mass Communication is the process', prompt: 'Which idea is this? — Mass Communication is the process of disseminating messages to large, heterogeneous,.', answer: 'Mass Communication is the process', options: ['Mass Communication is the process', 'Communication is the continuous dynamic', 'Levels of communication refer to', 'Verbal communication is the transmission'] },
            { id: 's4', label: 'Verbal communication is the transmission', prompt: 'Which idea is this? — Verbal communication is the transmission of messages using auditory-verbal modes such as.', answer: 'Verbal communication is the transmission', options: ['Verbal communication is the transmission', 'Communication is the continuous dynamic', 'Levels of communication refer to', 'Mass Communication is the process'] },
            { id: 's5', label: 'One-way communication is a linear', prompt: 'Which idea is this? — One-way communication is a linear process where the sender transmits information to the.', answer: 'One-way communication is a linear', options: ['One-way communication is a linear', 'Communication is the continuous dynamic', 'Levels of communication refer to', 'Mass Communication is the process'] },
            { id: 's6', label: 'The SMCRE model is a', prompt: 'Which idea is this? — The SMCRE model is a linear framework that describes the communication process through.', answer: 'The SMCRE model is a', options: ['The SMCRE model is a', 'Communication is the continuous dynamic', 'Levels of communication refer to', 'Mass Communication is the process'] }
          ] } }
    ],
    explore: { component: C11_HomeScienceIndividualCommunicationVerbalSim, prompt: 'Explore the interactive — Communication: Definition, Concept and Scope' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_001', difficulty: 'standard',
          question: 'Communication is the continuous, dynamic process of creating shared.',
          hint: 'If stuck, revisit the Class 6 Civics node c6_civics_ch15_035 "What is Media and Its Role.',
          misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent.',
          parts: [
                { id: 'a', prompt: 'A teacher delivers a 40-minute lecture on photosynthesis while students listen silently and take notes. No questions are asked during or after the lecture.', answer: 'This is one-way communication',
                  options: ['This is one-way communication', 'students learned something'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received as.' },
                { id: 'b', prompt: 'Classify the following scenario into the correct *level of communication*: A student lies in bed at night, mentally rehearsing answers for tomorrow\'s viva.', answer: 'Intra-personal communication',
                  options: ['Intra-personal communication', 'inter-personal', 'reveals the student equates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received as.' },
                { id: 'c', prompt: 'Compare and contrast the sensory involvement and expected retention percentage for: (a) a student reading a printed textbook chapter, and (b) the same student.', answer: 'a student reading a printed textbook chapter, and (',
                  options: ['a student reading a printed textbook chapter, and (', 'reading is visual so 30-35%'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "communication" with "information transfer" and therefore classify any scenario where a message is sent and received as.' }
          ],
            remediations: { 'students-equate-communication-with-information': { steps: ['If a student exhibits this misconception, do NOT re-read the definition.', 'Instead: (1) Present two parallel scenarios — Scenario A: Teacher explains a concept, student nods, later fails test.', 'Scenario B: Teacher explains, student paraphrases back, teacher confirms, student aces test.', '(2) Ask: "In which scenario did communication *actually* happen?'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_003', difficulty: 'standard',
          question: 'Levels of communication refer to the categorization of communication based on.',
          hint: 'Revisit c11_hs_cbse_06_001 for the "shared understanding" definition and.',
          misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal,.',
          parts: [
                { id: 'a', prompt: 'A student says, "Writing a diary entry every night is inter-personal communication because I am expressing my feelings to the diary." Is this correct?', answer: 'No, it is intra-personal communication',
                  options: ['Correct answer: No, it is intra-personal communication', 'expressing to an object', 'interacting with a person'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal, 3+ = group." This.' },
                { id: 'b', prompt: 'Your school\'s Eco Club (12 members) meets to plan a tree-plantation drive.', answer: 'the full club meeting, (',
                  options: ['the full club meeting, (', 'only 3 people', '2 people = inter-personal, 3+ = group'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal, 3+ = group." This.' }
          ],
            remediations: { 'the-classification-depends-solely-on': { steps: ['Show the student two 30-second videos—(a) a TED talk speaker addressing an audience, (b) a jury deliberation.', 'Have them map each video to the NCERT definitions: highlight "direct and personal," "participatory approach,".', 'Give a sorting card deck with 10 scenarios (diary writing, doctor-patient, family dinner, WhatsApp broadcast, etc.).', 'Debrief by asking them to articulate the decision rule they used—this makes the implicit criteria explicit and replaces.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal,.',
          parts: [
                { id: 'a', prompt: 'A teacher claims: "Group communication is just multiple inter-personal communications happening at once." Evaluate this claim. Is it accurate?', answer: 'The claim is inaccurate',
                  options: ['The claim is inaccurate', '2 people = inter-personal, 3+ = group', 'group communication'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the classification depends solely on the number of people present: "2 people = inter-personal, 3+ = group." This.' }
          ],
            remediations: { 'the-classification-depends-solely-on': { steps: ['Show the student two 30-second videos—(a) a TED talk speaker addressing an audience, (b) a jury deliberation.', 'Have them map each video to the NCERT definitions: highlight "direct and personal," "participatory approach,".', 'Give a sorting card deck with 10 scenarios (diary writing, doctor-patient, family dinner, WhatsApp broadcast, etc.).', 'Debrief by asking them to articulate the decision rule they used—this makes the implicit criteria explicit and replaces.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_004', difficulty: 'standard',
          question: 'Mass Communication is the process of disseminating messages to large,.',
          hint: 'Revisit node c11_hs_cbse_06_003 (Levels of Communication) and create a comparison table.',
          misconception: 'Students often equate "mass communication" with "any communication to many people" and "organisational communication".',
          parts: [
                { id: 'a', prompt: 'Explain why a WhatsApp group message sent by a school principal to 50 teachers is NOT mass communication, even though it reaches many people simultaneously.', answer: 'It is intra-organisational communication because: (1) the audience (teachers) is',
                  options: ['It is intra-organisational communication because: (1) the audience (teachers) is', 'number of recipients'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "mass communication" with "any communication to many people" and "organisational communication" with "formal written.' }
          ],
            remediations: { 'students-often-equate-mass-communication': { steps: ['If the student makes the above error: Step 1 — Have them create a 3-column table: "Scenario | Audience Nature.', 'Fill 5 scenarios (TV ad, staff meeting, collector-sarpanch VC, folk theatre, inter-ministerial letter).', 'Step 2 — Ask: "Which column determines mass vs organisational?" Guide them to see audience relationship and feedback.', 'Step 3 — Give a borderline case: "A university Dean emails 5,000 students about exam dates." Have them classify and.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_005', difficulty: 'standard',
          question: 'Verbal communication is the transmission of messages using auditory-verbal.',
          hint: 'If stuck, revisit Class 10 Biology node c10_bio_cbse_02_002 (Human Nervous System:.',
          misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since we spend 70% of our active time in verbal communication, verbal communication is more important than non-verbal communication." Using.', answer: 'The 70% figure refers to time spent, not effectiveness or information retention',
                  options: ['The 70% figure refers to time spent, not effectiveness or information retention', 'verbal = words, non-verbal = no words'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' },
                { id: 'b', prompt: 'Compare the communication effectiveness of three scenarios using the NCERT sensory retention hierarchy: (A) Teacher reads textbook aloud (audio only), (B).', answer: 'Rank: C (90%+) > B (50%+) > A (20-25%)',
                  options: ['Rank: C (90%+) > B (50%+) > A (20-25%)', 'verbal = words, non-verbal = no words'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' }
          ],
            remediations: { 'verbal-words': { steps: ['Have the student physically sort 10 communication examples (text message, speech, emoji, sign language, posture, tone.', 'Ask: "When you read a book silently, which sense organ receives the message? Eyes. So which channel? Visual.', 'Contrast reading silently (non-verbal visual) vs. reading aloud (verbal auditory) — same words, different channels.', 'Revisit the 70% statistic: it counts listening, speaking, reading aloud — all auditory-vocal.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Writing is a form of verbal communication because it uses words." Consider NCERT\'s classification where writing appears under.', answer: 'The statement is incorrect per NCERT',
                  options: ['The statement is incorrect per NCERT', 'verbal = words, non-verbal = no words'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' },
                { id: 'b', prompt: 'Compare the communication effectiveness of three scenarios using the NCERT sensory retention hierarchy: (A) Teacher reads textbook aloud (audio only), (B).', answer: 'Rank: C (90%+) > B (50%+) > A (20-25%)',
                  options: ['Rank: C (90%+) > B (50%+) > A (20-25%)', 'verbal = words, non-verbal = no words'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "verbal = words, non-verbal = no words" and therefore classify writing, sign language, and reading as verbal.' }
          ],
            remediations: { 'verbal-words': { steps: ['Have the student physically sort 10 communication examples (text message, speech, emoji, sign language, posture, tone.', 'Ask: "When you read a book silently, which sense organ receives the message? Eyes. So which channel? Visual.', 'Contrast reading silently (non-verbal visual) vs. reading aloud (verbal auditory) — same words, different channels.', 'Revisit the 70% statistic: it counts listening, speaking, reading aloud — all auditory-vocal.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_002', difficulty: 'standard',
          question: 'One-way communication is a linear process where the sender transmits.',
          hint: 'Revisit c11_hs_cbse_06_001: Practice identifying SMCRE elements in 5 diverse scenarios.',
          misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a.',
          parts: [
                { id: 'a', prompt: 'Define one-way communication and give one example from a classroom setting that is NOT a lecture.', answer: 'One-way communication: Sender transmits message',
                  options: ['One-way communication: Sender transmits message', 'students taking notes', 'digital/interactive technology automatically makes communication two-way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'b', prompt: 'A student watches a live Instagram session by a celebrity. The celebrity reads comments aloud but cannot reply to all.', answer: 'Structurally one-way: The primary flow is celebrity → mass audience',
                  options: ['Structurally one-way: The primary flow is celebrity → mass audience', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'c', prompt: 'Compare one-way and two-way communication on: (i) Error correction capability, (ii) Persuasion effectiveness for behaviour change, (iii) Cognitive load on.', answer: '(i) Two-way allows immediate error detection/correction via feedback',
                  options: ['(i) Two-way allows immediate error detection/correction via feedback', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' }
          ],
            remediations: { 'digital-interactive-technology-automatically-mak': { steps: ['Draw the SMCRE loop for a radio broadcast — show Receiver has no arrow back to Source.', 'Draw SMCRE for a phone call — show double-headed arrows.', 'Ask student to draw for YouTube live stream; they will draw a thin dotted line from Receiver to Source labelled "chat".', 'Point out: "Does the Source *depend* on that line to complete the cycle? If the chat breaks, does the broadcast stop?', 'Conclude: Two-way requires the feedback to be *structurally necessary* for the communication act, not technically.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a.',
          parts: [
                { id: 'a', prompt: '"Two-way communication is always superior to one-way communication for extension work in rural areas." Evaluate this statement.', answer: 'Statement is false',
                  options: ['Statement is false', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' },
                { id: 'b', prompt: 'Design a communication strategy for a new government nutrition scheme targeting rural mothers.', answer: 'Good answer: Phase 1 (Awareness)',
                  options: ['Good answer: Phase 1 (Awareness)', 'digital/interactive technology automatically makes communication two-way', '"digital/interactive technology automatically makes communication two-way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "digital/interactive technology automatically makes communication two-way." Example: They classify a YouTube live stream.' }
          ],
            remediations: { 'digital-interactive-technology-automatically-mak': { steps: ['Draw the SMCRE loop for a radio broadcast — show Receiver has no arrow back to Source.', 'Draw SMCRE for a phone call — show double-headed arrows.', 'Ask student to draw for YouTube live stream; they will draw a thin dotted line from Receiver to Source labelled "chat".', 'Point out: "Does the Source *depend* on that line to complete the cycle? If the chat breaks, does the broadcast stop?', 'Conclude: Two-way requires the feedback to be *structurally necessary* for the communication act, not technically.'] } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_006', difficulty: 'standard',
          question: 'The SMCRE model is a linear framework that describes the communication process.',
          hint: 'If stuck, revisit the definition of communication (c11_hs_cbse_06_001) and the comparison.',
          misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why the SMCRE model is described as a "cycle" even though it is often drawn as a linear sequence.', answer: 'The model is a cycle',
                  options: ['The model is a cycle', 'it\'s linear because the diagram shows arrows in one direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent system where each.' },
                { id: 'b', prompt: 'A school principal sends a circular about a new uniform policy via email to all parents. Some parents do not check email regularly and miss the information.', answer: 'The Channel element failed',
                  options: ['The Channel element failed', 'parents should check email'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the SMCRE model as a checklist of five independent boxes to tick, rather than an interdependent system where each.' }
          ],
            remediations: { 'students-often-treat-the-smcre': { steps: ['Draw the SMCRE diagram with arrows showing two-way influence (e.g., Receiver characteristics → Channel choice; Message.', 'Give the student a mismatched scenario (e.g., "Send a detailed legal notice via WhatsApp voice note to elderly.', 'Have them redesign the scenario by changing only one element at a time, observing how the whole chain adjusts.', 'Require them to write a one-sentence "dependency rule" for each element (e.g., "Channel must be accessible to Receiver.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
