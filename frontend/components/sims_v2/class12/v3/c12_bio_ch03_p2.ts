import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch03_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch03_p2: SimDef = {
    id: 'v3_c12_bio_ch03_p2',
    title: 'Human Reproduction · Part 2/2',
    subtitle: 'Why sperm needs a cooler room — and other design logic of human reproduction.',
    classLevel: 12, subject: 'biology', topic: 'Human Reproduction · Part 2/2',
    chapters: ['c12_bio_ch03'],
    nodeIds: ['c12_bio_cbse_03_007', 'c12_bio_cbse_03_008', 'c12_bio_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Medical student tracing the gamete\'s journey', intro: 'Every structure here exists because a gamete demanded it — anatomy is frozen function.', goal: 'Describe the anatomy and histology of male and female reproductive systems and their ducts.' },
    discovery: {
        question: 'The testes sit outside the abdominal cavity in the scrotum — a seemingly odd design. Why does sperm production demand it?',
        options: ['Spermatogenesis needs a temperature a few degrees below core body temperature', 'The scrotum protects testes from the pressure of the abdominal muscles', 'Sperm can only mature where oxygen concentration is highest', 'External placement allows the vas deferens to shorten its transport route'],
        answer: 'Spermatogenesis needs a temperature a few degrees below core body temperature',
        hook: 'It looks like an anatomical accident; it\'s a thermal requirement. The scrotum is a cooling system — and the same logic explains undescended-testis infertility in clinical practice.',
    },
    teaching: [
        { title: 'Implantation and Placenta Formation', text: 'Implantation is the process by which the human blastocyst (day 6-7 post-fertilization) attaches to and embeds into the receptive endometrium of the uterus, initiating the formation of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_03_007', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Map both reproductive systems end-to-end: trace sperm from seminiferous tubules through the duct system, and ova from ovary through fimbriae to uterus — matching each structure to its function.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_007', title: 'Implantation and Placenta Formation',
          caseStudy: { intro: 'Imagine a couple trying to conceive — they know fertilization happens in the fallopian tube, but pregnancy tests only turn positive weeks later. Why the delay?',
            decisions: [{ prompt: 'A human blastocyst typically implants in the uterine endometrium on which day post-fertilization, and what structural event must precede.', options: [
                { text: 'Day 6-7 post-fertilization', outcome: 'Day 6-7 post-fertilization; the blastocyst must first hatch from the zona pellucida.' },
                { text: 'day 1-2', outcome: 'Not quite — Students believe implantation occurs immediately after fertilization (day 1-2) because they.', reveals: 'implantation-occurs-immediately-after-fertilizat' },
                { text: 'day 14', outcome: 'Not quite — Students believe implantation occurs immediately after fertilization (day 1-2) because they.', reveals: 'implantation-occurs-immediately-after-fertilizat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_008', title: 'Pregnancy and Embryonic Development',
          caseStudy: { intro: 'Begin by asking the student to recall the journey of the zygote from the fallopian tube to the uterus — a journey they studied in the fertilization and.',
            decisions: [{ prompt: 'What is the name of the solid ball of 16–32 cells formed by successive mitotic divisions of the zygote without an increase in overall size.', options: [
                { text: 'The structure is the **morula**', outcome: 'The structure is the **morula**; it typically reaches the uterus about **3–4 days after.' },
                { text: 'blastocyst', outcome: 'Not quite — Students often believe that **the embryo receives nutrients directly from maternal blood** across.', reveals: 'the-embryo-receives-nutrients-directly' },
                { text: 'gastrula', outcome: 'Not quite — Students often believe that **the embryo receives nutrients directly from maternal blood** across.', reveals: 'the-embryo-receives-nutrients-directly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_009', title: 'Parturition and Lactation',
          caseStudy: { intro: 'Imagine a pregnant woman at 40 weeks gestation experiencing regular uterine contractions that grow stronger and closer together — this is the onset of labour.',
            decisions: [{ prompt: 'What is the immediate trigger for the foetal ejection reflex, and which hormone is released from the maternal posterior pituitary.', options: [
                { text: 'The foetal ejection reflex is triggered by mild uterine contractions caused by signals', outcome: 'The foetal ejection reflex is triggered by mild uterine contractions caused by signals from the.' },
                { text: 'progesterone withdrawal triggers oxytocin', outcome: 'Not quite — Students often think that oxytocin is released *only* during labour and that its role ends.', reveals: 'oxytocin-is-released-only-during' },
                { text: 'oxytocin is released *only* during labour and that its role ends at delivery', outcome: 'Not quite — Students often think that oxytocin is released *only* during labour and that its role ends.', reveals: 'oxytocin-is-released-only-during' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Human Reproduction · Part 2/2', spots: [
            { id: 's1', label: 'Implantation and Placenta Formation', prompt: 'Which idea is this? — Implantation is the process by which the human blastocyst (day 6-7 post-fertilization).', answer: 'Implantation and Placenta Formation', options: ['Implantation and Placenta Formation', 'Pregnancy and Embryonic Development', 'Parturition and Lactation'] },
            { id: 's2', label: 'Pregnancy and Embryonic Development', prompt: 'Which idea is this? — Pregnancy is the physiological state in a female mammal beginning with the implantation.', answer: 'Pregnancy and Embryonic Development', options: ['Pregnancy and Embryonic Development', 'Implantation and Placenta Formation', 'Parturition and Lactation'] },
            { id: 's3', label: 'Parturition and Lactation', prompt: 'Which idea is this? — Parturition is the neuroendocrine-driven process of expelling the fully developed foetus.', answer: 'Parturition and Lactation', options: ['Parturition and Lactation', 'Implantation and Placenta Formation', 'Pregnancy and Embryonic Development'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A relative is anxious before a vasectomy, having heard \'you\'ll produce no semen at all and your manhood hormones will crash\'. His niece, a biology student, is asked what\'s actually true.',
            decisions: [{ prompt: 'What does cutting the vas deferens really do?', options: [
                { text: 'It blocks sperm transport only: semen volume barely drops since most fluid comes from the seminal vesicles and prostate, and testosterone keeps flowing because Leydig cells release it straight into blood.', outcome: 'Sperm are only a small part of ejaculate and testicular hormones don\'t travel down the vas — so contraception happens without ending semen or androgens.' },
                { text: 'He\'s right to worry — all of semen travels through the vas deferens, so cutting it means no ejaculate.', outcome: 'The vas carries only sperm; accessory gland secretions join downstream via their own ducts, so semen volume stays nearly normal.', reveals: 'all-semen-via-vas' },
                { text: 'Testosterone will drop because the testes are disconnected from the body.', outcome: 'Testosterone enters the bloodstream at the testis, not the duct system — spermatogenesis even continues, with sperm phagocytosed in the epididymis.', reveals: 'vasectomy-kills-testosterone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_03_009', title: 'You made it',
          caseStudy: { intro: 'You can now walk a gamete\'s entire journey in either system. Histology of testis and ovary is heavy board weightage — and the literal anatomy of fertility medicine.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_007', difficulty: 'standard',
          question: 'Implantation is the process by which the human blastocyst (day 6-7.',
          hint: 'If stuck on blastocyst structure, review c12_bio_cbse_03_006 cleavage stages.',
          misconception: 'Students believe implantation occurs immediately after fertilization (day 1-2) because they conflate "fertilization.',
          parts: [
                { id: 'a', prompt: 'A human blastocyst typically implants in the uterine endometrium on which day post-fertilization, and what structural event must precede this attachment?', answer: 'Day 6-7 post-fertilization',
                  options: ['Day 6-7 post-fertilization', 'day 1-2', 'day 14', 'fertilization = pregnancy begins'],
                  hint: 'If stuck on blastocyst structure, review c12_bio_cbse_03_006 cleavage stages.',
                  misconception: 'Students believe implantation occurs immediately after fertilization (day 1-2) because they conflate "fertilization = pregnancy begins".' }
          ],
            remediations: { 'implantation-occurs-immediately-after-fertilizat': { steps: ['If the student confuses implantation timing: Revisit c12_bio_cbse_03_006 (Fertilization) and trace the cleavage stages.', 'If the student misassigns umbilical vessel blood types: Draw the fetal circulation circuit on paper (placenta →.', 'Then re-attempt Diagnostic Questions 3 and 4.', 'If hCG role is unclear: Review c12_bio_cbse_03_005 (Menstrual Cycle) luteal phase and corpus luteum function, then map.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe implantation occurs immediately after fertilization (day 1-2) because they conflate "fertilization.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The placenta is a maternal organ because it is inside the mother\'s uterus and made from her endometrial tissue." Evaluate this statement and.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'fertilization = pregnancy begins'],
                  hint: 'If stuck on blastocyst structure, review c12_bio_cbse_03_006 cleavage stages.',
                  misconception: 'Students believe implantation occurs immediately after fertilization (day 1-2) because they conflate "fertilization = pregnancy begins".' },
                { id: 'b', prompt: 'Design a simple flowchart experiment (using only observable events, no molecular tools) that a clinician could use to distinguish between a normal intrauterine.', answer: 'Flowchart: (1) Measure serum hCG every 48h from missed period',
                  options: ['Flowchart: (1) Measure serum hCG every 48h from missed period', 'fertilization = pregnancy begins'],
                  hint: 'If stuck on blastocyst structure, review c12_bio_cbse_03_006 cleavage stages.',
                  misconception: 'Students believe implantation occurs immediately after fertilization (day 1-2) because they conflate "fertilization = pregnancy begins".' }
          ],
            remediations: { 'implantation-occurs-immediately-after-fertilizat': { steps: ['If the student confuses implantation timing: Revisit c12_bio_cbse_03_006 (Fertilization) and trace the cleavage stages.', 'If the student misassigns umbilical vessel blood types: Draw the fetal circulation circuit on paper (placenta →.', 'Then re-attempt Diagnostic Questions 3 and 4.', 'If hCG role is unclear: Review c12_bio_cbse_03_005 (Menstrual Cycle) luteal phase and corpus luteum function, then map.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_008', difficulty: 'standard',
          question: 'Pregnancy is the physiological state in a female mammal beginning with the.',
          hint: 'Revisit **c12_bio_cbse_03_005 (Menstrual Cycle)** for hormonal cyclicity and.',
          misconception: 'Students often believe that **the embryo receives nutrients directly from maternal blood** across a shared circulation.',
          parts: [
                { id: 'a', prompt: 'What is the name of the solid ball of 16–32 cells formed by successive mitotic divisions of the zygote without an increase in overall size, and approximately.', answer: 'The structure is the **morula**',
                  options: ['The structure is the **morula**', 'blastocyst', 'gastrula', 'common blood pool'],
                  hint: 'Revisit **c12_bio_cbse_03_005 (Menstrual Cycle)** for hormonal cyclicity and **c12_bio_cbse_03_007.',
                  misconception: 'Students often believe that **the embryo receives nutrients directly from maternal blood** across a shared circulation, like a "common.' },
                { id: 'b', prompt: 'Why does the corpus luteum persist and enlarge during early pregnancy instead of degenerating as it does in a non-pregnant menstrual cycle?', answer: 'The **syncytiotrophoblast of the implanting blastocyst secretes human chorionic',
                  options: ['The **syncytiotrophoblast of the implanting blastocyst secretes human chorionic', 'progesterone from the pituitary', 'common blood pool'],
                  hint: 'Revisit **c12_bio_cbse_03_005 (Menstrual Cycle)** for hormonal cyclicity and **c12_bio_cbse_03_007.',
                  misconception: 'Students often believe that **the embryo receives nutrients directly from maternal blood** across a shared circulation, like a "common.' }
          ],
            remediations: { 'the-embryo-receives-nutrients-directly': { steps: ['If the student holds the "shared blood" misconception: 1.', 'Have them draw a labeled cross-section of a **chorionic villus at term** (syncytiotrophoblast → cytotrophoblast →.', 'Ask them to trace the path of **oxygen** from maternal intervillous space to fetal hemoglobin — emphasizing each.', 'Contrast with the **yolk sac vitelline circulation** (early, direct) to show why the placental barrier evolves.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_03_009', difficulty: 'standard',
          question: 'Parturition is the neuroendocrine-driven process of expelling the fully.',
          hint: 'Review the hypothalamic-pituitary-ovarian axis (c12_bio_cbse_03_005) and the mechanism.',
          misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.',
          parts: [
                { id: 'a', prompt: 'A woman delivers a healthy baby at term. Within hours, she notices a thick, yellowish fluid from her breasts.', answer: 'The fluid is colostrum',
                  options: ['The fluid is colostrum', 'colostrum is mature milk', 'suckling starts colostrum', 'oxytocin is released *only* during labour and that its role ends at delivery'],
                  hint: 'Review the hypothalamic-pituitary-ovarian axis (c12_bio_cbse_03_005) and the mechanism of peptide.',
                  misconception: 'Students often think that oxytocin is released *only* during labour and that its role ends at delivery.' }
          ],
            remediations: { 'oxytocin-is-released-only-during': { steps: ['If a student confuses the hormones of lactation, have them draw a two-column table: Column 1 = Process (Milk Synthesis.', 'Fill it using the worked examples.', 'Then ask them to trace the suckling reflex arc: nipple mechanoreceptors → spinal cord → hypothalamus → posterior.', 'Revisit c11_bio_cbse_19_001 (hypothalamic-pituitary axes) and c11_bio_cbse_19_007 (peptide hormone action) to reinforce.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
