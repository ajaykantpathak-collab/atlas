"""numericals_drill_gen.py -- infinite fresh CBSE-style physics and
chemistry numericals for the tutor loop.

The catalog pools cap at POOL_CAP items, so a student drilling one
concept for longer than a pool rotation starts seeing repeats.  This
module is the deterministic escape valve: when the serve path consults
it for a physics/chemistry numerical concept, it produces a brand-new
board-style numerical whose answer is COMPUTED EXACTLY (not authored),
so grading through tutor.grade_numeric stays an anchor, not a guess.

Design rules (mirroring the platform's determinism contract):
  - Zero runtime randomness: the variant for a serve is a pure function
    of (student_id, concept_id, serve_count) -- a sha256-seeded affine
    permutation over the family's enumerated variant space.  Same
    history => same question, on every interpreter, forever.
  - Exact arithmetic only: every quantity is a fractions.Fraction; a
    draw survives only if its answer is an integer or a terminating
    decimal (<= MAX_DP places).  Non-terminating draws are rejected at
    ENUMERATION time (the "re-draw" rule), so the serve path can never
    hit one.
  - CBSE-realistic wording with units in the question AND the answer
    spec, a tier tag (easy = direct formula, grade = 2-step, hard =
    combined), and the formula identity tagged for the hint ladder.

Public surface consumed by tutor.py:
    consult(concept_id, title, formula, student_id, serve_count,
            tier_pref=None) -> Optional[dict]   # fail-open: None is fine
    family_stats() -> dict                      # variant-space report
    match_families(concept_id, title, formula) -> list[str]
"""

from __future__ import annotations

import hashlib
import re
from fractions import Fraction
from typing import Dict, List, Optional, Tuple

# --------------------------------------------------------------------- #
# tunables
# --------------------------------------------------------------------- #
MAX_DP = 4                     # max decimal places a display answer may have
ROUND_TRIP_DP = 6              # safety margin while checking termination
_F = 96500                     # Faraday constant, C per mole of electrons


# --------------------------------------------------------------------- #
# exact decimal rendering (no floats anywhere near an answer)
# --------------------------------------------------------------------- #
class NonTerminating(ValueError):
    """A draw whose answer has no short terminating decimal form."""


def dec_str(value: Fraction, max_dp: int = MAX_DP) -> str:
    """Exact terminating-decimal string for a Fraction, or raise
    NonTerminating.  Pure integer arithmetic: stable on every Python
    build and every locale."""
    value = Fraction(value)
    den = value.denominator
    # strip factors of 2 and 5; whatever remains must divide 10**dp
    while den % 2 == 0:
        den //= 2
    while den % 5 == 0:
        den //= 5
    if den != 1:
        raise NonTerminating(str(value))
    scaled = value * (10 ** max_dp)
    if scaled.denominator != 1:
        # terminating, but needs more than max_dp places: still a
        # rejection for our purposes (a pH of 0.0001 mol/L or a
        # 1/16-ohm equivalent has no sane short display form)
        raise NonTerminating(str(value))
    n = int(scaled)
    sign = "-" if n < 0 else ""
    n = abs(n)
    s = str(n).rjust(max_dp + 1, "0")
    whole, frac = s[:-max_dp] or "0", s[-max_dp:]
    frac = frac.rstrip("0")
    if not frac:
        return f"{sign}{whole}"
    return f"{sign}{whole}.{frac}"


def _ok(value: Fraction, max_dp: int = MAX_DP) -> bool:
    """Admission check: terminating within max_dp and not absurd."""
    try:
        dec_str(Fraction(value), max_dp)
        return True
    except NonTerminating:
        return False


def _fmt_quantity(value: Fraction, unit: str) -> str:
    """'7/2' with unit 'm/s' -> '3.5 m/s' (bare number when unitless)."""
    s = dec_str(value)
    return f"{s} {unit}".strip()


# --------------------------------------------------------------------- #
# deterministic permutation draw (the whole "randomness" of the module)
# --------------------------------------------------------------------- #
def _perm_params(seed_key: str, n: int) -> Tuple[int, int]:
    """(a, b) for the affine index map i -> (a*counter + b) mod n, with
    gcd(a, n) == 1 so the map is a BIJECTION of range(n): consecutive
    counters can never collide before the space is exhausted."""
    digest = hashlib.sha256(seed_key.encode("utf-8")).digest()
    a = 1
    for off in range(0, 32, 4):
        cand = int.from_bytes(digest[off:off + 4], "big") | 1
        if _gcd(cand, n) == 1:
            a = cand
            break
    b = int.from_bytes(digest[28:32], "big") % n
    return a, b


def _gcd(x: int, y: int) -> int:
    while y:
        x, y = y, x % y
    return x


def _draw_index(seed_key: str, counter: int, n: int) -> int:
    if n <= 0:
        raise NonTerminating("empty family")
    a, b = _perm_params(seed_key, n)
    return (a * int(counter) + b) % n


# --------------------------------------------------------------------- #
# variant record
# --------------------------------------------------------------------- #
class Variant:
    __slots__ = ("q", "a", "tier", "formula", "unit", "steps")

    def __init__(self, q: str, a: str, tier: str, formula: str,
                 unit: str, steps: List[str]):
        self.q = q
        self.a = a                    # answer spec: number + unit
        self.tier = tier              # easy | grade | hard
        self.formula = formula        # formula identity for the hint ladder
        self.unit = unit              # SI unit label (answer's unit)
        self.steps = steps            # worked steps (hint level 3)


# ===================================================================== #
# family construction helpers
# ===================================================================== #
_SCENARIOS = ["car", "bus", "scooter", "cycle", "train", "truck",
              "ball", "trolley", "van", "bike"]
_CHEM_CONTEXTS = ["lab preparation", "class experiment", "industrial batch",
                  "school practical"]


def _pick(seq: List, i: int):
    return seq[i % len(seq)]


def _scenario(i: int) -> str:
    return _pick(_SCENARIOS, i)


def _cap(word: str) -> str:
    return word[0].upper() + word[1:]


def _plural_verb(s: str) -> str:
    return s if s.endswith("s") else s + "s"


