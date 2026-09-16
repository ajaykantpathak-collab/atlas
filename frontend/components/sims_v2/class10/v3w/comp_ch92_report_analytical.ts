import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_comp_ch92 The Newsroom (report + analytical paragraph).
 * Nodes: c10_comp_cbse_92_001 (report), 92_002 (analytical para). */
export const c10_comp_ch92: SimDef = {
    id: 'v3_c10_comp_ch92',
    title: 'The Newsroom',
    subtitle: 'Give the ending first, banish the writer — reports and data paragraphs run on inverted pyramids and invisible narrators',
    classLevel: 10, subject: 'english-composition', topic: 'Report writing and analytical paragraph',
    chapters: ['c10_comp_ch92'],
    nodeIds: ['c10_comp_cbse_92_001', 'c10_comp_cbse_92_002'],
    emoji: '🗞️', theme: { bg: 'from-slate-900 to-stone-950', accent: 'stone', scene: 'senior' },

    scenario: {
        role: 'a junior journalist whose editor cuts stories from the bottom up',
        intro: 'Reports invert the story — the last line of a narrative is the first line of a report. And in the analytical paragraph, the writer must vanish entirely: the data is the star.',
        goal: 'Structure a report in inverted-pyramid order with a working quote — then describe a chart in 120 words with zero opinion.',
    },
    discovery: {
        question: 'Which opening is a REPORT: "The inter-school debate was held on 5 September" or "The morning air buzzed with excitement"?',
        options: [
            'The first — it front-loads the 4W facts',
            'The second — it hooks the reader',
            'Both — reports can start either way',
            'Neither — reports start with the headline only',
        ],
        answer: 'The first — it front-loads the 4W facts',
        hook: 'Reports and stories have opposite contracts: a story immerses slowly, a report informs instantly.',
    },
    teaching: [
        { title: 'The inverted pyramid', text: 'Headline → byline → dateline → lead (What+When+Where) → details + quote → outcome. Editors cut from the bottom — put the expendable stuff last.', emoji: '🔻', bgColor: 'from-stone-500 to-zinc-600' },
        { title: 'The invisible writer', text: 'Analytical paragraphs ban "I think", causes, and advice. Report verbs only: shows, indicates, reveals, compares.', emoji: '👻', bgColor: 'from-zinc-500 to-slate-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_comp_cbse_92_001', title: 'Build the pyramid',
          scaffold: {
            problem: 'Structure a report on your school\'s science exhibition.',
            steps: [
                { text: 'Headline — the whole event in <10 words: "School hosts annual science exhibition".' },
                { text: 'Lead — What+When+Where in one breath: "The exhibition was held on 12 March in the main hall."' },
                { text: 'Body — how it unfolded + one attributed quote: "said the principal".', faded: true },
                { text: 'Tail — outcome/participation: "Over 500 students visited."', faded: true },
                { text: 'You: lead for a sports day on 5 Feb at the ground → "___"', blankAnswer: 'The annual sports day was held on 5 February at the school ground' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_comp_cbse_92_002', title: 'Hunt the banned words',
          dissect: { specimen: 'an analytical paragraph gone editorial',
          spots: [
            { id: 's1', label: 'I think', prompt: '"I think the trend is worrying" — why does this lose marks?', answer: 'opinion is banned — the writer must be invisible; convert to "the trend indicates a decline"', options: ['opinion is banned — the writer must be invisible; convert to "the trend indicates a decline"', 'think is informal', 'worrying is the wrong adjective', 'nothing is wrong'] },
            { id: 's2', label: 'because', prompt: '"Pollution rose because of too many cars" — the violation?', answer: 'speculating causes is banned — the genre reports WHAT, never WHY', options: ['speculating causes is banned — the genre reports WHAT, never WHY', 'because is a conjunction error', 'cars is off-topic', 'rose is the wrong verb'] },
            { id: 's3', label: 'should', prompt: '"The government should act" — which genre rule breaks?', answer: 'advice is banned — analytical paragraphs describe, they do not prescribe', options: ['advice is banned — analytical paragraphs describe, they do not prescribe', 'should is a modal error', 'government is off-topic', 'the sentence is fine'] },
          ] } },
        { type: 'case', nodeId: 'c10_comp_cbse_92_001', title: 'Report or narrative?',
          caseStudy: {
            intro: 'Same event, two contracts. Pick the version that answers the reader\'s question first.',
            decisions: [
              { prompt: 'Best lead for a flood-relief report?', options: [
                  { text: 'A relief camp opened at the district school on 8 August, housing 200 displaced families.', outcome: 'Correct — What+When+Where+scale in one breath; the reader is informed in one line.' },
                  { text: 'Water was everywhere. Nobody expected the river to rise so fast.', outcome: 'Narrative scene-setting — immersive but information-free. Reports inform first, immerse never.', reveals: 'narrative-bleed' },
                ] },
              { prompt: 'Where does "said the Principal" belong?', options: [
                  { text: '"The event was a resounding success," said the Principal.', outcome: 'Correct — quote + attribution tag is the standard certification move.' },
                  { text: 'The Principal was very happy with the event.', outcome: 'Paraphrase kills the attribution structure — quotes certify factuality in reports.', reveals: 'quote-flatten' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_comp_cbse_92_002', title: 'Assemble the analytical frame',
          build: {
            prompt: 'Order the blocks: "in four states / literacy rates / the bar chart / between 2011 and 2021 / depicts"',
            blocks: ['in four states', 'literacy rates', 'the bar chart', 'between 2011 and 2021', 'depicts'],
            answer: 'the bar chart depicts literacy rates in four states between 2011 and 2021',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_comp_cbse_92_001', difficulty: 'standard',
          question: '"I really enjoyed the amazing science exhibition, it was the best day ever!!!" — fix for a report.',
          options: [
              { text: 'The exhibition drew over 500 visitors, according to the organisers.' },
              { text: 'I enjoyed the science exhibition a lot.', reveals: 'personality-residue' },
              { text: 'The science exhibition was amazing and very successful!!!', reveals: 'enthusiasm-residue' },
          ],
          answer: 'The exhibition drew over 500 visitors, according to the organisers.',
          remediations: {
              'personality-residue': { steps: ['Removing exclamations is not enough — first-person enthusiasm must become third-person fact.', 'The fix is changing the reporting stance: quantify, attribute, delete the "I".'] },
              'enthusiasm-residue': { steps: ['"Amazing/successful" is evaluation, not reporting — reports cite evidence (visitor counts, quotes) and let readers evaluate.'] },
          },
          hint: 'Quantify it and attribute it — then the writer can leave.',
          misconception: 'students fix punctuation but keep the narrative stance — reports need a different reporter' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_92_002', difficulty: 'standard',
          question: 'Chart shows city pollution rising 2015–2024. Which sentence belongs?',
          options: [
              { text: 'Pollution rose steadily from 45 to 78 AQI over the decade.' },
              { text: 'This is because people buy too many cars.', reveals: 'cause-speculation' },
              { text: 'The government should ban old vehicles.', reveals: 'advice-injection' },
          ],
          answer: 'Pollution rose steadily from 45 to 78 AQI over the decade.',
          remediations: {
              'cause-speculation': { steps: ['The genre reports WHAT, never WHY — causes are speculation unless the chart shows them.', 'If the data does not say "cars", neither do you.'] },
              'advice-injection': { steps: ['"should" is prescription — banned in this genre.', 'The analytical paragraph ends at comparison; policy belongs to editorials.'] },
          },
          hint: 'Does the chart show the cause, or only the rise?',
          misconception: 'students think analysis means explaining why — in this genre it means reporting what, precisely' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_92_002', difficulty: 'standard',
          question: 'What goes in sentence 1 of an analytical paragraph?',
          options: [
              { text: 'The frame — what the data shows and its scope ("The bar chart depicts literacy in four states, 2011–2021")' },
              { text: 'The biggest figure — start with the peak', reveals: 'peak-first' },
              { text: 'Your overall impression — "the data is very interesting"', reveals: 'opinion-first' },
          ],
          answer: 'The frame — what the data shows and its scope ("The bar chart depicts literacy in four states, 2011–2021")',
          remediations: {
              'peak-first': { steps: ['The reader needs the map before the territory — name the dataset and its scope first, then the extremes.', 'Skeleton: frame → trend → extremes/comparison.'] },
              'opinion-first': { steps: ['"Interesting" is your reaction — banned. Sentence 1 reports what the chart measures, nothing more.'] },
          },
          hint: 'Map before territory — what does the chart measure?',
          misconception: 'students jump to figures without framing — the reader needs the dataset first' },
        { type: 'sort', nodeId: 'c10_comp_cbse_92_001', difficulty: 'foundation',
          question: 'Sort: report register or narrative register?',
          sortItems: [
              { id: 'a', label: 'The match was held on 3 July.', emoji: '🗞️', correctBin: 'report' },
              { id: 'b', label: 'My heart pounded as I entered.', emoji: '💓', correctBin: 'narrative' },
              { id: 'c', label: '"A proud moment," said the coach.', emoji: '💬', correctBin: 'report' },
              { id: 'd', label: 'It was the best day of my life!!!', emoji: '🤩', correctBin: 'narrative' },
              { id: 'e', label: 'Over 300 delegates attended.', emoji: '📊', correctBin: 'report' },
              { id: 'f', label: 'And then, out of nowhere…', emoji: '😱', correctBin: 'narrative' },
          ],
          bins: [
              { id: 'report', label: 'REPORT ✓', color: '#22c55e' },
              { id: 'narrative', label: 'NARRATIVE ✗', color: '#ef4444' },
          ],
          hint: 'Facts and quotes → report. Feelings and suspense → narrative.',
          misconception: 'students write reports as narratives because stories are their only long-form model' },
        { type: 'subpart', nodeId: 'c10_comp_cbse_92_002', difficulty: 'advanced',
          question: 'Bar chart: metro ridership 2019 (4.2M) → 2020 (1.1M) → 2024 (4.8M). Write the paragraph mentally.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'Sentence 1 (frame) states…',
                answer: 'what the chart measures and its scope — metro ridership over 2019–2024',
                options: ['what the chart measures and its scope — metro ridership over 2019–2024', 'the 2020 crash first', 'why ridership fell'],
                hint: 'Frame first — dataset and scope.',
                misconception: 'skips the frame for the drama' },
              { id: 'b', prompt: 'The dominant trend sentence reports…',
                answer: 'a sharp fall in 2020 followed by full recovery above baseline by 2024',
                options: ['a sharp fall in 2020 followed by full recovery above baseline by 2024', 'that 2020 was bad because of the pandemic', 'that metros should be expanded'],
                hint: 'Trend = shape of the data, not its explanation.',
                misconception: 'injects the pandemic cause the chart does not state' },
              { id: 'c', prompt: 'The comparative line cites…',
                answer: 'peak-vs-trough figures — 4.8M vs 1.1M',
                options: ['peak-vs-trough figures — 4.8M vs 1.1M', 'approximate guesses', 'future projections'],
                hint: 'Extremes + comparison, with real numbers.',
                misconception: 'describes shape without citing figures' },
          ] },
    ],

    reflect: { prompts: ['Which is harder — killing the "I" or resisting the urge to explain WHY?', 'Where does the expendable detail go in a pyramid?'] },
    successLine: 'Editor-approved — your leads inform in one breath and your data paragraphs keep the writer invisible.',
    tryAgainLine: 'Facts first, feelings never, reasons never — the pyramid and the invisible writer.',
};
