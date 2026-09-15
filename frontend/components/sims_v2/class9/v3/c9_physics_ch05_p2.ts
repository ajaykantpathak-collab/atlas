import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch05_p2: SimDef = {
    id: 'v3_c9_physics_ch05_p2',
    title: 'Sound · Part 2/2',
    subtitle: 'Every sound is something shaking',
    classLevel: 9, subject: 'physics', topic: 'Sound · Part 2/2',
    chapters: ['c9_physics_ch05'],
    nodeIds: ['c9_physics_ch5_5', 'c9_physics_ch5_6', 'c9_physics_ch5_7', 'c9_physics_ch5_8', 'c9_physics_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an acoustic detective', intro: 'From a humming throat to a temple bell, every sound traces back to one thing: a vibration. Hunt down the vibrator inside each instrument and catch the wave it throws into the air.', goal: 'Understand that sound is produced by vibrating objects creating compressions and rarefactions — and identify the vibrating source in strings, membranes, air columns and plates.' },
    discovery: {
        question: 'Strike a steel thali, then press your palm flat on it — the sound dies instantly. The plate is still there, still struck. What did your hand actually kill?',
        options: ['The vibration — sound only exists while something oscillates; stop the to-and-fro motion and no compressions reach the air', 'The echo — sound needs to bounce', 'The metal\'s sound supply ran out', 'Your hand absorbed the noise particles'],
        answer: 'The vibration — sound only exists while something oscillates; stop the to-and-fro motion and no compressions reach the air',
        hook: 'Every instrument hides a different vibrator: sitar = string, tabla = membrane, flute = air column, bell = solid plate, your voice = vocal cords. And hitting harder raises loudness (amplitude), never the pitch (frequency).',
    },
    teaching: [
        { title: 'Amplitude and Intensity of Sound', text: 'Amplitude of a sound wave is the maximum displacement of a particle of the medium from its mean equilibrium position, measured in metres (m).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch5_5', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Go vibration-hunting: feel your throat hum \'Om\', identify the vibrating part in five Indian instruments, and build the spoon-and-thread trick that proves sound rides solids better than air.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_5', title: 'Amplitude and Intensity of Sound',
          scaffold: { problem: 'A portable speaker at a school assembly emits sound uniformly in all directions with an acoustic power of 0.2 W.',
            steps: [
            { text: 'Identify given quantities: Power P = 0.2 W, distance r = 5 m. Find intensity I in W/m².' },
            { text: 'For a point source radiating spherically, the wavefront area at distance r is A = 4πr². Use formula I = P / A.' },
            { text: 'Calculate area: A = 4 × 3.14 × (5 m)² = 4 × 3.14 × 25 = 314 m².' },
            { text: 'Compute intensity: I = 0.2 W / 314 m² = 6.37 × 10⁻⁴ W/m².' },
            { text: 'Verify: Intensity is small (order 10⁻⁴ W/m²), reasonable for a small speaker at 5 m. Units: W/m² correct.', faded: true, blankAnswer: '6.4 × 10⁻⁴ W/m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_6', title: 'Speed of Sound in Different Media',
          scaffold: { problem: 'A submarine sends a sonar pulse of frequency 50 kHz in seawater where the speed of sound is 1530 m/s.',
            steps: [
            { text: 'Identify given quantities: f = 50 kHz = 50,000 Hz, v_water = 1530 m/s, v_air = 340 m/s. Find λ_water and λ_air.' },
            { text: 'Recall the wave equation v = fλ, rearrange to λ = v/f. Check units: (m/s) / (1/s) = m, correct.' },
            { text: 'Substitute for water: λ_water = 1530 m/s / 50,000 Hz = 0.0306 m.' },
            { text: 'Substitute for air: λ_air = 340 m/s / 50,000 Hz = 0.0068 m.' },
            { text: 'Verify: Wavelength in water (3.06 cm) is longer than in air (0.68 cm) because speed is higher in water for the same.', faded: true, blankAnswer: 'λ_water = 0.0306 m (3.06 cm), λ_air = 0.0068 m (0.68 cm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_7', title: 'Reflection of Sound: Laws and Applications',
          scaffold: { problem: 'A sound wave has frequency 680 Hz and travels at 340 m/s. Calculate its wavelength and time period.',
            steps: [
            { text: 'Wavelength. lambda = v/f = 340/680 = 0.5 m.' },
            { text: 'Time period. T = 1/f = 1/680 = 0.00147 s (approximately 1.47 ms).', faded: true, blankAnswer: 'Wavelength = 340/680 = 0.5 m. Time period = 1/680 = 0.00147.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch5_8', title: 'Echo: Definition and Minimum Distance Condition',
          caseStudy: { intro: 'Listen carefully. The lowest sound you can hear is about 20 Hz — a deep rumble. The highest is about 20,000 Hz — a high-pitched whine.',
            decisions: [{ prompt: 'State the audible range of the human ear.', options: [
                { text: 'The human audible range is approximately 20 Hz to 20,000 Hz (20 kHz)', outcome: 'The human audible range is approximately 20 Hz to 20,000 Hz (20 kHz).' },
                { text: '0 to infinity', outcome: 'Not quite — Students think loudness determines whether a sound is audible.', reveals: 'loudness-determines-whether-a-sound' },
                { text: 'loudness determines whether a sound is audible', outcome: 'Not quite — Students think loudness determines whether a sound is audible.', reveals: 'loudness-determines-whether-a-sound' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_9', title: 'Reverberation and Acoustics',
          caseStudy: { intro: 'Bats fly in total darkness, yet they catch insects. How? They emit ultrasound (high-frequency sound, above 20,000 Hz) from their mouths or noses.',
            decisions: [{ prompt: 'Define ultrasound and state its frequency range.', options: [
                { text: 'Ultrasound is sound with frequency above 20,000 Hz (20 kHz), above the human audible', outcome: 'Ultrasound is sound with frequency above 20,000 Hz (20 kHz), above the human audible upper limit.' },
                { text: 'ultrasound is loud sound', outcome: 'Not quite — Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact.', reveals: 'ultrasound-is-dangerous-because-it' },
                { text: 'high-frequency', outcome: 'Not quite — Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact.', reveals: 'ultrasound-is-dangerous-because-it' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In music period, a student plucks a stretched rubber band and hears a twang. He clamps it still with his palm — silence — yet insists \'the band is still stretched tight, so the sound should continue.\'',
            decisions: [{ prompt: 'Why did the sound die?', options: [
                { text: 'Sound needs vibration, not tension — his palm damped the oscillation, so no compressions and rarefactions formed in the air. Tautness is the setup; the to-and-fro motion is the source, which is why every instrument — string, membrane, air column, plate — is a vibrator.', outcome: 'This ties the sound to the motion itself rather than to the stretched condition — damp the vibration, kill the sound.' },
                { text: 'The sound should continue — a stretched object stores sound the way a battery stores charge.', outcome: 'Nothing stores sound; the air disturbance exists only while the source oscillates — stop the vibration and nothing is left to radiate.', reveals: 'objects-store-sound' },
                { text: 'It stopped because his palm blocked the sound waves from escaping — the vibration is still going inside.', outcome: 'His palm stopped the vibration itself; blocking the air path would muffle, but the deeper point is that a non-vibrating band produces nothing at all.', reveals: 'hand-blocks-waves' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch5_9', title: 'You made it',
          caseStudy: { intro: 'No vibration, no sound — every note you\'ve ever heard is matter oscillating and shoving air into waves of squeezes and stretches. Silence is just stillness.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch5_5', difficulty: 'standard',
          question: 'Amplitude of a sound wave is the maximum displacement of a particle of the.',
          hint: 'If stuck, review c9_physics_ch5_3 (longitudinal wave particle motion) and.',
          misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder.',
          parts: [
                { id: 'a', prompt: 'Two sound waves travel in air. Wave X has amplitude 2A and frequency f. Wave Y has amplitude A and frequency 2f. Which wave has greater intensity?', answer: 'Wave X has greater intensity',
                  options: ['Wave X has greater intensity', 'higher frequency means more energy', 'amplitude and intensity are the same thing', 'higher frequency always means louder sound'],
                  hint: 'If stuck, review c9_physics_ch5_3 (longitudinal wave particle motion) and c9_physics_ch5_4 (v = fλ.',
                  misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder sound." They confuse the.' },
                { id: 'b', prompt: 'A speaker emits sound uniformly in all directions with a power of 0.05 W. Calculate the intensity at a distance of 2 m from the speaker.', answer: 'Given: Power P = 0.05 W, distance r = 2 m',
                  options: ['Given: Power P = 0.05 W, distance r = 2 m', 'amplitude and intensity are the same thing', 'higher frequency always means louder sound', 'pitch (frequency) directly controls loudness'],
                  hint: 'If stuck, review c9_physics_ch5_3 (longitudinal wave particle motion) and c9_physics_ch5_4 (v = fλ.',
                  misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder sound." They confuse the.' },
                { id: 'c', prompt: 'A graph shows displacement vs time for two sound waves at a fixed point. Wave P has amplitude 0.5 mm and period 2 ms.', answer: 'Intensity I ∝ A²f²',
                  options: ['Intensity I ∝ A²f²', 'amplitude and intensity are the same thing', 'higher frequency always means louder sound', 'pitch (frequency) directly controls loudness'],
                  hint: 'If stuck, review c9_physics_ch5_3 (longitudinal wave particle motion) and c9_physics_ch5_4 (v = fλ.',
                  misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder sound." They confuse the.' }
          ],
            remediations: { 'amplitude-and-intensity-are-the': { steps: ['Revisit c9_physics_ch5_3 (longitudinal wave animation) and observe particle displacement – amplitude is the maximum.', 'Use a slinky: create pulses with same frequency but different hand displacements; feel the energy difference when.', 'Plot I vs A² from a simulation (e.g., PhET "Wave on a String") to verify quadratic relationship.', 'Re-read the definition of intensity as power/area and practice one numerical from Worked Example 3.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the amplitude of a sound wave, its loudness doubles because loudness is directly proportional to amplitude." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'amplitude and intensity are the same thing', 'higher frequency always means louder sound', 'pitch (frequency) directly controls loudness'],
                  hint: 'If stuck, review c9_physics_ch5_3 (longitudinal wave particle motion) and c9_physics_ch5_4 (v = fλ.',
                  misconception: 'Students often believe that "amplitude and intensity are the same thing" or "higher frequency always means louder sound." They confuse the.' }
          ],
            remediations: { 'amplitude-and-intensity-are-the': { steps: ['Revisit c9_physics_ch5_3 (longitudinal wave animation) and observe particle displacement – amplitude is the maximum.', 'Use a slinky: create pulses with same frequency but different hand displacements; feel the energy difference when.', 'Plot I vs A² from a simulation (e.g., PhET "Wave on a String") to verify quadratic relationship.', 'Re-read the definition of intensity as power/area and practice one numerical from Worked Example 3.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_6', difficulty: 'standard',
          question: 'Speed of sound is the distance travelled per unit time by a sound wave as.',
          hint: 'If stuck, revisit c9_physics_ch5_4 (wavelength-frequency-speed relationship) and.',
          misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.',
          parts: [
                { id: 'a', prompt: 'State the typical speed of sound in air at 20°C, in water at 20°C, and in steel at 20°C, along with their SI units.', answer: 'At 20°C: air ≈ 343 m/s, water ≈ 1480 m/s, steel ≈ 5960 m/s',
                  options: ['At 20°C: air ≈ 343 m/s, water ≈ 1480 m/s, steel ≈ 5960 m/s', 'universal', 'denser medium means faster sound', 'sound travels at a single "universal" speed'],
                  hint: 'If stuck, revisit c9_physics_ch5_4 (wavelength-frequency-speed relationship) and c8_physics_ch5_3.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' },
                { id: 'b', prompt: 'Calculate the wavelength of a 1000 Hz sound wave in (a) air at 20°C and (b) steel at 20°C. Use v_air = 343 m/s and v_steel = 5960 m/s.', answer: 'air at 20°C and (',
                  options: ['air at 20°C and (', 'denser medium means faster sound', '"denser medium means faster sound"'],
                  hint: 'If stuck, revisit c9_physics_ch5_4 (wavelength-frequency-speed relationship) and c8_physics_ch5_3.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' },
                { id: 'c', prompt: 'Two students measure the time taken for a sound pulse to travel 100 m through a steel rod and through air at 20°C.', answer: 'Speed in steel = 100 m / 0.0168 s ≈ 5950 m/s (matches steel)',
                  options: ['Speed in steel = 100 m / 0.0168 s ≈ 5950 m/s (matches steel)', 'denser medium means faster sound', '"denser medium means faster sound"'],
                  hint: 'If stuck, revisit c9_physics_ch5_4 (wavelength-frequency-speed relationship) and c8_physics_ch5_3.',
                  misconception: 'Students often think "denser medium means faster sound" because they confuse density with stiffness.' }
          ],
            remediations: { 'denser-medium-means-faster-sound': { steps: ['Show a video or demo of a longitudinal wave on a slinky (low stiffness, low density) vs.', 'Ask students to predict which transmits a pulse faster.', 'Measure and compare.', 'Explicitly write v ∝ √(E/ρ) on the board and plug in approximate values for steel (E ≈ 200 GPa, ρ ≈ 7800 kg/m³) and.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_7', difficulty: 'standard',
          question: 'Characteristics of sound waves are the measurable properties that describe.',
          hint: 'Revisit c9_physics_ch5_2 (Production of Sound) for the concept of vibration and.',
          misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are.',
          parts: [
                { id: 'a', prompt: 'Define frequency and state its unit. How does frequency affect pitch?', answer: 'Frequency is the number of oscillations (or compressions) per second',
                  options: ['Frequency is the number of oscillations (or compressions) per second', 'frequency is how fast sound travels'],
                  hint: 'Revisit c9_physics_ch5_2 (Production of Sound) for the concept of vibration and c9_physics_ch5_3.',
                  misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are higher-pitched and quieter.' }
          ],
            remediations: { 'students-confuse-amplitude-loudness-with': { steps: ['Play a tone at fixed frequency, varying amplitude — students hear it get louder/quieter, not change pitch.', 'Play tones at fixed amplitude, varying frequency — students hear pitch change, not loudness.', 'Conclude: amplitude = loudness, frequency = pitch.', 'Practice: v = f * lambda calculations.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_8', difficulty: 'standard',
          question: 'The audible range is the range of sound frequencies that the human ear can.',
          hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for the definition of frequency.',
          misconception: 'Students think loudness determines whether a sound is audible.',
          parts: [
                { id: 'a', prompt: 'State the audible range of the human ear.', answer: 'The human audible range is approximately 20 Hz to 20,000 Hz (20 kHz)',
                  options: ['The human audible range is approximately 20 Hz to 20,000 Hz (20 kHz)', '0 to infinity', 'loudness determines whether a sound is audible'],
                  hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for the definition of frequency.',
                  misconception: 'Students think loudness determines whether a sound is audible.' },
                { id: 'b', prompt: 'Define infrasound and ultrasound with their frequency ranges.', answer: 'Infrasound: sound with frequency below 20 Hz',
                  options: ['Infrasound: sound with frequency below 20 Hz', 'infrasound is low volume', 'loudness determines whether a sound is audible'],
                  hint: 'Revisit c9_physics_ch5_7 (Characteristics of Sound Waves) for the definition of frequency.',
                  misconception: 'Students think loudness determines whether a sound is audible.' }
          ],
            remediations: { 'loudness-determines-whether-a-sound': { steps: ['Play a tone at 100 Hz (audible), then at 15,000 Hz (audible to young, maybe not to older).', 'Explain: 20-20,000 Hz is the audible range.', 'Below 20 Hz = infrasound (not heard).', 'Above 20,000 Hz = ultrasound (not heard).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_9', difficulty: 'standard',
          question: 'Ultrasound applications are the technological and medical uses of sound waves.',
          hint: 'Revisit c9_physics_ch5_8 (Audible Range) for the definition of ultrasound and.',
          misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate.',
          parts: [
                { id: 'a', prompt: 'Describe how medical ultrasound imaging works in three steps.', answer: 'Step 1: A probe (transducer) emits ultrasound into the body',
                  options: ['Step 1: A probe (transducer) emits ultrasound into the body', 'ultrasound uses radiation', 'high-frequency', 'radiation'],
                  hint: 'Revisit c9_physics_ch5_8 (Audible Range) for the definition of ultrasound and c9_physics_ch5_7.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' },
                { id: 'b', prompt: 'How do bats use ultrasound for navigation? Describe echolocation.', answer: 'Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses',
                  options: ['Bats emit ultrasound (up to 100,000 Hz) from their mouths or noses', 'bats see in the dark', 'high-frequency', 'radiation'],
                  hint: 'Revisit c9_physics_ch5_8 (Audible Range) for the definition of ultrasound and c9_physics_ch5_7.',
                  misconception: 'Students think ultrasound is dangerous because it is "high-frequency" or "radiation." The exact error: they conflate ultrasound (mechanical.' }
          ],
            remediations: { 'ultrasound-is-dangerous-because-it': { steps: ['Show a bat (or video) navigating in darkness using echolocation.', 'Show a sonogram image of a fetus.', 'Explain: both use ultrasound (sound above 20,000 Hz).', 'Emphasize: ultrasound is sound (mechanical wave), NOT radiation.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
