import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch03_p1: SimDef = {
    id: 'v3_c12_bio_ch03_p1',
    title: 'Human Reproduction · Part 1/2',
    subtitle: 'Why sperm needs a cooler room — and other design logic of human reproduction.',
    classLevel: 12, subject: 'biology', topic: 'Human Reproduction · Part 1/2',
    chapters: ['c12_bio_ch03'],
    nodeIds: ['c12_bio_cbse_03_001', 'c12_bio_cbse_03_002', 'c12_bio_cbse_03_003', 'c12_bio_cbse_03_004', 'c12_bio_cbse_03_005', 'c12_bio_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Medical student tracing the gamete\'s journey', intro: 'Every structure here exists because a gamete demanded it — anatomy is frozen function.', goal: 'Describe the anatomy and histology of male and female reproductive systems and their ducts.' },
    discovery: {
        question: 'The testes sit outside the abdominal cavity in the scrotum — a seemingly odd design. Why does sperm production demand it?',
        options: ['Spermatogenesis needs a temperature a few degrees below core body temperature', 'The scrotum protects testes from the pressure of the abdominal muscles', 'Sperm can only mature where oxygen concentration is highest', 'External placement allows the vas deferens to shorten its transport route'],
        answer: 'Spermatogenesis needs a temperature a few degrees below core body temperature',
        hook: 'It looks like an anatomical accident; it\'s a thermal requirement. The scrotum is a cooling system — and the same logic explains undescended-testis infertility in clinical practice.',
    },
    teaching: [
        { title: 'Male Reproductive System: Testes and Ducts', text: 'The male reproductive system consists of a pair of testes (primary sex organs) that produce spermatozoa and androgens, and a system of ducts (epididymis, vas deferens, ejaculatory duct, and urethra).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_03_001', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Map both reproductive systems end-to-end: trace sperm from seminiferous tubules through the duct system, and ova from ovary through fimbriae to uterus — matching each structure to its function.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_001', title: 'Male Reproductive System: Testes and Ducts',
          caseStudy: { intro: 'Start with a relatable observation: "When you see a diagram of the male reproductive system, notice that the testes are located outside the abdominal cavity.',
            decisions: [{ prompt: 'Name the two main types of cells in the seminiferous tubules of the testis and state one function of each.', options: [
                { text: 'Correct answer: Sertoli cells (nurse cells) – provide nutrition and support to developing', outcome: 'Correct answer: Sertoli cells (nurse cells) – provide nutrition and support to developing.' },
                { text: 'sperm mature there', outcome: 'Not quite — Students often think that sperm are produced in the epididymis because they hear "sperm mature.', reveals: 'sperm-are-produced-in-the' },
                { text: 'sperm are produced in the epididymis', outcome: 'Not quite — Students often think that sperm are produced in the epididymis because they hear "sperm mature.', reveals: 'sperm-are-produced-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_002', title: 'Female Reproductive System: Ovaries and Uterus',
          caseStudy: { intro: 'Begin by observing a diagram of the female reproductive system in the NCERT textbook (Figure 3.2).',
            decisions: [{ prompt: 'Name the three histological layers of the uterine wall from outermost to innermost, and state which layer undergoes cyclic shedding during.', options: [
                { text: 'The three layers are perimetrium (outer serous layer), myometrium (middle smooth muscle', outcome: 'The three layers are perimetrium (outer serous layer), myometrium (middle smooth muscle layer), and.' },
                { text: 'myometrium sheds', outcome: 'Not quite — Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte.', reveals: 'the-ovary-is-directly-attached' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_03_003', title: 'Gametogenesis: Spermatogenesis',
          scaffold: { problem: 'Calculate the number of spermatozoa produced from a single Type A_s spermatogonium that undergoes 5 mitotic amplification divisions before.',
            steps: [
            { text: 'Identify starting cell — Type A_s spermatogonium (diploid, 2n=46, 2C DNA).' },
            { text: 'Mitotic amplification — 5 divisions yield 2^5 = 32 Type B spermatogonia (each 2n=46, 2C).' },
            { text: 'Each Type B divides once more by mitosis → 32 Primary spermatocytes (2n=46, 4C after S-phase).' },
            { text: 'Meiosis I (reductional) → 32 × 2 = 64 Secondary spermatocytes (n=23, 2C).' },
            { text: 'Meiosis II (equational) → 64 × 2 = 128 Spermatids (n=23, 1C).' },
            { text: 'Spermiogenesis (no division) → 128 Spermatozoa (n=23, 1C).', faded: true, blankAnswer: '128 spermatozoa per original Type A_s spermatogonium after.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_004', title: 'Gametogenesis: Oogenesis',
          caseStudy: { intro: 'Imagine a newborn baby girl — she already carries every primary oocyte she will ever have, each paused in prophase I since she was a 20‑week fetus.',
            decisions: [{ prompt: 'State the ploidy (n or 2n) and chromosome number (in humans) of a primary oocyte, a secondary oocyte, and a mature ovum immediately after.', options: [
                { text: 'Primary oocyte: 2n, 46 chromosomes (replicated, each chromosome has two chromatids)', outcome: 'Primary oocyte: 2n, 46 chromosomes (replicated, each chromosome has two chromatids).' },
                { text: 'secondary oocyte is 2n', outcome: 'Not quite — Students often think that the "egg" released at ovulation is a mature ovum (haploid, 23.', reveals: 'the-egg-released-at-ovulation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_005', title: 'Menstrual Cycle: Phases - Menstrual, Follicular, Luteal',
          caseStudy: { intro: 'Begin by asking the student to recall the monthly bleeding they observe or hear about — this is the visible sign of the menstrual phase.',
            decisions: [{ prompt: 'What is the approximate duration of a typical human menstrual cycle, and which phase marks its first day?', options: [
                { text: 'A typical human menstrual cycle lasts about 28 days (range 21-35 days)', outcome: 'A typical human menstrual cycle lasts about 28 days (range 21-35 days).' },
                { text: 'cycle starts at ovulation', outcome: 'Not quite — Students often believe that the menstrual cycle is exactly 28 days for every woman and that.', reveals: 'the-menstrual-cycle-is-exactly' },
                { text: 'duration is 30 days exactly', outcome: 'Not quite — Students often believe that the menstrual cycle is exactly 28 days for every woman and that.', reveals: 'the-menstrual-cycle-is-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_006', title: 'Fertilization in Humans: Capacitation and Acrosome Reaction',
          caseStudy: { intro: 'Imagine a single sperm navigating the female reproductive tract — it cannot fertilize immediately after ejaculation; it must undergo a "maturation" called.',
            decisions: [{ prompt: 'What specific biochemical change occurs in the sperm plasma membrane during capacitation that is essential for subsequent acrosome reaction?', options: [
                { text: 'Correct answer: Removal of cholesterol and glycoproteins (decapacitation factors) from', outcome: 'Correct answer: Removal of cholesterol and glycoproteins (decapacitation factors) from the sperm.' },
                { text: 'sperm gains mitochondria', outcome: 'Not quite — Students believe capacitation is the same as the acrosome reaction, or that capacitation occurs.', reveals: 'capacitation-is-the-same-as' },
                { text: 'acrosome forms during capacitation', outcome: 'Not quite — Students believe capacitation is the same as the acrosome reaction, or that capacitation occurs.', reveals: 'capacitation-is-the-same-as' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Reproduction · Part 1/2', spots: [
            { id: 's1', label: 'Male Reproductive System Testes and Ducts', prompt: 'Which idea is this? — The male reproductive system consists of a pair of testes (primary sex organs) that.', answer: 'Male Reproductive System Testes and Ducts', options: ['Male Reproductive System Testes and Ducts', 'Female Reproductive System Ovaries and Uterus', 'Gametogenesis Spermatogenesis', 'Gametogenesis Oogenesis'] },
            { id: 's2', label: 'Female Reproductive System Ovaries and Uterus', prompt: 'Which idea is this? — The female reproductive system comprises the ovaries (paired gonads that produce ova and.', answer: 'Female Reproductive System Ovaries and Uterus', options: ['Female Reproductive System Ovaries and Uterus', 'Male Reproductive System Testes and Ducts', 'Gametogenesis Spermatogenesis', 'Gametogenesis Oogenesis'] },
            { id: 's3', label: 'Gametogenesis Spermatogenesis', prompt: 'Which idea is this? — Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the.', answer: 'Gametogenesis Spermatogenesis', options: ['Gametogenesis Spermatogenesis', 'Male Reproductive System Testes and Ducts', 'Female Reproductive System Ovaries and Uterus', 'Gametogenesis Oogenesis'] },
            { id: 's4', label: 'Gametogenesis Oogenesis', prompt: 'Which idea is this? — Oogenesis is the process of formation and maturation of the female gamete (ovum) in the.', answer: 'Gametogenesis Oogenesis', options: ['Gametogenesis Oogenesis', 'Male Reproductive System Testes and Ducts', 'Female Reproductive System Ovaries and Uterus', 'Gametogenesis Spermatogenesis'] },
            { id: 's5', label: 'Menstrual Cycle Phases - Menstrual Follicular Luteal', prompt: 'Which idea is this? — The menstrual cycle is a recurring physiological process in human females, averaging 28.', answer: 'Menstrual Cycle Phases - Menstrual Follicular Luteal', options: ['Menstrual Cycle Phases - Menstrual Follicular Luteal', 'Male Reproductive System Testes and Ducts', 'Female Reproductive System Ovaries and Uterus', 'Gametogenesis Spermatogenesis'] },
            { id: 's6', label: 'Fertilization in Humans Capacitation and Acrosome Reaction', prompt: 'Which idea is this? — Fertilization in humans is the fusion of a capacitated spermatozoon with a secondary.', answer: 'Fertilization in Humans Capacitation and Acrosome Reaction', options: ['Fertilization in Humans Capacitation and Acrosome Reaction', 'Male Reproductive System Testes and Ducts', 'Female Reproductive System Ovaries and Uterus', 'Gametogenesis Spermatogenesis'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A relative is anxious before a vasectomy, having heard \'you\'ll produce no semen at all and your manhood hormones will crash\'. His niece, a biology student, is asked what\'s actually true.',
            decisions: [{ prompt: 'What does cutting the vas deferens really do?', options: [
                { text: 'It blocks sperm transport only: semen volume barely drops since most fluid comes from the seminal vesicles and prostate, and testosterone keeps flowing because Leydig cells release it straight into blood.', outcome: 'Sperm are only a small part of ejaculate and testicular hormones don\'t travel down the vas — so contraception happens without ending semen or androgens.' },
                { text: 'He\'s right to worry — all of semen travels through the vas deferens, so cutting it means no ejaculate.', outcome: 'The vas carries only sperm; accessory gland secretions join downstream via their own ducts, so semen volume stays nearly normal.', reveals: 'all-semen-via-vas' },
                { text: 'Testosterone will drop because the testes are disconnected from the body.', outcome: 'Testosterone enters the bloodstream at the testis, not the duct system — spermatogenesis even continues, with sperm phagocytosed in the epididymis.', reveals: 'vasectomy-kills-testosterone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now walk a gamete\'s entire journey in either system. Histology of testis and ovary is heavy board weightage — and the literal anatomy of fertility medicine.',
            decisions: [{ prompt: 'What comes next? Human Reproduction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Reproduction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_001', difficulty: 'standard',
          question: 'The male reproductive system consists of a pair of testes (primary sex organs).',
          hint: 'If stuck, review Class 10 node c10_bio_cbse_03_008 (Male Reproductive System in Humans).',
          misconception: 'Students often think that sperm are produced in the epididymis because they hear "sperm mature there." They confuse the.',
          parts: [
                { id: 'a', prompt: 'A male patient has a blockage in the vas deferens on both sides.', answer: 'Correct answer: Spermatozoa will be absent',
                  options: ['Correct answer: Spermatozoa will be absent', 'sperm mature there', 'sperm are produced in the epididymis'],
                  hint: 'If stuck, review Class 10 node c10_bio_cbse_03_008 (Male Reproductive System in Humans) and Class 6.',
                  misconception: 'Students often think that sperm are produced in the epididymis because they hear "sperm mature there." They confuse the site of production.' }
          ],
            remediations: { 'sperm-are-produced-in-the': { steps: ['If the student confuses production vs maturation sites: 1) Revisit the histology of seminiferous tubules (Class 11.', '2) Draw a flowchart: Spermatogonia -> primary spermatocyte -> secondary spermatocyte -> spermatid -> spermatozoon (in.', '3) Re-diagnostic: Ask "Where does meiosis occur in the male reproductive system?" to check if they now identify.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that sperm are produced in the epididymis because they hear "sperm mature there." They confuse the.',
          parts: [
                { id: 'a', prompt: 'A student claims: \'The urethra in males serves only as a passage for urine.\' Evaluate this statement and correct it.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'sperm mature there', 'sperm are produced in the epididymis'],
                  hint: 'If stuck, review Class 10 node c10_bio_cbse_03_008 (Male Reproductive System in Humans) and Class 6.',
                  misconception: 'Students often think that sperm are produced in the epididymis because they hear "sperm mature there." They confuse the site of production.' }
          ],
            remediations: { 'sperm-are-produced-in-the': { steps: ['If the student confuses production vs maturation sites: 1) Revisit the histology of seminiferous tubules (Class 11.', '2) Draw a flowchart: Spermatogonia -> primary spermatocyte -> secondary spermatocyte -> spermatid -> spermatozoon (in.', '3) Re-diagnostic: Ask "Where does meiosis occur in the male reproductive system?" to check if they now identify.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_002', difficulty: 'standard',
          question: 'The female reproductive system comprises the ovaries (paired gonads that.',
          hint: 'If stuck, revisit Class 10 node c10_bio_cbse_03_009 (Female Reproductive System) and.',
          misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The female reproductive system comprises the ovaries (paired gonads that produce ova and',
                  options: ['The female reproductive system comprises the ovaries (paired gonads that produce ova and', 'The male reproductive system consists of a pair of testes (primary sex organs) that', 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the', 'Oogenesis is the process of formation and maturation of the female gamete (ovum) in the'],
                  hint: 'If stuck, revisit Class 10 node c10_bio_cbse_03_009 (Female Reproductive System) and Class 11 node.',
                  misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the tube.' }
          ],
            remediations: { 'the-ovary-is-directly-attached': { steps: ['If the student holds this misconception, have them: (1) Re-examine the NCERT diagram (Figure 3.2) and note the gap.', '(2) Watch a short video of laparoscopic ovulation showing the oocyte released into the peritoneal fluid.', '(3) Review the structure of the fimbriae (ciliated epithelium) from the histology section of this node.', '(4) Re-attempt Diagnostic Question 2 to confirm they can now explain the capture mechanism correctly.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_003', difficulty: 'standard',
          question: 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules.',
          hint: 'If stuck on ploidy changes, re-watch c11_bio_cbse_10_006/007 focusing on DNA content per.',
          misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.',
          parts: [
                { id: 'a', prompt: 'A histology slide shows a seminiferous tubule cross-section with large cells having prominent nucleoli near the basement membrane, smaller cells with condensed.', answer: 'The large basal cells are Type B spermatogonia / early primary spermatocytes',
                  options: ['The large basal cells are Type B spermatogonia / early primary spermatocytes', 'spermatozoa are abundant', 'lumen is full of sperm', 'spermatogenesis = meiosis only'],
                  hint: 'If stuck on ploidy changes, re-watch c11_bio_cbse_10_006/007 focusing on DNA content per chromosome.',
                  misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.' }
          ],
            remediations: { 'spermatogenesis-meiosis-only-and-forget': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to lock ploidy/DNA-content changes.', 'Draw a flowchart: Type A_s → (mitosis) → Type A_paired → Type A_aligned → Type B → (mitosis) → Primary spermatocyte.', 'Watch a 3-min animation of spermatogenic cycle (stages I–XII) to visualize the wave.', 'Re-attempt Diagnostic Q3 and Q5.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_004', difficulty: 'standard',
          question: 'Oogenesis is the process of formation and maturation of the female gamete.',
          hint: 'If stuck, review c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II).',
          misconception: 'Students often think that the "egg" released at ovulation is a mature ovum (haploid, 23 chromosomes, single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Oogenesis is the process of formation and maturation of the female gamete (ovum) in the',
                  options: ['Oogenesis is the process of formation and maturation of the female gamete (ovum) in the', 'The male reproductive system consists of a pair of testes (primary sex organs) that', 'The female reproductive system comprises the ovaries (paired gonads that produce ova and', 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the'],
                  hint: 'If stuck, review c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) with focus.',
                  misconception: 'Students often think that the "egg" released at ovulation is a mature ovum (haploid, 23 chromosomes, single chromatids).' }
          ],
            remediations: { 'the-egg-released-at-ovulation': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to solidify the distinction between.', 'Draw a timeline from fetal life to fertilization, marking each meiotic stage, arrest point, and the hormone that.', 'Practice a NEET‑style question: "At ovulation, the human egg is at which stage of meiosis?" until you consistently.', 'If confusion persists, watch a 5‑minute animation of human oogenesis focusing on the asymmetric divisions and polar.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_005', difficulty: 'standard',
          question: 'The menstrual cycle is a recurring physiological process in human females.',
          hint: 'If feedback loops are unclear, review c11_bio_cbse_19_001 and c11_bio_cbse_19_007.',
          misconception: 'Students often believe that the menstrual cycle is exactly 28 days for every woman and that ovulation always occurs.',
          parts: [
                { id: 'a', prompt: 'What is the approximate duration of a typical human menstrual cycle, and which phase marks its first day?', answer: 'A typical human menstrual cycle lasts about 28 days (range 21-35 days)',
                  options: ['A typical human menstrual cycle lasts about 28 days (range 21-35 days)', 'cycle starts at ovulation', 'duration is 30 days exactly', 'follicular phase'],
                  hint: 'If feedback loops are unclear, review c11_bio_cbse_19_001 and c11_bio_cbse_19_007, focusing on the.',
                  misconception: 'Students often believe that the menstrual cycle is exactly 28 days for every woman and that ovulation always occurs on day 14.' },
                { id: 'b', prompt: 'A woman has a regular 28-day cycle. On which day does ovulation most likely occur, and what hormonal event triggers it?', answer: 'Ovulation typically occurs on day 14 of a 28-day cycle',
                  options: ['Ovulation typically occurs on day 14 of a 28-day cycle', 'day 10', 'FSH surge', 'follicular phase'],
                  hint: 'If feedback loops are unclear, review c11_bio_cbse_19_001 and c11_bio_cbse_19_007, focusing on the.',
                  misconception: 'Students often believe that the menstrual cycle is exactly 28 days for every woman and that ovulation always occurs on day 14.' },
                { id: 'c', prompt: 'Compare the hormonal environment and endometrial status in the late follicular phase versus the mid-luteal phase.', answer: 'Late follicular phase: high estrogen, low progesterone',
                  options: ['Late follicular phase: high estrogen, low progesterone', 'progesterone high in follicular phase', 'endometrium thin in luteal phase', 'follicular phase'],
                  hint: 'If feedback loops are unclear, review c11_bio_cbse_19_001 and c11_bio_cbse_19_007, focusing on the.',
                  misconception: 'Students often believe that the menstrual cycle is exactly 28 days for every woman and that ovulation always occurs on day 14.' }
          ],
            remediations: { 'the-menstrual-cycle-is-exactly': { steps: ['If the student cannot correctly sequence phases or match hormones to phases: 1) Revisit c11_bio_cbse_19_001.', '2) Draw a 28-day timeline on paper, labeling ovarian events (follicle growth, ovulation, corpus luteum) on top and.', '3) Add hormone curves (FSH, LH, estrogen, progesterone) using different colors.', '4) Practice explaining the positive feedback loop at mid-cycle aloud.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_006', difficulty: 'standard',
          question: 'Fertilization in humans is the fusion of a capacitated spermatozoon with.',
          hint: 'If confused, revisit c12_bio_cbse_03_003 (spermiogenesis: acrosome formation) and.',
          misconception: 'Students believe capacitation is the same as the acrosome reaction, or that capacitation occurs in the epididymis.',
          parts: [
                { id: 'a', prompt: 'A patient\'s sperm show normal count, motility, and morphology but fail to penetrate zona pellucida in vitro.', answer: 'Correct answer: Defective acrosome reaction',
                  options: ['Correct answer: Defective acrosome reaction', 'low motility', 'DNA fragmentation test', 'capacitation happens in male tract'],
                  hint: 'If confused, revisit c12_bio_cbse_03_003 (spermiogenesis: acrosome formation) and.',
                  misconception: 'Students believe capacitation is the same as the acrosome reaction, or that capacitation occurs in the epididymis.' }
          ],
            remediations: { 'capacitation-is-the-same-as': { steps: ['Revisit c12_bio_cbse_03_003 (Spermatogenesis) to confirm acrosome formation during spermiogenesis, not capacitation.', 'Use a flowchart: Ejaculation → Uterus (capacitation: cholesterol efflux, cAMP↑, tyrosine phosphorylation) → Fallopian.', 'Re-diagnose with Question 2 — if student still says "progesterone triggers acrosome reaction without zona," repeat Step.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
