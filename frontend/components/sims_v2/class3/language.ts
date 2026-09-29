/**
 * Class 3 sims — Language (English + Hindi).
 *
 * English (Marigold-3): tenses intro, articles (a/an/the), describing
 * words, story order, question words. Hindi (Rimjhim-3): matras deeper,
 * sentence making, sangya (nouns).
 */
import type { SimDef } from '../engine/types';

export const c3EngTense: SimDef = {
    id: 'c3_eng_tense', title: 'Is, Was, Will Be', subtitle: 'Now, before, later!',
    classLevel: 3, subject: 'english', topic: 'Tenses (Simple)',
    chapters: ['Marigold-3: verb tenses'],
    emoji: '⏳', theme: { bg: 'from-gold-100 to-gold-200', accent: 'indigo', scene: 'tense' },
    scenario: { role: "a tense-traveller", intro: "Words change with time — is, was, will be!", goal: "Use every tense." },
    discovery: {
        question: "If 'she plays' is now, what is 'she played'?",
        options: ["Past - already done!", "Future", "Still now"],
        answer: "Past - already done!",
        hook: "Words change with time! Let's learn tenses.",
    },
    teaching: [
        { title: 'When Did It Happen? ⏳', text: 'Words change with time! "I play" (now), "I played" (before), "I will play" (later). Time changes the word!', emoji: '⏳', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Present = Now ▶️', text: 'Happening right now: "She reads a book." Present tense = now!', emoji: '▶️', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Past = Already Done ⏪', text: 'Already happened: "She read a book." Often adds -ed: play→played, jump→jumped!', emoji: '⏪', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Future = Will Come ⏩', text: 'Not yet: "She will read a book." Future uses "will"!', emoji: '⏩', bgColor: 'from-gold-400 to-purple-500' },
    ],
        explore: { widget: 'match', prompt: 'Match to its time!', labels: ['is playing', 'now', 'played', 'before', 'will play', 'later'] },
challenges: [
        { type: 'mcq', question: '"She played yesterday." This is...', answer: 'Past tense', options: ['Present', 'Past tense', 'Future'],
          hint: '"Yesterday" + "played" = already done!', misconception: '"Played" + "yesterday" = past — it already happened!',
          workedExample: ['"played" = done.', '"yesterday" = past.', 'Past tense.'] },
        { type: 'mcq', question: '"I will sing tomorrow." This is...', answer: 'Future tense', options: ['Present', 'Past', 'Future tense'],
          hint: '"will" + "tomorrow" = not yet!', misconception: '"Will" + "tomorrow" = future — it has not happened yet!',
          workedExample: ['"will" = future.', '"tomorrow" = later.', 'Future.'] },
        { type: 'mcq', question: 'What is the past of "jump"?', answer: 'jumped', options: ['jumping', 'jumped', 'jumps'],
          hint: 'Add -ed!', misconception: 'Past of jump = jumped — add -ed!',
          workedExample: ['Past adds -ed.', 'jump → jumped.'] },
        { type: 'mcq', question: '"He ___ a mango now." Fill the blank.', answer: 'is eating', options: ['ate', 'is eating', 'will eat'],
          hint: '"now" = present!', misconception: '"Now" means present — "is eating" is happening right now!',
          workedExample: ['"now" = present.', 'is eating.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Time word star! ⭐', tryAgainLine: 'Now, before, or later?',
};

export const c3EngArticles: SimDef = {
    id: 'c3_eng_articles', title: 'A, An, The', subtitle: 'Little words, big job!',
    classLevel: 3, subject: 'english', topic: 'Articles',
    chapters: ['Marigold-3: articles a an the'],
    emoji: '📌', theme: { bg: 'from-teal-100 to-emerald-200', accent: 'teal', scene: 'articles' },
    scenario: { role: "an article-ace", intro: "A, an, the — small words that matter!", goal: "Choose the right article." },
    discovery: {
        question: "Why 'an apple' but 'a dog' - what's the difference?",
        options: ["Vowel sound needs 'an'!", "No difference", "Random"],
        answer: "Vowel sound needs 'an'!",
        hook: "An before vowels, a before the rest! Let's learn.",
    },
    teaching: [
        { title: 'A, An, The! 📌', text: 'Tiny words before names: "a cat", "an apple", "the sun". They come before naming words!', emoji: '📌', bgColor: 'from-teal-400 to-emerald-500' },
        { title: 'A vs An 🔤', text: 'Use "an" before vowel sounds (a,e,i,o,u): an apple, an egg. Use "a" before others: a cat, a dog!', emoji: '🔤', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'The = That One 🎯', text: '"The" points to a special one: "the sun" (there is only one!). "A" means any one: "a cat" (any cat).', emoji: '🎯', bgColor: 'from-amber-400 to-orange-500' },
    ],
        explore: { widget: 'match', prompt: 'a, an or the?', labels: ['apple', 'an', 'ball', 'a', 'sun', 'the'] },
challenges: [
        { type: 'mcq', question: '"___ apple a day" — which fits?', answer: 'An', options: ['A', 'An', 'The'],
          hint: 'Apple starts with a vowel sound!', misconception: 'Apple starts with "a" (vowel) — use "an"!',
          workedExample: ['Apple starts with a.', 'Vowel → an.', '"An apple."'] },
        { type: 'mcq', question: '"___ dog is barking" — which fits?', answer: 'A', options: ['A', 'An', 'The'],
          hint: 'Dog starts with d — not a vowel!', misconception: 'Dog starts with "d" (consonant) — use "a"!',
          workedExample: ['Dog starts with d.', 'Consonant → a.', '"A dog."'] },
        { type: 'mcq', question: 'Which uses "the"? (only one exists)', answer: 'the sun', options: ['a sun', 'an sun', 'the sun'],
          hint: 'Only one sun!', misconception: 'There is only one sun — use "the" for special/one-of-a-kind!',
          workedExample: ['One sun only.', 'Special → the.', '"The sun."'] },
        { type: 'mcq', question: '"an umbrella" or "a umbrella"?', answer: 'an umbrella', options: ['a umbrella', 'an umbrella', 'the umbrella only'],
          hint: 'Umbrella starts with u!', misconception: 'Umbrella starts with "u" (vowel) — "an umbrella"!',
          workedExample: ['Starts with u (vowel).', '→ an umbrella.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Article ace! ⭐', tryAgainLine: 'Vowel sound → an!',
};

export const c3HinVakya: SimDef = {
    id: 'c3_hin_vakya', title: 'वाक्य बनाओ — Sentences', subtitle: 'शब्दों से वाक्य!',
    classLevel: 3, subject: 'hindi', topic: 'Sentence Making',
    chapters: ['Rimjhim-3: vakya nirman'],
    emoji: 'व', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'vakya' },
    scenario: { role: "a vakya-builder", intro: "Hindi sentences need the right word order!", goal: "Build correct vakya." },
    discovery: {
        question: "Is 'billi doodh peeti hai' the same as 'doodh billi hai peeti'?",
        options: ["No - order matters!", "Same", "Almost"],
        answer: "No - order matters!",
        hook: "Right order makes a real vakya! Let's build them.",
    },
    teaching: [
        { title: 'शब्द मिलकर वाक्य 🧱', text: 'Words join to make sentences: "राम खेलता है" (Ram plays). Who + does + what!', emoji: '🧱', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'कर्ता और क्रिया 🏃', text: 'Every sentence has WHO (कर्ता) and DOES (क्रिया): "बिल्ली दूध पीती है" — cat drinks milk!', emoji: '🏃', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'क्रम ज़रूरी है 🔢', text: 'Order matters! "राम ने खाना खाया" not "खाया राम खाना" — right order makes sense!', emoji: '🔢', bgColor: 'from-gold-400 to-purple-500' },
    ],
        explore: { widget: 'order', prompt: 'वाक्य सही क्रम में लगाओ!', labels: ['राम', 'स्कूल', 'जाता', 'है'] },
challenges: [
        { type: 'mcq', question: 'Which is a correct वाक्य (sentence)?', answer: 'बिल्ली दूध पीती है', options: ['दूध बिल्ली है पीती', 'बिल्ली दूध पीती है', 'पीती दूध बिल्ली'],
          hint: 'Who + what + does!', misconception: 'Correct order: बिल्ली (who) दूध (what) पीती है (does)!',
          workedExample: ['Who? बिल्ली.', 'What? दूध.', 'Does? पीती है.', 'बिल्ली दूध पीती है.'] },
        { type: 'mcq', question: '"राम स्कूल ___" — क्रिया (action) क्या है?', answer: 'जाता है', options: ['जाता है', 'स्कूल', 'राम'],
          hint: 'What is Ram DOING?', misconception: 'जाता है is the action (क्रिया) — what Ram does!',
          workedExample: ['Who? राम.', 'Does? जाता है.', 'क्रिया = जाता है.'] },
        { type: 'mcq', question: '"चिड़िया उड़ती है" में कर्ता (doer) कौन है?', answer: 'चिड़िया', options: ['उड़ती', 'चिड़िया', 'है'],
          hint: 'Who is doing the flying?', misconception: 'चिड़िया is the कर्ता — the one doing the action!',
          workedExample: ['Action: उड़ती है.', 'Who flies? चिड़िया.', 'कर्ता = चिड़िया.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'वाक्य स्टार! ⭐', tryAgainLine: 'कौन + क्या करता है!',
};

export const c3HinSangya: SimDef = {
    id: 'c3_hin_sangya', title: 'संज्ञा — Naming Words', subtitle: 'नाम के शब्द!',
    classLevel: 3, subject: 'hindi', topic: 'Sangya (Nouns)',
    chapters: ['Rimjhim-3: sangya'],
    emoji: 'न', theme: { bg: 'from-rose-100 to-pink-200', accent: 'rose', scene: 'sangya' },
    scenario: { role: "a sangya-finder", intro: "Naming words name person, place, thing!", goal: "Find every sangya." },
    discovery: {
        question: "Is 'kitaab' a naming word or an action word?",
        options: ["Naming word - a thing!", "Action", "Both"],
        answer: "Naming word - a thing!",
        hook: "Sangya = naming words - person, place, thing!",
    },
    teaching: [
        { title: 'संज्ञा = नाम 🏷️', text: 'Sangya = naming words! Person (राम), place (स्कूल), thing (किताब), animal (कुत्ता) — all names are sangya!', emoji: '🏷️', bgColor: 'from-rose-400 to-pink-500' },
        { title: 'Kinds of Sangya 📚', text: 'व्यक्तिवाचक (one name: राम), जातिवाचक (a type: लड़का), भाववाचक (a feeling: खुशी)!', emoji: '📚', bgColor: 'from-gold-400 to-gold-500' },
    ],
        explore: { widget: 'match', prompt: 'संज्ञा मिलाओ!', labels: ['लड़का', 'पुरुष', 'नदी', 'स्थान', 'चूड़ी', 'वस्तु'] },
challenges: [
        { type: 'mcq', question: 'Which is a संज्ञा (naming word)?', answer: 'किताब', options: ['दौड़ना', 'किताब', 'तेज़'],
          hint: 'Does it name a thing?', misconception: 'किताब names a thing — दौड़ना is an action, तेज़ describes!',
          workedExample: ['Naming = thing/person/place.', 'किताब = book = thing.', 'Sangya!'] },
        { type: 'sort', question: 'Sort: व्यक्ति (person) vs वस्तु (thing)!', options: [],
          sortItems: [
            { id: 'sg1', label: 'राम', emoji: '👦', correctBin: 'person' },
            { id: 'sg2', label: 'किताब', emoji: '📖', correctBin: 'thing' },
            { id: 'sg3', label: 'माँ', emoji: '👩', correctBin: 'person' },
            { id: 'sg4', label: 'कुर्सी', emoji: '🪑', correctBin: 'thing' },
          ],
          bins: [ { id: 'person', label: 'व्यक्ति 👦', color: '#3b82f6' }, { id: 'thing', label: 'वस्तु 📖', color: '#f59e0b' } ],
          hint: 'Person or thing?',
          misconception: 'राम, माँ = people. किताब, कुर्सी = things!',
          workedExample: ['राम, माँ → person.', 'किताब, कुर्सी → thing.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'संज्ञा स्टार! ⭐', tryAgainLine: 'नाम बताओ!',
};

export const class3LanguageSims: SimDef[] = [
    c3EngTense, c3EngArticles, c3HinVakya, c3HinSangya,
];
