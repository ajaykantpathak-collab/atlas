import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch05_p1: SimDef = {
    id: 'v3_c9_physics_ch05_p1',
    title: 'Sound · Part 1/2',
    subtitle: 'Every sound is something shaking',
    classLevel: 9, subject: 'physics', topic: 'Sound · Part 1/2',
    chapters: ['c9_physics_ch05'],
    nodeIds: ['c9_physics_ch5_1', 'c9_physics_ch5_10', 'c9_physics_ch5_11', 'c9_physics_ch5_2', 'c9_physics_ch5_3', 'c9_physics_ch5_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an acoustic detective', intro: 'From a humming throat to a temple bell, every sound traces back to one thing: a vibration. Hunt down the vibrator inside each instrument and catch the wave it throws into the air.', goal: 'Understand that sound is produced by vibrating objects creating compressions and rarefactions — and identify the vibrating source in strings, membranes, air columns and plates.' },
    discovery: {
        question: 'Strike a steel thali, then press your palm flat on it — the sound dies instantly. The plate is still there, still struck. What did your hand actually kill?',
        options: ['The vibration — sound only exists while something oscillates; stop the to-and-fro motion and no compressions reach the air', 'The echo — sound needs to bounce', 'The metal\'s sound supply ran out', 'Your hand absorbed the noise particles'],
        answer: 'The vibration — sound only exists while something oscillates; stop the to-and-fro motion and no compressions reach the air',
        hook: 'Every instrument hides a different vibrator: sitar = string, tabla = membrane, flute = air column, bell = solid plate, your voice = vocal cords. And hitting harder raises loudness (amplitude), never the pitch (frequency).',
    },
    teaching: [
        { title: 'Production of Sound: Vibrations and Sources', text: 'Sound is a form of mechanical energy produced by the vibration of an object, which creates alternating regions of compression and rarefaction in a surrounding medium; the vibrating object is called.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch5_1', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Go vibration-hunting: feel your throat hum \'Om\', identify the vibrating part in five Indian instruments, and build the spoon-and-thread trick that proves sound rides solids better than air.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'case', nodeId: 'c9_physics_ch5_1', title: 'Production of Sound: Vibrations and Sources',
          caseStudy: { intro: 'Place your fingers lightly on the throat while humming "Om" — you feel a tickling vibration, proving your vocal cords are the source.',
            decisions: [{ prompt: 'State the necessary condition for an object to become a source of sound.', options: [
                { text: 'The object must vibrate (oscillate about a mean position)', outcome: 'The object must vibrate (oscillate about a mean position). A wrong answer like "the object must.' },
                { text: 'the object must be made of metal', outcome: 'Not quite — Students believe sound is produced *only* when an object is struck or plucked (an external impact).', reveals: 'sound-is-produced-only-when' },
                { text: 'the object must be hit hard', outcome: 'Not quite — Students believe sound is produced *only* when an object is struck or plucked (an external impact).', reveals: 'sound-is-produced-only-when' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_10', title: 'Ultrasound and Infrasound: Applications',
          caseStudy: { intro: 'Observe a doctor using a handheld device on a pregnant woman\'s abdomen to see the baby — that device uses ultrasound.',
            decisions: [{ prompt: 'State the frequency ranges for ultrasound and infrasound, and give one application for each.', options: [
                { text: 'Ultrasound: frequency > 20 kHz (e.g., medical sonography)', outcome: 'Ultrasound: frequency > 20 kHz (e.g., medical sonography). Infrasound: frequency < 20 Hz (e.g.' },
                { text: 'ultrasound', outcome: 'Not quite — Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound,".', reveals: 'ultrasound-means-very-loud-sound' },
                { text: 'very loud sound', outcome: 'Not quite — Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound,".', reveals: 'ultrasound-means-very-loud-sound' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_11', title: 'Echolocation and Sonar: Principles and Uses',
          scaffold: { problem: 'A person shouts toward a cliff and hears the echo after 3 seconds. If the speed of sound is 340 m/s, how far away is the cliff?',
            steps: [
            { text: 'Total distance. Sound travels to the cliff and back: d_total = v * t = 340 * 3 = 1020 m.' },
            { text: 'Distance to cliff. The cliff is at half the total distance: d = 1020 / 2 = 510 m.', faded: true, blankAnswer: 'Total distance = 340 * 3 = 1020 m. Distance to cliff = 1020.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch5_2', title: 'Propagation of Sound: Need for a Medium',
          caseStudy: { intro: 'Pluck a guitar string. Watch it vibrate — it moves back and forth rapidly. As it moves forward, it pushes air molecules together (compression).',
            decisions: [{ prompt: 'What are the three requirements for sound production?', options: [
                { text: 'Three requirements: (1) A vibrating source (e.g., vocal cords, string, membrane) that', outcome: 'Three requirements: (1) A vibrating source (e.g., vocal cords, string, membrane) that creates the.' },
                { text: 'a source and air', outcome: 'Not quite — Students think sound can travel through vacuum (like light). The exact error: they conflate sound.', reveals: 'sound-can-travel-through-vacuum' },
                { text: 'sound can travel through vacuum (like light)', outcome: 'Not quite — Students think sound can travel through vacuum (like light). The exact error: they conflate sound.', reveals: 'sound-can-travel-through-vacuum' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_3', title: 'Sound Waves: Longitudinal Waves and Compressions',
          caseStudy: { intro: 'Hold a slinky spring horizontally on a table and give one end a sharp push forward — you see a crowded coil region (compression) travel along the spring while.',
            decisions: [{ prompt: 'A REMEMBER level question: Define a longitudinal wave and state the direction of particle vibration relative to the direction of wave.', options: [
                { text: 'A longitudinal wave is a wave in', outcome: 'A longitudinal wave is a wave in which particles of the medium vibrate parallel to the direction.' },
                { text: 'perpendicular direction', outcome: 'Not quite — Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves".', reveals: 'sound-waves-are-transverse-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_4', title: 'Wavelength, Frequency and Time Period: Relationships',
          scaffold: { problem: 'A mosquito produces a sound by vibrating its wings at an average rate of 600 vibrations per second.',
            steps: [
            { text: 'Identify given quantities: frequency f = 600 Hz (since 600 vibrations per second = 600 Hz), wave speed v = 330 m/s.' },
            { text: 'Choose the formula relating v, f, and λ: v = fλ. Rearrange for λ: λ = v/f. Check units: (m/s) ÷ (1/s) = m, correct.' },
            { text: 'Substitute values with units: λ = 330 m/s ÷ 600 Hz = 330/600 m = 0.55 m.' },
            { text: 'Convert metres to centimetres: 0.55 m × 100 cm/m = 55 cm.' },
            { text: 'Verify reasonableness: A high-pitched mosquito sound has a short wavelength (few cm to tens of cm).', faded: true, blankAnswer: '55 cm' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In music period, a student plucks a stretched rubber band and hears a twang. He clamps it still with his palm — silence — yet insists \'the band is still stretched tight, so the sound should continue.\'',
            decisions: [{ prompt: 'Why did the sound die?', options: [
                { text: 'Sound needs vibration, not tension — his palm damped the oscillation, so no compressions and rarefactions formed in the air. Tautness is the setup; the to-and-fro motion is the source, which is why every instrument — string, membrane, air column, plate — is a vibrator.', outcome: 'This ties the sound to the motion itself rather than to the stretched condition — damp the vibration, kill the sound.' },
                { text: 'The sound should continue — a stretched object stores sound the way a battery stores charge.', outcome: 'Nothing stores sound; the air disturbance exists only while the source oscillates — stop the vibration and nothing is left to radiate.', reveals: 'objects-store-sound' },
                { text: 'It stopped because his palm blocked the sound waves from escaping — the vibration is still going inside.', outcome: 'His palm stopped the vibration itself; blocking the air path would muffle, but the deeper point is that a non-vibrating band produces nothing at all.', reveals: 'hand-blocks-waves' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_4', title: 'The bigger picture',
          caseStudy: { intro: 'No vibration, no sound — every note you\'ve ever heard is matter oscillating and shoving air into waves of squeezes and stretches. Silence is just stillness.',
            decisions: [{ prompt: 'What comes next? Sound · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Sound · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch5_1', difficulty: 'standard',
          question: 'Sound is a form of mechanical energy produced by the vibration of an object.',
          hint: 'Revisit the simple pendulum experiment (Class 7): measure time for 20 oscillations.',
          misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that.',
          parts: [
                { id: 'a', prompt: 'State the necessary condition for an object to become a source of sound.', answer: 'The object must vibrate (oscillate about a mean position)',
                  options: ['The object must vibrate (oscillate about a mean position)', 'the object must be made of metal', 'the object must be hit hard'],
                  hint: 'Revisit the simple pendulum experiment (Class 7): measure time for 20 oscillations, calculate.',
                  misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that sustained vibration.' },
                { id: 'b', prompt: 'A student plucks a rubber band stretched between two pencils and hears a sound.', answer: 'Damping stops the vibration of the rubber band',
                  options: ['Damping stops the vibration of the rubber band', 'tension is gone', 'air is blocked'],
                  hint: 'Revisit the simple pendulum experiment (Class 7): measure time for 20 oscillations, calculate.',
                  misconception: 'Students believe sound is produced *only* when an object is struck or plucked (an external impact), overlooking that sustained vibration.' }
          ],
            remediations: { 'sound-is-produced-only-when': { steps: ['Show a slow-motion video of a struck tuning fork dipped in water — water splashes prove vibration.', 'Have students hum a note while touching their throat, then stop humming but keep mouth open — vibration ceases, sound.', 'Use a smartphone spectrum analyser app: pluck a guitar string, note the persistent frequency peak while amplitude.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_10', difficulty: 'standard',
          question: 'Ultrasound refers to sound waves with frequencies greater than 20 kHz, which.',
          hint: 'Revisit node c9_physics_ch5_4 (Wavelength, Frequency and Time Period) to practice f = 1/T.',
          misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency.',
          parts: [
                { id: 'a', prompt: 'State the frequency ranges for ultrasound and infrasound, and give one application for each.', answer: 'Ultrasound: frequency > 20 kHz (e.g., medical sonography)',
                  options: ['Ultrasound: frequency > 20 kHz (e.g., medical sonography)', 'ultrasound', 'very loud sound', 'infrasound'],
                  hint: 'Revisit node c9_physics_ch5_4 (Wavelength, Frequency and Time Period) to practice f = 1/T and.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' },
                { id: 'b', prompt: 'An ultrasonic flaw detector sends a pulse into a steel rail (speed of sound in steel = 5960 m/s). The reflected pulse from a crack returns after 40 μs.', answer: 'Given: v = 5960 m/s, t = 40 μs = 40 × 10⁻⁶ s',
                  options: ['Given: v = 5960 m/s, t = 40 μs = 40 × 10⁻⁶ s', 'ultrasound', 'very loud sound', 'infrasound'],
                  hint: 'Revisit node c9_physics_ch5_4 (Wavelength, Frequency and Time Period) to practice f = 1/T and.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' },
                { id: 'c', prompt: 'Compare the penetration ability of ultrasound in air versus in soft tissue. Explain why medical ultrasound requires a gel coupling medium.', answer: 'Ultrasound attenuates strongly in air due to large impedance mismatch',
                  options: ['Ultrasound attenuates strongly in air due to large impedance mismatch', 'ultrasound', 'very loud sound', 'infrasound'],
                  hint: 'Revisit node c9_physics_ch5_4 (Wavelength, Frequency and Time Period) to practice f = 1/T and.',
                  misconception: 'Students often think "ultrasound" means "very loud sound" and "infrasound" means "very soft sound," confusing frequency with amplitude.' }
          ],
            remediations: { 'ultrasound-means-very-loud-sound': { steps: ['Use a tuning fork (512 Hz) and a smartphone spectrum analyzer app to show a peak at 512 Hz.', 'Play a 15 Hz tone and a 25 kHz tone from the app; observe that the 15 Hz tone is inaudible but appears on the spectrum.', 'Explicitly label the axes: x-axis = frequency (Hz), y-axis = amplitude (dB).', 'Ask the student to point to the infrasound and ultrasound regions on the graph, reinforcing that the distinction.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_11', difficulty: 'standard',
          question: 'Reflection of sound is the bouncing back of sound waves when they encounter.',
          hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for speed of sound and.',
          misconception: 'Students confuse echo with reverberation. The exact error: they think any reflected sound is an echo, not.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Reflection of sound is the bouncing back of sound waves when they encounter a boundary',
                  options: ['Reflection of sound is the bouncing back of sound waves when they encounter a boundary', 'Sound is a form of mechanical energy produced by the vibration of an object', 'Ultrasound refers to sound waves with frequencies greater than 20 kHz', 'Production of sound is the generation of mechanical waves through the vibration of a'],
                  hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for speed of sound and c9_physics_ch5_3.',
                  misconception: 'Students confuse echo with reverberation. The exact error: they think any reflected sound is an echo, not distinguishing between a single.' }
          ],
            remediations: { 'students-confuse-echo-with-reverberation': { steps: ['Clap in a small room — hear reverberation (blended reflections).', 'Clap near a distant wall (>= 17 m) — hear a distinct echo.', 'Explain: echo = distinct reflection (far, >= 0.1 s delay).', 'Reverberation = overlapping reflections (near, < 0.1 s delay).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_2', difficulty: 'standard',
          question: 'Production of sound is the generation of mechanical waves through the vibration.',
          hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as.',
          misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave.',
          parts: [
                { id: 'a', prompt: 'Explain how a vibrating tuning fork produces sound. Describe the formation of compressions and rarefactions.', answer: 'When the tuning fork vibrates, its prongs move back and forth',
                  options: ['When the tuning fork vibrates, its prongs move back and forth', 'the tuning fork makes the air vibrate', 'sound can travel through vacuum (like light)'],
                  hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as a wave.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' },
                { id: 'b', prompt: 'Why cannot sound travel through vacuum? Explain with an example.', answer: 'Sound is a mechanical wave',
                  options: ['Sound is a mechanical wave', 'sound is too weak in vacuum', 'sound can travel through vacuum (like light)'],
                  hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as a wave.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' },
                { id: 'c', prompt: 'Describe three different ways sound is produced in the human body and in musical instruments.', answer: '(1) Vocal cords — air from the lungs vibrates the vocal cords, producing voice',
                  options: ['(1) Vocal cords — air from the lungs vibrates the vocal cords, producing voice', 'sound is produced by talking', 'sound can travel through vacuum (like light)'],
                  hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as a wave.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' }
          ],
            remediations: { 'sound-can-travel-through-vacuum': { steps: ['Ring a bell in air — students hear it.', 'Place the bell in a vacuum jar and pump out air — the sound fades and disappears.', 'Ask: "Is the bell still vibrating?" (Yes, but there is no medium.) 4.', 'Conclude: sound needs a medium — it cannot travel through vacuum.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave.',
          parts: [
                { id: 'a', prompt: 'A student says: "Sound is produced when something moves." Evaluate this statement and refine it to be precise.', answer: 'The statement is too vague',
                  options: ['The statement is too vague', 'sound can travel through vacuum (like light)'],
                  hint: 'Revisit c9_physics_ch5_1 (Introduction to Sound) for the basic framework of sound as a wave.',
                  misconception: 'Students think sound can travel through vacuum (like light). The exact error: they conflate sound (mechanical wave, needs medium) with.' }
          ],
            remediations: { 'sound-can-travel-through-vacuum': { steps: ['Ring a bell in air — students hear it.', 'Place the bell in a vacuum jar and pump out air — the sound fades and disappears.', 'Ask: "Is the bell still vibrating?" (Yes, but there is no medium.) 4.', 'Conclude: sound needs a medium — it cannot travel through vacuum.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_3', difficulty: 'standard',
          question: 'A sound wave is a longitudinal mechanical wave in which particles of the medium.',
          hint: 'Revisit "Propagation of Sound: Need for a Medium" (c9_physics_ch5_2) and observe the.',
          misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: Define a longitudinal wave and state the direction of particle vibration relative to the direction of wave propagation in a sound.', answer: 'A longitudinal wave is a wave in',
                  options: ['A longitudinal wave is a wave in', 'perpendicular direction'],
                  hint: 'Revisit "Propagation of Sound: Need for a Medium" (c9_physics_ch5_2) and observe the slinky.',
                  misconception: 'Students believe sound waves are transverse because textbook diagrams show sinusoidal "waves" — they interpret the sine curve as the.' }
          ],
            remediations: { 'sound-waves-are-transverse-because': { steps: ['** Use a slinky — have student create a longitudinal pulse and mark one coil with tape.', '** Draw a particle diagram: 10 dots at equilibrium. Push first dot right — it hits second, etc.', '** Plot displacement vs position for this snapshot — show zero displacement at compression centre. **', '** Contrast with transverse wave on string — shake vertically, wave travels horizontally — particle path ≠ wave.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_4', difficulty: 'standard',
          question: 'Wavelength (λ) is the distance between two consecutive compressions.',
          hint: 'Review the simple pendulum experiment (c7_physics_ch04_002) to recall how time period and.',
          misconception: 'Students often think wavelength and frequency are directly proportional (if frequency increases, wavelength increases).',
          parts: [
                { id: 'a', prompt: 'State the SI units of wavelength, frequency, and time period. Write the formula that relates frequency and time period.', answer: 'Wavelength: metre (m)',
                  options: ['Wavelength: metre (m)', 'number of oscillations per second', 'seconds per oscillation'],
                  hint: 'Review the simple pendulum experiment (c7_physics_ch04_002) to recall how time period and frequency.',
                  misconception: 'Students often think wavelength and frequency are directly proportional (if frequency increases, wavelength increases) because they see.' },
                { id: 'b', prompt: 'A sound wave has a frequency of 500 Hz. Without using a calculator, explain whether its time period is greater than, less than, or equal to 1 second.', answer: 'Less than 1 second',
                  options: ['Less than 1 second', 'greater than 1 second', 'number of oscillations per second', 'seconds per oscillation'],
                  hint: 'Review the simple pendulum experiment (c7_physics_ch04_002) to recall how time period and frequency.',
                  misconception: 'Students often think wavelength and frequency are directly proportional (if frequency increases, wavelength increases) because they see.' },
                { id: 'c', prompt: 'A tuning fork vibrates at 256 Hz. The speed of sound in air is 340 m/s. Calculate the wavelength of the sound wave produced. Show all steps with units.', answer: 'Given: f = 256 Hz, v = 340 m/s',
                  options: ['Given: f = 256 Hz, v = 340 m/s', 'number of oscillations per second', 'seconds per oscillation'],
                  hint: 'Review the simple pendulum experiment (c7_physics_ch04_002) to recall how time period and frequency.',
                  misconception: 'Students often think wavelength and frequency are directly proportional (if frequency increases, wavelength increases) because they see.' },
                { id: 'd', prompt: 'Two sound waves travel in the same medium. Wave A has frequency 400 Hz and wavelength 0.85 m. Wave B has frequency 800 Hz.', answer: 'In the same medium, wave speed is constant',
                  options: ['In the same medium, wave speed is constant', 'wavelength stays same', 'number of oscillations per second', 'seconds per oscillation'],
                  hint: 'Review the simple pendulum experiment (c7_physics_ch04_002) to recall how time period and frequency.',
                  misconception: 'Students often think wavelength and frequency are directly proportional (if frequency increases, wavelength increases) because they see.' }
          ],
            remediations: { 'wavelength-and-frequency-are-directly': { steps: ['Take a slinky or rope. Create a wave pulse and measure its speed (distance/time).', 'Shake the slinky at a low frequency (e.g., 1 shake per second) and measure wavelength.', 'Double the shaking frequency (2 Hz) and measure wavelength again.', 'Record in a table: f, T=1/f, λ, v=fλ.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
