/**
 * physicsTopics.ts — class-wise topic picker data for the Physics Sandbox.
 *
 * Curated from D:/platform/_cisce_build/physics_book_topics.json (the
 * chapter-by-chapter inventory extracted from the actual textbooks:
 * NCERT Science 9-10, Physics 11-12, and the ICSE corpus classes 6-8).
 * Only solver-able topics appear here — every `prompt` is answered by a
 * deterministic family in physics_families.py / physics2_families.py /
 * physics3_families.py via POST /api/sandbox/solve (subject 'physics',
 * chained dispatcher).
 *
 * `nodeId` points at the authored enhanced-nodes corpus entry used for
 * wrong-state misconception teaching (closed-world: classes 10-12 have a
 * `c*_phy_cbse_*` corpus; 6-9 do not, so nodeId stays undefined and the
 * MisconceptionPanel honestly renders nothing instead of invented text).
 */

export interface PhysicsTopic {
  key: string
  label: string
  /** Book-style sample prompt the deterministic solver family answers. */
  prompt: string
  /** Authored corpus node for misconception content (optional). */
  nodeId?: string
}

export interface PhysicsChapter {
  key: string
  label: string
  topics: PhysicsTopic[]
}

export interface PhysicsClassBand {
  key: string
  label: string
  chapters: PhysicsChapter[]
}

const t = (
  key: string, label: string, prompt: string, nodeId?: string,
): PhysicsTopic => ({ key, label, prompt, nodeId })

