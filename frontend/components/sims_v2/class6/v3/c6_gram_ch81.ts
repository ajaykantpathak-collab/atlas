import type { SimDef } from '../../engine/types';

/** v3 generated — c6_gram_ch81 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_gram_ch81: SimDef = {
    id: 'v3_c6_gram_ch81',
    title: 'Nouns sort into families by what they name.',
    subtitle: 'Covers the four families plus countable/uncountable awareness (water, rice — no plural).',
    classLevel: 6, subject: 'gram', topic: 'Nouns sort into families by what they name.',
    chapters: ['c6_gram_ch81'],
    nodeIds: ['c6_gram_cbse_81_001', 'c6_gram_cbse_81_002', 'c6_gram_cbse_81_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Touch test on the board: can you touch it, see it, weigh it? \'Table\' yes → concrete. \'Honesty\' no → abstract.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Nouns sort into families by what they.', text: 'Nouns sort into families by what they name: common (boy, city), proper (Ravi, Delhi — always capitalised), collective (team, flock — one word for a group), abstract (honesty, fear — things you cannot.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c6_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Nouns sort into families by what they name.', spots: [
            { id: 's1', label: 'Nouns sort into families by', prompt: 'Which idea is this? — Nouns sort into families by what they name: common (boy, city), proper (Ravi, Delhi.', answer: 'Nouns sort into families by', options: ['Nouns sort into families by', 'A pronoun replaces a noun', 'Numbers singular means one plural'] },
            { id: 's2', label: 'A pronoun replaces a noun', prompt: 'Which idea is this? — A pronoun replaces a noun so we do not repeat ourselves: he, she, it, they, this, who.', answer: 'A pronoun replaces a noun', options: ['A pronoun replaces a noun', 'Nouns sort into families by', 'Numbers singular means one plural'] },
            { id: 's3', label: 'Numbers singular means one plural', prompt: 'Which idea is this? — Numbers: singular means one, plural means more than one — but English pluralizes in five.', answer: 'Numbers singular means one plural', options: ['Numbers singular means one plural', 'Nouns sort into families by', 'A pronoun replaces a noun'] }
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_81_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Can senses detect it? → no = abstract, yes = common.', 'Does it name a group as one word? → collective.', 'Is it a name of one specific thing? → proper (capitalise).'], answer: 'Is it a name of one specific thing? → proper (capitalise). Does it name a group as one word? → collective. Can senses detect it? → no = abstract, yes = common.' } },
        { type: 'case', nodeId: 'c6_gram_cbse_81_003', title: 'You made it',
          caseStudy: { intro: 'You finished Nouns sort into families by what they name. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_gram_cbse_81_001', difficulty: 'standard',
          question: 'Nouns sort into families by what they name: common (boy, city), proper (Ravi.',
          hint: 'Work step by step.',
          misconception: 'Students think abstract = \'difficult word\' — so they call \'mountain\' abstract because it is big, and \'idea\' concrete.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nouns sort into families by what they name: common (boy, city), proper (Ravi, Delhi',
                  options: ['Nouns sort into families by what they name: common (boy, city), proper (Ravi, Delhi', 'A pronoun replaces a noun so we do not repeat ourselves: he, she, it, they, this, who,', 'Numbers: singular means one, plural means more than one'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think abstract = \'difficult word\' — so they call \'mountain\' abstract because it is big, and \'idea\' concrete because they use.' }
          ],
            remediations: { 'abstract-difficult-word-so-they': { steps: ['Is it a name of one specific thing? → proper (capitalise).', 'Does it name a group as one word? → collective.', 'Can senses detect it? → no = abstract, yes = common concrete.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_81_002', difficulty: 'standard',
          question: 'A pronoun replaces a noun so we do not repeat ourselves: he, she, it, they.',
          hint: 'Work step by step.',
          misconception: 'Students match pronouns to the NEAREST noun instead of the correct antecedent (\'The girls gave the boys their ball\'.',
          parts: [
                { id: 'a', prompt: 'Fix: \'Its raining, so the dog lost it\'s bone.\'', answer: '\'It\'s raining\' (it is) + \'its bone\' (possessive, no apostrophe)',
                  options: ['\'It\'s raining\' (it is) + \'its bone\' (possessive, no apostrophe)', 'apostrophe = possession'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students match pronouns to the NEAREST noun instead of the correct antecedent (\'The girls gave the boys their ball\' — whose ball?), and.' }
          ],
            remediations: { 'students-match-pronouns-to-the': { steps: ['Find which noun the pronoun stands for — the antecedent.', 'Match number and gender to THAT noun, not the nearest one.', 'its vs it\'s — expand to \'it is\'; if the sentence still makes sense, use the apostrophe.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_81_003', difficulty: 'standard',
          question: 'Numbers: singular means one, plural means more than one — but English.',
          hint: 'Work step by step.',
          misconception: 'Students apply +s universally → \'childs\', \'mouses\', \'foots\' — and add -s to uncountables → \'waters\', \'furnitures\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Numbers: singular means one, plural means more than one',
                  options: ['Numbers: singular means one, plural means more than one', 'Nouns sort into families by what they name: common (boy, city), proper (Ravi, Delhi', 'A pronoun replaces a noun so we do not repeat ourselves: he, she, it, they, this, who,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students apply +s universally → \'childs\', \'mouses\', \'foots\' — and add -s to uncountables → \'waters\', \'furnitures\', \'homeworks\'.' }
          ],
            remediations: { 'students-apply-s-universally-childs': { steps: ['Check the ending letter — s/x/ch/sh → es; consonant+y → ies; f/fe → ves.', 'Check the irregular list — is it a memorized rebel?', 'Check countability — uncountables take no plural at all.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
