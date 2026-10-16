"""chem_class9_board_battery.py -- GOLDEN-CHEM class 9 board-question deep test.

Owner directive (2026-10-06): ONE CLASS AT A TIME at the class-7-maths depth
bar.  Class 9 chemistry (NCERT Science chapters 1-4, the chemistry strand):

  Ch 1  Matter in Our Surroundings
  Ch 2  Is Matter Around Us Pure
  Ch 3  Atoms and Molecules
  Ch 4  Structure of the Atom

Method: hand-curated REAL board/NCERT-style questions, every expected answer
independently verified (standard chemistry, NCERT in-text answers), each run
in-process through backend.its.solver.answer_pipeline.answer with the LLM
lanes off (network-down production reality).  Examiner grading:

  SHIP_OK          VERIFIED* and the shipped answer matches the true answer
  CONFIDENT_WRONG  VERIFIED* and it does not           (the worst failure)
  HONEST_REFUSAL   GUIDED/AMBIGUOUS on a why/explain question (correct lane)
  CAPABILITY_GAP   GUIDED/AMBIGUOUS on a computation/fact it should solve
  ERROR            pipeline raised

File-based (no DB): Postgres-down safe.  DB-dependent lane checks (batch
serving etc.) are separately marked pending live re-check.

Usage: python tests/chem_class9_board_battery.py [out.json]
"""
import json
import os
import re
import sys

sys.path.insert(0, r"D:\platform\deploy")
BACKEND = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND)
os.environ.setdefault("SOLVER_LLM_MODE", "off")
os.environ.setdefault("DATABASE_URL",
                      "postgresql+asyncpg://dream_user:"
                      "at_-A518N1wtwyd6P-_sAWwlAGT9bdsAuoT"
                      "@127.0.0.1:5432/dream_app")

from backend.its.solver import structure_extractor as _se  # noqa: E402

# deterministic-only: no LLM slot extraction, no PAL program writing
_se.extract_slots = lambda q: None
_se.extract_program = lambda q: None

from backend.its.solver.answer_pipeline import answer  # noqa: E402


def _norm(s):
    """Normalizer shared by accept patterns and shipped answers."""
    s = str(s or "").lower()
    s = s.replace("°c", "c").replace("°", "")
    s = re.sub(r"[\s,]+", "", s)
    return s


