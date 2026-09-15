import type { SimDef } from '../../engine/types';
import C11_PsyHumanDevelopmentCBSESim from '../../../simulations/c6_12_new/C11_PsyHumanDevelopmentCBSESim';

/** v3 wrapped master — C11_PsyHumanDevelopmentCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_psyhumandevelopmentcbsesim: SimDef = {
    id: 'v3w_c11_psyhumandevelopmentcbsesim',
    title: 'Psy Human Development CBSE',
    subtitle: 'This node covers the seven assumptions of Life-Span Perspective as presented in NCERT.',
    classLevel: 11, subject: 'science', topic: 'Life-Span Perspective on Development: Continuous Process',
    chapters: [],
    nodeIds: ['c11_psy_cbse_03_002', 'c11_psy_cbse_03_011', 'c11_psy_cbse_01_008', 'c11_psy_cbse_04_003', 'c11_psy_cbse_04_004', 'c11_psy_cbse_04_008', 'c11_psy_cbse_03_001', 'c11_psy_cbse_03_003', 'c11_psy_cbse_03_004', 'c11_psy_cbse_03_005', 'c11_psy_cbse_03_006', 'c11_psy_cbse_03_007', 'c11_psy_cbse_03_008', 'c11_psy_cbse_03_009', 'c11_psy_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine your 68-year-old grandmother decides to learn digital painting on a tablet, while your 14-year-old.', goal: 'Master Psy Human Development CBSE.' },
    discovery: {
        question: 'A 60-year-old retired professor decides to learn Spanish using a language app, practicing 30 minutes daily.',
        options: ['Step 1: Plasticity', 'age-related decline', 'LSP means we keep developing until we die'],
        answer: 'Step 1: Plasticity',
        hook: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its.',
    },
    teaching: [
        { title: 'Life-Span Perspective (LSP) is a.', text: 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that conceptualises human development as a lifelong process from conception to death, characterised by seven core assumptions:.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_psy_cbse_03_002', title: 'Life-Span Perspective (LSP) is a.',
          scaffold: { problem: 'Analyse the developmental trajectory of Arjun, a 72-year-old retired engineer who recently joined a community theatre group.',
            steps: [
            { text: 'Identify the lifelong development assumption — Arjun\'s engagement in new creative activity at 72 demonstrates.' },
            { text: 'Identify multi-directionality — simultaneous gains (socio-emotional: mood, friendships) and losses.' },
            { text: 'Identify plasticity — his ability to learn acting skills and form new social bonds at 72 shows psychological.' },
            { text: 'Identify historical embeddedness — streaming platform access to documentary on senior artists is a historical condition.' },
            { text: 'Identify interwoven processes — biological (fatigue, memory), cognitive (script learning, role interpretation), and.' },
            { text: 'Identify multidisciplinary nature — understanding Arjun\'s trajectory requires gerontology (aging biology), cognitive.' },
            { text: 'Identify contextual responsiveness — his engineering background (inherited/acquired context), urban retirement.', faded: true, blankAnswer: 'All seven LSP assumptions are illustrated: lifelong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_03_011', title: 'Adulthood and old age represent the.',
          scaffold: { problem: 'Mrs. Sharma, 72, lives alone in Delhi after her husband\'s death two years ago. Her son works in Bengaluru and visits twice a year.',
            steps: [
            { text: 'Identify developmental stage — late adulthood (60+), Erikson\'s crisis: Integrity vs. Despair. Mrs.' },
            { text: 'Map ecological systems — Microsystem: isolated, no daily companionship; Mesosystem: weak family-neighbor link (son.' },
            { text: 'Differentiate ageing markers — Normative: mild forgetfulness (repeating stories = retrieval slowing), hypertension.' },
            { text: 'Analyze cultural values — "Die in my home" reflects autonomy and place-attachment valued in Indian collectivist culture.' },
            { text: 'Design interventions — (a) Community-based "Senior Buddy" program: trained volunteer visits 3x/week for meals, temple.', faded: true, blankAnswer: 'Mrs. Sharma is at risk for despair due to role loss (wife,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_01_008', title: 'Psychoanalysis is a comprehensive.',
          scaffold: { problem: 'A 22-year-old college student, Priya, consistently procrastinates on assignments until the last minute, then works frantically and submits.',
            steps: [
            { text: 'Identify the unconscious impulse (id) — Priya may harbor repressed hostility toward authority figures (father) that.' },
            { text: 'Identify the superego\'s demand — Internalized paternal criticism creates a harsh superego that demands perfection and.' },
            { text: 'Analyze the ego\'s mediation — The ego, caught between id\'s rebellion and superego\'s perfectionism, adopts.' },
            { text: 'Recognize the defense mechanism — Rationalization ("I work better under pressure") masks the true unconscious.' },
            { text: 'Interpret the symptom\'s function — Procrastination serves as a neurotic compromise formation: it partially satisfies.', faded: true, blankAnswer: 'Priya\'s procrastination reflects an ego mediating between.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_04_003', title: 'Visual sensation is the process by.',
          scaffold: { problem: 'Trace the complete pathway of a single photon from corneal entry to ganglion cell action potential, naming all structures and the type of.',
            steps: [
            { text: 'Photon enters cornea - physical energy (light) refracted at air-cornea interface (refractive index change 1.00→1.376).' },
            { text: 'Passes through aqueous humor - physical energy transmitted through transparent medium.' },
            { text: 'Pupil (iris aperture) - physical energy regulated by pupil diameter (autonomic control).' },
            { text: 'Lens - physical energy further refracted; accommodation changes lens curvature for focus.' },
            { text: 'Vitreous humor - physical energy transmitted to retina.' },
            { text: 'Photon absorbed by rhodopsin in rod outer segment - chemical transduction (11-cis retinal → all-trans retinal.' },
            { text: 'Phototransduction cascade: rhodopsin activates transducin → PDE → cGMP hydrolysis → Na+ channels close → photoreceptor.' },
            { text: 'Glutamate release decreases at photoreceptor-bipolar synapse - chemical signal.' },
            { text: 'Bipolar cell depolarizes (ON pathway) or hyperpolarizes (OFF pathway) - graded electrical signal.' },
            { text: 'Bipolar cell releases glutamate onto ganglion cell - chemical signal.' },
            { text: 'Ganglion cell integrates inputs; if threshold reached, generates action potentials - electrical spikes propagated along.', faded: true, blankAnswer: 'Complete pathway with signal types identified at each of 11.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_04_004', title: 'Auditory sensation is the process by.',
          scaffold: { problem: 'A student strikes a 512 Hz tuning fork and holds it 1 cm from their ear. The sound pressure level (SPL) at the eardrum is 60 dB.',
            steps: [
            { text: 'Identify the initial energy form — mechanical sound wave in air (acoustic energy) with pressure amplitude p₀.' },
            { text: 'Outer ear — pinna collects and funnels sound; auditory canal resonates ~2700 Hz (quarter-wave resonator), boosting SPL.' },
            { text: 'Middle ear — TM vibrates, driving ossicular chain. Force amplification = lever ratio × area ratio × efficiency = 1.3 ×.' },
            { text: 'Inner ear — Stapes drives oval window → perilymph pressure wave → traveling wave on basilar membrane (BM).' },
            { text: 'Transduction — BM displacement shears hair cell stereocilia against tectorial membrane → tip links open K⁺ channels.' },
            { text: 'Neural coding — IHC receptor potential triggers vesicle release at ribbon synapses → action potentials in auditory.', faded: true, blankAnswer: 'Pressure at oval window ≈ 0.27 Pa (23 dB gain). Pathway:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_psy_cbse_04_008', title: 'Perceptual organisation refers to the.',
          scaffold: { problem: 'A traffic sign designer wants drivers to instantly perceive three separate hazard zones (left curve, right curve, narrow bridge) using only.',
            steps: [
            { text: 'Identify the grouping goal — three distinct groups, each perceived as a unit.' },
            { text: 'Choose principles that work at 200 ms — Proximity and Similarity are fastest; Closure requires more time.' },
            { text: 'Assign each zone a unique shape (e.g., Zone 1: chevrons ▲▲▲; Zone 2: inverted chevrons ▼▼▼; Zone 3: horizontal bars.' },
            { text: 'Space marks within a zone closely (30 cm gap) and separate zones widely (5 m gap) — this uses **Proximity** to bind.' },
            { text: 'Align each zone\'s marks along a smooth imaginary curve matching the hazard (curved for curves, straight for bridge) —.' },
            { text: 'Verify against brief exposure: Proximity + Similarity + Continuity converge on the same grouping, making it robust at.', faded: true, blankAnswer: 'Zone 1 — three white chevrons ▲▲▲ spaced 30 cm apart along.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_psy_cbse_03_011', title: 'Identify each idea',
          dissect: { specimen: 'Psy Human Development CBSE', spots: [
            { id: 's1', label: 'Life-Span Perspective LSP is a', prompt: 'Which idea is this? — Life-Span Perspective (LSP) is a comprehensive theoretical framework that conceptualises.', answer: 'Life-Span Perspective LSP is a', options: ['Life-Span Perspective LSP is a', 'Adulthood and old age represent', 'Psychoanalysis is a comprehensive theory', 'Visual sensation is the process'] },
            { id: 's2', label: 'Adulthood and old age represent', prompt: 'Which idea is this? — Adulthood and old age represent the final two major stages of the human life-span,.', answer: 'Adulthood and old age represent', options: ['Adulthood and old age represent', 'Life-Span Perspective LSP is a', 'Psychoanalysis is a comprehensive theory', 'Visual sensation is the process'] },
            { id: 's3', label: 'Psychoanalysis is a comprehensive theory', prompt: 'Which idea is this? — Psychoanalysis is a comprehensive theory of personality and a therapeutic method.', answer: 'Psychoanalysis is a comprehensive theory', options: ['Psychoanalysis is a comprehensive theory', 'Life-Span Perspective LSP is a', 'Adulthood and old age represent', 'Visual sensation is the process'] },
            { id: 's4', label: 'Visual sensation is the process', prompt: 'Which idea is this? — Visual sensation is the process by which light energy (electromagnetic radiation in the.', answer: 'Visual sensation is the process', options: ['Visual sensation is the process', 'Life-Span Perspective LSP is a', 'Adulthood and old age represent', 'Psychoanalysis is a comprehensive theory'] },
            { id: 's5', label: 'Auditory sensation is the process', prompt: 'Which idea is this? — Auditory sensation is the process by which sound waves (mechanical pressure changes in a.', answer: 'Auditory sensation is the process', options: ['Auditory sensation is the process', 'Life-Span Perspective LSP is a', 'Adulthood and old age represent', 'Psychoanalysis is a comprehensive theory'] },
            { id: 's6', label: 'Perceptual organisation refers to the', prompt: 'Which idea is this? — Perceptual organisation refers to the innate tendency of the human perceptual system to.', answer: 'Perceptual organisation refers to the', options: ['Perceptual organisation refers to the', 'Life-Span Perspective LSP is a', 'Adulthood and old age represent', 'Psychoanalysis is a comprehensive theory'] }
          ] } }
    ],
    explore: { component: C11_PsyHumanDevelopmentCBSESim, prompt: 'Explore the interactive — Psy Human Development CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_002', difficulty: 'standard',
          question: 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that.',
          hint: 'Revisit c11_psy_cbse_03_001: Practice classifying changes as growth, maturation, or.',
          misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its.',
          parts: [
                { id: 'a', prompt: 'A 60-year-old retired professor decides to learn Spanish using a language app, practicing 30 minutes daily.', answer: 'Step 1: Plasticity',
                  options: ['Step 1: Plasticity', 'age-related decline', 'LSP means we keep developing until we die'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' },
                { id: 'b', prompt: 'Compare and contrast the Life-Span Perspective with traditional stage theories (e.g., Piaget\'s cognitive stages, Erikson\'s psychosocial stages) on three.', answer: 'endpoint of development, (',
                  options: ['endpoint of development, (', 'stage theories also cover adulthood', 'LSP means we keep developing until we die'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' }
          ],
            remediations: { 'students-equate-life-span-perspective': { steps: ['Create a 7-column table with each LSP assumption as a column header.', 'For a single case (e.g., 50-year-old learning coding), fill each column with specific evidence from the case — this.', 'Contrast with a stage theory prediction for the same case (e.g., "Piaget would say formal operations are complete by.', 'Identify which LSP assumptions explain the discrepancy — this reveals LSP\'s explanatory power beyond mere timeline.', 'Practice with three diverse cases (child, adolescent, older adult) until the student can automatically generate.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "The Life-Span Perspective\'s assumption that \'development is plastic\' implies that any skill can be learned to expert level at.', answer: 'The claim is false',
                  options: ['The claim is false', 'modifiability', 'limitless malleability', 'LSP means we keep developing until we die'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' },
                { id: 'b', prompt: 'Compare and contrast the Life-Span Perspective with traditional stage theories (e.g., Piaget\'s cognitive stages, Erikson\'s psychosocial stages) on three.', answer: 'endpoint of development, (',
                  options: ['endpoint of development, (', 'stage theories also cover adulthood', 'LSP means we keep developing until we die'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate Life-Span Perspective with "development continues throughout life" (simple continuity) and miss its five other defining.' }
          ],
            remediations: { 'students-equate-life-span-perspective': { steps: ['Create a 7-column table with each LSP assumption as a column header.', 'For a single case (e.g., 50-year-old learning coding), fill each column with specific evidence from the case — this.', 'Contrast with a stage theory prediction for the same case (e.g., "Piaget would say formal operations are complete by.', 'Identify which LSP assumptions explain the discrepancy — this reveals LSP\'s explanatory power beyond mere timeline.', 'Practice with three diverse cases (child, adolescent, older adult) until the student can automatically generate.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_011', difficulty: 'standard',
          question: 'Adulthood and old age represent the final two major stages of the human.',
          hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s Stages) and c11_psy_cbse_03_002 (Life-Span.',
          misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the experience of widowhood for an 80-year-old woman in a traditional joint family in rural Uttar Pradesh versus an 80-year-old woman.', answer: 'Rural joint family: Microsystem',
                  options: ['Rural joint family: Microsystem', 'same grief', 'ageing = uniform decline for everyone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' }
          ],
            remediations: { 'ageing-uniform-decline-for-everyone': { steps: ['Ask the student to list three 70+ year-old Indians they admire who are active (e.g., Ratan Tata, Amitabh Bachchan,.', 'Have them re-read NCERT\'s "Old Age" section highlighting words: "active, energetic, creative," "openness to new.', 'Use a Venn diagram to separate "Normative Changes" (wrinkles, slower recall) from "Pathological Changes".', 'Assign a mini-interview with an older adult about their life-satisfaction sources — forces confrontation with real.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Old age is inevitably a period of decline, dependency, and despair." Use evidence from NCERT\'s life-span perspective (plasticity,.', answer: 'The statement is reductionist and contradicts life-span perspective',
                  options: ['The statement is reductionist and contradicts life-span perspective', 'myth of old age as incapacitating', 'and that developmental stages in adulthood are rigidly age-locked (e.g', 'Erikson\'s stages imply everyone resolves crises at the same age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' },
                { id: 'b', prompt: 'Design a community-based "Successful Ageing Programme" for a mixed-income urban neighborhood in India.', answer: 'Programme "Sanjeevani": (a) Physical: Weekly yoga/walking groups + health camps',
                  options: ['Programme "Sanjeevani": (a) Physical: Weekly yoga/walking groups + health camps', 'ageing = uniform decline for everyone', 'retirement at 60 means old age starts', 'Erikson\'s stages imply everyone resolves crises at the same age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' },
                { id: 'c', prompt: 'Compare and contrast the experience of widowhood for an 80-year-old woman in a traditional joint family in rural Uttar Pradesh versus an 80-year-old woman.', answer: 'Rural joint family: Microsystem',
                  options: ['Rural joint family: Microsystem', 'same grief', 'ageing = uniform decline for everyone', 'retirement at 60 means old age starts'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.,.' }
          ],
            remediations: { 'ageing-uniform-decline-for-everyone': { steps: ['Ask the student to list three 70+ year-old Indians they admire who are active (e.g., Ratan Tata, Amitabh Bachchan,.', 'Have them re-read NCERT\'s "Old Age" section highlighting words: "active, energetic, creative," "openness to new.', 'Use a Venn diagram to separate "Normative Changes" (wrinkles, slower recall) from "Pathological Changes".', 'Assign a mini-interview with an older adult about their life-satisfaction sources — forces confrontation with real.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_008', difficulty: 'standard',
          question: 'Psychoanalysis is a comprehensive theory of personality and a therapeutic.',
          hint: 'If confused about the shift from conscious to unconscious focus, revisit.',
          misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old student who was bitten by a dog at age 4 now experiences intense anxiety when seeing any dog, but has no conscious memory of the bite.', answer: 'The defense mechanism is repression',
                  options: ['The defense mechanism is repression', 'forgetting', 'suppression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily forgotten or not currently.' }
          ],
            remediations: { 'students-frequently-equate-freud-s': { steps: ['Explicitly contrast the three terms: *preconscious* (available to awareness with attention, e.g., your breakfast.', 'Use the "censor at the gate" metaphor: the ego stands guard; repressed material pushes against the gate but cannot.', 'Assign a 5-minute writing task: "Describe a time you *chose* not to think about something (suppression) vs.', 'a time you *genuinely didn\'t know* why you felt/acted a certain way until later reflection (unconscious leak)." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "Freud\'s psychosexual stages are scientifically invalid because they cannot be falsified." Support your judgment with two.', answer: 'The claim is largely valid',
                  options: ['The claim is largely valid', 'unscientific', 'I unconsciously forgot my homework'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily forgotten or not currently.' }
          ],
            remediations: { 'students-frequently-equate-freud-s': { steps: ['Explicitly contrast the three terms: *preconscious* (available to awareness with attention, e.g., your breakfast.', 'Use the "censor at the gate" metaphor: the ego stands guard; repressed material pushes against the gate but cannot.', 'Assign a 5-minute writing task: "Describe a time you *chose* not to think about something (suppression) vs.', 'a time you *genuinely didn\'t know* why you felt/acted a certain way until later reflection (unconscious leak)." 4.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_003', difficulty: 'standard',
          question: 'Visual sensation is the process by which light energy (electromagnetic.',
          hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) focusing on the transduction step,.',
          misconception: 'Students often believe the lens is the primary refractive structure of the eye because cameras use lenses for focusing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Visual sensation is the process by',
                  options: ['Visual sensation is the process by', 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that conceptualises', 'Adulthood and old age represent the final two major stages of the human life-span,', 'Psychoanalysis is a comprehensive theory of personality and a therapeutic method'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the lens is the primary refractive structure of the eye because cameras use lenses for focusing.' }
          ],
            remediations: { 'the-lens-is-the-primary': { steps: ['Draw a schematic eye labeling refractive indices: air (1.00) → cornea (1.376) → aqueous (1.336) → lens (1.386-1.406) →.', 'Calculate relative refractive power at each interface using (n2-n1)/radius.', 'Show cornea\'s large index jump (1.00→1.376) vs lens\'s small jumps.', 'Demonstrate with a water-filled glass sphere (cornea model) that most focusing occurs at the first surface.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_004', difficulty: 'standard',
          question: 'Auditory sensation is the process by which sound waves (mechanical pressure.',
          hint: 'If stuck, revisit **c11_psy_cbse_04_001** (Sensation vs Perception) for transduction.',
          misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" —.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Auditory sensation is the process by',
                  options: ['Auditory sensation is the process by', 'Life-Span Perspective (LSP) is a comprehensive theoretical framework that conceptualises', 'Adulthood and old age represent the final two major stages of the human life-span,', 'Psychoanalysis is a comprehensive theory of personality and a therapeutic method'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" — like a light sensor.' }
          ],
            remediations: { 'the-cochlea-is-a-simple': { steps: ['If the student holds the "microphone" misconception: **Step 1** — Use a physical ear model (or 3D animation) to trace.', 'Emphasize each arrow is a *transduction* with gain/loss.', '**Step 2** — Demonstrate impedance mismatch: tap a table with a finger (air-coupled) vs.', 'press ear to table (bone-coupled).'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" —.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Loudness perception depends solely on the amplitude of the sound wave." Use concepts of frequency sensitivity (equal-loudness contours).', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'amplitude determines loudness directly', 'all at once', 'Why does a 1000 Hz tone at 20 dB sound louder than a 100 Hz tone at 20 dB?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" — like a light sensor.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration (using only a tuning fork, a plastic tube, and water) to show that the ear performs **frequency analysis** (Fourier.', answer: '**Procedure**: Strike a 512 Hz tuning fork',
                  options: ['**Procedure**: Strike a 512 Hz tuning fork', 'all at once', 'Why does a 1000 Hz tone at 20 dB sound louder than a 100 Hz tone at 20 dB?', 'Because 1000 Hz has higher frequency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the **cochlea is a simple microphone** that converts sound waves into neural signals "all at once" — like a light sensor.' }
          ],
            remediations: { 'the-cochlea-is-a-simple': { steps: ['If the student holds the "microphone" misconception: **Step 1** — Use a physical ear model (or 3D animation) to trace.', 'Emphasize each arrow is a *transduction* with gain/loss.', '**Step 2** — Demonstrate impedance mismatch: tap a table with a finger (air-coupled) vs.', 'press ear to table (bone-coupled).'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_008', difficulty: 'standard',
          question: 'Perceptual organisation refers to the innate tendency of the human perceptual.',
          hint: 'Revisit c11_psy_cbse_04_001 (Sensation vs Perception) and c11_psy_cbse_04_006 (Selective.',
          misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a.',
          parts: [
                { id: 'a', prompt: 'State the Gestalt principle that explains why we perceive the Olympic rings as five interlaced circles rather than as nine separate curved line segments.', answer: 'The principle is **Continuity** (or Good Continuation)',
                  options: ['The principle is **Continuity** (or Good Continuation)', 'Proximity', 'Similarity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' },
                { id: 'b', prompt: 'A teacher draws two rows of 10 dots each on the board. In Row A, the dots are evenly spaced 2 cm apart.', answer: 'Row A (uniform 2 cm spacing) will be seen as **a single line of 10 dots**',
                  options: ['Row A (uniform 2 cm spacing) will be seen as **a single line of 10 dots**', '10 separate dots in Row B', 'one group in Row B'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' }
          ],
            remediations: { 'each-gestalt-principle-operates-in': { steps: ['Present a single complex display (e.g., a city skyline silhouette with windows, doors, antennas) and ask the student to.', 'Have them **manipulate one cue at a time** (e.g., increase spacing between windows) and predict how the grouping.', 'Use the phrase "perceptual election" repeatedly: each principle casts a vote weighted by cue strength; the percept is.', 'This replaces the "one principle per figure" mental model with a competitive integration model.'] } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The principle of Closure proves that perception is purely bottom-up because the mind automatically fills gaps in the stimulus." Use the.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'automatic', 'bottom-up', 'explains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' },
                { id: 'b', prompt: 'Design a novel 2×2 stimulus array (describe it verbally) that would allow a researcher to test whether **Symmetry** or **Surroundedness** is the stronger.', answer: 'Array: Four quadrants',
                  options: ['Array: Four quadrants', 'explains'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **each Gestalt principle operates in isolation and that a single principle "explains" a given percept**.' }
          ],
            remediations: { 'each-gestalt-principle-operates-in': { steps: ['Present a single complex display (e.g., a city skyline silhouette with windows, doors, antennas) and ask the student to.', 'Have them **manipulate one cue at a time** (e.g., increase spacing between windows) and predict how the grouping.', 'Use the phrase "perceptual election" repeatedly: each principle casts a vote weighted by cue strength; the percept is.', 'This replaces the "one principle per figure" mental model with a competitive integration model.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
