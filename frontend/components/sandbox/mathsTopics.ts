/**
 * mathsTopics.ts — class-wise topic picker data for the Maths Sandbox.
 *
 * Curated from D:/platform/_cisce_build/maths_book_topics.json (the
 * chapter-by-chapter inventory extracted from the actual textbooks:
 * Ganita Prakash 6-8, old NCERT 8, Ganita Manjari 9, NCERT 10-11 and
 * Applied Maths 11-12). Only solver-able topics appear here — every
 * `prompt` is answered by a deterministic family in maths2_families.py /
 * applied_maths_families.py via POST /api/sandbox/solve.
 *
 * `nodeId` points at the authored enhanced-nodes corpus entry used for
 * wrong-state misconception teaching (closed-world: classes 10-12 have a
 * `c*_math_cbse_*` corpus; 6-9 do not, so nodeId stays undefined and the
 * MisconceptionPanel honestly renders nothing instead of invented text).
 */

export type MathsSubject = 'maths' | 'applied_maths'

export interface MathsTopic {
  key: string
  label: string
  /** Book-style sample prompt the deterministic solver family answers. */
  prompt: string
  subject?: MathsSubject
  /** Authored corpus node for misconception content (optional). */
  nodeId?: string
}

export interface MathsChapter {
  key: string
  label: string
  topics: MathsTopic[]
}

export interface MathsClassBand {
  key: string
  label: string
  chapters: MathsChapter[]
}

const t = (
  key: string, label: string, prompt: string,
  nodeId?: string, subject: MathsSubject = 'maths',
): MathsTopic => ({ key, label, prompt, nodeId, subject })

