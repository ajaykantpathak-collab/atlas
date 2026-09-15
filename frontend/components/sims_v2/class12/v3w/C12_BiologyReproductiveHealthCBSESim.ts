import type { SimDef } from '../../engine/types';
import C12_BiologyReproductiveHealthCBSESim from '../../../simulations/c6_12_new/C12_BiologyReproductiveHealthCBSESim';

/** v3 wrapped master — C12_BiologyReproductiveHealthCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologyreproductivehealthcbsesim: SimDef = {
    id: 'v3w_c12_biologyreproductivehealthcbsesim',
    title: 'Reproductive Health CBSE',
    subtitle: 'Covers: spermatogonial mitosis, primary/secondary spermatocyte meiosis, spermiogenesis.',
    classLevel: 12, subject: 'biology', topic: 'Gametogenesis: Spermatogenesis',
    chapters: [],
    nodeIds: ['c12_bio_cbse_03_003', 'c12_bio_cbse_03_009', 'c12_bio_cbse_04_001', 'c12_bio_cbse_04_005', 'c12_bio_cbse_04_007', 'c12_bio_cbse_09_002', 'c12_bio_cbse_03_001', 'c12_bio_cbse_03_002', 'c12_bio_cbse_03_006', 'c12_bio_cbse_03_008', 'c12_bio_cbse_09_001', 'c12_bio_cbse_09_003', 'c12_bio_cbse_08_002', 'c12_bio_cbse_08_008', 'c12_bio_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world observation: a healthy adult male produces ~100–300 million sperm daily — ask "How.', goal: 'Master Reproductive Health CBSE.' },
    discovery: {
        question: 'A histology slide shows a seminiferous tubule cross-section with large cells having prominent nucleoli near the basement membrane, smaller cells with condensed.',
        options: ['The large basal cells are Type B spermatogonia / early primary spermatocytes', 'spermatozoa are abundant', 'lumen is full of sperm'],
        answer: 'The large basal cells are Type B spermatogonia / early primary spermatocytes',
        hook: 'Students often think "spermatogenesis = meiosis only" and forget the mitotic stem-cell amplification phase.',
    },
    teaching: [
        { title: 'Spermatogenesis is the continuous, cyclic.', text: 'Spermatogenesis is the continuous, cyclic process in the seminiferous tubules of the testes where diploid spermatogonia undergo mitotic proliferation, meiotic division, and spermiogenesis to produce.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'case', nodeId: 'c12_bio_cbse_03_009', title: 'Parturition is the.',
          caseStudy: { intro: 'Imagine a pregnant woman at 40 weeks gestation experiencing regular uterine contractions that grow stronger and closer together — this is the onset of labour,.',
            decisions: [{ prompt: 'What is the immediate trigger for the foetal ejection reflex, and which hormone is released from the maternal posterior pituitary in.', options: [
                { text: 'The foetal ejection reflex is triggered by mild uterine contractions caused by signals', outcome: 'The foetal ejection reflex is triggered by mild uterine contractions caused by signals from the.' },
                { text: 'progesterone withdrawal triggers oxytocin', outcome: 'Not quite — Students often think that oxytocin is released *only* during labour and that its role ends at.', reveals: 'oxytocin-is-released-only-during' },
                { text: 'oxytocin is released *only* during labour and that its role ends at delivery', outcome: 'Not quite — Students often think that oxytocin is released *only* during labour and that its role ends at.', reveals: 'oxytocin-is-released-only-during' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_04_001', title: 'Reproductive health is a state of.',
          scaffold: { problem: 'A community health worker is designing a reproductive health awareness camp for newly married couples in a semi‑urban area.',
            steps: [
            { text: 'Recall the four core components of reproductive health: physical, mental, social well‑being; reproductive system.' },
            { text: 'Map her plan: contraceptive distribution and STI screening address only physical well‑being (disease prevention) and.' },
            { text: 'Identify gaps: mental well‑being (counselling for anxiety, consent), social well‑being (gender communication, stigma.' },
            { text: 'Propose additions: (a) interactive sessions on communication, consent, and mutual decision‑making (covers mental,.' },
            { text: 'Conclude that a holistic camp must integrate all four pillars to meet the WHO definition.', faded: true, blankAnswer: 'The plan is incomplete because it covers only physical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_04_005', title: 'Sexually Transmitted Diseases (STDs).',
          scaffold: { problem: 'A 22-year-old male presents with a single, painless, indurated ulcer on the penis with clean base and non-tender inguinal lymphadenopathy.',
            steps: [
            { text: 'Recognise "painless indurated ulcer + non-tender lymphadenopathy + 3-week incubation" = primary syphilis chancre.' },
            { text: 'Recall causative agent: Treponema pallidum (spirochaete bacterium, cannot be cultured on artificial media).' },
            { text: 'Determine stage: Primary syphilis (chancre appears 10-90 days post-exposure, heals spontaneously in 3-6 weeks).' },
            { text: 'Select diagnostic test: Dark-field microscopy of ulcer exudate (direct visualisation of motile spirochaetes) OR.' },
            { text: 'Note treatment: Benzathine penicillin G 2.4 MU IM single dose; partner notification essential.', faded: true, blankAnswer: 'Primary syphilis; Treponema pallidum; Dark-field microscopy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_04_007', title: 'IVF (In Vitro Fertilization), ZIFT.',
          scaffold: { problem: 'A 28-year-old woman has bilateral tubal blockage due to pelvic inflammatory disease. Her husband’s semen analysis is normal.',
            steps: [
            { text: 'Identify the infertility cause — tubal blockage prevents natural fertilization and embryo transport.' },
            { text: 'Recall ART options — IVF fertilizes in vitro and transfers embryo to uterus, bypassing tubes; ZIFT fertilizes in vitro.' },
            { text: 'Select IVF because it completely bypasses the fallopian tubes (fertilization in dish, embryo transfer to uterus).' },
            { text: 'Outline IVF steps: (i) Controlled ovarian hyperstimulation with gonadotropins; (ii) Transvaginal oocyte retrieval under.' },
            { text: 'Conclude that IVF is the standard first-line ART for tubal factor infertility with normal sperm.', faded: true, blankAnswer: 'IVF is recommended. Key steps: ovarian stimulation → oocyte.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_002', title: 'Dairy farm management is the systematic.',
          scaffold: { problem: 'A farmer has a 500 kg Holstein-Friesian crossbred cow in early lactation (60 days in milk) yielding 30 kg milk with 3.8% fat and 3.2%.',
            steps: [
            { text: 'Calculate DMI and nutrient supply from each ingredient. Maize silage: 15×0.30 = 4.5 kg DM, NE_L = 4.5×0.65 = 2.925.' },
            { text: 'Total DMI = 4.5+4.5+5.4 = 14.4 kg DM (2.88% BW — slightly low for 30 L yielder, target 3.5% = 17.5 kg).' },
            { text: 'Calculate requirement. Maintenance NE_L (500 kg) = 0.08×BW^0.75 = 0.08×105.7 = 8.46 Mcal.' },
            { text: 'MP requirement: Maintenance MP = 3.0×BW^0.75 = 317 g. Milk MP = 30 kg × (32g CP/kg milk × 0.67 efficiency) = 641 g.' },
            { text: 'Conclusion: Ration severely energy-deficient. Cow will lose body condition (mobilize fat → NEFA → ketosis risk).', faded: true, blankAnswer: 'Ration provides 14.4 kg DMI (deficit 3.1 kg), 14.4 Mcal.' }
            ] } }
    ],
    explore: { component: C12_BiologyReproductiveHealthCBSESim, prompt: 'Explore the interactive — Reproductive Health CBSE' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_009', difficulty: 'standard',
          question: 'Parturition is the neuroendocrine-driven process of expelling the fully.',
          hint: 'Review the hypothalamic-pituitary-ovarian axis (c12_bio_cbse_03_005) and the mechanism of.',
          misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.',
          parts: [
                { id: 'a', prompt: 'A woman delivers a healthy baby at term. Within hours, she notices a thick, yellowish fluid from her breasts.', answer: 'The fluid is colostrum',
                  options: ['The fluid is colostrum', 'colostrum is mature milk', 'suckling starts colostrum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.' }
          ],
            remediations: { 'oxytocin-is-released-only-during': { steps: ['If a student confuses the hormones of lactation, have them draw a two-column table: Column 1 = Process (Milk Synthesis.', 'Fill it using the worked examples.', 'Then ask them to trace the suckling reflex arc: nipple mechanoreceptors → spinal cord → hypothalamus → posterior.', 'Revisit c11_bio_cbse_19_001 (hypothalamic-pituitary axes) and c11_bio_cbse_19_007 (peptide hormone action) to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Exclusive breastfeeding for six months is a highly reliable contraceptive method because prolactin permanently suppresses ovulation.".', answer: 'Correct: Exclusive breastfeeding can suppress ovulation (lactational amenorrhea)',
                  options: ['Correct: Exclusive breastfeeding can suppress ovulation (lactational amenorrhea)', 'high prolactin blocks ovaries directly', 'oxytocin is released *only* during labour and that its role ends at delivery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.' }
          ],
            remediations: { 'oxytocin-is-released-only-during': { steps: ['If a student confuses the hormones of lactation, have them draw a two-column table: Column 1 = Process (Milk Synthesis.', 'Fill it using the worked examples.', 'Then ask them to trace the suckling reflex arc: nipple mechanoreceptors → spinal cord → hypothalamus → posterior.', 'Revisit c11_bio_cbse_19_001 (hypothalamic-pituitary axes) and c11_bio_cbse_19_007 (peptide hormone action) to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_001', difficulty: 'standard',
          question: 'Reproductive health is a state of complete physical, mental, and social.',
          hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive.',
          misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of.',
          parts: [
                { id: 'a', prompt: 'Explain why the WHO definition of reproductive health goes beyond the mere absence of reproductive tract infections or diseases.', answer: 'Correct answer: The definition explicitly includes positive aspects',
                  options: ['Correct answer: The definition explicitly includes positive aspects', 'family planning', 'contraception'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' },
                { id: 'b', prompt: 'A 16‑year‑old girl in a rural Indian village is married early, has no access to menstrual hygiene products, and is pressured to conceive immediately.', answer: 'Correct answer: (1) Physical well‑being',
                  options: ['Correct answer: (1) Physical well‑being', 'early marriage is bad', 'family planning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' }
          ],
            remediations: { 'reproductive-health-is-synonymous-with': { steps: ['Re‑read the WHO definition from the NCERT textbook (Chapter 4, opening paragraph).', 'Create a three‑column table: General Health (Class 8) | Reproductive Health (Class 12) | New Dimensions Added.', 'Fill it using c8_bio_ch2_1 and this node.', 'Watch the 5‑minute video “Reproductive Health: WHO Definition” (NCERT official).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “If a country eliminates all sexually transmitted infections, it has achieved reproductive health for its population.” Justify your.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'family planning', 'contraception', 'absence of STDs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' },
                { id: 'b', prompt: 'Design a one‑page poster for a school health programme that communicates the four pillars of reproductive health to adolescents.', answer: 'Expected answer: Poster with four quadrants: (1) “शरीर की देखभाल” (Physical)',
                  options: ['Expected answer: Poster with four quadrants: (1) “शरीर की देखभाल” (Physical)', 'family planning', 'contraception', 'absence of STDs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' }
          ],
            remediations: { 'reproductive-health-is-synonymous-with': { steps: ['Re‑read the WHO definition from the NCERT textbook (Chapter 4, opening paragraph).', 'Create a three‑column table: General Health (Class 8) | Reproductive Health (Class 12) | New Dimensions Added.', 'Fill it using c8_bio_ch2_1 and this node.', 'Watch the 5‑minute video “Reproductive Health: WHO Definition” (NCERT official).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_005', difficulty: 'standard',
          question: 'Sexually Transmitted Diseases (STDs) are infections transmitted primarily.',
          hint: 'Review c8_bio_ch2_4 (bacterial vs viral diseases) and c11_bio_cbse_02_002 (bacteria.',
          misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.',
          parts: [
                { id: 'a', prompt: 'Name the causative agents of gonorrhoea, syphilis, and chlamydiasis, and state one common symptom shared by all three.', answer: 'Gonorrhoea: Neisseria gonorrhoeae (bacterium)',
                  options: ['Gonorrhoea: Neisseria gonorrhoeae (bacterium)', 'STD = HIV', '"STD = HIV" and believe all STDs are viral, incurable, and always symptomatic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.' },
                { id: 'b', prompt: 'A 24-year-old woman presents with frothy, yellow-green vaginal discharge, vulval itching, and a "strawberry cervix" on examination.', answer: 'STD: Trichomoniasis',
                  options: ['STD: Trichomoniasis', 'Candida, treated with fluconazole', 'STD = HIV'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.' }
          ],
            remediations: { 'std-hiv-and-believe-all': { steps: ['Revisit c9_bio_ch3_12 (STIs: Prevention and Awareness) to recall basic transmission routes.', 'Make a 4×4 table: rows = pathogen type (Bacteria, Virus, Protozoan, Fungus); columns = Disease, Agent, Key Symptom,.', 'Practice two case-based questions (like Diagnostic Q3) identifying STD from symptom cluster.', 'Re-attempt Diagnostic Q1–Q3; if still wrong, watch 10-min video on "STD classification and syndromic management" and.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_007', difficulty: 'standard',
          question: 'IVF (In Vitro Fertilization), ZIFT (Zygote Intrafallopian Transfer), and GIFT.',
          hint: 'Revisit c10_bio_cbse_03_010 (Fertilisation, Implantation and Placenta in Humans) and.',
          misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.',
          parts: [
                { id: 'a', prompt: 'A couple presents with the following: the male has severe oligospermia (very low sperm count) and the female has patent (open) fallopian tubes.', answer: 'IVF is most appropriate',
                  options: ['IVF is most appropriate', 'tube-related'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' },
                { id: 'b', prompt: 'Compare IVF and GIFT on two parameters: (a) site of fertilization, and (b) requirement for functional fallopian tubes. Which technique is more invasive and why?', answer: 'site of fertilization, and (',
                  options: ['site of fertilization, and (', 'tube-related'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' }
          ],
            remediations: { 'students-often-conflate-zift-and': { steps: ['Revisit the comparison table in the NCERT text (Chapter 4, Reproductive Health) and create a three-column table:.', 'For each technique, draw a one-sentence cartoon: "IVF: dish → uterus", "ZIFT: dish → tube", "GIFT: tube → tube".', 'Practice with three case vignettes (blocked tubes, low sperm, unexplained) and justify the chosen ART aloud.', 'If confusion persists, watch a 5-minute animated video of each procedure (search "IVF ZIFT GIFT animation") and label.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.',
          parts: [
                { id: 'a', prompt: 'A fertility clinic advertises: "GIFT has a higher success rate than IVF for all types of infertility." Evaluate this claim using biological reasoning.', answer: 'The claim is false',
                  options: ['The claim is false', 'tube-related'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' },
                { id: 'b', prompt: 'Compare IVF and GIFT on two parameters: (a) site of fertilization, and (b) requirement for functional fallopian tubes. Which technique is more invasive and why?', answer: 'site of fertilization, and (',
                  options: ['site of fertilization, and (', 'tube-related'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' }
          ],
            remediations: { 'students-often-conflate-zift-and': { steps: ['Revisit the comparison table in the NCERT text (Chapter 4, Reproductive Health) and create a three-column table:.', 'For each technique, draw a one-sentence cartoon: "IVF: dish → uterus", "ZIFT: dish → tube", "GIFT: tube → tube".', 'Practice with three case vignettes (blocked tubes, low sperm, unexplained) and justify the chosen ART aloud.', 'If confusion persists, watch a 5-minute animated video of each procedure (search "IVF ZIFT GIFT animation") and label.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_002', difficulty: 'standard',
          question: 'Dairy farm management is the systematic application of scientific principles to.',
          hint: 'If stuck on energy partitioning, revisit c11_bio_cbse_12_005 (Krebs Cycle) and.',
          misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
          parts: [
                { id: 'a', prompt: 'A dairy farmer feeds his crossbred cow 30 kg green maize fodder, 4 kg wheat straw, and 2 kg concentrate mixture daily. The cow yields 15 L milk with 3.5% fat.', answer: 'DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM',
                  options: ['DMI = (30×0.20) + (4×0.90) + (2×0.90) = 6 + 3.6 + 1.8 = 11.4 kg DM', 'more concentrate = more milk', 'energy density of diet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'b', prompt: 'Why is it physiologically harmful to milk a cow with full udder without pre-milking teat stimulation (fore-stripping, udder wash, massage) for at least 60-90.', answer: 'Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →',
                  options: ['Teat stimulation triggers neuroendocrine reflex: afferent nerves → spinal cord →', 'cleaning teats', 'more concentrate = more milk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' },
                { id: 'c', prompt: 'A farmer switches his 10 Holstein-Friesian crossbred cows from individual stall feeding to a loose housing system with group feeding of TMR.', answer: 'Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing',
                  options: ['Step 1: Loose housing requires ≥4.5 m²/cow bedded area + 3.5 m²/cow loafing', 'stress', 'more concentrate = more milk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' }
          ],
            remediations: { 'more-concentrate-more-milk-and': { steps: ['Revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) — understand enzyme pH optimum (cellulases denature at pH.', 'Revisit c11_bio_cbse_12_005 (Krebs Cycle) — trace how rumen VFA (acetate, propionate, butyrate) enter host metabolism.', 'Use ICAR feeding standard tables to formulate a 15 kg DM ration for 20 L yielder with 40% NDF, 16% CP — calculate.', 'Re-diagnostic: Given a cow with milk fat 2.8%, rumen pH 5.5, suggest 3 specific ration changes with physiological.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Feeding 50 g bypass protein (rumen-undegradable protein) per kg concentrate to early lactation cows always increases milk protein.', answer: 'Partially true but incomplete',
                  options: ['Partially true but incomplete', 'more concentrate = more milk', 'energy density of diet', 'energy available to cow'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "more concentrate = more milk" and feed 70-80% concentrate to high yielders.' }
          ],
            remediations: { 'more-concentrate-more-milk-and': { steps: ['Revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) — understand enzyme pH optimum (cellulases denature at pH.', 'Revisit c11_bio_cbse_12_005 (Krebs Cycle) — trace how rumen VFA (acetate, propionate, butyrate) enter host metabolism.', 'Use ICAR feeding standard tables to formulate a 15 kg DM ration for 20 L yielder with 40% NDF, 16% CP — calculate.', 'Re-diagnostic: Given a cow with milk fat 2.8%, rumen pH 5.5, suggest 3 specific ration changes with physiological.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