# --------------------------------------------------------------------- #
# PHYSICS families
# --------------------------------------------------------------------- #
def _kin_v_at() -> List[Variant]:
    """v = u + at -- first equation of motion, three unknown-slots."""
    out: List[Variant] = []
    us = [Fraction(x) for x in range(0, 22, 2)]
    accs = [Fraction(x, 2) for x in range(-8, 11) if x != 0]
    ts = [Fraction(x) for x in range(2, 13)]
    for u in us:
        for a in accs:
            for t in ts:
                v = u + a * t
                if v < 0 or not _ok(v):
                    continue
                s = _scenario(len(out))
                formula = "v = u + at"
                out.append(Variant(
                    q=(f"A {s} starts at a velocity of {dec_str(u)} m/s "
                       f"and accelerates uniformly at {dec_str(a)} m/s2 "
                       f"for {dec_str(t)} s. What is its final velocity?"),
                    a=_fmt_quantity(v, "m/s"), tier="easy",
                    formula=formula, unit="m/s",
                    steps=[f"v = u + at",
                           f"v = {dec_str(u)} + ({dec_str(a)}) x "
                           f"{dec_str(t)}",
                           f"v = {dec_str(v)} m/s"]))
                if u != 0 and a != 0:
                    # grade tier: solve for acceleration instead
                    out.append(Variant(
                        q=(f"The velocity of a {_scenario(len(out) + 3)} "
                           f"changes uniformly from {dec_str(u)} m/s to "
                           f"{dec_str(v)} m/s in {dec_str(t)} s. Find its "
                           f"acceleration."),
                        a=_fmt_quantity(a, "m/s2"), tier="grade",
                        formula=formula, unit="m/s2",
                        steps=["a = (v - u) / t",
                               f"a = ({dec_str(v)} - {dec_str(u)}) / "
                               f"{dec_str(t)}",
                               f"a = {dec_str(a)} m/s2"]))
    return out


def _kin_s_ut() -> List[Variant]:
    """s = ut + (1/2) a t^2 -- second equation of motion."""
    out: List[Variant] = []
    us = [Fraction(x) for x in range(0, 21, 2)]
    accs = [Fraction(x, 2) for x in range(-6, 11) if x != 0]
    ts = [Fraction(x) for x in range(2, 11)]
    for u in us:
        for a in accs:
            for t in ts:
                s = u * t + Fraction(1, 2) * a * t * t
                if s <= 0 or not _ok(s):
                    continue
                v_end = u + a * t
                if v_end < 0:
                    continue
                who = _scenario(len(out))
                formula = "s = ut + (1/2)at2"
                if u == 0:
                    out.append(Variant(
                        q=(f"A {_scenario(len(out) + 5)} starts from rest "
                           f"and accelerates uniformly at {dec_str(a)} "
                           f"m/s2. How far does it travel in "
                           f"{dec_str(t)} s?"),
                        a=_fmt_quantity(s, "m"), tier="easy",
                        formula=formula, unit="m",
                        steps=["s = ut + (1/2)at2, u = 0",
                               f"s = (1/2) x {dec_str(a)} x "
                               f"{dec_str(t * t)}",
                               f"s = {dec_str(s)} m"]))
                else:
                    out.append(Variant(
                        q=(f"A {who} travelling at {dec_str(u)} m/s "
                           f"accelerates uniformly at {dec_str(a)} m/s2 "
                           f"for {dec_str(t)} s. What distance does it "
                           f"cover in this time?"),
                        a=_fmt_quantity(s, "m"), tier="grade",
                        formula=formula, unit="m",
                        steps=["s = ut + (1/2)at2",
                               f"s = {dec_str(u)} x {dec_str(t)} + "
                               f"(1/2) x {dec_str(a)} x {dec_str(t * t)}",
                               f"s = {dec_str(s)} m"]))
    return out


def _kin_v2() -> List[Variant]:
    """v2 = u2 + 2as -- third equation of motion, incl. stopping
    distance."""
    out: List[Variant] = []
    us = [Fraction(x) for x in range(2, 21, 2)]
    vs = [Fraction(x) for x in range(4, 41, 2)]
    accs = [Fraction(x, 2) for x in range(-8, 11) if x != 0]
    for u in us:
        for v in vs:
            if v <= u:
                continue
            for a in accs:
                diff = v * v - u * u
                s = diff / (2 * a)
                if s <= 0 or not _ok(s):
                    continue
                formula = "v2 = u2 + 2as"
                who = _scenario(len(out))
                out.append(Variant(
                    q=(f"A {who} moving at {dec_str(u)} m/s accelerates "
                       f"uniformly at {dec_str(a)} m/s2 over a distance "
                       f"of {dec_str(s)} m. What is its final velocity?"),
                    a=_fmt_quantity(v, "m/s"),
                    tier="grade" if abs(a) != Fraction(1) else "easy",
                    formula=formula, unit="m/s",
                    steps=["v2 = u2 + 2as",
                           f"v2 = {dec_str(u * u)} + 2 x {dec_str(a)} x "
                           f"{dec_str(s)}",
                           f"v = {dec_str(v)} m/s"]))
                break     # one acceleration per (u, v) keeps the space lean
    # braking / stopping-distance variants: s = u2 / (2a) with a < 0
    brake_us = [Fraction(x) for x in range(10, 51, 5)]
    brake_as = [Fraction(x, 2) for x in range(-12, -1, 2)]
    for u in brake_us:
        for a in brake_as:
            s = u * u / (2 * a)
            if s <= 0 or not _ok(s):
                continue
            who = _scenario(len(out))
            out.append(Variant(
                q=(f"The brakes of a {who} moving at {dec_str(u)} m/s "
                   f"produce a uniform retardation of "
                   f"{dec_str(-a)} m/s2. How much distance does it cover "
                   f"before coming to rest?"),
                a=_fmt_quantity(s, "m"), tier="grade",
                formula="v2 = u2 + 2as (v = 0)", unit="m",
                steps=["v2 = u2 + 2as with v = 0",
                       f"0 = {dec_str(u * u)} + 2 x ({dec_str(a)}) x s",
                       f"s = {dec_str(s)} m"]))
    return out


def _ohm() -> List[Variant]:
    """V = IR, three unknown-slots."""
    out: List[Variant] = []
    rs = [Fraction(x) for x in (2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40,
                                50, 60, 80, 100)]
    ims = [Fraction(x, 100) for x in
           (20, 25, 40, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500)]
    for r in rs:
        for i in ims:
            v = i * r
            if v > 240 or not _ok(v) or v == 0:
                continue
            formula = "V = IR"
            dev = _pick(("resistor", "heating coil", "bulb filament",
                         "electric iron"), len(out))
            out.append(Variant(
                q=(f"A current of {dec_str(i)} A flows through a "
                   f"{dec_str(r)} ohm {dev} connected to a battery. What "
                   f"is the potential difference across the {dev}?"),
                a=_fmt_quantity(v, "V"), tier="easy", formula=formula,
                unit="V",
                steps=["V = IR",
                       f"V = {dec_str(i)} x {dec_str(r)}",
                       f"V = {dec_str(v)} V"]))
            if i != 0:
                out.append(Variant(
                    q=(f"A {dev} draws a current of {dec_str(i)} A when "
                       f"connected to a {dec_str(v)} V supply. Find its "
                       f"resistance."),
                    a=_fmt_quantity(r, "ohm"), tier="grade",
                    formula=formula, unit="ohm",
                    steps=["R = V / I",
                           f"R = {dec_str(v)} / {dec_str(i)}",
                           f"R = {dec_str(r)} ohm"]))
    return out