export const PHYSICS_SANDBOX_CLASSES: PhysicsClassBand[] = [
  {
    key: 'c6_8', label: 'Class 6-8',
    chapters: [
      {
        key: 'c68_work', label: 'Work, Energy & Power',
        topics: [
          t('c68_work', 'Work done (W = F d)',
            'Calculate the work done when a force of 10 N moves an object through a distance of 5 m'),
          t('c68_power', 'Power (P = W / t)',
            'A machine does 500 J of work in 5 s. Find the power'),
          t('c68_weight', 'Weight (W = m g)',
            'Find the weight of a 10 kg object (take g = 9.8 m/s^2)'),
        ],
      },
      {
        key: 'c68_heat', label: 'Heat',
        topics: [
          t('c68_heat', 'Heat energy (Q = m c dT)',
            'How much heat is required to raise the temperature of 2 kg of water from 25 C to 55 C? (specific heat of water = 4200 J/kg C)'),
        ],
      },
      {
        key: 'c68_elec', label: 'Electrical Energy',
        topics: [
          t('c68_kwh', 'kWh billing (E = P t)',
            'An electric heater of 1500 W is used 5 hours a day for 30 days. Find the electricity bill at Rs 4 per unit'),
        ],
      },
    ],
  },
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_motion', label: 'Motion',
        topics: [
          t('c9_vuat', 'v = u + at',
            'A car starts with a velocity of 5 m/s and accelerates uniformly at 2 m/s^2 for 10 s. Find its final velocity',
            'c11_phy_cbse_02_001'),
          t('c9_sut', 's = ut + 1/2 at^2',
            'A car starts with a velocity of 5 m/s and accelerates uniformly at 2 m/s^2 for 10 s. Find the distance covered',
            'c11_phy_cbse_02_001'),
          t('c9_v2', 'v^2 = u^2 + 2as',
            'A train moving with a velocity of 10 m/s accelerates uniformly at 2 m/s^2 over a distance of 60 m. Find its final velocity',
            'c11_phy_cbse_02_001'),
        ],
      },
      {
        key: 'c9_force', label: 'Force & Laws of Motion',
        topics: [
          t('c9_fma', "Newton's second law (F = ma)",
            'A force acts on a mass of 4 kg giving it an acceleration of 2 m/s^2. Find the force',
            'c11_phy_cbse_04_001'),
          t('c9_mom', 'Momentum (p = m v)',
            'Find the momentum of a 5 kg body moving at 3 m/s',
            'c11_phy_cbse_04_001'),
          t('c9_weight', 'Weight (W = m g)',
            'Find the weight of a 10 kg object on the moon',
            'c11_phy_cbse_07_001'),
        ],
      },
      {
        key: 'c9_grav', label: 'Gravitation & Fluids',
        topics: [
          t('c9_g', 'g = G M / R^2',
            'Calculate the value of g on a planet of mass 6e24 kg and radius 6400 km',
            'c11_phy_cbse_07_001'),
          t('c9_buoy', "Archimedes (F = rho g V)",
            'A metal block of volume 0.002 m^3 is fully immersed in water. Find the buoyant force on it (g = 9.8 m/s^2)',
            'c11_phy_cbse_09_001'),
        ],
      },
      {
        key: 'c9_energy', label: 'Work & Energy',
        topics: [
          t('c9_ke', 'Kinetic energy',
            'Find the kinetic energy of a 2 kg ball moving at 3 m/s',
            'c11_phy_cbse_05_001'),
          t('c9_pe', 'Potential energy',
            'Calculate the potential energy of a 5 kg object placed at a height of 10 m (g = 9.8 m/s^2)',
            'c11_phy_cbse_05_001'),
          t('c9_wet', 'Work-energy theorem',
            'Find the work required to accelerate a car of mass 1000 kg from 5 m/s to 15 m/s',
            'c11_phy_cbse_05_001'),
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_elec', label: 'Electricity',
        topics: [
          t('c10_ohm', "Ohm's law (V = I R)",
            'A current of 2 A flows through a resistor of 6 ohm. Find the potential difference across it',
            'c10_phy_cbse_01_001'),
          t('c10_series', 'Series resistance',
            'Find the total resistance of 4 ohm and 6 ohm in series',
            'c10_phy_cbse_01_001'),
          t('c10_par', 'Parallel resistance',
            'Find the total resistance of 4 ohm and 6 ohm in parallel',
            'c10_phy_cbse_01_001'),
          t('c10_vi', 'Electrical power (P = V I)',
            'An electric bulb is connected to a 220 V supply and draws a current of 0.5 A. Find the power consumed',
            'c10_phy_cbse_01_001'),
          t('c10_kwh', 'kWh billing',
            'An electric heater of 1500 W is used 5 hours a day for 30 days. Find the electricity bill at Rs 4 per unit',
            'c10_phy_cbse_01_001'),
        ],
      },
      {
        key: 'c10_light', label: 'Light — Reflection & Refraction',
        topics: [
          t('c10_lens', 'Lens formula',
            'Find the image distance for a convex lens of focal length 20 cm with the object placed 30 cm from the lens',
            'c12_phy_cbse_09_001'),
          t('c10_mirror', 'Mirror formula',
            'Find the image distance for a concave mirror of focal length 15 cm with the object placed 25 cm from the mirror',
            'c12_phy_cbse_09_001'),
          t('c10_n', 'Refractive index (n = c / v)',
            'The refractive index of glass is 1.5. Find the speed of light in glass',
            'c12_phy_cbse_09_001'),
        ],
      },
    ],
  },
  {
    key: 'c11', label: 'Class 11',
    chapters: [
      {
        key: 'c11_kin', label: 'Kinematics',
        topics: [
          t('c11_vuat', 'v = u + at (any variable)',
            'A car accelerates uniformly at 2 m/s^2 and reaches a velocity of 25 m/s in 10 s. Find the initial velocity',
            'c11_phy_cbse_02_001'),
          t('c11_free', 'Free fall',
            'A stone is dropped from a height of 20 m. How long does it take to fall to the ground (g = 9.8 m/s^2)?',
            'c11_phy_cbse_02_001'),
          t('c11_up', 'Thrown upward',
            'A ball is thrown vertically upward with a velocity of 20 m/s (g = 9.8 m/s^2). Find the maximum height reached',
            'c11_phy_cbse_02_001'),
        ],
      },
      {
        key: 'c11_lom', label: 'Laws of Motion',
        topics: [
          t('c11_fma', 'F = m a (any variable)',
            'A force of 8 N acts on a body giving an acceleration of 2 m/s^2. Find the mass of the body',
            'c11_phy_cbse_04_001'),
          t('c11_fric', 'Friction (f = mu N)',
            'A block of mass 5 kg rests on a table. The coefficient of friction is 0.4. Find the force of friction (g = 9.8 m/s^2)',
            'c11_phy_cbse_04_001'),
        ],
      },
      {
        key: 'c11_wep', label: 'Work, Energy & Power',
        topics: [
          t('c11_work_ang', 'Work at an angle',
            'A force of 20 N moves a box 3 m at an angle of 60 degrees. Find the work done',
            'c11_phy_cbse_05_001'),
          t('c11_pfv', 'Power (P = F v)',
            'An engine exerts a force of 2000 N on a car moving at 15 m/s. Find the power of the engine',
            'c11_phy_cbse_05_001'),
        ],
      },
      {
        key: 'c11_matter', label: 'Solids & Fluids',
        topics: [
          t('c11_hooke', "Hooke's law (F = k x)",
            'A spring of spring constant 200 N/m is compressed by 5 cm. Find the force required',
            'c11_phy_cbse_08_001'),
          t('c11_php', 'Pressure at depth (P = h rho g)',
            'Calculate the pressure at a depth of 10 m in water (g = 9.8 m/s^2)',
            'c11_phy_cbse_09_001'),
          t('c11_appw', 'Apparent weight',
            'A body of mass 5 kg and volume 0.001 m^3 is fully submerged in water. Find its apparent weight (g = 9.8 m/s^2)',
            'c11_phy_cbse_09_001'),
        ],
      },
      {
        key: 'c11_osc', label: 'Oscillations & Waves',
        topics: [
          t('c11_pend', 'Simple pendulum (T = 2 pi sqrt(l/g))',
            'Find the time period of a simple pendulum of length 1 m (g = 9.8 m/s^2)',
            'c11_phy_cbse_13_001'),
          t('c11_wave', 'Wave speed (v = f lambda)',
            'A wave has a frequency of 440 Hz and a wavelength of 0.75 m. Find its speed',
            'c11_phy_cbse_14_001'),
        ],
      },
    ],
  },
  {
    key: 'c12', label: 'Class 12',
    chapters: [
      {
        key: 'c12_estat', label: 'Electrostatics',
        topics: [
          t('c12_coul', "Coulomb's law",
            'Two charges of 2 microcoulomb and 3 microcoulomb are at a distance of 10 cm. Find the force between them',
            'c12_phy_cbse_01_001'),
          t('c12_efield', 'Electric field (E = F/q)',
            'Find the electric field where the force on the charge is 0.05 N and the charge is 10 micro coulomb',
            'c12_phy_cbse_01_001'),
        ],
      },
      {
        key: 'c12_cur', label: 'Current Electricity',
        topics: [
          t('c12_ohm', "Ohm's law (any variable)",
            'A voltage of 12 V is applied across a resistance of 4 ohm. Find the current',
            'c12_phy_cbse_03_001'),
          t('c12_i2r', "Joule heating (P = I^2 R)",
            'A current of 2 A flows through a 5 ohm resistor. Find the power dissipated',
            'c12_phy_cbse_03_001'),
        ],
      },
      {
        key: 'c12_optics', label: 'Ray Optics',
        topics: [
          t('c12_mirror', 'Mirror formula',
            'Find the image distance for a concave mirror of focal length 15 cm with the object placed 25 cm from the mirror',
            'c12_phy_cbse_09_001'),
          t('c12_lens', 'Lens formula',
            'Find the image distance for a convex lens of focal length 20 cm with the object placed 30 cm from the lens',
            'c12_phy_cbse_09_001'),
        ],
      },
    ],
  },
]

export const TOTAL_PHYSICS_TOPICS = PHYSICS_SANDBOX_CLASSES.reduce(
  (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)
