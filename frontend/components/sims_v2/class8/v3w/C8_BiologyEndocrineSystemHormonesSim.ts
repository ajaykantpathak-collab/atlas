import type { SimDef } from '../../engine/types';
import C8_BiologyEndocrineSystemHormonesSim from '../../../simulations/c6_12/C8_BiologyEndocrineSystemHormonesSim';

/** v3 wrapped master — C8_BiologyEndocrineSystemHormonesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_biologyendocrinesystemhormonessim: SimDef = {
    id: 'v3w_c8_biologyendocrinesystemhormonessim',
    title: 'Endocrine System Hormones',
    subtitle: 'Covers the definitions of mental health, stress, and anxiety, their physiological effects.',
    classLevel: 8, subject: 'biology', topic: 'Mental Health: Stress, Anxiety, and Well-Being',
    chapters: [],
    nodeIds: ['c8_bio_ch2_11'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Observe how your body reacts when you are running late for school or facing an unexpected examination.', goal: 'Master Endocrine System Hormones.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Mental health refers to a state of.', text: 'Mental health refers to a state of emotional, psychological, and social well-being in a person, where stress and anxiety are managed effectively to maintain homeostasis in daily life.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_bio_ch2_11', title: 'Mental health refers to a state of.',
          scaffold: { problem: 'A student studying for board exams experiences persistent headaches, lack of sleep, and high anxiety over three weeks.',
            steps: [
            { text: 'Identify the primary stress hormone being excessively secreted over the 3-week period (cortisol).' },
            { text: 'Determine the effect of prolonged high cortisol levels on the body (muscle tension leading to headaches, sleep cycle.' },
            { text: 'Connect the psychological pressure of exams to the physiological endocrine response.' },
            { text: 'Propose two evidence-based restorative actions: regular physical exercise (to release endorphins and use up stress.' },
            { text: 'Verify that these actions counteract chronic stress by restoring neurotransmitter and hormone balance.', faded: true, blankAnswer: 'Prolonged cortisol elevation causes headaches and insomnia;.' }
            ] } }
    ],
    explore: { component: C8_BiologyEndocrineSystemHormonesSim, prompt: 'Explore the interactive — Endocrine System Hormones' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_bio_ch2_11', difficulty: 'standard',
          question: 'Mental health refers to a state of emotional, psychological, and social.',
          hint: 'Review the basics of health definitions and how organ systems coordinate in c8_bio_ch2_1.',
          misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as.',
          parts: [
                { id: 'a', prompt: 'What is the primary physiological hormone released by the adrenal glands during acute stress that prepares the body for a "fight or flight" response?', answer: 'The correct answer is adrenaline (or epinephrine/cortisol)',
                  options: ['The correct answer is adrenaline (or epinephrine/cortisol)', 'just in the mind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as purely imaginary or.' },
                { id: 'b', prompt: 'Analyze the relationship between physical health (such as a balanced diet and regular sleep) and mental well-being (such as stress management).', answer: 'The correct answer is that a balanced diet provides essential amino acids and',
                  options: ['The correct answer is that a balanced diet provides essential amino acids and', 'just in the mind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as purely imaginary or.' }
          ],
            remediations: { 'mental-health-has-no-physical': { steps: ['To correct this, guide the student through a simple observation of their own body: ask them to recall a time they felt.', 'Explain that these physical changes are caused by real chemical messengers (hormones) traveling through their blood,.'] } } },
        { type: 'subpart', nodeId: 'c8_bio_ch2_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All stress is harmful and should be completely eliminated from a student\'s life." Is this scientifically accurate?', answer: 'The correct answer is that the statement is inaccurate',
                  options: ['The correct answer is that the statement is inaccurate', 'just in the mind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as purely imaginary or.' },
                { id: 'b', prompt: 'Analyze the relationship between physical health (such as a balanced diet and regular sleep) and mental well-being (such as stress management).', answer: 'The correct answer is that a balanced diet provides essential amino acids and',
                  options: ['The correct answer is that a balanced diet provides essential amino acids and', 'just in the mind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mental health has no physical or chemical basis in the body, viewing stress and anxiety as purely imaginary or.' }
          ],
            remediations: { 'mental-health-has-no-physical': { steps: ['To correct this, guide the student through a simple observation of their own body: ask them to recall a time they felt.', 'Explain that these physical changes are caused by real chemical messengers (hormones) traveling through their blood,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