def _res_series() -> List[Variant]:
    """Rs = R1 + R2 (+ R3), plus a 2-step current ask."""
    out: List[Variant] = []
    rs = [Fraction(x) for x in (2, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24,
                                25, 30, 36, 40, 50, 60)]
    vs = [Fraction(x) for x in (6, 12, 24)]
    for i, (r1, r2) in enumerate(
            [(a, b) for a in rs for b in rs if a < b]):
        rt = r1 + r2
        out.append(Variant(
            q=(f"Two resistors of {dec_str(r1)} ohm and {dec_str(r2)} "
               f"ohm are connected in series across a battery. What is "
               f"the total resistance of the circuit?"),
            a=_fmt_quantity(rt, "ohm"), tier="easy",
            formula="Rs = R1 + R2", unit="ohm",
            steps=["Rs = R1 + R2",
                   f"Rs = {dec_str(r1)} + {dec_str(r2)}",
                   f"Rs = {dec_str(rt)} ohm"]))
        v = _pick(vs, i)
        cur = v / rt
        if _ok(cur):
            out.append(Variant(
                q=(f"Resistors of {dec_str(r1)} ohm and {dec_str(r2)} "
                   f"ohm are joined in series and the combination is "
                   f"connected to a {dec_str(v)} V battery. Find the "
                   f"total resistance and the current in the circuit."),
                a=_fmt_quantity(cur, "A"), tier="grade",
                formula="Rs = R1 + R2; I = V / Rs", unit="A",
                steps=[f"Rs = {dec_str(r1)} + {dec_str(r2)} = "
                       f"{dec_str(rt)} ohm",
                       f"I = V / Rs = {dec_str(v)} / {dec_str(rt)}",
                       f"I = {dec_str(cur)} A"]))
    for r1, r2, r3 in [(a, b, c) for a in rs for b in rs for c in rs
                       if a < b < c and a + b + c <= 120][:300]:
        out.append(Variant(
            q=(f"Three resistors of {dec_str(r1)} ohm, {dec_str(r2)} "
               f"ohm and {dec_str(r3)} ohm are connected in series. "
               f"Calculate the equivalent resistance of the "
               f"combination."),
            a=_fmt_quantity(r1 + r2 + r3, "ohm"), tier="grade",
            formula="Rs = R1 + R2 + R3", unit="ohm",
            steps=["Rs = R1 + R2 + R3",
                   f"Rs = {dec_str(r1)} + {dec_str(r2)} + {dec_str(r3)}",
                   f"Rs = {dec_str(r1 + r2 + r3)} ohm"]))
    return out


def _res_parallel() -> List[Variant]:
    """1/Rp = 1/R1 + 1/R2 -- keep only terminating equivalents."""
    out: List[Variant] = []
    rs = [Fraction(x) for x in range(2, 61)]
    for r1 in rs:
        for r2 in rs:
            if r2 <= r1:
                continue
            rp = r1 * r2 / (r1 + r2)
            if not _ok(rp):
                continue
            tier = "easy" if rp.denominator == 1 else "grade"
            out.append(Variant(
                q=(f"Two resistors of {dec_str(r1)} ohm and "
                   f"{dec_str(r2)} ohm are connected in parallel. What "
                   f"is the equivalent resistance of the combination?"),
                a=_fmt_quantity(rp, "ohm"), tier=tier,
                formula="1/Rp = 1/R1 + 1/R2", unit="ohm",
                steps=["1/Rp = 1/R1 + 1/R2",
                       f"1/Rp = 1/{dec_str(r1)} + 1/{dec_str(r2)}",
                       f"Rp = {dec_str(rp)} ohm"]))
    return out


def _work_fd() -> List[Variant]:
    """W = F x d, three unknown-slots (+ a small displacement split for
    the hard tier)."""
    out: List[Variant] = []
    fs = [Fraction(x) for x in (2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40,
                                50, 60, 80, 100, 120, 150, 200, 250)]
    ds = [Fraction(x) for x in (2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25,
                                40, 50)]
    for f in fs:
        for d in ds:
            w = f * d
            if w > 20000 or not _ok(w):
                continue
            act = _pick(("pushing a crate", "dragging a trunk",
                         "pulling a trolley", "pushing a cart"),
                        len(out))
            out.append(Variant(
                q=(f"A worker applies a constant force of {dec_str(f)} N "
                   f"while {act} through a distance of {dec_str(d)} m in "
                   f"the direction of the force. How much work is done?"),
                a=_fmt_quantity(w, "J"), tier="easy", formula="W = F x d",
                unit="J",
                steps=["W = F x d",
                       f"W = {dec_str(f)} x {dec_str(d)}",
                       f"W = {dec_str(w)} J"]))
            if f != 0:
                out.append(Variant(
                    q=(f"{dec_str(w)} J of work is done while {act} a "
                       f"load through {dec_str(d)} m along the force. "
                       f"Find the applied force."),
                    a=_fmt_quantity(f, "N"), tier="grade",
                    formula="W = F x d", unit="N",
                    steps=["F = W / d",
                           f"F = {dec_str(w)} / {dec_str(d)}",
                           f"F = {dec_str(f)} N"]))
    return out


def _ke() -> List[Variant]:
    """KE = (1/2) m v2."""
    out: List[Variant] = []
    ms = [Fraction(x, 2) for x in range(1, 41)]      # 0.5 .. 20 kg
    vs = [Fraction(x) for x in range(2, 23, 2)]      # even v keeps 1/2 clean
    for m in ms:
        for v in vs:
            ke = Fraction(1, 2) * m * v * v
            if ke > 100000 or not _ok(ke):
                continue
            who = _scenario(len(out))
            out.append(Variant(
                q=(f"What is the kinetic energy of a {dec_str(m)} kg "
                   f"{who} moving with a speed of {dec_str(v)} m/s?"),
                a=_fmt_quantity(ke, "J"), tier="easy",
                formula="KE = (1/2) m v2", unit="J",
                steps=["KE = (1/2) m v2",
                       f"KE = (1/2) x {dec_str(m)} x {dec_str(v * v)}",
                       f"KE = {dec_str(ke)} J"]))
            if m != 0:
                out.append(Variant(
                    q=(f"A {who} of mass {dec_str(m)} kg has a kinetic "
                       f"energy of {dec_str(ke)} J. Calculate its "
                       f"speed."),
                    a=_fmt_quantity(v, "m/s"), tier="grade",
                    formula="KE = (1/2) m v2", unit="m/s",
                    steps=["v2 = 2 x KE / m",
                           f"v2 = 2 x {dec_str(ke)} / {dec_str(m)}",
                           f"v = {dec_str(v)} m/s"]))
    return out


def _pe() -> List[Variant]:
    """PE = m g h with g = 10 m/s2 (CBSE drill convention)."""
    out: List[Variant] = []
    ms = [Fraction(x) for x in range(1, 26)]
    hs = [Fraction(x) for x in range(1, 41)]
    g = Fraction(10)
    for m in ms:
        for h in hs:
            pe = m * g * h
            if pe > 20000:
                continue
            obj = _pick(("box", "bucket of water", "carton", "stone",
                         "sack of grain"), len(out))
            place = _pick(("onto a platform", "to a shelf",
                           "up a staircase", "onto a roof"),
                          len(out) + 1)
            out.append(Variant(
                q=(f"A {dec_str(m)} kg {obj} is raised {place} "
                   f"{dec_str(h)} m high. Taking g = 10 m/s2, how much "
                   f"gravitational potential energy does it gain?"),
                a=_fmt_quantity(pe, "J"), tier="easy",
                formula="PE = m g h", unit="J",
                steps=["PE = m g h",
                       f"PE = {dec_str(m)} x 10 x {dec_str(h)}",
                       f"PE = {dec_str(pe)} J"]))
    return out


