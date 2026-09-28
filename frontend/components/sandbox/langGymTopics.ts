/**
 * langGymTopics.ts — class-wise picker data + curated closed-world drill
 * packs for the Language Gym sandbox (English + Hindi, classes 6-10).
 *
 * CLOSED-WORLD RULE (same as MathsSandbox/mathsTopics.ts): every string in
 * this file is authored corpus content transcribed VERBATIM from
 * deploy/content/cisce_nodes_v2/c*_eng_icse_*.md and c*_hin_icse_*.md —
 * English wrong-answer clauses keep the corpus shape
 *   A wrong answer (e.g., "…") reveals the misconception that …
 * and Hindi keeps the authored Devanagari clause shape
 *   गलत उत्तर (जैसे — "…") से … की गलती प्रकट होती है
 * Nothing is generated, paraphrased or machine-transliterated.
 *
 * `nodeId` points at the authored corpus node: at runtime the gym pulls the
 * node's full diagnostic set + common misconception through
 * components/learn/remediation.ts (fetchNodeRemediation / fetchEnrichment).
 * When the API is unreachable the bundled verbatim clauses above still
 * teach the authored trap; anything the corpus lacks renders nothing
 * (honest degradation — never invented text).
 *
 * Class coverage mirrors the corpus: the icse language corpus holds
 * classes 6-10 for both English and Hindi (11-12 language nodes do not
 * exist yet), so those bands simply do not appear here.
 */

export type LangSubject = 'en' | 'hi'

export interface LangTopic {
  key: string
  label: string
  /** Authored corpus node for enrichment-driven diagnostics. */
  nodeId?: string
}

export interface LangChapter {
  key: string
  label: string
  topics: LangTopic[]
}

export interface LangClassBand {
  key: string
  label: string
  subject: LangSubject
  chapters: LangChapter[]
}

const t = (key: string, label: string, nodeId?: string): LangTopic =>
  ({ key, label, nodeId })

