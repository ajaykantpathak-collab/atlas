import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c11_comp_ch86 Three Voices (speech, article, report).
 * Nodes: c11_engl_cbse_86_001, 86_002, 86_003. */
export const c11_comp_ch86: SimDef = {
    id: 'v3w_c11_comp_ch86',
    title: 'Three Voices',
    subtitle: 'The speech talks AT an audience, the article performs a voice, the report forbids one — three registers, three contracts',
    classLevel: 11, subject: 'english-composition', topic: 'Speech, article and report writing',
    chapters: ['c11_comp_ch86'],
    nodeIds: ['c11_engl_cbse_86_001', 'c11_engl_cbse_86_002', 'c11_engl_cbse_86_003'],
    emoji: '🎤', theme: { bg: 'from-slate-900 to-gold-950', accent: 'indigo', scene: 'senior' },

    scenario: {
        role: 'a writer who must switch between the podium, the magazine page, and the press desk on the same day',
        intro: 'Same event, three documents — a speech that addresses listeners, an article that engages readers, a report that vanishes into the facts. The register IS the format.',
        goal: 'Write speeches with listener-contract openings, articles with voice inside semi-formal bounds, and reports in inverted pyramid with attributed quotes.',
    },
    discovery: {
        question: 'A speech opens "I am going to speak about water conservation today." — what is wrong?',
        options: [
            'It announces instead of hooking — and skips the greeting entirely',
            'Nothing — it states the topic clearly',
            'It should start with statistics',
            'It needs a longer introduction',
        ],
        answer: 'It announces instead of hooking — and skips the greeting entirely',
        hook: 'Speeches written for the EAR need greeting + hook — a question or startling fact, never an announcement.',
    },
    teaching: [
        { title: 'The three contracts', text: 'Speech = greeting + hook + addressed points + call-to-action. Article = title + byline + engaging intro + takeaway. Report = headline + 4W lead + pyramid + attributed quote.', emoji: '📜', bgColor: 'from-gold-500 to-gold-600' },
        { title: 'Voice allowed, voice forbidden', text: 'Essay argues; article may perform; report must not. The middle register is the hardest to hold — slang breaks it, dryness wastes it.', emoji: '🎛️', bgColor: 'from-gold-500 to-purple-600' },
    ],

    beats: [
        { type: 'dissect', nodeId: 'c11_engl_cbse_86_001', title: 'The essay-disguised speech',
          dissect: { specimen: 'a speech that forgot its audience',
          spots: [
            { id: 's1', label: 'greeting', prompt: 'The draft opens straight with "Pollution is a serious problem." — first fault?', answer: 'no greeting — speeches must name the audience order: Principal → teachers → friends', options: ['no greeting — speeches must name the audience order: Principal → teachers → friends', 'pollution is a weak topic', 'the sentence is too short', 'nothing wrong'] },
            { id: 's2', label: 'address', prompt: 'The whole draft never says "you" or asks a question — the fault?', answer: 'no audience-address — written for the ear means rhetorical questions and direct address', options: ['no audience-address — written for the ear means rhetorical questions and direct address', 'questions are informal', 'audiences do not matter', 'you is rude'] },
            { id: 's3', label: 'sentence-length', prompt: 'One sentence runs five subordinate clauses — the fault?', answer: 'written for the eye — the audience cannot re-read; break into 2-3 direct sentences', options: ['written for the eye — the audience cannot re-read; break into 2-3 direct sentences', 'long sentences sound smart', 'commas fix it', 'no fault'] },
          ] } },
        { type: 'case', nodeId: 'c11_engl_cbse_86_002', title: 'Genre-boundary',
          caseStudy: {
            intro: 'Article vs report vs essay — the same event in three registers. Pick the right voice.',
            decisions: [
              { prompt: 'Which opener is article-register for a school fest?', options: [
                  { text: '"Five hundred students, zero phones, one unforgettable evening — this year\'s fest rewrote the rules."', outcome: 'Correct — articles may perform voice and scene.' },
                  { text: '"The annual fest was conducted on 5 May in the main hall."', outcome: 'Report-register — flat facts, no engagement. Articles need a hook.', reveals: 'report-bleed' },
                  { text: '"This article will discuss the school fest and its various aspects."', outcome: 'Announcing is essay-habit — articles begin, they do not announce.', reveals: 'announce-dodge' },
                ] },
              { prompt: '"Yo, phones are literally destroying our brains fr" in a magazine article?', options: [
                  { text: 'No — articles permit voice but hold semi-formal register; slang breaks it', outcome: 'Correct — the middle register is the article\'s contract.' },
                  { text: 'Yes — voice is allowed', outcome: 'Voice yes, slang no — the register boundary is exactly what boards test.', reveals: 'voice-unlimited' },
                ] },
            ],
          } },
        { type: 'scaffold', nodeId: 'c11_engl_cbse_86_003', title: 'The 4W lead',
          scaffold: {
            problem: 'Write the lead for a blood-donation camp report.',
            steps: [
                { text: 'The lead alone must let a reader leave informed — compress What/When/Where/Who.' },
                { text: 'Draft: "The annual blood donation camp was held on 12 March in the school hall."' },
                { text: 'Add scale if known: "…drawing 120 donors."', faded: true },
                { text: 'Never: "It was a proud day" — that is narrative, not news.', faded: true },
                { text: 'You: lead for a science exhibition, 5 Aug, auditorium → "___"', blankAnswer: 'The annual science exhibition was held on 5 August in the school auditorium' },
            ],
          } },
        { type: 'build', nodeId: 'c11_engl_cbse_86_003', title: 'Stack the pyramid',
          build: {
            prompt: 'Order the report elements:',
            blocks: ['body details + quote', 'headline', 'lead (4W)', 'byline + dateline', 'closing line on outcome'],
            answer: 'headline, byline + dateline, lead (4W), body details + quote, closing line on outcome',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c11_engl_cbse_86_001', difficulty: 'standard',
          question: 'What marks spoken register in a written speech?',
          options: [
              { text: 'Direct address, rhetorical questions, short sentences, call-to-action close' },
              { text: 'Formal vocabulary and long sentences', reveals: 'essay-bleed' },
              { text: 'Statistics and citations', reveals: 'report-bleed' },
          ],
          answer: 'Direct address, rhetorical questions, short sentences, call-to-action close',
          remediations: {
              'essay-bleed': { steps: ['Speeches are written for the ear — long subordinate sentences lose the audience.', 'The listener-contract: greeting, "you/my friends", questions, a close that asks something of them.'] },
              'report-bleed': { steps: ['Facts help but do not define it — the address-markers define the speech register.', 'A speech without "you" is an essay read aloud.'] },
          },
          hint: 'Who is the speech talking TO?',
          misconception: 'students write essay-style speeches — the audience disappears' },
        { type: 'mcq', nodeId: 'c11_engl_cbse_86_002', difficulty: 'standard',
          question: 'What format elements does an article need that an essay does not?',
          options: [
              { text: 'A catchy title and a byline ("By Name, Class")' },
              { text: 'A subject line', reveals: 'letter-merge' },
              { text: 'A salutation', reveals: 'letter-merge' },
          ],
          answer: 'A catchy title and a byline ("By Name, Class")',
          remediations: {
              'letter-merge': { steps: ['Subject lines and salutations belong to letters — articles are self-standing magazine pieces.', 'Title + byline are the article\'s format marks.'] },
          },
          hint: 'What sits at the very top of a magazine piece?',
          misconception: 'students import letter-format elements into articles' },
        { type: 'mcq', nodeId: 'c11_engl_cbse_86_003', difficulty: 'advanced',
          question: 'Fix for report register: "I was thrilled to see the amazing projects!!!"',
          options: [
              { text: '"The exhibition featured 40 student projects" — quantify and attribute, never exclaim' },
              { text: '"The amazing projects thrilled everyone!!!" — keep the energy', reveals: 'first-person-drift' },
              { text: '"I saw many projects" — just drop the exclamation', reveals: 'first-person-drift' },
          ],
          answer: '"The exhibition featured 40 student projects" — quantify and attribute, never exclaim',
          remediations: {
              'first-person-drift': { steps: ['Reports forbid the narrator entirely — remove "I/we", remove emotion, add numbers.', 'The event is the subject; the reporter is invisible.'] },
          },
          hint: 'The reporter must vanish — who is the real subject?',
          misconception: 'first-person narrative drift — reports keep the writer invisible' },
        { type: 'sort', nodeId: 'c11_engl_cbse_86_003', difficulty: 'foundation',
          question: 'Which genre does each line belong to?',
          sortItems: [
              { id: 'a', label: 'Respected Principal, teachers, and friends', emoji: '🎤', correctBin: 'speech' },
              { id: 'b', label: 'By Ananya, XI-B', emoji: '🖋️', correctBin: 'article' },
              { id: 'c', label: 'The camp drew 120 donors on 12 March', emoji: '📰', correctBin: 'report' },
              { id: 'd', label: 'Have you ever wondered how much water we waste?', emoji: '💧', correctBin: 'speech' },
              { id: 'e', label: '"The response was overwhelming," said the convenor', emoji: '💬', correctBin: 'report' },
          ],
          bins: [
              { id: 'speech', label: 'SPEECH', color: '#8b5cf6' },
              { id: 'article', label: 'ARTICLE', color: '#22c55e' },
              { id: 'report', label: 'REPORT', color: '#0ea5e9' },
          ],
          hint: 'Address = speech. Byline = article. Numbers + attribution = report.',
          misconception: 'students cannot separate the three registers — one voice bleeds into all formats' },
        { type: 'subpart', nodeId: 'c11_engl_cbse_86_003', difficulty: 'advanced',
          question: 'A report reads "the principal was very happy." — fix it.',
          hint: 'Certify feelings through quotation, not adjectives.',
          misconception: 'asserts emotions directly instead of converting to attributed quotes',
          parts: [
              { id: 'a', prompt: 'The problem with "very happy"?',
                answer: 'unverifiable assertion — reports show evidence, not adjective-claims',
                options: ['unverifiable assertion — reports show evidence, not adjective-claims', 'too short', 'needs an exclamation', 'principal needs a name'],
                hint: 'How does a reporter know feelings? They quote them.',
                misconception: 'assertion treated as fact' },
              { id: 'b', prompt: 'The fix?',
                answer: 'an attributed quote — "The participation was heartening, said the Principal"',
                options: ['an attributed quote — "The participation was heartening, said the Principal"', 'delete the line', 'add "very very" for emphasis'],
                hint: 'Emotion becomes legal when it is certified by a speaker.',
                misconception: 'attribution mechanism unknown' },
          ] },
    ],

    reflect: { prompts: ['Which register is hardest for you — the performed voice or the forbidden one?', 'What can a report NEVER contain?'] },
    successLine: 'Three contracts held — the podium, the page, and the press desk all sound right.',
    tryAgainLine: 'Ask who you are in each format: the speaker, the columnist, or the invisible witness.',
};