def _force_ma() -> List[Variant]:
    """F = m a and weight W = m g."""
    out: List[Variant] = []
    ms = [Fraction(x) for x in (1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20,
                                25, 40, 50, 60, 80)]
    accs = [Fraction(x, 2) for x in range(1, 21)]
    for m in ms:
        for a in accs:
            f = m * a
            if f > 5000 or not _ok(f):
                continue
                # (guard kept for symmetry with the other families)
            who = _scenario(len(out))
            out.append(Variant(
                q=(f"What force is needed to give a {dec_str(m)} kg "
                   f"{who} an acceleration of {dec_str(a)} m/s2?"),
                a=_fmt_quantity(f, "N"), tier="easy", formula="F = m a",
                unit="N",
                steps=["F = m a",
                       f"F = {dec_str(m)} x {dec_str(a)}",
                       f"F = {dec_str(f)} N"]))
            out.append(Variant(
                q=(f"A force of {dec_str(f)} N acts on a {dec_str(m)} "
                   f"kg {who}. What acceleration does it produce?"),
                a=_fmt_quantity(a, "m/s2"), tier="grade",
                formula="F = m a", unit="m/s2",
                steps=["a = F / m",
                       f"a = {dec_str(f)} / {dec_str(m)}",
                       f"a = {dec_str(a)} m/s2"]))
    # weight variants
    for m in ms:
        w10 = m * 10
        if w10 <= 20000:
            who = _scenario(len(out) + 3)
            out.append(Variant(
                q=(f"Calculate the weight of a {dec_str(m)} kg {who}. "
                   f"Take g = 10 m/s2."),
                a=_fmt_quantity(w10, "N"), tier="easy",
                formula="W = m g", unit="N",
                steps=["W = m g",
                       f"W = {dec_str(m)} x 10",
                       f"W = {dec_str(w10)} N"]))
        w98 = m * Fraction(98, 10)
        if _ok(w98) and w98 <= 20000:
            who = _scenario(len(out) + 5)
            out.append(Variant(
                q=(f"The mass of a {who} is {dec_str(m)} kg. Find its "
                   f"weight on the Earth (g = 9.8 m/s2)."),
                a=_fmt_quantity(w98, "N"), tier="easy",
                formula="W = m g", unit="N",
                steps=["W = m g",
                       f"W = {dec_str(m)} x 9.8",
                       f"W = {dec_str(w98)} N"]))
    return out


def _momentum() -> List[Variant]:
    """1-D conservation: (m1 u1 + m2 u2) = (m1 + m2) v, objects move
    together; plus a recoil variant."""
    out: List[Variant] = []
    ms = [Fraction(x) for x in (1, 2, 3, 4, 5, 6, 8, 10)]
    us = [Fraction(x) for x in range(0, 13, 2)]
    for m1 in ms:
        for m2 in ms:
            if m1 == m2:
                continue
            for u1 in us:
                for u2 in us:
                    if u2 >= u1:
                        continue     # keep the chasing picture realistic
                    total = m1 * u1 + m2 * u2
                    v = total / (m1 + m2)
                    if not _ok(v):
                        continue
                    a_obj, b_obj = _pick(("trolley", "wagon"),
                                         len(out)), _pick(
                        ("wagon", "cart"), len(out) + 1)
                    tier = "easy" if v.denominator == 1 else "grade"
                    out.append(Variant(
                        q=(f"A {dec_str(m1)} kg {a_obj} moving at "
                           f"{dec_str(u1)} m/s collides with a "
                           f"{dec_str(m2)} kg {b_obj} moving in the same "
                           f"direction at {dec_str(u2)} m/s. After the "
                           f"collision they move together. What is "
                           f"their common velocity?"),
                        a=_fmt_quantity(v, "m/s"), tier=tier,
                        formula="m1 u1 + m2 u2 = (m1 + m2) v",
                        unit="m/s",
                        steps=[f"Total momentum before = "
                               f"{dec_str(m1)} x {dec_str(u1)} + "
                               f"{dec_str(m2)} x {dec_str(u2)} = "
                               f"{dec_str(total)} kg m/s",
                               f"v = {dec_str(total)} / "
                               f"({dec_str(m1)} + {dec_str(m2)})",
                               f"v = {dec_str(v)} m/s"]))
    # recoil: gun of mass M fires bullet m at speed vb, gun recoils at
    # v = -m vb / M; ask for magnitude
    gm = [Fraction(x) for x in (2, 4, 5, 8, 10, 20)]
    bm = [Fraction(x, 100) for x in (10, 20, 25, 50, 100)]
    vb = [Fraction(x) for x in (50, 100, 150, 200, 400)]
    for g_ in gm:
        for b in bm:
            for v_ in vb:
                vr = b * v_ / g_
                if not _ok(vr) or vr >= v_:
                    continue
                out.append(Variant(
                    q=(f"A {dec_str(g_)} kg gun fires a "
                       f"{dec_str(b * 1000)} g bullet with a velocity of "
                       f"{dec_str(v_)} m/s. With what velocity does the "
                       f"gun recoil?"),
                    a=_fmt_quantity(vr, "m/s"), tier="grade",
                    formula="m1 u1 + m2 u2 = (m1 + m2) v (recoil)",
                    unit="m/s",
                    steps=[f"Momentum of bullet = {dec_str(b)} x "
                           f"{dec_str(v_)} = {dec_str(b * v_)} kg m/s",
                           f"Recoil velocity = {dec_str(b * v_)} / "
                           f"{dec_str(g_)}",
                           f"v = {dec_str(vr)} m/s (opposite to the "
                           f"bullet)"]))
    return out


