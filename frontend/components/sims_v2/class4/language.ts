/**
 * Class 4 sims — Language (English + Hindi).
 * English (Marigold-4): pronouns, adjectives degrees, prepositions,
 * conjunctions, paragraph building. Hindi (Rimjhim-4): vilom (opposites),
 * visheshan (adjectives), kriya (verbs), samas intro.
 */
import type { SimDef } from '../engine/types';

export const c4EngPreposition: SimDef = {
    id: 'c4_eng_prep', title: 'In, On, Under, Behind', subtitle: 'Position words!',
    classLevel: 4, subject: 'english', topic: 'Prepositions',
    chapters: ['Marigold-4: prepositions'],
    emoji: '📍', theme: { bg: 'from-gold-100 to-gold-200', accent: 'sky', scene: 'prep' },
    scenario: { role: "a position-placer", intro: "In, on, under, behind — place things precisely!", goal: "Use prepositions." },
    discovery: {
        question: "Is the cat 'on' the box or 'in' the box - does one word change everything?",
        options: ["Yes - in vs on differ!", "Same", "No difference"],
        answer: "Yes - in vs on differ!",
        hook: "Position words matter! Let's learn in, on, under, behind.",
    },
    teaching: [
        { title: 'Where Is It? 📍', text: 'Prepositions tell WHERE: the cat is ON the mat, UNDER the table, BEHIND the door, IN the box!', emoji: '📍', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'In, On, Under 📦', text: 'IN = inside. ON = touching the top. UNDER = below. Each shows a different position!', emoji: '📦', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Behind, Between, Beside ↔️', text: 'BEHIND = at the back. BETWEEN = in the middle of two. BESIDE = next to!', emoji: '↔️', bgColor: 'from-gold-400 to-purple-500' },
    ],
        explore: { widget: 'match', prompt: 'Match the position word!', labels: ['the cat is ___ the box', 'in', 'the ball is ___ the table', 'under', 'the picture is ___ the wall', 'on'] },
challenges: [
        { type: 'mcq', question: '"The cat is ___ the box." (inside it)', answer: 'in', options: ['on', 'in', 'under'],
          hint: 'Inside the box!', misconception: '"In" means inside — the cat is inside the box!',
          workedExample: ['Inside = in.', '"The cat is in the box."'] },
        { type: 'mcq', question: '"The book is ___ the table." (on top of it)', answer: 'on', options: ['in', 'on', 'behind'],
          hint: 'Touching the top surface!', misconception: '"On" means on top of the surface — the book rests on the table!',
          workedExample: ['Top surface = on.', '"on the table."'] },
        { type: 'mcq', question: '"The dog is ___ the chair and the sofa." (in the middle of two)', answer: 'between', options: ['behind', 'between', 'under'],
          hint: 'In the middle of two things!', misconception: '"Between" means in the middle of two things!',
          workedExample: ['Two things: chair + sofa.', 'Middle = between.'] },
        { type: 'mcq', question: '"The ball is ___ the table." (at the back)', answer: 'behind', options: ['in', 'on', 'behind'],
          hint: 'At the back, hidden!', misconception: '"Behind" means at the back — hidden from view!',
          workedExample: ['At the back = behind.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Position pro! ⭐', tryAgainLine: 'Where is it?',
};

export const c4EngConj: SimDef = {
    id: 'c4_eng_conj', title: 'And, But, Or, Because', subtitle: 'Joining words!',
    classLevel: 4, subject: 'english', topic: 'Conjunctions',
    chapters: ['Marigold-4: conjunctions'],
    emoji: '🔗', theme: { bg: 'from-gold-100 to-purple-200', accent: 'violet', scene: 'conj' },
    scenario: { role: "a sentence-joiner", intro: "And, but, or, because — join ideas!", goal: "Connect every sentence." },
    discovery: {
        question: "Can you join 'I like tea' and 'I like coffee' into one sentence?",
        options: ["Yes - with 'and'!", "No", "Only with 'but'"],
        answer: "Yes - with 'and'!",
        hook: "And, but, or, because join ideas! Let's learn.",
    },
    teaching: [
        { title: 'Joining Words! 🔗', text: 'Conjunctions join words and sentences: "I like tea AND coffee." "I am tired BUT happy."', emoji: '🔗', bgColor: 'from-gold-400 to-purple-500' },
        { title: 'And = Add ➕', text: 'AND adds ideas: "She sings and dances." BUT shows contrast: "Small but strong."', emoji: '➕', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Or = Choice, Because = Reason 🔀', text: 'OR gives a choice: "Tea or milk?" BECAUSE gives a reason: "I stayed home because it rained."', emoji: '🔀', bgColor: 'from-amber-400 to-orange-500' },
    ],
        explore: { widget: 'match', prompt: 'Match the joining word to its job!', labels: ['and', 'adds same idea', 'but', 'shows opposite', 'because', 'gives reason'] },
challenges: [
        { type: 'mcq', question: '"I like tea ___ coffee." (both)', answer: 'and', options: ['but', 'and', 'or'],
          hint: 'Likes both!', misconception: '"And" adds things together — she likes both!',
          workedExample: ['Both liked.', '"and" joins them.'] },
        { type: 'mcq', question: '"He is small ___ strong." (opposite idea)', answer: 'but', options: ['and', 'but', 'or'],
          hint: 'Small vs strong — contrast!', misconception: '"But" shows a contrast — small BUT strong!',
          workedExample: ['Small vs strong.', 'Contrast = but.'] },
        { type: 'mcq', question: '"Do you want juice ___ milk?" (choose one)', answer: 'or', options: ['and', 'but', 'or'],
          hint: 'A choice!', misconception: '"Or" gives a choice — pick one!',
          workedExample: ['Choosing = or.', 'Juice or milk.'] },
        { type: 'mcq', question: '"I stayed home ___ it rained." (reason)', answer: 'because', options: ['and', 'or', 'because'],
          hint: 'Why did you stay?', misconception: '"Because" gives the reason — rain is why I stayed!',
          workedExample: ['Reason = because.', 'It rained = reason.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Word joiner! ⭐', tryAgainLine: 'Add, contrast, or choose?',
};

export const c4HinVilom: SimDef = {
    id: 'c4_hin_vilom', title: 'विलोम शब्द — Opposites', subtitle: 'बड़ा ↔ छोटा!',
    classLevel: 4, subject: 'hindi', topic: 'Vilom (Opposites)',
    chapters: ['Rimjhim-4: vilom shabd'],
    emoji: '↔️', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'vilom' },
    scenario: { role: "a vilom-matcher", intro: "Opposite words — match every pair!", goal: "Find every vilom." },
    discovery: {
        question: "What is the opposite of 'bada' - and why do opposites help?",
        options: ["Chhota - opposites show contrast!", "Lamba", "Mota"],
        answer: "Chhota - opposites show contrast!",
        hook: "Vilom words are opposite pairs! Let's match them.",
    },
    teaching: [
        { title: 'विलोम = उल्टे शब्द ↔️', text: 'Vilom words are opposites: बड़ा ↔ छोटा, दिन ↔ रात, ऊपर ↔ नीचे!', emoji: '↔️', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Opposites Are Everywhere 🌗', text: 'गरम ↔ ठंडा, खुश ↔ दुखी, आगे ↔ पीछे — pairs of opposite words!', emoji: '🌗', bgColor: 'from-gold-400 to-gold-500' },
    ],
    // lexicon-driven: fresh opposite questions each run
    generate: {
        kind: 'lex', count: 6, level: 4,
        data: { kind: 'opposite', data: { pairs: [
            { a: 'बड़ा', b: 'छोटा' }, { a: 'दिन', b: 'रात' }, { a: 'ऊपर', b: 'नीचे' },
            { a: 'गरम', b: 'ठंडा' }, { a: 'खुश', b: 'दुखी' }, { a: 'तेज़', b: 'धीमा' },
            { a: 'लंबा', b: 'छोटा' }, { a: 'आगे', b: 'पीछे' }, { a: 'अंदर', b: 'बाहर' },
        ] } },
    },
        explore: { widget: 'match', prompt: 'विलोम जोड़े मिलाओ!', labels: ['दिन', 'रात', 'गर्म', 'ठंडा', 'बड़ा', 'छोटा'] },
challenges: [
        { type: 'mcq', question: 'बड़ा का विलोम (opposite) क्या है?', answer: 'छोटा', options: ['लंबा', 'छोटा', 'मोटा'],
          hint: 'Big ↔ ?', misconception: 'बड़ा (big) का विलोम छोटा (small)!',
          workedExample: ['बड़ा = big.', 'Opposite = छोटा.'] },
        { type: 'mcq', question: 'विलोम शब्द क्या हैं?', answer: 'Opposite words', options: ['Same meaning words', 'Opposite words', 'Rhyming words'],
          hint: 'उल्टे शब्द!', misconception: 'विलोम = opposite words — बड़ा↔छोटा!',
          workedExample: ['विलोम = opposite.', 'बड़ा ↔ छोटा.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'विलोम स्टार! ⭐', tryAgainLine: 'उल्टा सोचो!',
};

export const c4HinVisheshan: SimDef = {
    id: 'c4_hin_visheshan', title: 'विशेषण — Describing', subtitle: 'बताने वाले शब्द!',
    classLevel: 4, subject: 'hindi', topic: 'Visheshan (Adjectives)',
    chapters: ['Rimjhim-4: visheshan'],
    emoji: 'वि', theme: { bg: 'from-rose-100 to-pink-200', accent: 'rose', scene: 'visheshan' },
    scenario: { role: "a visheshan-spotter", intro: "Words that describe nouns!", goal: "Find every visheshan." },
    discovery: {
        question: "In 'laal phool', which word tells HOW the flower is?",
        options: ["Laal - it describes!", "Phool", "Both"],
        answer: "Laal - it describes!",
        hook: "Visheshan describes the noun! Let's find them.",
    },
    teaching: [
        { title: 'विशेषण = बताने वाले 🏷️', text: 'Visheshan describes a noun: "लाल फूल" (red flower), "बड़ा घर" (big house)!', emoji: '🏷️', bgColor: 'from-rose-400 to-pink-500' },
        { title: 'Kinds of Visheshan 🎨', text: 'Colour (लाल), size (बड़ा), number (तीन), quality (अच्छा) — all describe the noun!', emoji: '🎨', bgColor: 'from-gold-400 to-purple-500' },
    ],
        explore: { widget: 'match', prompt: 'विशेषण मिलाओ!', labels: ['लाल', 'गुलाब', 'बड़ा', 'घर', 'मीठा', 'आम'] },
challenges: [
        { type: 'mcq', question: '"लाल फूल" में विशेषण (describing word) कौन है?', answer: 'लाल', options: ['फूल', 'लाल', 'दोनों'],
          hint: 'Which word describes the flower?', misconception: 'लाल describes the फूल — it is the विशेषण!',
          workedExample: ['फूल = noun.', 'लाल describes it.', 'विशेषण = लाल.'] },
        { type: 'mcq', question: 'Which is a विशेषण?', answer: 'सुंदर', options: ['दौड़ना', 'सुंदर', 'स्कूल'],
          hint: 'It describes something!', misconception: 'सुंदर (beautiful) describes — दौड़ना is action, स्कूल is noun!',
          workedExample: ['Describes = adjective.', 'सुंदर = beautiful.'] },
        { type: 'mcq', question: '"तीन लड़के" में विशेषण कौन है?', answer: 'तीन', options: ['लड़के', 'तीन', 'कोई नहीं'],
          hint: 'The number describes!', misconception: 'तीन (three) tells how many — a विशेषण!',
          workedExample: ['तीन = number.', 'Describes लड़के.', 'विशेषण = तीन.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'विशेषण स्टार! ⭐', tryAgainLine: 'कैसा है?',
};

export const c4EngParagraph: SimDef = {
    id: 'c4_eng_para', title: 'Build a Paragraph', subtitle: 'Sentences in order!',
    classLevel: 4, subject: 'english', topic: 'Paragraph Writing',
    chapters: ['Marigold-4: paragraph writing'],
    emoji: '📝', theme: { bg: 'from-emerald-100 to-teal-200', accent: 'emerald', scene: 'para' },
    scenario: { role: "a paragraph-builder", intro: "A paragraph is sentences on ONE idea!", goal: "Build clear paragraphs." },
    discovery: {
        question: "Should a paragraph jump between many ideas - or stick to one?",
        options: ["One main idea!", "Many ideas", "Random"],
        answer: "One main idea!",
        hook: "A paragraph is sentences about ONE idea in order! Let's build.",
    },
    teaching: [
        { title: 'Sentences Build a Paragraph! 📝', text: 'A paragraph is sentences about ONE idea, in order: first the main idea, then details!', emoji: '📝', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Main Idea First 💡', text: 'Start with the main idea: "My dog is my best friend." Then add details about WHY!', emoji: '💡', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Details Support 🔍', text: 'Details explain the main idea: "He plays with me. He waits for me. He is loyal."', emoji: '🔍', bgColor: 'from-amber-400 to-orange-500' },
    ],
        explore: { widget: 'order', prompt: 'Order the sentences into a paragraph!', labels: ['Morning is the best time to study', 'The mind is fresh', 'We can learn fast', 'So I study early every day'] },
challenges: [
        { type: 'order', question: 'Order the sentences to make a paragraph about a dog!', options: [],
          sortItems: [
            { id: 'p1', label: 'He plays fetch with me.', emoji: '🎾', correctBin: 's2' },
            { id: 'p2', label: 'My dog is my best friend.', emoji: '🐕', correctBin: 's1' },
            { id: 'p3', label: 'That is why I love him.', emoji: '❤️', correctBin: 's3' },
          ],
          bins: [ { id: 's1', label: '1st', color: '#10b981' }, { id: 's2', label: '2nd', color: '#3b82f6' },
                  { id: 's3', label: '3rd', color: '#ec4899' } ],
          hint: 'Main idea first, detail, then ending!',
          misconception: 'Main idea → detail → conclusion: "My dog is my best friend" comes first!',
          workedExample: ['Main idea first.', 'Detail next.', 'Ending last.'] },
        { type: 'mcq', question: 'A paragraph should be about...', answer: 'One main idea', options: ['Many different ideas', 'One main idea', 'Random sentences'],
          hint: 'One topic!', misconception: 'A paragraph focuses on ONE main idea — all sentences support it!',
          workedExample: ['One idea.', 'All sentences support it.'] },
        { type: 'mcq', question: 'Which sentence is the main idea?', answer: 'My dog is my best friend', options: ['He plays fetch', 'My dog is my best friend', 'He wags his tail'],
          hint: 'The big point the others explain!', misconception: 'The main idea is the big point — details like "plays fetch" support it!',
          workedExample: ['Main idea = big point.', 'Details explain it.', '"Best friend" is the point.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Paragraph pro! ⭐', tryAgainLine: 'Main idea first!',
};

export const class4LanguageSims: SimDef[] = [
    c4EngPreposition, c4EngConj, c4EngParagraph,
    c4HinVilom, c4HinVisheshan,
];
