import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c8_comp_ch86 The Relay (message + informal invitation).
 * Nodes: c8_comp_cbse_86_001, 86_002. */
export const c8_comp_ch86: SimDef = {
    id: 'v3_c8_comp_ch86',
    title: 'The Relay',
    subtitle: 'Compress a phone call into 50 words of reported facts — then write an invitation that actually tells people when and where',
    classLevel: 8, subject: 'english-composition', topic: 'Message writing and informal invitations',
    chapters: ['c8_comp_ch86'],
    nodeIds: ['c8_comp_cbse_86_001', 'c8_comp_cbse_86_002'],
    emoji: '📞', theme: { bg: 'from-slate-900 to-orange-950', accent: 'orange', scene: 'junior' },

    scenario: {
        role: 'the household message-relayer and party-inviter',
        intro: 'Mom missed a call — you write what the caller actually needs her to know. Then you invite a friend — and "having a party, do come!" with no date helps nobody.',
        goal: 'Compress conversations into 5-element messages in reported form, and write invitations carrying the What/When/Where logistics.',
    },
    discovery: {
        question: 'A message must report what was said. Which is legal inside a message?',
        options: [
            '"Ravi called — he said he would bring the book the next day" — reported, not quoted',
            '"Ravi called and said: I will bring the book tomorrow" — keep the exact words',
            'Either — messages can quote directly',
        ],
        answer: '"Ravi called — he said he would bring the book the next day" — reported, not quoted',
        hook: 'Messages relay, they do not quote — direct speech must convert to reported form.',
    },
    teaching: [
        { title: 'The five elements', text: 'Date, time, receiver\'s name, reported message, writer\'s name. ~50 words, clipped, no chat-filler.', emoji: '🧾', bgColor: 'from-orange-500 to-amber-600' },
        { title: 'The logistics checklist', text: 'An invitation must carry What, When, Where — warmth is welcome but logistics are mandatory.', emoji: '🎉', bgColor: 'from-amber-500 to-yellow-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c8_comp_cbse_86_001', title: 'Compress the call',
          scaffold: {
            problem: 'Caller: "Tell Rahul I will bring the book tomorrow and we can start the project." Write the message to Rahul.',
            steps: [
                { text: 'Header: date + time of writing + "Rahul" as receiver.' },
                { text: 'Convert direct to reported: "he said he would bring the book the next day."' },
                { text: 'Keep the action: "so you can start the project together."', faded: true },
                { text: 'Sign with your name. ~50 words.', faded: true },
                { text: 'You: caller says "I am coming at 5" → "she said ___"', blankAnswer: 'she would come at 5' },
            ],
          } },
        { type: 'dissect', nodeId: 'c8_comp_cbse_86_001', title: 'Message audit',
          dissect: { specimen: 'an 85-word chatty note',
          spots: [
            { id: 's1', label: 'limit', prompt: 'The note runs 85 words with "It was such a nice chat, hello hello!" — the fault?', answer: 'limit breach + conversational filler — messages relay facts, not the chat', options: ['limit breach + conversational filler — messages relay facts, not the chat', 'only the word limit', 'hello is rude', 'nothing wrong'] },
            { id: 's2', label: 'quote', prompt: 'It reads: "Anil said, I will collect it at 6." — what is wrong?', answer: 'direct quote leaked in — report it: "Anil said he would collect it at 6"', options: ['direct quote leaked in — report it: "Anil said he would collect it at 6"', 'Anil needs a surname', '6 should be six', 'nothing wrong'] },
            { id: 's3', label: 'stamp', prompt: 'No date or time at the top — why does that matter?', answer: 'the timestamp is an element — a message must record WHEN it was written', options: ['the timestamp is an element — a message must record WHEN it was written', 'it does not matter', 'only the receiver name matters', 'time goes at the bottom'] },
          ] } },
        { type: 'case', nodeId: 'c8_comp_cbse_86_002', title: 'Invitation essentials',
          caseStudy: {
            intro: 'Warm letters still need logistics — and replies must actually answer.',
            decisions: [
              { prompt: '"Hi Neha, having a party at my place, do come! Love, Riya." — what is missing?', options: [
                  { text: 'When and What-occasion — no date, time, or reason given', outcome: 'Correct — warmth without logistics is unusable.' },
                  { text: 'Nothing — it is friendly enough', outcome: 'Neha cannot come — she does not know when or what for.', reveals: 'logistics-blind' },
                ] },
              { prompt: 'Reply when you cannot attend:', options: [
                  { text: '"So sorry — we are visiting Nani that weekend. Hope it is the best party ever!"', outcome: 'Correct — clear decline + reason + warmth.' },
                  { text: '"Can\'t come, busy."', outcome: 'Curt to the point of rudeness — informal register still has manners.', reveals: 'curt-decline' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c8_comp_cbse_86_001', title: 'Stack the message',
          build: {
            prompt: 'Order the message elements:',
            blocks: ['writer\'s name', 'reported message body', 'date + time', 'receiver\'s name'],
            answer: "date + time, receiver's name, reported message body, writer's name",
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c8_comp_cbse_86_001', difficulty: 'foundation',
          question: 'What are the five elements of a message?',
          options: [
              { text: 'Date, time, receiver\'s name, reported message, writer\'s name' },
              { text: 'Greeting, news, questions, close, signature', reveals: 'letter-merge' },
              { text: 'Just the message text — it is a note', reveals: 'format-blind' },
          ],
          answer: 'Date, time, receiver\'s name, reported message, writer\'s name',
          remediations: {
              'letter-merge': { steps: ['Messages are not mini-letters — no greeting warmth, just the relay.', 'The timestamp is what makes it a message: when was this written?'] },
              'format-blind': { steps: ['The five elements are scored — date and time especially get dropped.', 'The receiver must know WHO called, WHAT they said, and WHEN the note was left.'] },
          },
          hint: 'The timestamp is what makes it a message, not a letter.',
          misconception: 'students treat messages like mini-letters and drop the timestamp' },
        { type: 'mcq', nodeId: 'c8_comp_cbse_86_001', difficulty: 'standard',
          question: 'Convert for a message: "Tell Rahul that I said, \'I will bring the book tomorrow.\'"',
          options: [
              { text: 'he said he would bring the book the next day — direct speech must convert' },
              { text: 'he said "I will bring the book tomorrow" — keep the quote', reveals: 'quote-leak' },
              { text: 'I will bring the book tomorrow — keep it short', reveals: 'quote-leak' },
          ],
          answer: 'he said he would bring the book the next day — direct speech must convert',
          remediations: {
              'quote-leak': { steps: ['Messages report, they never quote — all the reported-speech shifts apply.', 'will→would, tomorrow→the next day, I→he/she.'] },
          },
          hint: 'Does a message quote people, or report them?',
          misconception: 'students copy the caller\'s direct words into the message — the quote-leak' },
        { type: 'mcq', nodeId: 'c8_comp_cbse_86_002', difficulty: 'standard',
          question: 'An invitation letter must carry which logistics?',
          options: [
              { text: 'What (occasion), When (date/time), Where (place)' },
              { text: 'Who is invited, why they matter, how many guests', reveals: 'guest-focus' },
              { text: 'Just the place — friends know the rest', reveals: 'logistics-blind' },
          ],
          answer: 'What (occasion), When (date/time), Where (place)',
          remediations: {
              'guest-focus': { steps: ['The reader needs occasion + date/time + place to actually attend.', 'Warmth covers the rest — but without 3W logistics the letter fails its job.'] },
              'logistics-blind': { steps: ['"Party at my place, do come!" gives zero usable information.', 'The checklist is non-negotiable: What, When, Where.'] },
          },
          hint: 'What does the reader need to actually show up?',
          misconception: 'students write warm invites that forget the actual logistics' },
        { type: 'sort', nodeId: 'c8_comp_cbse_86_002', difficulty: 'foundation',
          question: 'Invitation or reply — which lines belong where?',
          sortItems: [
              { id: 'a', label: 'Having a birthday dinner Saturday 7 pm', emoji: '🎂', correctBin: 'invite' },
              { id: 'b', label: 'I would love to come!', emoji: '💛', correctBin: 'reply' },
              { id: 'c', label: 'Do come — it will not be the same without you', emoji: '🙏', correctBin: 'invite' },
              { id: 'd', label: 'So sorry, we are travelling that weekend', emoji: '😔', correctBin: 'reply' },
          ],
          bins: [
              { id: 'invite', label: 'INVITATION', color: '#22c55e' },
              { id: 'reply', label: 'REPLY', color: '#0ea5e9' },
          ],
          hint: 'Invitations give logistics + do-come. Replies answer yes/no + reason.',
          misconception: 'students blur the two contracts — invites without logistics, replies without answers' },
        { type: 'subpart', nodeId: 'c8_comp_cbse_86_001', difficulty: 'advanced',
          question: 'The phone rang; Dad is out; caller Mr Sharma said "the meeting moved to Monday." Write the message.',
          hint: 'Five elements, reported form, ~50 words.',
          misconception: 'writes a letter-style note or leaks direct speech',
          parts: [
              { id: 'a', prompt: 'What goes at the very top?',
                answer: 'date and time of writing',
                options: ['date and time of writing', 'Dear Dad', 'MESSAGE heading'],
                hint: 'The timestamp leads.',
                misconception: 'opens with the greeting' },
              { id: 'b', prompt: 'The body line is…',
                answer: 'Mr Sharma called — the meeting has moved to Monday',
                options: ['Mr Sharma called — the meeting has moved to Monday', 'Mr Sharma said "the meeting moved to Monday"', 'Mr Sharma wants to talk about meetings'],
                hint: 'Reported, clipped, action-complete.',
                misconception: 'quote-leak or vague summary' },
          ] },
    ],

    reflect: { prompts: ['What makes a message different from a mini-letter?', 'Which logistics do you personally always forget?'] },
    successLine: 'Your relays carry everything the receiver needs — nothing extra, nothing missing.',
    tryAgainLine: 'Timestamp it, report it, check the logistics — then sign it.',
};