def _lens_mirror() -> List[Variant]:
    """Image distance via 1/f = 1/v + 1/u (mirror, real-is-positive)
    and 1/v - 1/u = 1/f (lens, Cartesian u negative), power of a lens
    P = 1/f, and mirror magnification m = -v/u."""
    out: List[Variant] = []
    fs = [Fraction(x) for x in (5, 10, 12, 15, 20, 24, 25, 30)]
    objs = [Fraction(x) for x in (15, 20, 25, 30, 36, 40, 45, 50, 60,
                                  75, 90, 100, 120)]
    for f in fs:
        for m_dist in objs:
            if m_dist <= f:
                continue
            # concave mirror, real-is-positive: v = f u / (u - f)
            v = f * m_dist / (m_dist - f)
            if not _ok(v) or v <= 0 or v > 600:
                continue
            out.append(Variant(
                q=(f"An object is placed {dec_str(m_dist)} cm from the "
                   f"pole of a concave mirror of focal length "
                   f"{dec_str(f)} cm. Using 1/v + 1/u = 1/f with the "
                   f"real-is-positive convention, find the image "
                   f"distance."),
                a=_fmt_quantity(v, "cm"), tier="grade",
                formula="1/v + 1/u = 1/f", unit="cm",
                steps=["1/v = 1/f - 1/u",
                       f"1/v = 1/{dec_str(f)} - 1/{dec_str(m_dist)}",
                       f"v = {dec_str(v)} cm"]))
            # convex lens, Cartesian: u = -m, v = f m / (m - f)
            vl = f * m_dist / (m_dist - f)
            if _ok(vl) and 0 < vl <= 600:
                out.append(Variant(
                    q=(f"An object is placed {dec_str(m_dist)} cm from a "
                       f"convex lens of focal length {dec_str(f)} cm "
                       f"(u = -{dec_str(m_dist)} cm). Using "
                       f"1/v - 1/u = 1/f, find the image distance v."),
                    a=_fmt_quantity(vl, "cm"), tier="grade",
                    formula="1/v - 1/u = 1/f", unit="cm",
                    steps=["1/v = 1/f + 1/u",
                           f"1/v = 1/{dec_str(f)} - 1/{dec_str(m_dist)}",
                           f"v = +{dec_str(vl)} cm"]))
        # power of a lens from f (cm): P = 100 / f dioptres
        p = Fraction(100) / f
        if _ok(p):
            out.append(Variant(
                q=(f"A convex lens has a focal length of {dec_str(f)} "
                   f"cm. Calculate its power in dioptres."),
                a=_fmt_quantity(p, "D"), tier="easy",
                formula="P = 1/f (f in metres)", unit="D",
                steps=[f"f = {dec_str(f)} cm = {dec_str(f / 100)} m",
                       "P = 1 / f",
                       f"P = {dec_str(p)} D"]))
    # magnification of mirrors: m = -v/u, given f and u
    for f in fs:
        for m_dist in objs:
            if m_dist <= f:
                continue
            v = f * m_dist / (m_dist - f)
            mag = -v / m_dist
            if not _ok(mag) or mag <= -20:
                continue
            out.append(Variant(
                q=(f"A concave mirror of focal length {dec_str(f)} cm "
                   f"forms a real image of an object placed "
                   f"{dec_str(m_dist)} cm in front of it. Find the "
                   f"magnification (m = -v/u)."),
                a=_fmt_quantity(mag, ""), tier="hard",
                formula="1/v + 1/u = 1/f; m = -v/u", unit="",
                steps=[f"1/v = 1/{dec_str(f)} - 1/{dec_str(m_dist)} gives "
                       f"v = {dec_str(v)} cm",
                       f"m = -v/u = -{dec_str(v)}/{dec_str(m_dist)}",
                       f"m = {dec_str(mag)} (real, inverted image)"]))
    return out


# --------------------------------------------------------------------- #
# CHEMISTRY families
# --------------------------------------------------------------------- #
# (name, formula, Mr) -- Mr values carry at most one decimal place
_COMPOUNDS = [
    ("water", "H2O", Fraction(18)),
    ("carbon dioxide", "CO2", Fraction(44)),
    ("sodium chloride", "NaCl", Fraction(117, 2)),
    ("sulphuric acid", "H2SO4", Fraction(98)),
    ("oxygen gas", "O2", Fraction(32)),
    ("nitrogen gas", "N2", Fraction(28)),
    ("methane", "CH4", Fraction(16)),
    ("calcium carbonate", "CaCO3", Fraction(100)),
    ("sodium hydroxide", "NaOH", Fraction(40)),
    ("hydrochloric acid", "HCl", Fraction(73, 2)),
    ("ammonia", "NH3", Fraction(17)),
    ("calcium oxide", "CaO", Fraction(56)),
    ("magnesium oxide", "MgO", Fraction(40)),
    ("ferric oxide", "Fe2O3", Fraction(160)),
    ("copper sulphate", "CuSO4", Fraction(160)),
    ("glucose", "C6H12O6", Fraction(180)),
    ("urea", "CO(NH2)2", Fraction(60)),
    ("nitric acid", "HNO3", Fraction(63)),
]

# (element, compound index, element mass in one Mr) -- only pairs whose
# mass fraction TERMINATES are admitted to the bank
_PERCENT_PAIRS: List[Tuple[str, int, Fraction]] = []
for _i, (_nm, _f, _mr) in enumerate(_COMPOUNDS):
    _elem_masses = {
        "H2O": [("hydrogen", Fraction(2)), ("oxygen", Fraction(16))],
        "CO2": [("oxygen", Fraction(32))],
        "NaCl": [("sodium", Fraction(23)), ("chlorine", Fraction(713, 2))],
        "H2SO4": [("hydrogen", Fraction(2)), ("oxygen", Fraction(64)),
                  ("sulphur", Fraction(32))],
        "O2": [("oxygen", Fraction(32))],
        "N2": [("nitrogen", Fraction(28))],
        "CH4": [("carbon", Fraction(12)), ("hydrogen", Fraction(4))],
        "CaCO3": [("calcium", Fraction(40)), ("carbon", Fraction(12)),
                  ("oxygen", Fraction(48))],
        "NaOH": [("sodium", Fraction(23)), ("oxygen", Fraction(16))],
        "HCl": [("chlorine", Fraction(71, 2))],
        "NH3": [("nitrogen", Fraction(14))],
        "CaO": [("calcium", Fraction(40)), ("oxygen", Fraction(16))],
        "MgO": [("magnesium", Fraction(24)), ("oxygen", Fraction(16))],
        "Fe2O3": [("iron", Fraction(112)), ("oxygen", Fraction(48))],
        "CuSO4": [("copper", Fraction(64)), ("oxygen", Fraction(64))],
        "C6H12O6": [("carbon", Fraction(72))],
        "CO(NH2)2": [("nitrogen", Fraction(28)),
                     ("oxygen", Fraction(16))],
        "HNO3": [("nitrogen", Fraction(14)), ("oxygen", Fraction(48))],
    }.get(_f, [])
    for _el, _em in _elem_masses:
        _frac = _em / _mr
        if _ok(_frac * 100):
            _PERCENT_PAIRS.append((_el, _i, _frac))
_i = None    # noqa:  keep module namespace clean
_nm = _f = _mr = _el = _em = _frac = None