export const MATHS_SANDBOX_CLASSES: MathsClassBand[] = [
  {
    key: 'c6', label: 'Class 6',
    chapters: [
      {
        key: 'c6_patterns', label: 'Patterns in Mathematics',
        topics: [t('c6_seq', 'Number sequences', 'Find the mean of 3, 6, 9, 12, 15')],
      },
      {
        key: 'c6_prime', label: 'Prime Time',
        topics: [
          t('c6_hcf', 'HCF of two numbers', 'Find the HCF of 48 and 36'),
          t('c6_lcm', 'LCM of two numbers', 'Find the LCM of 12 and 18'),
        ],
      },
      {
        key: 'c6_parea', label: 'Perimeter and Area',
        topics: [
          t('c6_peri_r', 'Perimeter of rectangle', 'Find the perimeter of a rectangle with length 12 and breadth 8'),
          t('c6_peri_s', 'Perimeter of square', 'Find the perimeter of a square of side 9'),
          t('c6_area_r', 'Area of rectangle', 'Find the area of a rectangle with length 12 and breadth 8'),
          t('c6_area_s', 'Area of square', 'Find the area of a square of side 9'),
          t('c6_area_t', 'Area of triangle', 'Find the area of a triangle with base 10 and height 6'),
        ],
      },
      {
        key: 'c6_frac', label: 'Fractions',
        topics: [t('c6_fadd', 'Fraction addition', 'What is 3/4 + 1/6')],
      },
    ],
  },
  {
    key: 'c8', label: 'Class 8',
    chapters: [
      {
        key: 'c8_compare', label: 'Comparing Quantities',
        topics: [
          t('c8_pct', 'Percent of a quantity', 'What is 15% of 240'),
          t('c8_pchg', 'Percent increase/decrease', 'Find the percentage increase from 40 to 50'),
          t('c8_pl', 'Profit / loss percent', 'A shopkeeper buys an article for 400 and sells it for 500. Find the profit percent'),
          t('c8_disc', 'Discount and selling price', 'The marked price of an article is 800 and the discount is 15%. Find the selling price'),
          t('c8_disc2', 'Successive discounts', 'Successive discounts of 20% and 10% are given on an item of 1000. Find the selling price'),
          t('c8_gst', 'GST bill', 'GST of 18% is charged on an item priced 2500. Find the bill amount'),
          t('c8_si', 'Simple interest', 'Find the simple interest on 5000 at 8% for 3 years'),
          t('c8_ci', 'Compound interest', 'Find the compound interest on 10000 at 10% per annum for 2 years'),
        ],
      },
      {
        key: 'c8_prop', label: 'Direct and Inverse Proportion',
        topics: [
          t('c8_direct', 'Direct proportion', 'If the cost of 8 m of cloth is 240, find the cost of 15 m of cloth'),
          t('c8_inverse', 'Inverse proportion', 'If 12 workers can complete a work in 20 days, how long will 16 workers take'),
        ],
      },
      {
        key: 'c8_roots', label: 'Squares, Cubes, Exponents',
        topics: [
          t('c8_sqrt', 'Square root', 'Find the square root of 144'),
          t('c8_cbrt', 'Cube root', 'Find the cube root of 27'),
          t('c8_exp', 'Exponents', 'Evaluate 2 ^ 10'),
        ],
      },
      {
        key: 'c8_mens', label: 'Mensuration',
        topics: [
          t('c8_vol_c', 'Volume of cylinder', 'Find the volume of a cylinder of radius 7 and height 10'),
          t('c8_sa_cube', 'Surface area of cube', 'Find the surface area of a cube of edge 6'),
          t('c8_sa_cyl', 'Surface area of cylinder', 'Find the total surface area of a cylinder of radius 7 and height 10'),
        ],
      },
    ],
  },
  {
    key: 'c9', label: 'Class 9',
    chapters: [
      {
        key: 'c9_coord', label: 'Coordinates',
        topics: [
          t('c9_dist', 'Distance between points', 'Find the distance between (1, 2) and (4, 6)'),
          t('c9_mid', 'Midpoint', 'Find the midpoint of (1, 2) and (4, 6)'),
        ],
      },
      {
        key: 'c9_circle', label: 'Circles, Arcs, Heron',
        topics: [
          t('c9_circum', 'Circumference', 'Find the circumference of a circle of radius 7'),
          t('c9_arc', 'Arc length', 'Find the length of the arc of a circle of radius 7 with angle 90'),
          t('c9_heron', "Heron's formula", 'Find the area of a triangle with sides 13, 14 and 15'),
        ],
      },
      {
        key: 'c9_prob', label: 'Probability',
        topics: [
          t('c9_die', 'Probability with a die', 'Find the probability of getting an even number when a die is thrown'),
          t('c9_bag', 'Probability with a bag', 'A bag contains 5 red and 3 blue balls. Find the probability of drawing a red ball'),
        ],
      },
      {
        key: 'c9_seq', label: 'Sequences and Progressions',
        topics: [
          t('c9_ap', 'AP nth term', 'Find the 10th term of the AP with first term 2 and common difference 5'),
          t('c9_gp', 'GP nth term', 'Find the 5th term of the GP with first term 3 and common ratio 2'),
        ],
      },
    ],
  },
  {
    key: 'c10', label: 'Class 10',
    chapters: [
      {
        key: 'c10_poly', label: 'Polynomials',
        topics: [
          t('c10_zsum', 'Sum of zeroes', 'Find the sum of zeroes of 2 x^2 - 4 x + 6', 'c10_math_cbse_02_001'),
          t('c10_zprod', 'Product of zeroes', 'Find the product of zeroes of 2 x^2 - 4 x + 6', 'c10_math_cbse_02_001'),
          t('c10_quad', 'Quadratic roots', 'Find the roots of 1 x^2 - 5 x + 6 = 0', 'c10_math_cbse_04_001'),
          t('c10_disc', 'Nature of roots', 'Find the nature of the roots of 2 x^2 - 4 x + 3 = 0', 'c10_math_cbse_04_001'),
        ],
      },
      {
        key: 'c10_lin', label: 'Pair of Linear Equations',
        topics: [t('c10_sys', 'Solve 2-variable system', 'Solve 3 x + y = 10 and 2 x - y = 5', 'c10_math_cbse_03_001')],
      },
      {
        key: 'c10_ap', label: 'Arithmetic Progressions',
        topics: [
          t('c10_apn', 'AP nth term', 'Find the 10th term of the AP with first term 2 and common difference 5', 'c10_math_cbse_05_001'),
          t('c10_aps', 'AP sum', 'Find the sum of the first 20 terms of the AP with first term 3 and common difference 4', 'c10_math_cbse_05_001'),
        ],
      },
      {
        key: 'c10_tri', label: 'Triangles',
        topics: [
          t('c10_pyt', 'Pythagoras', 'Find the hypotenuse of a right angled triangle with legs 3 and 4', 'c10_math_cbse_06_001'),
          t('c10_her', "Heron's formula", 'Find the area of a triangle with sides 13, 14 and 15', 'c10_math_cbse_06_001'),
        ],
      },
      {
        key: 'c10_coord', label: 'Coordinate Geometry',
        topics: [
          t('c10_sec', 'Section formula', 'Find the point that divides the line joining (1, 2) and (4, 6) in the ratio 1:2', 'c10_math_cbse_07_001'),
          t('c10_atri', 'Area of triangle (coords)', 'Find the area of a triangle with vertices (1, 2), (4, 6) and (7, 2)', 'c10_math_cbse_07_001'),
        ],
      },
      {
        key: 'c10_trig', label: 'Trigonometry',
        topics: [
          t('c10_tval', 'Standard-angle values', 'Find the value of sin 30 + cos 60', 'c10_math_cbse_08_001'),
          t('c10_tid', 'Trig identities', 'Find the value of sin^2 30 + cos^2 30', 'c10_math_cbse_08_001'),
          t('c10_height', 'Heights and distances', 'From a point 30 m away from the foot of a tower the angle of elevation of the top is 60. Find the height', 'c10_math_cbse_09_001'),
        ],
      },
      {
        key: 'c10_area', label: 'Areas Related to Circles',
        topics: [
          t('c10_sector', 'Sector area', 'Find the area of a sector of a circle of radius 7 with angle 90', 'c10_math_cbse_11_001'),
          t('c10_arc', 'Arc length', 'Find the length of the arc of a circle of radius 7 with angle 90', 'c10_math_cbse_11_001'),
        ],
      },
      {
        key: 'c10_sav', label: 'Surface Areas and Volumes',
        topics: [
          t('c10_cone', 'Volume of cone', 'Find the volume of a cone of radius 3 and height 4', 'c10_math_cbse_12_001'),
          t('c10_sph', 'Volume of sphere', 'Find the volume of a sphere of radius 3', 'c10_math_cbse_12_001'),
          t('c10_hemi', 'Volume of hemisphere', 'Find the volume of a hemisphere of radius 3', 'c10_math_cbse_12_001'),
          t('c10_sasph', 'Surface area of sphere', 'Find the surface area of a sphere of radius 7', 'c10_math_cbse_12_001'),
        ],
      },
      {
        key: 'c10_stat', label: 'Statistics',
        topics: [
          t('c10_mean', 'Mean of data', 'Find the mean of 2, 4, 6, 8', 'c10_math_cbse_13_001'),
          t('c10_medg', 'Median of grouped data', 'Find the median of the following grouped data: class 0-10 10-20 20-30 30-40 40-50, frequency 4 6 10 8 2', 'c10_math_cbse_13_001'),
          t('c10_modg', 'Mode of grouped data', 'Find the mode of the following frequency distribution: class 0-10, 10-20, 20-30, 30-40, 40-50 and frequency 4, 6, 10, 8, 2', 'c10_math_cbse_13_001'),
        ],
      },
      {
        key: 'c10_prob', label: 'Probability',
        topics: [
          t('c10_cards', 'Deck of cards', 'What is the probability of getting a king from a well shuffled deck of cards', 'c10_math_cbse_14_001'),
          t('c10_coin', 'Coins', 'Find the probability of getting two heads when two coins are tossed', 'c10_math_cbse_14_001'),
        ],
      },
    ],
  },
  {
    key: 'c11', label: 'Class 11',
    chapters: [
      {
        key: 'c11_trig', label: 'Trigonometric Functions',
        topics: [
          t('c11_dbl', 'Double angles', 'Find the value of sin 2 30', 'c11_math_cbse_03_001'),
          t('c11_dblp', '2 sin A cos A', 'Find the value of 2 sin 30 cos 30', 'c11_math_cbse_03_001'),
          t('c11_cmpd', 'Compound angles', 'Find the value of sin 30 cos 60 + cos 30 sin 60', 'c11_math_cbse_03_001'),
        ],
      },
      {
        key: 'c11_complex', label: 'Complex Numbers',
        topics: [t('c11_mod', 'Modulus', 'Find the modulus of 3 + 4i', 'c11_math_cbse_04_001')],
      },
      {
        key: 'c11_pnc', label: 'Permutations & Combinations',
        topics: [
          t('c11_npr', 'Permutations nPr', 'Evaluate 8P2', 'c11_math_cbse_06_001'),
          t('c11_ncr', 'Combinations nCr', 'Find the value of 8C2', 'c11_math_cbse_06_001'),
        ],
      },
      {
        key: 'c11_seq', label: 'Sequences and Series',
        topics: [
          t('c11_gps', 'GP sum', 'Find the sum of the first 6 terms of the GP with first term 3 and common ratio 2', 'c11_math_cbse_08_001'),
          t('c11_gpi', 'Infinite GP sum', 'Find the sum of the infinite GP with first term 8 and common ratio 0.5', 'c11_math_cbse_08_001'),
          t('c11_am', 'Arithmetic mean', 'Find the arithmetic mean of 4 and 10', 'c11_math_cbse_08_001'),
          t('c11_gm', 'Geometric mean', 'Find the geometric mean of 4 and 9', 'c11_math_cbse_08_001'),
        ],
      },
      {
        key: 'c11_lines', label: 'Straight Lines',
        topics: [
          t('c11_slope', 'Slope of a line', 'Find the slope of the line joining (1, 2) and (4, 6)', 'c11_math_cbse_09_001'),
          t('c11_leq', 'Line through two points', 'Find the equation of the line through (1, 2) and (3, 6)', 'c11_math_cbse_09_001'),
        ],
      },
      {
        key: 'c11_lim', label: 'Limits and Derivatives',
        topics: [
          t('c11_lim0', 'Standard limit', 'Find the limit as x -> 0 of sin(3x)/x', 'c11_math_cbse_12_001'),
        ],
      },
      {
        key: 'c11_stat', label: 'Statistics',
        topics: [
          t('c11_var', 'Variance', 'Find the variance of 2, 4, 4, 4, 5, 5, 7, 9', 'c11_math_cbse_13_001'),
          t('c11_sd', 'Standard deviation', 'Find the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9', 'c11_math_cbse_13_001'),
        ],
      },
    ],
  },
  {
    key: 'am', label: 'Applied Maths 11-12',
    chapters: [
      {
        key: 'am_fin', label: 'Financial Mathematics',
        topics: [
          t('am_dep', 'Depreciation', 'A machine worth 50000 depreciates at 10% per annum. Find its value after 3 years', undefined, 'applied_maths'),
          t('am_emi', 'EMI', 'Find the EMI for a loan of 100000 at 12% per annum for 12 months', undefined, 'applied_maths'),
          t('am_ann', 'Annuity future value', 'Find the future value of an annual annuity of 10000 for 5 years at 8%', undefined, 'applied_maths'),
          t('am_cagr', 'CAGR', 'Find the CAGR of a value growing from 1000 to 2000 in 5 years', undefined, 'applied_maths'),
        ],
      },
      {
        key: 'am_apps', label: 'Numerical Applications',
        topics: [
          t('am_pipe', 'Pipes and cisterns', 'Pipe A fills a tank in 6 hours and pipe B fills it in 4 hours. How long will they take together', undefined, 'applied_maths'),
          t('am_pipes_o', 'Inlet and outlet', 'Pipe A fills a tank in 8 hours and an outlet empties it in 12 hours. Find the filling time', undefined, 'applied_maths'),
        ],
      },
      {
        key: 'am_dist', label: 'Probability Distributions',
        topics: [
          t('am_bin', 'Binomial probability', 'Find the probability of getting exactly 3 successes in 5 trials with p = 0.5', undefined, 'applied_maths'),
          t('am_binmv', 'Binomial mean and variance', 'For a binomial distribution with n = 10 and p = 0.3, find the mean and variance', undefined, 'applied_maths'),
        ],
      },
      {
        key: 'am_calc', label: 'Calculus',
        topics: [
          t('am_derv', 'Derivative', 'Find the derivative of x^3', undefined, 'applied_maths'),
          t('am_int', 'Integral', 'Integrate 3 x^2 dx from 0 to 2', undefined, 'applied_maths'),
        ],
      },
    ],
  },
]

/** First topic's node id for a chapter key — used by the workbench tabs. */
export function chapterNodeId(chapterKey: string): string | undefined {
  for (const band of MATHS_SANDBOX_CLASSES) {
    for (const ch of band.chapters) {
      if (ch.key === chapterKey) {
        return ch.topics.find(tp => tp.nodeId)?.nodeId
      }
    }
  }
  return undefined
}
