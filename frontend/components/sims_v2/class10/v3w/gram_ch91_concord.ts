import type { SimDef } from '../../engine/types';

/** HAND-AUTHORED — c10_gram_ch91 The Head Decides (subject–verb concord).
 * Nodes: c10_gram_cbse_91_001 (head noun), 91_002 (indefinites), 91_003 (collectives). */
export const c10_gram_ch91: SimDef = {
    id: 'v3w_c10_gram_ch91',
    title: 'The Head Decides',
    subtitle: 'The verb agrees with the head noun — never with the decoy standing next to it',
    classLevel: 10, subject: 'english-grammar', topic: 'Subject–verb concord',
    chapters: ['c10_gram_ch91'],
    nodeIds: ['c10_gram_cbse_91_001', 'c10_gram_cbse_91_002', 'c10_gram_cbse_91_003'],
    emoji: '⚖️', theme: { bg: 'from-slate-900 to-emerald-950', accent: 'emerald', scene: 'senior' },

    scenario: {
        role: 'a courtroom judge ruling which noun gets to govern the verb',
        intro: 'Examiners bury the real subject under decoy phrases — of-phrases, as-well-as inserts, dummy "there" — betting you will agree with the last noun you read instead of the head.',
        goal: 'Strip any subject phrase to its head and make the verb obey it — through decoys, indefinites, and collectives.',
    },
    discovery: {
        question: '"The box of chocolates ___ empty." — is or are?',
        options: [
            'is — the subject is "box", singular',
            'are — "chocolates" is plural and closest to the verb',
            'are — a box full of things counts as plural',
            'is or are — both are accepted',
        ],
        answer: 'is — the subject is "box", singular',
        hook: '"Of chocolates" is a decoy phrase doing one job: making you agree with the wrong noun.',
    },
    teaching: [
        { title: 'The head rule', text: 'Agreement is decided by the HEAD of the subject phrase. Everything inside an of-/with-/as-well-as-phrase is camouflage.', emoji: '🎯', bgColor: 'from-emerald-500 to-teal-600' },
        { title: 'The three traps', text: 'Decoy phrases, indefinite pronouns with fixed number, and collectives that flip by meaning — unit or members?', emoji: '🪤', bgColor: 'from-teal-500 to-gold-600' },
    ],

    beats: [
        { type: 'scaffold', nodeId: 'c10_gram_cbse_91_001', title: 'Strip the decoy',
          scaffold: {
            problem: '"The leader, along with his followers, ___ (is/are) here."',
            steps: [
                { text: 'Find the verb: is/are.' },
                { text: 'Ask "who is here?" → "the leader" — that phrase is the subject.' },
                { text: 'Cross out the insert: ", along with his followers," — as well as does NOT pluralize.', faded: true },
                { text: 'Agree with what survives: The leader IS here.', faded: true },
                { text: 'You: "The captain, as well as the players, ___ congratulated." → ', blankAnswer: 'was' },
            ],
          } },
        { type: 'dissect', nodeId: 'c10_gram_cbse_91_002', title: 'The indefinite boxes',
          dissect: { specimen: 'pronouns with fixed number',
          spots: [
            { id: 's1', label: 'each', prompt: '"Each of the boys ___ a book." Singular or plural — and what trick is "each" playing?', answer: 'has — each is always singular; it distributes over many boys but singles them out one at a time', options: ['has — each is always singular; it distributes over many boys but singles them out one at a time', 'have — each means all the boys', 'have — "of the boys" makes it plural'] },
            { id: 's2', label: 'neither…nor', prompt: '"Neither the players nor the captain ___ present." Which subject governs?', answer: 'was — in neither…nor, the verb agrees with the NEARER subject (captain)', options: ['was — in neither…nor, the verb agrees with the NEARER subject (captain)', 'were — two subjects always make plural', 'was — neither is always singular'] },
            { id: 's3', label: 'some', prompt: '"Some of the milk ___ spilt." Where does "some" get its number?', answer: 'has — some takes its number from the of-phrase; milk is uncountable', options: ['has — some takes its number from the of-phrase; milk is uncountable', 'have — some is always plural', 'has — milk is a liquid so singular always'] },
          ] } },
        { type: 'case', nodeId: 'c10_gram_cbse_91_003', title: 'Unit or members?',
          caseStudy: {
            intro: 'Collective nouns (team, jury, committee) are grammatically double-jointed — singular when the group acts as one, plural when members act separately.',
            decisions: [
              { prompt: '"The committee ___ submitted its report." Which form?', options: [
                  { text: 'has — one committee submitting one report = a unit acting', outcome: 'Correct — the collective acts as a single body here.' },
                  { text: 'have — a committee is many people', outcome: 'Not quite — count the ACTION, not the people: one report, one act, singular.', reveals: 'collective-always-plural' },
                ] },
              { prompt: '"The committee ___ quarrelling among themselves." Now which?', options: [
                  { text: 'are — members acting separately = plural', outcome: 'Correct — "among themselves" can only be done by individuals, so the collective splits grammatically too.' },
                  { text: 'is — committee is always singular', outcome: 'Not quite — "among themselves" is impossible for a single unit; the meaning forces plural.', reveals: 'collective-always-singular' },
                ] },
            ],
          } },
        { type: 'build', nodeId: 'c10_gram_cbse_91_001', title: 'Rebuild the subject',
          build: {
            prompt: 'Order the blocks into a legal sentence: "waiting outside / there / a boy and two girls / are"',
            blocks: ['waiting outside', 'there', 'a boy and two girls', 'are'],
            answer: 'there are a boy and two girls waiting outside',
          } },
        { type: 'drill', nodeId: 'c10_gram_cbse_91_002', title: 'Indefinite speed round', drill: { kind: 'fill', count: 4, level: 4 } },
    ],

    challenges: [
        { type: 'mcq', nodeId: 'c10_gram_cbse_91_001', difficulty: 'standard',
          question: '"The quality of these mangoes ___ poor."',
          options: [
              { text: 'was — head noun "quality" is singular; "of these mangoes" is a decoy' },
              { text: 'were — "mangoes" is plural', reveals: 'proximity-agreement' },
              { text: 'were — poor quality applies to all mangoes', reveals: 'semantic-plurality' },
          ],
          answer: 'was — head noun "quality" is singular; "of these mangoes" is a decoy',
          remediations: {
              'proximity-agreement': { steps: ['Proximity is the trap, not the rule — the verb ignores the nearest noun.', 'Find the head: "the quality OF X" → quality is the subject.', 'Delete every of-phrase mentally, then agree.'] },
              'semantic-plurality': { steps: ['Grammar agrees with FORM, not meaning — "quality" is grammatically singular even though it describes many mangoes.', 'Ask "what word does the verb hang on?" not "how many things are we talking about?"'] },
          },
          hint: 'Cross out "of these mangoes" — what subject is left?',
          misconception: 'proximity agreement — matching the verb to the physically nearest noun instead of the head' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_91_003', difficulty: 'standard',
          question: '"The news ___ encouraging."',
          options: [
              { text: 'is — "news" ends in -s but is singular by convention' },
              { text: 'are — it ends in s, so plural', reveals: 'spelling-agreement' },
              { text: 'are — many news items exist', reveals: 'semantic-plurality' },
          ],
          answer: 'is — "news" ends in -s but is singular by convention',
          remediations: {
              'spelling-agreement': { steps: ['Terminal -s is a spelling feature, not a number marker.', 'Fixed-form singulars: news, physics, measles, billiards, mathematics.', 'Learn them as a list — logic will not save you here.'] },
              'semantic-plurality': { steps: ['"News" is one broadcast, one body of information — grammatically singular regardless of how many stories it contains.'] },
          },
          hint: 'Does -s always mean plural? Check the fixed-form list.',
          misconception: 'spelling-driven agreement — the terminal -s hijacks the grammar' },
        { type: 'mcq', nodeId: 'c10_gram_cbse_91_002', difficulty: 'advanced',
          question: '"Neither the players nor the captain ___ present."',
          options: [
              { text: 'was — the verb agrees with the nearer subject (captain)' },
              { text: 'were — two subjects joined = plural', reveals: 'correlative-sum' },
              { text: 'was — "neither" is always singular', reveals: 'indefinite-blind' },
          ],
          answer: 'was — the verb agrees with the nearer subject (captain)',
          remediations: {
              'correlative-sum': { steps: ['Neither…nor / either…or are NOT "and" — they do not sum to plural.', 'The verb agrees with the subject CLOSER to it.', 'Swap test: "Neither the captain nor the players ___" → were.'] },
              'indefinite-blind': { steps: ['"Neither" alone IS singular — but here it is part of neither…nor, which follows the proximity rule, not the indefinite rule.'] },
          },
          hint: 'In neither…nor, which subject sits closer to the verb?',
          misconception: 'students sum correlative subjects to plural instead of applying proximity' },
        { type: 'sort', nodeId: 'c10_gram_cbse_91_002', difficulty: 'foundation',
          question: 'File each indefinite into its agreement box:',
          sortItems: [
              { id: 'a', label: 'each', emoji: '1️⃣', correctBin: 'sing' },
              { id: 'b', label: 'everyone', emoji: '👤', correctBin: 'sing' },
              { id: 'c', label: 'few', emoji: '👥', correctBin: 'plur' },
              { id: 'd', label: 'several', emoji: '🔢', correctBin: 'plur' },
              { id: 'e', label: 'some', emoji: '❓', correctBin: 'dep' },
              { id: 'f', label: 'most', emoji: '❔', correctBin: 'dep' },
          ],
          bins: [
              { id: 'sing', label: 'ALWAYS SINGULAR', color: '#22c55e' },
              { id: 'plur', label: 'ALWAYS PLURAL', color: '#ef4444' },
              { id: 'dep', label: 'DEPENDS (of-phrase)', color: '#f59e0b' },
          ],
          hint: 'Each/every/everyone/someone/nobody → singular. Few/many/several/both → plural.',
          misconception: 'students assign number by meaning ("everyone = all people") not by grammatical category' },
        { type: 'subpart', nodeId: 'c10_gram_cbse_91_003', difficulty: 'advanced',
          question: '"A pair of scissors ___ on the table." — work through the agreement chain.',
      hint: 'Work the parts in order — each answer feeds the next.',
      misconception: 'rushes to the final answer without building the chain',
          parts: [
              { id: 'a', prompt: 'What is the head noun of the subject?',
                answer: 'pair',
                options: ['pair', 'scissors', 'table'],
                hint: '"Of scissors" is a decoy phrase — the head is the container word.',
                misconception: 'agrees with the salient noun, not the head' },
              { id: 'b', prompt: 'So which verb form?',
                answer: 'is',
                options: ['is', 'are'],
                hint: '"pair" is singular — the scissors inside it do not count.',
                misconception: 'agrees with the salient noun, not the head' },
              { id: 'c', prompt: 'Bonus: without "a pair of", "The scissors ___ on the table."',
                answer: 'are',
                options: ['are', 'is'],
                hint: 'scissors is pluralia tantum — plural form, plural verb.',
                misconception: 'treats pluralia tantum as singular' },
          ] },
    ],

    reflect: { prompts: ['Which decoy fooled you most — of-phrases or as-well-as?', 'Explain "the committee is vs the committee are" to a friend in one line.'] },
    successLine: 'You read subject phrases like a parser — heads, decoys, and all.',
    tryAgainLine: 'Still agreeing with the nearest noun? Find the head first — always.',
};
