import type { SimDef } from '../../engine/types';
import C12_BiologyOogenesisSim from '../../../simulations/c6_12/C12_BiologyOogenesisSim';

/** v3 wrapped master — C12_BiologyOogenesisSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyoogenesissim: SimDef = {
    id: 'v3w_c12_biologyoogenesissim',
    title: 'Female Reproductive System: Ovaries and Uterus',
    subtitle: 'This node covers the gross and microscopic anatomy of the human ovary and uterus, their.',
    classLevel: 12, subject: 'biology', topic: 'Female Reproductive System: Ovaries and Uterus',
    chapters: [],
    nodeIds: ['c12_bio_cbse_03_002', 'c12_bio_cbse_03_003', 'c12_bio_cbse_03_004', 'c12_bio_cbse_01_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin by observing a diagram of the female reproductive system in the NCERT textbook (Figure 3.2).', goal: 'Master Female Reproductive System: Ovaries and Uterus.' },
    discovery: {
        question: 'A histology slide shows a seminiferous tubule cross-section with large cells having prominent nucleoli near the basement membrane, smaller cells with condensed.',
        options: ['The large basal cells are Type B spermatogonia / early primary spermatocytes', 'spermatozoa are abundant', 'lumen is full of sperm'],
        answer: 'The large basal cells are Type B spermatogonia / early primary spermatocytes',
        hook: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.',
    },
    teaching: [
        { title: 'The female reproductive system comprises the.', text: 'The female reproductive system comprises the ovaries (paired gonads that produce ova and secrete steroid hormones) and the uterus (a muscular hollow organ where implantation occurs and the fetus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_03_002', title: 'The female reproductive system.',
          scaffold: { problem: 'A histology slide shows a section of the human ovary with a large, fluid-filled antrum lined by granulosa cells, an outer theca cell layer,.',
            steps: [
            { text: 'Recognize the presence of a large antrum filled with follicular fluid as the hallmark of a mature (Graafian) follicle.' },
            { text: 'Recall that the outermost outer theca cells (theca externa) express LH receptors and synthesize androgens.' },
            { text: 'Recall that the inner granulosa cells express FSH receptors and convert androgens to estradiol via aromatase (two-cell,.' },
            { text: 'Connect this to the preovulatory surge: high estradiol from the mature follicle triggers positive feedback on the.' },
            { text: 'Conclude that the slide shows a preovulatory Graafian follicle, and its two cell layers cooperate to produce the.', faded: true, blankAnswer: 'The slide shows a mature (Graafian) follicle. Theca cells.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_03_003', title: 'Spermatogenesis is the continuous,.',
          scaffold: { problem: 'Calculate the number of spermatozoa produced from a single Type A_s spermatogonium that undergoes 5 mitotic amplification divisions before.',
            steps: [
            { text: 'Identify starting cell — Type A_s spermatogonium (diploid, 2n=46, 2C DNA).' },
            { text: 'Mitotic amplification — 5 divisions yield 2^5 = 32 Type B spermatogonia (each 2n=46, 2C).' },
            { text: 'Each Type B divides once more by mitosis → 32 Primary spermatocytes (2n=46, 4C after S-phase).' },
            { text: 'Meiosis I (reductional) → 32 × 2 = 64 Secondary spermatocytes (n=23, 2C).' },
            { text: 'Meiosis II (equational) → 64 × 2 = 128 Spermatids (n=23, 1C).' },
            { text: 'Spermiogenesis (no division) → 128 Spermatozoa (n=23, 1C).', faded: true, blankAnswer: '128 spermatozoa per original Type A_s spermatogonium after.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_03_004', title: 'Oogenesis is the process of formation.',
          scaffold: { problem: 'A geneticist examines an ovarian section from a 20‑week human fetus.',
            steps: [
            { text: 'Recognize that 46 chromosomes with paired homologs and chiasmata indicate prophase I of meiosis (specifically.' },
            { text: 'Recall that in human females, all oogonia enter meiosis I by 20 weeks fetal age and arrest at prophase I (dictyate.' },
            { text: 'The arrest is maintained by high cAMP levels in the oocyte, sustained by granulosa cell signals; meiotic resumption.' },
            { text: 'Therefore, the cell is a primary oocyte arrested in prophase I; it will remain dormant until a future menstrual cycle\'s.' },
            { text: 'Verify: chromosome number 2n=46, replicated; stage = prophase I; arrest reason = lack of LH surge / high cAMP.', faded: true, blankAnswer: 'Primary oocyte, prophase I (pachytene/dictyate), arrested.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_01_005', title: 'Gametogenesis is the process of.',
          scaffold: { problem: 'A histology slide shows a cross-section of a human seminiferous tubule.',
            steps: [
            { text: 'Identify the anatomical context — seminiferous tubule cross-section means spermatogenesis.' },
            { text: 'Cells near basement membrane with large pale nuclei and prominent nucleoli = spermatogonia (type A and B).' },
            { text: 'Cells with dense, tangled chromosomes in middle layer = primary spermatocytes in prophase I (pachytene stage).' },
            { text: 'Small elongated cells with tails embedded in Sertoli cell apical cytoplasm = elongating/elongated spermatids.' },
            { text: 'Verify no secondary spermatocytes visible (they are short-lived, rarely seen) and no spermatids in lumen (spermiation.', faded: true, blankAnswer: 'Basal layer: Spermatogonia (2n, mitotic). Middle layer:.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_03_003', title: 'Identify each idea',
          dissect: { specimen: 'Female Reproductive System: Ovaries and Uterus', spots: [
            { id: 's1', label: 'The female reproductive system comprises', prompt: 'Which idea is this? — The female reproductive system comprises the ovaries (paired gonads that produce ova and.', answer: 'The female reproductive system comprises', options: ['The female reproductive system comprises', 'Spermatogenesis is the continuous cyclic', 'Oogenesis is the process of', 'Gametogenesis is the process of'] },
            { id: 's2', label: 'Spermatogenesis is the continuous cyclic', prompt: 'Which idea is this? — Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the.', answer: 'Spermatogenesis is the continuous cyclic', options: ['Spermatogenesis is the continuous cyclic', 'The female reproductive system comprises', 'Oogenesis is the process of', 'Gametogenesis is the process of'] },
            { id: 's3', label: 'Oogenesis is the process of', prompt: 'Which idea is this? — Oogenesis is the process of formation and maturation of the female gamete (ovum) in the.', answer: 'Oogenesis is the process of', options: ['Oogenesis is the process of', 'The female reproductive system comprises', 'Spermatogenesis is the continuous cyclic', 'Gametogenesis is the process of'] },
            { id: 's4', label: 'Gametogenesis is the process of', prompt: 'Which idea is this? — Gametogenesis is the process of formation of haploid male and female gametes (sperm and.', answer: 'Gametogenesis is the process of', options: ['Gametogenesis is the process of', 'The female reproductive system comprises', 'Spermatogenesis is the continuous cyclic', 'Oogenesis is the process of'] }
          ] } }
    ],
    explore: { component: C12_BiologyOogenesisSim, prompt: 'Explore the interactive — Female Reproductive System: Ovaries and Uterus' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_002', difficulty: 'standard',
          question: 'The female reproductive system comprises the ovaries (paired gonads that.',
          hint: 'If stuck, revisit Class 10 node c10_bio_cbse_03_009 (Female Reproductive System) and.',
          misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The female reproductive system comprises the ovaries (paired gonads that produce ova and',
                  options: ['The female reproductive system comprises the ovaries (paired gonads that produce ova and', 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the', 'Oogenesis is the process of formation and maturation of the female gamete (ovum) in the', 'Gametogenesis is the process of formation of haploid male and female gametes (sperm and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the tube.' }
          ],
            remediations: { 'the-ovary-is-directly-attached': { steps: ['If the student holds this misconception, have them: (1) Re-examine the NCERT diagram (Figure 3.2) and note the gap.', '(2) Watch a short video of laparoscopic ovulation showing the oocyte released into the peritoneal fluid.', '(3) Review the structure of the fimbriae (ciliated epithelium) from the histology section of this node.', '(4) Re-attempt Diagnostic Question 2 to confirm they can now explain the capture mechanism correctly.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The corpus luteum forms from the ruptured follicle after ovulation and secretes only progesterone." Identify the error and explain the.', answer: 'The statement is false',
                  options: ['The statement is false', 'only progesterone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the ovary is directly attached to the fallopian tube, so the ovulated oocyte simply falls into the tube.' }
          ],
            remediations: { 'the-ovary-is-directly-attached': { steps: ['If the student holds this misconception, have them: (1) Re-examine the NCERT diagram (Figure 3.2) and note the gap.', '(2) Watch a short video of laparoscopic ovulation showing the oocyte released into the peritoneal fluid.', '(3) Review the structure of the fimbriae (ciliated epithelium) from the histology section of this node.', '(4) Re-attempt Diagnostic Question 2 to confirm they can now explain the capture mechanism correctly.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_003', difficulty: 'standard',
          question: 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules.',
          hint: 'If stuck on ploidy changes, re-watch c11_bio_cbse_10_006/007 focusing on DNA content per.',
          misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.',
          parts: [
                { id: 'a', prompt: 'A histology slide shows a seminiferous tubule cross-section with large cells having prominent nucleoli near the basement membrane, smaller cells with condensed.', answer: 'The large basal cells are Type B spermatogonia / early primary spermatocytes',
                  options: ['The large basal cells are Type B spermatogonia / early primary spermatocytes', 'spermatozoa are abundant', 'lumen is full of sperm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.' }
          ],
            remediations: { 'spermatogenesis-meiosis-only-and-forget': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to lock ploidy/DNA-content changes.', 'Draw a flowchart: Type A_s → (mitosis) → Type A_paired → Type A_aligned → Type B → (mitosis) → Primary spermatocyte.', 'Watch a 3-min animation of spermatogenic cycle (stages I–XII) to visualize the wave.', 'Re-attempt Diagnostic Q3 and Q5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a rodent model to test whether Sertoli-cell-derived androgen-binding protein (ABP) is necessary for maintaining high.', answer: 'Knock out ABP gene specifically in Sertoli cells (Cre-lox system)',
                  options: ['Knock out ABP gene specifically in Sertoli cells (Cre-lox system)', 'spermatogenesis = meiosis only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.' }
          ],
            remediations: { 'spermatogenesis-meiosis-only-and-forget': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to lock ploidy/DNA-content changes.', 'Draw a flowchart: Type A_s → (mitosis) → Type A_paired → Type A_aligned → Type B → (mitosis) → Primary spermatocyte.', 'Watch a 3-min animation of spermatogenic cycle (stages I–XII) to visualize the wave.', 'Re-attempt Diagnostic Q3 and Q5.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_004', difficulty: 'standard',
          question: 'Oogenesis is the process of formation and maturation of the female gamete.',
          hint: 'If stuck, review c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II).',
          misconception: 'Students often think that the "egg" released at ovulation is a mature ovum (haploid, 23 chromosomes, single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Oogenesis is the process of formation and maturation of the female gamete (ovum) in the',
                  options: ['Oogenesis is the process of formation and maturation of the female gamete (ovum) in the', 'The female reproductive system comprises the ovaries (paired gonads that produce ova and', 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the', 'Gametogenesis is the process of formation of haploid male and female gametes (sperm and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "egg" released at ovulation is a mature ovum (haploid, 23 chromosomes, single chromatids).' }
          ],
            remediations: { 'the-egg-released-at-ovulation': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to solidify the distinction between.', 'Draw a timeline from fetal life to fertilization, marking each meiotic stage, arrest point, and the hormone that.', 'Practice a NEET‑style question: "At ovulation, the human egg is at which stage of meiosis?" until you consistently.', 'If confusion persists, watch a 5‑minute animation of human oogenesis focusing on the asymmetric divisions and polar.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_005', difficulty: 'standard',
          question: 'Gametogenesis is the process of formation of haploid male and female gametes.',
          hint: 'If confused about chromosome vs chromatid counting, revisit c11_bio_cbse_10_006 (Meiosis.',
          misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they.',
          parts: [
                { id: 'a', prompt: 'A Class 12 student states: "Spermatogenesis and oogenesis both involve meiosis, so they both produce four haploid gametes from one diploid germ cell." Identify.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'meiosis produces four cells', 'why only one ovum is formed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' },
                { id: 'b', prompt: 'Compare the role of Sertoli cells in spermatogenesis with granulosa cells in oogenesis.', answer: 'Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight',
                  options: ['Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight', 'nourishment', 'why only one ovum is formed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' }
          ],
            remediations: { 'oogenesis-produces-one-egg-and': { steps: ['Revisit Class 11 meiosis node c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus on.', 'Watch a time-lapse video of mouse oocyte meiosis I (available on YouTube: "oocyte asymmetric division") to visualise.', 'Draw side-by-side comparison: spermatocyte (central spindle, equal cytokinesis) vs oocyte (cortical spindle, asymmetric.', 'Re-attempt Diagnostic Question 1 and 2. If still stuck, review c11_bio_cbse_19_005 (Gonad hormones) for hormonal.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Spermiogenesis is simply the maturation of spermatids into spermatozoa; no cell division occurs, so it cannot be affected by mutations in.', answer: 'The claim is false',
                  options: ['The claim is false', 'why only one ovum is formed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' },
                { id: 'b', prompt: 'Compare the role of Sertoli cells in spermatogenesis with granulosa cells in oogenesis.', answer: 'Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight',
                  options: ['Sertoli cells (in seminiferous tubules) form the blood-testis barrier via tight', 'nourishment', 'why only one ovum is formed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "oogenesis produces one egg and three polar bodies, all of equal size and genetic content" — they apply the symmetric.' }
          ],
            remediations: { 'oogenesis-produces-one-egg-and': { steps: ['Revisit Class 11 meiosis node c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) — focus on.', 'Watch a time-lapse video of mouse oocyte meiosis I (available on YouTube: "oocyte asymmetric division") to visualise.', 'Draw side-by-side comparison: spermatocyte (central spindle, equal cytokinesis) vs oocyte (cortical spindle, asymmetric.', 'Re-attempt Diagnostic Question 1 and 2. If still stuck, review c11_bio_cbse_19_005 (Gonad hormones) for hormonal.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