export const LANGYM_CLASSES: LangClassBand[] = [
  // ------------------------------------------------------------- English --
  {
    key: 'en6', label: 'Class 6 · English', subject: 'en',
    chapters: [
      {
        key: 'en6_spoken', label: 'Speaking: Group Discussion',
        topics: [t('en6_gd', 'Group discussion', 'c6_eng_icse_01_001')],
      },
      {
        key: 'en6_read', label: 'Reading: Graded Stories',
        topics: [t('en6_gr', 'Graded reading', 'c6_eng_icse_02_001')],
      },
      {
        key: 'en6_write', label: 'Writing: The Process Approach',
        topics: [t('en6_wp', 'Writing process', 'c6_eng_icse_03_001')],
      },
      {
        key: 'en6_gram', label: 'Grammar in Context',
        topics: [t('en6_gc', 'Grammar in context', 'c6_eng_icse_04_001')],
      },
    ],
  },
  {
    key: 'en7', label: 'Class 7 · English', subject: 'en',
    chapters: [
      {
        key: 'en7_listen', label: 'Listening & Viewing',
        topics: [t('en7_l', 'Listening comprehension', 'c7_eng_icse_01_001')],
      },
      {
        key: 'en7_read', label: 'Reading Comprehension',
        topics: [t('en7_r', 'Reading strategies', 'c7_eng_icse_02_001')],
      },
      {
        key: 'en7_creative', label: 'Creative Composition',
        topics: [t('en7_c', 'Creative composition', 'c7_eng_icse_03_001')],
      },
      {
        key: 'en7_gram', label: 'Grammar & Vocabulary',
        topics: [t('en7_g', 'Grammar in context', 'c7_eng_icse_04_001')],
      },
    ],
  },
  {
    key: 'en8', label: 'Class 8 · English', subject: 'en',
    chapters: [
      {
        key: 'en8_present', label: 'Presentation: Social Issues',
        topics: [t('en8_p', 'Social-issue presentation', 'c8_eng_icse_01_001')],
      },
      {
        key: 'en8_eval', label: 'Critical Evaluation',
        topics: [t('en8_e', 'Evaluating texts', 'c8_eng_icse_02_001')],
      },
      {
        key: 'en8_para', label: 'Paragraph Writing',
        topics: [t('en8_pw', 'The paragraph', 'c8_eng_icse_03_001')],
      },
      {
        key: 'en8_gram', label: 'Grammar & Vocabulary',
        topics: [t('en8_g', 'Grammar in context', 'c8_eng_icse_04_001')],
      },
    ],
  },
  {
    key: 'en9', label: 'Class 9 · English', subject: 'en',
    chapters: [
      {
        key: 'en9_comp', label: 'Composition (300-350 words)',
        topics: [
          t('en9_c1', 'Essay template', 'c9_eng_icse_01_001'),
          t('en9_c2', 'Register', 'c9_eng_icse_01_002'),
        ],
      },
      {
        key: 'en9_letter', label: 'Letters',
        topics: [
          t('en9_l1', 'Letter skeleton', 'c9_eng_icse_02_001'),
          t('en9_l2', 'Formal vs informal register', 'c9_eng_icse_02_002'),
        ],
      },
      {
        key: 'en9_ne', label: 'Notice & E-mail',
        topics: [
          t('en9_n', 'Notice format', 'c9_eng_icse_03_002'),
          t('en9_e', 'E-mail format', 'c9_eng_icse_03_003'),
        ],
      },
      {
        key: 'en9_unseen', label: 'Unseen Prose',
        topics: [
          t('en9_u', 'Prose blueprint', 'c9_eng_icse_04_001'),
          t('en9_u2', 'Answering rules', 'c9_eng_icse_04_002'),
        ],
      },
      {
        key: 'en9_gram', label: 'Functional Grammar',
        topics: [
          t('en9_g1', 'Sentence patterns SV-SVO', 'c9_eng_icse_05_001'),
          t('en9_g2', 'Register choices', 'c9_eng_icse_05_002'),
          t('en9_g3', 'Prepositions & conjunctions', 'c9_eng_icse_05_003'),
          t('en9_g4', 'Four pillars integration', 'c9_eng_icse_05_004'),
        ],
      },
      {
        key: 'en9_jc', label: 'Julius Caesar (Acts I-II)',
        topics: [
          t('en9_jcq', 'Key quotations (RCT)', 'c9_eng_icse_06_007'),
          t('en9_jcp', 'Plot: Acts I-II', 'c9_eng_icse_06_002'),
          t('en9_jcb', 'Background', 'c9_eng_icse_06_001'),
          t('en9_jcc', 'Characters', 'c9_eng_icse_06_004'),
          t('en9_jct', 'Themes', 'c9_eng_icse_06_005'),
        ],
      },
      {
        key: 'en9_bonku', label: "Bonku Babu's Friend",
        topics: [t('en9_bb', 'Satyajit Ray: the story', 'c9_eng_icse_07_001')],
      },
      {
        key: 'en9_oliver', label: 'Oliver (Dickens)',
        topics: [t('en9_ol', 'Dickens: Oliver', 'c9_eng_icse_08_001')],
      },
      {
        key: 'en9_prose', label: 'Prose: Wilde · Tagore · Bond',
        topics: [
          t('en9_w', 'Oscar Wilde', 'c9_eng_icse_09_001'),
          t('en9_t', 'Rabindranath Tagore', 'c9_eng_icse_10_001'),
          t('en9_rb', 'Ruskin Bond', 'c9_eng_icse_11_001'),
        ],
      },
      {
        key: 'en9_poems', label: 'Poetry: Auden · Eliot · Hood · Piercy',
        topics: [
          t('en9_a', 'W. H. Auden', 'c9_eng_icse_12_001'),
          t('en9_el', 'T. S. Eliot', 'c9_eng_icse_13_001'),
          t('en9_h', 'Thomas Hood', 'c9_eng_icse_14_001'),
          t('en9_mp', 'Marge Piercy', 'c9_eng_icse_16_001'),
        ],
      },
    ],
  },
  {
    key: 'en10', label: 'Class 10 · English', subject: 'en',
    chapters: [
      {
        key: 'en10_comp', label: 'Composition',
        topics: [t('en10_c', 'The 500-word essay', 'c10_eng_icse_01_001')],
      },
      {
        key: 'en10_letter', label: 'Letter Writing',
        topics: [t('en10_l', 'ICSE letters', 'c10_eng_icse_02_001')],
      },
      {
        key: 'en10_gram', label: 'Functional Grammar (short answers)',
        topics: [
          t('en10_g1', 'Rule-based items', 'c10_eng_icse_03_003'),
          t('en10_g2', 'Sentence transformation', 'c10_eng_icse_03_004'),
          t('en10_g3', 'Register', 'c10_eng_icse_03_002'),
        ],
      },
      {
        key: 'en10_unseen', label: 'Unseen Comprehension',
        topics: [t('en10_u', 'Prose passage strategy', 'c10_eng_icse_04_001')],
      },
      {
        key: 'en10_jc', label: 'Julius Caesar (Acts III-V)',
        topics: [t('en10_jc', 'Context & background', 'c10_eng_icse_05_001')],
      },
      {
        key: 'en10_prose', label: 'Prose: Leacock · Sleator · Aidoo · Bradbury · Daudet',
        topics: [
          t('en10_le', 'With the Photographer (Leacock)', 'c10_eng_icse_06_001'),
          t('en10_sl', 'William Sleator', 'c10_eng_icse_07_001'),
          t('en10_aa', 'Ama Ata Aidoo', 'c10_eng_icse_08_001'),
          t('en10_br', 'Ray Bradbury', 'c10_eng_icse_09_001'),
          t('en10_da', 'Alphonse Daudet', 'c10_eng_icse_10_001'),
        ],
      },
      {
        key: 'en10_poems', label: 'Poetry: Longfellow · Hunt · Angelou · Frost · S. Ray',
        topics: [
          t('en10_lf', 'Longfellow', 'c10_eng_icse_11_001'),
          t('en10_lh', 'Leigh Hunt', 'c10_eng_icse_12_001'),
          t('en10_ma', 'Maya Angelou', 'c10_eng_icse_13_001'),
          t('en10_rf', 'Robert Frost', 'c10_eng_icse_14_001'),
          t('en10_sr', 'Sukumar Ray', 'c10_eng_icse_15_001'),
        ],
      },
    ],
  },
  // --------------------------------------------------------------- Hindi --
  {
    key: 'hi6', label: 'कक्षा 6 · हिंदी', subject: 'hi',
    chapters: [
      {
        key: 'hi6_suna', label: 'सुनना-बोलना',
        topics: [t('hi6_s', 'सुनना और बोलना', 'c6_hin_icse_01_001')],
      },
      {
        key: 'hi6_pathan', label: 'पठन',
        topics: [t('hi6_p', 'पठन-कौशल', 'c6_hin_icse_02_001')],
      },
      {
        key: 'hi6_vyak', label: 'व्याकरण: संज्ञा',
        topics: [t('hi6_v', 'संज्ञा-परिचय', 'c6_hin_icse_03_001')],
      },
    ],
  },
  {
    key: 'hi7', label: 'कक्षा 7 · हिंदी', subject: 'hi',
    chapters: [
      {
        key: 'hi7_suna', label: 'सुनना-बोलना',
        topics: [
          t('hi7_s1', 'कहानी सुनना-सुनाना', 'c7_hin_icse_01_001'),
          t('hi7_s2', 'संवाद', 'c7_hin_icse_01_003'),
        ],
      },
      {
        key: 'hi7_path', label: 'पढ़ना-लिखना',
        topics: [
          t('hi7_p1', 'पठन-बोध', 'c7_hin_icse_02_001'),
          t('hi7_p2', 'निबंध-लेखन', 'c7_hin_icse_02_003'),
        ],
      },
      {
        key: 'hi7_vyak', label: 'व्याकरण',
        topics: [
          t('hi7_v1', 'पद-भेद और वाक्य-संरचना', 'c7_hin_icse_03_001'),
          t('hi7_v2', 'उपसर्ग-प्रत्यय', 'c7_hin_icse_03_002'),
          t('hi7_v3', 'शब्द-भंडार', 'c7_hin_icse_03_003'),
          t('hi7_v4', 'उपसर्ग और प्रत्यय', 'c7_hin_icse_03_004'),
        ],
      },
    ],
  },
  {
    key: 'hi8', label: 'कक्षा 8 · हिंदी', subject: 'hi',
    chapters: [
      {
        key: 'hi8_suna', label: 'सुनना-बोलना',
        topics: [
          t('hi8_s1', 'श्रवण और वाचन', 'c8_hin_icse_01_001'),
          t('hi8_s2', 'वाद-विवाद', 'c8_hin_icse_01_003'),
        ],
      },
      {
        key: 'hi8_lekhan', label: 'विधा-लेखन',
        topics: [
          t('hi8_l1', 'कहानी', 'c8_hin_icse_02_002'),
          t('hi8_l2', 'निबंध', 'c8_hin_icse_02_004'),
          t('hi8_l3', 'पत्र', 'c8_hin_icse_02_006'),
          t('hi8_l4', 'नोटिस', 'c8_hin_icse_02_008'),
          t('hi8_l5', 'वर्गीकृत विज्ञापन', 'c8_hin_icse_02_011'),
        ],
      },
      {
        key: 'hi8_sahitya', label: 'साहित्य',
        topics: [
          t('hi8_sa1', "'वृद्धा' — प्रेमचंद", 'c8_hin_icse_02_014'),
          t('hi8_sa2', 'साखी — कबीर', 'c8_hin_icse_02_015'),
          t('hi8_sa3', 'पद — मीरा', 'c8_hin_icse_02_016'),
          t('hi8_sa4', 'वर्णन — सूरदास', 'c8_hin_icse_02_017'),
        ],
      },
      {
        key: 'hi8_vyak', label: 'व्याकरण',
        topics: [
          t('hi8_v1', 'शब्द-विचार', 'c8_hin_icse_03_001'),
          t('hi8_v2', 'पद-विचार', 'c8_hin_icse_03_002'),
          t('hi8_v3', 'क्रिया-वाच्य-अव्यय-वाक्य', 'c8_hin_icse_03_003'),
        ],
      },
    ],
  },
  {
    key: 'hi9', label: 'कक्षा 9 · हिंदी', subject: 'hi',
    chapters: [
      {
        key: 'hi9_rachna', label: 'भाषा-खंड (रचनात्मक लेखन)',
        topics: [
          t('hi9_r1', 'रचना-प्रारूप', 'c9_hin_icse_01_001'),
          t('hi9_r2', 'निबंध के प्रकार', 'c9_hin_icse_01_003'),
        ],
      },
      {
        key: 'hi9_patra', label: 'पत्र-लेखन',
        topics: [
          t('hi9_p1', 'औपचारिक पत्र', 'c9_hin_icse_02_002'),
          t('hi9_p2', 'अनौपचारिक पत्र', 'c9_hin_icse_02_003'),
        ],
      },
      {
        key: 'hi9_apathit', label: 'अपठित गद्यांश',
        topics: [t('hi9_a', 'अपठित गद्यांश', 'c9_hin_icse_03_001')],
      },
      {
        key: 'hi9_vyak', label: 'भाषा (व्याकरण और प्रयोग)',
        topics: [
          t('hi9_v1', 'व्याकरण और प्रयोग', 'c9_hin_icse_04_002'),
          t('hi9_v2', 'भाषा की सज्जा-परत', 'c9_hin_icse_04_003'),
        ],
      },
      {
        key: 'hi9_sahitya', label: 'निर्धारित साहित्य',
        topics: [
          t('hi9_sa1', 'काव्य-गद्य विश्लेषण', 'c9_hin_icse_05_004'),
          t('hi9_sa2', 'काव्य-रचना के स्तर', 'c9_hin_icse_05_005'),
        ],
      },
    ],
  },
  {
    key: 'hi10', label: 'कक्षा 10 · हिंदी', subject: 'hi',
    chapters: [
      {
        key: 'hi10_nibandh', label: 'निबंध-रचना',
        topics: [t('hi10_n', 'निबंध प्रारूप', 'c10_hin_icse_01_001')],
      },
      {
        key: 'hi10_patra', label: 'पत्र-लेखन',
        topics: [t('hi10_p', 'पत्र प्रारूप', 'c10_hin_icse_02_001')],
      },
      {
        key: 'hi10_apathit', label: 'अपठित गद्यांश',
        topics: [t('hi10_a', 'बोध-कौशल', 'c10_hin_icse_03_001')],
      },
      {
        key: 'hi10_vyak', label: 'व्याकरण',
        topics: [t('hi10_v', 'व्याकरण कौशल', 'c10_hin_icse_04_001')],
      },
      {
        key: 'hi10_sahitya', label: 'साहित्य',
        topics: [
          t('hi10_s1', "'बात अठन्नी की' — सुदर्शन", 'c10_hin_icse_05_001'),
          t('hi10_s2', "'काकी' — सीयारामशरण गुप्त", 'c10_hin_icse_06_001'),
          t('hi10_s3', "'महायज्ञ का पुरस्कार' — यशपाल", 'c10_hin_icse_07_001'),
          t('hi10_s4', "'नेताजी का चश्मा'", 'c10_hin_icse_08_001'),
        ],
      },
    ],
  },
]

