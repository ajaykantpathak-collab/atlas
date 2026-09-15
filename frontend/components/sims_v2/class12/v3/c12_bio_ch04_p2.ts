import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch04_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch04_p2: SimDef = {
    id: 'v3_c12_bio_ch04_p2',
    title: 'Reproductive Health · Part 2/2',
    subtitle: 'No pills, no surgery — can a family still be planned? Absolutely.',
    classLevel: 12, subject: 'biology', topic: 'Reproductive Health · Part 2/2',
    chapters: ['c12_bio_ch04'],
    nodeIds: ['c12_bio_cbse_04_007', 'c12_bio_cbse_04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Community health counsellor', intro: 'Reproductive health is where biology meets real life — choices, dignity and well-being included.', goal: 'Define reproductive health per WHO and compare natural and barrier contraceptive methods.' },
    discovery: {
        question: 'A couple tells an ASHA worker: no pills, no surgery — but we want to plan our family. Which methods remain available to them?',
        options: ['Natural methods like periodic abstinence and lactational amenorrhoea, plus barriers like condoms', 'Nothing — effective contraception requires either drugs or devices', 'Only surgical options, since natural methods are unreliable by definition', 'Only hormone-free IUDs, which count as natural methods'],
        answer: 'Natural methods like periodic abstinence and lactational amenorrhoea, plus barriers like condoms',
        hook: 'Students think contraception means intervention — but behavioural awareness and physical barriers prevent fertilisation without any drug, which is exactly why counselling starts with the full menu, not the prescription.',
    },
    teaching: [
        { title: 'IVF, ZIFT, GIFT: Assisted Reproductive Techniques', text: 'IVF (In Vitro Fertilization), ZIFT (Zygote Intrafallopian Transfer), and GIFT (Gamete Intrafallopian Transfer) are assisted reproductive techniques where fertilization is achieved outside the natural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c12_bio_cbse_04_007', title: 'IVF, ZIFT, GIFT: Assisted Reproductive Techniques',
          caseStudy: { intro: 'Imagine a couple in your neighbourhood who have been trying to conceive for two years without success; the woman has blocked fallopian tubes and the man has.',
            decisions: [{ prompt: 'Define IVF and state where fertilization and embryo transfer occur in this procedure.', options: [
                { text: 'IVF (In Vitro Fertilization) involves fertilizing an oocyte with sperm in a laboratory', outcome: 'IVF (In Vitro Fertilization) involves fertilizing an oocyte with sperm in a laboratory culture dish.' },
                { text: 'tube-related', outcome: 'Not quite — Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.', reveals: 'students-often-conflate-zift-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_04_008', title: 'Population Stabilisation and Family Planning',
          scaffold: { problem: 'In a rural block of 1,20,000 population, the ANM recorded 2,160 live births and 720 deaths in 2023. The TFR estimated from SRS is 3.0.',
            steps: [
            { text: 'Calculate CBR = (2160 / 120000) × 1000 = 18 per 1000.' },
            { text: 'Calculate CDR = (720 / 120000) × 1000 = 6 per 1000.' },
            { text: 'Growth rate r = (CBR - CDR)/10 = (18 - 6)/10 = 1.2% per annum.' },
            { text: 'Estimate married women in reproductive age (MWRA) = 120000 × 0.5 (approx) × 0.5 (approx married) = 30,000.' },
            { text: 'Verify: TFR 3.0 to 2.1 requires ~30% fertility decline. Spacing method increase from 15% to 35% of MWRA (20 percentage.', faded: true, blankAnswer: 'CBR = 18, CDR = 6, Growth rate = 1.2% per year. Required.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Reproductive Health · Part 2/2', spots: [
            { id: 's1', label: 'IVF ZIFT GIFT Assisted Reproductive Techniques', prompt: 'Which idea is this? — IVF (In Vitro Fertilization), ZIFT (Zygote Intrafallopian Transfer), and GIFT (Gamete.', answer: 'IVF ZIFT GIFT Assisted Reproductive Techniques', options: ['IVF ZIFT GIFT Assisted Reproductive Techniques', 'Population Stabilisation and Family Planning'] },
            { id: 's2', label: 'Population Stabilisation and Family Planning', prompt: 'Which idea is this? — Population stabilisation refers to achieving a state where the population size remains.', answer: 'Population Stabilisation and Family Planning', options: ['Population Stabilisation and Family Planning', 'IVF ZIFT GIFT Assisted Reproductive Techniques'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student volunteers at a community reproductive-health camp that offers only condom distribution and STI screening. The organiser declares: \'Disease-free plus contraception — that\'s reproductive health covered.\'',
            decisions: [{ prompt: 'Does the camp meet the WHO definition?', options: [
                { text: 'No — reproductive health also means mental and social well-being and the freedom to decide if, when and how often to reproduce; add counselling on consent, menstrual hygiene and infertility support.', outcome: 'The WHO definition is rights-based and holistic: absence of disease is necessary but a person can be disease-free yet coerced, stigmatised or uninformed.' },
                { text: 'Yes — eliminate infections and supply contraceptives and reproductive health is achieved.', outcome: 'That covers only physical well-being; a population could be STI-free yet face child marriage or zero contraceptive choice — still unhealthy by WHO standards.', reveals: 'sti-free-is-repro-health' },
                { text: 'Yes — reproductive health is basically family planning, and contraceptive supply is family planning.', outcome: 'Family planning is one slice; the definition spans physical, mental and social well-being plus reproductive autonomy.', reveals: 'repro-health-is-contraception' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_04_008', title: 'You made it',
          caseStudy: { intro: 'You now understand reproductive health as well-being, not just biology. Contraception comparison is board-critical — and this knowledge genuinely changes lives in public health.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_007', difficulty: 'standard',
          question: 'IVF (In Vitro Fertilization), ZIFT (Zygote Intrafallopian Transfer), and GIFT.',
          hint: 'Revisit c10_bio_cbse_03_010 (Fertilisation, Implantation and Placenta in Humans) and.',
          misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.',
          parts: [
                { id: 'a', prompt: 'A couple presents with the following: the male has severe oligospermia (very low sperm count) and the female has patent (open) fallopian tubes.', answer: 'IVF is most appropriate',
                  options: ['IVF is most appropriate', 'tube-related'],
                  hint: 'Revisit c10_bio_cbse_03_010 (Fertilisation, Implantation and Placenta in Humans) and.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' },
                { id: 'b', prompt: 'Compare IVF and GIFT on two parameters: (a) site of fertilization, and (b) requirement for functional fallopian tubes. Which technique is more invasive and why?', answer: 'site of fertilization, and (',
                  options: ['site of fertilization, and (', 'tube-related'],
                  hint: 'Revisit c10_bio_cbse_03_010 (Fertilisation, Implantation and Placenta in Humans) and.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' }
          ],
            remediations: { 'students-often-conflate-zift-and': { steps: ['Revisit the comparison table in the NCERT text (Chapter 4, Reproductive Health) and create a three-column table.', 'For each technique, draw a one-sentence cartoon: "IVF: dish → uterus", "ZIFT: dish → tube", "GIFT: tube → tube".', 'Practice with three case vignettes (blocked tubes, low sperm, unexplained) and justify the chosen ART aloud.', 'If confusion persists, watch a 5-minute animated video of each procedure (search "IVF ZIFT GIFT animation") and label.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.',
          parts: [
                { id: 'a', prompt: 'A fertility clinic advertises: "GIFT has a higher success rate than IVF for all types of infertility." Evaluate this claim using biological reasoning.', answer: 'The claim is false',
                  options: ['The claim is false', 'tube-related'],
                  hint: 'Revisit c10_bio_cbse_03_010 (Fertilisation, Implantation and Placenta in Humans) and.',
                  misconception: 'Students often conflate ZIFT and GIFT, thinking both involve fertilization in the laboratory.' }
          ],
            remediations: { 'students-often-conflate-zift-and': { steps: ['Revisit the comparison table in the NCERT text (Chapter 4, Reproductive Health) and create a three-column table.', 'For each technique, draw a one-sentence cartoon: "IVF: dish → uterus", "ZIFT: dish → tube", "GIFT: tube → tube".', 'Practice with three case vignettes (blocked tubes, low sperm, unexplained) and justify the chosen ART aloud.', 'If confusion persists, watch a 5-minute animated video of each procedure (search "IVF ZIFT GIFT animation") and label.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_04_008', difficulty: 'standard',
          question: 'Population stabilisation refers to achieving a state where the population size.',
          hint: 'If unable to classify methods, revisit c12_bio_cbse_04_002 and c12_bio_cbse_04_003.',
          misconception: 'Students often believe "population stabilisation means zero population growth immediately after TFR reaches 2.1." The.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of promoting female sterilisation versus promoting spacing methods (IUCD, injectables) on the age-specific fertility rate (ASFR) curve and.', answer: 'Female sterilisation (terminal method) truncates the ASFR curve at the age of',
                  options: ['Female sterilisation (terminal method) truncates the ASFR curve at the age of', 'both reduce TFR equally'],
                  hint: 'If unable to classify methods, revisit c12_bio_cbse_04_002 and c12_bio_cbse_04_003; create a table.',
                  misconception: 'Students often believe "population stabilisation means zero population growth immediately after TFR reaches 2.1." The exact error: they.' }
          ],
            remediations: { 'population-stabilisation-means-zero-population': { steps: ['Revisit node c12_bio_cbse_04_002 (barrier/natural methods) and c12_bio_cbse_04_003 (IUCDs, pills, surgical) to recall.', 'Draw the age pyramid for India (Census 2011) and identify the 10-24 age group bulge.', 'Calculate: if 1000 women aged 20-24 have TFR 2.1, how many births in next 5 years?', 'Compare with 1000 women aged 35-39.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