def _moles_mass() -> List[Variant]:
    """n = m / Mr both directions over common compounds."""
    out: List[Variant] = []
    ns = [Fraction(1, 4), Fraction(1, 2), Fraction(3, 4), Fraction(1),
          Fraction(3, 2), Fraction(2), Fraction(5, 2), Fraction(3),
          Fraction(4), Fraction(5), Fraction(6), Fraction(8), Fraction(10)]
    for ci, (name, formula, mr) in enumerate(_COMPOUNDS):
        for n in ns:
            mass = mr * n
            if mass > 2000 or not _ok(mass):
                continue
            ctx = _pick(_CHEM_CONTEXTS, ci + len(out))
            out.append(Variant(
                q=(f"Calculate the number of moles in {dec_str(mass)} g "
                   f"of {name} ({formula}; molar mass = "
                   f"{dec_str(mr)} g/mol)."),
                a=_fmt_quantity(n, "mol"), tier="easy",
                formula="n = m / M", unit="mol",
                steps=["n = m / M",
                       f"n = {dec_str(mass)} / {dec_str(mr)}",
                       f"n = {dec_str(n)} mol"]))
            out.append(Variant(
                q=(f"What mass of {name} ({formula}; molar mass = "
                   f"{dec_str(mr)} g/mol) must be taken to obtain "
                   f"{dec_str(n)} mol? A {ctx} needs this amount."),
                a=_fmt_quantity(mass, "g"), tier="easy",
                formula="m = n x M", unit="g",
                steps=["m = n x M",
                       f"m = {dec_str(n)} x {dec_str(mr)}",
                       f"m = {dec_str(mass)} g"]))
    return out


def _molarity() -> List[Variant]:
    """M = n / V(L), incl. mL conversions and a mass-first 2-step."""
    out: List[Variant] = []
    ns = [Fraction(1, 4), Fraction(1, 2), Fraction(3, 4), Fraction(1),
          Fraction(3, 2), Fraction(2), Fraction(5, 2), Fraction(3),
          Fraction(4)]
    vols_l = [Fraction(1, 4), Fraction(1, 2), Fraction(3, 4), Fraction(1),
              Fraction(3, 2), Fraction(2), Fraction(5, 2), Fraction(4),
              Fraction(5)]
    for ci, (name, formula, mr) in enumerate(_COMPOUNDS[:10]):
        for n in ns:
            for v in vols_l:
                molarity = n / v
                if molarity > 6 or not _ok(molarity):
                    continue
                mass = mr * n
                if not _ok(mass) or mass > 1000:
                    continue
                vm = v * 1000
                out.append(Variant(
                    q=(f"{dec_str(n)} mol of {name} ({formula}) is "
                       f"dissolved in water to make {dec_str(v)} L of "
                       f"solution. What is the molarity of the "
                       f"solution?"),
                    a=_fmt_quantity(molarity, "mol/L"), tier="easy",
                    formula="M = n / V(L)", unit="mol/L",
                    steps=["M = n / V",
                           f"M = {dec_str(n)} / {dec_str(v)}",
                           f"M = {dec_str(molarity)} mol/L"]))
                if vm.denominator == 1:
                    out.append(Variant(
                        q=(f"{dec_str(mass)} g of {name} ({formula}; "
                           f"molar mass = {dec_str(mr)} g/mol) is "
                           f"dissolved to make {dec_str(vm)} mL of "
                           f"solution. Calculate the molarity."),
                        a=_fmt_quantity(molarity, "mol/L"), tier="hard",
                        formula="n = m/M; M = n / V(L)", unit="mol/L",
                        steps=[f"n = {dec_str(mass)} / {dec_str(mr)} = "
                               f"{dec_str(n)} mol",
                               f"V = {dec_str(vm)} mL = "
                               f"{dec_str(v)} L",
                               f"M = {dec_str(n)} / {dec_str(v)} = "
                               f"{dec_str(molarity)} mol/L"]))
    return out


def _percent_comp() -> List[Variant]:
    """Percentage composition and mass-of-element-in-sample, restricted
    to (element, compound) pairs whose percentage terminates."""
    out: List[Variant] = []
    samples = [Fraction(x) for x in
               (10, 20, 25, 40, 50, 60, 80, 100, 120, 150, 200, 250,
                300, 400, 500)]
    for el, ci, frac in _PERCENT_PAIRS:
        name, formula, mr = _COMPOUNDS[ci]
        pct = frac * 100
        out.append(Variant(
            q=(f"Calculate the percentage by mass of {el} in {name} "
               f"({formula}; molar mass = {dec_str(mr)} g/mol)."),
            a=_fmt_quantity(pct, "%"), tier="grade",
            formula="% element = (element mass / M) x 100", unit="%",
            steps=[f"Mass of {el} in one mole = {dec_str(frac * mr)} g",
                   f"% {el} = ({dec_str(frac * mr)} / {dec_str(mr)}) "
                   f"x 100",
                   f"% {el} = {dec_str(pct)}%"]))
        for s in samples:
            m_el = s * frac
            if m_el > 1000 or not _ok(m_el):
                continue
            out.append(Variant(
                q=(f"How many grams of {el} are present in "
                   f"{dec_str(s)} g of {name} ({formula})?"),
                a=_fmt_quantity(m_el, "g"), tier="grade",
                formula="mass element = sample x (%/100)", unit="g",
                steps=[f"% {el} in {formula} = {dec_str(pct)}%",
                       f"mass = {dec_str(s)} x "
                       f"{dec_str(pct)} / 100",
                       f"mass = {dec_str(m_el)} g"]))
    return out


def _gas_laws() -> List[Variant]:
    """Boyle (P1 V1 = P2 V2, T fixed) and Charles (V1/T1 = V2/T2, P
    fixed)."""
    out: List[Variant] = []
    ps = [Fraction(x, 2) for x in range(2, 13)]       # 1 .. 6 atm
    vols = [Fraction(x) for x in (2, 4, 5, 6, 8, 10, 12, 15, 20, 25,
                                  30, 40, 50, 60)]
    for p1 in ps:
        for v1 in vols:
            pv = p1 * v1
            for p2 in ps:
                if p2 == p1:
                    continue
                v2 = pv / p2
                if v2 > 120 or not _ok(v2):
                    continue
                tier = "easy" if v2.denominator == 1 else "grade"
                out.append(Variant(
                    q=(f"A gas occupies {dec_str(v1)} L at "
                       f"{dec_str(p1)} atm pressure. Keeping the "
                       f"temperature constant, the pressure is changed "
                       f"to {dec_str(p2)} atm. What is the new volume of "
                       f"the gas?"),
                    a=_fmt_quantity(v2, "L"), tier=tier,
                    formula="P1 V1 = P2 V2 (T constant)", unit="L",
                    steps=["P1 V1 = P2 V2",
                           f"{dec_str(p1)} x {dec_str(v1)} = "
                           f"{dec_str(p2)} x V2",
                           f"V2 = {dec_str(v2)} L"]))
    # Charles: V1 / T1 = V2 / T2
    t1s = [Fraction(x) for x in range(200, 401, 25)]
    t2s = [Fraction(x) for x in range(250, 451, 25)]
    cvols = [Fraction(x) for x in (200, 250, 300, 400, 500, 600)]
    for v1 in cvols:
        for t1 in t1s:
            for t2 in t2s:
                if t1 == t2:
                    continue
                v2 = v1 * t2 / t1
                if v2 > 1500 or not _ok(v2):
                    continue
                tier = "easy" if v2.denominator == 1 else "grade"
                out.append(Variant(
                    q=(f"A sample of gas occupies {dec_str(v1)} mL at "
                       f"{dec_str(t1)} K. At constant pressure it is "
                       f"heated to {dec_str(t2)} K. What is its new "
                       f"volume?"),
                    a=_fmt_quantity(v2, "mL"), tier=tier,
                    formula="V1/T1 = V2/T2 (P constant)", unit="mL",
                    steps=["V1 / T1 = V2 / T2",
                           f"V2 = {dec_str(v1)} x {dec_str(t2)} / "
                           f"{dec_str(t1)}",
                           f"V2 = {dec_str(v2)} mL"]))
    return out