# --------------------------------------------------------------------------- #
# The battery.  `accept` entries are already normalized substrings.
# ask_type: compute | fact | why   (why must NOT ship a faked VERIFIED)
# --------------------------------------------------------------------------- #
CASES = [
    # ── Ch 1: Matter in Our Surroundings ──────────────────────────────
    dict(id="c1_kelvin_conv", ch=1, ask="compute",
         q="Convert 25 degrees Celsius into Kelvin.",
         accept=["298"]),                                   # 25 + 273
    dict(id="c1_celsius_conv", ch=1, ask="compute",
         q="Convert 300 K into degrees Celsius.",
         accept=["27"]),                                    # 300 - 273
    dict(id="c1_kelvin_0", ch=1, ask="compute",
         q="What is 0 degrees Celsius in Kelvin?",
         accept=["273"]),
    dict(id="c1_water_state_250", ch=1, ask="fact",
         q="What is the physical state of water at 250 degrees Celsius?",
         accept=["gas", "vapour", "vapor", "steam"]),
    dict(id="c1_boiling_point", ch=1, ask="fact",
         q="What is the boiling point of water at normal atmospheric "
           "pressure, in degrees Celsius?",
         accept=["100"]),
    dict(id="c1_melt_freeze_point", ch=1, ask="fact",
         q="At what temperature, in degrees Celsius, do ice and water "
           "exist together in equilibrium?",
         accept=["0"]),
    dict(id="c1_latent_vap", ch=1, ask="compute",
         q="How much heat energy is required to change 10 g of water at "
           "100 degrees Celsius into steam? (Latent heat of vaporisation "
           "of water = 540 cal/g)",
         # m L = 5400 cal = 22604.4 J (x 4.186) -- both forms are the
         # same energy; the solver answers in joules (needle fixed
         # 2026-10-06: the original cal-only needle flagged a CORRECT
         # joule conversion as wrong)
         accept=["5400", "22604"]),
    dict(id="c1_latent_fus", ch=1, ask="compute",
         q="How much heat is needed to melt 20 g of ice at 0 degrees "
           "Celsius? (Latent heat of fusion of ice = 334 J/g)",
         accept=["6680"]),                                  # 20 x 334
    dict(id="c1_evap_cooling", ch=1, ask="why",
         q="Why does evaporation cause cooling?",
         accept=["latent", "heat is absorb"]),              # if shipped, must say this
    dict(id="c1_solids_incompressible", ch=1, ask="why",
         q="Why are solids practically incompressible?",
         accept=["closely packed", "closelypack", "tightly packed",
                 "rigid", "fixed positions", "negligible interparticle"]),
    dict(id="c1_smell_distance", ch=1, ask="fact",
         q="Which property of gases explains why the smell of incense "
           "sticks reaches us several metres away?",
         accept=["diffusion", "diffuse", "fast moving", "high kinetic"]),

    # ── Ch 2: Is Matter Around Us Pure ────────────────────────────────
    dict(id="c2_mass_percent", ch=2, ask="compute",
         q="A solution contains 40 g of common salt in 320 g of water. "
           "Calculate the concentration in terms of mass percentage "
           "of the solution.",
         # true value 11.11% (40/360); ships "11%" -- the display layer
         # rounds every float percent to integer BY OWNER LAW
         # (display_scrub._fmt_percent_float).  Method correct, value
         # correct after the law's rounding -> accepted, documented.
         accept=["11.1", "11%"]),
    dict(id="c2_mass_percent2", ch=2, ask="compute",
         q="15 g of salt is dissolved in 60 g of water. What is the mass "
           "percentage of salt in the solution?",
         accept=["20"]),                                    # 15/75 x 100
    dict(id="c2_mass_volume_percent", ch=2, ask="compute",
         q="A 250 mL solution contains 20 g of sugar. What is the mass by "
           "volume percentage of sugar in the solution?",
         accept=["8"]),                                     # 20/250 x 100
    dict(id="c2_separate_cream", ch=2, ask="fact",
         q="How can cream be separated from milk?",
         accept=["centrifug"]),
    dict(id="c2_separate_sand", ch=2, ask="fact",
         q="How will you separate sand and water from their mixture?",
         accept=["filtrat", "sedimentat", "decantat"]),
    dict(id="c2_separate_salt_nh4cl", ch=2, ask="fact",
         q="How will you separate common salt from ammonium chloride in "
           "a mixture?",
         accept=["sublimat"]),
    dict(id="c2_separate_ink_dyes", ch=2, ask="fact",
         q="Which technique is used to separate the dyes in black ink?",
         accept=["chromatograph"]),
    dict(id="c2_separate_oil_water", ch=2, ask="fact",
         q="Which apparatus separates a mixture of oil and water?",
         accept=["separating funnel", "separatingfunnel"]),
    dict(id="c2_brass_kind", ch=2, ask="fact",
         q="Is brass an element, a compound, or a mixture?",
         accept=["mixture", "alloy"]),
    dict(id="c2_tyndall", ch=2, ask="fact",
         q="Which effect shown by colloids distinguishes them from true "
           "solutions when a beam of light passes through?",
         accept=["tyndall"]),
    dict(id="c2_saturated_solution", ch=2, ask="why",
         q="What is a saturated solution?",
         accept=["no more solute", "nomoresolute", "cannot dissolve more",
                 "candissolvemaximum", "maximum amount of solute",
                 "dissolved the maximum", "dissolved the maximum possible"]),

    # ── Ch 3: Atoms and Molecules ─────────────────────────────────────
    dict(id="c3_molmass_h2o", ch=3, ask="compute",
         q="Calculate the molecular mass of water (H2O). (Atomic masses: "
           "H = 1 u, O = 16 u)",
         accept=["18"]),                                    # 2x1 + 16
    dict(id="c3_molmass_hno3", ch=3, ask="compute",
         q="Calculate the molecular mass of nitric acid (HNO3). "
           "(H = 1 u, N = 14 u, O = 16 u)",
         accept=["63"]),                                    # 1+14+48
    dict(id="c3_molmass_caco3", ch=3, ask="compute",
         q="Calculate the formula unit mass of CaCO3. (Ca = 40 u, "
           "C = 12 u, O = 16 u)",
         accept=["100"]),                                   # 40+12+48
    dict(id="c3_molmass_nacl", ch=3, ask="compute",
         q="Calculate the formula unit mass of NaCl. (Na = 23 u, "
           "Cl = 35.5 u)",
         accept=["58.5"]),
    dict(id="c3_mass_of_half_mole_water", ch=3, ask="compute",
         q="What is the mass of 0.5 mole of water? (molar mass of "
           "H2O = 18 g/mol)",
         accept=["9"]),                                     # 0.5 x 18
    dict(id="c3_moles_52g_he", ch=3, ask="compute",
         q="How many moles are there in 52 g of helium? (molar mass of "
           "He = 4 g/mol)",
         accept=["13"]),                                    # 52/4
    dict(id="c3_molecules_22g_co2", ch=3, ask="compute",
         q="Calculate the number of molecules present in 22 g of CO2. "
           "(molar mass of CO2 = 44 g/mol)",
         accept=["3.011", "3.01", "6.022/2", "0.5mol", "0.5 mol",
                 "halfmole", "6.02e23/2"]),
    dict(id="c3_h2o_ratio_burn", ch=3, ask="compute",
         q="In water, hydrogen and oxygen combine in the mass ratio 1:8. "
           "What mass of oxygen gas is required to completely burn 3 g "
           "of hydrogen gas?",
         accept=["24"]),                                    # 3 x 8
    dict(id="c3_formula_alcl3", ch=3, ask="fact",
         q="Write the chemical formula of aluminium chloride (Al valency "
           "3, Cl valency 1).",
         accept=["alcl3"]),
    dict(id="c3_formula_na2o", ch=3, ask="fact",
         q="Write the chemical formula of sodium oxide (Na valency 1, "
           "O valency 2).",
         accept=["na2o"]),
    dict(id="c3_atoms_h_in_half_mole_water", ch=3, ask="compute",
         q="How many moles of hydrogen atoms are present in 0.5 mole of "
           "water molecules?",
         accept=["1"]),                                     # 0.5 x 2
    dict(id="c3_why_atom_invisible", ch=3, ask="why",
         q="Why is it not possible to see an atom with the naked eye?",
         accept=["small", "nanometre", "nanometer", "tiny", "very little"]),

    # ── Ch 4: Structure of the Atom ───────────────────────────────────
    dict(id="c4_na_ion_electrons", ch=4, ask="compute",
         q="The atomic number of sodium is 11. How many electrons are "
           "there in a sodium ion Na+?",
         accept=["10"]),                                    # 11 - 1
    dict(id="c4_cl_ion_electrons", ch=4, ask="compute",
         q="The atomic number of chlorine is 17. How many electrons are "
           "there in a chloride ion Cl-?",
         accept=["18"]),                                    # 17 + 1
    dict(id="c4_mass_number", ch=4, ask="compute",
         q="An atom of an element has 11 protons and 12 neutrons. What "
           "is its mass number?",
         accept=["23"]),                                    # 11 + 12
    dict(id="c4_neutrons_c14", ch=4, ask="compute",
         q="The isotope carbon-14 has 6 protons. How many neutrons does "
           "a carbon-14 atom have?",
         accept=["8"]),                                     # 14 - 6
    dict(id="c4_config_cl", ch=4, ask="fact",
         q="Write the electronic configuration of chlorine (atomic "
           "number 17).",
         accept=["2,8,7", "2 8 7", "287"]),
    dict(id="c4_valency_o", ch=4, ask="fact",
         q="What is the valency of oxygen (atomic number 8)?",
         accept=["2"]),
    dict(id="c4_valency_ne", ch=4, ask="fact",
         q="What is the valency of neon (atomic number 10)?",
         accept=["0", "zero", "noble", "complete octet", "full octet",
                 "chemically inert", "inert"]),
    dict(id="c4_valency_al", ch=4, ask="fact",
         q="What is the valency of aluminium (atomic number 13)?",
         accept=["3"]),
    dict(id="c4_nucleus_discoverer", ch=4, ask="fact",
         q="Who discovered the nucleus of the atom?",
         accept=["rutherford"]),
    dict(id="c4_electron_discoverer", ch=4, ask="fact",
         q="Name the subatomic particle discovered by J.J. Thomson.",
         accept=["electron"]),
    dict(id="c4_neutron_discoverer", ch=4, ask="fact",
         q="Who discovered the neutron?",
         accept=["chadwick"]),
    dict(id="c4_why_nucleus_positive", ch=4, ask="why",
         q="Why is the nucleus of an atom positively charged?",
         accept=["proton", "protons", "positively charged particles",
                 "neutrons neutral"]),
]

