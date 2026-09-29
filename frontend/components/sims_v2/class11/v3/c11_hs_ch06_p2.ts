import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch06_p2: SimDef = {
    id: 'v3_c11_hs_ch06_p2',
    title: 'Communication and Extension · Part 2/2',
    subtitle: 'Learn the difference between transmitting a message and sharing a meaning.',
    classLevel: 11, subject: 'home_science', topic: 'Communication and Extension · Part 2/2',
    chapters: ['c11_hs_ch06'],
    nodeIds: ['c11_hs_cbse_06_007', 'c11_hs_cbse_06_008', 'c11_hs_cbse_06_009', 'c11_hs_cbse_06_010', 'c11_hs_cbse_06_011', 'c11_hs_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an extension worker choosing how to reach a village', intro: 'Explaining UPI to your grandmother by phone: she heard every word and pressed the wrong buttons — did communication happen?', goal: 'Apply the feedback criterion to distinguish one-way and two-way communication in extension work.' },
    discovery: {
        question: 'A YouTube livestream to 10,000 viewers has a chat box — so it\'s two-way communication, right?',
        options: ['No — the creator reads a sliver of comments and adapts for no one; technical interactivity isn\'t communicative reciprocity', 'Yes — any channel back makes it two-way', 'Yes — digital means interactive by definition', 'No — because only radio counts as one-way'],
        answer: 'No — the creator reads a sliver of comments and adapts for no one; technical interactivity isn\'t communicative reciprocity',
        hook: 'Speaking isn\'t communicating — if the receiver\'s picture doesn\'t match the sender\'s, communication never happened; that\'s why feedback both starts and ends the loop.',
    },
    teaching: [
        { title: 'SMCRE Model: Source, Message and Channel Elements', text: 'The SMCRE model\'s first three elements—Source, Message, and Channel—constitute the transmission phase of communication: the **Source** (sender/originator) initiates the process by encoding.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a radio forecast, a helpline call and a WhatsApp homework thread by the feedback test, then defend where one-way still wins — cyclone sirens.',
        labels: ['SMCRE Model: Source, Message', 'SMCRE Model: Receiver Element', 'Media: Definition, Traditional', 'Functions of Media', 'Cable-based and Wireless Communication', 'Modern Digital Communication Technologies'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_008', title: 'SMCRE Model: Receiver Element and Feedback in Communication',
          caseStudy: { intro: 'Imagine you\'re a Class 11 student explaining a science project to your grandmother in Hindi while she knits — she nods, asks "Beta, yeh kaise kaam karta hai?".',
            decisions: [{ prompt: 'Define \'Receiver\' in the SMCRE model and state the one condition that increases chances of successful communication according to the NCERT.', options: [
                { text: '**Correct answer:** The Receiver is the intended audience or target of the communication', outcome: '**Correct answer:** The Receiver is the intended audience or target of the communication function.' },
                { text: 'anyone who hears the message', outcome: 'Not quite — Students believe **feedback = reply** (any response from receiver).', reveals: 'feedback-reply-any-response-from' },
                { text: 'larger audience = better communication', outcome: 'Not quite — Students believe **feedback = reply** (any response from receiver).', reveals: 'feedback-reply-any-response-from' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_009', title: 'Media: Definition, Traditional and Modern Media',
          caseStudy: { intro: 'Imagine you\'re in your village during Diwali and see a Ramleela performance in the open ground, while your cousin in Mumbai watches a web series on her phone.',
            decisions: [{ prompt: 'Define \'media\' in the context of communication and state the one characteristic that distinguishes mass media from interpersonal.', options: [
                { text: 'Media is the means that uses various communication methods to disseminate and share', outcome: 'Media is the means that uses various communication methods to disseminate and share ideas.' },
                { text: 'media is only TV and radio', outcome: 'Not quite — Students equate \'traditional media\' with \'print media\' and \'modern media\' with \'electronic/digital.', reveals: 'students-equate-traditional-media-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_010', title: 'Functions of Media in Society',
          caseStudy: { intro: 'Imagine you are scrolling through Instagram and see a short video about a new government scheme for free vocational training for rural women.',
            decisions: [{ prompt: 'List the nine functions of media in society as per the NCERT Class 11 Home Science textbook.', options: [
                { text: 'The nine functions are: 1', outcome: 'The nine functions are: 1. Information, 2. Persuasion/Motivation, 3. Entertainment, 4.' },
                { text: 'print, electronic, digital', outcome: 'Not quite — Students often believe that each media message serves only one function at a time (e.g., "this.', reveals: 'each-media-message-serves-only' },
                { text: 'this ad is only for persuasion', outcome: 'Not quite — Students often believe that each media message serves only one function at a time (e.g., "this.', reveals: 'each-media-message-serves-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_011', title: 'Cable-based and Wireless Communication Technologies',
          caseStudy: { intro: 'Imagine you are setting up a community health helpline in a remote Himalayan village: there are no telephone lines, electricity is erratic, but most homes have.',
            decisions: [{ prompt: 'Name two cable-based and two wireless communication technologies mentioned in the NCERT textbook for Class 11 Home Science Chapter 6.', options: [
                { text: 'Cable-based: landline telephone, personal computer without internet (implied wired', outcome: 'Cable-based: landline telephone, personal computer without internet (implied wired LAN/Ethernet).' },
                { text: 'mobile phone', outcome: 'Not quite — Students often believe "wireless means no infrastructure" — they see a Wi-Fi router or mobile phone.', reveals: 'wireless-means-no-infrastructure-they' },
                { text: 'optical fibre', outcome: 'Not quite — Students often believe "wireless means no infrastructure" — they see a Wi-Fi router or mobile phone.', reveals: 'wireless-means-no-infrastructure-they' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_012', title: 'Modern Digital Communication Technologies and Bluetooth',
          caseStudy: { intro: 'Imagine you are an extension worker in a rural village demonstrating a new agricultural technique.',
            decisions: [{ prompt: 'State the full form of the acronym \'PAN\' in the context of Bluetooth technology and specify the typical maximum range of a Class 2.', options: [
                { text: 'PAN stands for Personal Area Network', outcome: 'PAN stands for Personal Area Network. A Class 2 Bluetooth device has a typical maximum range of 10.' },
                { text: 'Public Area Network', outcome: 'Not quite — Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They.', reveals: 'bluetooth-and-wi-fi-are' },
                { text: '100 meters', outcome: 'Not quite — Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They.', reveals: 'bluetooth-and-wi-fi-are' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 2/2', spots: [
            { id: 's1', label: 'SMCRE Model Source Message and Channel Elements', prompt: 'Which idea is this? — The SMCRE model\'s first three elements—Source, Message, and Channel—constitute the.', answer: 'SMCRE Model Source Message and Channel Elements', options: ['SMCRE Model Source Message and Channel Elements', 'SMCRE Model Receiver Element and Feedback in Communication', 'Media Definition Traditional and Modern Media', 'Functions of Media in Society'] },
            { id: 's2', label: 'SMCRE Model Receiver Element and Feedback in Communication', prompt: 'Which idea is this? — In the SMCRE model, the **Receiver** is the intended target audience who decodes and.', answer: 'SMCRE Model Receiver Element and Feedback in Communication', options: ['SMCRE Model Receiver Element and Feedback in Communication', 'SMCRE Model Source Message and Channel Elements', 'Media Definition Traditional and Modern Media', 'Functions of Media in Society'] },
            { id: 's3', label: 'Media Definition Traditional and Modern Media', prompt: 'Which idea is this? — Media refers to the means or channels (traditional and modern) that use various methods.', answer: 'Media Definition Traditional and Modern Media', options: ['Media Definition Traditional and Modern Media', 'SMCRE Model Source Message and Channel Elements', 'SMCRE Model Receiver Element and Feedback in Communication', 'Functions of Media in Society'] },
            { id: 's4', label: 'Functions of Media in Society', prompt: 'Which idea is this? — Functions of media in society refer to the nine distinct roles that media (both.', answer: 'Functions of Media in Society', options: ['Functions of Media in Society', 'SMCRE Model Source Message and Channel Elements', 'SMCRE Model Receiver Element and Feedback in Communication', 'Media Definition Traditional and Modern Media'] },
            { id: 's5', label: 'Cable-based and Wireless Communication Technologies', prompt: 'Which idea is this? — Cable-based communication technologies transmit signals through physical conductors.', answer: 'Cable-based and Wireless Communication Technologies', options: ['Cable-based and Wireless Communication Technologies', 'SMCRE Model Source Message and Channel Elements', 'SMCRE Model Receiver Element and Feedback in Communication', 'Media Definition Traditional and Modern Media'] },
            { id: 's6', label: 'Modern Digital Communication Technologies and Bluetooth', prompt: 'Which idea is this? — Modern Digital Communication Technologies refer to electronic systems that transmit.', answer: 'Modern Digital Communication Technologies and Bluetooth', options: ['Modern Digital Communication Technologies and Bluetooth', 'SMCRE Model Source Message and Channel Elements', 'SMCRE Model Receiver Element and Feedback in Communication', 'Media Definition Traditional and Modern Media'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A doctor explains a diagnosis in medical jargon; the patient nods but misunderstands. In class, a student calls this \'effective two-way communication — the doctor spoke and the patient listened.\' He also calls a 10,000-viewer livestream with a chat box \'two-way, because comments exist.\'',
            decisions: [{ prompt: 'What does communication actually require?', options: [
                { text: 'Demand shared understanding: communication (from communis, \'common\') completes only when the receiver\'s mental model matches the sender\'s intent — the jargon case failed despite transmission. And two-way needs simultaneous feedback that adjusts the message: a chat where the creator reads 0.1% of comments is a parasitic side-channel on a one-to-many broadcast, not reciprocity.', outcome: 'Both cases get reclassified: speaking ≠ communicating, and technical interactivity ≠ a closed feedback loop.' },
                { text: 'Count the doctor case — the message was sent and received; that\'s communication.', outcome: 'Transmission isn\'t communication: when interpretation diverges from intent, no common model formed — feedback is the evidence, not the endpoint.', reveals: 'sent-and-received-is-communication' },
                { text: 'Count the livestream — a chat feature makes it interactive technology, hence two-way.', outcome: 'A feature isn\'t a loop: without the sender adjusting to receivers in real time, the structure stays one-way broadcast with comments attached.', reveals: 'chat-box-means-two-way' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'One-way isn\'t inferior — when a cyclone\'s coming you want reach and fidelity, not a dialogue.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_007', difficulty: 'standard',
          question: 'The SMCRE model\'s first three elements—Source, Message, and Channel—constitute.',
          hint: 'Revisit c11_hs_cbse_06_006 (SMCRE Model Overview) and practice labelling the model with.',
          misconception: '**Misconception**: "The Source is just the \'person speaking\'; credibility comes only from formal qualifications.',
          parts: [
                { id: 'a', prompt: '**ANALYSE**: Compare the **Source–Message–Channel** alignment in two scenarios: (A) A government scientist reads a technical report on millet benefits over All.', answer: '**Answer**: 1',
                  options: ['**Answer**: 1', 'language barrier'],
                  hint: 'Revisit c11_hs_cbse_06_006 (SMCRE Model Overview) and practice labelling the model with a fresh.',
                  misconception: '**Misconception**: "The Source is just the \'person speaking\'; credibility comes only from formal qualifications (degrees, titles)." **Why.' }
          ],
            remediations: { 'misconception-the-source-is-just': { steps: ['**Contrast Exercise**: Give two source profiles for the same tribal breastfeeding campaign—(A) City pediatrician, (B).', 'Ask student to rate each on *competence, trustworthiness, dynamism, homophily* (1–5 scale).', '**Debrief**: Show that (B) scores higher on trustworthiness & homophily—critical for sensitive behaviours.', 'Explain *source credibility* = f(competence, trustworthiness, dynamism, homophily), not just degrees.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_008', difficulty: 'standard',
          question: 'In the SMCRE model, the **Receiver** is the intended target audience who.',
          hint: 'Revisit c11_hs_cbse_06_006 (SMCRE Overview) and practice drawing the cycle with arrows.',
          misconception: 'Students believe **feedback = reply** (any response from receiver).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the SMCRE model, the **Receiver** is the intended target audience who decodes and',
                  options: ['In the SMCRE model, the **Receiver** is the intended target audience who decodes and', 'Communication is the continuous, dynamic process of creating shared understanding by', 'One-way communication is a linear process where the sender transmits information to the', 'Levels of communication refer to the categorization of communication based on the number'],
                  hint: 'Revisit c11_hs_cbse_06_006 (SMCRE Overview) and practice drawing the cycle with arrows showing.',
                  misconception: 'Students believe **feedback = reply** (any response from receiver).' }
          ],
            remediations: { 'feedback-reply-any-response-from': { steps: ['** Ask the student to list **5 feedback examples** from daily life (e.g., teacher\'s nod, exam marks, Instagram likes.', '** For each, identify: (a) Is it verbal/non-verbal? (b) Is it immediate/delayed?', '** Show the NCERT line: "It is the initiating step as well as the terminating element." Ask: "Which of your 5 examples.', '** Give a mini-case: "You text a friend \'Meet at 5?\' They see it but don\'t reply.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **feedback = reply** (any response from receiver).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "In the SMCRE model, feedback is only the final step — if the receiver understands, the cycle ends; if not, the source just sends a new.', answer: '**Correct evaluation:** The claim is **inaccurate** on two counts: 1',
                  options: ['**Correct evaluation:** The claim is **inaccurate** on two counts: 1', '**feedback = reply** (any response from receiver)'],
                  hint: 'Revisit c11_hs_cbse_06_006 (SMCRE Overview) and practice drawing the cycle with arrows showing.',
                  misconception: 'Students believe **feedback = reply** (any response from receiver).' }
          ],
            remediations: { 'feedback-reply-any-response-from': { steps: ['** Ask the student to list **5 feedback examples** from daily life (e.g., teacher\'s nod, exam marks, Instagram likes.', '** For each, identify: (a) Is it verbal/non-verbal? (b) Is it immediate/delayed?', '** Show the NCERT line: "It is the initiating step as well as the terminating element." Ask: "Which of your 5 examples.', '** Give a mini-case: "You text a friend \'Meet at 5?\' They see it but don\'t reply.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_009', difficulty: 'standard',
          question: 'Media refers to the means or channels (traditional and modern) that use various.',
          hint: 'Revisit c11_hs_cbse_06_007 (Channel element in SMCRE) and c11_hs_cbse_06_004 (Mass.',
          misconception: 'Students equate \'traditional media\' with \'print media\' and \'modern media\' with \'electronic/digital media\' — e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Media refers to the means or channels (traditional and modern) that use various methods',
                  options: ['Media refers to the means or channels (traditional and modern) that use various methods', 'Communication is the continuous, dynamic process of creating shared understanding by', 'One-way communication is a linear process where the sender transmits information to the', 'Levels of communication refer to the categorization of communication based on the number'],
                  hint: 'Revisit c11_hs_cbse_06_007 (Channel element in SMCRE) and c11_hs_cbse_06_004 (Mass communication.',
                  misconception: 'Students equate \'traditional media\' with \'print media\' and \'modern media\' with \'electronic/digital media\' — e.g., classifying newspapers.' }
          ],
            remediations: { 'students-equate-traditional-media-with': { steps: ['Have the student create a two-column table with the NCERT\'s exact lists — traditional (puppetry, folk theatre, folk.', 'For each item, ask: "Is this interpersonal/group or mass? Is it culturally embedded or technology-dependent?', 'Use the SMCRE model — identify the Channel element in each.', 'Apply to a scenario: "Why would a street play (nukkad natak) on dengue prevention work better in a Delhi slum than a.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_010', difficulty: 'standard',
          question: 'Functions of media in society refer to the nine distinct roles that media (both.',
          hint: 'If stuck, revisit c11_hs_cbse_06_009 (Media: Definition, Traditional and Modern Media).',
          misconception: 'Students often believe that each media message serves only one function at a time (e.g., "this ad is only for.',
          parts: [
                { id: 'a', prompt: 'List the nine functions of media in society as per the NCERT Class 11 Home Science textbook.', answer: 'The nine functions are: 1',
                  options: ['The nine functions are: 1', 'print, electronic, digital', 'this ad is only for persuasion', 'functions of media'],
                  hint: 'If stuck, revisit c11_hs_cbse_06_009 (Media: Definition, Traditional and Modern Media) and.',
                  misconception: 'Students often believe that each media message serves only one function at a time (e.g., "this ad is only for persuasion") and that.' },
                { id: 'b', prompt: 'A community radio station in a tribal area broadcasts a weekly program that includes: (a) local market prices for forest produce, (b) a dramatized story about.', answer: 'local market prices for forest produce, (',
                  options: ['local market prices for forest produce, (', 'this ad is only for persuasion', 'functions of media', 'types of media'],
                  hint: 'If stuck, revisit c11_hs_cbse_06_009 (Media: Definition, Traditional and Modern Media) and.',
                  misconception: 'Students often believe that each media message serves only one function at a time (e.g., "this ad is only for persuasion") and that.' },
                { id: 'c', prompt: 'Compare the role of traditional folk media (e.g., puppetry, folk theatre) and modern digital media (e.g., WhatsApp, YouTube) in performing the "Transmission.', answer: 'Traditional folk media strengths: culturally embedded, high trust, uses local',
                  options: ['Traditional folk media strengths: culturally embedded, high trust, uses local', 'traditional is old, modern is new', 'this ad is only for persuasion', 'functions of media'],
                  hint: 'If stuck, revisit c11_hs_cbse_06_009 (Media: Definition, Traditional and Modern Media) and.',
                  misconception: 'Students often believe that each media message serves only one function at a time (e.g., "this ad is only for persuasion") and that.' }
          ],
            remediations: { 'each-media-message-serves-only': { steps: ['Create a 2-column table — left column: the nine functions; right column: a real Indian example for each (e.g.', 'Take any recent government campaign (e.g., Swachh Bharat, Beti Bachao Beti Padhao) and map which of the nine functions.', 'Interview a grandparent about a folk media form they recall (e.g., Ramleela, Baul songs) and identify which functions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_011', difficulty: 'standard',
          question: 'Cable-based communication technologies transmit signals through physical.',
          hint: 'Revisit c11_hs_cbse_06_007 (SMCRE Model: Channel Element) and c11_hs_cbse_06_009 (Media.',
          misconception: 'Students often believe "wireless means no infrastructure" — they see a Wi-Fi router or mobile phone and think the.',
          parts: [
                { id: 'a', prompt: 'Analyse the statement: "Cable-based technologies are always more secure than wireless technologies because signals are confined to the physical medium.".', answer: 'The statement fails when: (1) Physical tapping',
                  options: ['The statement fails when: (1) Physical tapping', 'wireless means no infrastructure', 'the signal magically travels end-to-end through air'],
                  hint: 'Revisit c11_hs_cbse_06_007 (SMCRE Model: Channel Element) and c11_hs_cbse_06_009 (Media.',
                  misconception: 'Students often believe "wireless means no infrastructure" — they see a Wi-Fi router or mobile phone and think the signal magically travels.' }
          ],
            remediations: { 'wireless-means-no-infrastructure-they': { steps: ['Draw a three-segment diagram on paper — User Device → [Wireless Hop] → Access Point / Base Station → [Wired Backhaul] →.', 'Label each segment with a concrete example from the student\'s life (phone → Wi-Fi → home router → ISP fibre → Google.', 'Ask: "If the fibre between the router and ISP is cut, does Wi-Fi still work?" — the answer (no) proves wireless depends.', 'Re-read the NCERT lines on "cable-based technologies are comparatively cheap and less complicated" and "wireless.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_06_012', difficulty: 'standard',
          question: 'Modern Digital Communication Technologies refer to electronic systems that.',
          hint: 'Revisit c11_hs_cbse_06_011 (Cable-based and Wireless Communication Technologies).',
          misconception: 'Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They confuse *personal area.',
          parts: [
                { id: 'a', prompt: 'State the full form of the acronym \'PAN\' in the context of Bluetooth technology and specify the typical maximum range of a Class 2 Bluetooth device.', answer: 'PAN stands for Personal Area Network',
                  options: ['PAN stands for Personal Area Network', 'Public Area Network', '100 meters', 'Bluetooth and Wi-Fi are the same thing'],
                  hint: 'Revisit c11_hs_cbse_06_011 (Cable-based and Wireless Communication Technologies) to review the.',
                  misconception: 'Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They confuse *personal area network* (cable.' },
                { id: 'b', prompt: 'An extension worker wants to transfer a 50 MB video file from her smartphone to a farmer\'s feature phone in a field with no internet.', answer: 'Enable Bluetooth on both phones and set both to \'discoverable\' mode',
                  options: ['Enable Bluetooth on both phones and set both to \'discoverable\' mode', 'Bluetooth and Wi-Fi are the same thing', '"Bluetooth and Wi-Fi are the same thing'],
                  hint: 'Revisit c11_hs_cbse_06_011 (Cable-based and Wireless Communication Technologies) to review the.',
                  misconception: 'Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They confuse *personal area network* (cable.' },
                { id: 'c', prompt: 'Compare Bluetooth and Wi-Fi (802.11n) for an extension worker conducting a video conference with a district office 5 km away.', answer: 'Wi-Fi (with a router connected to broadband/4G) is appropriate',
                  options: ['Wi-Fi (with a router connected to broadband/4G) is appropriate', 'Bluetooth and Wi-Fi are the same thing', '"Bluetooth and Wi-Fi are the same thing'],
                  hint: 'Revisit c11_hs_cbse_06_011 (Cable-based and Wireless Communication Technologies) to review the.',
                  misconception: 'Students believe "Bluetooth and Wi-Fi are the same thing — both are wireless internet." They confuse *personal area network* (cable.' }
          ],
            remediations: { 'bluetooth-and-wi-fi-are': { steps: ['Draw a Venn diagram: Circle A = "Bluetooth: PAN, ≤10m, device-to-device, no router needed".', 'Circle B = "Wi-Fi: LAN, ≤100m, device-to-router-to-internet, router needed".', 'Intersection = "Both use 2.4 GHz, both wireless".', 'Have the student physically demonstrate: Pair phone to Bluetooth speaker (works without router).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
