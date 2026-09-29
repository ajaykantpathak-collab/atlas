/**
 * Class 1 NIPUN extension sims — matras + sentence building.
 * Fills: Hindi matra strand, English writing strand (sentence construction).
 */
import type { SimDef } from '../engine/types';

// ═══ Hindi Matras ═════════════════════════════════════════════
export const c1HinMatra: SimDef = {
    id: 'c1_hin_matra', title: 'मात्राएँ', subtitle: 'आ, ई, उ की मात्रा!',
    classLevel: 1, subject: 'hindi', topic: 'Hindi Matras',
    chapters: ['Rimjhim-1: matra words'],
    emoji: '🪔', theme: { bg: 'from-orange-100 to-amber-200', accent: 'orange', scene: 'letters' },
    scenario: { role: "a matra-magician", intro: "Vyanjan letters wear matra-hats! ा makes 'aa', ी makes 'ee'.", goal: "Match every matra to its sound." },
    discovery: {
        question: "क + ा = ? Say it aloud!",
        options: ["का", "की", "कु"],
        answer: "का",
        hook: "ा joins क to make का — like कमल!",
    },
    teaching: [
        { title: 'मात्रा क्या है? 🪔', text: 'Vyanjan + matra = new sound! क alone says "k". Add a matra and it sings — का, की, कु!', emoji: '🪔', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'ा = आ की आवाज़ 🟢', text: 'ा after a letter says "aa". क+ा=का (kamal), म+ा=मा (maa), न+ा=ना!', emoji: '🟢', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'ी = ई की आवाज़ 🔵', text: 'ी after a letter says "ee". र+ी=री, क+ी=की (kee), च+ी=ची!', emoji: '🔵', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'ु = उ की आवाज़ 🟡', text: 'ु sits UNDER the letter and says "u". म+ु=मु, स+ु=सु!', emoji: '🟡', bgColor: 'from-yellow-400 to-amber-500' },
        { title: 'मात्रा से शब्द 📖', text: 'क+ा=का, म+ा=मा — ka-maa = काम (kaam)! Matras build real words!', emoji: '📖', bgColor: 'from-gold-400 to-purple-500' },
    ],
    explore: { widget: 'match', prompt: 'Match each letter-matra to its word!', labels: ['का', 'कमल', 'की', 'कीट', 'कु', 'कुटिया'] },
    challenges: [
        { type: 'mcq', question: 'क + ा = ?', answer: 'का', options: ['की', 'का', 'कु'],
          hint: 'ा says "aa"!', misconception: 'ा = "aa" — क+ा = का, like कमल!',
          workedExample: ['क says "k".', 'ा says "aa".', 'Together: का.'] },
        { type: 'mcq', question: 'Which word uses the ी matra?', answer: 'कीट', options: ['कमल', 'कीट', 'कुटिया'],
          hint: 'ी says "ee" — kee-t!', misconception: 'कीट (keet) has ी; कमल has ा, कुटिया has ु!',
          workedExample: ['Listen for "ee".', 'की = kee.', 'कीट has ी.'] },
        { type: 'mcq', question: 'म + ु = ?', answer: 'मु', options: ['मा', 'मी', 'मु'],
          hint: 'ु sits under and says "u"!', misconception: 'ु = "u" — म+ु = मु, the first sound of मुर्गा!',
          workedExample: ['म says "m".', 'ु says "u".', 'Together: मु.'] },
        { type: 'mcq', question: '"बाल" — which matra is inside?', answer: 'ा', options: ['ी', 'ु', 'ा'],
          hint: 'baal — hear the "aa"!', misconception: 'बाल = ब+ा+ल — the ा matra makes "aa"!',
          workedExample: ['ब+ा = बा.', 'बा+ल = बाल.', 'Matra = ा.'] },
        { type: 'mcq', question: 'Which letter-matra makes "keelaa"?', answer: 'कीला', options: ['काला', 'कीला', 'कुला'],
          hint: '"ee" needs ी!', misconception: 'कीला = क+ी+ल+ा — ी gives "kee"!',
          workedExample: ['"kee" needs ी.', 'क+ी=की.', 'कीला.'] },
        { type: 'mcq', question: 'सूरज has which matras?', answer: 'ू', options: ['ा', 'ी', 'ू'],
          hint: 'soo-raj — long "oo"!', misconception: 'सूरज = स+ू+र+ज — ू makes the long "oo"!',
          workedExample: ['स+ू = सू.', 'Long "oo" = ू.'] },
        { type: 'interact', question: 'Match the matra-words!', options: [],
          interactGoal: { instruction: 'Match each word to its matra sound', widget: 'match', validate: 'match:correct=3', labels: ['का', 'aa sound', 'की', 'ee sound', 'कु', 'u sound'] },
          hint: 'Listen to each sound!', misconception: 'Each matra has ONE sound — ा="aa", ी="ee", ु="u"!',
          workedExample: ['का = aa.', 'की = ee.', 'कु = u.'] },
    ],
    reflect: { prompts: ['Which matra sounds funniest?', 'Say three words with ा!'] },
    successLine: 'मात्रा-मास्टर! 🪔', tryAgainLine: 'मात्रा की आवाज़ सुनो!',
};

