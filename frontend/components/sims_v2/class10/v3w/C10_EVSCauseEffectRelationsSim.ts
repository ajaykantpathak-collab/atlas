import type { SimDef } from '../../engine/types';
import C10_EVSCauseEffectRelationsSim from '../../../simulations/c6_12/C10_EVSCauseEffectRelationsSim';

/** v3 wrapped master — C10_EVSCauseEffectRelationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_evscauseeffectrelationssim: SimDef = {
    id: 'v3w_c10_evscauseeffectrelationssim',
    title: 'Reproductive Health: Contraception Methods and Their Importance',
    subtitle: 'This node covers the classification, mechanism, and importance of contraceptive methods.',
    classLevel: 10, subject: 'evs', topic: 'Reproductive Health: Contraception Methods and Their Importance',
    chapters: [],
    nodeIds: ['c10_bio_cbse_03_011', 'c10_chem_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine seeing a government poster in your neighbourhood clinic showing a small family with the message "Hum.', goal: 'Master Reproductive Health: Contraception Methods and Their Importance.' },
    discovery: {
        question: 'Name any four contraceptive methods and state the category (barrier, chemical, surgical, natural) each belongs to.',
        options: ['Condom (barrier), Oral contraceptive pills (chemical), Vasectomy', 'copper-T', 'killing the egg'],
        answer: 'Condom (barrier), Oral contraceptive pills (chemical), Vasectomy',
        hook: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing.',
    },
    teaching: [
        { title: 'Contraception refers to the deliberate use.', text: 'Contraception refers to the deliberate use of artificial methods, devices, or practices to prevent pregnancy by interfering with the process of fertilisation or implantation.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_bio_cbse_03_011', title: 'Contraception refers to the deliberate.',
          scaffold: { problem: 'A 28-year-old woman in a rural Indian village has had three children in four years.',
            steps: [
            { text: 'Identify the key constraints — anaemia (hormonal methods may affect iron metabolism), need for long-term spacing (3+.' },
            { text: 'Recall contraceptive categories and their features — barrier (condom: requires action each time, high typical-use.' },
            { text: 'Match Copper-T to constraints — non-hormonal (safe for anaemia), effective 5-10 years (meets 3-year spacing), single.' },
            { text: 'Verify against medical eligibility — Copper-T is WHO Category 1 (no restriction) for anaemic women; unlike hormonal.' },
            { text: 'Conclude with counselling points — explain insertion procedure, possible side effects (heavier periods), need for.', faded: true, blankAnswer: 'Copper-T (intrauterine device) is the most suitable method..' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_01_010', title: 'Rancidity is the slow oxidation of fats.',
          scaffold: { problem: 'A manufacturer packs 200 g of roasted peanuts (oil content 45%) in two types of packaging: (A) simple polythene bag, (B) nitrogen-flushed.',
            steps: [
            { text: 'Identify the reactants — peanut oil (triglycerides with unsaturated fatty acids like oleic and linoleic acid) and.' },
            { text: 'Recognise that polythene bag (A) is permeable to oxygen over time, allowing continuous O₂ diffusion to the oil surface.' },
            { text: 'In nitrogen-flushed pouch (B), the headspace oxygen is displaced by inert N₂, drastically reducing the concentration of.' },
            { text: 'Apply the rate law concept: rate of oxidation ∝ [O₂] × [unsaturated sites].' },
            { text: 'Metallised layer also blocks light (UV), preventing photo-initiation of free radicals — a second kinetic barrier.' },
            { text: 'Conclude: Sample A undergoes aerobic oxidation continuously; sample B is protected by both reactant removal (N₂.', faded: true, blankAnswer: 'Sample A allows continuous oxygen supply and light.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_chem_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Reproductive Health: Contraception Methods and Their Importance', spots: [
            { id: 's1', label: 'Contraception refers to the deliberate', prompt: 'Which idea is this? — Contraception refers to the deliberate use of artificial methods, devices, or practices.', answer: 'Contraception refers to the deliberate', options: ['Contraception refers to the deliberate', 'Rancidity is the slow oxidation'] },
            { id: 's2', label: 'Rancidity is the slow oxidation', prompt: 'Which idea is this? — Rancidity is the slow oxidation of fats and oils (triglycerides) in food materials by.', answer: 'Rancidity is the slow oxidation', options: ['Rancidity is the slow oxidation', 'Contraception refers to the deliberate'] }
          ] } }
    ],
    explore: { component: C10_EVSCauseEffectRelationsSim, prompt: 'Explore the interactive — Reproductive Health: Contraception Methods and Their Importance' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_011', difficulty: 'standard',
          question: 'Contraception refers to the deliberate use of artificial methods, devices, or.',
          hint: 'If stuck, revisit c10_bio_cbse_03_010 (fertilisation and implantation) and.',
          misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing.',
          parts: [
                { id: 'a', prompt: 'Name any four contraceptive methods and state the category (barrier, chemical, surgical, natural) each belongs to.', answer: 'Condom (barrier), Oral contraceptive pills (chemical), Vasectomy',
                  options: ['Correct answer: Condom (barrier), Oral contraceptive pills (chemical), Vasectomy', 'copper-T', 'killing the egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' },
                { id: 'b', prompt: 'A newly married couple wants to delay their first child by two years but plans to have children later.', answer: 'Copper-T (intrauterine device) is ideal',
                  options: ['Correct answer: Copper-T (intrauterine device) is ideal', 'no daily action', 'minimal hormonal side effects'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' },
                { id: 'c', prompt: 'Compare the effectiveness of surgical methods (vasectomy/tubectomy) versus natural methods (rhythm/withdrawal) in preventing pregnancy.', answer: 'Surgical methods are nearly 100% effective',
                  options: ['Correct answer: Surgical methods are nearly 100% effective', 'surgical is better', 'killing the egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' }
          ],
            remediations: { 'all-hormonal-contraceptives-pills': { steps: ['Revisit c10_bio_cbse_03_010 fertilisation and implantation steps — draw a timeline: ovulation → fertilisation.', 'Map each contraceptive method to its intervention point on this timeline (e.g., pills at ovulation, condom at.', 'Explicitly contrast with medical termination of pregnancy (MTP) which occurs after implantation — not covered in Class.', 'Practice writing one-line mechanisms for each method using verbs: "suppresses ovulation", "blocks sperm entry",.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Contraception is only needed for population control; if a country has low population density, contraceptive access is not a public.', answer: 'The statement is incorrect',
                  options: ['Correct answer: The statement is incorrect', 'killing the egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' },
                { id: 'b', prompt: 'Design a simple awareness activity for Class 10 students to demonstrate the difference in failure rates between contraceptive methods.', answer: 'Expected answer: Activity',
                  options: ['Expected answer: Activity', 'killing the egg'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that all hormonal contraceptives (pills, implants, injections) work by "killing the egg" or causing abortion.' }
          ],
            remediations: { 'all-hormonal-contraceptives-pills': { steps: ['Revisit c10_bio_cbse_03_010 fertilisation and implantation steps — draw a timeline: ovulation → fertilisation.', 'Map each contraceptive method to its intervention point on this timeline (e.g., pills at ovulation, condom at.', 'Explicitly contrast with medical termination of pregnancy (MTP) which occurs after implantation — not covered in Class.', 'Practice writing one-line mechanisms for each method using verbs: "suppresses ovulation", "blocks sperm entry",.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_010', difficulty: 'standard',
          question: 'Rancidity is the slow oxidation of fats and oils (triglycerides) in food.',
          hint: 'Revisit c10_chem_cbse_01_007 for oxidation definition and c9_chem_ch3_4 for covalent.',
          misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.',
          parts: [
                { id: 'a', prompt: 'Compare the role of BHA (butylated hydroxyanisole) added to packaged snacks with the role of nitrogen gas flushing in preventing rancidity.', answer: 'Nitrogen flushing removes the reactant (oxygen) from the environment',
                  options: ['Nitrogen flushing removes the reactant (oxygen) from the environment', 'remove oxygen', 'slow down reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.' }
          ],
            remediations: { 'students-often-write-rancidity-is': { steps: ['Show two butter samples — one kept in fridge (covered), one on windowsill (open). After 3 days, smell both.', 'Ask: "Which one smells like old paint? Did bacteria grow on the fridge sample?" Guide to: no visible mould, yet smell.', 'Write the word equation: Fat + Oxygen → Aldehydes/Ketones (rancid smell).', 'Emphasise: no water, no bacteria needed — only air and unsaturated bonds.', 'Have student redefine rancidity in their own words using "oxidation", "oxygen", "unsaturated fats", "volatile.'] } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Refrigeration prevents rancidity because cold temperatures stop oxidation reactions completely." Evaluate this statement and correct it.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'rate reduction', 'reaction stoppage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.' },
                { id: 'b', prompt: 'Compare the role of BHA (butylated hydroxyanisole) added to packaged snacks with the role of nitrogen gas flushing in preventing rancidity.', answer: 'Nitrogen flushing removes the reactant (oxygen) from the environment',
                  options: ['Nitrogen flushing removes the reactant (oxygen) from the environment', 'remove oxygen', 'slow down reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.' }
          ],
            remediations: { 'students-often-write-rancidity-is': { steps: ['Show two butter samples — one kept in fridge (covered), one on windowsill (open). After 3 days, smell both.', 'Ask: "Which one smells like old paint? Did bacteria grow on the fridge sample?" Guide to: no visible mould, yet smell.', 'Write the word equation: Fat + Oxygen → Aldehydes/Ketones (rancid smell).', 'Emphasise: no water, no bacteria needed — only air and unsaturated bonds.', 'Have student redefine rancidity in their own words using "oxidation", "oxygen", "unsaturated fats", "volatile.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