def _charge_current() -> List[Variant]:
    """Q = I x t, three unknown-slots."""
    out: List[Variant] = []
    ims = [Fraction(x, 10) for x in range(5, 51, 5)]   # 0.5 .. 5 A
    ts = [Fraction(x) for x in range(5, 61, 5)]        # 5 .. 60 s
    for i in ims:
        for t in ts:
            q = i * t
            if q > 500 or not _ok(q):
                continue
            out.append(Variant(
                q=(f"A steady current of {dec_str(i)} A flows through a "
                   f"conductor for {dec_str(t)} s. How much charge "
                   f"passes through any section of the conductor?"),
                a=_fmt_quantity(q, "C"), tier="easy",
                formula="Q = I x t", unit="C",
                steps=["Q = I x t",
                       f"Q = {dec_str(i)} x {dec_str(t)}",
                       f"Q = {dec_str(q)} C"]))
            if i != 0:
                out.append(Variant(
                    q=(f"A charge of {dec_str(q)} C flows through a wire "
                       f"carrying a current of {dec_str(i)} A. For how "
                       f"long does the current flow?"),
                    a=_fmt_quantity(t, "s"), tier="grade",
                    formula="Q = I x t", unit="s",
                    steps=["t = Q / I",
                           f"t = {dec_str(q)} / {dec_str(i)}",
                           f"t = {dec_str(t)} s"]))
    return out


_ELECTRO = [
    # element, symbol, equivalent weight (E = M / valency)
    ("silver", "Ag", Fraction(108)),
    ("copper", "Cu", Fraction(127, 2)),
    ("zinc", "Zn", Fraction(65, 2)),
    ("aluminium", "Al", Fraction(9)),
]

_FRACS = [Fraction(1, 20), Fraction(1, 10), Fraction(1, 5), Fraction(1, 4),
          Fraction(1, 2), Fraction(1), Fraction(2)]


def _electrolysis() -> List[Variant]:
    """Deposits via equivalent weight: m = E Q / F; ask for t (grade)
    or m (hard)."""
    out: List[Variant] = []
    ims = [Fraction(x) for x in (1, 2, 5, 10)]
    for el, sym, eqw in _ELECTRO:
        for frac in _FRACS:
            m = eqw * frac
            if not _ok(m) or m > 250:
                continue
            for i in ims:
                t = m * _F / (eqw * i)
                if not _ok(t) or t <= 0 or t > 100000:
                    continue
                out.append(Variant(
                    q=(f"A current of {dec_str(i)} A is passed through a "
                       f"{sym} electrolytic cell. How long (in seconds) "
                       f"must it run to deposit {dec_str(m)} g of {el}? "
                       f"(Equivalent weight of {sym} = "
                       f"{dec_str(eqw)}, F = {_F} C/mol)."),
                    a=_fmt_quantity(t, "s"), tier="hard",
                    formula="m = E Q / F; Q = I t", unit="s",
                    steps=[f"Q = m F / E = {dec_str(m)} x {_F} / "
                           f"{dec_str(eqw)}",
                           f"Q = {dec_str(m * _F / eqw)} C",
                           f"t = Q / I = {dec_str(t)} s"]))
        # forward direction: deposit mass from a whole-Faraday charge
        for k in (Fraction(1, 100), Fraction(1, 50), Fraction(1, 25),
                  Fraction(1, 10)):
            m2 = eqw * k
            q = k * _F
            if not _ok(m2) or m2 <= 0:
                continue
            out.append(Variant(
                q=(f"A charge of {dec_str(q)} C is passed through a "
                   f"solution of a {sym} salt. What mass of {el} is "
                   f"deposited at the cathode? (Equivalent weight of "
                   f"{sym} = {dec_str(eqw)}, F = {_F} C/mol)."),
                a=_fmt_quantity(m2, "g"), tier="hard",
                formula="m = E Q / F", unit="g",
                steps=["m = E Q / F",
                       f"m = {dec_str(eqw)} x {dec_str(q)} / {_F}",
                       f"m = {dec_str(m2)} g"]))
    return out


def _ph() -> List[Variant]:
    """pH = -log10 C for strong acids/bases at power-of-ten
    concentrations only (so answers terminate); pOH route for bases."""
    out: List[Variant] = []
    acids = [("hydrochloric acid", "HCl"), ("nitric acid", "HNO3")]
    bases = [("sodium hydroxide", "NaOH"), ("potassium hydroxide", "KOH")]
    for k in range(1, 5):
        conc = Fraction(1, 10 ** k)
        cstr = dec_str(conc)                      # 0.1, 0.01, ...
        for name, formula in acids:
            out.append(Variant(
                q=(f"Calculate the pH of a {dec_str(cstr)} mol/L "
                   f"solution of {name} ({formula}), a strong acid that "
                   f"dissociates completely."),
                a=f"{k}", tier="easy", formula="pH = -log10[H+]",
                unit="",
                steps=[f"[H+] = {cstr} mol/L = 10^(-{k}) mol/L",
                       f"pH = -log10(10^(-{k}))",
                       f"pH = {k}"]))
            out.append(Variant(
                q=(f"The pH of a solution of {name} ({formula}) is "
                   f"{k}. What is the hydrogen ion concentration in "
                   f"mol/L?"),
                a=f"{cstr} mol/L", tier="grade",
                formula="[H+] = 10^(-pH)", unit="mol/L",
                steps=[f"[H+] = 10^(-pH) = 10^(-{k})",
                       f"[H+] = {cstr} mol/L"]))
        for name, formula in bases:
            poh = 14 - k
            out.append(Variant(
                q=(f"A {dec_str(cstr)} mol/L solution of {name} "
                   f"({formula}) is fully dissociated. Calculate its "
                   f"pH. (Kw = 1 x 10^-14)"),
                a=f"{poh}", tier="grade",
                formula="pOH = -log10[OH-]; pH = 14 - pOH", unit="",
                steps=[f"[OH-] = {cstr} mol/L so pOH = {k}",
                       f"pH = 14 - {k}",
                       f"pH = {poh}"]))
    return out