VERIFIEDS = ("VERIFIED",)
HONEST = ("GUIDED_PRACTICE", "AMBIGUOUS")


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        BACKEND, "tests", "_chem_c9_out.json")
    rows = []
    for c in CASES:
        try:
            r = answer(c["q"])
            label = str(r.label)
            shipped = _norm(r.answer)
            verified = label.startswith("VERIFIED")
            # accepts are normalized the same way as the shipped text
            hit = any(_norm(a) in shipped for a in c["accept"])
            # responsiveness gate: a fact/why answer must be a short,
            # direct statement -- a 300-char concept narrative that
            # happens to contain the digits is NOT an answer (the
            # neurolink lane once false-passed this way)
            max_len = 240 if c["ask"] == "fact" else None
            responsive = max_len is None or len(str(r.answer or "")) <= max_len
            if verified and hit and responsive:
                verdict = "SHIP_OK"
            elif verified and not responsive:
                verdict = "NON_ANSWER_SHIP"
            elif verified:
                verdict = "CONFIDENT_WRONG"
            elif label in HONEST:
                verdict = ("HONEST_REFUSAL" if c["ask"] == "why"
                           else "CAPABILITY_GAP")
            else:
                verdict = "OTHER:" + label
            rec = dict(c, label=label, shipped=r.answer, verdict=verdict)
        except Exception as e:
            rec = dict(c, label="ERROR", shipped=repr(e), verdict="ERROR")
        rows.append(rec)
        print(f"[{rec['verdict']:>15}] {c['id']}: "
              f"{str(rec.get('shipped'))[:80]}", flush=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=1, ensure_ascii=False)
    from collections import Counter
    tally = Counter(r["verdict"] for r in rows)
    print("\n=== " + " | ".join(f"{k}={v}" for k, v in sorted(tally.items()))
          + f" === (n={len(rows)}) -> {out_path}", flush=True)
    bad = [r["id"] for r in rows
           if r["verdict"].startswith(("CONFIDENT_WRONG", "ERROR", "OTHER",
                                       "NON_ANSWER_SHIP"))]
    if bad:
        print("CRITICAL:", bad, flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