// ═══ English Sentence Building ════════════════════════════════
export const c1EngSentences: SimDef = {
    id: 'c1_eng_sentences', title: 'Sentence Builders', subtitle: 'Who + Doing = Sentence!',
    classLevel: 1, subject: 'english', topic: 'Sentence Construction',
    chapters: ['Marigold-1: sentence reading'],
    emoji: '🏗️', theme: { bg: 'from-gold-100 to-gold-200', accent: 'sky', scene: 'letters' },
    scenario: { role: "a sentence-builder", intro: "A sentence needs a WHO and a DOING. Build them right!", goal: "Build perfect sentences." },
    discovery: {
        question: "'The cat sleeps.' — Who is doing something here?",
        options: ["The cat", "sleeps", "The"],
        answer: "The cat",
        hook: "The cat is the WHO — the one doing the action!",
    },
    teaching: [
        { title: 'Two Parts! 🏗️', text: 'Every sentence has WHO (a naming part) and DOING (an action). "The dog runs." — Dog = who, runs = doing!', emoji: '🏗️', bgColor: 'from-gold-400 to-gold-500' },
        { title: 'Capital + Full Stop! 🔤', text: 'Sentences wear a capital letter hat at the start and a full stop at the end: "Birds fly."', emoji: '🔤', bgColor: 'from-emerald-400 to-teal-500' },
        { title: 'Order Matters! 🔀', text: '"Cat the sleeps" is scrambled! Right order: "The cat sleeps."', emoji: '🔀', bgColor: 'from-amber-400 to-orange-500' },
        { title: 'Naming Words First 📛', text: 'Sentences usually start with the naming word — the person, animal, or thing!', emoji: '📛', bgColor: 'from-gold-400 to-purple-500' },
    ],
    explore: { widget: 'order', prompt: 'Tap the words in order to build a sentence!', labels: ['The', 'bird', 'sings', 'in', 'the', 'tree'] },
    challenges: [
        { type: 'mcq', question: '"The boy jumps." — Who is doing the action?', answer: 'The boy', options: ['The boy', 'jumps', 'The'],
          hint: 'WHO is jumping?', misconception: '"The boy" is the WHO — the one doing the jumping!',
          workedExample: ['Find the action: jumps.', 'Who jumps? The boy.'] },
        { type: 'mcq', question: '"Fish swim." — What is the DOING part?', answer: 'swim', options: ['Fish', 'swim', 'sw'],
          hint: 'The action word!', misconception: '"swim" is the doing — what the fish does!',
          workedExample: ['Who? Fish.', 'Does what? swim.'] },
        { type: 'mcq', question: 'Which is a proper sentence?', answer: 'The dog runs.', options: ['dog runs the', 'The dog runs.', 'runs dog'],
          hint: 'Capital at start, full stop at end!', misconception: '"The dog runs." — capital T, full stop, right order!',
          workedExample: ['Check capital: T ✓.', 'Check order: dog+runs ✓.', 'Check full stop ✓.'] },
        { type: 'mcq', question: 'Unscramble: "is My name Ria"', answer: 'My name is Ria.', options: ['is My Ria name', 'My name is Ria.', 'Ria name My is'],
          hint: 'Start with "My name"!', misconception: '"My name is Ria." — the naming part comes first!',
          workedExample: ['"My name" = who.', '"is Ria" completes it.'] },
        { type: 'mcq', question: 'Which word starts a sentence?', answer: 'The', options: ['the', 'The', 'THE.'],
          hint: 'Capital letter at the start!', misconception: '"The" — sentences start with a capital letter, not all-caps!',
          workedExample: ['Capital first letter.', 'Rest lowercase.', 'The.'] },
        { type: 'mcq', question: '"Birds ___." — finish it!', answer: 'fly', options: ['fly', 'the', 'is a'],
          hint: 'What do birds DO?', misconception: '"fly" is the doing word — sentences need an action!',
          workedExample: ['Birds = who.', 'Needs doing.', 'fly!'] },
        { type: 'interact', question: 'Build: "The sun is hot." Order the words!', options: [],
          interactGoal: { instruction: 'Tap words in order: The sun is', widget: 'order', validate: 'order:correct=3', labels: ['The', 'sun', 'is', 'hot'] },
          hint: '"The sun" is the who!', misconception: 'Start with the naming part — "The sun" then "is hot"!',
          workedExample: ['"The" first.', '"sun" next.', '"is" third.'] },
    ],
    reflect: { prompts: ['What two parts does a sentence need?', 'Say a sentence about yourself!'] },
    successLine: 'Sentence star! 🏗️', tryAgainLine: 'Who + doing!',
};

export const class1NipunSims: SimDef[] = [c1HinMatra, c1EngSentences];
