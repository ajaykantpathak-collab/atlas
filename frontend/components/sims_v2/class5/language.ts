/**
 * Class 5 sims — Language (English + Hindi).
 * English (Marigold-5): degrees of comparison, active/passive intro,
 * reported speech intro, letter writing. Hindi (Rimjhim-5):
 * kriya (verbs), sarvanaam (pronouns), paryayvachi (synonyms), muhavare (idioms).
 */
import type { SimDef } from '../engine/types';

export const c5EngDegrees: SimDef = {
    id: 'c5_eng_degrees', title: 'Big, Bigger, Biggest', subtitle: 'Degrees of comparison!',
    classLevel: 5, subject: 'english', topic: 'Degrees of Comparison',
    chapters: ['Marigold-5: degrees of comparison'],
    emoji: '📏', theme: { bg: 'from-blue-100 to-indigo-200', accent: 'blue', scene: 'degrees' },
    scenario: { role: "a comparison-expert", intro: "Big, bigger, biggest — degrees of comparison!", goal: "Compare correctly." },
    discovery: {
        question: "Is 'most big' correct - or do we say 'biggest'?",
        options: ["Biggest - -est for the most!", "Most big", "Both work"],
        answer: "Biggest - -est for the most!",
        hook: "Degrees of comparison: big, bigger, biggest! Let's learn.",
    },
    teaching: [
        { title: 'Three Degrees! 📏', text: 'Positive (tall), Comparative (taller), Superlative (tallest). Comparing one, two, or all!', emoji: '📏', bgColor: 'from-blue-400 to-indigo-500' },
        { title: 'Add -er and -est ➕', text: 'Most words: tall → taller → tallest. Some change: good → better → best!', emoji: '➕', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'More and Most 🌟', text: 'Long words use more/most: beautiful → more beautiful → most beautiful!', emoji: '🌟', bgColor: 'from-amber-400 to-orange-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'Tall → taller → ?', answer: 'tallest', options: ['more tall', 'tallest', 'tallester'],
          hint: 'Superlative adds -est!', misconception: 'The superlative adds -est: tall → taller → tallest!',
          workedExample: ['Positive: tall.', 'Comparative: taller.', 'Superlative: tallest.'] },
        { type: 'mcq', question: 'Good → ? → best', answer: 'better', options: ['gooder', 'better', 'goodest'],
          hint: 'Good is irregular!', misconception: 'Good is irregular: good → better → best!',
          workedExample: ['Good changes.', 'better → best.'] },
        { type: 'mcq', question: '"Beautiful" becomes superlative as...', answer: 'most beautiful', options: ['beautifulest', 'most beautiful', 'more beautiful'],
          hint: 'Long word uses most!', misconception: 'Long words use most: most beautiful — not beautifulest!',
          workedExample: ['Long word.', 'Use most.', 'Most beautiful.'] },
        { type: 'mcq', question: 'Comparing two things uses the ___ degree.', answer: 'comparative (-er)', options: ['positive', 'comparative (-er)', 'superlative (-est)'],
          hint: 'Two things = -er!', misconception: 'Comparing two = comparative: taller. Comparing all = superlative: tallest!',
          workedExample: ['Two things → -er.', 'Comparative.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Comparison star! ⭐', tryAgainLine: '-er for two, -est for all!',
};

export const c5EngVoice: SimDef = {
    id: 'c5_eng_voice', title: 'Who Does It?', subtitle: 'Active and passive!',
    classLevel: 5, subject: 'english', topic: 'Active/Passive Voice',
    chapters: ['Marigold-5: active passive intro'],
    emoji: '🎭', theme: { bg: 'from-violet-100 to-purple-200', accent: 'violet', scene: 'voice' },
    scenario: { role: "a voice-switcher", intro: "Active and passive — who leads the action?", goal: "Switch voice correctly." },
    discovery: {
        question: "'The cat chased the mouse' vs 'the mouse was chased' - same action, different order?",
        options: ["Yes - who leads changes it!", "Same exactly", "No difference"],
        answer: "Yes - who leads changes it!",
        hook: "Active puts the doer first, passive the receiver! Let's learn.",
    },
    teaching: [
        { title: 'Who Does It? 🎭', text: 'Active: "The cat chased the mouse" — the cat DOES the action. Passive: "The mouse was chased" — it RECEIVES it!', emoji: '🎭', bgColor: 'from-violet-400 to-purple-500' },
        { title: 'Active = Doer First 1️⃣', text: 'In active voice, the doer comes first: "Riya baked a cake." Riya is doing!', emoji: '1️⃣', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Passive = Receiver First 2️⃣', text: 'In passive, the receiver comes first: "The cake was baked by Riya." The cake receives!', emoji: '2️⃣', bgColor: 'from-emerald-400 to-teal-500' },
    ],
    challenges: [
        { type: 'mcq', question: '"The cat chased the mouse." Who does the action?', answer: 'The cat', options: ['The mouse', 'The cat', 'No one'],
          hint: 'Who is chasing?', misconception: 'Active voice — the cat (first) does the chasing!',
          workedExample: ['Doer comes first.', 'The cat chases.'] },
        { type: 'mcq', question: '"The cake was baked by Riya." This is...', answer: 'Passive voice', options: ['Active', 'Passive voice', 'Not a sentence'],
          hint: 'Receiver comes first!', misconception: 'Passive — the cake (receiver) comes first, "was baked by Riya"!',
          workedExample: ['Cake first = receiver.', 'Was baked by.', 'Passive.'] },
        { type: 'mcq', question: 'Make it active: "The ball was kicked by Ram."', answer: 'Ram kicked the ball', options: ['The ball kicked Ram', 'Ram kicked the ball', 'The ball was kicked'],
          hint: 'Put the doer first!', misconception: 'Active = doer first: "Ram kicked the ball"!',
          workedExample: ['Doer = Ram.', 'Put first.', 'Ram kicked the ball.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Voice star! ⭐', tryAgainLine: 'Doer first = active!',
};

export const c5HinKriya: SimDef = {
    id: 'c5_hin_kriya', title: 'क्रिया — Action Words', subtitle: 'करने वाले शब्द!',
    classLevel: 5, subject: 'hindi', topic: 'Kriya (Verbs)',
    chapters: ['Rimjhim-5: kriya'],
    emoji: 'क्रि', theme: { bg: 'from-emerald-100 to-teal-200', accent: 'emerald', scene: 'kriya' },
    scenario: { role: "a kriya-finder", intro: "Action words — find every verb!", goal: "Spot every kriya." },
    discovery: {
        question: "Is 'daudna' a naming word or an action word?",
        options: ["Action word - kriya!", "Naming", "Describing"],
        answer: "Action word - kriya!",
        hook: "Kriya shows action! Let's find the doing words.",
    },
    teaching: [
        { title: 'क्रिया = काम का शब्द 🏃', text: 'Kriya = action words! दौड़ना (run), खाना (eat), पढ़ना (read) — words that show action!', emoji: '🏃', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'क्रिया बदलती है ⏳', text: 'Verbs change with time: खाता है (eats), खाया (ate), खाएगा (will eat) — kaal changes kriya!', emoji: '⏳', bgColor: 'from-sky-400 to-blue-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'Which is a क्रिया (action word)?', answer: 'दौड़ना', options: ['दौड़ना', 'लाल', 'घर'],
          hint: 'Which shows an action?', misconception: 'दौड़ना (to run) is an action — क्रिया!',
          workedExample: ['Action word = kriya.', 'दौड़ना = run.'] },
        { type: 'mcq', question: '"वह खेलता है" में क्रिया कौन सी है?', answer: 'खेलता है', options: ['वह', 'खेलता है', 'कोई नहीं'],
          hint: 'What is he doing?', misconception: 'खेलता है is the action — the क्रिया!',
          workedExample: ['वह = who.', 'खेलता है = action.', 'क्रिया.'] },
        { type: 'mcq', question: 'Past tense of "खाता है" is...', answer: 'खाया', options: ['खाएगा', 'खाया', 'खाता है'],
          hint: 'Already done!', misconception: 'खाया = ate (past). खाएगा = will eat (future)!',
          workedExample: ['Past = done.', 'खाता → खाया.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'क्रिया स्टार! ⭐', tryAgainLine: 'काम का शब्द ढूंढो!',
};

export const c5HinParyay: SimDef = {
    id: 'c5_hin_paryay', title: 'पर्यायवाची — Same Words', subtitle: 'एक ही अर्थ!',
    classLevel: 5, subject: 'hindi', topic: 'Paryayvachi (Synonyms)',
    chapters: ['Rimjhim-5: paryayvachi'],
    emoji: '🔀', theme: { bg: 'from-amber-100 to-orange-200', accent: 'amber', scene: 'paryay' },
    scenario: { role: "a paryay-expert", intro: "Synonyms — words meaning the same!", goal: "Find every paryay." },
    discovery: {
        question: "Are 'aasman' and 'gagan' different words or the same?",
        options: ["Same - synonyms!", "Different", "Opposite"],
        answer: "Same - synonyms!",
        hook: "Paryayvachi = words meaning the same! Let's learn.",
    },
    teaching: [
        { title: 'पर्यायवाची = समान अर्थ 🔀', text: 'Synonyms mean the same: आसमान = अम्बर = गगन (all mean sky)!', emoji: '🔀', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Many Words, One Meaning 🌊', text: 'जल = पानी = नीर (water). सूर्य = रवि = भानु (sun). Same thing, many names!', emoji: '🌊', bgColor: 'from-sky-400 to-blue-500' },
    ],
    challenges: [
        { type: 'mcq', question: 'पानी का पर्यायवाची (synonym) है...', answer: 'जल', options: ['अग्नि', 'जल', 'वायु'],
          hint: 'Another word for water!', misconception: 'जल, नीर are synonyms of पानी — all mean water!',
          workedExample: ['पानी = water.', 'जल = same.', 'Synonym.'] },
        { type: 'mcq', question: 'सूर्य का पर्यायवाची है...', answer: 'रवि', options: ['चंद्र', 'रवि', 'तारा'],
          hint: 'Another name for the sun!', misconception: 'रवि, भानु are synonyms of सूर्य — all mean sun!',
          workedExample: ['सूर्य = sun.', 'रवि = same.'] },
        { type: 'mcq', question: 'आसमान का पर्यायवाची है...', answer: 'गगन', options: ['धरती', 'गगन', 'सागर'],
          hint: 'Another word for sky!', misconception: 'गगन, अम्बर are synonyms of आसमान — all mean sky!',
          workedExample: ['आसमान = sky.', 'गगन = same.'] },
        { type: 'mcq', question: 'Synonyms are words that...', answer: 'Mean the same thing', options: ['Mean the same thing', 'Mean opposites', 'Are always long'],
          hint: 'Same meaning!', misconception: 'पर्यायवाची = same meaning words — not opposites!',
          workedExample: ['पर्यायवाची = same meaning.', 'Not opposites.'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'पर्यायवाची स्टार! ⭐', tryAgainLine: 'Same meaning?',
};

export const c5EngLetter: SimDef = {
    id: 'c5_eng_letter', title: 'Write a Letter', subtitle: 'Dear friend...',
    classLevel: 5, subject: 'english', topic: 'Letter Writing',
    chapters: ['Marigold-5: letter writing'],
    emoji: '✉️', theme: { bg: 'from-sky-100 to-cyan-200', accent: 'sky', scene: 'letter' },
    scenario: { role: "a letter-writer", intro: "A friendly letter connects hearts!", goal: "Write a great letter." },
    discovery: {
        question: "Can a letter make a friend feel loved from far away?",
        options: ["Yes - words carry feelings!", "No only calls", "Letters are old"],
        answer: "Yes - words carry feelings!",
        hook: "A friendly letter has greeting, body, closing! Let's write one.",
    },
    teaching: [
        { title: 'A Letter Has Parts! ✉️', text: 'A friendly letter has: greeting (Dear...), body (your message), and closing (Yours lovingly)!', emoji: '✉️', bgColor: 'from-sky-400 to-cyan-500' },
        { title: 'Start with Dear 💌', text: 'Begin with a greeting: "Dear Riya," — then write your news and questions!', emoji: '💌', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'End with Love ❤️', text: 'Close with "Yours lovingly" or "Your friend" and your name!', emoji: '❤️', bgColor: 'from-rose-400 to-pink-500' },
    ],
    challenges: [
        { type: 'order', question: 'Put the letter parts in order!', options: [],
          sortItems: [
            { id: 'L1', label: 'Yours lovingly, Riya', emoji: '❤️', correctBin: 's3' },
            { id: 'L2', label: 'Dear Rahul,', emoji: '💌', correctBin: 's1' },
            { id: 'L3', label: 'How are you? I am fine.', emoji: '📝', correctBin: 's2' },
          ],
          bins: [ { id: 's1', label: '1st', color: '#10b981' }, { id: 's2', label: '2nd', color: '#3b82f6' },
                  { id: 's3', label: '3rd', color: '#ec4899' } ],
          hint: 'Greeting, body, closing!',
          misconception: 'Letter order: greeting (Dear) → body → closing (Yours lovingly)!',
          workedExample: ['Greeting first.', 'Body next.', 'Closing last.'] },
        { type: 'mcq', question: 'A friendly letter starts with...', answer: 'Dear ___', options: ['To whom it may concern', 'Dear ___', 'The end'],
          hint: 'Warm greeting!', misconception: 'Friendly letters start with "Dear [name]" — warm and personal!',
          workedExample: ['Greeting first.', '"Dear Rahul,".'] },
        { type: 'mcq', question: 'The closing of a friendly letter could be...', answer: 'Yours lovingly', options: ['Yours lovingly', 'Dear Sir', 'The End'],
          hint: 'Warm goodbye!', misconception: '"Yours lovingly" closes a friendly letter — "Dear" is the start!',
          workedExample: ['Closing = end.', '"Yours lovingly."'] },
    ],
    reflect: { prompts: ['What surprised you?', 'Tell a friend one thing you learned!'] },
    successLine: 'Letter writer! ⭐', tryAgainLine: 'Dear, body, closing!',
};

export const class5LanguageSims: SimDef[] = [
    c5EngDegrees, c5EngVoice, c5EngLetter,
    c5HinKriya, c5HinParyay,
];
