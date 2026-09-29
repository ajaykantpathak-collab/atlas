import type { SimDef } from '../../engine/types';
import C8_PhysicsKineticTheoryMatterSim from '../../../simulations/c6_12/C8_PhysicsKineticTheoryMatterSim';

/** v3 wrapped master — C8_PhysicsKineticTheoryMatterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_physicskinetictheorymattersim: SimDef = {
    id: 'v3w_c8_physicskinetictheorymattersim',
    title: 'Solubility of Gases in Liquids: Effect of Temperature and Pressure',
    subtitle: 'This node covers the qualitative and quantitative effects of temperature (inverse.',
    classLevel: 8, subject: 'physics', topic: 'Solubility of Gases in Liquids: Effect of Temperature and Pressure',
    chapters: [],
    nodeIds: ['c8_physics_ch5_10', 'c8_physics_ch8_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Observe a sealed cold drink bottle: when opened, bubbles rush out — the dissolved carbon dioxide escapes.', goal: 'Master Solubility of Gases in Liquids: Effect of Temperature and Pressure.' },
    discovery: {
        question: 'A student claims: "If I double the pressure on a gas-liquid system, the amount of dissolved gas will double, no matter what the temperature is." Evaluate this.',
        options: ['The statement is partially correct but incomplete', 'always true', 'never true'],
        answer: 'The statement is partially correct but incomplete',
        hook: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility.',
    },
    teaching: [
        { title: 'The solubility of a gas in a liquid is the.', text: 'The solubility of a gas in a liquid is the maximum amount of gas (in moles or grams) that can dissolve in a fixed volume of solvent at a given temperature and pressure, reaching dynamic equilibrium.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch5_10', title: 'The solubility of a gas in a liquid is.',
          scaffold: { problem: 'A 1.5 L bottle of carbonated water is sealed under 3.0 atm CO₂ pressure at 20°C.',
            steps: [
            { text: 'Identify given quantities: P = 3.0 atm, kₕ = 3.7 × 10⁻² mol·L⁻¹·atm⁻¹, V = 1.5 L. Find: n (moles of CO₂).' },
            { text: 'Use Henry\'s law to find concentration: C = kₕP. Check units: (mol·L⁻¹·atm⁻¹) × atm = mol/L — correct.' },
            { text: 'Substitute: C = (3.7 × 10⁻² mol·L⁻¹·atm⁻¹) × (3.0 atm) = 1.11 × 10⁻¹ mol/L = 0.111 M.' },
            { text: 'Convert concentration to moles: n = C × V = (0.111 mol/L) × (1.5 L) = 0.1665 mol. Track units: L cancels, leaving mol.' },
            { text: 'Verify reasonableness: 0.1665 mol CO₂ ≈ 7.3 g — plausible for a soda bottle.', faded: true, blankAnswer: '0.167 mol CO₂' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_7', title: 'Balance in nature is the dynamic.',
          scaffold: { problem: 'A grassland ecosystem has grass (producer), grasshoppers (primary consumer), frogs (secondary consumer), and snakes (tertiary consumer).',
            steps: [
            { text: 'Identify the trophic levels and direct feeding links: grass → grasshoppers → frogs → snakes.' },
            { text: 'Trace the immediate effect: grasshopper population sharply decreases.' },
            { text: 'Predict short-term changes: with fewer grasshoppers, grass population increases (less grazing); frogs starve and their.' },
            { text: 'Describe the feedback loop: as frog numbers drop, grasshopper predation pressure eases → surviving grasshoppers may.' },
            { text: 'Conclude that balance is restored not by returning to original numbers, but by establishing a new stable range of.', faded: true, blankAnswer: 'Grass increases initially, then decreases as grasshoppers.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch8_7', title: 'Identify each idea',
          dissect: { specimen: 'Solubility of Gases in Liquids: Effect of Temperature and Pressure', spots: [
            { id: 's1', label: 'The solubility of a gas', prompt: 'Which idea is this? — The solubility of a gas in a liquid is the maximum amount of gas (in moles or grams) that.', answer: 'The solubility of a gas', options: ['The solubility of a gas', 'Balance in nature is the'] },
            { id: 's2', label: 'Balance in nature is the', prompt: 'Which idea is this? — Balance in nature is the dynamic equilibrium in an ecosystem where populations of.', answer: 'Balance in nature is the', options: ['Balance in nature is the', 'The solubility of a gas'] }
          ] } }
    ],
    explore: { component: C8_PhysicsKineticTheoryMatterSim, prompt: 'Explore the interactive — Solubility of Gases in Liquids: Effect of Temperature and Pressure' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch5_10', difficulty: 'standard',
          question: 'The solubility of a gas in a liquid is the maximum amount of gas (in moles or.',
          hint: 'Revisit c8_physics_ch5_4 (solubility definition) and c6_physics_ch07_024 (heat vs.',
          misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility.',
          parts: [
                { id: 'a', prompt: 'A soda bottle is sealed at 2.5 atm CO₂ partial pressure at 25°C. Henry\'s law constant for CO₂ in water at 25°C is 3.3 × 10⁻² mol·L⁻¹·atm⁻¹.', answer: 'Step 1: Identify given: P = 2.5 atm, kₕ = 3.3 × 10⁻² mol·L⁻¹·atm⁻¹',
                  options: ['Step 1: Identify given: P = 2.5 atm, kₕ = 3.3 × 10⁻² mol·L⁻¹·atm⁻¹', 'heating always increases solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' },
                { id: 'b', prompt: 'Two identical sealed bottles contain water equilibrated with air at 1 atm total pressure. Bottle A is at 10°C, Bottle B at 30°C.', answer: 'Bottle A (10°C) has higher dissolved O₂ concentration',
                  options: ['Bottle A (10°C) has higher dissolved O₂ concentration', 'heating always increases solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' }
          ],
            remediations: { 'heating-always-increases-solubility-because': { steps: ['Demonstrate exothermic dissolution: Feel a CO₂ cartridge get cold when gas expands — reverse process (dissolving).', 'Use a syringe with water and air: Pull plunger to lower pressure, see bubbles form (degassing); push plunger to.', 'temperature for O₂ in water (data table provided) — student sees downward curve.', 'Explicitly contrast with solid solubility curve (upward) on same axes.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I double the pressure on a gas-liquid system, the amount of dissolved gas will double, no matter what the temperature is." Evaluate this.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'always true', 'never true', 'heating always increases solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' },
                { id: 'b', prompt: 'Two identical sealed bottles contain water equilibrated with air at 1 atm total pressure. Bottle A is at 10°C, Bottle B at 30°C.', answer: 'Bottle A (10°C) has higher dissolved O₂ concentration',
                  options: ['Bottle A (10°C) has higher dissolved O₂ concentration', 'heating always increases solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "heating always increases solubility" because they generalize from solids (sugar, salt) where solubility rises with.' }
          ],
            remediations: { 'heating-always-increases-solubility-because': { steps: ['Demonstrate exothermic dissolution: Feel a CO₂ cartridge get cold when gas expands — reverse process (dissolving).', 'Use a syringe with water and air: Pull plunger to lower pressure, see bubbles form (degassing); push plunger to.', 'temperature for O₂ in water (data table provided) — student sees downward curve.', 'Explicitly contrast with solid solubility curve (upward) on same axes.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_7', difficulty: 'standard',
          question: 'Balance in nature is the dynamic equilibrium in an ecosystem where populations.',
          hint: 'Review food webs (c8_physics_ch8_5) and trophic levels/energy flow (c8_physics_ch8_6) —.',
          misconception: 'Students often think \'balance in nature\' means every population stays exactly the same number forever, like a perfectly.',
          parts: [
                { id: 'a', prompt: 'In a pond food web, algae are eaten by zooplankton, which are eaten by small fish, which are eaten by large fish.', answer: 'Step 1: Large fish decline → less predation on small fish',
                  options: ['Step 1: Large fish decline → less predation on small fish', 'only direct predator-prey pairs matter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'balance in nature\' means every population stays exactly the same number forever, like a perfectly balanced scale.' }
          ],
            remediations: { 'balance-in-nature-means-every': { steps: ['Show a 1-minute video of a predator-prey simulation (e.g., lynx and hare population graphs) and ask students to.', 'Have them draw a simple feedback loop diagram: more predators → fewer prey → fewer predators → more prey.', 'Use a hands-on model: two students act as \'foxes\' and \'rabbits\' with paper tokens; each round, foxes \'eat\' rabbits,.', 'Record numbers for 10 rounds and plot.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
