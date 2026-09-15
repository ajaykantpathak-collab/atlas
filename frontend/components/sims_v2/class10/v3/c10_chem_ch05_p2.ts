import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch05_p2: SimDef = {
    id: 'v3_c10_chem_ch05_p2',
    title: 'Periodic Classification of Elements · Part 2/2',
    subtitle: 'Hunt the number patterns that predicted the periodic table',
    classLevel: 10, subject: 'chemistry', topic: 'Periodic Classification of Elements · Part 2/2',
    chapters: ['c10_chem_ch05'],
    nodeIds: ['c10_chem_cbse_05_007', 'c10_chem_cbse_05_008', 'c10_chem_cbse_05_009', 'c10_chem_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a 19th-century chemist racing to organise the elements', intro: 'Fifty-six known elements, no table, no order — just scattered facts. Your job: find the hidden rhythm that makes similar elements fall into place.', goal: 'State Dobereiner\'s and Newlands\' rules precisely — atomic weight, not atomic number — and pinpoint where each fails.' },
    discovery: {
        question: 'Take lithium (7), sodium (23) and potassium (39). Sodium\'s mass, 23, is almost exactly the average of 7 and 39 — and all three metals behave alike. Coincidence?',
        options: ['No — it\'s a real pattern: Dobereiner found triads where the middle element\'s mass averages the other two', 'Yes — atomic mass has nothing to do with chemical behaviour', 'No — but only because all three are stored in oil', 'It\'s a coincidence that works for these three but for no other elements'],
        answer: 'No — it\'s a real pattern: Dobereiner found triads where the middle element\'s mass averages the other two',
        hook: 'Before the periodic table existed, chemists were already hearing its rhythm — threes that averaged out, then eighths that repeated. The table was discovered by listening for patterns.',
    },
    teaching: [
        { title: 'Groups in the Modern Periodic Table: Trends Down a Group', text: 'A group in the Modern Periodic Table is a vertical column of elements having the same number of valence electrons and similar chemical properties.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_05_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Rebuild classification history: test Dobereiner\'s triads, lay out Newlands\' octaves, and find the exact elements where each scheme breaks.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_007', title: 'Groups in the Modern Periodic Table: Trends Down a Group',
          caseStudy: { intro: 'Observe how sodium (Na) and potassium (K) both react vigorously with water, but potassium reacts with a lilac flame and explodes, while sodium melts into.',
            decisions: [{ prompt: 'State the trend in atomic radius down a group in the Modern Periodic Table and give the reason in one sentence.', options: [
                { text: 'Atomic radius increases down a group', outcome: 'Atomic radius increases down a group because a new electron shell is added at each successive.' },
                { text: 'atomic radius decreases', outcome: 'Not quite — Students often think "reactivity increases down all groups" because they memorize Group 1 trend and.', reveals: 'reactivity-increases-down-all-groups' },
                { text: 'reactivity increases down all groups', outcome: 'Not quite — Students often think "reactivity increases down all groups" because they memorize Group 1 trend and.', reveals: 'reactivity-increases-down-all-groups' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_008', title: 'Trends: Valency and Atomic Size Across Period and Down Group',
          caseStudy: { intro: 'Start by showing a Class 10 student two familiar objects: a lithium battery (small, light) and a potassium fertilizer bag (larger atoms, more reactive).',
            decisions: [{ prompt: 'State the valency of magnesium (atomic number 12) and explain how you determined it using its position in the Modern Periodic Table.', options: [
                { text: 'Magnesium (Z=12) has electron configuration 2,8,2', outcome: 'Magnesium (Z=12) has electron configuration 2,8,2. It is in Group 2, Period 3.' },
                { text: 'valency = 12', outcome: 'Not quite — Students write "valency = group number for all elements" — e.g., oxygen (Group 16) valency = 6.', reveals: 'students-write-valency-group-number' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_009', title: 'Trends: Metallic and Non-Metallic Properties in the Periodic Table',
          caseStudy: { intro: 'Observe a rusting iron nail (Fe) and a piece of burning magnesium ribbon (Mg) in the school laboratory — both are metals but magnesium burns vigorously while.',
            decisions: [{ prompt: 'Define metallic character and state how it changes across a period from left to right in the Modern Periodic Table.', options: [
                { text: 'Metallic character is the tendency of an atom to lose electrons and form positive ions', outcome: 'Metallic character is the tendency of an atom to lose electrons and form positive ions.' },
                { text: 'metallic character increases across a period', outcome: 'Not quite — Students often think that metallic character increases across a period because "metals are on the.', reveals: 'metallic-character-increases-across-a' },
                { text: 'metals are on the left', outcome: 'Not quite — Students often think that metallic character increases across a period because "metals are on the.', reveals: 'metallic-character-increases-across-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_010', title: 'Trends: Electronegativity and Nature of Oxides',
          caseStudy: { intro: 'Observe how rainwater becomes slightly acidic when it dissolves non-metal oxides like SO₂ and NO₂ from vehicle exhaust — a common issue in Indian cities like.',
            decisions: [{ prompt: 'Define electronegativity and state its trend across Period 3 from Na to Cl.', options: [
                { text: 'Electronegativity is the ability of a bonded atom to attract the shared electron pair', outcome: 'Electronegativity is the ability of a bonded atom to attract the shared electron pair; it increases.' },
                { text: 'amphoteric oxide = weakly acidic oxide', outcome: 'Not quite — Students often think that "amphoteric oxide = weakly acidic oxide" and write Al₂O₃ + 2HCl → AlCl₃.', reveals: 'amphoteric-oxide-weakly-acidic-oxide' },
                { text: 'neutral', outcome: 'Not quite — Students often think that "amphoteric oxide = weakly acidic oxide" and write Al₂O₃ + 2HCl → AlCl₃.', reveals: 'amphoteric-oxide-weakly-acidic-oxide' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school science quiz, a team is given three element cards — chlorine (35.5), bromine (80), iodine (127) — and told that early chemists grouped similar elements in threes. They must decide if these three really fit that old rule before the next round.',
            decisions: [{ prompt: 'How can the team check whether these three elements genuinely form a triad?', options: [
                { text: 'Average the atomic masses of the lightest and heaviest: (35.5 + 127) / 2 = 81.25, which is close to bromine\'s 80. Chlorine, bromine and iodine also share chemical properties — coloured, reactive non-metals — so they genuinely form a Dobereiner-style triad.', outcome: 'The triad rule puts the middle element\'s mass near the mean of the other two, and all three must actually resemble each other chemically — both checks pass here.' },
                { text: 'They form a triad simply because there are three of them — any three elements make a triad.', outcome: 'Three elements are a triad only if their properties are similar and the middle atomic mass is approximately the average of the other two.', reveals: 'any-three-is-triad' },
                { text: 'They cannot be a triad because the average, 81.25, does not equal 80 exactly, and the rule demands a perfect match.', outcome: 'The rule expects an approximate match, not a perfect one — bromine\'s 80 is close enough to 81.25, and the shared chemistry confirms the grouping.', reveals: 'triad-needs-exact-average' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'Every failed scheme taught chemists something. Triads showed mass patterns, octaves showed repetition — and their failures cleared the road for Mendeleev\'s leap.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_007', difficulty: 'standard',
          question: 'A group in the Modern Periodic Table is a vertical column of elements having.',
          hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule).',
          misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply.',
          parts: [
                { id: 'a', prompt: 'State the trend in atomic radius down a group in the Modern Periodic Table and give the reason in one sentence.', answer: 'Atomic radius increases down a group',
                  options: ['Atomic radius increases down a group', 'atomic radius decreases', 'reactivity increases down all groups', 'Iodine displaces chlorine from NaCl'],
                  hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and.',
                  misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply it universally.' },
                { id: 'b', prompt: 'Explain why the metallic character of elements increases down Group 14 (Carbon to Lead) even though they all have 4 valence electrons.', answer: 'Metallic character increases',
                  options: ['Metallic character increases', 'metallic character decreases', 'reactivity increases down all groups', 'Iodine displaces chlorine from NaCl'],
                  hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and.',
                  misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply it universally.' },
                { id: 'c', prompt: 'Write the balanced chemical equation for the reaction of potassium (K) with cold water.', answer: '2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g) + heat',
                  options: ['2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g) + heat', 'reactivity increases down all groups', 'Iodine displaces chlorine from NaCl'],
                  hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and.',
                  misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply it universally.' },
                { id: 'd', prompt: 'Analyze the following displacement reactions and predict which halogen will displace which: (i) Cl₂ + 2NaBr → 2NaCl + Br₂ (ii) Br₂ + 2NaI → 2NaBr + I₂ (iii) I₂.', answer: 'Chlorine displaces bromine',
                  options: ['Chlorine displaces bromine', 'reactivity increases down all groups', 'Iodine displaces chlorine from NaCl'],
                  hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and.',
                  misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply it universally.' }
          ],
            remediations: { 'reactivity-increases-down-all-groups': { steps: ['Revisit the definition of metallic vs non-metallic character (Class 7: c7_chem_ch01_011, Class 10 node 009).', 'Draw electron configurations of Li, Na, K and F, Cl, Br side-by-side.', 'For metals, circle the valence electron and note distance from nucleus increases → easier to lose.', 'Practice writing displacement reactions for Group 1 (with water) and Group 17 (halogen displacement) until the opposite.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Down Group 2, the first ionization energy increases because the nuclear charge increases." Evaluate this statement and correct it.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'reactivity increases down all groups', 'Iodine displaces chlorine from NaCl'],
                  hint: 'If stuck, revise Class 9 node c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and.',
                  misconception: 'Students often think "reactivity increases down all groups" because they memorize Group 1 trend and apply it universally.' }
          ],
            remediations: { 'reactivity-increases-down-all-groups': { steps: ['Revisit the definition of metallic vs non-metallic character (Class 7: c7_chem_ch01_011, Class 10 node 009).', 'Draw electron configurations of Li, Na, K and F, Cl, Br side-by-side.', 'For metals, circle the valence electron and note distance from nucleus increases → easier to lose.', 'Practice writing displacement reactions for Group 1 (with water) and Group 17 (halogen displacement) until the opposite.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_008', difficulty: 'standard',
          question: 'Valency is the combining capacity of an element determined by the number.',
          hint: 'If stuck, revisit c9_chem_ch2_6 (2n² rule for shell filling) and c9_chem_ch2_7 (valency.',
          misconception: 'Students write "valency = group number for all elements" — e.g., oxygen (Group 16) valency = 6.',
          parts: [
                { id: 'a', prompt: 'State the valency of magnesium (atomic number 12) and explain how you determined it using its position in the Modern Periodic Table.', answer: 'Magnesium (Z=12) has electron configuration 2,8,2',
                  options: ['Magnesium (Z=12) has electron configuration 2,8,2', 'valency = 12'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (2n² rule for shell filling) and c9_chem_ch2_7 (valency from.',
                  misconception: 'Students write "valency = group number for all elements" — e.g., oxygen (Group 16) valency = 6.' }
          ],
            remediations: { 'students-write-valency-group-number': { steps: ['Revisit c9_chem_ch2_7 (Valency determination) — practice writing electron configurations for Z=1-20, identify valence.', 'Draw Bohr models for Period 2 (Li to Ne) — count shells, note nuclear charge increase.', 'Use a periodic table app to visualize atomic radius bars — compare Period 2 vs Period 3.', 'Memorize the valency rule: "Metals lose = group number; Non-metals gain = 8 - group number (old) or 18 - group number.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_009', difficulty: 'standard',
          question: 'Metallic character is the tendency of an atom to lose electrons and form.',
          hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency).',
          misconception: 'Students often think that metallic character increases across a period because "metals are on the left" and they.',
          parts: [
                { id: 'a', prompt: 'Element X is in Group 14 and Period 3. Element Y is in Group 14 and Period 5. Which element has greater metallic character?', answer: 'Element Y (Period 5) has greater metallic character than Element X (Period 3)',
                  options: ['Element Y (Period 5) has greater metallic character than Element X (Period 3)', 'metals are on the left', 'Metallic character increases from left to right'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) to reinforce.',
                  misconception: 'Students often think that metallic character increases across a period because "metals are on the left" and they memorize the position.' },
                { id: 'b', prompt: 'Compare the metallic character of aluminium (Al, Group 13, Period 3) and gallium (Ga, Group 13, Period 4).', answer: 'Gallium (Ga) has greater metallic character than aluminium (Al)',
                  options: ['Gallium (Ga) has greater metallic character than aluminium (Al)', 'metals are on the left', 'Metallic character increases from left to right'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) to reinforce.',
                  misconception: 'Students often think that metallic character increases across a period because "metals are on the left" and they memorize the position.' }
          ],
            remediations: { 'metallic-character-increases-across-a': { steps: ['Have the student write the electron configurations of Na (2,8,1), Mg (2,8,2), Al (2,8,3), Si (2,8,4).', 'Ask: "Which atom loses electrons most easily to achieve a stable octet?"', 'Guide them to see that Na needs to lose only 1 electron, Mg loses 2, Al loses 3, Si would need to lose 4 (very.', 'Connect to nuclear charge: across the period, protons increase from 11 to 14, pulling valence electrons tighter.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_010', difficulty: 'standard',
          question: 'Electronegativity is the tendency of an atom in a chemical bond to attract the.',
          hint: 'If stuck, review c10_chem_cbse_05_009 (metallic/non-metallic trends) and c9_chem_ch3_4/5.',
          misconception: 'Students often think that "amphoteric oxide = weakly acidic oxide" and write Al₂O₃ + 2HCl → AlCl₃ + H₂O but forget the.',
          parts: [
                { id: 'a', prompt: 'Predict the nature of the oxide of an element X (atomic number 14) and write the balanced chemical equation for its reaction with (a) NaOH and (b) HF.', answer: 'Element X is Si (Group 14, Period 3)',
                  options: ['Element X is Si (Group 14, Period 3)', 'amphoteric oxide = weakly acidic oxide', 'neutral'],
                  hint: 'If stuck, review c10_chem_cbse_05_009 (metallic/non-metallic trends) and c9_chem_ch3_4/5.',
                  misconception: 'Students often think that "amphoteric oxide = weakly acidic oxide" and write Al₂O₃ + 2HCl → AlCl₃ + H₂O but forget the reaction with NaOH.' }
          ],
            remediations: { 'amphoteric-oxide-weakly-acidic-oxide': { steps: ['Revisit the definition of amphoteric — "reacts with both acids and bases to give salt and water".', 'Write both reactions for Al₂O₃ and ZnO side by side, highlighting the salt formed in each (aluminate/zincate with base.', 'Practise balancing: Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (note 2 NaAlO₂ for 2 Al).', 'Use the "charge balance" check: Al is +3 in Al₂O₃, in NaAlO₂ it\'s still +3 (Na⁺ AlO₂⁻).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
