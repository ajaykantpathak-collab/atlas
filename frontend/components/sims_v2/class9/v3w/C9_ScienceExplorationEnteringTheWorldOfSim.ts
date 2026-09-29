import type { SimDef } from '../../engine/types';
import C9_ScienceExplorationEnteringTheWorldOfSim from '../../../simulations/c6_12/C9_ScienceExplorationEnteringTheWorldOfSim';

/** v3 wrapped master — C9_ScienceExplorationEnteringTheWorldOfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_scienceexplorationenteringtheworldofsim: SimDef = {
    id: 'v3w_c9_scienceexplorationenteringtheworldofsim',
    title: 'Science as a Systematic Study of Nature',
    subtitle: 'This node covers the philosophical and methodological foundations that distinguish.',
    classLevel: 9, subject: 'science', topic: 'Science as a Systematic Study of Nature',
    chapters: [],
    nodeIds: ['c9_physics_ch1_1', 'c9_physics_ch1_10'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Look at the ceiling fan above you — it rotates at a steady speed, but have you wondered how we *know* the.', goal: 'Master Science as a Systematic Study of Nature.' },
    discovery: {
        question: 'A student says: "My grandmother knows that tulsi leaves cure fever because she has seen it work many times.',
        options: ['No, the student is not correct', 'systematic', 'step-by-step procedure'],
        answer: 'No, the student is not correct',
        hook: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).',
    },
    teaching: [
        { title: 'Science as a systematic study of nature is.', text: 'Science as a systematic study of nature is the organized, evidence-based enterprise that builds and organizes knowledge through testable explanations and predictions about the natural world,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch1_1', title: 'Science as a systematic study of nature.',
          scaffold: { problem: 'A student claims: "Drinking warm water every morning reduces body weight." Convert this claim into a scientifically systematic.',
            steps: [
            { text: 'Identify the vague claim and its components — "warm water" (undefined temperature/volume), "every morning" (undefined.' },
            { text: 'Operationalize into a falsifiable hypothesis: "Consuming 250 mL water at 40°C daily for 60 days reduces body mass by.' },
            { text: 'Specify three controlled variables: (a) Daily caloric intake (monitored via food logs), (b) Physical activity level.' },
            { text: 'Design school-level peer review: (a) Protocol reviewed by science teacher and two senior students before start, (b) Raw.' },
            { text: 'State falsification condition: If the mean mass change in warm-water group is not statistically significantly greater.', faded: true, blankAnswer: 'Hypothesis: 250 mL water at 40°C daily for 60 days reduces.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch1_10', title: 'Science and Society: Impact on Daily.',
          scaffold: { problem: 'A village installs a 2 kW solar photovoltaic (PV) system to power a water pump (efficiency 70%) that lifts water from a 20 m deep well.',
            steps: [
            { text: 'Identify given quantities: PV power P_pv = 2 kW = 2000 W, time t = 3 h = 10800 s, pump efficiency η = 0.70, well depth.' },
            { text: 'Identify the energy chain: Electrical energy from PV → Mechanical work by pump → Gravitational potential energy of.' },
            { text: 'Substitute values with units: Electrical energy input E_in = 2000 W × 10800 s = 2.16 × 10⁷ J.' },
            { text: 'Compute mass: m = W_out / (g × h) = (1.512 × 10⁷ J) / (10 m/s² × 20 m) = 75600 kg.' },
            { text: 'Verify reasonableness: 75.6 metric tonnes of water per day from a 2 kW system is plausible for irrigation of a small.', faded: true, blankAnswer: '7.56 × 10⁴ kg/day' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch1_10', title: 'Identify each idea',
          dissect: { specimen: 'Science as a Systematic Study of Nature', spots: [
            { id: 's1', label: 'Science as a systematic study', prompt: 'Which idea is this? — Science as a systematic study of nature is the organized, evidence-based enterprise that.', answer: 'Science as a systematic study', options: ['Science as a systematic study', 'Science and Society Impact on'] },
            { id: 's2', label: 'Science and Society Impact on', prompt: 'Which idea is this? — Science and Society: Impact on Daily Life refers to the bidirectional relationship where.', answer: 'Science and Society Impact on', options: ['Science and Society Impact on', 'Science as a systematic study'] }
          ] } }
    ],
    explore: { component: C9_ScienceExplorationEnteringTheWorldOfSim, prompt: 'Explore the interactive — Science as a Systematic Study of Nature' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch1_1', difficulty: 'standard',
          question: 'Science as a systematic study of nature is the organized, evidence-based.',
          hint: 'If stuck, revisit c8_physics_ch1_5 (Variables in Experiments) and c8_physics_ch1_3.',
          misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).',
          parts: [
                { id: 'a', prompt: 'A student says: "My grandmother knows that tulsi leaves cure fever because she has seen it work many times.', answer: 'No, the student is not correct',
                  options: ['No, the student is not correct', 'systematic', 'step-by-step procedure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' },
                { id: 'b', prompt: 'Two students debate: Student A says "A theory in science is just a guess that hasn\'t been proven yet." Student B says "A scientific theory is a.', answer: 'Student B is correct',
                  options: ['Student B is correct', 'systematic', 'step-by-step procedure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' },
                { id: 'c', prompt: 'Analyze this statement: "Science progresses by proving theories true." Explain why this statement is epistemologically incorrect.', answer: 'Science does not *prove* theories true',
                  options: ['Science does not *prove* theories true', 'not yet falsified', 'proven true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' }
          ],
            remediations: { 'systematic-only-means-step-by': { steps: ['If the student conflates personal orderliness with scientific systematicity: (1) Have them compare two.', '(B) A class conducts a double-blind test: 30 students randomly assigned red/blue shirts, same mock exam, scores.', '(2) Ask: "Which investigation would convince *another school* to adopt the shirt color?', 'Why?" (3) Guide them to see that (B) uses controls, randomization, statistical analysis, and public data — the *social*.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).',
          parts: [
                { id: 'a', prompt: 'A Class 9 student reads a WhatsApp forward: "NASA confirms: rubbing lemon on forehead cures migraine instantly." Evaluate this claim using *three* criteria of.', answer: 'Judgment: Reject',
                  options: ['Judgment: Reject', 'accept because NASA is authoritative', 'systematic', 'step-by-step procedure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "systematic" only means "step-by-step procedure" (like following a lab manual).' }
          ],
            remediations: { 'systematic-only-means-step-by': { steps: ['If the student conflates personal orderliness with scientific systematicity: (1) Have them compare two.', '(B) A class conducts a double-blind test: 30 students randomly assigned red/blue shirts, same mock exam, scores.', '(2) Ask: "Which investigation would convince *another school* to adopt the shirt color?', 'Why?" (3) Guide them to see that (B) uses controls, randomization, statistical analysis, and public data — the *social*.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_10', difficulty: 'standard',
          question: 'Science and Society: Impact on Daily Life refers to the bidirectional.',
          hint: 'If stuck, revisit Class 8 "Heating Effect of Electric Current" (c8_physics_ch2_6) and.',
          misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how.',
          parts: [
                { id: 'a', prompt: 'Name one physics principle from Class 9 (motion, force, gravitation, work/energy, or sound) that enables the working of a bicycle, and state the technology it.', answer: 'Principle: Newton\'s laws of motion (especially second law F=ma and third law',
                  options: ['Principle: Newton\'s laws of motion (especially second law F=ma and third law', 'thermodynamics', 'science impacts society only through big inventions like rockets or smartphones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how fundamental principles.' }
          ],
            remediations: { 'science-impacts-society-only-through': { steps: ['Pick five objects in your kitchen (pressure cooker, LPG stove, refrigerator, mixer grinder, water filter).', 'For each, identify the core physics principle (pressure, combustion/thermodynamics, heat pump/thermodynamics,.', 'Write one sentence on how that object changed a daily routine (cooking time, food preservation, labor).', 'Discuss with a peer: what happens if the object fails or is unavailable?'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since physics gives us powerful technologies like nuclear energy, scientists bear full responsibility for any misuse, such as nuclear.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'scientists are fully responsible', 'science impacts society only through big inventions like rockets or smartphones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "science impacts society only through big inventions like rockets or smartphones" and overlook how fundamental principles.' }
          ],
            remediations: { 'science-impacts-society-only-through': { steps: ['Pick five objects in your kitchen (pressure cooker, LPG stove, refrigerator, mixer grinder, water filter).', 'For each, identify the core physics principle (pressure, combustion/thermodynamics, heat pump/thermodynamics,.', 'Write one sentence on how that object changed a daily routine (cooking time, food preservation, labor).', 'Discuss with a peer: what happens if the object fails or is unavailable?'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
