import type { SimDef } from '../../engine/types';
import C11_PhysicsCentreOfMassSim from '../../../simulations/three/C11_PhysicsCentreOfMassSim';

/** v3 wrapped master — C11_PhysicsCentreOfMassSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicscentreofmasssim: SimDef = {
    id: 'v3w_c11_physicscentreofmasssim',
    title: 'Centre Of Mass',
    subtitle: 'Covers circular orbits only; elliptical orbits are addressed in Kepler\'s laws node.',
    classLevel: 11, subject: 'physics', topic: 'Orbital Velocity and Period of Satellite',
    chapters: [],
    nodeIds: ['c11_phy_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Watch a video of the International Space Station passing overhead — it moves at about 7.7 km/s at 400 km.', goal: 'Master Centre Of Mass.' },
    discovery: {
        question: 'What is the orbital velocity of a satellite in a circular orbit just above Earth\'s surface (h ≈ 0)?',
        options: ['v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s', 'space has no gravity', 'satellites float'],
        answer: 'v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s',
        hook: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity".',
    },
    teaching: [
        { title: 'Orbital velocity is the minimum horizontal.', text: 'Orbital velocity is the minimum horizontal velocity required for a satellite to maintain a stable circular orbit around Earth at a given altitude, where the gravitational force provides exactly the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_07_011', title: 'Orbital velocity is the minimum.',
          scaffold: { problem: 'The Indian Remote Sensing satellite IRS-1A orbits at an altitude of 817 km. Calculate its orbital velocity and period.',
            steps: [
            { text: 'Identify given quantities: h = 817 km = 8.17×10⁵ m, R_E = 6370 km = 6.37×10⁶ m, G = 6.67×10⁻¹¹ N·m²/kg², M_E =.' },
            { text: 'Compute orbital radius r = R_E + h = 6.37×10⁶ + 8.17×10⁵ = 7.187×10⁶ m. Verify unit: m.' },
            { text: 'Calculate v = √(GM_E/r) = √((6.67×10⁻¹¹ × 5.97×10²⁴) / 7.187×10⁶) = √(3.98×10¹⁴ / 7.187×10⁶) = √(5.54×10⁷) = 7443 m/s ≈.' },
            { text: 'Calculate T = 2πr/v = 2π × 7.187×10⁶ / 7443 = 4.514×10⁷ / 7443 = 6065 s. Convert to minutes: 6065/60 = 101.1 minutes.' },
            { text: 'Verify reasonableness: ISS at 400 km has v ≈ 7.7 km/s, T ≈ 93 min. Higher altitude → lower v, longer T.', faded: true, blankAnswer: 'v = 7.44 km/s, T = 101.1 minutes (6065 s)' }
            ] } }
    ],
    explore: { component: C11_PhysicsCentreOfMassSim, prompt: 'Explore the interactive — Centre Of Mass' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_07_011', difficulty: 'standard',
          question: 'Orbital velocity is the minimum horizontal velocity required for a satellite to.',
          hint: 'If stuck, review centripetal force derivation (Class 9 Chapter 8) and universal.',
          misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity".',
          parts: [
                { id: 'a', prompt: 'What is the orbital velocity of a satellite in a circular orbit just above Earth\'s surface (h ≈ 0)?', answer: 'v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s',
                  options: ['v₀ = √(gR_E) = √(9.8 × 6.4×10⁶) ≈ 7920 m/s ≈ 7.92 km/s', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'b', prompt: 'A student claims: "If we double the altitude of a satellite, its orbital velocity becomes half." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' },
                { id: 'c', prompt: 'Calculate the orbital period of a satellite at height h = 400 km above Earth\'s surface. Given: G = 6.67×10⁻¹¹ N·m²/kg², M_E = 6.0×10²⁴ kg, R_E = 6400 km.', answer: 'r = 6400 + 400 = 6800 km = 6.8×10⁶ m',
                  options: ['r = 6400 + 400 = 6800 km = 6.8×10⁶ m', 'space has no gravity', 'satellites float'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe orbital velocity is constant for all satellites regardless of altitude because "space has no gravity" or "satellites.' }
          ],
            remediations: { 'orbital-velocity-is-constant-for': { steps: ['Calculate g at ISS altitude: g\' = g(R_E/(R_E+h))² = 9.8×(6400/6800)² ≈ 8.7 m/s².', 'Show that if gravity were zero, the satellite would move in a straight line (Newton\'s first law), not a circle.', 'Demonstrate with a ball on a string: tension (gravity) provides centripetal force; cut the string (remove gravity) and.', 'Re-derive v = √(GM_E/r) emphasizing F_g = F_c.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