# ===================================================================== #
# family registry
# ===================================================================== #
class _Family:
    __slots__ = ("fid", "subject", "all", "by_tier", "matchers", "_whole")

    def __init__(self, fid: str, subject: str, builder, matchers):
        self.fid = fid
        self.subject = subject
        self.matchers = matchers          # list of regex (search, re.I)
        self.all: List[Variant] = []
        self.by_tier: Dict[str, List[int]] = {}
        self._whole: Optional[List[int]] = None
        try:
            self.all = builder() or []
        except Exception:                 # pragma: no cover - defensive
            self.all = []
        for idx, v in enumerate(self.all):
            self.by_tier.setdefault(v.tier, []).append(idx)


_FAMILIES: Dict[str, _Family] = {}
for _spec in (
    ("kin_v_at", "physics", _kin_v_at,
     [r"first equation of motion", r"\bv\s*=\s*u\s*\+\s*a\s*t\b"]),
    ("kin_s_ut", "physics", _kin_s_ut,
     [r"second equation of motion", r"s\s*=\s*u\s*t\s*\+"]),
    ("kin_v2", "physics", _kin_v2,
     [r"third equation of motion", r"stopping distance",
      r"v\s*\^?2\s*=\s*u\s*\^?2", r"final_velocity\*\*2"]),
    ("ohm", "physics", _ohm,
     [r"ohm'?s law", r"voltage\s*=\s*current", r"potential\s*=\s*current"]),
    ("res_series", "physics", _res_series,
     [r"resistors? in series", r"series_res", r"series and parallel"]),
    ("res_parallel", "physics", _res_parallel,
     [r"resistors? in parallel", r"parallel"]),
    ("work_fd", "physics", _work_fd,
     [r"work done by a constant force", r"work\s*=\s*force",
      r"work-energy theorem"]),
    ("ke", "physics", _ke,
     [r"kinetic energy", r"ke\s*=", r"\(1/2\)\s*\*\s*mass"]),
    ("pe", "physics", _pe,
     [r"gravitational potential energy", r"pe\s*=\s*mass",
      r"potential energy"]),
    ("force_ma", "physics", _force_ma,
     [r"newton'?s second law", r"force\s*=\s*mass", r"\bf\s*=\s*m\s*a\b",
      r"weight"]),
    ("momentum", "physics", _momentum,
     [r"conservation of momentum", r"linear momentum",
      r"m1\s*\*\s*u1"]),
    ("lens_mirror", "physics", _lens_mirror,
     [r"mirror formula", r"lens formula", r"magnification",
      r"power of a lens", r"focal length"]),
    ("moles_mass", "chemistry", _moles_mass,
     [r"mole concept", r"moles\s*=\s*mass", r"molar mass"]),
    ("molarity", "chemistry", _molarity,
     [r"molarity", r"concentration terms", r"moles_solute"]),
    ("percent_comp", "chemistry", _percent_comp,
     [r"percentage composition", r"mass percent", r"percent_element"]),
    ("gas_laws", "chemistry", _gas_laws,
     [r"boyle", r"charles", r"gas law"]),
    ("charge_current", "physics", _charge_current,
     [r"current\s*=\s*charge", r"electric current and charge",
      r"charge\s*/\s*time"]),
    ("electrolysis", "chemistry", _electrolysis,
     [r"electrolys", r"faraday", r"deposit", r"electroplat",
      r"equivalent weight"]),
    ("ph", "chemistry", _ph,
     [r"\bpH\b"]),
):
    _FAMILIES[_spec[0]] = _Family(_spec[0], _spec[1], _spec[2], _spec[3])
_i = _spec = None

# concepts whose titles mention series AND parallel draw from both
# resistor families; selection happens in match_families


def match_families(concept_id: str, title: str,
                   formula: str) -> List[str]:
    """The family ids whose templates fit this concept.  Keyword match
    on the title and formula identity first, then a chemistry/
    physics prefix heuristic as a weak fallback.  No match -> [] (the
    tutor keeps serving pool items; fail-open)."""
    hay = " ".join((str(title or ""), str(formula or ""))).lower()
    cid = str(concept_id or "").lower()
    hits: List[str] = []
    for fid, fam in _FAMILIES.items():
        if any(re.search(p, hay, re.I) for p in fam.matchers):
            hits.append(fid)
    if hits:
        # a "series and parallel" concept gets both resistor families
        return hits
    # weak fallback: id-prefix physics/chemistry concepts with a
    # numeric formula identity but no title hit are left alone -- a
    # mismatched family would serve off-concept questions, so keep []
    if cid.startswith(("jech.", "kech.")):
        return []
    return []


def _tier_space(fam: _Family, tier_pref: Optional[str]) -> List[int]:
    """Variant indices for the requested tier (falls back to the whole
    space when the tier has no variants).  The whole-space list is
    cached -- draw() runs once per serve."""
    if tier_pref in ("easy", "grade", "hard"):
        idxs = fam.by_tier.get(tier_pref) or []
        if idxs:
            return idxs
    if fam._whole is None:
        fam._whole = list(range(len(fam.all)))
    return fam._whole


def draw(family_id: str, student_id: str, concept_id: str,
         serve_count: int, tier_pref: Optional[str] = None) -> Variant:
    """The deterministic variant for this serve.

    Seeded by sha256 of (student_id, concept_id, family, tier); the
    serve_count walks an affine BIJECTION of the (tier-filtered) variant
    space, so no repeat can occur before the space itself is exhausted.
    Pure integer arithmetic -- identical on every interpreter."""
    fam = _FAMILIES.get(family_id)
    if fam is None or not fam.all:
        raise KeyError(family_id)
    space = _tier_space(fam, tier_pref)
    seed = "\x1f".join((str(student_id), str(concept_id), family_id,
                        tier_pref or ""))
    idx = space[_draw_index(seed, serve_count, len(space))]
    return fam.all[idx]


def consult(concept_id: str, title: str, formula: str,
            student_id: str, serve_count: int,
            tier_pref: Optional[str] = None) -> Optional[dict]:
    """The tutor's serve-path hook.

    Returns a pool-item-shaped dict {"q", "a", "steps", "tier",
    "formula", "family", "gen": True} for a fresh numerical, or None
    when the concept matches no family (or anything at all goes wrong)
    -- the caller then serves from the static pool as usual.  Fail-open
    by construction."""
    try:
        fams = match_families(concept_id, title, formula)
        if not fams:
            return None
        # deterministic pick among the matching families
        pick = _draw_index(
            "\x1f".join((str(student_id), str(concept_id), "family")),
            serve_count, len(fams))
        fid = fams[pick]
        v = draw(fid, student_id, concept_id, serve_count, tier_pref)
        return {
            "q": v.q,
            "a": v.a,
            "steps": list(v.steps),
            "tier": v.tier,
            "formula": v.formula,
            "family": fid,
            "unit": v.unit,
            "gen": True,
        }
    except Exception:
        return None


def family_stats() -> dict:
    """Variant-space report: family -> {subject, size, by_tier}."""
    return {fid: {
        "subject": fam.subject,
        "size": len(fam.all),
        "by_tier": {t: len(v) for t, v in sorted(fam.by_tier.items())},
    } for fid, fam in sorted(_FAMILIES.items())}
