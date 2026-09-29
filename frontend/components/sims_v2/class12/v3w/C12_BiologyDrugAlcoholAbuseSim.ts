import type { SimDef } from '../../engine/types';
import C12_BiologyDrugAlcoholAbuseSim from '../../../simulations/c6_12/C12_BiologyDrugAlcoholAbuseSim';

/** v3 wrapped master — C12_BiologyDrugAlcoholAbuseSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologydrugalcoholabusesim: SimDef = {
    id: 'v3w_c12_biologydrugalcoholabusesim',
    title: 'Drug and Alcohol Abuse: Effects on Health',
    subtitle: 'Covers: classification of commonly abused drugs (depressants, stimulants, hallucinogens,.',
    classLevel: 12, subject: 'biology', topic: 'Drug and Alcohol Abuse: Effects on Health',
    chapters: [],
    nodeIds: ['c12_bio_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a person who consumes alcohol daily: initially they feel relaxed, but over time they need more to get.', goal: 'Master Drug and Alcohol Abuse: Effects on Health.' },
    discovery: {
        question: 'Name the neurotransmitter primarily involved in the brain\'s reward pathway that is hijacked by almost all addictive drugs, and state the specific brain region.',
        options: ['Dopamine is the key neurotransmitter', 'serotonin', 'adrenaline'],
        answer: 'Dopamine is the key neurotransmitter',
        hook: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
    },
    teaching: [
        { title: 'Drug and alcohol abuse refers to the.', text: 'Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive substances (such as opioids, cannabinoids, cocaine, barbiturates, amphetamines, and alcohol) that leads to physical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_08_009', title: 'Drug and alcohol abuse refers to the.',
          scaffold: { problem: 'A 30-year-old construction worker drinks 180 mL of whiskey (40% v/v ethanol) daily for 10 years. He attempts to quit abruptly.',
            steps: [
            { text: 'Calculate daily ethanol intake: 180 mL × 0.40 = 72 mL pure ethanol ≈ 57 g/day (density 0.79 g/mL).' },
            { text: 'Recall chronic alcohol\'s dual action: potentiates GABA_A receptors (inhibition) and inhibits NMDA glutamate receptors.' },
            { text: 'Neuroadaptation: chronic exposure → downregulation of GABA_A receptors, upregulation of NMDA receptors.' },
            { text: 'Abrupt cessation removes alcohol\'s depressant effect. Unopposed glutamatergic excitation + reduced GABAergic inhibition.' },
            { text: 'Timeline: 6-12h: tremor, anxiety, insomnia (autonomic hyperactivity); 12-24h: hallucinations (visual, auditory);.', faded: true, blankAnswer: 'He will experience autonomic hyperactivity within 6-12h,.' }
            ] } }
    ],
    explore: { component: C12_BiologyDrugAlcoholAbuseSim, prompt: 'Explore the interactive — Drug and Alcohol Abuse: Effects on Health' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_009', difficulty: 'standard',
          question: 'Drug and alcohol abuse refers to the chronic, non-medical use of psychoactive.',
          hint: 'If stuck, revisit Class 11 Neural Control and Coordination: specifically the synapse.',
          misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
          parts: [
                { id: 'a', prompt: 'Name the neurotransmitter primarily involved in the brain\'s reward pathway that is hijacked by almost all addictive drugs, and state the specific brain region.', answer: 'Dopamine is the key neurotransmitter',
                  options: ['Correct answer: Dopamine is the key neurotransmitter', 'serotonin', 'adrenaline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'b', prompt: 'Explain why a chronic alcohol user develops tolerance and experiences withdrawal symptoms like tremors and seizures when they stop drinking, linking your.', answer: 'Alcohol enhances GABAergic inhibition and inhibits glutamatergic',
                  options: ['Correct answer: Alcohol enhances GABAergic inhibition and inhibits glutamatergic', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' },
                { id: 'c', prompt: 'A 25-year-old male injects heroin daily. He develops pinpoint pupils, respiratory depression, and constipation.', answer: 'Heroin is an opioid',
                  options: ['Correct answer: Heroin is an opioid', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' }
          ],
            remediations: { 'addiction-is-just-a-lack': { steps: ['Show the PET scan comparison (normal vs addicted brain) highlighting reduced dopamine D2 receptors in striatum and.', 'Walk through the alcohol withdrawal timeline (6-12h: tremor, anxiety; 12-48h: hallucinations; 48-72h: seizures,.', 'Assign a case study of a patient with opioid use disorder on buprenorphine maintenance to illustrate that.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since alcohol is legal and widely consumed, it cannot be as harmful as heroin." Evaluate this statement using three evidence-based criteria:.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'addiction is just a lack of willpower', 'withdrawal is only psychological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "addiction is just a lack of willpower" and that "withdrawal is only psychological." The exact wrong reasoning: they.' }
          ],
            remediations: { 'addiction-is-just-a-lack': { steps: ['Show the PET scan comparison (normal vs addicted brain) highlighting reduced dopamine D2 receptors in striatum and.', 'Walk through the alcohol withdrawal timeline (6-12h: tremor, anxiety; 12-48h: hallucinations; 48-72h: seizures,.', 'Assign a case study of a patient with opioid use disorder on buprenorphine maintenance to illustrate that.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
