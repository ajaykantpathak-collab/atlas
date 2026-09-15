"""
CISCE Class 11 Physics Question Generator
Deterministic, self-contained question generation for ICSE/ISC Class 11 Physics
Topics: c11_phy_001 (Systems of units), c11_phy_002 (Significant figures and errors)
"""

import random
import re
import math
import json
import hashlib
from typing import Dict, List, Any, Optional, Callable

# ---------------------------------------------------------------------------
# Module-level constants
# ---------------------------------------------------------------------------

FILE_VERSION = "1.0.0"

# Physical constants (SI)
CONST_PI: float = 3.141592653589793
CONST_G: float = 9.8          # m/s^2
CONST_AVOGADRO: float = 6.02214076e23  # mol^-1
CONST_SPEED_OF_LIGHT: float = 299792458.0  # m/s

# Dimension symbols used in solutions
DIM_L: str = "[L]"
DIM_M: str = "[M]"
DIM_T: str = "[T]"
DIM_I: str = "[I]"
DIM_K: str = "[K]"
DIM_N: str = "[mol]"
DIM_J: str = "[cd]"


# ---------------------------------------------------------------------------
# Question bank data
# ---------------------------------------------------------------------------

QUESTION_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_phy_001": [
        # ---- Easy questions ----
        {
            "qnum": 1, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "Which of the following is the SI unit of length?"
            ),
            "options": [
                "A) centimetre", "B) metre", "C) kilometre", "D) mile"
            ],
            "answer": "B", "topic": "c11_phy_001",
            "solution": (
                "The SI unit of length is the metre (symbol: m). "
                "Centimetre and kilometre are derived from the metre but are not base units. "
                "Mile is a unit in the imperial/US customary system."
            ),
        },
        {
            "qnum": 2, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "Which of the following is NOT a base quantity in the SI system?"
            ),
            "options": [
                "A) Amount of substance", "B) Electric current",
                "C) Temperature", "D) Pressure"
            ],
            "answer": "D", "topic": "c11_phy_001",
            "solution": (
                "The seven SI base quantities are: length, mass, time, electric current, "
                "temperature, amount of substance, and luminous intensity. "
                "Pressure is a derived quantity (N/m^2 = Pa)."
            ),
        },
        {
            "qnum": 3, "difficulty": 0.15, "type": "fill_blank",
            "question_text": (
                "The SI unit of mass is the ______ (symbol: kg)."
            ),
            "answer": "kilogram", "topic": "c11_phy_001",
            "solution": (
                "The kilogram (kg) is the SI base unit of mass. "
                "It is defined by fixing the Planck constant to be exactly "
                "6.62607015 × 10^-34 J·s."
            ),
        },
        {
            "qnum": 4, "difficulty": 0.1, "type": "fill_blank",
            "question_text": (
                "The SI unit of time is the ______ (symbol: s)."
            ),
            "answer": "second", "topic": "c11_phy_001",
            "solution": (
                "The second (s) is the SI base unit of time. "
                "It is defined based on the hyperfine transition frequency of the caesium-133 atom "
                "(9,192,631,770 Hz)."
            ),
        },
        {
            "qnum": 5, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "The SI unit of amount of substance is:"
            ),
            "options": [
                "A) mole", "B) newton", "C) pascal", "D) joule"
            ],
            "answer": "A", "topic": "c11_phy_001",
            "solution": (
                "The mole (mol) is the SI unit of amount of substance. "
                "One mole contains exactly 6.02214076 × 10^23 elementary entities "
                "(Avogadro constant)."
            ),
        },
        # ---- Medium questions ----
        {
            "qnum": 6, "difficulty": 0.35, "type": "fill_blank",
            "question_text": (
                "The unit of pressure in the SI system is the ______ (symbol: Pa)."
            ),
            "answer": "pascal", "topic": "c11_phy_001",
            "solution": (
                "Pressure is force per unit area: P = F/A. "
                "Since the SI unit of force is the newton (N = kg·m/s²) "
                "and area is m², the SI unit of pressure is N/m² = pascal (Pa). "
                "1 Pa = 1 N/m² = 1 kg/(m·s²)."
            ),
        },
        {
            "qnum": 7, "difficulty": 0.35, "type": "mcq",
            "question_text": (
                "The dimensions of energy in the SI system are:"
            ),
            "options": [
                "A) [M L² T⁻²]", "B) [M L T⁻²]", "C) [M L² T⁻¹]",
                "D) [M L³ T⁻²]"
            ],
            "answer": "A", "topic": "c11_phy_001",
            "solution": (
                "Energy = Force × Distance = [M L T⁻²] × [L] = [M L² T⁻²]. "
                "This applies to kinetic energy (½mv²), potential energy (mgh), etc."
            ),
        },
        {
            "qnum": 8, "difficulty": 0.35, "type": "mcq",
            "question_text": (
                "One parsec (pc) is approximately equal to:"
            ),
            "options": [
                "A) 3.086 × 10^16 m", "B) 1.496 × 10^11 m",
                "C) 9.461 × 10^15 m", "D) 3.0 × 10^8 m"
            ],
            "answer": "A", "topic": "c11_phy_001",
            "solution": (
                "1 parsec ≈ 3.086 × 10^16 m. "
                "For reference: 1 AU ≈ 1.496 × 10^11 m, "
                "1 light-year ≈ 9.461 × 10^15 m, "
                "and c ≈ 3.0 × 10^8 m/s."
            ),
        },
        {
            "qnum": 9, "difficulty": 0.4, "type": "short_answer",
            "question_text": (
                "Define 1 parsec (pc) in terms of astronomical units (AU). "
                "What is its approximate value in metres?"
            ),
            "answer": "3.086e16", "topic": "c11_phy_001",
            "solution": (
                "1 parsec is the distance at which 1 AU subtends an angle of 1 arcsecond. "
                "1 pc = 1 AU / tan(1″) ≈ 206265 AU ≈ 1 AU × 206265. "
                "With 1 AU = 1.496 × 10^11 m: "
                "1 pc ≈ 206265 × 1.496 × 10^11 ≈ 3.086 × 10^16 m."
            ),
        },
        {
            "qnum": 10, "difficulty": 0.4, "type": "numerical",
            "question_text": (
                "Convert 1 light-year (ly) to metres. "
                "Given: c = 3.0 × 10^8 m/s, 1 year = 365.25 days."
            ),
            "answer": "9.46e15", "topic": "c11_phy_001",
            "solution": (
                "1 year = 365.25 × 24 × 3600 s = 31,557,600 s ≈ 3.156 × 10^7 s. "
                "1 ly = c × 1 year = 3.0 × 10^8 × 3.156 × 10^7 "
                "≈ 9.468 × 10^15 m ≈ 9.46 × 10^15 m."
            ),
        },
        # ---- Hard questions ----
        {
            "qnum": 11, "difficulty": 0.7, "type": "numerical",
            "question_text": (
                "The density of a material in CGS units is 4 g/cm³. "
                "What is its density in SI units (kg/m³)? "
                "(Hint: 1 g = 10^-3 kg, 1 cm = 10^-2 m)"
            ),
            "answer": "4000", "topic": "c11_phy_001",
            "solution": (
                "In CGS: 4 g/cm³ = 4 × (10^-3 kg) / (10^-2 m)³ "
                "= 4 × 10^-3 / 10^-6 kg/m³ "
                "= 4 × 10^3 kg/m³ = 4000 kg/m³."
            ),
        },
        {
            "qnum": 12, "difficulty": 0.75, "type": "long_answer",
            "question_text": (
                "The period of oscillation T of a simple pendulum depends on "
                "the mass m of the bob, its length l, and acceleration due to "
                "gravity g. Derive the dimensional formula for T using the "
                "principle of dimensional homogeneity."
            ),
            "answer": "T ~ [M^0 L^{1/2} T^1]", "topic": "c11_phy_001",
            "solution": (
                "Assume T ∝ m^a × l^b × g^c. "
                "Dimensions: [T] = [M]^a [L]^b [L T^{-2}]^c "
                "= [M]^a [L]^{b+c} [T]^{-2c}. "
                "Equating exponents: "
                "M: a = 0; L: b + c = 0 → b = -c; T: -2c = 1 → c = -1/2. "
                "Thus b = 1/2, and T ∝ m^0 × l^{1/2} × g^{-1/2} "
                "= √(l/g). The dimensional formula for T is [T] = [M^0 L^{1/2} T^1]."
            ),
        },
        {
            "qnum": 13, "difficulty": 0.65, "type": "numerical",
            "question_text": (
                "A calorie ( nutritional calorie, kcal ) is a unit of energy. "
                "1 cal = 4.186 J. A system uses units: 1 cal = α J, "
                "1 kg = β g, 1 s = γ s (same). "
                "If kinetic energy K = ½mv² has value 40 J in SI, "
                "what is its value in the calorie-based system? "
                "Use α = 4.186."
            ),
            "answer": "9.56", "topic": "c11_phy_001",
            "solution": (
                "In the calorie-based system, energy is measured in calories. "
                "1 cal = 4.186 J, so 1 J = 1/4.186 cal. "
                "K = 40 J = 40/4.186 cal ≈ 9.557 cal ≈ 9.56 cal."
            ),
        },
        {
            "qnum": 14, "difficulty": 0.6, "type": "mcq",
            "question_text": (
                "Which of the following pairs have the same dimensions?"
            ),
            "options": [
                "A) Work and Power",
                "B) Force and Torque",
                "C) Work and Torque",
                "D) Momentum and Energy"
            ],
            "answer": "C", "topic": "c11_phy_001",
            "solution": (
                "Work = Force × displacement → [M L² T⁻²]. "
                "Torque = Force × perpendicular distance → [M L² T⁻²]. "
                "Power = Work/time → [M L² T⁻³]. "
                "Force = [M L T⁻²]; Momentum = [M L T⁻¹]; Energy = [M L² T⁻²]. "
                "Thus Work and Torque have the same dimensions."
            ),
        },
        {
            "qnum": 15, "difficulty": 0.55, "type": "short_answer",
            "question_text": (
                "A new system of units is proposed where unit of force F₀ = "
                "10 N, unit of length L₀ = 10 m, and unit of time T₀ = 10 s. "
                "What is the value of 1 kg (mass) in this new system? "
                "(Recall: 1 N = 1 kg·m/s²)"
            ),
            "answer": "0.01", "topic": "c11_phy_001",
            "solution": (
                "1 kg = 1 N·s²/m. In new units: "
                "1 kg = 1 × (F₀/F₀) × (T₀/T₀)² / (L₀/L₀) "
                "= (10/10) N × (10/10)² s² / (10/10) m "
                "Actually: 1 kg = 1 N s²/m. "
                "In new units: 1 N = F₀/10 = F₀/10, 1 m = L₀/10, 1 s = T₀/10. "
                "So 1 kg = (F₀/10) × (T₀/10)² / (L₀/10) "
                "= F₀ × T₀² / (10 × 10 × 10) × 10/L₀ "
                "= F₀ T₀² / (1000 L₀) = 10×100/(1000×10) = 0.1 new-mass-unit."
            ),
        },
    ],
    "c11_phy_002": [
        # ---- Easy questions ----
        {
            "qnum": 1, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "The number of significant figures in 0.0070 m is:"
            ),
            "options": ["A) 2", "B) 3", "C) 5", "D) 1"],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "Leading zeros are not significant. "
                "In 0.0070, the significant digits are 7 and 0 (trailing zero after decimal). "
                "So there are 2 significant figures."
            ),
        },
        {
            "qnum": 2, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "The number of significant figures in 3400 (assuming no decimal point) is:"
            ),
            "options": ["A) 2", "B) 3", "C) 4", "D) Cannot be determined"],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "Without a decimal point, trailing zeros in a whole number are not significant. "
                "3400 has 2 significant figures (3 and 4). "
                "To express 4 significant figures, one would write 3400. or 3.400 × 10³."
            ),
        },
        {
            "qnum": 3, "difficulty": 0.15, "type": "fill_blank",
            "question_text": (
                "The number of significant figures in the measurement 5.00 × 10² m is ______."
            ),
            "answer": "3", "topic": "c11_phy_002",
            "solution": (
                "In scientific notation, all digits in the coefficient are significant. "
                "5.00 × 10² has 3 significant figures (5, 0, and 0)."
            ),
        },
        {
            "qnum": 4, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "The accuracy of a measurement means:"
            ),
            "options": [
                "A) How close the measured value is to the true value",
                "B) How close repeated measurements are to each other",
                "C) The smallest division on the measuring instrument",
                "D) The number of significant figures"
            ],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "Accuracy is the closeness of a measured value to the standard or true value. "
                "Precision is the closeness of repeated measurements to each other. "
                "Note: a measurement can be precise but not accurate."
            ),
        },
        {
            "qnum": 5, "difficulty": 0.1, "type": "mcq",
            "question_text": (
                "Absolute error in a measurement is defined as:"
            ),
            "options": [
                "A) (True value − Measured value)",
                "B) (Measured value − True value)",
                "C) The ratio of error to true value",
                "D) The average of errors"
            ],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "Absolute error = True value − Measured value. "
                "It has the same unit as the quantity being measured. "
                "Relative error = Absolute error / True value."
            ),
        },
        # ---- Medium questions ----
        {
            "qnum": 6, "difficulty": 0.35, "type": "mcq",
            "question_text": (
                "The relative error in the measurement of the radius of a sphere "
                "is 0.1%. The relative error in the measurement of its volume is:"
            ),
            "options": ["A) 0.1%", "B) 0.2%", "C) 0.3%", "D) 0.01%"],
            "answer": "C", "topic": "c11_phy_002",
            "solution": (
                "Volume V = (4/3)πr³, so ΔV/V = 3 × (Δr/r) = 3 × 0.1% = 0.3%. "
                "For a product/power, the relative error in the result equals "
                "the sum of relative errors of each factor."
            ),
        },
        {
            "qnum": 7, "difficulty": 0.4, "type": "fill_blank",
            "question_text": (
                "A physical quantity x is related to four measurable quantities "
                "a, b, c, d as: x = a²b³/√c d. "
                "The percentage errors in measuring a, b, c, d are 1%, 2%, 3%, and 4% "
                "respectively. The percentage error in x is ______ %."
            ),
            "answer": "14", "topic": "c11_phy_002",
            "solution": (
                "For x = a²b³c^(-1/2)d^(-1): "
                "Δx/x = 2(Δa/a) + 3(Δb/b) + (1/2)(Δc/c) + (Δd/d) "
                "= 2×1% + 3×2% + 0.5×3% + 1×4% "
                "= 2% + 6% + 1.5% + 4% = 13.5% ≈ 14% (to nearest integer)."
            ),
        },
        {
            "qnum": 8, "difficulty": 0.35, "type": "mcq",
            "question_text": (
                "In an experiment, the period of oscillation of a simple pendulum "
                "is measured as T = 2.00 s with an uncertainty of ±0.01 s. "
                "The percentage error in T is:"
            ),
            "options": ["A) 0.005%", "B) 0.5%", "C) 5%", "D) 0.01%"],
            "answer": "B", "topic": "c11_phy_002",
            "solution": (
                "Percentage error = (ΔT / T) × 100% "
                "= (0.01 / 2.00) × 100% = 0.5%."
            ),
        },
        {
            "qnum": 9, "difficulty": 0.4, "type": "mcq",
            "question_text": (
                "If the relative error in measuring the side of a cube is 0.02, "
                "the relative error in measuring its volume is:"
            ),
            "options": ["A) 0.02", "B) 0.04", "C) 0.06", "D) 0.08"],
            "answer": "C", "topic": "c11_phy_002",
            "solution": (
                "Volume V = l³. Relative error ΔV/V = 3 × (Δl/l) = 3 × 0.02 = 0.06."
            ),
        },
        {
            "qnum": 10, "difficulty": 0.4, "type": "numerical",
            "question_text": (
                "The resistance R = V/I, where V = (100 ± 5) V and "
                "I = (10 ± 0.2) A. Calculate the percentage error in R."
            ),
            "answer": "7.0", "topic": "c11_phy_002",
            "solution": (
                "For R = V/I, relative error: ΔR/R = ΔV/V + ΔI/I "
                "= 5/100 + 0.2/10 = 0.05 + 0.02 = 0.07. "
                "Percentage error = 0.07 × 100 = 7%."
            ),
        },
        # ---- Hard questions ----
        {
            "qnum": 11, "difficulty": 0.65, "type": "mcq",
            "question_text": (
                "The period of a simple pendulum is T = 2π√(l/g). "
                "The percentage errors in l and g are 2% and 3% respectively. "
                "The maximum percentage error in T is:"
            ),
            "options": ["A) 2.5%", "B) 5%", "C) 3.5%", "D) 1.5%"],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "For T = 2π l^(1/2) g^(-1/2): "
                "ΔT/T = (1/2)(Δl/l) + (1/2)(Δg/g) "
                "= 0.5 × 2% + 0.5 × 3% = 1% + 1.5% = 2.5%."
            ),
        },
        {
            "qnum": 12, "difficulty": 0.6, "type": "short_answer",
            "question_text": (
                "A Vernier caliper has 20 vernier divisions coinciding with "
                "19 main scale divisions. If 1 main scale division = 1 mm, "
                "what is (a) the least count of the caliper, and "
                "(b) its precision? Give answers in mm."
            ),
            "answer": "0.05", "topic": "c11_phy_002",
            "solution": (
                "1 main scale division (MSD) = 1 mm. "
                "Least count (LC) = 1 MSD / n = 1 mm / 20 = 0.05 mm. "
                "The least count equals the precision of the instrument. "
                "Any measurement with this caliper is precise to ±0.05 mm."
            ),
        },
        {
            "qnum": 13, "difficulty": 0.65, "type": "numerical",
            "question_text": (
                "A student measures the time period of oscillation of a "
                "simple pendulum as T = 2.00 s, 2.10 s, 1.90 s, 2.05 s, "
                "and 1.95 s. Calculate the mean time period, the mean absolute "
                "error, and the percentage error."
            ),
            "answer": "2.00; 0.06; 3.0", "topic": "c11_phy_002",
            "solution": (
                "Mean T = (2.00 + 2.10 + 1.90 + 2.05 + 1.95)/5 = 10.00/5 = 2.00 s. "
                "Absolute errors: |0.00|, |0.10|, |−0.10|, |0.05|, |−0.05|. "
                "Mean absolute error = (0 + 0.10 + 0.10 + 0.05 + 0.05)/5 = 0.06 s. "
                "Percentage error = (0.06/2.00) × 100 = 3.0%."
            ),
        },
        {
            "qnum": 14, "difficulty": 0.7, "type": "long_answer",
            "question_text": (
                "The refractive index (μ) of a glass slab is given by "
                "μ = sin(i)/sin(r), where i and r are angles measured in degrees. "
                "If the errors in measuring i and r are ±0.5° and ±0.2° respectively, "
                "and the actual values are i = 60° and r = 35°, estimate the "
                "percentage error in μ. "
                "(Hint: d(sin θ)/dθ = cos θ × (π/180) when θ is in degrees)"
            ),
            "answer": "2.6", "topic": "c11_phy_002",
            "solution": (
                "μ = sin(60°)/sin(35°) = 0.8660/0.5736 ≈ 1.510. "
                "dμ = (∂μ/∂i)di + (∂μ/∂r)dr. "
                "∂μ/∂i = cos(i)/sin(r) × π/180 = cos(60°)/sin(35°) × π/180 "
                "= 0.5/0.5736 × 0.01745 = 0.0152. "
                "∂μ/∂r = −sin(i)cos(r)/sin²(r) × π/180 "
                "= −0.8660 × 0.8192 / 0.3290 × 0.01745 = −0.0375. "
                "Δμ = |0.0152| × 0.5 + |−0.0375| × 0.2 = 0.0076 + 0.0075 = 0.0151. "
                "% error = (0.0151/1.510) × 100 ≈ 1.0%."
            ),
        },
        {
            "qnum": 15, "difficulty": 0.75, "type": "long_answer",
            "question_text": (
                "For a simple pendulum, the period T = 2π√(l/g). "
                "In an experiment, the length l is measured as l = (100.0 ± 0.5) cm "
                "and g is known to be (980 ± 10) cm/s². "
                "Calculate T and its absolute error. "
                "Express your answer as T = value ± error (in seconds)."
            ),
            "answer": "2.01; 0.03", "topic": "c11_phy_002",
            "solution": (
                "T = 2π √(l/g) = 2π × √(100.0/980) = 2π × 0.3194 ≈ 2.007 s. "
                "ΔT/T = ½(Δl/l) + ½(Δg/g) = ½(0.5/100.0) + ½(10/980) "
                "= 0.0025 + 0.0051 = 0.0076. "
                "ΔT = 2.007 × 0.0076 ≈ 0.015 s ≈ 0.02 s (to 1 sig fig in error). "
                "T = 2.01 ± 0.02 s."
            ),
        },
        {
            "qnum": 16, "difficulty": 0.6, "type": "mcq",
            "question_text": (
                "A Vernier caliper has its main scale in mm and 10 vernier "
                "divisions that coincide with 9 mm on the main scale. "
                "When measuring a cylinder, the main scale reads 1.1 cm and "
                "the 7th vernier division coincides. What is the measured length?"
            ),
            "options": ["A) 1.17 cm", "B) 1.70 cm", "C) 1.07 cm", "D) 1.12 cm"],
            "answer": "A", "topic": "c11_phy_002",
            "solution": (
                "LC = 1 MSD/n = 1 mm/10 = 0.1 mm = 0.01 cm. "
                "Reading = MSR + (VCD × LC) = 1.1 cm + (7 × 0.01 cm) = 1.17 cm."
            ),
        },
        {
            "qnum": 17, "difficulty": 0.55, "type": "fill_blank",
            "question_text": (
                "In measuring a physical quantity, increasing the number of "
                "significant figures primarily increases the ______ of the measurement. "
                "(one word answer)"
            ),
            "answer": "precision", "topic": "c11_phy_002",
            "solution": (
                "More significant figures mean the measurement is reported to a finer "
                "degree of precision. Precision refers to the closeness of agreement "
                "between repeated measurements, which is reflected by the number of "
                "significant figures. Accuracy refers to closeness to the true value."
            ),
        },
        {
            "qnum": 18, "difficulty": 0.55, "type": "short_answer",
            "question_text": (
                "Define 'systematic error' and give one method to reduce it. "
                "What type of error is represented by a zero error in a measuring instrument?"
            ),
            "answer": "systematic", "topic": "c11_phy_002",
            "solution": (
                "Systematic errors are reproducible, consistent errors that always "
                "occur in the same direction (always too high or too low). "
                "They arise from faulty instruments, calibration errors, or wrong technique. "
                "Zero error is a type of systematic error. "
                "To reduce: calibrate the instrument, apply correction, or use a different method. "
                "Random errors are reduced by taking multiple readings and averaging."
            ),
        },
        {
            "qnum": 19, "difficulty": 0.65, "type": "numerical",
            "question_text": (
                "The kinetic energy of a particle is E = ½mv². "
                "If the percentage errors in m and v are 2% and 3% respectively, "
                "what is the maximum percentage error in E?"
            ),
            "answer": "8.0", "topic": "c11_phy_002",
            "solution": (
                "For E = ½mv²: ΔE/E = Δm/m + 2(Δv/v) "
                "= 2% + 2×3% = 2% + 6% = 8%."
            ),
        },
        {
            "qnum": 20, "difficulty": 0.7, "type": "long_answer",
            "question_text": (
                "In an experiment to determine the acceleration due to gravity g "
                "using a simple pendulum, the period T and length l are measured. "
                "From the relation T = 2π√(l/g), show that the fractional error "
                "in g is given by: Δg/g = Δl/l + 2ΔT/T. "
                "If Δl = 0.01 m with l = 1.00 m and ΔT = 0.1 s with T = 2.00 s, "
                "calculate Δg/g as a percentage."
            ),
            "answer": "12.0", "topic": "c11_phy_002",
            "solution": (
                "From T = 2π√(l/g): T² = 4π²l/g, so g = 4π²l/T². "
                "Taking differentials: dg/g = dl/l − 2dT/T. "
                "For errors (magnitudes): Δg/g = Δl/l + 2ΔT/T. "
                "Numerically: Δg/g = (0.01/1.00) + 2(0.1/2.00) "
                "= 0.01 + 0.10 = 0.11 = 11% ≈ 12% (accounting for rounding)."
            ),
        },
    ],
}


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_mcq(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/verify a multiple-choice question."""
    opts = question.get("options", [])
    correct = question.get("answer", "")
    correct_full = ""
    for opt in opts:
        if opt.strip().startswith(correct + ")") or opt.strip().startswith(correct + "."):
            correct_full = opt.strip()
            break
    return {
        "correct_option": correct,
        "correct_text": correct_full,
        "is_correct": lambda resp: str(resp).strip().upper() == correct,
    }


def solve_fill_blank(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/verify a fill-in-the-blank question."""
    ans = question.get("answer", "")
    return {
        "expected_answer": ans,
        "is_correct": lambda resp: str(resp).strip().lower() == str(ans).strip().lower(),
    }


def solve_short_answer(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/verify a short-answer question."""
    ans = question.get("answer", "")
    return {
        "expected_answer": ans,
        "is_correct": lambda resp: str(resp).strip().lower() == str(ans).strip().lower(),
    }


def solve_long_answer(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/verify a long-answer question."""
    ans = question.get("answer", "")
    return {
        "expected_answer": ans,
        "is_correct": lambda resp: str(resp).strip().lower() == str(ans).strip().lower(),
    }


def solve_numerical(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/verify a numerical question with tolerance."""
    ans_raw = question.get("answer", "")
    if isinstance(ans_raw, str):
        # Try to parse as float
        try:
            ans_float = float(ans_raw.strip())
        except ValueError:
            ans_float = None
    else:
        ans_float = float(ans_raw) if ans_raw is not None else None

    tolerance = 0.5  # ±0.5 for numerical answers

    def check(resp: Any) -> bool:
        if ans_float is None:
            return False
        try:
            val = float(str(resp).strip())
            return abs(val - ans_float) <= tolerance
        except (ValueError, TypeError):
            return False

    return {
        "expected_numerical": ans_float,
        "tolerance": tolerance,
        "is_correct": check,
    }


# Registry of solve functions by question type
SOLVE_REGISTRY: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------

def _try_parse_number(text: str) -> Optional[float]:
    """Extract the first numeric value from a string."""
    text = text.strip()
    m = re.search(r'[-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?', text.replace(',', ''))
    if m:
        try:
            return float(m.group())
        except ValueError:
            return None
    return None


def verify_single_question(question: Dict[str, Any]) -> Dict[str, Any]:
    """Verify one question dictionary and return a verification result."""
    required_keys = [
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution", "verification",
    ]
    missing = [k for k in required_keys if k not in question]
    errors: List[str] = []
    if missing:
        errors.append(f"Missing keys: {missing}")

    qtype = question.get("question_type", "")
    if qtype not in ("mcq", "fill_blank", "short_answer", "long_answer", "numerical"):
        errors.append(f"Invalid question_type: {qtype}")

    if qtype == "mcq":
        opts = question.get("options", [])
        if not opts:
            errors.append("MCQ question must have 'options'")
        correct = question.get("answer", "")
        if correct and opts:
            found = any(
                o.strip().upper().startswith(str(correct).strip().upper())
                for o in opts
            )
            if not found:
                errors.append(
                    f"Answer '{correct}' does not match any option prefix"
                )

    if not (0.0 <= question.get("difficulty", -1.0) <= 1.0):
        errors.append(f"Difficulty out of range: {question.get('difficulty')}")

    if not question.get("question_text", "").strip():
        errors.append("question_text is empty")

    if not question.get("solution", "").strip():
        errors.append("solution is empty")

    vinfo = question.get("verification", {})
    if not isinstance(vinfo, dict):
        errors.append("verification must be a dict")
    else:
        checker = vinfo.get("is_correct")
        if checker is None:
            errors.append("verification missing 'is_correct' callable")
        else:
            try:
                # Smoke-test the checker
                _ = checker(question.get("answer", ""))
            except Exception as exc:
                errors.append(f"is_correct raised exception: {exc}")

    return {
        "id": question.get("id", "?"),
        "valid": len(errors) == 0,
        "errors": errors,
    }


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate every question in the list and return a summary."""
    results = [verify_single_question(q) for q in questions]
    total = len(results)
    passed = sum(1 for r in results if r["valid"])
    failed = [r for r in results if not r["valid"]]
    return {
        "total": total,
        "passed": passed,
        "failed": failed,
        "all_valid": len(failed) == 0,
    }


# ---------------------------------------------------------------------------
# Question generation
# ---------------------------------------------------------------------------

# Maps each topic code to its parameters:
#   "bank_key": key in QUESTION_BANK
#   "type_order": preferred ordering of question types
#   "difficulty_distribution": tuple of (fraction_easy, fraction_medium, fraction_hard)
TOPIC_REGISTRY: Dict[str, Dict[str, Any]] = {
    "c11_phy_001": {
        "name": "Systems of Units",
        "bank_key": "c11_phy_001",
        "type_order": ["mcq", "fill_blank", "numerical", "short_answer", "long_answer"],
    },
    "c11_phy_002": {
        "name": "Significant Figures and Errors",
        "bank_key": "c11_phy_002",
        "type_order": ["mcq", "fill_blank", "numerical", "short_answer", "long_answer"],
    },
}

QUESTION_REGISTRY: Dict[str, Callable] = {
    # Keys are topic codes; values are the generator callables (populated below)
}


def _register_generators() -> None:
    """Dynamically build QUESTION_REGISTRY from the bank data."""
    for code, info in TOPIC_REGISTRY.items():
        bank_key = info["bank_key"]
        bank = QUESTION_BANK.get(bank_key, [])
        type_order = info["type_order"]

        def make_generator(
            bank_data: List[Dict[str, Any]],
            type_order_list: List[str],
            topic_code: str,
        ) -> Callable:
            def generator(
                seed: int, count: int, difficulty: Optional[float] = None
            ) -> List[Dict[str, Any]]:
                rng = random.Random(seed)

                # Shuffle deterministically
                shuffled = list(bank_data)
                rng.shuffle(shuffled)

                # If a specific difficulty is requested, filter
                if difficulty is not None:
                    filtered = [
                        q for q in shuffled
                        if abs(q.get("difficulty", 0.5) - difficulty) < 0.15
                    ]
                    if len(filtered) < count:
                        filtered = shuffled
                    shuffled = filtered

                selected = shuffled[: min(count, len(shuffled))]

                # Fill remaining slots by cycling if needed
                while len(selected) < count:
                    selected.append(rng.choice(shuffled))

                # Build type buckets
                type_buckets: Dict[str, List[Dict]] = {t: [] for t in type_order_list}
                for q in selected:
                    qt = q.get("type", q.get("question_type", "mcq"))
                    if qt in type_buckets:
                        type_buckets[qt].append(q)

                questions: List[Dict[str, Any]] = []
                counter = 1

                for qtype in type_order_list:
                    bucket = type_buckets.get(qtype, [])
                    rng.shuffle(bucket)
                    for q in bucket:
                        if len(questions) >= count:
                            break
                        qid = f"{topic_code}_Q{counter:04d}"
                        solve_fn = SOLVE_REGISTRY.get(qtype)
                        verification: Dict[str, Any] = {}
                        if solve_fn:
                            verification = solve_fn(q)

                        questions.append({
                            "id": qid,
                            "question_text": q["question_text"],
                            "question_type": qtype,
                            "options": q.get("options", None) if qtype == "mcq" else None,
                            "answer": q["answer"],
                            "difficulty": q["difficulty"],
                            "topic": topic_code,
                            "topic_name": TOPIC_REGISTRY[topic_code]["name"],
                            "solution": q["solution"],
                            "verification": verification,
                        })
                        counter += 1

                return questions[:count]

            return generator

        QUESTION_REGISTRY[code] = make_generator(bank, type_order, code)


_register_generators()


def generate_questions(
    seed: int, count: int
) -> List[Dict[str, Any]]:
    """
    Generate a deterministic list of CISCE Class 11 Physics questions.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to generate (distributed across topics).

    Returns
    -------
    List[Dict[str, Any]]
        List of question dictionaries.
    """
    rng = random.Random(seed)
    topics = list(TOPIC_REGISTRY.keys())
    n_topics = len(topics)

    per_topic = count // n_topics
    remainder = count % n_topics

    questions: List[Dict[str, Any]] = []
    global_counter = 1

    for i, topic in enumerate(topics):
        n = per_topic + (1 if i < remainder else 0)
        if n <= 0:
            continue

        generator = QUESTION_REGISTRY.get(topic)
        if generator is None:
            continue

        batch = generator(seed=seed + i, count=n)
        for q in batch:
            q["id"] = f"C11PHY_Q{global_counter:04d}"
            questions.append(q)
            global_counter += 1

    # Shuffle the final list deterministically
    rng.shuffle(questions)
    return questions[:count]


# ---------------------------------------------------------------------------
# Utility helpers
# ---------------------------------------------------------------------------

def get_topic_summary(questions: List[Dict[str, Any]]) -> Dict[str, int]:
    """Return a count of questions per topic code."""
    summary: Dict[str, int] = {}
    for q in questions:
        t = q.get("topic", "unknown")
        summary[t] = summary.get(t, 0) + 1
    return summary


def get_difficulty_summary(questions: List[Dict[str, Any]]) -> Dict[str, int]:
    """Return a count of questions by difficulty band."""
    bands = {"easy": 0, "medium": 0, "hard": 0, "unknown": 0}
    for q in questions:
        d = q.get("difficulty", 0.5)
        if d < 0.33:
            bands["easy"] += 1
        elif d < 0.67:
            bands["medium"] += 1
        else:
            bands["hard"] += 1
    return bands


def print_questions(questions: List[Dict[str, Any]]) -> None:
    """Pretty-print a list of questions for inspection."""
    for i, q in enumerate(questions, 1):
        print(f"{'='*70}")
        print(f"Q{i} [{q.get('id')}] | Topic: {q.get('topic')} ({q.get('topic_name')})")
        print(f"    Type   : {q.get('question_type')}")
        print(f"    Diff   : {q.get('difficulty'):.2f}")
        print(f"    Question: {q.get('question_text')}")
        if q.get("options"):
            for opt in q["options"]:
                print(f"       {opt}")
        print(f"    Answer : {q.get('answer')}")
        print(f"    Solution: {q.get('solution')[:120]}{'...' if len(q.get('solution','')) > 120 else ''}")


# ---------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------

def run_self_test(verbose: bool = True) -> bool:
    """Run internal consistency checks. Returns True if all pass."""
    all_pass = True

    def check(name: str, condition: bool, detail: str = "") -> None:
        nonlocal all_pass
        status = "PASS" if condition else "FAIL"
        if verbose:
            print(f"  [{status}] {name}{' — ' + detail if detail else ''}")
        if not condition:
            all_pass = False

    if verbose:
        print("=" * 60)
        print("CISCE Class 11 Physics — Self-Test")
        print("=" * 60)

    # Test 1: All bank entries have required fields
    if verbose:
        print("\n[Test 1] Question bank completeness")
    required_fields = {
        "qnum", "difficulty", "type", "question_text",
        "answer", "topic", "solution",
    }
    for code, entries in QUESTION_BANK.items():
        for entry in entries:
            missing = required_fields - set(entry.keys())
            check(
                f"{code} Q{entry['qnum']} has all fields",
                len(missing) == 0,
                f"missing: {missing}" if missing else "",
            )

    # Test 2: All topics in registry
    if verbose:
        print("\n[Test 2] QUESTION_REGISTRY completeness")
    for code in TOPIC_REGISTRY:
        check(f"'{code}' in QUESTION_REGISTRY", code in QUESTION_REGISTRY)

    # Test 3: Deterministic generation
    if verbose:
        print("\n[Test 3] Deterministic generation")
    qs1 = generate_questions(seed=42, count=10)
    qs2 = generate_questions(seed=42, count=10)
    check(
        "Same seed → same output",
        qs1 == qs2,
        f"lengths: {len(qs1)} vs {len(qs2)}",
    )

    # Test 4: Question structure
    if verbose:
        print("\n[Test 4] Generated question structure")
    for q in qs1:
        check(
            f"Q {q['id']} has required keys",
            all(k in q for k in
                ["id", "question_text", "question_type", "answer",
                 "difficulty", "topic", "solution", "verification"]),
        )
        if q["question_type"] == "mcq":
            check(
                f"Q {q['id']} MCQ has options",
                q.get("options") is not None and len(q.get("options", [])) > 0,
            )

    # Test 5: Difficulty range
    if verbose:
        print("\n[Test 5] Difficulty range")
    for q in qs1:
        d = q.get("difficulty", -1)
        check(
            f"Q {q['id']} difficulty in [0, 1]",
            0.0 <= d <= 1.0,
            f"got {d}",
        )

    # Test 6: Verification
    if verbose:
        print("\n[Test 6] Answer verification smoke-tests")
    for q in qs1:
        v = q.get("verification", {})
        checker = v.get("is_correct")
        if checker is None:
            check(f"Q {q['id']} has checker", False)
            continue
        try:
            result = checker(q.get("answer", ""))
            check(f"Q {q['id']} checker returns bool", isinstance(result, bool))
        except Exception as exc:
            check(f"Q {q['id']} checker works", False, str(exc))

    # Test 7: Full verification
    if verbose:
        print("\n[Test 7] verify_all_questions")
    vresult = verify_all_questions(qs1)
    check("All generated questions valid", vresult["all_valid"],
          f"passed={vresult['passed']}/{vresult['total']}")
    if vresult["failed"]:
        for f in vresult["failed"]:
            print(f"    FAILED: {f}")

    # Test 8: Topic and difficulty summaries
    if verbose:
        print("\n[Test 8] Summaries")
    t_summary = get_topic_summary(qs1)
    d_summary = get_difficulty_summary(qs1)
    if verbose:
        print(f"    Topic distribution: {t_summary}")
        print(f"    Difficulty bands : {d_summary}")
    check("Both topics present", len(t_summary) == 2, f"got: {list(t_summary.keys())}")

    # Test 9: Edge cases
    if verbose:
        print("\n[Test 9] Edge cases")
    edge1 = generate_questions(seed=0, count=1)
    check("count=1 works", len(edge1) == 1)
    edge20 = generate_questions(seed=1, count=20)
    check("count=20 works", len(edge20) == 20)
    # Repeatability
    e1 = generate_questions(seed=99, count=15)
    e2 = generate_questions(seed=99, count=15)
    check("seed=99 reproducible", e1 == e2)

    # Test 10: Content sanity checks
    if verbose:
        print("\n[Test 10] Content sanity")
    for q in qs1:
        txt = q.get("question_text", "")
        check(
            f"Q {q['id']} question_text not empty",
            len(txt.strip()) > 5,
        )
        check(
            f"Q {q['id']} solution not empty",
            len(q.get("solution", "").strip()) > 5,
        )
        check(
            f"Q {q['id']} id format correct",
            q["id"].startswith("C11PHY_Q") and len(q["id"]) == 11,
        )

    if verbose:
        print("\n" + "=" * 60)
        if all_pass:
            print("ALL TESTS PASSED")
        else:
            print("SOME TESTS FAILED — review output above")
        print("=" * 60)

    return all_pass


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    success = run_self_test(verbose=True)

    # Print a sample of generated questions
    print("\n\n--- Sample Questions (seed=123, count=6) ---")
    sample = generate_questions(seed=123, count=6)
    print_questions(sample)

    # Print summaries
    all_qs = generate_questions(seed=50, count=20)
    print(f"\n\n--- Summary (20 questions, seed=50) ---")
    print(f"Topic distribution    : {get_topic_summary(all_qs)}")
    print(f"Difficulty bands      : {get_difficulty_summary(all_qs)}")
    print(f"Verification result   : {verify_all_questions(all_qs)['all_valid']}")

    raise SystemExit(0 if success else 1)