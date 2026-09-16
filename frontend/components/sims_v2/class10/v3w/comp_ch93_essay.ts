import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_comp_ch93 The Columnist (essay).
 * Nodes: c10_comp_cbse_93_001 (argumentative spine), 93_002 (narrative/descriptive). */
export const c10_comp_ch93: SimDef = {
    id: 'v3_c10_comp_ch93',
    title: 'The Columnist',
    subtitle: 'A thesis you can argue with, three witnesses, and an ending the evidence earned',
    classLevel: 10, subject: 'english-composition', topic: 'Essay — argumentative spine and descriptive craft',
    chapters: ['c10_comp_ch93'],
    nodeIds: ['c10_comp_cbse_93_001', 'c10_comp_cbse_93_002'],
    emoji: '✒️', theme: { bg: 'from-slate-900 to-violet-950', accent: 'violet', scene: 'senior' },

    scenario: {
        role: 'a columnist whose editor deletes any paragraph that does not advance the argument',
        intro: 'An essay is a legal case: the thesis is the charge, each body paragraph is a witness, the conclusion is the closing argument. Decoration is not argument — and a bolted-on moral is not an ending.',
        goal: 'Draft the five-paragraph spine — contestable thesis, three distinct reasons, earned conclusion — then make descriptions show instead of tell.',
    },
    discovery: {
        question: 'Which is a thesis: "Sports are played in school" or "Sports periods should be mandatory because they teach failure-recovery that classrooms cannot"?',
        options: [
            'The second — it claims something contestable with a reason attached',
            'The first — it states a clear fact',
            'Both are theses',
            'Neither — theses come at the end',
        ],
        answer: 'The second — it claims something contestable with a reason attached',
        hook: 'A thesis must be arguable — if nobody can disagree, there is nothing to prove and nothing to write.',
    },
    teaching: [
        { title: 'The spine', text: 'Thesis → three body paragraphs (topic sentence + evidence + link-back) → conclusion answering "so what". The delete test: remove a paragraph; if the argument survives, it was decoration.', emoji: '🦴', bgColor: 'from-violet-500 to-purple-600' },
        { title: 'Show, don\'t tell', text: '"The room was messy" tells. "Books lay spine-cracked on the bed" shows. Swap evaluation for evidence.', emoji: '👁️', bgColor: 'from-purple-500 to-fuchsia-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_comp_cbse_93_001', title: 'Build the legal case',
          scaffold: {
            problem: 'Draft the spine for "Social media should be limited for under-16s."',
            steps: [
                { text: 'Thesis = charge: a claim someone could contest.' },
                { text: 'Witness 1 = reason 1 (safety). Witness 2 = reason 2 (attention). Witness 3 = reason 3 (sleep). Distinct — not three restatements.' },
                { text: 'Each paragraph: topic sentence STATES the reason, then evidence, then "this shows that…" link.', faded: true },
                { text: 'Conclusion answers "so what — why should anyone care?"', faded: true },
                { text: 'You: topic sentence for reason 2 → "Beyond safety, ___"', blankAnswer: 'social media\'s design deliberately fractures adolescent attention' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_comp_cbse_93_001', title: 'The delete test',
          dissect: { specimen: 'a body paragraph that does nothing',
          spots: [
            { id: 's1', label: 'content', prompt: '"Many students play sports. Sports include cricket and football. Cricket is popular in India." — what is wrong?', answer: 'it never advances the thesis — a list, not an argument; missing reason + link-back', options: ['it never advances the thesis — a list, not an argument; missing reason + link-back', 'cricket is off-topic', 'too short', 'needs more facts'] },
            { id: 's2', label: 'function', prompt: 'What question must every body paragraph answer?', answer: 'what reason does this give for the thesis — and how does the evidence prove it', options: ['what reason does this give for the thesis — and how does the evidence prove it', 'is it long enough', 'does it have big words', 'is the handwriting neat'] },
            { id: 's3', label: 'delete', prompt: 'Apply the delete test to this paragraph — does it survive?', answer: 'delete it — the argument loses nothing, so it was decoration', options: ['delete it — the argument loses nothing, so it was decoration', 'keep it — more content is better', 'expand it with more sports names', 'move it to the conclusion'] },
          ] } },
        { type: 'case', nodeId: 'c10_comp_cbse_93_002', title: 'Earn the ending',
          caseStudy: {
            intro: 'The insight must grow from the events — if a moral could end ANY essay, it ends none.',
            decisions: [
              { prompt: 'Ending for a narrative about almost keeping a found ₹5 note:', options: [
                  { text: 'The torn note lay in my palm — heavier than anything I had ever held.', outcome: 'Correct — the insight is dramatized through an image the story built; no proverb needed.' },
                  { text: 'And that is why honesty is the best policy.', outcome: 'A bolted-on proverb — it could close any essay, so it closes none. Earn the insight or cut it.', reveals: 'bolted-moral' },
                  { text: 'Then I went home and ate dinner. The end.', outcome: 'Flat — the ending is where the meaning lands; a shrug wastes it.', reveals: 'flat-ending' },
                ] },
              { prompt: 'Fix this tell: "I was very nervous before the race."', options: [
                  { text: 'My spikes felt wrong on my feet; I retied them twice, then a third time.', outcome: 'Correct — nervousness lives in actions, not in the word "nervous".' },
                  { text: 'I was extremely, incredibly nervous before the race.', outcome: 'Intensifiers are stronger telling, not showing — swap evaluation for evidence.', reveals: 'intensifier-show' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_comp_cbse_93_001', title: 'Stack the spine',
          build: {
            prompt: 'Order the essay spine:',
            blocks: ['conclusion (so-what)', 'body para 2 (reason 2)', 'introduction + thesis', 'body para 3 (reason 3)', 'body para 1 (reason 1)'],
            answer: 'introduction + thesis, body para 1 (reason 1), body para 2 (reason 2), body para 3 (reason 3), conclusion (so-what)',
          } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_comp_cbse_93_001', difficulty: 'standard',
          question: 'A body paragraph reads: "Many students play sports. Sports include cricket and football. Cricket is very popular in India." — what is wrong?',
          options: [
              { text: 'It never advances the thesis — a list, not an argument; missing reason and link-back' },
              { text: 'It is a good paragraph — it has three facts', reveals: 'content-presence' },
              { text: 'It needs more sports names', reveals: 'content-presence' },
          ],
          answer: 'It never advances the thesis — a list, not an argument; missing reason and link-back',
          remediations: {
              'content-presence': { steps: ['Grade paragraphs by function, not fact-count.', 'Every body paragraph owes: a reason FOR the thesis + evidence + a link-back sentence.', 'Delete test: remove it — if the argument survives, it was decoration.'] },
          },
          hint: 'What reason does this paragraph give the thesis?',
          misconception: 'students grade paragraphs by content-presence, not argumentative function' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_93_001', difficulty: 'standard',
          question: 'Which introduction earns marks for "Discipline"?',
          options: [
              { text: 'Discipline converts talent into results — without it, potential stays potential.' },
              { text: 'Since ancient times, discipline has been very important for mankind.', reveals: 'ancient-opener' },
              { text: 'Discipline means following rules. There are many types of discipline.', reveals: 'definition-opener' },
          ],
          answer: 'Discipline converts talent into results — without it, potential stays potential.',
          remediations: {
              'ancient-opener': { steps: ['"Since ancient times" is throat-clearing — the examiner has read it ten thousand times.', 'Open with the claim itself; a thesis is the best hook.'] },
              'definition-opener': { steps: ['Definitions are encyclopedias, not arguments — they tell what a word means, not what you claim.', 'A thesis commits to a contestable position: "Discipline converts talent into results."'] },
          },
          hint: 'Can anyone disagree with the sentence? If not, it is not a thesis.',
          misconception: 'students open with narration or definitions instead of a contestable claim' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_93_002', difficulty: 'standard',
          question: 'Show, don\'t tell: "The market was very crowded and noisy."',
          options: [
              { text: 'Shoulders brushed mine at every step; above the bargaining din a vendor\'s cry rose and fell.' },
              { text: 'The market was extremely crowded and very noisy indeed.', reveals: 'intensifier-show' },
              { text: 'The market was crowded, noisy, busy, bustling, and packed.', reveals: 'adjective-stack' },
          ],
          answer: 'Shoulders brushed mine at every step; above the bargaining din a vendor\'s cry rose and fell.',
          remediations: {
              'intensifier-show': { steps: ['Stronger adjectives = stronger TELLING, not showing.', 'Ask: what did I SEE/HEAR that made me think "crowded and noisy"? Write that.', 'Swap being-verbs for doing-verbs.'] },
              'adjective-stack': { steps: ['Five synonyms is still zero evidence.', 'One concrete detail outperforms a list of adjectives every time.'] },
          },
          hint: 'What would a camera record? Write the footage, not the review.',
          misconception: 'students think showing = stronger adjectives — it is swapping evaluation for evidence' },
        { type: 'mcq', nodeId: 'c10_comp_cbse_93_002', difficulty: 'advanced',
          question: 'Which ending earns marks?',
          options: [
              { text: 'Grandmother\'s torn note lay in my palm — the five rupees I had almost kept, now heavier than anything I had ever held.' },
              { text: 'And that is why honesty is the best policy.', reveals: 'bolted-moral' },
              { text: 'In conclusion, I learned a lot that day.', reveals: 'meta-ending' },
          ],
          answer: 'Grandmother\'s torn note lay in my palm — the five rupees I had almost kept, now heavier than anything I had ever held.',
          remediations: {
              'bolted-moral': { steps: ['If a moral could end ANY essay, it ends none.', 'The insight must grow from the events — dramatize it in the last image instead of naming it.'] },
              'meta-ending': { steps: ['"In conclusion I learned a lot" announces the ending without delivering it.', 'Land on the last image or the earned insight — never on a summary of having written.'] },
          },
          hint: 'Which ending could ONLY belong to THIS story?',
          misconception: 'students believe conclusions exist to state morals rather than to land meaning' },
        { type: 'subpart', nodeId: 'c10_comp_cbse_93_001', difficulty: 'advanced',
          question: 'Plan an essay: "Uniforms should be abolished in schools."',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'Pick a contestable thesis.',
                answer: 'Uniforms should be abolished because they suppress the self-expression that adolescence requires',
                options: ['Uniforms should be abolished because they suppress the self-expression that adolescence requires', 'Uniforms are worn in many schools', 'Uniforms are a type of clothing'],
                hint: 'Claim + reason — arguable.',
                misconception: 'picks a fact, not a claim' },
              { id: 'b', prompt: 'Reason 1 = self-expression. Which is a valid DISTINCT reason 2?',
                answer: 'cost — uniforms impose a repeated expense on poor families',
                options: ['cost — uniforms impose a repeated expense on poor families', 'uniforms also hide personality', 'students dislike uniforms'],
                hint: 'A new axis — economic, not expressive.',
                misconception: 'restates reason 1 in different words' },
              { id: 'c', prompt: 'The conclusion must answer…',
                answer: 'so what — why a reader should care',
                options: ['so what — why a reader should care', 'a summary of the title', 'a new reason not yet discussed'],
                hint: 'The closing argument, not a recap.',
                misconception: 'concludes by repeating the title' },
          ] },
    ],

    reflect: { prompts: ['Which opener do you default to — since-ancient-times or the claim?', 'What detail would you show instead of "very nervous"?'] },
    successLine: 'Your essays argue now — a charge, three witnesses, and an ending the evidence earned.',
    tryAgainLine: 'Delete test every paragraph: does removing it break the argument? If not, it was decoration.',
};