// ------------------------------------------------------- answer helpers --

/** English answer normalisation: case, spacing, terminal punctuation. */
export function normEn(s: string): string {
  return s.toLowerCase().replace(/[.,!?;:'"()]+/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Hindi answer normalisation: danda, spacing, nukta-safe trimming. */
export function normHi(s: string): string {
  return s.replace(/[।.,!?;:'"()\-—]+/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Is `input` an acceptable authored answer? (equal, or contains the key). */
export function accepted(input: string, accept: string[], subject: LangSubject): boolean {
  const norm = subject === 'hi' ? normHi : normEn
  const got = norm(input)
  if (!got) return false
  return accept.some(a => {
    const want = norm(a)
    return got === want || (want.length >= 3 && got.includes(want))
  })
}

// -------------------------------------------------- curated drill packs --

/**
 * One authored grammar drill. MCQ when `options` is non-empty (correct =
 * index into options); typed answer checked against `accept` otherwise.
 */
export interface GrammarDrill {
  q: string
  options: string[]
  correct?: number
  accept?: string[]
  /** Canonical authored answer (short). */
  answer: string
  /** Authored wrong-answer clause, verbatim from the corpus node. */
  wrongClause?: string
}

/**
 * Sentence-assembly puzzle: drag/click `tokens` into `answer` order.
 * `rule` is the authored rule text from the node's walkthrough/diagnostic.
 */
export interface AssemblyPuzzle {
  prompt: string
  tokens: string[]
  answer: string[]
  rule: string
  wrongClause?: string
}

/** Live format-validation field for notice/e-mail/letter/पत्र drafts. */
export interface FormatFieldSpec {
  id: string
  /** Authored requirement (verbatim corpus wording, trimmed). */
  label: string
  /** Regexes — any match satisfies the field. */
  patterns: RegExp[]
  marks: number
}

export interface FormatSpec {
  id: string
  kind: 'notice' | 'email' | 'letter' | 'aupcharik' | 'anaupcharik' | 'notice_hi'
  title: string
  lang: LangSubject
  nodeId: string
  /** The given situation (authored corpus task/example). */
  task: string
  fields: FormatFieldSpec[]
  /** Five-W / पाँच-प्रश्न chips checked live in the body. */
  wChecks?: { id: string; label: string; patterns: RegExp[] }[]
  /** Authored model answer, verbatim from the corpus node. */
  model: string
}

export interface RctItem {
  /** Verified verbatim quotation (play line / पंक्ति). */
  quote: string
  question: string
  /** Keyword accept set for the typed answer (speaker/poet/भाव). */
  accept: string[]
  /** Authored full answer, verbatim or verbatim-joined corpus text. */
  answer: string
  marks: number
  wrongClause?: string
}

export interface VocabItem {
  prompt: string
  accept: string[]
  note: string
  wrongClause?: string
}

// ---- grammar drills (authored diagnostics, transcribed verbatim) ----

export const GRAMMAR_DRILLS: Record<string, GrammarDrill[]> = {
  // c10_eng_icse_03_004 — sentence transformation (passive, narration, degree, negative)
  c10_eng_icse_03_004: [
    {
      q: 'Identify the correct passive voice of "The chef prepares the meal."',
      options: [
        'The meal is prepared by the chef.',
        'The meal is preparing by the chef.',
        'The meal prepares by the chef.',
        'The chef is prepared the meal.',
      ],
      correct: 0,
      answer: 'The meal is prepared by the chef.',
      wrongClause:
        'A wrong answer (e.g., “The meal is preparing by the chef”) reveals the misconception that the continuous form “is preparing” can be used in passive — confusing active continuous with passive construction.',
    },
    {
      q: 'Why does "She said, \u2018I am happy\u2019" become "She said that she was happy" in indirect speech?',
      options: [
        'Pronoun I \u2192 she; tense back-shifts am \u2192 was; "that" inserted',
        'Nothing changes except the quotation marks',
        'Only the tense changes; the pronoun stays "I"',
        'The reporting verb "said" must change to "told"',
      ],
      correct: 0,
      answer: 'Pronoun "I" becomes "she", "am" back-shifts to "was", and "that" is inserted.',
      wrongClause:
        'A wrong answer (e.g., “She said that I am happy”) reveals the misconception that pronouns and tenses remain unchanged in indirect speech — ignoring the perspective shift.',
    },
    {
      q: 'Is the transformation correct: "No other boy is as tall as Aman" \u2192 "Aman is taller than any other boy."?',
      options: [
        'Correct — positive "no other" becomes comparative "taller than any other"',
        'Wrong — it must be the superlative "the tallest boy"',
        'Wrong — "no other" cannot be transformed',
      ],
      correct: 0,
      answer: 'Correct. "Aman is taller than any other boy." preserves the meaning.',
      wrongClause:
        'A wrong answer (e.g., “Aman is the tallest boy”) reveals the misconception that positive degree with “no other” always converts to superlative — but “taller than any other” is comparative, not superlative; superlative would require “the tallest of all”.',
    },
    {
      q: 'Transform into negative without changing meaning: "Everyone liked the movie."',
      options: [],
      accept: ['no one disliked the movie'],
      answer: 'No one disliked the movie.',
      wrongClause:
        'A wrong answer (e.g., “Everyone did not like the movie”) reveals the misconception that simply adding “not” after the subject yields a correct negative — this changes meaning to “Not everyone liked”, which is not equivalent.',
    },
  ],
  // c9_eng_icse_03_003 — e-mail format logic
  c9_eng_icse_03_003: [
    {
      q: 'Why is the subject line placed before the salutation in a formal email?',
      options: [
        'It lets the recipient grasp the email\u2019s intent at a glance before opening',
        'Because the salutation is more polite when it comes second',
        'Email software forbids a salutation at the top',
      ],
      correct: 0,
      answer: 'In a digital inbox, the subject is visible without opening the message. Placing it first ensures the reader knows the context before reading the greeting.',
      wrongClause:
        'A wrong answer (e.g., “the salutation comes first because it is more polite”) reveals the misconception that politeness dictates order, overlooking the functional role of the subject line in email systems.',
    },
    {
      q: 'When is "Yours faithfully" used instead of "Yours sincerely"?',
      options: [
        'When the recipient\u2019s name is unknown (e.g., "Dear Principal,")',
        'When the recipient\u2019s name is known (e.g., "Dear Mr. Sharma,")',
        'They are interchangeable',
      ],
      correct: 0,
      answer: '"Yours faithfully" — name unknown / title only; "Yours sincerely" — name known.',
      wrongClause:
        'A wrong answer (e.g., “they are interchangeable”) reveals the misconception that complimentary closes are merely decorative, not rule‑governed.',
    },
  ],
  // c7_hin_icse_03_001 — पद-भेद (authored निशानी-उदाहरण)
  c7_hin_icse_03_001: [
    {
      q: '"धीरे-धीरे" और "कल" कौन-से पद-भेद की पहचान-निशानी (' + "\u2018कब/कहाँ/कैसे\u2019" + ') के उदाहरण हैं?',
      options: ['क्रिया-विशेषण', 'विशेषण', 'क्रिया', 'सर्वनाम'],
      correct: 0,
      answer: 'क्रिया-विशेषण — क्रिया की विशेषता बताता है; निशानी \u2018कब/कहाँ/कैसे\u2019।',
    },
    {
      q: '"राधा बाज़ार गई। वह फल लाई और मुस्कुराई" — "वह" कौन-सा पद-भेद है?',
      options: ['सर्वनाम', 'संज्ञा', 'विशेषण', 'क्रिया'],
      correct: 0,
      answer: 'सर्वनाम — नाम बार-बार आने पर संज्ञा की जगह लेता है। सर्वनाम तभी जगह ले सकता है जब नाम पहले खुल चुका हो।',
    },
  ],
  // c7_hin_icse_03_003 — शब्द-भंडार (मुहावरा-लोकोक्ति भेद)
  c7_hin_icse_03_003: [
    {
      q: '"नाक में दम करना" मुहावरे का अर्थ क्या है?',
      options: ['परेशान करना', 'क्रोध करना', 'चुप रहना', 'मदद करना'],
      correct: 0,
      answer: 'परेशान करना।',
    },
    {
      q: "मुहावरा और लोकोक्ति में दो भेद-बिंदु क्या हैं?",
      options: [
        'रूप — मुहावरा वाक्य का अंश, लोकोक्ति पूर्ण वाक्य-रूप; कथ्य — मुहावरे में एक भाव/क्रिया, लोकोक्ति में पूरी नीति-बात',
        'सिर्फ़ लंबाई का फ़र्क़ — लोकोक्ति बड़ा मुहावरा है',
        'मुहावरा संस्कृतनिष्ठ होता है, लोकोक्ति विदेशी',
      ],
      correct: 0,
      answer: 'रूप और कथ्य का भेद — मुहावरा वाक्य का अंश (\u2018आँखों का तारा होना\u2019), लोकोक्ति पूर्ण वाक्य-रूप (\u2018अंधों में काना राजा\u2019)।',
      wrongClause:
        'गलत उत्तर (जैसे — "मुहावरा छोटी लोकोक्ति है और लोकोक्ति बड़ा मुहावरा — फ़र्क़ सिर्फ़ लंबाई का है") से \'आकार-माप को कथ्य-भेद मान लेने\' की गलती प्रकट होती है — इसमें शब्द-संख्या की तराज़ू से रूप और कथ्य दोनों भेद तौल लिए गए; कुछ मुहावरे लोकोक्तियों से लंबे भी होते हैं — निर्णायक यह है कि कथन वाक्य-अंग है (मुहावरा) या पूर्ण जन-नीति (लोकोक्ति); लंबाई उस निर्णय में सिर्फ़ सहायक संकेत है, निर्णायक नहीं।',
    },
  ],
  // c9_hin_icse_02_002 — औपचारिक पत्र प्रारूप-क्रम
  c9_hin_icse_02_002: [
    {
      q: 'औपचारिक पत्र में "सेवा में, प्रधानाचार्य महोदय" वाली पंक्ति प्रारूप-क्रम का कौन-सा चरण है?',
      options: ['प्राप्तकर्ता का नाम/पद और पता', 'विषय-पंक्ति', 'आभार-पंक्ति', 'प्रेषक का पता'],
      correct: 0,
      answer: 'प्राप्तकर्ता का नाम/पद और पता — प्रेषक के पते और दिनांक के बाद आता है।',
    },
    {
      q: 'औपचारिक पत्र का मुख्य संदेश किस पंक्ति से आरंभ होता है?',
      options: ['सविनय निवेदन है कि…', 'सुनो, एक काम बताऊँ…', 'प्रिय मित्र, कैसे हो…'],
      correct: 0,
      answer: '\u2018सविनय निवेदन है कि...\u2019 से आरंभ करके उद्देश्य के क्रमबद्ध वाक्य।',
    },
  ],
}

// ---- sentence-assembly workbench (authored transformations) ----

export const SENTENCE_ASSEMBLY: Record<string, AssemblyPuzzle[]> = {
  c10_eng_icse_03_004: [
    {
      prompt: 'Reported speech re-anchoring: Rahul says, "I scored a century yesterday." Arrange the reported version.',
      tokens: ['Rahul', 'said', 'that', 'he', 'had scored', 'a century', 'the previous day'],
      answer: ['Rahul', 'said', 'that', 'he', 'had scored', 'a century', 'the previous day'],
      rule:
        'Narration transformation shifts the reporting verb, moves pronouns to match the reporter’s perspective, back‑shifts tenses (present → past, past → past perfect), and changes near time/place words to distant ones (now → then, here → there).',
      wrongClause:
        'A wrong answer (e.g., “She said that I am happy”) reveals the misconception that pronouns and tenses remain unchanged in indirect speech — ignoring the perspective shift.',
    },
    {
      prompt: 'Assemble the passive: "The chef prepares the meal."',
      tokens: ['The meal', 'is prepared', 'by the chef'],
      answer: ['The meal', 'is prepared', 'by the chef'],
      rule:
        'To form passive: make object the new subject (“The meal”), use “be” verb matching tense and number (“is”), add past participle of main verb (“prepared”), optionally add “by the chef”.',
      wrongClause:
        'A wrong answer (e.g., “The meal is preparing by the chef”) reveals the misconception that the continuous form “is preparing” can be used in passive — confusing active continuous with passive construction.',
    },
    {
      prompt: 'Assemble the comparative: "No other boy is as tall as Aman."',
      tokens: ['Aman', 'is taller', 'than any other boy'],
      answer: ['Aman', 'is taller', 'than any other boy'],
      rule:
        'make the compared entity (“Aman”) the subject, use comparative adjective “taller”, and follow with “than any other boy”. The meaning “Aman surpasses all other boys in height” is preserved.',
      wrongClause:
        'A wrong answer (e.g., “Aman is the tallest boy”) reveals the misconception that positive degree with “no other” always converts to superlative — but “taller than any other” is comparative, not superlative; superlative would require “the tallest of all”.',
    },
  ],
  c7_hin_icse_03_001: [
    {
      prompt: 'नाम बार-बार आने पर सर्वनाम-प्रयोग से वाक्य बनाइए: "राधा बाज़ार गई। राधा फल लाई। राधा मुस्कुराई।"',
      tokens: ['राधा बाज़ार गई।', 'वह', 'फल लाई', 'और', 'मुस्कुराई।'],
      answer: ['राधा बाज़ार गई।', 'वह', 'फल लाई', 'और', 'मुस्कुराई।'],
      rule:
        'नाम बार-बार आने पर उसकी जगह लेता है ताकि वाक्य न भारी हो — "राधा बाज़ार गई। राधा फल लाई। राधा मुस्कुराई" को "राधा बाज़ार गई। वह फल लाई और मुस्कुराई" बनाया जाता है — \'वह\' ही \'राधा\' की जगह है; ध्यान रहे — सर्वनाम तभी जगह ले सकता है जब नाम पहले खुल चुका हो',
    },
  ],
  c9_hin_icse_04_002: [
    {
      prompt: 'पद-क्रम: बिखरे पदों को शुद्ध वाक्य-क्रम में सजाइए।',
      tokens: ['बाज़ार', 'गई', 'और', 'राधा', 'फल', 'लाई'],
      answer: ['राधा', 'बाज़ार', 'गई', 'और', 'फल', 'लाई'],
      rule:
        'शुद्ध वाक्य वह है जिसमें हर खिलाड़ी अपनी जगह पर, अपने दल-साथी से मिलकर खेलता है: विशेषण विशेष्य के लिंग-वचन से, क्रिया कर्ता और कर्म से, काल-संकेत क्रिया-काल से',
    },
  ],
}

// ---- format checkers (authored field lists + model answers) ----

const MONTHS = '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)'
const HI_MONTHS = '(जनवरी|फ़रवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्टूबर|नवंबर|दिसंबर)'
const DATE_RE = [new RegExp(`\\b\\d{1,2}\\s*${MONTHS}\\b`, 'i'), /\b\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\b/]
const HI_DATE_RE = [new RegExp(`\\b\\d{1,2}\\s*${HI_MONTHS}\\b`), /\b\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\b/, new RegExp(`${HI_MONTHS}\\s*\\d{2,4}`)]

export const FORMAT_SPECS: FormatSpec[] = [
  {
    id: 'fmt_notice',
    kind: 'notice',
    title: 'Notice (ICSE format)',
    lang: 'en',
    nodeId: 'c9_eng_icse_03_002',
    task: 'You are the class monitor. Draft a notice informing Classes 9-10 about the science exhibition on 15 November in the school auditorium. (Corpus situation: c9_eng_icse_03_003)',
    fields: [
      { id: 'heading', label: 'Heading — the word "NOTICE" in capitals, centred', patterns: [/\bNOTICE\b/], marks: 1 },
      { id: 'authority', label: 'Issuing authority — name of the organisation or department', patterns: [/(school|club|house|society|council|department|class)/i], marks: 1 },
      { id: 'date', label: 'Date — day, month, year', patterns: DATE_RE, marks: 1 },
      { id: 'subject', label: 'Subject/Title — a brief, specific phrase summarising the content', patterns: [/(subject|title)\s*[:\-]/i], marks: 1 },
      { id: 'body', label: 'Body — 3-5 sentences covering the 5 W\u2019s and any required action', patterns: [/\S+\s+\S+\s+\S+/], marks: 1 },
      { id: 'signature', label: 'Signature block — name, designation, and contact of the signatory', patterns: [/(captain|monitor|secretary|president|coordinator|head (boy|girl)|teacher|librarian)/i], marks: 1 },
    ],
    wChecks: [
      { id: 'who', label: 'WHO', patterns: [/(students|classes|monitor|captain|secretary|members|principal)/i] },
      { id: 'what', label: 'WHAT', patterns: [/(exhibition|match|practice|meeting|competition|event|celebration|workshop|trip)/i] },
      { id: 'when', label: 'WHEN', patterns: [...DATE_RE, /\d{1,2}\s*(a\.m\.|p\.m\.|am|pm)/i] },
      { id: 'where', label: 'WHERE', patterns: [/(auditorium|hall|ground|field|room|lab|library|school|venue)/i] },
      { id: 'why', label: 'WHY / action', patterns: [/(because|so that|to |for the|kindly|requested|are requested)/i] },
    ],
    model:
      'NOTICE\n\nXYZ School, Science Department\n\n15 October 20XX\n\nSubject: Science Exhibition — Classes 9-10\n\nThis is to inform all students of Classes 9 and 10 that a science exhibition will be held on 15 November in the school auditorium from 9 a.m. to 1 p.m. Projects on renewable energy are invited. Interested students should register with their class teachers by 10 November.\n\nRohan Mehta\n(Class Monitor, IX-A)',
  },
  {
    id: 'fmt_email',
    kind: 'email',
    title: 'Formal E-mail (ICSE format)',
    lang: 'en',
    nodeId: 'c9_eng_icse_03_003',
    task: 'You are the class monitor. Write an email to the principal requesting permission to hold a science exhibition on 15 November. (Corpus diagnostic task, c9_eng_icse_03_003)',
    fields: [
      { id: 'subject', label: 'Subject line — concise summary of the email\u2019s purpose, placed at the very top', patterns: [/subject\s*:/i], marks: 1 },
      { id: 'salutation', label: 'Salutation — "Dear Principal," / "Respected Sir/Madam,"', patterns: [/^(dear|respected)\b/im], marks: 1 },
      { id: 'body', label: 'Body — three logical paragraphs: reason, details, expected action', patterns: [/\n[^\n]+\n[^\n]/], marks: 1 },
      { id: 'close', label: 'Complimentary close — "Yours faithfully," / "Yours sincerely,"', patterns: [/yours\s+(faithfully|sincerely|obediently)/i], marks: 1 },
      { id: 'signature', label: 'Signature — sender\u2019s name, designation (e.g., Class Monitor, IX-A)', patterns: [/(monitor|captain|secretary|class\s*ix|ix-a|ix-b|ix-c|head (boy|girl))/i], marks: 1 },
    ],
    model:
      'Subject: Request for Permission \u2013 Science Exhibition on 15 Nov\n\nDear Principal,\n\nI am writing to request your kind permission to organise a science exhibition for Classes 9 and 10 on 15 November in the school auditorium.\n\nThe exhibition will showcase student projects on renewable energy and will be supervised by Mr. Sharma, our physics teacher. We expect around 80 participants and require the auditorium from 9 a.m. to 1 p.m.\n\nKindly grant us permission at your earliest convenience so that we can proceed with preparations.\n\nYours faithfully,\nRohan Mehta\nClass Monitor, IX-A',
  },
  {
    id: 'fmt_letter',
    kind: 'letter',
    title: 'Formal Letter (ICSE skeleton)',
    lang: 'en',
    nodeId: 'c9_eng_icse_02_001',
    task: 'Write a formal letter to the principal following the fixed layout: sender\u2019s address (top-right), date, receiver\u2019s address, subject line, salutation, body, complimentary close, signature.',
    fields: [
      { id: 'sender', label: 'Sender\u2019s address — top-right', patterns: [/^(.{3,40}\n){2,}/], marks: 1 },
      { id: 'date', label: 'Date — below the sender\u2019s address', patterns: DATE_RE, marks: 1 },
      { id: 'receiver', label: 'Receiver\u2019s address — left, after date ("To, The Principal/Editor…")', patterns: [/(to,?\s*\n?\s*the\s+(principal|editor|headmaster|librarian))|the\s+(principal|editor)/i], marks: 1 },
      { id: 'subject', label: 'Subject line — for formal letters', patterns: [/subject\s*[:\-]/i], marks: 1 },
      { id: 'salutation', label: 'Salutation', patterns: [/^(dear|respected)\b/im], marks: 1 },
      { id: 'body', label: 'Body — organised in paragraphs: introduction, details, conclusion', patterns: [/\n[^\n]+\n[^\n]/], marks: 1 },
      { id: 'close', label: 'Complimentary close — "Yours faithfully" (formal) / "Yours affectionately" (informal)', patterns: [/yours\s+(faithfully|sincerely|affectionately|obediently)/i], marks: 1 },
      { id: 'signature', label: 'Signature with name', patterns: [/\n\s*[A-Z][a-z]+ [A-Z][a-z]+/], marks: 1 },
    ],
    model:
      'Rohan Mehta\n12, Rose Villa, MG Road\nMumbai \u2013 400001\n\n15 October 20XX\n\nTo,\nThe Principal\nXYZ School\nMumbai\n\nSubject: Request for permission to hold a science exhibition\n\nDear Sir/Madam,\n\nI wish to bring to your notice that the students of Classes 9 and 10 wish to organise a science exhibition on 15 November in the school auditorium.\n\nThe projects will showcase renewable-energy models and the event will be supervised by our physics teacher. We request the auditorium from 9 a.m. to 1 p.m.\n\nKindly grant us permission at your earliest convenience.\n\nYours faithfully,\nRohan Mehta\n(Class Monitor, IX-A)',
  },
  {
    id: 'fmt_notice_hi',
    kind: 'notice_hi',
    title: 'नोटिस (छह आधारभूत तत्व)',
    lang: 'hi',
    nodeId: 'c8_hin_icse_02_008',
    task: 'विद्यालय की ओर से विज्ञान-प्रदर्शनी (15 नवंबर, विद्यालय-सभागार) की सूचना हेतु नोटिस लिखिए।',
    fields: [
      { id: 'heading', label: "पहला — शीर्षक 'नोटिस': सार्वजनिक सूचना की पहचान देने वाला शीर्षक-पट्ट", patterns: [/नोटिस/i], marks: 1 },
      { id: 'authority', label: 'दूसरा — जारीकर्ता-परिचय: किस संस्था/पद से नोटिस निकला', patterns: [/(विद्यालय|विद्यालय|स्कूल|संस्था|सभा|मंच|कक्षा|पुस्तकालय)/], marks: 1 },
      { id: 'date', label: 'तीसरा — दिनांक', patterns: HI_DATE_RE, marks: 1 },
      { id: 'content', label: 'चौथा — सूचना-सामग्री (क्या, कब, कहाँ)', patterns: [/\S+\s+\S+\s+\S+/], marks: 1 },
      { id: 'signature', label: 'हस्ताक्षर — नाम और पद', patterns: [/(सचिव|अध्यक्ष|मॉनिटर|कप्तान|प्रभारी|मुख्याध्यापक|प्रधानाचार्य)/], marks: 1 },
    ],
    wChecks: [
      { id: 'what', label: 'क्या', patterns: [/(प्रदर्शनी|बैठक|समारोह|प्रतियोगिता|अभ्यास|कार्यशाला|यात्रा)/] },
      { id: 'when', label: 'कब', patterns: HI_DATE_RE },
      { id: 'where', label: 'कहाँ', patterns: [/(सभागार|कक्षा|पुस्तकालय|मैदान|कक्ष|विद्यालय)/] },
      { id: 'who', label: 'किसे/कौन', patterns: [/(विद्यार्थी|छात्र|सदस्य|नागरिक|कक्षा)/] },
    ],
    model:
      'नोटिस\n\nकेंद्रीय विद्यालय, विज्ञान विभाग\n\nदिनांक: 15 अक्टूबर 20XX\n\nविषय: विज्ञान-प्रदर्शनी — कक्षा 9-10\n\nसभी विद्यार्थियों को सूचित किया जाता है कि 15 नवंबर को विद्यालय-सभागार में विज्ञान-प्रदर्शनी आयोजित होगी। नवीकरणीय ऊर्जा पर मॉडल आमंत्रित हैं। रुचि रखने वाले विद्यार्थी 10 नवंबर तक अपने शिक्षकों से नाम दर्ज कराएँ।\n\nरोहन मेहता\n(कक्षा-मॉनिटर, 9-अ)',
  },
  {
    id: 'fmt_aupcharik',
    kind: 'aupcharik',
    title: 'औपचारिक पत्र (प्रारूप-क्रम)',
    lang: 'hi',
    nodeId: 'c9_hin_icse_02_002',
    task: "प्रधानाचार्य को तीन दिन की बीमारी के कारण अवकाश हेतु आवेदन-पत्र लिखिए (विषय-पंक्ति का नमूना: 'विषय: तीन दिन की बीमारी के कारण अवकाश हेतु')।",
    fields: [
      { id: 'sender', label: 'प्रेषक का पता — सबसे ऊपर बाईं ओर', patterns: [/\S{3,}/], marks: 1 },
      { id: 'date', label: 'दिनांक — प्रेषक के पते के नीचे', patterns: HI_DATE_RE, marks: 1 },
      { id: 'receiver', label: "प्राप्तकर्ता का नाम/पद और पता — 'सेवा में, प्रधानाचार्य महोदय, … विद्यालय, …नगर'", patterns: [/सेवा\s*में/], marks: 1 },
      { id: 'subject', label: "विषय-पंक्ति — पत्र का काम एक ही पंक्ति में", patterns: [/विषय\s*[:\-]/], marks: 1 },
      { id: 'salutation', label: "संबोधन — 'महोदय'", patterns: [/महोदय/], marks: 1 },
      { id: 'body', label: "मुख्य संदेश — 'सविनय निवेदन है कि...' से आरंभ", patterns: [/सविनय\s*निवेदन/], marks: 1 },
      { id: 'thanks', label: 'आभार-पंक्ति', patterns: [/(धन्यवाद|आभार|कृतज्ञ)/], marks: 1 },
      { id: 'close', label: "'भवदीय/भवदीया' और नाम-हस्ताक्षर (कक्षा/पद सहित)", patterns: [/भवदीय/], marks: 1 },
    ],
    model:
      'रोहन मेहता\nकक्षा 9-अ, केंद्रीय विद्यालय\n\nदिनांक: 15 अक्टूबर 20XX\n\nसेवा में,\nप्रधानाचार्य महोदय,\nकेंद्रीय विद्यालय, नगर\n\nविषय: तीन दिन की बीमारी के कारण अवकाश हेतु\n\nमहोदय,\n\nसविनय निवेदन है कि मैं, रोहन मेहता, कक्षा 9-अ का छात्र हूँ। तीन दिनों से बुखार के कारण मैं विद्यालय उपस्थित नहीं हो सका। चिकित्सक ने तीन दिन का आराम दिया है।\n\nकृपया मुझे 12 से 14 अक्टूबर तक का अवकाश प्रदान करें। मैं आपका आभारी रहूँगा।\n\nभवदीय,\nरोहन मेहता\nकक्षा 9-अ',
  },
  {
    id: 'fmt_anaupcharik',
    kind: 'anaupcharik',
    title: 'अनौपचारिक पत्र (सहज प्रारूप-क्रम)',
    lang: 'hi',
    nodeId: 'c9_hin_icse_02_003',
    task: "अपने मित्र को दीपावली की शुभकामना देते हुए पत्र लिखिए (प्रेम-पूछ का नमूना: 'मैं यहाँ कुशल हूँ, आशा है तुम भी ठीक होगे')।",
    fields: [
      { id: 'place_date', label: 'स्थान और दिनांक — ऊपर दाईं या बाईं ओर (एक रूढ़ि का पालन, पूरे पत्र में एक)', patterns: [...HI_DATE_RE], marks: 1 },
      { id: 'salutation', label: "संबोधन — 'प्रिय मित्र', 'आदरणीय पिताजी', 'प्यारी बहन' — संबंध के अनुसार", patterns: [/(प्रिय|आदरणीय|प्यारी?)/], marks: 1 },
      { id: 'prem', label: "प्रेम-पूछ — 'मैं यहाँ कुशल हूँ, आशा है तुम भी ठीक होगे' जैसे दो-तीन वाक्य", patterns: [/(कुशल|ठीक|स्वास्थ्य|आनंद)/], marks: 1 },
      { id: 'body', label: 'मुख्य विषय — प्रसंग के संकेत-बिंदुओं का सहज-क्रम में विकास', patterns: [/\S+\s+\S+\s+\S+/], marks: 1 },
      { id: 'close', label: 'तुम-शैली का निविदा-समापन और नाम', patterns: [/(तुम्हारा|तेरा)/], marks: 1 },
    ],
    model:
      'नगर, 15 अक्टूबर 20XX\n\nप्रिय मित्र अमित,\n\nमैं यहाँ कुशल हूँ, आशा है तुम भी ठीक होगे। यहाँ पढ़ाई अच्छी चल रही है और घर पर सबका स्नेह मिल रहा है।\n\nदीपावली का त्योहार पास आ गया है। घर की सफ़ाई चल रही है, माँ ने मिठाइयाँ बनवानी शुरू कर दी हैं। इस बार हम दीपावली नानी के घर मनाएँगे। तुम भी कुछ दिन आकर हमारे साथ त्योहार मनाओ — साथ में पटाखे और मिठाई का मज़ा दुगना हो जाएगा।\n\nअपने माता-पिता को मेरा प्रणाम कहना।\n\nतुम्हारा मित्र,\nरोहन',
  },
]

// ---- literature RCT trainer (verified verbatim quotes) ----

export const RCT_PACKS: Record<string, RctItem[]> = {
  // c9_eng_icse_06_007 — Julius Caesar key quotations (verbatim from the node)
  c9_eng_icse_06_007: [
    {
      quote: 'The fault, dear Brutus, is not in our stars, / But in ourselves, that we are underlings.',
      question: 'Identify the speaker, act, and scene of this line.',
      accept: ['cassius', 'act i', 'scene ii', 'act 1'],
      answer:
        'The line is spoken by Cassius in Act I, Scene ii. Cassius says this to Brutus while persuading him that their subservience to Caesar is a choice, not destiny, using the metaphor of stars to argue for personal agency.',
      marks: 3,
      wrongClause:
        'A wrong answer (e.g., attributing it to Brutus in Act II) reveals the misconception that the play’s most famous lines always belong to the protagonist, ignoring the manipulator’s rhetoric.',
    },
    {
      quote: 'Cowards die many times before their deaths; / The valiant never taste of death but once.',
      question: 'Who speaks this line, in which act and scene, and what does it reveal?',
      accept: ['caesar', 'julius', 'act ii', 'act 2'],
      answer:
        'Caesar speaks it in Act II, Scene ii; it displays his hubris and foreshadows his fall. (Corpus: "Caesar\u2019s \u2018Cowards die many times before their deaths; / The valiant never taste of death but once\u2019 (II.ii) displays his hubris and foreshadows his fall.")',
      marks: 3,
    },
    {
      quote: 'Beware the Ides of March.',
      question: 'Who speaks this line, to whom, and which theme does it introduce?',
      accept: ['soothsayer', 'caesar', 'fate'],
      answer:
        'The soothsayer\u2019s warning to Caesar in Act I, Scene ii; it introduces fate versus free will, a thread that runs through both acts.',
      marks: 3,
    },
    {
      quote: 'I have a man\u2019s mind, but a woman\u2019s might.',
      question: 'Identify the speaker and what the line highlights.',
      accept: ['portia', 'gender', 'woman'],
      answer:
        'Portia (II.iv): it highlights gender expectations and her desperate loyalty. (Corpus: "Portia\u2019s \u2018I have a man\u2019s mind, but a woman\u2019s might\u2019 (II.iv) highlights gender expectations and her desperate loyalty.")',
      marks: 3,
    },
    {
      quote: 'It must be by his death\u2026',
      question: 'Whose soliloquy is this, and what does it show?',
      accept: ['brutus', 'rationalis', 'honour', 'duty'],
      answer:
        'Brutus\u2019s soliloquy (II.i) shows his rationalisation of assassination, blending personal honour with public duty.',
      marks: 3,
    },
    {
      quote: 'Why, man, he doth bestride the narrow world / Like a Colossus',
      question: 'Who speaks these lines, about whom, and what device is used?',
      accept: ['cassius', 'caesar', 'colossus', 'allusion'],
      answer:
        'Cassius, about Caesar (I.ii); it uses a classical allusion to reveal Cassius\u2019s envy and his manipulation of Brutus\u2019s republican ideals.',
      marks: 3,
    },
  ],
  // c8_hin_icse_02_016 — मीरा के पद (Devanagari, authored verbatim)
  c8_hin_icse_02_016: [
    {
      quote: '"मेरो तो गिरधर गोपाल, दूसरो न कोय।"',
      question: 'इस प्रसिद्ध पंक्ति का भावार्थ लिखिए और बताइए कि यह मीरा-भक्ति की किस निशानी का उदाहरण है।',
      accept: ['समर्पण', 'माधुर्य'],
      answer:
        'भावार्थ: मीरा कहती हैं — मेरा सारा प्रेम, मेरा आश्रय और मेरी पहचान केवल गिरधर गोपाल (कृष्ण) में बँधी है; उनके अतिरिक्त मेरे लिए दूसरा कोई आश्रय, दूसरी प्राथमिकता है ही नहीं। यह एकपात्र समर्पण की घोषणा है। निशानी: यह पंक्ति मीरा-भक्ति की समर्पण निशानी का केंद्रीय उदाहरण है — साथ में माधुर्य (कृष्ण से आत्मीय संबंध — \u2018मेरो गिरधर\u2019) भी बोलती है।',
      marks: 3,
      wrongClause:
        'गलत उत्तर (जैसे — "इसका अर्थ है कि मीरा किसी से नहीं डरतीं, इसलिए दूसरों की नहीं सुनतीं") से \'समर्पण को ज़िद मान लेने\' की गलती प्रकट होती है — इसमें \'दूसरो न कोय\' को अवज्ञा-स्वर पढ़ लिया गया; पंक्ति का स्वर विरोध नहीं, एकपात्र प्रेम-निर्णय है — जहाँ हृदय किसी एक में पूर्ण रूप से बँध जाए वहाँ \'दूसरा नहीं\' गर्व का नहीं, प्रेम का कथन होता है; भावार्थ लिखते समय स्वर (प्रेम/विरोध/ज्ञान) पहचानना पहला काम है।',
    },
    {
      quote: 'पद — गाये जाने के लिए रचा गया संक्षिप्त, भाव-प्रधान, लयबद्ध काव्य-रूप।',
      question: 'पद-विधा की चार विशेषताएँ लिखिए।',
      accept: ['गेयता', 'संक्षिप्तता', 'भाव-प्रधानता', 'लोक-भाषा', 'गेय', 'लय'],
      answer:
        '(1) गेयता — पद का मूल अस्तित्व गायन में है; लय-राग उसका शरीर है; (2) संक्षिप्तता — पंक्तियाँ कम, एक-दो भाव का संकेंद्रण; (3) भाव-प्रधानता — प्रेम-तड़प-आनंद जैसे भाव केंद्र में; (4) लोक-भाषा — सरल, बोलचाल के निकट भाषा।',
      marks: 4,
      wrongClause:
        'गलत उत्तर (जैसे — "पद लंबे-लंबे काव्य-खंड हैं जिनमें कथा विस्तार से कही जाती है") से \'पद-महाकाव्य मिश्रण\' की गलती प्रकट होती है — इसमें गेय-संक्षिप्त विधा को कथा-विस्तार वाली विधा (महाकाव्य/खंडकाव्य) की विशेषताएँ थोप दी गईं; पद की ताक़त ही उसका संक्षेप है — कम शब्दों में एक भाव का सागर; विधा-स्वरूप पहचाने बिना विशेषताएँ उलटी ही लिखी जाएँगी।',
    },
  ],
  // c9_hin_icse_05_004 — निर्धारित कविताओं की पहचान (authored fragments)
  c9_hin_icse_05_004: [
    {
      quote: '"पुष्प की अभिलाषा"',
      question: "\u2018पुष्प की अभिलाषा\u2019 कविता के कवि और केंद्रीय भाव लिखिए।",
      accept: ['माखनलाल', 'चतुर्वेदी', 'देशभक्ति', 'त्याग'],
      answer:
        "कवि — माखनलाल चतुर्वेदी; विषय 'देशभक्ति और त्याग' है; कविता में पुष्प के माध्यम से प्रतीकात्मक अभिव्यक्ति है (corpus: \"पुष्प की अभिलाषा\" का विषय 'देशभक्ति और त्याग' है; माखनलाल चतुर्वेदी की कविता)।",
      marks: 2,
    },
  ],
  // c8_hin_icse_02_014 — प्रेमचंद: 'वृद्धा'
  c8_hin_icse_02_014: [
    {
      quote: "'वृद्धा' — प्रेमचंद द्वारा रचित गद्य-कथा।",
      question: "'वृद्धा' कहानी का केंद्र-बिंदु क्या है और प्रेमचंद का मूल नाम क्या था?",
      accept: ['वृद्धावस्था', 'उपेक्षा', 'धनपत'],
      answer:
        "कहानी का केंद्र है — वृद्धावस्था की स्थिति और समाज की उपेक्षापूर्ण दृष्टि। प्रेमचंद का मूल नाम धनपत राय था (जन्म 1880 ई.)।",
      marks: 2,
    },
  ],
  // c10_hin_icse_05_001 — सुदर्शन: 'बात अठन्नी की'
  c10_hin_icse_05_001: [
    {
      quote: "'बात अठन्नी की'",
      question: "'बात अठन्नी की' के कथाकार कौन हैं और यह किस विधा की रचना है?",
      accept: ['सुदर्शन', 'लघुकथा'],
      answer: 'सुप्रसिद्ध कथाकार सुदर्शन द्वारा रचित एक लघुकथा है जो हिंदी पाठ्यक्रम में सम्मिलित है।',
      marks: 2,
    },
  ],
}

// ---- vocabulary builders ----

export const VOCAB_PACKS: Record<string, VocabItem[]> = {
  // c7_hin_icse_03_003 — शब्द-भंडार (पर्यायवाची/विलोम/मुहावरे, authored उदाहरण)
  c7_hin_icse_03_003: [
    { prompt: "'सूर्य' के दो पर्यायवाची शब्द लिखिए।", accept: ['रवि', 'दिनकर'], note: "पर्यायवाची — एक अर्थ-क्षेत्र के अनेक शब्द, जिनमें से प्रसंग के अनुसार चुना जाता है ('सूर्य' — रवि, दिनकर)।" },
    { prompt: "'दिन' का विलोम शब्द लिखिए।", accept: ['रात'], note: "विलोम — अर्थ की विपरीत धुरी पर खड़ा शब्द ('दिन'×'रात')।" },
    { prompt: "'आँखों का तारा होना' — किस शब्द-समूह श्रेणी का उदाहरण है और इसका काम क्या है?", accept: ['मुहावरा'], note: 'मुहावरा वाक्य का अंश होता है; स्थापित अर्थ वाले शब्द-समूह भाषा को रंग और जन-बुद्धि की गहराई देते हैं।' },
    { prompt: "'अंधों में काना राजा' — मुहावरा है या लोकोक्ति? कारण बताइए।", accept: ['लोकोक्ति'], note: 'लोकोक्ति पूर्ण वाक्य-रूप होती है; मुहावरा वाक्य का अंश।' },
  ],
  // c9_eng_icse_05_001 — functional grammar terminology (word families, authored)
  c9_eng_icse_05_001: [
    { prompt: 'Name the five basic sentence patterns that cover all simple sentences.', accept: ['sv', 'svo', 'svc', 'svoo', 'svoc'], note: 'Five basic patterns — SV, SVO, SVC, SVOO, SVOC — cover all simple sentences.' },
    { prompt: 'Name the two coordinating conjunctions the corpus lists.', accept: ['and', 'but', 'or'], note: 'Coordinating conjunctions (and, but, or) join equal units (words, phrases, clauses).' },
    { prompt: 'Name two subordinating conjunctions and the relationships they signal.', accept: ['because', 'although', 'if'], note: 'Subordinating conjunctions (because, although, if) attach dependent clauses to main clauses, signalling relationships like cause, contrast, or condition.' },
    { prompt: 'A simple sentence contains how many independent clauses?', accept: ['one', '1'], note: 'Simple = one independent clause; compound = two or more joined by coordinators; complex = one independent plus dependent clause(s).' },
  ],
}

/** Bands grouped for the picker. */
export function bandsFor(subject: LangSubject): LangClassBand[] {
  return LANGYM_CLASSES.filter(b => b.subject === subject)
}
