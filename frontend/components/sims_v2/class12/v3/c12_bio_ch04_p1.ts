import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch04_p1: SimDef = {
    id: 'v3_c12_bio_ch04_p1',
    title: 'Reproductive Health · Part 1/2',
    subtitle: 'No pills, no surgery — can a family still be planned? Absolutely.',
    classLevel: 12, subject: 'biology', topic: 'Reproductive Health · Part 1/2',
    chapters: ['c12_bio_ch04'],
    nodeIds: ['c12_bio_cbse_04_001', 'c12_bio_cbse_04_002', 'c12_bio_cbse_04_003', 'c12_bio_cbse_04_004', 'c12_bio_cbse_04_005', 'c12_bio_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Community health counsellor', intro: 'Reproductive health is where biology meets real life — choices, dignity and well-being included.', goal: 'Define reproductive health per WHO and compare natural and barrier contraceptive methods.' },
    discovery: {
        question: 'A couple tells an ASHA worker: no pills, no surgery — but we want to plan our family. Which methods remain available to them?',
        options: ['Natural methods like periodic abstinence and lactational amenorrhoea, plus barriers like condoms', 'Nothing — effective contraception requires either drugs or devices', 'Only surgical options, since natural methods are unreliable by definition', 'Only hormone-free IUDs, which count as natural methods'],
        answer: 'Natural methods like periodic abstinence and lactational amenorrhoea, plus barriers like condoms',
        hook: 'Students think contraception means intervention — but behavioural awareness and physical barriers prevent fertilisation without any drug, which is exactly why counselling starts with the full menu, not the prescription.',
    },
    teaching: [
        { title: 'Reproductive Health: Definition and Scope', text: 'Reproductive health is a state of complete physical, mental, and social well‑being in all matters relating to the reproductive system and its functions and processes, not merely the absence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_bio_cbse_04_001', title: 'Reproductive Health: Definition and Scope',
          caseStudy: { intro: 'Start by asking students to recall the WHO definition of health they learned in Class 8 (c8_bio_ch2_1: “Health: Definition (Physical, Mental, and Social.',
            decisions: [{ prompt: 'State the WHO definition of reproductive health in your own words, highlighting the three dimensions of well‑being it includes.', options: [
                { text: 'Correct answer: Reproductive health is a state of complete physical, mental, and social', outcome: 'Correct answer: Reproductive health is a state of complete physical, mental, and social well‑being.' },
                { text: 'social well‑being', outcome: 'Not quite — Students often think reproductive health is synonymous with “family planning” or “contraception”.', reveals: 'reproductive-health-is-synonymous-with' },
                { text: 'freedom to decide', outcome: 'Not quite — Students often think reproductive health is synonymous with “family planning” or “contraception”.', reveals: 'reproductive-health-is-synonymous-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_04_003', title: 'Contraceptive Methods: IUDs, Pills, Surgical',
          scaffold: { problem: 'A 24-year-old nulliparous woman chooses Cu-T 380A IUD. Six months later she presents with heavy, painful periods.',
            steps: [
            { text: 'Identify the device — Cu-T 380A is a copper-releasing IUD; copper ions (Cu²⁺) are continuously released into uterine.' },
            { text: 'Recall copper\'s effect on uterine environment — Cu²⁺ induces sterile inflammatory response: influx of leukocytes.' },
            { text: 'Link to symptoms — Prostaglandins cause vasodilation (heavier bleeding) and myometrial contractions.' },
            { text: 'Contrast with hormonal IUD (LNG-20) — Levonorgestrel (LNG) released locally → binds endometrial progesterone receptors.' },
            { text: 'Conclude — Switching to LNG-20 replaces pro-inflammatory copper with anti-proliferative progestin, reversing the.', faded: true, blankAnswer: 'Cu-T causes menorrhagia/dysmenorrhea via copper-induced.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_004', title: 'Medical Termination of Pregnancy (MTP)',
          caseStudy: { intro: 'Imagine a 22-year-old college student in Delhi who discovers she is 8 weeks pregnant after a contraceptive failure.',
            decisions: [{ prompt: 'What is the maximum gestational limit for MTP under the Medical Termination of Pregnancy (Amendment) Act, 2021 for a pregnancy resulting.', options: [
                { text: 'The maximum gestational limit is 24 weeks for contraceptive failure in married women (as', outcome: 'The maximum gestational limit is 24 weeks for contraceptive failure in married women (as per the.' },
                { text: 'MTP is illegal in India or that any abortion after 20 weeks is criminal', outcome: 'Not quite — Students often think MTP is illegal in India or that any abortion after 20 weeks is criminal.', reveals: 'mtp-is-illegal-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_005', title: 'Sexually Transmitted Diseases (STDs): Types and Prevention',
          caseStudy: { intro: 'Imagine a 19-year-old college student in Delhi who notices a painless ulcer on the genitals after unprotected sex — this could be the primary chancre.',
            decisions: [{ prompt: 'Name the causative agents of gonorrhoea, syphilis, and chlamydiasis, and state one common symptom shared by all three.', options: [
                { text: 'Gonorrhoea: Neisseria gonorrhoeae (bacterium)', outcome: 'Gonorrhoea: Neisseria gonorrhoeae (bacterium); Syphilis: Treponema pallidum (spirochaete.' },
                { text: 'STD = HIV', outcome: 'Not quite — Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.', reveals: 'std-hiv-and-believe-all' },
                { text: 'viruses or fungi', outcome: 'Not quite — Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.', reveals: 'std-hiv-and-believe-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_006', title: 'Infertility: Causes and Assisted Reproductive Technologies',
          caseStudy: { intro: 'Imagine a 32-year-old woman in Delhi who has been trying to conceive for 18 months with regular unprotected intercourse — she represents the 1 in 6 Indian.',
            decisions: [{ prompt: 'A couple has been trying to conceive for 10 months with regular unprotected intercourse.', options: [
                { text: 'No', outcome: 'No. The standard definition requires 12 months of regular unprotected intercourse without.' },
                { text: 'yes, investigate now', outcome: 'Not quite — Students believe "test tube baby" means the embryo develops entirely in a test tube until birth.', reveals: 'test-tube-baby-means-the' },
                { text: 'test tube baby', outcome: 'Not quite — Students believe "test tube baby" means the embryo develops entirely in a test tube until birth.', reveals: 'test-tube-baby-means-the' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Reproductive Health · Part 1/2', spots: [
            { id: 's1', label: 'Reproductive Health Definition and Scope', prompt: 'Which idea is this? — Reproductive health is a state of complete physical, mental, and social well‑being in all.', answer: 'Reproductive Health Definition and Scope', options: ['Reproductive Health Definition and Scope', 'Contraceptive Methods Natural and Barrier', 'Contraceptive Methods IUDs Pills Surgical', 'Medical Termination of Pregnancy MTP'] },
            { id: 's2', label: 'Contraceptive Methods Natural and Barrier', prompt: 'Which idea is this? — Natural contraceptive methods prevent pregnancy by avoiding fertilization through.', answer: 'Contraceptive Methods Natural and Barrier', options: ['Contraceptive Methods Natural and Barrier', 'Reproductive Health Definition and Scope', 'Contraceptive Methods IUDs Pills Surgical', 'Medical Termination of Pregnancy MTP'] },
            { id: 's3', label: 'Contraceptive Methods IUDs Pills Surgical', prompt: 'Which idea is this? — Contraceptive methods in this category are clinical or surgical interventions that.', answer: 'Contraceptive Methods IUDs Pills Surgical', options: ['Contraceptive Methods IUDs Pills Surgical', 'Reproductive Health Definition and Scope', 'Contraceptive Methods Natural and Barrier', 'Medical Termination of Pregnancy MTP'] },
            { id: 's4', label: 'Medical Termination of Pregnancy MTP', prompt: 'Which idea is this? — Medical Termination of Pregnancy (MTP) is the intentional termination of a pregnancy.', answer: 'Medical Termination of Pregnancy MTP', options: ['Medical Termination of Pregnancy MTP', 'Reproductive Health Definition and Scope', 'Contraceptive Methods Natural and Barrier', 'Contraceptive Methods IUDs Pills Surgical'] },
            { id: 's5', label: 'Sexually Transmitted Diseases STDs Types and Prevention', prompt: 'Which idea is this? — Sexually Transmitted Diseases (STDs) are infections transmitted primarily through.', answer: 'Sexually Transmitted Diseases STDs Types and Prevention', options: ['Sexually Transmitted Diseases STDs Types and Prevention', 'Reproductive Health Definition and Scope', 'Contraceptive Methods Natural and Barrier', 'Contraceptive Methods IUDs Pills Surgical'] },
            { id: 's6', label: 'Infertility Causes and Assisted Reproductive Technologies', prompt: 'Which idea is this? — Infertility is the inability of a sexually active, non-contracepting couple to achieve.', answer: 'Infertility Causes and Assisted Reproductive Technologies', options: ['Infertility Causes and Assisted Reproductive Technologies', 'Reproductive Health Definition and Scope', 'Contraceptive Methods Natural and Barrier', 'Contraceptive Methods IUDs Pills Surgical'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student volunteers at a community reproductive-health camp that offers only condom distribution and STI screening. The organiser declares: \'Disease-free plus contraception — that\'s reproductive health covered.\'',
            decisions: [{ prompt: 'Does the camp meet the WHO definition?', options: [
                { text: 'No — reproductive health also means mental and social well-being and the freedom to decide if, when and how often to reproduce; add counselling on consent, menstrual hygiene and infertility support.', outcome: 'The WHO definition is rights-based and holistic: absence of disease is necessary but a person can be disease-free yet coerced, stigmatised or uninformed.' },
                { text: 'Yes — eliminate infections and supply contraceptives and reproductive health is achieved.', outcome: 'That covers only physical well-being; a population could be STI-free yet face child marriage or zero contraceptive choice — still unhealthy by WHO standards.', reveals: 'sti-free-is-repro-health' },
                { text: 'Yes — reproductive health is basically family planning, and contraceptive supply is family planning.', outcome: 'Family planning is one slice; the definition spans physical, mental and social well-being plus reproductive autonomy.', reveals: 'repro-health-is-contraception' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now understand reproductive health as well-being, not just biology. Contraception comparison is board-critical — and this knowledge genuinely changes lives in public health.',
            decisions: [{ prompt: 'What comes next? Reproductive Health · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reproductive Health · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_001', difficulty: 'standard',
          question: 'Reproductive health is a state of complete physical, mental, and social.',
          hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive.',
          misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence.',
          parts: [
                { id: 'a', prompt: 'Explain why the WHO definition of reproductive health goes beyond the mere absence of reproductive tract infections or diseases.', answer: 'Correct answer: The definition explicitly includes positive aspects',
                  options: ['Correct answer: The definition explicitly includes positive aspects', 'family planning', 'contraception', 'absence of STDs'],
                  hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive system.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' },
                { id: 'b', prompt: 'A 16‑year‑old girl in a rural Indian village is married early, has no access to menstrual hygiene products, and is pressured to conceive immediately.', answer: 'Correct answer: (1) Physical well‑being',
                  options: ['Correct answer: (1) Physical well‑being', 'early marriage is bad', 'family planning', 'contraception'],
                  hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive system.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' }
          ],
            remediations: { 'reproductive-health-is-synonymous-with': { steps: ['Re‑read the WHO definition from the NCERT textbook (Chapter 4, opening paragraph).', 'Create a three‑column table: General Health (Class 8) | Reproductive Health (Class 12) | New Dimensions Added.', 'Fill it using c8_bio_ch2_1 and this node.', 'Watch the 5‑minute video “Reproductive Health: WHO Definition” (NCERT official).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “If a country eliminates all sexually transmitted infections, it has achieved reproductive health for its population.” Justify your.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'family planning', 'contraception', 'absence of STDs'],
                  hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive system.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' },
                { id: 'b', prompt: 'Design a one‑page poster for a school health programme that communicates the four pillars of reproductive health to adolescents.', answer: 'Expected answer: Poster with four quadrants: (1) “शरीर की देखभाल” (Physical)',
                  options: ['Expected answer: Poster with four quadrants: (1) “शरीर की देखभाल” (Physical)', 'family planning', 'contraception', 'absence of STDs'],
                  hint: 'If stuck, revisit c8_bio_ch2_1 (Health definition) and c9_bio_ch3_9 (Human reproductive system.',
                  misconception: 'Students often think reproductive health is synonymous with “family planning” or “contraception” or simply “absence of STDs”.' }
          ],
            remediations: { 'reproductive-health-is-synonymous-with': { steps: ['Re‑read the WHO definition from the NCERT textbook (Chapter 4, opening paragraph).', 'Create a three‑column table: General Health (Class 8) | Reproductive Health (Class 12) | New Dimensions Added.', 'Fill it using c8_bio_ch2_1 and this node.', 'Watch the 5‑minute video “Reproductive Health: WHO Definition” (NCERT official).'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_002', difficulty: 'standard',
          question: 'Natural contraceptive methods prevent pregnancy by avoiding fertilization.',
          hint: 'If stuck, revisit the menstrual cycle hormonal graph (estrogen/LH/progesterone vs days).',
          misconception: 'Students often believe that "natural methods are completely safe and have no side effects, so they are always the best.',
          parts: [
                { id: 'a', prompt: 'Explain why the withdrawal method (coitus interruptus) has a high failure rate despite being a natural method that prevents sperm deposition in the vagina.', answer: 'The withdrawal method fails frequently',
                  options: ['The withdrawal method fails frequently', 'withdrawal is 100% effective if done correctly'],
                  hint: 'If stuck, revisit the menstrual cycle hormonal graph (estrogen/LH/progesterone vs days) from.',
                  misconception: 'Students often believe that "natural methods are completely safe and have no side effects, so they are always the best choice." This.' },
                { id: 'b', prompt: 'A couple uses the lactational amenorrhea method (LAM) for contraception.', answer: 'Yes, LAM is likely effective (up to 98% if all three criteria are met)',
                  options: ['Yes, LAM is likely effective (up to 98% if all three criteria are met)', 'breastfeeding always prevents pregnancy'],
                  hint: 'If stuck, revisit the menstrual cycle hormonal graph (estrogen/LH/progesterone vs days) from.',
                  misconception: 'Students often believe that "natural methods are completely safe and have no side effects, so they are always the best choice." This.' }
          ],
            remediations: { 'natural-methods-are-completely-safe': { steps: ['If the student holds this misconception, have them: (1) Calculate the typical-use Pearl Index for each method from.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_003', difficulty: 'standard',
          question: 'Contraceptive methods in this category are clinical or surgical interventions.',
          hint: 'Revisit c11_bio_cbse_19_001 (Hypothalamus and Pituitary) and c11_bio_cbse_19_005 (Gonad.',
          misconception: 'Students believe: (1) "IUDs cause abortion" — WRONG: Copper IUDs impair sperm motility/viability and prevent.',
          parts: [
                { id: 'a', prompt: 'Name the three main categories of IUDs available in India\'s National Family Planning Programme and give one example of each with its effective lifespan.', answer: 'The three categories are: (1) Non-medicated/inert IUDs',
                  options: ['The three categories are: (1) Non-medicated/inert IUDs', 'condom', 'IUDs cause abortion', 'condom" as an IUD type or confusing Cu-T with hormonal IUD'],
                  hint: 'Revisit c11_bio_cbse_19_001 (Hypothalamus and Pituitary) and c11_bio_cbse_19_005 (Gonad Hormones).',
                  misconception: 'Students believe: (1) "IUDs cause abortion" — WRONG: Copper IUDs impair sperm motility/viability and prevent fertilization; hormonal IUDs.' }
          ],
            remediations: { '1-iuds-cause-abortion-wrong': { steps: ['If student holds the "IUD = abortion" misconception: Step 1 — Revisit fertilization vs implantation timeline.', 'Step 2 — Review IUD mechanism: Cu²⁺ ions → sperm membrane damage, reduced motility, phagocytosis by leukocytes; LNG →.', 'Step 3 — Key distinction: IUD prevents fertilization (primary) or creates hostile endometrium BEFORE implantation;.', 'Step 4 — Re-diagnostic: "Explain why a copper IUD inserted 5 days after unprotected intercourse can act as emergency.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_004', difficulty: 'standard',
          question: 'Medical Termination of Pregnancy (MTP) is the intentional termination of.',
          hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilization, implantation, placenta) and.',
          misconception: 'Students often think MTP is illegal in India or that any abortion after 20 weeks is criminal.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old unmarried girl presents at 10 weeks gestation requesting MTP. She is accompanied by her mother.', answer: 'For a minor (<18 years), written consent of a guardian (mother) is required',
                  options: ['For a minor (<18 years), written consent of a guardian (mother) is required', 'MTP is illegal in India or that any abortion after 20 weeks is criminal'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilization, implantation, placenta) and.',
                  misconception: 'Students often think MTP is illegal in India or that any abortion after 20 weeks is criminal.' },
                { id: 'b', prompt: 'Compare vacuum aspiration and dilation & evacuation (D&E) as surgical MTP methods in terms of gestational age range, mechanism, and typical setting.', answer: 'Vacuum aspiration (manual or electric) is used up to 12-14 weeks',
                  options: ['Vacuum aspiration (manual or electric) is used up to 12-14 weeks', 'MTP is illegal in India or that any abortion after 20 weeks is criminal'],
                  hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilization, implantation, placenta) and.',
                  misconception: 'Students often think MTP is illegal in India or that any abortion after 20 weeks is criminal.' }
          ],
            remediations: { 'mtp-is-illegal-in-india': { steps: ['If the student holds the above misconceptions, guide them to: (1) Re-read the MTP Act amendment 2021 summary in the.', '(2) Create a table comparing pre-2021 and post-2021 gestational limits for each category.', '(3) Role-play a counseling scenario for a minor seeking MTP to practice explaining consent rules.', '(4) Review the pharmacology of mifepristone and misoprostol from Class 12 Chemistry (hormones/drugs) or the prior node.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_005', difficulty: 'standard',
          question: 'Sexually Transmitted Diseases (STDs) are infections transmitted primarily.',
          hint: 'Review c8_bio_ch2_4 (bacterial vs viral diseases) and c11_bio_cbse_02_002 (bacteria.',
          misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.',
          parts: [
                { id: 'a', prompt: 'Name the causative agents of gonorrhoea, syphilis, and chlamydiasis, and state one common symptom shared by all three.', answer: 'Gonorrhoea: Neisseria gonorrhoeae (bacterium)',
                  options: ['Gonorrhoea: Neisseria gonorrhoeae (bacterium)', 'STD = HIV', 'viruses or fungi', '"STD = HIV" and believe all STDs are viral, incurable, and always symptomatic'],
                  hint: 'Review c8_bio_ch2_4 (bacterial vs viral diseases) and c11_bio_cbse_02_002 (bacteria structure).',
                  misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.' },
                { id: 'b', prompt: 'A 24-year-old woman presents with frothy, yellow-green vaginal discharge, vulval itching, and a "strawberry cervix" on examination.', answer: 'STD: Trichomoniasis',
                  options: ['STD: Trichomoniasis', 'Candida, treated with fluconazole', 'STD = HIV', '"STD = HIV" and believe all STDs are viral, incurable, and always symptomatic'],
                  hint: 'Review c8_bio_ch2_4 (bacterial vs viral diseases) and c11_bio_cbse_02_002 (bacteria structure).',
                  misconception: 'Students think "STD = HIV" and believe all STDs are viral, incurable, and always symptomatic.' }
          ],
            remediations: { 'std-hiv-and-believe-all': { steps: ['Revisit c9_bio_ch3_12 (STIs: Prevention and Awareness) to recall basic transmission routes.', 'Make a 4×4 table: rows = pathogen type (Bacteria, Virus, Protozoan, Fungus); columns = Disease, Agent, Key Symptom.', 'Practice two case-based questions (like Diagnostic Q3) identifying STD from symptom cluster.', 'Re-attempt Diagnostic Q1–Q3; if still wrong, watch 10-min video on "STD classification and syndromic management" and.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_006', difficulty: 'standard',
          question: 'Infertility is the inability of a sexually active, non-contracepting couple.',
          hint: 'If stuck, review c10_bio_cbse_03_010 (fertilization steps) and c11_bio_cbse_19_005.',
          misconception: 'Students believe "test tube baby" means the embryo develops entirely in a test tube until birth.',
          parts: [
                { id: 'a', prompt: 'A couple presents with 2 years of infertility. Female: regular 28-day cycles, normal hysterosalpingography (both tubes patent), normal Day 21 progesterone.', answer: 'Intrauterine insemination (IUI) with ovarian stimulation is first-line',
                  options: ['Intrauterine insemination (IUI) with ovarian stimulation is first-line', 'test tube baby', '"test tube baby" means the embryo develops entirely in a test tube until birth'],
                  hint: 'If stuck, review c10_bio_cbse_03_010 (fertilization steps) and c11_bio_cbse_19_005 (hormonal.',
                  misconception: 'Students believe "test tube baby" means the embryo develops entirely in a test tube until birth.' }
          ],
            remediations: { 'test-tube-baby-means-the': { steps: ['Revisit c10_bio_cbse_03_010 (fertilization, implantation, placenta) — trace the sperm path and implantation site.', 'Review c11_bio_cbse_19_005 (gonad hormones) — link FSH/LH to spermatogenesis/oogenesis.', 'Create a table mapping each infertility cause (cervical, tubal, ovulatory, male factor) to the ART that bypasses it.', 'Practice 5 case-based questions from past NEET papers identifying the correct ART for each scenario.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
