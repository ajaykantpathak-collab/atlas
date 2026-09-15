import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch13_p2 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch13_p2: SimDef = {
    id: 'v3_c12_phy_ch13_p2',
    title: 'Nuclei · Part 2/2',
    subtitle: 'No chlorine atom is 35.46 — the average is',
    classLevel: 12, subject: 'physics', topic: 'Nuclei · Part 2/2',
    chapters: ['c12_phy_ch13'],
    nodeIds: ['c12_phy_cbse_13_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Nuclear decoder', intro: 'The periodic table\'s decimal is a statistical ghost — no atom carries it, yet it describes them all.', goal: 'Decode nuclide notation — Z, A, N — and separate mass number from atomic mass, isotopes from isobars from isotones.' },
    discovery: {
        question: 'No chlorine atom weighs 35.46 u — yet the periodic table insists it does. Where does that number live?',
        options: ['In the average — it\'s the weighted mean of chlorine\'s isotopes (³⁵Cl at ~75%, ³⁷Cl at ~25%), a property of the sample, not any single atom', 'In every atom', 'Half a neutron', 'Rounding error'],
        answer: 'In the average — it\'s the weighted mean of chlorine\'s isotopes (³⁵Cl at ~75%, ³⁷Cl at ~25%), a property of the sample, not any single atom',
        hook: 'Mass number and atomic mass are different objects — A is the integer count of nucleons in one nucleus; atomic mass is the averaged decimal of all isotopes. And the triple classification is strict: same Z isotopes, same A isobars, same N isotones.',
    },
    teaching: [
        { title: 'Law of Radioactive Decay: Half-Life and Mean Life', text: 'The law of radioactive decay states that the rate of disintegration of a radioactive sample at any instant is directly proportional to the number of undecayed nuclei present at that instant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_13_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Read a nuclide symbol like a licence plate: extract Z, A and N, classify pairs as isotopes/isobars/isotones, and compute the mass defect hiding inside ⁵⁶Fe.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_13_007', title: 'Law of Radioactive Decay: Half-Life and Mean Life',
          scaffold: { problem: 'A radioactive sample of iodine-131 (half-life = 8.04 days) has an initial activity of 5.0 MBq.',
            steps: [
            { text: 'Convert half-life to seconds: T₁/₂ = 8.04 days × 24 h/day × 3600 s/h = 8.04 × 86400 s = 694,656 s.' },
            { text: 'Compute decay constant: λ = ln2 / T₁/₂ = 0.693147 / 694656 s = 9.98 × 10⁻⁷ s⁻¹.', faded: true, blankAnswer: '(a) λ = 9.98 × 10⁻⁷ s⁻¹ (b) R = 0.625 MBq (c) t = 45.4 days.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on nuclear power, a speaker claims \'splitting any nucleus releases energy — fission is fission.\' A teammate wonders if splitting iron would power a reactor too.',
            decisions: [{ prompt: 'What does the binding-energy-per-nucleon curve say?', options: [
                { text: 'Direction matters — the curve peaks near iron (~8.8 MeV/nucleon), so energy is released only when products sit higher on the curve: splitting uranium (~7.6) works because the fragments are more tightly bound, but splitting iron moves downhill and would cost energy.', outcome: 'The chapter\'s reading of the curve: fission pays the very heavy, fusion pays the very light — iron at the summit is the point where neither direction yields.' },
                { text: 'The speaker is right — breaking any nucleus frees binding energy.', outcome: 'Binding energy is what\'s released only when the products bind more tightly — iron\'s daughters would be less bound than iron itself, so the \'fission\' would consume energy, not emit it.', reveals: 'any-split-releases' },
                { text: 'Iron fission works but just gives less energy than uranium fission.', outcome: 'It\'s not smaller, it\'s negative — past the Fe peak the daughters sit lower on the curve, so the reaction runs the wrong way energetically; \'less energy\' would still be a positive release.', reveals: 'past-peak-still-pays' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_13_007', title: 'You made it',
          caseStudy: { intro: 'You can now decode any nuclide — and keep the integer count of one nucleus separate from the decimal average of a sample.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_007', difficulty: 'standard',
          question: 'The law of radioactive decay states that the rate of disintegration of.',
          hint: 'If stuck on the differential equation, review c11_math_cbse_13_006 (intuitive idea.',
          misconception: 'Students often think that after one half-life, exactly half the nuclei have decayed *simultaneously* at the moment.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of the decay constant λ and write the differential equation for radioactive decay. Explain the physical meaning of the negative sign.', answer: 'The SI unit of λ is s⁻¹ (per second)',
                  options: ['The SI unit of λ is s⁻¹ (per second)', 'the number of nuclei increases'],
                  hint: 'If stuck on the differential equation, review c11_math_cbse_13_006 (intuitive idea.',
                  misconception: 'Students often think that after one half-life, exactly half the nuclei have decayed *simultaneously* at the moment T₁/₂, or that a nucleus.' }
          ],
            remediations: { 'after-one-half-life': { steps: ['Revisit the concept of probability per unit time (λ) from c12_phy_cbse_13_006.', 'Simulate decay with dice: roll 100 dice, remove all sixes (decay probability 1/6 per roll), repeat.', 'Plot remaining dice vs roll number.', 'Observe the exponential trend and that half-life is ~3.8 rolls (ln2/(1/6)), but the exact number of sixes each roll.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
