import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c12_comp_ch86 The Public Voice (letter to editor + board report + article).
 * Nodes: c12_engl_cbse_86_001, 86_002, 86_003. */
export const c12_comp_ch86: SimDef = {
    id: 'v3w_c12_comp_ch86',
    title: 'The Public Voice',
    subtitle: 'A letter that speaks through the paper, a report that compresses 4W into one breath, an article that argues with a controlled voice',
    classLevel: 12, subject: 'english-composition', topic: 'Letter to editor, report and article at board standard',
    chapters: ['c12_comp_ch86'],
    nodeIds: ['c12_engl_cbse_86_001', 'c12_engl_cbse_86_002', 'c12_engl_cbse_86_003'],
    emoji: '📰', theme: { bg: 'from-slate-900 to-stone-950', accent: 'stone', scene: 'senior' },

    scenario: {
        role: 'a citizen-journalist writing for the public — to the editor, from the press desk, and for the magazine page',
        intro: 'Class 12 composition is measured outrage, compressed fact, and controlled voice — each format polices a different boundary and the marking scheme watches all three.',
        goal: 'Write a fact-based letter to the editor with a constructive suggestion, a passivized board-grade report inside the word limit, and a distinct-angle article with a forward-looking close.',
    },
    discovery: {
        question: 'Which opener fits a letter to the editor: "Through the columns of your esteemed daily, I wish to highlight…" or "Hey Editor, your city is falling apart!"?',
        options: [
            'The first — public-formal register persuades through facts, not volume',
            'The second — editors want energy',
            'Both — register does not matter in print',
            'Neither — letters need no opening line',
        ],
        answer: 'The first — public-formal register persuades through facts, not volume',
        hook: 'A letter to the editor is a formal letter with a public voice — rant-register loses the marks before the argument lands.',
    },
    teaching: [
        { title: 'The three-beat body', text: 'Issue with specifics → public impact → constructive suggestion. Facts persuade; adjectives do not.', emoji: '📮', bgColor: 'from-stone-500 to-amber-600' },
        { title: 'Objectivity mechanics', text: 'Reports passivize the reporter out — "were felicitated", never "we felicitated". Quotes carry attribution. The word limit IS the format.', emoji: '🗞️', bgColor: 'from-amber-500 to-orange-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c12_engl_cbse_86_001', title: 'Fact over adjective',
          scaffold: {
            problem: 'Convert the rant: "The traffic is very bad and everyone is angry. Something must be done!!!"',
            steps: [
                { text: 'Facts first: which road, what delay, what incidents — "the broken pavement on Mall Road has caused three falls this month".' },
                { text: 'Impact: who suffers — pedestrians, schoolchildren, ambulances.' },
                { text: 'Suggestion: a concrete fix and who should do it — "the municipal corporation must resurface the stretch within a fortnight".', faded: true },
                { text: 'You: convert "the water supply is terrible" → ', blankAnswer: 'a fact — e.g., "the colony has received no supply for four consecutive days"' },
            ],
          } },
        { type: 'dissect', nodeId: 'c12_engl_cbse_86_002', title: 'The board-grade lead',
          dissect: { specimen: 'two leads, one correct',
          spots: [
            { id: 's1', label: 'compressed', prompt: '"On 5 August, the school hosted its annual blood donation camp in the auditorium, where 120 donors participated." — why does this score?', answer: '4W compressed into ~25 words — a reader could leave informed after one sentence', options: ['4W compressed into ~25 words — a reader could leave informed after one sentence', 'it is short', 'it names the school', 'it uses "hosted"'] },
            { id: 's2', label: 'narrative', prompt: '"It was a proud day when we all gathered for a noble cause." — the fault?', answer: 'narrative opening — performs pride instead of reporting facts; no What/When/Where/Who', options: ['narrative opening — performs pride instead of reporting facts; no What/When/Where/Who', 'needs more emotion', 'proud should be capital', 'nothing wrong'] },
            { id: 's3', label: 'passive', prompt: '"We organized a great event and everyone loved it." — the register fix?', answer: '"The event drew participation from 12 schools" — passivized, quantified, no "we"', options: ['"The event drew participation from 12 schools" — passivized, quantified, no "we"', '"We organized an excellent event"', '"The event was organized by us"', 'keep it — honest reporting'] },
          ] } },
        { type: 'case', nodeId: 'c12_engl_cbse_86_003', title: 'Angle-map',
          caseStudy: {
            intro: 'An article develops by distinct angles — causes, effects, solutions — each paragraph owning one.',
            decisions: [
              { prompt: 'Body-plan for "Exam Stress": (a) three paragraphs each saying stress is harmful, or (b) causes → effects → coping strategies?', options: [
                  { text: '(b) — distinct angles advance; restating the thesis thrice adds words, not development', outcome: 'Correct — angle-map keeps paragraphs distinct.' },
                  { text: '(a) — repetition reinforces the point', outcome: 'Restating is not developing — each paragraph must own a different angle.', reveals: 'thesis-repeat' },
                ] },
              { prompt: 'Which close ends the article?', options: [
                  { text: '"Until schools measure wellbeing alongside marks, the report card will keep hiding the real score."', outcome: 'Correct — forward-looking takeaway, controlled voice.' },
                  { text: '"Thus, this article discussed exam stress."', outcome: 'Summary-close announcing itself — articles end forward, not backward.', reveals: 'summary-close' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c12_engl_cbse_86_002', title: 'Stack the report',
          build: {
            prompt: 'Order the report elements:',
            blocks: ['attributed quote + details', 'headline', 'lead (4W compressed)', 'byline + dateline', 'outcome close'],
            answer: 'headline, byline + dateline, lead (4W compressed), attributed quote + details, outcome close',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c12_engl_cbse_86_001', difficulty: 'standard',
          question: 'Which close pairs correctly with "To the Editor"?',
          options: [
              { text: 'Yours sincerely — the editor is a named-role recipient' },
              { text: 'Yours faithfully — all formal letters take faithfully', reveals: 'pair-universal' },
              { text: 'Yours truly — the newspaper tradition', reveals: 'archaic-guess' },
          ],
          answer: 'Yours sincerely — the editor is a named-role recipient',
          remediations: {
              'pair-universal': { steps: ['faithfully = Dear Sir/Madam (unnamed); sincerely = named recipient.', 'The editor is a named role — sincerely is the correct pair.'] },
              'archaic-guess': { steps: ['"Yours truly" is dated — the two-pair system (faithfully/sincerely) covers board formats.'] },
          },
          hint: 'Is the recipient unnamed or named-by-role?',
          misconception: 'students treat the sign-off as universal — it is relationship-indexed' },
        { type: 'mcq', nodeId: 'c12_engl_cbse_86_002', difficulty: 'standard',
          question: 'Fix for report register: "We organized a great event and everyone loved it."',
          options: [
              { text: '"The event drew participation from 12 schools" — passivized, quantified, no "we"' },
              { text: '"The event was organized by us and loved by all"', reveals: 'we-passive' },
              { text: '"We organized an excellent event"', reveals: 'adjective-fix' },
          ],
          answer: '"The event drew participation from 12 schools" — passivized, quantified, no "we"',
          remediations: {
              'we-passive': { steps: ['Passivizing but keeping "by us" defeats the objectivity — the reporter vanishes entirely.', 'Reports describe what happened, not who wrote it — no we/us anywhere.'] },
              'adjective-fix': { steps: ['Swapping "great" for "excellent" keeps the assertion — quantify instead: 12 schools, 200 students.'] },
          },
          hint: 'The reporter must vanish — even from the by-phrase.',
          misconception: 'students passivize the verb but keep the "by us" — institutional stance vs personal stance confused' },
        { type: 'mcq', nodeId: 'c12_engl_cbse_86_003', difficulty: 'advanced',
          question: 'Which opener is article-grade?',
          options: [
              { text: '"Every night, a million students stare at glowing screens until 2 am — and call it studying"' },
              { text: '"This article is about exam stress among students"', reveals: 'announce-dodge' },
              { text: '"Exam stress is a very big problem these days"', reveals: 'flat-claim' },
          ],
          answer: '"Every night, a million students stare at glowing screens until 2 am — and call it studying"',
          remediations: {
              'announce-dodge': { steps: ['Articles begin, they never announce — the reader should be inside the subject by line two.', 'Hooks: scene, statistic, question, micro-anecdote.'] },
              'flat-claim': { steps: ['"very big problem" asserts without showing — articles earn the claim with a scene or a number.'] },
          },
          hint: 'Which opener puts you inside the subject instead of talking about it?',
          misconception: 'students announce the article instead of beginning it — essay-habit bleeding into article format' },
        { type: 'sort', nodeId: 'c12_engl_cbse_86_001', difficulty: 'foundation',
          question: 'Editor-letter body beat or filler?',
          sortItems: [
              { id: 'a', label: 'issue stated with facts/figures', emoji: '📊', correctBin: 'beat' },
              { id: 'b', label: '"it is very very bad"', emoji: '😤', correctBin: 'filler' },
              { id: 'c', label: 'impact on the public', emoji: '👥', correctBin: 'beat' },
              { id: 'd', label: 'a specific suggestion to authorities', emoji: '💡', correctBin: 'beat' },
              { id: 'e', label: '"something must be done!!!"', emoji: '❗', correctBin: 'filler' },
          ],
          bins: [
              { id: 'beat', label: 'BODY BEAT', color: '#22c55e' },
              { id: 'filler', label: 'FILLER / RANT', color: '#ef4444' },
          ],
          hint: 'Facts, impact, suggestion — the three beats. Emotion without facts is filler.',
          misconception: 'students write rants with no content-beats — the three-beat body is the scored structure' },
        { type: 'subpart', nodeId: 'c12_engl_cbse_86_002', difficulty: 'advanced',
          question: 'Write the lead: blood donation camp, 12 March, school hall, 120 donors.',
          hint: 'One breath, ~25 words, all four Ws.',
          misconception: 'leads written as narrative openings instead of compressed fact',
          parts: [
              { id: 'a', prompt: 'Which elements must the lead carry?',
                answer: 'What + When + Where + Who/scale — the 4W in one sentence',
                options: ['What + When + Where + Who/scale — the 4W in one sentence', 'a quote from the principal', 'the reporter\'s reaction', 'the background history'],
                hint: 'The reader leaves informed after one sentence.',
                misconception: '4W compression not understood' },
              { id: 'b', prompt: 'The lead itself?',
                answer: '"The school hosted its annual blood donation camp on 12 March in the main hall, drawing 120 donors."',
                options: ['"The school hosted its annual blood donation camp on 12 March in the main hall, drawing 120 donors."', '"It was a proud day — 12 March, the camp, everyone happy."', '"Blood was donated by many students on a day in March."'],
                hint: 'Compressed, dated, placed, quantified.',
                misconception: 'narrative or vague lead' },
          ] },
    ],

    reflect: { prompts: ['Which boundary do you break — measured outrage or invisible reporter?', 'What makes a lead board-grade in one sentence?'] },
    successLine: 'Public voice controlled — facts persuade, the reporter vanishes, and the angles develop.',
    tryAgainLine: 'Facts not adjectives, passives not we, angles not repetition.',
};
