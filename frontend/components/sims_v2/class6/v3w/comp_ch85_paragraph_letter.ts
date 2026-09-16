import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c6_comp_ch85 The Writing Desk (paragraph + informal letter).
 * Nodes: c6_comp_cbse_85_001, 85_002. */
export const c6_comp_ch85: SimDef = {
    id: 'v3_c6_comp_ch85',
    title: 'The Writing Desk',
    subtitle: 'One idea per paragraph, warmth in every letter — the two formats where structure meets voice',
    classLevel: 6, subject: 'english-composition', topic: 'Paragraphs and informal letters',
    chapters: ['c6_comp_ch85'],
    nodeIds: ['c6_comp_cbse_85_001', 'c6_comp_cbse_85_002'],
    emoji: '✏️', theme: { bg: 'from-slate-900 to-teal-950', accent: 'teal', scene: 'junior' },

    scenario: {
        role: 'a young writer learning that good writing has both a skeleton and a heartbeat',
        intro: 'A paragraph wraps ONE idea. A letter to a friend sounds like talking on paper. Both have shapes you can learn.',
        goal: 'Build paragraphs with a topic sentence and no weeds, and letters with the light skeleton plus a warm voice.',
    },
    discovery: {
        question: 'Which opens a paragraph better: "I am going to write about my school" or "My school is the noisiest, friendliest building I know"?',
        options: [
            'The second — it states an idea; the first announces the writing instead of doing it',
            'The first — it is polite to announce',
            'Both are equally good',
            'Neither — paragraphs need no opener',
        ],
        answer: 'The second — it states an idea; the first announces the writing instead of doing it',
        hook: 'Announcing is a dodge — the topic sentence should BE the idea, not talk about having one.',
    },
    teaching: [
        { title: 'The paragraph wrapper', text: 'Topic sentence (the one idea) → 3-4 supporting sentences → closing line. Anything off-topic is a weed — pull it.', emoji: '🌱', bgColor: 'from-teal-500 to-cyan-600' },
        { title: 'The letter\'s two halves', text: 'Skeleton: address, date, Dear ___, body, loving sign-off. Voice: write like you talk — contractions and questions allowed.', emoji: '💌', bgColor: 'from-cyan-500 to-sky-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c6_comp_cbse_85_001', title: 'Wrap one idea',
          scaffold: {
            problem: 'Build a paragraph on "My school library".',
            steps: [
                { text: 'Topic sentence names the ONE idea: "Our school library is my favourite place."' },
                { text: 'Supports feed it: the books, the silence, the librarian who recommends.' },
                { text: 'Closer ties it off: "It is where I travel without moving."', faded: true },
                { text: 'You write a topic sentence for "my pet" → "___"', blankAnswer: 'My pet makes every day a little circus' },
            ],
          } },
        { type: 'dissect', nodeId: 'c6_comp_cbse_85_001', title: 'Pull the weed',
          dissect: { specimen: 'a paragraph with an intruder',
          spots: [
            { id: 's1', label: 'find it', prompt: '"My garden has many flowers. Roses smell sweet. My uncle lives in Jaipur. The marigolds bloom in winter." — which sentence is the weed?', answer: '"My uncle lives in Jaipur" — off the garden idea', options: ['"My uncle lives in Jaipur" — off the garden idea', 'the marigold line', 'the rose line', 'no weeds'] },
            { id: 's2', label: 'why', prompt: 'Why does it damage the paragraph?', answer: 'a paragraph is one idea — off-topic sentences break the unity readers trust', options: ['a paragraph is one idea — off-topic sentences break the unity readers trust', 'uncles are not allowed', 'it is too short', 'Jaipur is not a flower'] },
          ] } },
        { type: 'case', nodeId: 'c6_comp_cbse_85_002', title: 'Warm or stiff?',
          caseStudy: {
            intro: 'A letter to a friend must sound like a person — read the line and judge.',
            decisions: [
              { prompt: 'Opening for a letter to your cousin:', options: [
                  { text: '"Didi, guess what — I came first in class!"', outcome: 'Correct — sounds like a person. That is what informal register pays for.' },
                  { text: '"I am writing to apprise you of my academic achievement."', outcome: 'Formal stiffness in a friendly letter — the register is wrong even though the grammar is fine.', reveals: 'formal-bleed' },
                ] },
              { prompt: 'Sign-off for a letter to your grandmother:', options: [
                  { text: 'Yours lovingly', outcome: 'Correct — family takes the affectionate pair.' },
                  { text: 'Yours faithfully', outcome: 'Faithfully is for strangers and officials — the sign-off is relationship-indexed.', reveals: 'pair-universal' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c6_comp_cbse_85_002', title: 'Stack the letter skeleton',
          build: {
            prompt: 'Order the letter blocks:',
            blocks: ['body', 'Dear Priya,', 'Yours lovingly', 'sender\'s address + date'],
            answer: "sender's address + date, Dear Priya,, body, Yours lovingly",
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c6_comp_cbse_85_001', difficulty: 'foundation',
          question: 'What does the topic sentence do?',
          options: [
              { text: 'Names the one idea the whole paragraph serves' },
              { text: 'Announces that writing is about to begin', reveals: 'announcer' },
              { text: 'Is optional decoration', reveals: 'decor-view' },
          ],
          answer: 'Names the one idea the whole paragraph serves',
          remediations: {
              'announcer': { steps: ['"I am going to write about X" tells us you will write — the topic sentence just says X.', 'State the idea directly: "My school is the noisiest, friendliest building I know."'] },
              'decor-view': { steps: ['The topic sentence is the spine — every other sentence must feed it.', 'Without it the paragraph is a list, not an argument of one idea.'] },
          },
          hint: 'Does it DO the idea, or talk about doing it?',
          misconception: 'students announce the topic instead of stating the idea' },
        { type: 'mcq', nodeId: 'c6_comp_cbse_85_002', difficulty: 'foundation',
          question: 'What is missing from this letter: "Dear Rahul, [body], Yours lovingly, Amit"?',
          options: [
              { text: "Sender's address and date — the skeleton applies even when the voice is casual" },
              { text: 'The receiver\'s full address', reveals: 'skeleton-merge' },
              { text: 'A subject line', reveals: 'skeleton-merge' },
          ],
          answer: "Sender's address and date — the skeleton applies even when the voice is casual",
          remediations: {
              'skeleton-merge': { steps: ['Informal letters drop the receiver block and the subject line — but never the sender\'s address and date.', 'Two formats, two checklists: informal = address + date + Dear + body + loving close.'] },
          },
          hint: 'Which two blocks sit at the very top of every letter?',
          misconception: 'students think informal means structure-free' },
        { type: 'mcq', nodeId: 'c6_comp_cbse_85_002', difficulty: 'standard',
          question: 'A letter body says only: "I went to Shimla. It was cold. I saw snow." — what is missing?',
          options: [
              { text: 'Interaction — questions to the reader and a forward look ("How is your new school? Write back soon")' },
              { text: 'More adjectives', reveals: 'adjective-fix' },
              { text: 'Nothing — short letters are fine', reveals: 'flat-letter' },
          ],
          answer: 'Interaction — questions to the reader and a forward look ("How is your new school? Write back soon")',
          remediations: {
              'adjective-fix': { steps: ['The flatness is not vocabulary — it is that the letter never turns toward the reader.', 'Warm bodies do three jobs: your news, questions about them, a forward look.'] },
              'flat-letter': { steps: ['A letter that only reports is a postcard — letters ask back and look forward.'] },
          },
          hint: 'Does the letter ever ask the reader anything?',
          misconception: 'students write flat news-reports with no reader-interaction' },
        { type: 'sort', nodeId: 'c6_comp_cbse_85_001', difficulty: 'foundation',
          question: 'Which sentence belongs in a "My best friend" paragraph?',
          sortItems: [
              { id: 'a', label: 'She shares her lunch when I forget mine', emoji: '🍱', correctBin: 'in' },
              { id: 'b', label: 'My school has a big playground', emoji: '🏫', correctBin: 'out' },
              { id: 'c', label: 'He laughs at my worst jokes', emoji: '😄', correctBin: 'in' },
              { id: 'd', label: 'Delhi is the capital of India', emoji: '🗺️', correctBin: 'out' },
          ],
          bins: [
              { id: 'in', label: 'KEEPS THE IDEA', color: '#22c55e' },
              { id: 'out', label: 'WEED — pull it', color: '#ef4444' },
          ],
          hint: 'Every sentence must feed the ONE idea — the friend.',
          misconception: 'students grade paragraphs by length, not idea-unity' },
        { type: 'subpart', nodeId: 'c6_comp_cbse_85_002', difficulty: 'standard',
          question: 'Write a letter to a friend inviting them to your birthday — check the essentials.',
          hint: 'Warm voice plus the three logistics.',
          misconception: 'writes warmly but forgets the actual logistics — no when/where',
          parts: [
              { id: 'a', prompt: 'Which three logistics must the invite carry?',
                answer: 'what, when, where',
                options: ['what, when, where', 'who, why, how much', 'weather, food, games'],
                hint: 'The reader needs occasion, date/time, and place.',
                misconception: 'logistics checklist missing' },
              { id: 'b', prompt: 'Which closing line fits?',
                answer: '"Do come — it will not be the same without you!"',
                options: ['"Do come — it will not be the same without you!"', '"Kindly acknowledge receipt of this invitation."', '"The end."'],
                hint: 'Warm + forward-looking.',
                misconception: 'formal-bleed into informal register' },
          ] },
    ],

    reflect: { prompts: ['Which is harder for you — the skeleton or the warm voice?', 'What weed would sneak into YOUR paragraph?'] },
    successLine: 'Your paragraphs hold one idea tight, and your letters actually sound like you.',
    tryAgainLine: 'One idea per paragraph; a letter that talks TO the reader, not AT them.',
};
