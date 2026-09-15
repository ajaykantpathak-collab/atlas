import type { SimDef } from '../../engine/types';
import C9_ScienceSoundWavesCharacteristicsAndApplicationsSim from '../../../simulations/c6_12/C9_ScienceSoundWavesCharacteristicsAndApplicationsSim';

/** v3 wrapped master — C9_ScienceSoundWavesCharacteristicsAndApplicationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencesoundwavescharacteristicsandapplicationssim: SimDef = {
    id: 'v3w_c9_sciencesoundwavescharacteristicsandapplicationssim',
    title: 'Sound Waves Characteristics And Applications',
    subtitle: 'Covers the production of sound — vibrating sources, the role of a medium, compressions.',
    classLevel: 9, subject: 'science', topic: 'Propagation of Sound: Need for a Medium',
    chapters: [],
    nodeIds: ['c9_physics_ch5_2', 'c9_physics_ch5_7', 'c9_physics_ch5_10', 'c9_physics_ch5_11', 'c9_physics_ch5_9', 'c9_physics_ch5_1', 'c9_physics_ch5_3', 'c9_physics_ch5_4', 'c9_physics_ch5_5', 'c9_physics_ch5_6', 'c9_physics_ch5_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Pluck a guitar string. Watch it vibrate — it moves back and forth rapidly.', goal: 'Master Sound Waves Characteristics And Applications.' },
    discovery: {
        question: 'Explain how a vibrating tuning fork produces sound. Describe the formation of compressions and rarefactions.',
        options: ['When the tuning fork vibrates, its prongs move back and forth', 'the tuning fork makes the air vibrate', 'sound can travel through vacuum (like light)'],
        answer: 'When the tuning fork vibrates, its prongs move back and forth',
        hook: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave,.',
    },
    teaching: [
        { title: 'Production of sound is the generation of.', text: 'Production of sound is the generation of mechanical waves through the vibration of a source, which creates compressions and rarefactions in a medium (air, water, solids) that propagate as.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch5_2', title: 'Production of sound is the generation.',
          scaffold: { problem: 'Describe how the human voice is produced, identifying the vibrating source, the medium, and the receiver.',
            steps: [
            { text: 'Identify the vibrating source. The vocal cords in the larynx vibrate when air from the lungs passes through them.' },
            { text: 'Identify the medium. The vibrations create compressions and rarefactions in the air, which propagate as a sound wave.' },
            { text: 'Identify the receiver. The sound wave reaches a listener\'s ear, vibrating the eardrum, which converts the vibrations to.' },
            { text: 'Summarize. Source: vocal cords. Medium: air. Receiver: listener\'s ear.', faded: true, blankAnswer: 'The human voice is produced by: (1) Vibrating source: vocal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_7', title: 'Characteristics of sound waves are the.',
          scaffold: { problem: 'A sound wave has frequency 680 Hz and travels at 340 m/s. Calculate its wavelength and time period.',
            steps: [
            { text: 'Wavelength. lambda = v/f = 340/680 = 0.5 m.' },
            { text: 'Time period. T = 1/f = 1/680 = 0.00147 s (approximately 1.47 ms).', faded: true, blankAnswer: 'Wavelength = 340/680 = 0.5 m. Time period = 1/680 = 0.00147.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_10', title: 'Ultrasound refers to sound waves with.',
          scaffold: { problem: 'A medical ultrasound scanner operates at 5 MHz. The speed of sound in soft tissue is 1540 m/s.',
            steps: [
            { text: 'Identify given quantities: frequency f = 5 MHz = 5 × 10⁶ Hz, speed v = 1540 m/s.' },
            { text: 'Use the wave equation v = fλ. Rearrange to λ = v/f. Check units: m/s divided by 1/s gives m.' },
            { text: 'Substitute values: λ = 1540 / (5 × 10⁶) = 3.08 × 10⁻⁴ m = 0.308 mm.' },
            { text: 'Minimum resolvable detail = λ/2 = 0.308 mm / 2 = 0.154 mm = 154 μm.' },
            { text: 'Verify reasonableness: medical ultrasound typically resolves sub-millimeter structures; 154 μm is realistic for.', faded: true, blankAnswer: 'Wavelength = 0.308 mm; smallest detectable detail = 0.154.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_11', title: 'Reflection of sound is the bouncing.',
          scaffold: { problem: 'A person shouts toward a cliff and hears the echo after 3 seconds. If the speed of sound is 340 m/s, how far away is the cliff?',
            steps: [
            { text: 'Total distance. Sound travels to the cliff and back: d_total = v * t = 340 * 3 = 1020 m.' },
            { text: 'Distance to cliff. The cliff is at half the total distance: d = 1020 / 2 = 510 m.', faded: true, blankAnswer: 'Total distance = 340 * 3 = 1020 m. Distance to cliff = 1020.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_9', title: 'Ultrasound applications are the.',
          scaffold: { problem: 'Describe how a doctor uses ultrasound to examine a fetus. Identify the type of wave, the mechanism, and why it is safe.',
            steps: [
            { text: 'Type of wave. Ultrasound — mechanical sound wave at 2-15 MHz, above the audible range.' },
            { text: 'Mechanism. The probe emits ultrasound into the body. The sound reflects off tissue boundaries (fetus, amniotic fluid,.' },
            { text: 'Why safe. Ultrasound is a mechanical wave (sound), not ionizing radiation.', faded: true, blankAnswer: 'The doctor uses ultrasound (mechanical sound wave at 2-15.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_1', title: 'Sound is a form of mechanical energy.',
          scaffold: { problem: 'A sitar player plucks a string and it vibrates 120 times in 2 seconds.',
            steps: [
            { text: 'Identify given quantities: number of vibrations = 120, time taken = 2 s. Required: frequency (f).' },
            { text: 'Recall frequency definition: f = number of vibrations / time taken.' },
            { text: 'Substitute values: f = 120 vibrations / 2 s.' },
            { text: 'Compute: f = 60 vibrations per second = 60 Hz. Unit analysis: vibrations (dimensionless) divided by seconds gives s⁻¹,.' },
            { text: 'Verify reasonableness: 60 Hz is a low bass note, plausible for a sitar\'s lower string.', faded: true, blankAnswer: '60 Hz' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch5_7', title: 'Identify each idea',
          dissect: { specimen: 'Sound Waves Characteristics And Applications', spots: [
            { id: 's1', label: 'Production of sound is the', prompt: 'Which idea is this? — Production of sound is the generation of mechanical waves through the vibration of a.', answer: 'Production of sound is the', options: ['Production of sound is the', 'Characteristics of sound waves are', 'Ultrasound refers to sound waves', 'Reflection of sound is the'] },
            { id: 's2', label: 'Characteristics of sound waves are', prompt: 'Which idea is this? — Characteristics of sound waves are the measurable properties that describe a sound wave:.', answer: 'Characteristics of sound waves are', options: ['Characteristics of sound waves are', 'Production of sound is the', 'Ultrasound refers to sound waves', 'Reflection of sound is the'] },
            { id: 's3', label: 'Ultrasound refers to sound waves', prompt: 'Which idea is this? — Ultrasound refers to sound waves with frequencies greater than 20 kHz, which are.', answer: 'Ultrasound refers to sound waves', options: ['Ultrasound refers to sound waves', 'Production of sound is the', 'Characteristics of sound waves are', 'Reflection of sound is the'] },
            { id: 's4', label: 'Reflection of sound is the', prompt: 'Which idea is this? — Reflection of sound is the bouncing back of sound waves when they encounter a boundary.', answer: 'Reflection of sound is the', options: ['Reflection of sound is the', 'Production of sound is the', 'Characteristics of sound waves are', 'Ultrasound refers to sound waves'] },
            { id: 's5', label: 'Ultrasound applications are the technological', prompt: 'Which idea is this? — Ultrasound applications are the technological and medical uses of sound waves with.', answer: 'Ultrasound applications are the technological', options: ['Ultrasound applications are the technological', 'Production of sound is the', 'Characteristics of sound waves are', 'Ultrasound refers to sound waves'] },
            { id: 's6', label: 'Sound is a form of', prompt: 'Which idea is this? — Sound is a form of mechanical energy produced by the vibration of an object, which.', answer: 'Sound is a form of', options: ['Sound is a form of', 'Production of sound is the', 'Characteristics of sound waves are', 'Ultrasound refers to sound waves'] }
          ] } }
    ],
    explore: { component: C9_ScienceSoundWavesCharacteristicsAndApplicationsSim, prompt: 'Explore the interactive — Sound Waves Characteristics And Applications' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch5_2', difficulty: 'standard',
          question: 'Production of sound is the generation of mechanical waves through the vibration.',
          hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as a.',
          misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave,.',
          parts: [
                { id: 'a', prompt: 'Explain how a vibrating tuning fork produces sound. Describe the formation of compressions and rarefactions.', answer: 'When the tuning fork vibrates, its prongs move back and forth',
                  options: ['When the tuning fork vibrates, its prongs move back and forth', 'the tuning fork makes the air vibrate', 'sound can travel through vacuum (like light)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' },
                { id: 'b', prompt: 'Why cannot sound travel through vacuum? Explain with an example.', answer: 'Sound is a mechanical wave',
                  options: ['Sound is a mechanical wave', 'sound is too weak in vacuum', 'sound can travel through vacuum (like light)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' },
                { id: 'c', prompt: 'Describe three different ways sound is produced in the human body and in musical instruments.', answer: '(1) Vocal cords — air from the lungs vibrates the vocal cords, producing voice',
                  options: ['(1) Vocal cords — air from the lungs vibrates the vocal cords, producing voice', 'sound is produced by talking', 'sound can travel through vacuum (like light)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' }
          ],
            remediations: { 'sound-can-travel-through-vacuum': { steps: ['Ring a bell in air — students hear it.', 'Place the bell in a vacuum jar and pump out air — the sound fades and disappears.', 'Ask: "Is the bell still vibrating?" (Yes, but there is no medium.) 4.', 'Conclude: sound needs a medium — it cannot travel through vacuum.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave,.',
          parts: [
                { id: 'a', prompt: 'A student says: "Sound is produced when something moves." Evaluate this statement and refine it to be precise.', answer: 'The statement is too vague',
                  options: ['The statement is too vague', 'sound can travel through vacuum (like light)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' }
          ],
            remediations: { 'sound-can-travel-through-vacuum': { steps: ['Ring a bell in air — students hear it.', 'Place the bell in a vacuum jar and pump out air — the sound fades and disappears.', 'Ask: "Is the bell still vibrating?" (Yes, but there is no medium.) 4.', 'Conclude: sound needs a medium — it cannot travel through vacuum.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_7', difficulty: 'standard',
          question: 'Characteristics of sound waves are the measurable properties that describe a.',
          hint: 'Revisit c9_physics_ch5_2 (Production of Sound) for the concept of vibration and.',
          misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are.',
          parts: [
                { id: 'a', prompt: 'Define frequency and state its unit. How does frequency affect pitch?', answer: 'Frequency is the number of oscillations (or compressions) per second',
                  options: ['Frequency is the number of oscillations (or compressions) per second', 'frequency is how fast sound travels'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are higher-pitched and quieter.' }
          ],
            remediations: { 'students-confuse-amplitude-loudness-with': { steps: ['Play a tone at fixed frequency, varying amplitude — students hear it get louder/quieter, not change pitch.', 'Play tones at fixed amplitude, varying frequency — students hear pitch change, not loudness.', 'Conclude: amplitude = loudness, frequency = pitch.', 'Practice: v = f * lambda calculations.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are.',
          parts: [
                { id: 'a', prompt: 'A student says: "Higher amplitude means higher pitch." Evaluate this statement and correct it.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Higher amplitude means louder sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are higher-pitched and quieter.' }
          ],
            remediations: { 'students-confuse-amplitude-loudness-with': { steps: ['Play a tone at fixed frequency, varying amplitude — students hear it get louder/quieter, not change pitch.', 'Play tones at fixed amplitude, varying frequency — students hear pitch change, not loudness.', 'Conclude: amplitude = loudness, frequency = pitch.', 'Practice: v = f * lambda calculations.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_10', difficulty: 'standard',
          question: 'Ultrasound refers to sound waves with frequencies greater than 20 kHz, which.',
          hint: 'Revisit node c9_physics_ch5_4 (Wavelength, Frequency and Time Period) to practice f = 1/T.',
          misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency.',
          parts: [
                { id: 'a', prompt: 'State the frequency ranges for ultrasound and infrasound, and give one application for each.', answer: 'Ultrasound: frequency > 20 kHz (e.g., medical sonography)',
                  options: ['Ultrasound: frequency > 20 kHz (e.g., medical sonography)', 'ultrasound', 'very loud sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' },
                { id: 'b', prompt: 'An ultrasonic flaw detector sends a pulse into a steel rail (speed of sound in steel = 5960 m/s). The reflected pulse from a crack returns after 40 μs.', answer: 'Given: v = 5960 m/s, t = 40 μs = 40 × 10⁻⁶ s',
                  options: ['Given: v = 5960 m/s, t = 40 μs = 40 × 10⁻⁶ s', 'ultrasound', 'very loud sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' },
                { id: 'c', prompt: 'Compare the penetration ability of ultrasound in air versus in soft tissue. Explain why medical ultrasound requires a gel coupling medium.', answer: 'Ultrasound attenuates strongly in air due to large impedance mismatch',
                  options: ['Ultrasound attenuates strongly in air due to large impedance mismatch', 'ultrasound', 'very loud sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' }
          ],
            remediations: { 'ultrasound-means-very-loud-sound': { steps: ['Use a tuning fork (512 Hz) and a smartphone spectrum analyzer app to show a peak at 512 Hz.', 'Play a 15 Hz tone and a 25 kHz tone from the app; observe that the 15 Hz tone is inaudible but appears on the spectrum,.', 'Explicitly label the axes: x-axis = frequency (Hz), y-axis = amplitude (dB).', 'Ask the student to point to the infrasound and ultrasound regions on the graph, reinforcing that the distinction is.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_11', difficulty: 'standard',
          question: 'Reflection of sound is the bouncing back of sound waves when they encounter a.',
          hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for speed of sound and.',
          misconception: 'Students confuse echo with reverberation. The exact error: they think any reflected sound is an echo, not.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reflection of sound is the bouncing back of sound waves when they encounter a boundary',
                  options: ['Reflection of sound is the bouncing back of sound waves when they encounter a boundary', 'Production of sound is the generation of mechanical waves through the vibration of a', 'Characteristics of sound waves are the measurable properties that describe a sound wave:', 'Ultrasound refers to sound waves with frequencies greater than 20 kHz'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse echo with reverberation. The exact error: they think any reflected sound is an echo, not distinguishing between a single.' }
          ],
            remediations: { 'students-confuse-echo-with-reverberation': { steps: ['Clap in a small room — hear reverberation (blended reflections).', 'Clap near a distant wall (>= 17 m) — hear a distinct echo.', 'Explain: echo = distinct reflection (far, >= 0.1 s delay).', 'Reverberation = overlapping reflections (near, < 0.1 s delay).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_9', difficulty: 'standard',
          question: 'Ultrasound applications are the technological and medical uses of sound waves.',
          hint: 'Revisit c9_physics_ch5_8 (Audible Range) for the definition of ultrasound and.',
          misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate.',
          parts: [
                { id: 'a', prompt: 'Describe how medical ultrasound imaging works in three steps.', answer: 'Step 1: A probe (transducer) emits ultrasound into the body',
                  options: ['Step 1: A probe (transducer) emits ultrasound into the body', 'ultrasound uses radiation', 'high-frequency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' },
                { id: 'b', prompt: 'How do bats use ultrasound for navigation? Describe echolocation.', answer: 'Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses',
                  options: ['Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses', 'bats see in the dark', 'high-frequency'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' }
          ],
            remediations: { 'ultrasound-is-dangerous-because-it': { steps: ['Show a bat (or video) navigating in darkness using echolocation.', 'Show a sonogram image of a fetus.', 'Explain: both use ultrasound (sound above 20,000 Hz).', 'Emphasize: ultrasound is sound (mechanical wave), NOT radiation.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate.',
          parts: [
                { id: 'a', prompt: 'A student says: "Ultrasound is dangerous because it is high-frequency." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'high-frequency', 'radiation', 'ultrasound is dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' },
                { id: 'b', prompt: 'How do bats use ultrasound for navigation? Describe echolocation.', answer: 'Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses',
                  options: ['Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses', 'bats see in the dark', 'high-frequency', 'radiation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' }
          ],
            remediations: { 'ultrasound-is-dangerous-because-it': { steps: ['Show a bat (or video) navigating in darkness using echolocation.', 'Show a sonogram image of a fetus.', 'Explain: both use ultrasound (sound above 20,000 Hz).', 'Emphasize: ultrasound is sound (mechanical wave), NOT radiation.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_1', difficulty: 'standard',
          question: 'Sound is a form of mechanical energy produced by the vibration of an object,.',
          hint: 'Revisit the simple pendulum experiment (Class 7): measure time for 20 oscillations,.',
          misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that.',
          parts: [
                { id: 'a', prompt: 'State the necessary condition for an object to become a source of sound.', answer: 'The object must vibrate (oscillate about a mean position)',
                  options: ['The object must vibrate (oscillate about a mean position)', 'the object must be made of metal', 'the object must be hit hard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that sustained vibration —.' },
                { id: 'b', prompt: 'A student plucks a rubber band stretched between two pencils and hears a sound.', answer: 'Damping stops the vibration of the rubber band',
                  options: ['Damping stops the vibration of the rubber band', 'tension is gone', 'air is blocked'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that sustained vibration —.' }
          ],
            remediations: { 'sound-is-produced-only-when': { steps: ['Show a slow-motion video of a struck tuning fork dipped in water — water splashes prove vibration.', 'Have students hum a note while touching their throat, then stop humming but keep mouth open — vibration ceases, sound.', 'Use a smartphone spectrum analyser app: pluck a guitar string, note the persistent frequency peak while amplitude.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
