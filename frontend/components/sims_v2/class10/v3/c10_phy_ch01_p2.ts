import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch01_p2: SimDef = {
    id: 'v3_c10_phy_ch01_p2',
    title: 'Electricity',
    subtitle: 'Build circuits, measure current, and learn why your house wiring is designed the way it is.',
    classLevel: 10, subject: 'physics', topic: 'Electricity',
    chapters: ['c10_phy_ch01'],
    nodeIds: ['c10_phy_cbse_01_007', 'c10_phy_cbse_01_008', 'c10_phy_cbse_01_009', 'c10_phy_cbse_01_010', 'c10_phy_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an apprentice electrician checking a newly wired room', intro: 'A house has tripped its breaker three times this week. Your job: find what\'s wrong with the circuit logic before anyone touches a wire.', goal: 'Predict current, voltage and resistance in any circuit you build — and explain why series and parallel behave so differently.' },
    discovery: {
        question: 'Two identical bulbs — one wired in series, one in parallel. Which setup glows brighter, and why does the answer surprise most people?',
        options: ['Parallel — each bulb gets the full voltage', 'Series — the current is stronger', 'They glow the same — bulbs are identical', 'Series — the voltage adds up'],
        answer: 'Parallel — each bulb gets the full voltage',
        hook: 'Most students think \'more components = more power\'. In series the current must fight through both bulbs — parallel gives each its own path.',
    },
    teaching: [
        { title: 'Resistance of a System of Resistors: Parallel Combination', text: 'In a parallel combination of resistors, the potential difference (voltage) across each resistor is the same, and the total current divides among the branches.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_01_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'On the circuit lab: build a series and a parallel circuit — measure what happens to brightness when you remove one bulb from each.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_007', title: 'Resistance of a System of Resistors: Parallel Combination',
          scaffold: { problem: '** In a household lighting circuit, two LED bulbs rated 6 Ω and 12 Ω are connected in parallel across a 240 V mains supply.',
            steps: [
            { text: 'Identify given: R₁ = 6 Ω, R₂ = 12 Ω, V = 240 V. Find R_eq, I_total, I₁, I₂, P₁, P₂.' },
            { text: 'Parallel formula: 1/R_eq = 1/R₁ + 1/R₂. Substitute: 1/R_eq = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 Ω⁻¹.' },
            { text: 'Take reciprocal: R_eq = 4 Ω. (Check: 4 Ω < 6 Ω ✓)' },
            { text: 'Total current: I_total = V / R_eq = 240 V / 4 Ω = 60 A.' },
            { text: 'Branch currents (voltage same): I₁ = V/R₁ = 240/6 = 40 A; I₂ = V/R₂ = 240/12 = 20 A. Verify: I₁ + I₂ = 60 A = I_total ✓.' },
            { text: 'Power: P₁ = V²/R₁ = (240)²/6 = 57600/6 = 9600 W = 9.6 kW; P₂ = V²/R₂ = 57600/12 = 4800 W = 4.8 kW.', faded: true, blankAnswer: '** (a) 4 Ω, (b) 60 A, (c) 40 A (6 Ω bulb), 20 A (12 Ω.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_008', title: 'Heating Effect of Electric Current: Joule\'s Law',
          scaffold: { problem: 'An electric immersion heater rod rated 1000 W, 220 V is used to heat water for 15 minutes.',
            steps: [
            { text: 'Identify given quantities with units: Power P = 1000 W, Voltage V = 220 V, Time t = 15 min = 15 × 60 = 900 s.' },
            { text: 'Choose formulas: (a) P = VI → I = P/V. (b) V = IR → R = V/I or R = V²/P. (c) H = Pt (since P = H/t) or H = I²Rt.' },
            { text: 'Substitute values: (a) I = 1000 / 220 = 4.545 A. (b) R = 220 / 4.545 = 48.4 Ω (or R = 220²/1000 = 48.4 Ω).' },
            { text: 'Unit check: P in watts (J/s) × t in seconds → joules. I in A, V in V → W = VA. R = V/A = Ω. All consistent.' },
            { text: 'Verify reasonableness: 1 kW heater for 15 min → 0.25 kWh = 9 × 10⁵ J. Typical household heater energy.', faded: true, blankAnswer: '(a) I = 4.55 A, (b) R = 48.4 Ω, (c) H = 9 × 10⁵ J' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_009', title: 'Applications of Heating Effect: Electric Heater, Bulb, Fuse',
          scaffold: { problem: 'An electric geyser is rated 2000 W, 220 V. It is used for 30 minutes daily.',
            steps: [
            { text: 'Identify given: P = 2000 W, V = 220 V, t_daily = 30 min = 0.5 h, rate = ₹6.50/kWh.' },
            { text: 'Use P = VI to find current I = P/V = 2000/220 = 9.09 A.' },
            { text: 'Use V = IR or P = I²R to find resistance R = V/I = 220/9.09 = 24.2 Ω (or R = V²/P = 220²/2000 = 24.2 Ω).' },
            { text: 'Energy consumed per day E = P × t = 2000 W × 0.5 h = 1000 Wh = 1 kWh.' },
            { text: 'Energy for 30 days = 1 × 30 = 30 kWh. Cost = 30 × 6.50 = ₹195.', faded: true, blankAnswer: '(a) 9.09 A, (b) 24.2 Ω, (c) 1 kWh, (d) ₹195' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_010', title: 'Electric Power: Formula P = VI and Units (Watt)',
          scaffold: { problem: 'An electric bulb is rated 220 V and 100 W. (a) Calculate the current drawn. (b) Calculate the resistance of the bulb.',
            steps: [
            { text: '(a) I = P/V = 100/220 = 0.4545 A ≈ 0.45 A.' },
            { text: '(b) R = V²/P = 220²/100 = 48400/100 = 484 Ω. (Or: R = V/I = 220/0.4545 ≈ 484 Ω.)' },
            { text: '(c) Daily energy = P × t = 100 W × 5 h = 500 Wh = 0.5 kWh.' },
            { text: '30-day energy = 0.5 × 30 = 15 kWh.' },
            { text: 'Verify: 100 W × 5 h × 30 days = 15000 Wh = 15 kWh. ✓', faded: true, blankAnswer: '(a) I ≈ 0.45 A. (b) R = 484 Ω. (c) 15 kWh in 30 days.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_01_011', title: 'Word Problems: Combining Ohm\'s Law, Power and Heating Effect',
          scaffold: { problem: 'An electric geyser rated 2000 W, 230 V is used in a household for 30 minutes every day. The cost of electricity is ₹6.50 per kWh (unit).',
            steps: [
            { text: 'Identify given quantities with units. P = 2000 W, V = 230 V, t_daily = 30 min = 0.5 h, cost per unit = ₹6.50/kWh, days.' },
            { text: 'Identify formulas and check units. (a) I = P/V (A = W/V). (b) R = V/I or R = V²/P (Ω = V/A = V²/W).' },
            { text: 'Substitute values with units. (a) I = 2000 W / 230 V = 8.6956... A. (b) R = (230 V)² / 2000 W = 52900 / 2000 = 26.45 Ω.' },
            { text: 'Compute and track unit cancellation. I: W/V = (J/s)/(J/C) = C/s = A ✓. R: V²/W = V²/(V·A) = V/A = Ω ✓.' },
            { text: 'Verify physical reasonableness. Current ~8.7 A is plausible for a 2 kW appliance at 230 V (typical household wiring.' },
            { text: 'State final answers with units. (a) I = 8.70 A (b) R = 26.5 Ω (c) E_daily = 1.00 kWh (d) Cost = ₹195.00', faded: true, blankAnswer: '(a) 8.70 A (b) 26.5 Ω (c) 1.00 kWh (d) ₹195.00' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student builds a simple circuit — battery, switch, one long wire, a bulb. She adds a second ammeter far from the battery and predicts it will read lower, \'because some of the current gets used up travelling along the long wire.\'',
            decisions: [{ prompt: 'Will the far ammeter really read lower?', options: [
                { text: 'No — current is the rate of flow of charge, and charge is neither created nor used up in the wire. In a single loop the same charge per second must pass every point, so both ammeters read the same; the wire\'s resistance affects how much current flows, but not \'how much survives\' the journey.', outcome: 'The bulb is dimmer or brighter because the whole circuit\'s current changed — not because current leaks away along the path. What enters the wire must leave it.' },
                { text: 'She is right — the farther ammeter reads lower since current is consumed by the wire on the way.', outcome: 'Current is not a substance that gets spent — it is the flow of charge itself, and charge conservation forces the same reading at every point in one loop.', reveals: 'current-gets-used-up' },
                { text: 'The second ammeter will read higher, because charge piles up waiting to get through the long wire.', outcome: 'Charge cannot accumulate in a steady circuit — it flows through continuously at the same rate everywhere, so neither end can read higher.', reveals: 'charge-piles-up' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'Ohm\'s law isn\'t a formula to memorise — it\'s the reason your house is wired in parallel and why a fuse is a calculated sacrifice.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_007', difficulty: 'standard',
          question: 'In a parallel combination of resistors, the potential difference (voltage).',
          hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and.',
          misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule.',
          parts: [
                { id: 'a', prompt: 'State the formula for the equivalent resistance of three resistors R₁, R₂, R₃ connected in parallel. Write the SI unit of equivalent resistance.', answer: 'Correct answer: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃',
                  options: ['Correct answer: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃', 'siemens', 'the current is the same through all resistors'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and c10_phy_cbse_01_006.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' },
                { id: 'b', prompt: 'Two resistors of 6 Ω and 3 Ω are connected in parallel across a 12 V battery.', answer: 'Correct reasoning: In parallel, current has multiple paths',
                  options: ['Correct reasoning: In parallel, current has multiple paths', 'it becomes 9 Ω because resistances add', 'the current is the same through all resistors'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and c10_phy_cbse_01_006.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' },
                { id: 'c', prompt: 'Three resistors of 2 Ω, 4 Ω, and 4 Ω are connected in parallel across a 12 V battery.', answer: '**Step 1:** Given: R₁ = 2 Ω, R₂ = 4 Ω, R₃ = 4 Ω, V = 12 V',
                  options: ['**Step 1:** Given: R₁ = 2 Ω, R₂ = 4 Ω, R₃ = 4 Ω, V = 12 V', 'the current is the same through all resistors'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and c10_phy_cbse_01_006.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' },
                { id: 'd', prompt: 'A student connects two identical resistors first in series, then in parallel, across the same battery. Compare the total power dissipated in the two cases.', answer: 'Let each resistor = R',
                  options: ['Let each resistor = R', 'series draws more power', 'the current is the same through all resistors'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and c10_phy_cbse_01_006.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' }
          ],
            remediations: { 'in-a-parallel-circuit': { steps: ['** Use water-flow analogy: Two pipes (resistors) side by side from a tank (battery) — water (current) flows through.', '** Re-derive formula physically: V same → I₁ = V/R₁, I₂ = V/R₂ → I_total = V(1/R₁ + 1/R₂) → R_eq = V/I_total = 1/(1/R₁.', '** Practice "reciprocal sum → reciprocal" drill: For 2 Ω and 2 Ω, 1/R_eq = 1/2 + 1/2 = 1 → R_eq = 1 Ω.', '** Solve 5 numerical problems where the answer is checked by verifying R_eq < smallest R.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule.',
          parts: [
                { id: 'a', prompt: 'A student solves a parallel resistor problem: "R₁ = 3 Ω, R₂ = 6 Ω in parallel. 1/R_eq = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2.', answer: 'The solution is **incorrect**',
                  options: ['The solution is **incorrect**', 'the current is the same through all resistors'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s law) for V=IR manipulation and c10_phy_cbse_01_006.',
                  misconception: 'Students believe that in a parallel circuit, "the current is the same through all resistors" — this is the series rule incorrectly.' }
          ],
            remediations: { 'in-a-parallel-circuit': { steps: ['** Use water-flow analogy: Two pipes (resistors) side by side from a tank (battery) — water (current) flows through.', '** Re-derive formula physically: V same → I₁ = V/R₁, I₂ = V/R₂ → I_total = V(1/R₁ + 1/R₂) → R_eq = V/I_total = 1/(1/R₁.', '** Practice "reciprocal sum → reciprocal" drill: For 2 Ω and 2 Ω, 1/R_eq = 1/2 + 1/2 = 1 → R_eq = 1 Ω.', '** Solve 5 numerical problems where the answer is checked by verifying R_eq < smallest R.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_008', difficulty: 'standard',
          question: 'Joule\'s Law states that the heat produced in a conductor is directly.',
          hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c9_physics_ch4_1 (Work = force.',
          misconception: 'Students often believe "thicker wires produce more heat because they have more material" or "higher resistance always.',
          parts: [
                { id: 'a', prompt: 'Two identical resistors are connected to the same battery. In the first case, they are connected in series; in the second, in parallel.', answer: 'More heat is produced in the parallel combination',
                  options: ['More heat is produced in the parallel combination', 'more resistance always means more heat', 'thicker wires produce more heat', 'higher resistance always gives more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c9_physics_ch4_1 (Work = force.',
                  misconception: 'Students often believe "thicker wires produce more heat because they have more material" or "higher resistance always gives more heat".' },
                { id: 'b', prompt: 'An electric kettle rated 1500 W, 220 V is used for 10 minutes. Calculate the heat produced in joules.', answer: 'Given: P = 1500 W, V = 220 V, t = 10 min = 600 s',
                  options: ['Given: P = 1500 W, V = 220 V, t = 10 min = 600 s', 'thicker wires produce more heat', 'higher resistance always gives more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c9_physics_ch4_1 (Work = force.',
                  misconception: 'Students often believe "thicker wires produce more heat because they have more material" or "higher resistance always gives more heat".' },
                { id: 'c', prompt: 'A student plots a graph of heat produced (H) versus current (I) for a fixed resistor and fixed time. What will be the shape of the graph?', answer: 'The graph of H vs I is a parabola passing through the origin (H ∝ I²)',
                  options: ['The graph of H vs I is a parabola passing through the origin (H ∝ I²)', 'thicker wires produce more heat', 'higher resistance always gives more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_003 (Ohm\'s Law) and c9_physics_ch4_1 (Work = force.',
                  misconception: 'Students often believe "thicker wires produce more heat because they have more material" or "higher resistance always gives more heat".' }
          ],
            remediations: { 'thicker-wires-produce-more-heat': { steps: ['Revisit Class 10 node c10_phy_cbse_01_003 (Ohm\'s Law) to reinforce that for a given voltage, I and R are inversely.', 'Do a quick numerical check: take V = 10 V, t = 1 s. Calculate H for R = 2 Ω (I = 5 A, H = 25×2 = 50 J) and R = 5 Ω (I.', 'Write the two forms: H = I²Rt (constant I) and H = V²t/R (constant V).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_009', difficulty: 'standard',
          question: 'The heating effect of electric current is utilized in appliances where.',
          hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law).',
          misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with.',
          parts: [
                { id: 'a', prompt: 'State the two essential properties of the material used for the filament of an incandescent bulb and explain why each property is necessary.', answer: 'The filament material (tungsten) must have: (1) High resistivity',
                  options: ['The filament material (tungsten) must have: (1) High resistivity', 'low resistance to allow more current', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law) and practice.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'b', prompt: 'Why is the fuse wire always connected in series with the live wire of the circuit, and why must it have a low melting point but the connecting wires must have.', answer: 'Fuse is in series so that the same current flows through it and the appliance',
                  options: ['Fuse is in series so that the same current flows through it and the appliance', 'fuse in parallel', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law) and practice.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'c', prompt: 'An electric heater rated 1500 W, 220 V is connected to a 220 V supply.', answer: 'Given: P = 1500 W, V = 220 V, t = 10 min = 600 s',
                  options: ['Given: P = 1500 W, V = 220 V, t = 10 min = 600 s', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law) and practice.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' },
                { id: 'd', prompt: 'Two bulbs are marked 60 W, 220 V and 100 W, 220 V. Which bulb has higher resistance?', answer: 'Resistance R = V²/P',
                  options: ['Resistance R = V²/P', '100 W bulb is brighter', 'higher wattage appliance has higher resistance', 'stronger'],
                  hint: 'If stuck, review c10_phy_cbse_01_008 (Joule\'s law) and c10_phy_cbse_01_003 (Ohm\'s law) and practice.',
                  misconception: 'Students think that "higher wattage appliance has higher resistance" because they associate higher power with "stronger" heating.' }
          ],
            remediations: { 'higher-wattage-appliance-has-higher': { steps: ['Revisit the formula P = V²/R (derived from P = VI and V = IR) with fixed V = 220 V.', 'Recall the series circuit rule: same current, heat ∝ R (H = I²Rt).', 'Do a quick activity: connect a 40 W and 100 W bulb in series to 220 V (under teacher supervision) — observe the 40.', 'Practice 3 numerical problems where you first find resistances from power ratings, then analyze series/parallel.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_010', difficulty: 'standard',
          question: 'Electric power is the rate at which electrical energy is consumed or dissipated.',
          hint: 'Review Ohm\'s law (c10_phy_cbse_01_004) and practice substituting V = IR into P = VI.',
          misconception: 'Students often confuse power (W) with energy (J or kWh). Power is the RATE (joules per second); energy is the TOTAL.',
          parts: [
                { id: 'a', prompt: 'Define electric power and state its SI unit.', answer: 'Electric power is the rate at',
                  options: ['Electric power is the rate at', 'power is energy'],
                  hint: 'Review Ohm\'s law (c10_phy_cbse_01_004) and practice substituting V = IR into P = VI to get the.',
                  misconception: 'Students often confuse power (W) with energy (J or kWh). Power is the RATE (joules per second); energy is the TOTAL (power × time).' }
          ],
            remediations: { 'students-often-confuse-power-w': { steps: ['Emphasise: Power = rate (W), Energy = total (J or kWh).', 'Practice all three formulas: P = VI, P = I²R, P = V²/R.', 'Choose based on what is given.', 'For bill calculations: always convert W to kW (divide by 1000) before multiplying by hours.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_01_011', difficulty: 'standard',
          question: 'Word problems combining Ohm\'s Law, electric power, and heating effect require.',
          hint: 'If stuck, revisit c10_phy_cbse_01_010 (Power formulas and kWh) and c10_phy_cbse_01_008.',
          misconception: 'Students often believe that "higher resistance always produces more heat because H = I²R" and apply this even when.',
          parts: [
                { id: 'a', prompt: 'A 100 W, 220 V electric bulb is connected to a 220 V supply. What is the current drawn by the bulb? State the formula used and the SI unit of the answer.', answer: 'Correct answer: I = P/V = 100 W / 220 V = 0.4545 A (ampere)',
                  options: ['Correct answer: I = P/V = 100 W / 220 V = 0.4545 A (ampere)', 'higher resistance always produces more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_010 (Power formulas and kWh) and c10_phy_cbse_01_008 (Joule\'s Law.',
                  misconception: 'Students often believe that "higher resistance always produces more heat because H = I²R" and apply this even when voltage is constant.' },
                { id: 'b', prompt: 'An electric iron rated 750 W, 220 V is used for 20 minutes. Calculate (a) the resistance of its heating element, (b) the energy consumed in joules, and (c) the.', answer: 'Given: P = 750 W, V = 220 V, t = 20 min = 1200 s = 20/60 = 1/3 h',
                  options: ['Given: P = 750 W, V = 220 V, t = 20 min = 1200 s = 20/60 = 1/3 h', 'higher resistance always produces more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_010 (Power formulas and kWh) and c10_phy_cbse_01_008 (Joule\'s Law.',
                  misconception: 'Students often believe that "higher resistance always produces more heat because H = I²R" and apply this even when voltage is constant.' },
                { id: 'c', prompt: 'Two heaters A (1000 W, 220 V) and B (500 W, 220 V) are connected in parallel across a 220 V supply. Which heater produces more heat per second?', answer: 'Heat per second = power',
                  options: ['Heat per second = power', 'higher resistance means more heat (H=I²R)', 'higher resistance always produces more heat'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_010 (Power formulas and kWh) and c10_phy_cbse_01_008 (Joule\'s Law.',
                  misconception: 'Students often believe that "higher resistance always produces more heat because H = I²R" and apply this even when voltage is constant.' }
          ],
            remediations: { 'higher-resistance-always-produces-more': { steps: ['Take two bulbs — one 40 W, 220 V and one 100 W, 220 V. Compute their resistances: R₄₀ = 220²/40 = 1210 Ω, R₁₀₀.', 'Connect both in parallel to a 220 V source (or simulate with a 12 V battery and two resistors of ratio ~2.5:1).', 'Ask: "Which is hotter? Which has higher resistance?"', 'Derive H = V²t/R from H = I²Rt and I = V/R. Emphasize: "When V is same (parallel), use H = V²t/R.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
