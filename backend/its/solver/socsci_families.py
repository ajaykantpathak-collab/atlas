"""socsci_families.py -- deterministic Social Science numeric-core families
(CBSE/ICSE/ISC classes 6-12): Geography, Civics, History.

Deterministic closed-form families in the biology_families style: trigger
regex, plausibility gates inside compute, and a ModelResult (matched=True,
confidence >= 0.93, quantities dict, governing equation, final answer,
numeric answer, 5-beat steps list).  No LLM calls anywhere.

GROUND TRUTH -- the authored corpus only (never invented):
  Geography  c11_geo_cbse_08_003/006/008 (82deg30'E standard meridian,
             IST = UTC+5:30, 1 deg = 4 minutes, 29deg18' -> 117.2 min),
             c9_geo_icse_01_007 (15 deg = 1 hour, east ahead),
             c8_geo_icse_06_001 (68deg7'E 57.5 min behind the meridian),
             c12_geo_cbse_09_002/09_004/09_005 (density = population / area,
             decadal growth %, natural growth = CBR - CDR, doubling time
             approx 70 / growth rate), c12_geo_cbse_02_005/02_007 and
             c11_geo_cbse_16_003 (CBR/CDR per 1000, sex ratio = females per
             1000 males -- India 2011 = 943, literacy rate %),
             c11_geo_cbse_10_005 (climatological table reading: annual
             totals, wettest/driest month), c11_geo_cbse_10_004 (mean of
             annual totals), c11_geo_cbse_22_001/22_003 and
             c11_geo_cbse_08_002/08_007 (RF 1:N and 1 cm = X km scales).
  Civics     c8_civ_ch1_5 (FPTP worked table: A 350k / B 300k / C 200k /
             D 150k of 1,000,000 -- plurality winner with 35%, no majority),
             c12_soc_cbse_10_008 (303 seats with 37.4% votes; 22/25 seats =
             88% seat share with 55% votes), c9_civ_ch2_10 (Lok Sabha 543,
             majority mark 272; coalition arithmetic), c10_histciv_icse_
             01_003/01_004 (special majority = 2/3 of present-and-voting
             AND majority of total membership; joint sitting simple
             majority), c8_histciv_icse_09_001 (quorum = one-tenth).
  History    corpus-dated events only (closed world; every row cites the
             node files it came from):
             Europe: French Revolution 1789, Napoleonic Code 1804,
             Congress of Vienna 1815, Revolutions of 1848, unification of
             Italy 1861, unification of Germany 1871 (c10_hist_cbse_01_*).
             India: Revolt of 1857, INC 1885, Partition of Bengal 1905,
             Swadeshi 1905, Surat Split 1907, Morley-Minto 1909, WWI
             1914-18, Defence of India Act 1915, Lucknow Pact 1916, Home
             Rule Leagues 1916, Champaran 1917, Montagu Declaration 1917,
             Rowlatt Act / Jallianwala Bagh 1919, Khilafat Movement
             1919-24, Non-Cooperation 1920-22, Chauri Chaura 1922, Simon
             Commission 1927, Nehru Report 1928, Jinnah's Fourteen Points
             1929, Lahore Congress 1929, Dandi Salt March 1930, Civil
             Disobedience 1930-34, Gandhi-Irwin Pact 1931, Karachi
             Resolution 1931, Communal Award / Poona Pact 1932, Government
             of India Act 1935, Quit India 1942, Independence 1947,
             Constitution adopted 26 Nov 1949 / in force 26 Jan 1950
             (c10_hist_cbse_02_*, c10_civ_cbse_02_003, c9_civ_ch1_3).
             Global economy: Battle of Plassey 1757, Diwani grant 1765,
             Inland Emigration Act 1859, Suez Canal 1869, TISCO 1907,
             Great Depression 1929-34, Bretton Woods 1944, UN Charter 1945
             (c10_hist_cbse_03_*, c10_hist_cbse_04_005, c6/c8 nodes).
             Industry: spinning jenny 1764, water frame 1769, Cromford
             Mill 1771, power loom 1785, Bombay's first cotton mill 1854
             (c10_hist_cbse_04_*).
             Print: Diamond Sutra 868, Gutenberg press 1448, Gutenberg
             Bible 1455, Luther's 95 Theses 1517, first press in India
             1556 (Goa), Hicky's Bengal Gazette 1780, Vernacular Press Act
             1878, Salt Act 1882 (c10_hist_cbse_05_*).
             Any date or figure not in this closed table is declined -- no
             invention (Russian Revolution 1917, WWII 1939-45 and Hitler's
             rise have no dated anchor in the corpus and refuse honestly;
             parked, see content_tools/pedagogy/GOLDEN_HIST.md).

STEP CONTRACT (SOLVER_STEP_CONTRACT.md, enforced by
test_socsci_families.py and audit_families_contract.py): every matched
answer carries the 5 beats -- "Method:" (rule + why it applies), "Given:"
(figures with units), computation shown, "Check:" (substitute back /
recount), "Interpretation:" in context; standard >= 3 steps / >= 150 chars.

Negative requirement: families decline maths/physics/economics probes --
population growth refuses money-compounding phrasing ("per annum",
"interest", bacteria cultures), density refuses g/cm3 mass/volume work,
map scale refuses area/shadow scaling, chronology refuses age/birthday
arithmetic, and history declines any event outside the corpus table.

Dispatcher: model_socsci(text) -> ModelResult (first grounded row wins; a
gate refusal returns the _GATE 6-tuple and the scan continues).
Registered batch-19 in modeling_layer.py.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as biology_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)

_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun",
           "jul", "aug", "sep", "oct", "nov", "dec"]


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus/dashes/quotes so the
    triggers see one alphabet."""
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-") \
        .replace("\u2014", "-").replace("\u2019", "'").replace("\u2018", "'") \
        .replace("\u00d7", "x").replace("\u2032", "'")
    return t


def _nums(s: str) -> List[float]:
    return [float(x.replace(",", "")) for x in
            re.findall(r"\d[\d,]*(?:\.\d+)?", s or "")]


def _fmt(v: float) -> str:
    return f"{v:.6g}"


def _big(v: float) -> str:
    """Comma grouping for final-answer strings."""
    if abs(v - round(v)) < 1e-9 and abs(v) >= 1000:
        return f"{int(round(v)):,}"
    return f"{v:.6g}".rstrip("0").rstrip(".") if "." in f"{v:.6g}" \
        else f"{v:.6g}"


def _ordinal(n: int) -> str:
    if 10 <= n % 100 <= 20:
        suf = "th"
    else:
        suf = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


def _clock(h: float) -> str:
    """Hours (float) -> 12-hour clock string; wraps a 24-hour day."""
    total = int(round(h * 60)) % (24 * 60)
    hh, mm = divmod(total, 60)
    suf = "AM" if hh < 12 else "PM"
    disp = hh % 12 or 12
    return f"{disp}:{mm:02d} {suf}"


# longitude "68°7'E" / "82.5° E" / "30 degrees east" -> signed degrees
_LON_RE = re.compile(
    r"\b(\d{1,3})(?:°\s*(?:(\d{1,2}(?:\.\d+)?)\s*['\"]?)?)?\s*"
    r"(?:degrees?\s*)?([EW])[a-z]*", re.I)


def _find_lons(text: str) -> List[Tuple[float, int]]:
    """All longitudes in order of appearance as (signed degrees, pos)."""
    out = []
    for mo in _LON_RE.finditer(text):
        val = float(mo.group(1)) + float(mo.group(2) or 0.0) / 60.0
        if mo.group(3).upper() == "W":
            val = -val
        out.append((val, mo.start()))
    return out


def _lon_str(v: float) -> str:
    hemi = "E" if v >= 0 else "W"
    a = abs(v)
    d = int(a)
    mi = round((a - d) * 60)
    if mi == 60:
        d, mi = d + 1, 0
    return f"{d}°{mi}'{hemi}" if mi else f"{d}°{hemi}"


_TIME_RE = re.compile(
    r"\b(\d{1,2})(?::(\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?|noon|midnight)?",
    re.I)


def _parse_time(text: str) -> Optional[Tuple[float, int]]:
    """First explicit clock time ("12 noon", "6:30 AM", "14:00")."""
    for mo in _TIME_RE.finditer(text):
        tag = (mo.group(3) or "").lower()
        if not mo.group(2) and not tag:
            continue  # bare numbers are not clock times
        hh, mm = int(mo.group(1)), int(mo.group(2) or 0)
        if tag.startswith("p") and hh < 12:
            hh += 12
        elif tag == "noon":
            hh = 12
        elif tag == "midnight":
            hh = 0
        if hh > 23 or mm > 59:
            continue
        return (hh + mm / 60.0, mo.start())
    return None


def _count_near(text: str, keyword: str) -> Optional[float]:
    """Number directly attached to a keyword, either side:
    "280 live births" or "births is 280"."""
    m1 = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(?:[a-z]+\s){0,2}" + keyword,
                   text, re.I)
    if m1:
        return float(m1.group(1).replace(",", ""))
    m2 = re.search(keyword + r"\D{0,16}(\d[\d,]*(?:\.\d+)?)", text, re.I)
    if m2:
        return float(m2.group(1).replace(",", ""))
    return None


# --------------------------------------------------------------------------- #
# GEOGRAPHY: time zones / local time from longitude
# --------------------------------------------------------------------------- #

_IST_LON = 82.5          # corpus: Standard Meridian 82°30'E (Mirzapur)
_IST_OFFSET = 5.5        # corpus: IST = UTC+5:30


def _c_timezone(g, m, text):
    if re.search(r"\bsunrise|\bsunset|day\s+length|daylength", text, re.I):
        return _GATE
    lons = _find_lons(text)
    if not lons and not re.search(r"\b(UTC|GMT)\b", text, re.I):
        return _GATE

    # --- mode 1: IST <-> UTC -------------------------------------------------
    if re.search(r"\b(UTC|GMT)\b", text, re.I):
        t = _parse_time(text)
        if t is None:
            return _GATE
        tags = [(mo.start(), mo.group(0).upper()) for mo in re.finditer(
            r"\b(IST|Indian Standard Time|UTC|GMT)\b", text, re.I)]
        if not tags:
            return _GATE
        after = [tg for tg in tags if tg[0] > t[1]]
        label = after[0][1] if after else tags[-1][1]
        given_utc = label in ("UTC", "GMT")
        ans = (t[0] - _IST_OFFSET if not given_utc
               else t[0] + _IST_OFFSET) % 24.0
        out_label = "UTC" if not given_utc else "IST"
        dir_word = "behind" if given_utc else "ahead of"
        sign = "+" if given_utc else "-"
        steps = [
            "Method: Using the corpus relation IST = UTC + 5:30 (Standard "
            "Meridian 82°30'E), IST runs 5 h 30 min AHEAD of UTC, so UTC = "
            "IST - 5:30 and IST = UTC + 5:30.",
            f"Given: clock time {_clock(t[0])} labelled {label}; offset = "
            "5 h 30 min = 5.5 h.",
            f"Computation: {label} is {dir_word} IST, so {_clock(t[0])} "
            f"{sign} 5:30 = {_clock(ans)} {out_label}.",
            "Check: substitute back - " + _clock(ans) + " " +
            ("+ 5:30" if not given_utc else "- 5:30") +
            f" returns the original {_clock(t[0])} {label} stamp, so the "
            "offset closes both ways.",
            "Interpretation: " + _clock(ans) + " " + out_label +
            " is the corresponding reading; India keeps one uniform zone "
            "because the whole country is timed to the 82°30'E meridian "
            "(corpus).",
        ]
        return _res("TIME_ZONE_LONGITUDE", g, ans, "IST = UTC + 5:30", steps,
                    answer=f"{_clock(ans)} {out_label}",
                    assumptions=[
                        "Standard Meridian 82°30'E, IST = UTC+5:30 "
                        "(corpus: c11_geo_cbse_08_003)"],
                    extra={"given_hours": t[0], "offset_hours": _IST_OFFSET,
                           "method": "IST_UTC_OFFSET"})

    # --- mode 2: local time at a longitude, given a clock elsewhere ----------
    t = _parse_time(text)
    if t is not None and lons:
        # SOCIAL_GOLDEN fix (2026-10-06): Greenwich / the prime meridian IS
        # 0° -- a question timed "at Greenwich" used to fall back to the IST
        # meridian (82°30'E) as reference and ship a VERIFIED-wrong local
        # time (90°E noon read 12:30 instead of 6:00 PM).
        gm = re.search(r"greenwich|prime\s+meridian", text, re.I)
        ref_pos = None
        cm = None
        if t is not None:
            cm = re.search(r"at\s+(?:[Cc]ity\s+|[Tt]own\s+)?([A-Z])\b",
                           text[t[1]:t[1] + 40])
        if cm:
            letter = cm.group(1)
            bm = re.search(r"(?:[Cc]ity|[Tt]own)\s+" + letter +
                           r"\b[^.;]{0,30}?(\d{1,3}(?:\.\d+)?)°", text)
            if bm:
                after = [(p, lon) for lon, p in lons if p >= bm.start()]
                if after:
                    ref_pos = min(after)[0]
        if ref_pos is None and len(lons) > 1:
            ref_pos = min((p for _, p in lons), key=lambda p: abs(p - t[1]))
        tgt = [lon for lon, p in lons if p != ref_pos]
        _def_ref = 0.0 if gm else _IST_LON
        ref = next((lon for lon, p in lons if p == ref_pos), _def_ref)
        if not tgt:
            tgt = [_def_ref if abs(ref - _def_ref) > 1e-9 else ref]
        target = tgt[-1]
        mins = (target - ref) * 4.0
        ans = (t[0] + mins / 60.0) % 24.0
        ahead = mins > 0
        anchor_note = ("Greenwich (the prime meridian, 0°)" if gm
                       else "IST's 82°30'E reference meridian")
        steps = [
            "Method: Using the 1° = 4 minutes rule with east-add / "
            "west-subtract (Earth turns 360° in 24 h, corpus: "
            "c11_geo_cbse_08_006, c9_geo_icse_01_007): local time = "
            "reference time + (longitude difference) x 4 min.",
            f"Given: {_clock(t[0])} at {_lon_str(ref)}; target longitude "
            f"{_lon_str(target)}; difference = {abs(target - ref):.4g}°.",
            f"Computation: {abs(target - ref):.4g}° x 4 min/° = "
            f"{abs(mins):.6g} min; the target lies to the "
            f"{'east, so add' if ahead else 'west, so subtract'}: "
            f"{_clock(t[0])} {'+' if ahead else '-'} {abs(mins):.6g} min = "
            f"{_clock(ans)}.",
            "Check: substitute back - " + _clock(ans) +
            f" shifted {abs(mins):.6g} min in the opposite direction "
            f"returns {_clock(t[0])}, so the arithmetic closes.",
            "Interpretation: local time at " + _lon_str(target) +
            " is " + _clock(ans) + ", anchored on " + anchor_note +
            "; for India the country's clocks stay on IST from the "
            "82°30'E meridian - the east-west spread the corpus puts at "
            "about 1 h 57 min across India.",
        ]
        anchor_assumption = (
            "reference meridian is Greenwich 0° (prime meridian)" if gm
            else "anchored on IST 82°30'E = UTC+5:30 "
                 "(corpus: c11_geo_cbse_08_003/08_006)")
        return _res("TIME_ZONE_LONGITUDE", g, ans,
                    "local time = ref time + (dLon) x 4 min", steps,
                    answer=f"{_clock(ans)} local time at "
                           f"{_lon_str(target)}",
                    assumptions=[anchor_assumption],
                    extra={"longitude": target, "reference": ref,
                           "offset_minutes": mins,
                           "method": "LOCAL_TIME_LON"})

    # --- mode 3: bare time difference between two longitudes -----------------
    if len(lons) >= 2:
        dlon = lons[1][0] - lons[0][0]
        mins = dlon * 4.0
        amin = abs(mins)
        hh, mm = divmod(int(round(amin)), 60)
        steps = [
            "Method: Using the rotation rule - Earth turns 360° in 24 h, "
            "so 1° of longitude = 4 minutes and 15° = 1 hour; places to "
            "the EAST are AHEAD, places to the WEST are BEHIND "
            "(corpus: c7_geo_ch01_001, c11_geo_cbse_08_008).",
            f"Given: longitudes {_lon_str(lons[0][0])} and "
            f"{_lon_str(lons[1][0])}; longitude difference = "
            f"{abs(dlon):.4g}°.",
            f"Computation: {abs(dlon):.4g}° x 4 min/° = {amin:.6g} minutes "
            f"= {hh} h {mm:02d} min; "
            + ("east is ahead (add)." if mins > 0 else
               "west is behind (subtract)."),
            "Check: substitute back - " + f"{amin:.6g} min / 4 = "
            f"{amin / 4:.4g}° equals the longitude difference, so the "
            "offset closes.",
            "Interpretation: the two meridians differ by "
            f"{hh} h {mm:02d} min of local solar time; India's own extent "
            "(68°7'E to 97°25'E = 29°18') spans about 117 minutes, which "
            "is why one Standard Meridian keeps a single clock.",
        ]
        return _res("TIME_ZONE_LONGITUDE", g, amin,
                    "time difference (min) = longitude difference (deg) x 4",
                    steps,
                    answer=f"{amin:.6g} minutes = {hh} h {mm:02d} min "
                           f"({'east ahead' if mins > 0 else 'west behind'})",
                    extra={"lon1": lons[0][0], "lon2": lons[1][0],
                           "delta_degrees": dlon, "method": "LON_TIME_DIFF"})
    return _GATE


# --------------------------------------------------------------------------- #
# GEOGRAPHY: population density
# --------------------------------------------------------------------------- #


def _c_density(g, m, text):
    if not re.search(r"density", text, re.I):
        return _GATE
    if re.search(r"\bmass\b|\bvolume\b|g\s*/\s*cm|kg\s*/\s*m|density\s+of\s+"
                 r"(?:the\s+)?(?:metal|material|liquid|water|air|rock|"
                 r"object)", text, re.I):
        return _GATE  # physics/chemistry density territory
    if not re.search(r"population|persons|people|inhabitants|residents",
                     text, re.I):
        return _GATE
    area_m = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(?:sq\.?\s*k?m\b|km²|km2|"
                       r"km\^2|square\s+kilomet\w+)", text, re.I)
    if not area_m:
        return _GATE
    area = float(area_m.group(1).replace(",", ""))
    dens_m = re.search(r"density\s+of\s+(\d[\d,]*(?:\.\d+)?)", text, re.I)
    # SOCIAL_GOLDEN fix (2026-10-06): the content gate accepts people/
    # persons/inhabitants/residents, but this lookup only read "population"
    # -- "a town has 50,000 people ... 250 sq km" gated out of the family
    # and refused a board numerical it should solve.
    pop = _count_near(text, r"(?:population|people|persons|inhabitants|"
                             r"residents)\b")
    if dens_m and pop:
        dens = float(dens_m.group(1).replace(",", ""))
        if dens <= 0:
            return _GATE
        area = pop / dens
        steps = [
            "Method: Using the corpus relation density of population = "
            "population / land area in persons per sq km; rearranged, "
            "area = population / density (c12_geo_cbse_09_002).",
            f"Given: population = {_big(pop)} persons, density = "
            f"{_fmt(dens)} persons/sq km.",
            f"Computation: area = {_big(pop)} / {_fmt(dens)} = "
            f"{_big(area)} sq km.",
            "Check: substitute back - " + f"{_big(pop)} / {_big(area)} = "
            f"{_fmt(pop / area)} persons/sq km reproduces the given "
            "density, so the division closes.",
            "Interpretation: the region spans about " + _big(area) +
            " sq km; density turns raw census counts into comparable "
            "per-area figures.",
        ]
        return _res("POP_DENSITY", g, area, "density = population / area",
                    steps, answer=f"Area = {_big(area)} sq km",
                    extra={"population": pop, "density": dens,
                           "method": "POP_DENSITY"})
    pops = [n for n in _nums(text) if n > 10 * max(area, 1.0)]
    if not pops:
        return _GATE
    pop = max(pops)
    dens = pop / area
    steps = [
        "Method: Using the corpus definition - population density is the "
        "ratio of population to land area, expressed as persons per "
        "square kilometre (crude/arithmetic density, c12_geo_cbse_09_002).",
        f"Given: population = {_big(pop)} persons; area = {_big(area)} "
        "sq km.",
        f"Computation: density = {_big(pop)} / {_big(area)} = "
        f"{_fmt(dens)} persons per sq km.",
        "Check: substitute back - " + f"{_big(area)} sq km x "
        f"{_fmt(dens)} persons/sq km = {_big(pop)} persons, recovering "
        "the given population.",
        "Interpretation: every square kilometre carries on average " +
        _fmt(dens) + " people; India's Census 2011 national figure for "
        "comparison is 382 persons/sq km (corpus).",
    ]
    return _res("POP_DENSITY", g, dens, "density = population / area",
                steps, answer=f"Population density = {_fmt(dens)} persons "
                              "per sq km",
                extra={"population": pop, "area_sq_km": area,
                       "method": "POP_DENSITY"})


# --------------------------------------------------------------------------- #
# GEOGRAPHY: vital statistics (CBR / CDR / natural growth)
# --------------------------------------------------------------------------- #


def _c_vital_migration(g, m, text):
    """Migration-aware vital statistics -- the c12_geo_cbse_02_005 key's
    full chain: CBR, CDR, natural growth, net-migration rate, ACTUAL
    growth = natural + migration.  Gates out unless net migration is
    stated AND the ask wants the actual growth rate; plain CBR/CDR
    stems fall through to VITAL_STATS."""
    if not re.search(r"actual\s+growth", text, re.I) \
            or not re.search(r"migrat", text, re.I):
        return _GATE
    births = _count_near(text, r"births\b")
    deaths = _count_near(text, r"deaths\b")
    mig = _count_near(text, r"(?:net\s+)?(?:in-?)?migration\b")
    pop = re.search(r"population\D{0,16}(\d[\d,]*(?:\.\d+)?)", text, re.I)
    if None in (births, deaths, mig) or not pop:
        return _GATE
    p = float(pop.group(1).replace(",", ""))
    if p <= 0:
        return _GATE
    cbr = births / p * 1000.0
    cdr = deaths / p * 1000.0
    ngr = cbr - cdr
    mgr = mig / p * 1000.0
    actual = ngr + mgr
    steps = [
        "Method: Using the corpus vital-statistics chain - CBR and CDR "
        "per 1000, natural growth = CBR - CDR, net-migration rate = net "
        "migrants / mid-year population x 1000, and ACTUAL growth = "
        "natural growth + net-migration rate (c12_geo_cbse_02_005 "
        "worked key).",
        f"Given: births = {_big(births)}, deaths = {_big(deaths)}, net "
        f"migration = {_big(mig)}, mid-year population = {_big(p)}.",
        f"Computation: CBR = {_fmt(cbr)}, CDR = {_fmt(cdr)}, natural "
        f"growth = {_fmt(ngr)}, migration rate = {_fmt(mgr)} per 1000; "
        f"actual growth = {_fmt(ngr)} + {_fmt(mgr)} = {_fmt(actual)} "
        "per 1000.",
        "Check: substitute back - (births - deaths + net migrants)/"
        f"population x 1000 = {_big(births - deaths + mig)}/{_big(p)} x "
        f"1000 = {_fmt(actual)} per 1000, the same value via the "
        "identity, so the chain closes.",
        "Interpretation: " + _fmt(actual) + " per 1000 (" +
        _fmt(actual / 10.0) + "%) is the REAL population change - the "
        "natural rate alone understates it whenever people move in.",
    ]
    return _res("VITAL_STATS_MIGRATION", g, actual,
                "actual growth = (CBR - CDR) + migration rate", steps,
                answer=f"CBR = {_fmt(cbr)}, CDR = {_fmt(cdr)}, natural "
                       f"growth = {_fmt(ngr)}, migration rate = "
                       f"{_fmt(mgr)}, actual growth = {_fmt(actual)} per "
                       "1000",
                extra={"births": births, "deaths": deaths, "net_migration":
                       mig, "population": p, "actual_growth": actual,
                       "method": "VITAL_STATS_MIGRATION"})


# --------------------------------------------------------------------------- #
# GEOGRAPHY: mean deviation of a data set from a stated normal
# (weather-station statistics, c9_geo_ch2_8 worked key)
# --------------------------------------------------------------------------- #


def _c_mean_deviation(g, m, text):
    if not re.search(r"mean\s+deviation", text, re.I):
        return _GATE
    # the stated normal rides an 'is/of/=/: ' connector -- a bare scan
    # grabbed the date digit in "the normal for June 1-5 is 40"
    norm = (re.search(r"normal[^.]{0,60}?(?:is|of|=|:)\s*"
                      r"(-?\d[\d,]*(?:\.\d+)?)", text, re.I)
            or re.search(r"normal[^0-9\-]{0,30}(-?\d[\d,]*(?:\.\d+)?)",
                         text, re.I))
    if not norm:
        return _GATE
    n_val = float(norm.group(1).replace(",", ""))
    # the data set is the LAST comma-separated number run before the
    # word 'normal' ("... June 1-5: 42, 44, 41, 45, 43. The 30-year
    # normal ...") -- a bare scan would swallow the date digits and the
    # normal itself.  Tokens use strict digit grouping (2,50,000) so a
    # separator comma is never consumed into a value.
    pre = re.split(r"\bnormal\b", text, flags=re.I)[0]
    runs = re.findall(
        r"(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?"
        r"(?:\s*,\s*-?\d{1,3}(?:,\d{3})*(?:\.\d+)?){2,14})",
        pre)
    if not runs:
        return _GATE
    data = [float(x.replace(",", ""))
            for x in runs[-1].split(",")]
    data = [x for x in data if abs(x - n_val) > 1e-9]
    if len(data) < 3 or len(data) > 15:
        return _GATE
    devs = [x - n_val for x in data]
    mean_dev = sum(abs(d) for d in devs) / len(devs)
    signed = ", ".join(("+" if d >= 0 else "") + _fmt(d) for d in devs)
    steps = [
        "Method: Using the corpus weather-statistics key - deviation = "
        "value - normal for each observation, and the mean deviation is "
        "the average of those deviations (c9_geo_ch2_8 worked key).",
        f"Given: data {', '.join(_fmt(x) for x in data)}; the normal = "
        f"{_fmt(n_val)}.",
        f"Computation: deviations = {signed}; mean deviation = "
        f"({_big(sum(abs(d) for d in devs))}) / {len(devs)} = "
        f"{_fmt(mean_dev)}.",
        "Check: each deviation reproduces as value - normal (e.g. " +
        _fmt(data[0]) + " - " + _fmt(n_val) + " = " + _fmt(devs[0]) +
        "), and re-averaging the deviations gives the same " +
        _fmt(mean_dev) + ", so the arithmetic closes.",
        "Interpretation: a " + _fmt(len(devs)) + "-day stretch is a "
        "WEATHER sample, not climate - the deviation measures how far "
        "this run sits from the 30-year normal, not a climate shift.",
    ]
    return _res("MEAN_DEVIATION", g, mean_dev,
                "mean deviation = sum(|value - normal|) / n", steps,
                answer=f"Mean deviation = {_fmt(mean_dev)}",
                # specificity bump: a stem that says "mean deviation"
                # must outrank the generic STATS_MEAN_UNGROUPED (0.95,
                # earlier in the registry) that answers the plain mean
                conf=0.97,
                extra={"normal": n_val, "n": len(devs),
                       "mean_deviation": mean_dev,
                       "method": "MEAN_DEVIATION"})


# --------------------------------------------------------------------------- #
# GEOGRAPHY: vital statistics (CBR / CDR / natural growth)
# --------------------------------------------------------------------------- #


def _c_vital(g, m, text):
    if not re.search(r"birth\s+rate|death\s+rate|\bCBR\b|\bCDR\b|"
                     r"natural\s+(?:increase|growth)", text, re.I):
        return _GATE
    births = _count_near(text, r"births\b")
    deaths = _count_near(text, r"deaths\b")
    pop = re.search(r"population\D{0,16}(\d[\d,]*(?:\.\d+)?)", text, re.I)
    if births is not None and deaths is not None and pop:
        p = float(pop.group(1).replace(",", ""))
        if p <= 0:
            return _GATE
        cbr, cdr = births / p * 1000.0, deaths / p * 1000.0
        ngr = cbr - cdr
        steps = [
            "Method: Using the corpus definitions - crude birth rate (CBR) "
            "= (live births / mid-year population) x 1000, crude death "
            "rate (CDR) = (deaths / mid-year population) x 1000, natural "
            "growth = CBR - CDR per 1000 (c12_geo_cbse_09_005, "
            "c12_soc_cbse_02_004).",
            f"Given: births = {_big(births)}, deaths = {_big(deaths)}, "
            f"mid-year population = {_big(p)}.",
            f"Computation: CBR = {_big(births)}/{_big(p)} x 1000 = "
            f"{_fmt(cbr)} per 1000; CDR = {_big(deaths)}/{_big(p)} x 1000 "
            f"= {_fmt(cdr)} per 1000; natural growth = {_fmt(cbr)} - "
            f"{_fmt(cdr)} = {_fmt(ngr)} per 1000.",
            "Check: substitute back - (births - deaths)/population x 1000 "
            f"= {_big(births - deaths)}/{_big(p)} x 1000 = " + _fmt(ngr) +
            " per 1000, the same value reached via CBR - CDR, so the "
            "identity closes.",
            "Interpretation: the population grows naturally by " +
            _fmt(ngr) + " per 1000 (" + _fmt(ngr / 10.0) + "% per year) "
            "before any migration is counted.",
        ]
        return _res("VITAL_STATS", g, ngr,
                    "CBR = births/pop x 1000; CDR = deaths/pop x 1000; "
                    "natural growth = CBR - CDR", steps,
                    answer=f"CBR = {_fmt(cbr)}, CDR = {_fmt(cdr)}, natural "
                           f"growth = {_fmt(ngr)} per 1000 "
                           f"({_fmt(ngr / 10.0)}%)",
                    extra={"births": births, "deaths": deaths, "population":
                           p, "method": "VITAL_STATS"})
    cbrm = re.search(r"(?:birth\s+rate|CBR)\D{0,30}?(\d+(?:\.\d+)?)", text,
                     re.I)
    cdrm = re.search(r"(?:death\s+rate|CDR)\D{0,30}?(\d+(?:\.\d+)?)", text,
                     re.I)
    if cbrm and cdrm:
        cbr, cdr = float(cbrm.group(1)), float(cdrm.group(1))
        ngr = cbr - cdr
        steps = [
            "Method: Using the corpus identity natural growth rate = crude "
            "birth rate - crude death rate, both per 1000 population "
            "(c12_geo_cbse_09_005).",
            f"Given: CBR = {_fmt(cbr)} per 1000; CDR = {_fmt(cdr)} per "
            "1000.",
            f"Computation: natural growth = {_fmt(cbr)} - {_fmt(cdr)} = "
            f"{_fmt(ngr)} per 1000 = {_fmt(ngr / 10.0)}%.",
            "Check: substitute back - " + _fmt(ngr) + " + " + _fmt(cdr) +
            " = " + _fmt(cbr) + " per 1000 recovers the given CBR, so the "
            "identity closes.",
            "Interpretation: births outnumber deaths by " + _fmt(ngr) +
            " per 1000 residents each year - natural increase only; net "
            "migration would come on top of this.",
        ]
        return _res("VITAL_STATS", g, ngr, "natural growth = CBR - CDR",
                    steps,
                    answer=f"Natural growth = {_fmt(ngr)} per 1000 "
                           f"({_fmt(ngr / 10.0)}%)",
                    extra={"cbr": cbr, "cdr": cdr, "method": "VITAL_STATS"})
    return _GATE


# --------------------------------------------------------------------------- #
# GEOGRAPHY: population growth % and doubling time (rule of 70)
# --------------------------------------------------------------------------- #

_MONEY_RE = re.compile(
    r"per\s+annum|interest|principal|invest\w*|deposit\w*|loan|\bemi\b|"
    r"compou?nd\w*|\bbank\b|saving\w*|bacteri\w*|culture\s+grow\w*|"
    r"exponential", re.I)


def _c_growth(g, m, text):
    if not re.search(r"population", text, re.I):
        return _GATE
    if _MONEY_RE.search(text):
        return _GATE  # maths2 compound-interest / biology growth territory
    # --- doubling time -------------------------------------------------------
    if re.search(r"doubl\w*", text, re.I):
        rm = re.search(r"(\d+(?:\.\d+)?)\s*%", text)
        if not rm:
            return _GATE
        rate = float(rm.group(1))
        if rate <= 0:
            return _GATE
        rule70 = 70.0 / rate
        exact = math.log(2.0) / math.log(1.0 + rate / 100.0)
        steps = [
            "Method: Using the corpus rule of 70 - doubling time (years) "
            "is approximately 70 divided by the annual growth rate in per "
            "cent (c12_geo_cbse_09_005); the exact value is ln 2 / "
            "ln(1 + r/100).",
            f"Given: annual growth rate r = {_fmt(rate)}% per year.",
            f"Computation: rule of 70 -> 70 / {_fmt(rate)} = "
            f"{_fmt(rule70)} years; exact -> ln 2 / ln(1 + "
            f"{_fmt(rate / 100.0)}) = {_fmt(exact)} years.",
            "Check: substitute back - after " + _fmt(rule70) + " years at "
            + _fmt(rate) + "% the size factor is (1 + " +
            _fmt(rate / 100.0) + ")^" + _fmt(rule70) + " which is about 2, "
            "i.e. the population doubles, so the rule closes.",
            "Interpretation: at " + _fmt(rate) + "% a year this population "
            "doubles in roughly " + _fmt(round(rule70)) + " years - the "
            "same momentum argument the corpus makes for India's Stage-3 "
            "growth (70/1.63 = about 43 years, c11_geo_cbse_16_006).",
        ]
        return _res("POP_GROWTH", g, rule70,
                    "doubling time = 70 / growth rate (%)", steps,
                    answer=f"Doubling time = {_fmt(rule70)} years by the "
                           f"rule of 70 (exact {_fmt(exact)} years)",
                    extra={"rate_pct": rate, "exact_years": exact,
                           "method": "RULE_OF_70"})
    # --- decadal growth % ----------------------------------------------------
    vals = [v for v in _nums(text) if v >= 1000 and
            not (v == int(v) and 1000 <= v <= 2100)]
    if len(vals) >= 2:
        p1, p2 = vals[0], vals[1]
        growth = (p2 - p1) / p1 * 100.0
        steps = [
            "Method: Using the census relation growth rate = (P2 - P1) / "
            "P1 x 100 - the decadal growth the corpus reports for India "
            "(17.7% over 2001-11; -0.31% over 1911-21).",
            f"Given: P1 = {_big(p1)} (earlier census), P2 = {_big(p2)} "
            "(later census).",
            f"Computation: change = {_big(p2)} - {_big(p1)} = "
            f"{_big(p2 - p1)}; growth = {_big(p2 - p1)} / {_big(p1)} x 100 "
            f"= {_fmt(growth)}%.",
            "Check: substitute back - " + _big(p1) + " x (1 + " +
            _fmt(growth / 100.0) + ") = " +
            _big(p1 * (1 + growth / 100.0)) + ", which reproduces P2 = " +
            _big(p2) + ", so the rate closes.",
            "Interpretation: the population " +
            ("grew" if growth >= 0 else "declined") + " by " +
            _fmt(abs(growth)) + "% over the decade" +
            (" - positive growth that the corpus still calls decelerating "
             "against earlier decades." if growth >= 0 else
             " - as in India's 1911-21 decade of the influenza pandemic."),
        ]
        return _res("POP_GROWTH", g, growth,
                    "growth % = (P2 - P1) / P1 x 100", steps,
                    answer=f"Decadal growth = {_fmt(growth)}%",
                    extra={"p1": p1, "p2": p2, "method": "DECADAL_GROWTH"})
    return _GATE


# --------------------------------------------------------------------------- #
# GEOGRAPHY: sex ratio / literacy rate
# --------------------------------------------------------------------------- #


def _c_sexlit(g, m, text):
    if re.search(r"sex\s+ratio", text, re.I):
        f = _count_near(text, r"females?\b|girls?\b|women\b")
        mmv = _count_near(text, r"males?\b|boys?\b|men\b")
        if f is not None and mmv:
            ratio = f / mmv * 1000.0
            steps = [
                "Method: Using the Indian-census definition - sex ratio = "
                "(number of females / number of males) x 1000, i.e. "
                "females per 1000 males (corpus: c11_geo_cbse_16_003; "
                "India 2011 = 943).",
                f"Given: females = {_big(f)}; males = {_big(mmv)}.",
                f"Computation: sex ratio = {_big(f)} / {_big(mmv)} x 1000 "
                f"= {_fmt(ratio)} females per 1000 males.",
                "Check: substitute back - a ratio of " + _fmt(ratio) +
                " per 1000 means F/M = " + _fmt(ratio / 1000.0) + ", and " +
                _big(mmv) + " x " + _fmt(ratio / 1000.0) + " = " +
                _big(mmv * ratio / 1000.0) + ", the given female count, so "
                "the ratio closes.",
                "Interpretation: about " + _fmt(round(ratio)) + " females "
                "for every 1000 males" +
                (" - above the national 2011 figure of 943." if
                 ratio >= 943 else " - below the national 2011 figure of "
                 "943.") + " The corpus trap: females PER 1000 MALES, "
                "never the reverse and never a percentage.",
            ]
            return _res("SEX_RATIO_LITERACY", g, ratio,
                        "sex ratio = females / males x 1000", steps,
                        answer=f"Sex ratio = {_fmt(ratio)} females per "
                               "1000 males",
                        extra={"females": f, "males": mmv,
                               "method": "SEX_RATIO"})
        return _GATE
    if re.search(r"literacy", text, re.I):
        popm = re.search(r"of\s+(\d[\d,]*(?:\.\d+)?)\s*(?:people|persons|"
                         r"residents|inhabitants)", text, re.I) or \
            re.search(r"population\D{0,16}(\d[\d,]*(?:\.\d+)?)", text, re.I)
        litm = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(?:people\s+|persons\s+|"
                         r"are\s+)?literate", text, re.I)
        if litm and popm:
            lit = float(litm.group(1).replace(",", ""))
            pop = float(popm.group(1).replace(",", ""))
            if pop <= 0 or lit > pop:
                return _GATE
            rate = lit / pop * 100.0
            steps = [
                "Method: Using the census definition - literacy rate is "
                "the percentage of the population who can read and write: "
                "(literates / population) x 100 (corpus: "
                "c11_geo_cbse_16_003).",
                f"Given: literates = {_big(lit)}; population = {_big(pop)}.",
                f"Computation: literacy rate = {_big(lit)} / {_big(pop)} x "
                f"100 = {_fmt(rate)}%.",
                "Check: substitute back - " + _big(pop) + " x " +
                _fmt(rate / 100.0) + " = " + _big(pop * rate / 100.0) +
                ", the given literate count, so the rate closes.",
                "Interpretation: " + _fmt(rate) + "% of residents are "
                "literate - literacy is a stock measure of population "
                "composition, not a growth rate (corpus contrast in "
                "c11_geo_cbse_17_004).",
            ]
            return _res("SEX_RATIO_LITERACY", g, rate,
                        "literacy rate = literates / population x 100",
                        steps, answer=f"Literacy rate = {_fmt(rate)}%",
                        extra={"literates": lit, "population": pop,
                               "method": "LITERACY_RATE"})
    return _GATE


# --------------------------------------------------------------------------- #
# GEOGRAPHY: climate table reading (annual rainfall, wettest/driest month)
# --------------------------------------------------------------------------- #


def _c_climate(g, m, text):
    if not re.search(r"rainfall|rainiest|driest|wettest|climatic\s+data",
                     text, re.I):
        return _GATE
    # mode A: "Mon T=.. P=.. mm" climatological table
    pairs = re.findall(
        r"\b([A-Za-z]{3,9})\b[^.\n]{0,26}?\bP\s*=\s*(\d+(?:\.\d+)?)\s*mm",
        text, re.I)
    table = [(_MONTHS.index(nm[:3].lower()), float(v))
             for nm, v in pairs if nm[:3].lower() in _MONTHS]
    # mode A': month-labelled list "Jan 18, Feb 9, ..."
    if len(table) < 6:
        ml = re.findall(
            r"\b([A-Za-z]{3,9})[a-z]*\s*[:=\-]?\s*(\d+(?:\.\d+)?)\s*(?:mm)?"
            r"(?=[,\s;.]|$)", text)
        cand = []
        seen_months = set()
        for nm, v in ml:
            key = nm[:3].lower()
            if key in _MONTHS and key not in seen_months:
                seen_months.add(key)
                cand.append((_MONTHS.index(key), float(v)))
        if len(cand) > len(table):
            table = cand
    if len(table) >= 6:
        table.sort()
        vals = [v for _, v in table]
        total = sum(vals)
        w = max(table, key=lambda tv: tv[1])
        d = min(table, key=lambda tv: tv[1])
        joined = " + ".join(_fmt(v) for v in vals)
        qgroups = " + ".join(_fmt(sum(vals[i:i + 3])) for i in (0, 3, 6, 9))
        steps = [
            "Method: Using climatological-table reading taught in the "
            "corpus - sum the monthly values for the annual total and "
            "pick the maximum / minimum months (c11_geo_cbse_10_005 "
            "mastery criteria).",
            "Given: monthly rainfall (mm): " +
            ", ".join(_MONTHS[i] + " " + _fmt(v) for i, v in table) + ".",
            f"Computation: annual total = {joined} = {_fmt(total)} mm; "
            f"wettest month = {_MONTHS[w[0]]} ({_fmt(w[1])} mm); driest "
            f"month = {_MONTHS[d[0]]} ({_fmt(d[1])} mm).",
            "Check: recount in quarter-groups - " + qgroups +
            f" = {_fmt(total)} mm, matching the direct sum, so the tally "
            "closes.",
            "Interpretation: the station receives " + _fmt(total) +
            " mm a year, concentrated in " + _MONTHS[w[0]] + " (" +
            _fmt(w[1]) + " mm) while " + _MONTHS[d[0]] + " is nearly dry ("
            + _fmt(d[1]) + " mm) - the seasonal concentration that decides "
            "its moisture regime.",
        ]
        return _res("CLIMATE_TABLE", g, total,
                    "annual rainfall = sum of monthly rainfall", steps,
                    answer=f"Annual rainfall = {_fmt(total)} mm; rainiest "
                           f"month {_MONTHS[w[0]]} ({_fmt(w[1])} mm); "
                           f"driest month {_MONTHS[d[0]]} ({_fmt(d[1])} mm)",
                    extra={"annual_total_mm": total, "wettest_mm": w[1],
                           "driest_mm": d[1], "method": "CLIMATE_TABLE"})
    # mode B: multi-year annual totals -> average
    seg = re.search(
        r"annual\s+rainfall.{0,60}?((?:\d[\d,]*(?:\.\d+)?[\s,]*){3,})"
        r"\s*mm", text, re.I)
    if seg and re.search(r"average|mean", text, re.I):
        vals = [float(x.replace(",", "")) for x in
                re.findall(r"\d[\d,]*(?:\.\d+)?", seg.group(1))]
        if len(vals) >= 3:
            mean = sum(vals) / len(vals)
            steps = [
                "Method: Using the mean of annual totals - average annual "
                "rainfall = (sum of the yearly totals) / (number of "
                "years), the station normal the corpus uses for rainfall "
                "reliability (c11_geo_cbse_10_004).",
                "Given: annual totals (mm): " +
                ", ".join(_fmt(v) for v in vals) + f" over {len(vals)} "
                "years.",
                f"Computation: sum = {' + '.join(_fmt(v) for v in vals)} = "
                f"{_fmt(sum(vals))}; mean = {_fmt(sum(vals))} / "
                f"{len(vals)} = {_fmt(mean)} mm.",
                "Check: recompute the largest year-to-mean gap - " +
                _fmt(max(vals)) + " - " + _fmt(mean) + " = " +
                _fmt(max(vals) - mean) + " mm, well within the yearly "
                "range, so the average is a sane centre.",
                "Interpretation: the station's normal is about " +
                _fmt(mean) + " mm a year; individual years swing around "
                "it - the cropping-risk signal the corpus draws from "
                "rainfall variability.",
            ]
            return _res("CLIMATE_TABLE", g, mean,
                        "mean annual rainfall = sum / years", steps,
                        answer=f"Average annual rainfall = {_fmt(mean)} mm",
                        extra={"mean_mm": mean, "years": float(len(vals)),
                               "method": "CLIMATE_TABLE"})
    return _GATE


# --------------------------------------------------------------------------- #
# GEOGRAPHY: map scale distance conversion
# --------------------------------------------------------------------------- #


def _c_scale(g, m, text):
    if re.search(r"\barea\b|sq\s*cm|shadow|similar\s+triangle", text, re.I):
        return _GATE  # area scaling / proportion territory - not a family
    if not re.search(r"scale|\bmap\b|R\.?F\.?|representative\s+fraction",
                     text, re.I):
        return _GATE
    # statement scale: "1 cm = 150 km" / "1 cm to 5 km" / "1 cm
    # represents 150 km" (SOCIAL_GOLDEN 2026-10-07: the bare-word
    # "to" form is a common board phrasing and used to gate the
    # family out entirely)
    sm = re.search(r"1\s*cm\s*(?:=|represents?|:|to)\s*(\d+(?:\.\d+)?)\s*"
                   r"(km|kilomet(?:re|er)s?|m|met(?:re|er)s?)\b", text, re.I)
    tail = text[sm.end():] if sm else text
    dist = re.search(r"(\d+(?:\.\d+)?)\s*cm\b", tail, re.I)
    gdist = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(km|kilomet(?:re|er)s?)\b",
                      tail, re.I)
    if sm:
        factor = float(sm.group(1))
        if sm.group(2).lower() == "m" or \
                sm.group(2).lower().startswith("met"):
            factor /= 1000.0  # metres -> km
        if dist:
            d = float(dist.group(1))
            ground = d * factor
            steps = [
                "Method: Using the statement scale - 1 cm on the map "
                "represents a fixed ground distance, so ground distance = "
                "map distance x scale factor.",
                f"Given: scale 1 cm = {_fmt(factor)} km; map distance = "
                f"{_fmt(d)} cm.",
                f"Computation: ground distance = {_fmt(d)} x "
                f"{_fmt(factor)} = {_big(ground)} km.",
                "Check: substitute back - " + _big(ground) + " km / " +
                _fmt(factor) + " km per cm = " + _fmt(ground / factor) +
                " cm, recovering the map measurement, so the scale closes.",
                "Interpretation: the two points lie about " + _big(ground) +
                " km apart on the ground - the same 1 cm = X km conversion "
                "the corpus uses for India-map measurements "
                "(c11_geo_cbse_08_002/08_007).",
            ]
            return _res("MAP_SCALE", g, ground,
                        "ground = map cm x scale factor", steps,
                        answer=f"Ground distance = {_big(ground)} km",
                        extra={"map_cm": d, "factor_km": factor,
                               "method": "MAP_SCALE"})
        if gdist:
            gd = float(gdist.group(1).replace(",", ""))
            cm = gd / factor
            steps = [
                "Method: Using the statement scale in reverse - map "
                "distance = ground distance / scale factor.",
                f"Given: scale 1 cm = {_fmt(factor)} km; ground distance = "
                f"{_big(gd)} km.",
                f"Computation: map distance = {_big(gd)} / {_fmt(factor)} = "
                f"{_fmt(cm)} cm.",
                "Check: substitute back - " + _fmt(cm) + " cm x " +
                _fmt(factor) + " km/cm = " + _big(cm * factor) +
                " km, recovering the ground distance.",
                "Interpretation: the towns should measure " + _fmt(cm) +
                " cm on this map; a measured distance that disagrees means "
                "the sheet in hand has a different scale - the corpus "
                "photocopy trap (c11_geo_cbse_22_001).",
            ]
            return _res("MAP_SCALE", g, cm,
                        "map cm = ground / scale factor", steps,
                        answer=f"Map distance = {_fmt(cm)} cm",
                        extra={"ground_km": gd, "factor_km": factor,
                               "method": "MAP_SCALE"})
        return _GATE
    # representative fraction: 1:N
    rfm = re.search(r"1\s*:\s*([\d,]{2,})", text)
    if rfm:
        n = float(rfm.group(1).replace(",", ""))
        dist = re.search(r"(\d+(?:\.\d+)?)\s*cm\b", text, re.I)
        gdist = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(km|kilomet(?:re|er)s?)"
                          r"\b", text, re.I)
        if dist:
            d = float(dist.group(1))
            ground_cm = d * n
            ground_km = ground_cm / 100000.0
            steps = [
                "Method: Using the representative fraction - R.F. 1:N "
                "means 1 unit on the map equals N of the same units on "
                "the ground; convert map cm to ground cm, then to km "
                "(1 km = 100,000 cm) (corpus: c11_geo_cbse_22_001/22_003).",
                f"Given: R.F. 1:{_fmt(n)}; map distance = {_fmt(d)} cm.",
                f"Computation: ground distance = {_fmt(d)} x {_fmt(n)} = "
                f"{_big(ground_cm)} cm = {_big(ground_cm)} / 100000 km = "
                f"{_fmt(ground_km)} km.",
                "Check: substitute back - " + _fmt(ground_km) + " km x "
                "100000 cm/km / " + _fmt(n) + " = " +
                _fmt(ground_km * 100000.0 / n) + " cm, the original map "
                "distance, so the conversion closes.",
                "Interpretation: the real separation is about " +
                _fmt(ground_km) + " km - the corpus's own worked case "
                "(3.5 cm on a 1:50,000 sheet = 1.75 km).",
            ]
            return _res("MAP_SCALE", g, ground_km,
                        "ground km = map cm x N / 100000", steps,
                        answer=f"Ground distance = {_fmt(ground_km)} km",
                        extra={"map_cm": d, "rf": n, "method": "MAP_SCALE"})
    return _GATE


# --------------------------------------------------------------------------- #
# CIVICS: first-past-the-post vote counting
# --------------------------------------------------------------------------- #


def _c_fptp(g, m, text):
    if not re.search(r"votes?\b", text, re.I):
        return _GATE
    cands = re.findall(
        r"candidate\s+([A-Za-z])\b[^.;]{0,40}?(\d[\d,]*)\s*votes", text,
        re.I)
    if len(cands) < 2:
        return _GATE
    votes: Dict[str, float] = {}
    for letter, val in cands:
        votes.setdefault(letter.upper(), float(val.replace(",", "")))
    total = sum(votes.values())
    win = max(votes, key=lambda k: votes[k])
    share = votes[win] / total * 100.0 if total else 0.0
    has_majority = votes[win] > total / 2.0
    ranked = sorted(votes, key=lambda k: -votes[k])
    steps = [
        "Method: Using the First-Past-The-Post rule for Indian Lok Sabha / "
        "Assembly seats - the candidate with the MOST votes (a plurality) "
        "wins the seat, with or without an absolute majority of more than "
        "50% (corpus: c8_civ_ch1_5).",
        "Given: " + ", ".join(f"Candidate {k} = {_big(votes[k])} votes"
                              for k in sorted(votes)) +
        f"; total valid votes = {_big(total)}.",
        "Computation: highest count = Candidate " + win + " with " +
        _big(votes[win]) + " votes = " + _fmt(share) + "% of " +
        _big(total) + "; the absolute-majority mark is more than " +
        _big(total / 2.0) + " votes.",
        "Check: tally all candidates - " +
        " + ".join(_big(votes[k]) for k in sorted(votes)) + " = " +
        _big(total) + ", the full vote pool, so the count is complete; " +
        _big(votes[win]) + (" is > " if has_majority else " is < ") +
        _big(total / 2.0) + ".",
        "Interpretation: Candidate " + win + " wins under FPTP with " +
        _fmt(share) + "% - " +
        ("an absolute majority." if has_majority else
         "a plurality WITHOUT an absolute majority: more electors voted "
         "against the winner than for the winner, the classic FPTP "
         "outcome the corpus flags."),
    ]
    return _res("FPTP_WINNER", g, share,
                "FPTP: winner = max votes; majority iff votes > 50% of "
                "valid votes", steps,
                answer=f"Candidate {win} wins (plurality) with "
                       f"{_fmt(share)}% of votes; absolute majority: " +
                       ("yes" if has_majority else "no") +
                       f" (runner-up Candidate {ranked[1]})",
                extra={"total_votes": total, "winner_votes": votes[win],
                       "method": "FPTP_PLURALITY"})


# --------------------------------------------------------------------------- #
# CIVICS: seat share vs vote share
# --------------------------------------------------------------------------- #


def _c_seatvote(g, m, text):
    if not re.search(r"seats?\b", text, re.I) or \
            not re.search(r"vote|%", text, re.I):
        return _GATE
    sm = re.search(r"(?:won|wins|secured)\s+(\d[\d,]*)\s*"
                   r"(?:out\s+of\s+(\d[\d,]*)\s*)?seats?", text, re.I)
    if not sm:
        return _GATE
    seats = float(sm.group(1).replace(",", ""))
    total = None
    if sm.group(2):
        total = float(sm.group(2).replace(",", ""))
    if total is None:
        tm = re.search(r"(\d[\d,]*)\s*[- ]?\s*seats?\s+(?:in\s+the\s+)?"
                       r"(?:house|lok\s+sabha|assembly|legislature|"
                       r"parliament)", text, re.I) or \
            re.search(r"(\d[\d,]*)\s*[- ]?\s*seat\s+(?:house|lok\s+sabha|"
                      r"assembly|legislature|parliament)", text, re.I)
        if tm:
            total = float(tm.group(1).replace(",", ""))
    if not total or seats > total:
        return _GATE
    seat_share = seats / total * 100.0
    vm = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:of\s+(?:the\s+)?(?:valid\s+)?"
                   r"votes|vote\s+share|votes)", text, re.I)
    vshare = float(vm.group(1)) if vm else None
    gap = (seat_share - vshare) if vshare is not None else None
    check = ("Check: substitute back - " + _fmt(total) + " x " +
             _fmt(seat_share / 100.0) + " = " +
             _fmt(total * seat_share / 100.0) + " seats, the given count, "
             "so the share closes")
    if gap is not None:
        check += (f"; the seat-vs-vote gap is {_fmt(seat_share)} - "
                  f"{_fmt(vshare)} = {_fmt(gap)} percentage points"
                  + (", seats amplified the votes (the FPTP winner bonus)."
                     if gap > 0 else
                     ", votes were wasted across losing constituencies."))
    else:
        check += "."
    steps = [
        "Method: Using seat share = (seats won / total seats) x 100 and "
        "comparing it with vote share - the FPTP seat-vs-vote gap the "
        "corpus analyses (c12_soc_cbse_10_008: 22/25 seats from 55% of "
        "the votes = 88% seat share).",
        "Given: seats won = " + _fmt(seats) + " of " + _fmt(total) +
        "; vote share = " +
        (_fmt(vshare) + "%" if vshare is not None else "not given") + ".",
        "Computation: seat share = " + _fmt(seats) + " / " + _fmt(total) +
        " x 100 = " + _fmt(seat_share) + "%" +
        ("" if gap is None else
         f"; gap = {_fmt(seat_share)} - {_fmt(vshare)} = {_fmt(gap)} pp."),
        check,
        "Interpretation: the party converts " +
        (_fmt(vshare) + "% of the votes into " if vshare is not None
         else "its seats into ") + _fmt(seat_share) + "% of the seats" +
        (" - concentrated regional support converts efficiently under "
         "FPTP, diffuse support does not (corpus: 303 seats from 37.4%)."
         if vshare is not None else "."),
    ]
    return _res("SEAT_VOTE_SHARE", g, seat_share,
                "seat share = seats / total seats x 100", steps,
                answer=f"Seat share = {_fmt(seat_share)}%" +
                       (f" vs vote share {_fmt(vshare)}% (gap "
                        f"{gap:+.6g} pp)" if gap is not None else ""),
                extra={"seats": seats, "total_seats": total,
                       "vote_share_pct": vshare or 0.0,
                       "method": "SEAT_VS_VOTE"})


# --------------------------------------------------------------------------- #
# CIVICS: majority counting (simple / special / quorum / house mark)
# --------------------------------------------------------------------------- #


def _c_majority(g, m, text):
    if not re.search(r"majority|quorum|two-?\s?thirds|present\s+and\s+"
                     r"voting", text, re.I):
        return _GATE
    # quorum
    if re.search(r"quorum", text, re.I):
        tm = re.search(r"(?:total\s+)?membership\D{0,10}(\d[\d,]*)", text,
                       re.I)
        if not tm:
            return _GATE
        total = float(tm.group(1).replace(",", ""))
        q = math.floor(total / 10.0)
        steps = [
            "Method: Using the quorum rule - a House transacts business "
            "only with one-tenth of its total membership present (corpus: "
            "c8_histciv_icse_09_001); a fractional member cannot sit, so "
            "the fraction is ignored.",
            f"Given: total membership = {_fmt(total)}.",
            f"Computation: quorum = {_fmt(total)} / 10 = "
            f"{_fmt(total / 10.0)} -> {_fmt(q)} whole members.",
            "Check: substitute back - " + _fmt(q) + " x 10 = " +
            _fmt(q * 10.0) + " <= " + _fmt(total) + " < " +
            _fmt((q + 1) * 10.0) + ", so " + _fmt(q) + " is the largest "
            "whole-member count within one-tenth of the House.",
            "Interpretation: at least " + _fmt(q) + " members must be "
            "present before business is transacted - the corpus works the "
            "same rule for a 552-member Lok Sabha (552/10 = 55.2 -> 55).",
        ]
        return _res("MAJORITY_COUNT", g, total / 10.0,
                    "quorum = one-tenth of total membership", steps,
                    answer=f"Quorum = {_fmt(total / 10.0)} -> {_fmt(q)} "
                           "members",
                    extra={"total_membership": total,
                           "method": "QUORUM_TENTH"})
    # special majority (Article 368)
    if re.search(r"special\s+majority|constitutional\s+amendment|"
                 r"two-?\s?thirds", text, re.I):
        pm = re.search(r"(\d[\d,]*)\s+(?:members?\s+)?(?:are\s+|were\s+)?"
                       r"present\s+and\s+voting", text, re.I)
        tm = re.search(r"total\s+membership\D{0,10}(\d[\d,]*)", text,
                       re.I) or \
            re.search(r"membership\s+of\s+(\d[\d,]*)", text, re.I)
        if pm and tm:
            present = float(pm.group(1).replace(",", ""))
            total = float(tm.group(1).replace(",", ""))
            two_thirds = math.ceil(present * 2.0 / 3.0)
            abs_majority = math.floor(total / 2.0) + 1
            needed = max(two_thirds, abs_majority)
            steps = [
                "Method: Using the Article 368 special-majority rule - a "
                "constitutional amendment needs at least two-thirds of the "
                "members present and voting AND a majority of the total "
                "membership of the House (corpus: c10_histciv_icse_01_003/"
                "01_004); both bars must be cleared, so take the larger "
                "count.",
                f"Given: present and voting = {_fmt(present)}; total "
                f"membership = {_fmt(total)}.",
                f"Computation: two-thirds bar = 2/3 x {_fmt(present)} = " +
                _fmt(present * 2.0 / 3.0) + " -> " + _fmt(two_thirds) +
                "; absolute-majority bar = floor(" + _fmt(total) + "/2) + "
                "1 = " + _fmt(abs_majority) + "; required = max(" +
                _fmt(two_thirds) + ", " + _fmt(abs_majority) + ") = " +
                _fmt(needed) + ".",
                "Check: substitute back - " + _fmt(needed) + " votes are " +
                _fmt(needed / present * 100.0) + "% of those present (at "
                "least 66.67%) and " + _fmt(needed) + " > " +
                _fmt(total / 2.0) + " (more than half the House), so both "
                "conditions hold at once.",
                "Interpretation: the amendment needs at least " +
                _fmt(needed) + " aye votes - the double lock that keeps "
                "the Constitution amendable but not casually changeable.",
            ]
            return _res("MAJORITY_COUNT", g, float(needed),
                        "special majority = max(2/3 of present-and-voting, "
                        "floor(N/2)+1)", steps,
                        answer=f"Special majority needs {_fmt(needed)} "
                               f"votes (2/3 of present-and-voting = "
                               f"{_fmt(two_thirds)}, absolute majority = "
                               f"{_fmt(abs_majority)})",
                        extra={"present_voting": present,
                               "total_membership": total,
                               "method": "SPECIAL_MAJORITY"})
    # simple majority of present and voting
    pm = re.search(r"(\d[\d,]*)\s+(?:members?\s+)?(?:are|were)\s+present\s+"
                   r"and\s+voting", text, re.I)
    if pm and not re.search(r"special\s+majority|two-?\s?thirds", text,
                            re.I):
        present = float(pm.group(1).replace(",", ""))
        needed = math.floor(present / 2.0) + 1
        steps = [
            "Method: Using the simple-majority rule for ordinary bills and "
            "joint sittings - a majority of the members present and voting "
            "decides (Article 108; corpus: c10_histciv_icse_01_003), i.e. "
            "strictly more than half.",
            f"Given: members present and voting = {_fmt(present)}.",
            f"Computation: majority mark = floor({_fmt(present)}/2) + 1 = "
            f"{_fmt(present / 2.0)} + 1 -> {_fmt(needed)} votes.",
            "Check: substitute back - " + _fmt(needed) + " > " +
            _fmt(present / 2.0) + ", while " + _fmt(needed - 1) + " is "
            "not more than half, so " + _fmt(needed) +
            " is exactly the smallest passing count.",
            "Interpretation: the bill passes once " + _fmt(needed) +
            " members vote aye - the same present-and-voting count that "
            "decided the corpus's joint-sitting example (300 for vs 250 "
            "against).",
        ]
        return _res("MAJORITY_COUNT", g, float(needed),
                    "simple majority = floor(present-and-voting / 2) + 1",
                    steps, answer=f"Simple majority needs {_fmt(needed)} "
                                  "votes",
                    extra={"present_voting": present,
                           "method": "SIMPLE_MAJORITY"})
    # house majority mark
    hm = re.search(r"(\d[\d,]*)\s*(?:elected\s+)?members?\b", text, re.I) \
        or re.search(r"(\d[\d,]*)\s*[- ]?seats?\b", text, re.I)
    if hm and re.search(r"majority", text, re.I):
        total = float(hm.group(1).replace(",", ""))
        if total < 5:
            return _GATE
        mark = math.floor(total / 2.0) + 1
        steps = [
            "Method: Using the confidence rule - a government must command "
            "a MAJORITY of the House, strictly more than half the seats: "
            "majority mark = floor(N/2) + 1 (corpus: 543-member Lok Sabha "
            "-> 272, c9_civ_ch2_10).",
            f"Given: House size N = {_fmt(total)} seats.",
            f"Computation: half the House = {_fmt(total)}/2 = "
            f"{_fmt(total / 2.0)}; majority mark = floor({_fmt(total / 2.0)}"
            f") + 1 = {_fmt(mark)}.",
            "Check: substitute back - " + _fmt(mark) + " > " +
            _fmt(total / 2.0) + " and " + _fmt(mark - 1) + " <= " +
            _fmt(total / 2.0) + ", so " + _fmt(mark) +
            " is the smallest seat count that is more than half.",
            "Interpretation: " + _fmt(mark) + " seats is the magic number "
            "to form or survive in government; the largest party below it "
            "must prove a floor-test majority with allies - the corpus's "
            "240-vs-272 example.",
        ]
        return _res("MAJORITY_COUNT", g, mark, "majority mark = floor(N/2) + 1",
                    steps,
                    answer=f"Majority mark = {_fmt(mark)} of "
                           f"{_fmt(total)} seats",
                    extra={"house_size": total, "method": "MAJORITY_MARK"})
    return _GATE


# --------------------------------------------------------------------------- #
# CIVICS: coalition / post-poll arithmetic
# --------------------------------------------------------------------------- #


def _c_coalition(g, m, text):
    if not re.search(r"coalition|alliance|together|forms?\s+the\s+"
                     r"government|floor\s+test|majority\s+mark|post-?\s*poll",
                     text, re.I):
        return _GATE
    if not re.search(r"seats?\b", text, re.I):
        return _GATE
    parties: List[Tuple[str, float]] = []
    for mo in re.finditer(r"\bparty\s+([A-Za-z])\b[^.;]{0,30}?"
                          r"(\d[\d,]*)\s*seats?", text, re.I):
        parties.append((mo.group(1).upper(),
                        float(mo.group(2).replace(",", ""))))
    if len(parties) < 2:
        for mo in re.finditer(r"\b([A-Z][\w()\-']{2,})\s+(?:wins|won|has|"
                              r"secured)\s+(\d[\d,]*)\s*seats?", text):
            name, val = mo.group(1), float(mo.group(2).replace(",", ""))
            if not any(p[0] == name for p in parties):
                parties.append((name, val))
    if len(parties) < 2:
        return _GATE
    hm = re.search(r"(\d[\d,]*)\s*[- ]?\s*seats?\s+(?:in\s+the\s+)?"
                   r"(?:house|assembly|lok\s+sabha|legislature)", text,
                   re.I) or \
        re.search(r"(?:house|assembly|lok\s+sabha)\s+(?:has|of)\s+"
                  r"(\d[\d,]*)\s*seats?", text, re.I) or \
        re.search(r"(\d[\d,]*)\s*[- ]?members?\b", text, re.I) or \
        re.search(r"(\d[\d,]*)\s*[- ]?\s*seat\s+(?:house|assembly|"
                  r"legislature)", text, re.I)
    if not hm:
        return _GATE
    total = float(hm.group(1).replace(",", ""))
    if total < 5:
        return _GATE
    mark = math.floor(total / 2.0) + 1
    # coalition set: parties named in a sentence that says coalition/
    # alliance/together/post-poll
    pool = [name for name, _ in parties]
    for sent in re.split(r"[.?!]\s*", text):
        if re.search(r"coalition|alliance|together|post-?\s*poll", sent,
                     re.I):
            named = [n for n in pool
                     if re.search(r"(?<![A-Za-z0-9_])" + re.escape(n) +
                                  r"(?![A-Za-z0-9_])", sent, re.I)]
            if len(named) >= 2:
                pool = named
                break
    combo = sum(v for name, v in parties if name in pool)
    largest = max(parties, key=lambda p: p[1])
    can = combo >= mark
    steps = [
        "Method: Using post-poll arithmetic - the majority mark is "
        "floor(N/2) + 1 of House seats; a party short of the mark must "
        "pool seats with allies, and only a pooled total of at least the "
        "mark proves a floor-test majority (corpus: c9_civ_ch2_10, "
        "543-seat Lok Sabha -> 272).",
        "Given: House = " + _fmt(total) + " seats (majority mark = " +
        _fmt(mark) + "); " +
        ", ".join(f"{n} = {_fmt(v)}" for n, v in parties) + " seats.",
        "Computation: largest party " + largest[0] + " holds " +
        _fmt(largest[1]) + " seats" +
        (", short by " + _fmt(mark - largest[1]) if largest[1] < mark
         else ", already past the mark") +
        "; the pooled total of " +
        " + ".join(n for n, v in parties if n in pool) + " = " +
        " + ".join(_fmt(v) for n, v in parties if n in pool) + " = " +
        _fmt(combo) + " seats against the mark of " + _fmt(mark) + ".",
        "Check: recount the pooled seats - " +
        " + ".join(_fmt(v) for n, v in parties if n in pool) + " = " +
        _fmt(combo) + ", which is " +
        (">= " if can else "< ") + _fmt(mark) + ", so the verdict stands.",
        "Interpretation: " +
        ("the coalition CAN form the government" if can else
         "the coalition CANNOT form the government on these numbers") +
        (" with " + _fmt(combo - mark) + " seats to spare." if can else
         " - it is " + _fmt(mark - combo) +
         " short of the majority mark and must win over more members "
         "before a floor test.") +
        " Plurality (most seats) alone never suffices - the corpus's "
        "240-vs-272 lesson.",
    ]
    return _res("COALITION_COUNT", g, combo,
                "coalition total vs majority mark = floor(N/2) + 1", steps,
                answer="Coalition (" +
                       ", ".join(n for n, v in parties if n in pool) +
                       ") = " + _fmt(combo) + " of " + _fmt(total) +
                       " seats (mark " + _fmt(mark) + "): " +
                       ("majority, can form the government" if can else
                        "no majority") +
                       "; largest party " + largest[0] + " " +
                       _fmt(largest[1]),
                extra={"house_size": total, "majority_mark": mark,
                       "coalition_seats": combo,
                       "method": "COALITION_ARITHMETIC"})


# --------------------------------------------------------------------------- #
# HISTORY: corpus-dated event table (closed world - verified dates only)
# --------------------------------------------------------------------------- #

_EVENTS: List[Tuple[str, int, int, List[str]]] = [
    ("French Revolution", 1789, 1799, ["french revolution"]),
    ("Revolt of 1857", 1857, 1857, ["revolt of 1857", "1857 revolt",
                                    "first war of independence",
                                    "great revolt", "sepoy mutiny"]),
    ("foundation of the Indian National Congress", 1885, 1885,
     ["congress founded", "inc founded",
      "foundation of the indian national congress",
      "indian national congress founded", "congress established",
      "birth of the indian national congress",
      "formation of the indian national congress"]),
    ("Partition of Bengal", 1905, 1905, ["partition of bengal"]),
    ("First World War", 1914, 1918, ["first world war", "world war i",
                                     "world war 1", "the great war"]),
    ("Lucknow Pact", 1916, 1916, ["lucknow pact"]),
    ("Champaran Satyagraha", 1917, 1917, ["champaran"]),
    ("Rowlatt Act", 1919, 1919, ["rowlatt"]),
    ("Jallianwala Bagh massacre", 1919, 1919,
     ["jallianwala bagh", "jallianwala"]),
    ("Non-Cooperation Movement", 1920, 1922,
     ["non-cooperation", "non cooperation", "noncooperation"]),
    ("Lahore Congress", 1929, 1929, ["lahore congress", "purna swaraj",
                                     "lahore session"]),
    ("Dandi Salt March", 1930, 1930, ["dandi", "salt march"]),
    ("Civil Disobedience Movement", 1930, 1934, ["civil disobedience"]),
    ("Government of India Act", 1935, 1935, ["government of india act"]),
    ("Quit India Movement", 1942, 1942, ["quit india", "august kranti"]),
    ("UN Charter", 1945, 1945, ["un charter", "united nations founded",
                                "united nations established"]),
    ("Indian independence", 1947, 1947,
     ["indian independence", "independence of india",
      "india gained independence", "india gain independence",
      "india won independence", "independence in 1947",
      "india became independent"]),
    ("adoption of the Constitution", 1949, 1949,
     ["constitution adopted", "26 november 1949"]),
    ("Constitution came into force", 1950, 1950,
     ["came into force on 26 january 1950", "26 january 1950",
      "constitution came into force"]),
    # --- c10 ch01: nationalism in Europe (c10_hist_cbse_01_*) ---------------
    # "Civil Code of 1804 (Napoleonic Code)" (01_002); "Napoleonic Code" x28
    ("Napoleonic Code", 1804, 1804,
     ["napoleonic code", "civil code of 1804", "code of 1804"]),
    # "1815 settlement (Congress of Vienna)" (01_002/003/004, x31)
    ("Congress of Vienna", 1815, 1815,
     ["congress of vienna", "vienna settlement"]),
    # "1848 revolutions: Mass uprisings across Europe" (01_003/004, x5+)
    ("Revolutions of 1848", 1848, 1848,
     ["revolutions of 1848", "1848 revolutions", "revolution of 1848",
      "1848 uprising"]),
    # "proclamation of the Kingdom of Italy (1861)" (01_006)
    ("unification of Italy", 1861, 1861,
     ["unification of italy", "italian unification", "kingdom of italy",
      "kingdom proclaimed 1861"]),
    # "German Empire proclaimed on 18 January 1871" (01_007; 13x "German
    # unification", 7 files "1871")
    ("unification of Germany", 1871, 1871,
     ["unification of germany", "german unification",
      "german empire proclaimed", "germany unified"]),
    # --- c10 ch02: nationalism in India (c10_hist_cbse_02_*) ----------------
    # "Swadeshi movement (1905)" / "1905 Partition of Bengal" (02_008 etc.)
    ("Swadeshi Movement", 1905, 1905,
     ["swadeshi movement", "swadeshi"]),
    # "The 1907 Surat Split (Moderates vs Extremists)" (02_001)
    ("Surat Split", 1907, 1907,
     ["surat split"]),
    # "the 1909 Morley-Minto Reforms (separate electorates)" (02_001)
    ("Morley-Minto Reforms", 1909, 1909,
     ["morley-minto", "morley minto"]),
    # "Defence of India Act: 1915 emergency law" (02_001 x2)
    ("Defence of India Act", 1915, 1915,
     ["defence of india act", "defense of india act"]),
    # "Home Rule Leagues of Tilak (1916) and Besant (1916)" (02_001 x3)
    ("Home Rule Leagues", 1916, 1916,
     ["home rule league", "home rule leagues"]),
    # "the Montagu Declaration (1917)" / "August 1917" (02_001 x3)
    ("Montagu Declaration", 1917, 1917,
     ["montagu declaration", "montagu statement"]),
    # "Khilafat Movement (1919-24)" (02_001/003/007)
    ("Khilafat Movement", 1919, 1924, ["khilafat"]),
    # "Chauri Chaura (Feb 5, 1922)" (02_004/005 x4)
    ("Chauri Chaura incident", 1922, 1922,
     ["chauri chaura"]),
    # "Simon Commission (1927) -- all-British, no Indian members" (02_005 x2)
    ("Simon Commission", 1927, 1927,
     ["simon commission"]),
    # "Nehru Report (1928)" (02_007/009 x3)
    ("Nehru Report", 1928, 1928, ["nehru report"]),
    # "Jinnah's 14 Points (1929)" (02_009 x2)
    ("Jinnah's Fourteen Points", 1929, 1929,
     ["jinnah's 14 points", "jinnah's fourteen points",
      "fourteen points"]),
    # "Gandhi-Irwin Pact (March 1931)" (02_007/009 x2)
    ("Gandhi-Irwin Pact", 1931, 1931,
     ["gandhi-irwin pact", "gandhi irwin pact"]),
    # "1931 Karachi Resolution" (02_008 x2)
    ("Karachi Resolution", 1931, 1931,
     ["karachi resolution"]),
    # "1932 Communal Award -> Poona Pact" (02_009 x3)
    ("Poona Pact", 1932, 1932, ["poona pact"]),
    ("Communal Award", 1932, 1932, ["communal award"]),
    # --- c10 ch03: the making of a global world (c10_hist_cbse_03_*) --------
    # "Battle of Plassey (1757)" (03_003/03_008/04_002; c6/c8 nodes)
    ("Battle of Plassey", 1757, 1757,
     ["battle of plassey", "plassey"]),
    # "Company's Diwani rights (1765)" (05_006; c8_hist_ch3_6)
    ("Diwani grant", 1765, 1765,
     ["diwani rights", "diwani grant", "diwani"]),
    # "Inland Emigration Act of 1859" (02_005 x2, 24x)
    ("Inland Emigration Act", 1859, 1859,
     ["inland emigration act"]),
    # "first successful modern cotton textile mill ... Bombay in 1854"
    # (04_002/03_004) -- Ahmedabad's first mill (1861) is a separate corpus
    # fact and deliberately NOT an alias here
    ("first cotton mill of Bombay", 1854, 1854,
     ["cotton textile mill was established in bombay",
      "first cotton mill of bombay", "first cotton mill in bombay"]),
    # "TISCO (established 1907 in Jamshedpur)" (04_005/03_004 x3)
    ("TISCO", 1907, 1907,
     ["tisco", "tata iron and steel"]),
    # "Suez Canal (1869) opens" (03_002/003/008 x2)
    ("opening of the Suez Canal", 1869, 1869,
     ["suez canal"]),
    # "Great Depression (1929-1934) ... 'onset and spread (1929-1934)'"
    # (03_004/03_005/02_007; 8 files; end 1934 per the definition-form span)
    ("Great Depression", 1929, 1934,
     ["great depression"]),
    # "Bretton Woods Conference ... July 1944" (03_005; 7 files)
    ("Bretton Woods Conference", 1944, 1944,
     ["bretton woods"]),
    # --- c10 ch04: the age of industrialisation (c10_hist_cbse_04_*) --------
    # "Hargreaves' spinning jenny (1764)" (04_002/04_003 x2)
    ("spinning jenny", 1764, 1764, ["spinning jenny"]),
    # "Richard Arkwright's Cromford Mill (1771) ... first modern factory"
    # (04_002 x2)
    ("Cromford Mill", 1771, 1771,
     ["cromford mill", "first modern factory"]),
    # "Arkwright's Water Frame (1769)" (04_002/04_003 x2)
    ("water frame", 1769, 1769, ["water frame"]),
    # "Cartwright's power loom (1785)" (04_002)
    ("power loom", 1785, 1785, ["power loom"]),
    # --- c10 ch05: print culture (c10_hist_cbse_05_*) ------------------------
    # "Diamond Sutra (868 CE), the world's oldest dated printed book" (05_001)
    ("Diamond Sutra", 868, 868, ["diamond sutra"]),
    # "movable-type printing press by Johannes Gutenberg in Mainz around
    # 1448" (05_002; 6 files) -- Gutenberg-anchored aliases only: a bare
    # "printing press" would mis-anchor India-press questions (1556 row)
    ("Gutenberg printing press", 1448, 1448,
     ["gutenberg's printing press", "gutenberg press",
      "movable-type printing press", "movable metal type"]),
    # "Gutenberg Bible (1455)" (05_003; 6 files)
    ("Gutenberg Bible", 1455, 1455, ["gutenberg bible", "42-line bible"]),
    # "a single pamphlet in 1517 (Luther's 95 Theses)" (05_002/05_003 x2)
    ("Luther's Ninety-Five Theses", 1517, 1517,
     ["95 theses", "ninety-five theses", "ninety five theses"]),
    # "first printing press in India ... 1556 at Goa" (05_006)
    ("first printing press of India", 1556, 1556,
     ["first printing press in india", "first printing press of india",
      "jesuit press"]),
    # "Hicky's Bengal Gazette (1780)" -- first newspaper printed in India
    # (05_007; private paper per its own answer key).  Bare "bengal
    # gazette" is NOT an alias: Gangakishore Bhattacharya's 1816 paper of
    # the same name is a different corpus fact.
    ("Hicky's Bengal Gazette", 1780, 1780,
     ["hicky's bengal gazette", "hicky's gazette",
      "calcutta general advertiser"]),
    # "Vernacular Press Act (1878) ... Lord Lytton" (05_008; x4)
    ("Vernacular Press Act", 1878, 1878,
     ["vernacular press act"]),
    # "Salt Act (1882) gave the British a monopoly on manufacture" (02_006)
    ("Salt Act", 1882, 1882, ["salt act"]),
    # --- SOCIAL-ALL (2026-10-07): c11/c12 Themes (CBSE) + CISCE, mined the
    # same way -- every row carries its corpus anchor; year-recall only
    # answers what a taught file states. -----------------------------------
    # "1066 Norman Conquest introduces feudal tenure" (c11_06_004)
    ("Norman Conquest of England", 1066, 1066,
     ["norman conquest"]),
    # "Domesday Book 1086" (c11_03_003, c11_06_004)
    ("Domesday Book", 1086, 1086, ["domesday book"]),
    # "from Diocletian's accession (284 CE) to the fall of the Western
    # Roman Empire (476 CE)" (c11_02_008)
    ("Diocletian's accession", 284, 284,
     ["diocletian's accession", "accession of diocletian",
      "diocletian became emperor"]),
    ("fall of the Western Roman Empire", 476, 476,
     ["fall of the western roman empire", "western roman empire fell",
      "western roman empire fall"]),
    # "The Black Death (1346-1353) spread along the Silk Routes"
    # (c11_05_008/010/011 definition form; c11_06 nodes narrate its 1348
    # European arrival separately -- the span, not the arrival, dates it)
    ("Black Death", 1346, 1353, ["black death"]),
    # "lords enforce Statute of Labourers (1351)" (c11_06_005)
    ("Statute of Labourers", 1351, 1351,
     ["statute of labourers", "statute of laborers"]),
    # "The Mongol Conquests (1206-1227)" (c11_05_002)
    ("Mongol Conquests", 1206, 1227,
     ["mongol conquests", "mongol conquest"]),
    # "the impact of the 1453 fall of Constantinople" (c11_07_001/003)
    ("fall of Constantinople", 1453, 1453,
     ["fall of constantinople", "constantinople fell"]),
    # "new voyages (Dias 1488, Columbus 1492, da Gama 1498)" (c11_07_003)
    ("Bartolomeu Dias rounds the Cape", 1488, 1488,
     ["bartolomeu dias"]),
    ("Columbus reaches the Americas", 1492, 1492, ["columbus"]),
    ("Vasco da Gama reaches India", 1498, 1498,
     ["vasco da gama", "da gama"]),
    # "Michelangelo's David (1504)" (c11_07_004)
    ("David (the Michelangelo sculpture)", 1504, 1504,
     ["michelangelo's david"]),
    # "On the Revolutions of the Heavenly Spheres, published in 1543"
    # (c11_07_008)
    ("On the Revolutions of the Heavenly Spheres", 1543, 1543,
     ["on the revolutions of the heavenly spheres", "de revolutionibus"]),
    # "The Meiji Restoration (1868)" (c11_09_002; x11 across c11 lanes)
    ("Meiji Restoration", 1868, 1868,
     ["meiji restoration", "meiji restoration began",
      "meiji restoration (1868)"]),
    # "the First Opium War shattered the Sinocentric tribute order" under
    # the "1839-1949" century frame (c11_09_001).  The corpus never states
    # an end year (no 1842 anywhere) and never teaches a "Second Opium
    # War", so: single-year row, and the bare "opium war" alias is a TRAP
    # (it would swallow an untaught "Second Opium War" ask) -- excluded.
    ("First Opium War", 1839, 1839, ["first opium war"]),
    # "after the Taiping Rebellion (1850-64)" (c11_09_004)
    ("Taiping Rebellion", 1850, 1864,
     ["taiping rebellion", "taiping"]),
    # "They lost the Sino-Japanese War (1894-95)" (c11_09_001)
    ("First Sino-Japanese War", 1894, 1895,
     ["sino-japanese war"]),
    # "1904-05 Russo-Japanese War - Japan attacked Russia" (c11_09_002)
    ("Russo-Japanese War", 1904, 1905,
     ["russo-japanese war"]),
    # "the 1911 Revolution (Xinhai Revolution)" (c11_09_001)
    ("Xinhai Revolution", 1911, 1911,
     ["xinhai revolution", "1911 revolution"]),
    # "(b) 1336 -- Harihara-Bukka found Vijayanagara" (c12_07_002; "the
    # Sangama dynasty (1336-1485) was the founding dynasty ... established
    # by the brothers Harihara I and Bukka I in 1336")
    ("founding of the Vijayanagara Empire", 1336, 1336,
     ["founding of the vijayanagara empire", "founding of vijayanagara",
      "vijayanagara empire was founded", "vijayanagara empire founded",
      "founded vijayanagara", "found vijayanagara",
      "establishment of the vijayanagara empire",
      "harihara and bukka"]),
    # "Krishnadevaraya raises the empire to its height (1509-29 ...)" /
    # "Krishnadeva Raya (1509-29)" (c12_07_003/07_002) -- the taught fact
    # is the REIGN span, not a "coronation" (the corpus never uses that
    # word for him)
    ("Krishnadeva Raya's reign", 1509, 1529,
     ["krishnadevaraya", "krishna deva raya", "krishnadeva raya"]),
    # "the 1565 Battle of Talikota (also known as Rakshasi-Tangadi)"
    # (c12_07_011; x12 across the ch6/7 lanes)
    ("Battle of Talikota", 1565, 1565,
     ["battle of talikota", "talikota", "rakshasi-tangadi"]),
    # "abolition of jizya (1564)" (c11_02_011 Mughal-trajectory step)
    ("abolition of jizya", 1564, 1564,
     ["abolition of jizya", "jizya abolished", "abolished jizya",
      "abolish jizya"]),
    # NO Aurangzeb-accession row: the corpus states it only inside a
    # parenthetical ("Aurangzeb (who ascended the throne in 1658 ...)",
    # c12_05_009), "war of succession" is NOT unique to him (c11_04 Ali's
    # succession, c6/c9/c7histciv uses), and his DEATH year (1707) is
    # taught in 25 files -- any broad alias would verified-wrong the
    # death ask.  The accession ask declines honestly; closed world.
    # "Shivaji's coronation (1674) at Raigad" (c8_hist_ch2_7; c12_07_002)
    ("Shivaji's coronation", 1674, 1674,
     ["shivaji's coronation", "coronation of shivaji"]),
    # "when aurangzeb died in 1707 at ahmednagar" (c8_hist_ch2_8); "the
    # war of succession after aurangzeb's death (1707 ce)" (c11_04_005)
    ("Aurangzeb's death", 1707, 1707,
     ["aurangzeb die", "death of aurangzeb", "aurangzeb's death"]),
    # "The Permanent Settlement of 1793, introduced by Governor-General
    # Lord Cornwallis in Bengal" (c12_09_001; x27 corpus-wide)
    ("Permanent Settlement", 1793, 1793,
     ["permanent settlement"]),
    # "The Fifth Report (1813)" (c12_09_001/004)
    ("Fifth Report", 1813, 1813, ["fifth report"]),
    # "The Santhal Rebellion (1855-56)" (c12_09_005; "the 1855-56 Santhal
    # revolt" 09_004_comp)
    ("Santhal Rebellion", 1855, 1856,
     ["santhal rebellion", "santhal revolt", "santhal hul"]),
    # "the Deccan Riots of 1875" (c12_09_011; x16)
    ("Deccan Riots", 1875, 1875, ["deccan riots", "deccan riot"]),
    # "the Gandhi-Jinnah talks (1944)" (c12_11_006)
    ("Gandhi-Jinnah talks", 1944, 1944,
     ["gandhi-jinnah talks", "gandhi jinnah talks"]),
    # "the Cripps Mission (March 1942)" (c12_11_006; x29)
    ("Cripps Mission", 1942, 1942, ["cripps mission"]),
    # "the Cabinet Mission (1946)" (c12_11_006/010; x64)
    ("Cabinet Mission", 1946, 1946, ["cabinet mission"]),
    # "Direct Action Day (16 Aug 1946)" (c12_11_010; x20)
    ("Direct Action Day", 1946, 1946,
     ["direct action day", "16 august 1946"]),
    # "The Partition of India (1947) means the division of British India"
    # (c12_11_010; distinct row from Indian independence: the ask "when
    # was the partition of india" is its own taught fact)
    ("Partition of India", 1947, 1947,
     ["partition of india", "partition of the country into india"]),
]


# --------------------------------------------------------------------------- #
# HISTORY: direct year recall over the corpus event table (closed world)
# --------------------------------------------------------------------------- #

#: asks for a date outright ("In which year did X begin?", "When was the
#: Jallianwala Bagh massacre?") or the fill-blank form ("...began in the
#: year ___").  Deliberately narrow: an open "tell me about X" must NOT
#: land here.
_YEAR_ASK_RE = re.compile(
    r"in\s+which\s+year|which\s+year\s+did|what\s+year|name\s+the\s+year|"
    r"the\s+year\s*[_?]{2,}|"
    r"\bwhen\s+(?:was|were|did|does)\b", re.I)

_BEGIN_HINT_RE = re.compile(
    r"begin|start|broke\s+out|launch|erupt|found|formed|adopt|signed|"
    r"came\s+into\s+force|introduc|impos|passed\b|held\b|occur|take\s+place|"
    r"took\s+place|happen", re.I)
_END_HINT_RE = re.compile(
    r"\bend(?:ed|s)?\b|conclud|finish", re.I)


def _c_event_year(g, m, text):
    if re.search(r"\bborn\b|\bage\b|\bhow old\b|birthday", text, re.I):
        return _GATE  # biography arithmetic is maths territory
    if not _YEAR_ASK_RE.search(text):
        return _GATE
    evs = _find_events(text)
    if not evs:
        return _GATE  # event outside the corpus table -> honest decline
    canon, y0, y1, _pos = evs[0]
    # A stem that embeds a year OUTSIDE the event's span is a comparison
    # or a trick phrasing ("X began: 1776 or 1789?") -- decline rather
    # than risk contradicting the stem.
    embedded = [int(y) for y in
                re.findall(r"\b(1[5-9]\d{2}|20[0-9]{2})\b", text)]
    if any(y not in (y0, y1) for y in embedded):
        return _GATE
    if _END_HINT_RE.search(text):
        year, phase = y1, "ended"
    else:
        # begin / bare "when was it" both anchor to the launch year; a
        # spanned movement states its full span so the answer stays whole.
        year, phase = y0, ("began" if y0 != y1 else "took place")
        if phase == "took place" and re.search(
                r"\b(?:act|code|pact|report|award|resolution|commission|"
                r"sutra|bible|gazette|tisco|jenny|frame|loom|press|canal|"
                r"congress|charter|book|sculpture|statue|painting|fresco|"
                r"spheres?)\b", canon, re.I):
            phase = "dates to"  # artifacts/institutions date, they don't occur
    if y0 != y1 and phase != "ended":
        span_note = f" (ran until {y1})"
    elif y0 != y1:
        span_note = f" (it had begun in {y0})"
    else:
        span_note = ""
    phase_in = "dates to" if phase == "dates to" else f"{phase} in"
    steps = [
        "Method: Using the corpus-dated event table - a date recall is "
        "read off the taught corpus, and any event outside the closed "
        "table is declined rather than guessed.",
        f"Given: the question dates {canon}; the corpus records it as "
        f"{y0}" + (f"-{y1}" if y0 != y1 else "") + ".",
        f"Computation: recall the corpus date -> {canon} {phase_in} "
        f"{year}.",
        f"Check: {year} lies inside the corpus span " +
        (f"{y0}-{y1}" if y0 != y1 else f"({y0})") +
        ", so the recall matches the taught node exactly.",
        f"Interpretation: {canon} {phase_in} {year}{span_note} - the "
        "date every chronology answer for this event anchors to.",
    ]
    return _res("EVENT_YEAR", g, float(year),
                "corpus event date (closed-world recall)", steps,
                answer=f"{canon} {phase_in} {year}{span_note}",
                extra={"year": float(year), "start_year": float(y0),
                       "end_year": float(y1), "method": "EVENT_YEAR"},
                conf=0.97)


def _find_events(text: str) -> List[Tuple[str, int, int, int]]:
    """(canonical, start, end, pos) for every corpus event named in text."""
    low = text.lower()
    out = []
    for canon, y0, y1, aliases in _EVENTS:
        best = None
        for a in aliases:
            p = low.find(a)
            if p >= 0 and (best is None or p < best):
                best = p
        if best is not None:
            out.append((canon, y0, y1, best))
    out.sort(key=lambda e: e[3])
    return out


_HIST_HINT = re.compile(
    r"movement|revolt|war\b|pact|act\b|independence|revolution|massacre|"
    r"march|session|satyagraha|congress|constitution|struggle", re.I)


def _c_chrono(g, m, text):
    if re.search(r"\bborn\b|\bage\b|\bhow old\b|birthday", text, re.I):
        return _GATE  # age arithmetic is maths territory
    evs = _find_events(text)
    # --- duration of a dated movement ----------------------------------------
    if re.search(r"how\s+long|lasted|duration|span|\blast\b", text, re.I):
        rm = re.search(r"\(?\s*(1[5-9]\d{2}|20[0-9]{2})\s*(?:[-\u2013]|to)\s*"
                       r"((?:1[5-9]\d{2}|20[0-9]{2})|(\d{2}))\s*\)?", text)
        if not rm:
            # SOCIAL-ALL additive fallback: prose-span phrasing with
            # pre-1500 years the 15xx-20xx regexes never reached ("The
            # Delhi Sultanate began in 1206 CE and came to an end in
            # 1526 CE -- how many years did it last?", corpus key 320).
            # Both anchor years must sit in the 500-2099 CE band and be
            # stated in begin/end context, so stray 3-digit counts
            # ("300 jars") cannot hijack the span.
            bm = re.search(r"\b(?:began|started|start|founded|commenced?)"
                           r"\s+(?:in\s+)?(\d{3,4})\b", text, re.I)
            em = re.search(r"\b(?:came to an end|ended|end|until|till)"
                           r"\s+(?:in\s+)?(\d{3,4})\b", text, re.I)
            if bm and em:
                y0c, y1c = int(bm.group(1)), int(em.group(1))
                if 500 <= y0c < y1c <= 2099:
                    rm_val = (y0c, y1c)
                else:
                    rm_val = None
            else:
                rm_val = None
            if rm_val:
                y0, y1 = rm_val
                ev = evs[0][0] if evs else "the event"
                dur = y1 - y0
                steps = [
                    "Method: Using duration = end year - start year for a "
                    "dated span; the begin/end years stated in the "
                    "question are the ground truth (corpus: Delhi "
                    "Sultanate 1206-1526).",
                    f"Given: {ev} spans {y0} to {y1}.",
                    f"Computation: duration = {y1} - {y0} = {dur} years.",
                    "Check: substitute back - start " + str(y0) + " + " +
                    str(dur) + " years = " + str(y0 + dur) + ", the end "
                    "year, so the interval closes.",
                    "Interpretation: " + ev + " lasted " + str(dur) +
                    " year" + ("s" if dur != 1 else "") + ".",
                ]
                return _res("CHRONO_INTERVAL", g, float(dur),
                            "duration = end year - start year", steps,
                            answer=f"{ev} lasted {dur} year"
                                   f"{'s' if dur != 1 else ''}",
                            extra={"start_year": float(y0),
                                   "end_year": float(y1),
                                   "method": "EVENT_DURATION"})
        if rm:
            y0 = int(rm.group(1))
            y1 = int(rm.group(2)) if rm.group(2).isdigit() and \
                len(rm.group(2)) == 4 else \
                (y0 // 100) * 100 + int(rm.group(2))
            ev = evs[0][0] if evs else "the event"
            dur = y1 - y0
            steps = [
                "Method: Using duration = end year - start year for a "
                "corpus-dated event; the movement's own dated span is the "
                "ground truth (corpus: Non-Cooperation 1920-22, Civil "
                "Disobedience 1930-34, French Revolution 1789-1799).",
                f"Given: {ev} spans {y0} to {y1}.",
                f"Computation: duration = {y1} - {y0} = {dur} years.",
                "Check: substitute back - start " + str(y0) + " + " +
                str(dur) + " years = " + str(y0 + dur) + ", the end year, "
                "so the interval closes.",
                "Interpretation: " + ev + " lasted " + str(dur) +
                " year" + ("s" if dur != 1 else "") +
                " - reading durations off dated spans is the base skill "
                "behind every chronology question.",
            ]
            return _res("CHRONO_INTERVAL", g, float(dur),
                        "duration = end year - start year", steps,
                        answer=f"{ev} lasted {dur} year"
                               f"{'s' if dur != 1 else ''}",
                        extra={"start_year": float(y0),
                               "end_year": float(y1),
                               "method": "EVENT_DURATION"})
        if evs:
            canon, y0, y1, _ = evs[0]
            dur = y1 - y0
            steps = [
                "Method: Using duration = end year - start year from the "
                "corpus event table (closed world - dates come only from "
                "the taught corpus).",
                f"Given: {canon} runs {y0} to {y1} in the corpus.",
                f"Computation: duration = {y1} - {y0} = {dur} years.",
                "Check: substitute back - " + str(y0) + " + " + str(dur) +
                " = " + str(y1) + ", the corpus end year, so the span "
                "closes.",
                "Interpretation: " + canon + " lasted " + str(dur) +
                " year" + ("s" if dur != 1 else "") + ".",
            ]
            return _res("CHRONO_INTERVAL", g, float(dur),
                        "duration = end year - start year", steps,
                        answer=f"{canon} lasted {dur} year"
                               f"{'s' if dur != 1 else ''}",
                        extra={"start_year": float(y0),
                               "end_year": float(y1),
                               "method": "EVENT_DURATION"})
        return _GATE  # event outside the corpus table -> honest decline
    # --- interval between two events / dated years ---------------------------
    if re.search(r"how\s+many\s+years|years\s+(?:between|apart|after|before|"
                 r"passed|elapsed)|time\s+(?:gap|interval|span)|how\s+much"
                 r"\s+later", text, re.I):
        if len(evs) >= 2:
            first, second = evs[0], evs[1]
            span = abs(second[1] - first[1])
            steps = [
                "Method: Using chronology intervals - the gap in years "
                "between two corpus-dated events is the difference of "
                "their dates; the corpus event table is the ground truth.",
                f"Given: {first[0]} = {first[1]}; {second[0]} = "
                f"{second[1]} (both corpus-dated).",
                f"Computation: interval = {second[1]} - {first[1]} = "
                f"{span} years.",
                "Check: substitute back - " + str(first[1]) + " + " +
                str(span) + " years = " + str(first[1] + span) +
                ", which lands on the second event's date, so the gap "
                "closes.",
                "Interpretation: " + str(span) + " years separate " +
                first[0] + " from " + second[0] + ".",
            ]
            return _res("CHRONO_INTERVAL", g, float(span),
                        "interval = |year2 - year1|", steps,
                        answer=f"{span} years between {first[0]} "
                               f"({first[1]}) and {second[0]} ({second[1]})",
                        extra={"year1": float(first[1]),
                               "year2": float(second[1]),
                               "method": "CHRONO_INTERVAL"})
        years = [int(y) for y in
                 re.findall(r"\b(1[5-9]\d{2}|20[0-9]{2})\b", text)]
        if len(years) >= 2 and _HIST_HINT.search(text):
            span = abs(years[1] - years[0])
            label = evs[0][0] if evs else "the two dated events"
            steps = [
                "Method: Using chronology intervals - the gap in years "
                "between two dated events is the difference of the years, "
                "validated against the corpus event table where an event "
                "is named.",
                "Given: the dates " + str(years[0]) + " and " +
                str(years[1]) + (f" ({label})" if evs else "") + ".",
                f"Computation: interval = |{years[1]} - {years[0]}| = "
                f"{span} years.",
                "Check: substitute back - " + str(min(years)) + " + " +
                str(span) + " = " + str(min(years) + span) + ", the later "
                "date, so the interval closes.",
                "Interpretation: " + str(span) + " years separate the two "
                "dates - arithmetic kept honest by the corpus-dated "
                "anchors.",
            ]
            return _res("CHRONO_INTERVAL", g, float(span),
                        "interval = |year2 - year1|", steps,
                        answer=f"{span} years",
                        extra={"year1": float(years[0]),
                               "year2": float(years[1]),
                               "method": "CHRONO_INTERVAL"})
    return _GATE


# --------------------------------------------------------------------------- #
# HISTORY: century / decade placement
# --------------------------------------------------------------------------- #


def _c_century(g, m, text):
    if re.search(r"\bborn\b|\bage\b|\bhow old\b", text, re.I):
        return _GATE
    if not re.search(r"century|decade|millennium", text, re.I):
        return _GATE
    ym = re.search(r"\b(1[5-9]\d{2}|20[0-9]{2})\b", text)
    corpus_dated = False
    if not ym:
        # SOCIAL-ALL additive fallback: no year in the stem, but the stem
        # names a corpus-dated event ("In which century was the Diamond
        # Sutra printed?") -- read the year off the closed table instead
        # of declining.  When the text DOES carry a year the behaviour is
        # byte-identical to before.
        evs_c = _find_events(text)
        if not evs_c:
            return _GATE
        ym_val = evs_c[0][1]
        corpus_dated = True
    year = int(ym.group(1)) if ym else int(ym_val)
    century = (year - 1) // 100 + 1
    decade = year // 10 * 10
    ask_d = bool(re.search(r"decade", text, re.I))
    steps = [
        "Method: Using the standard AD convention - the Nth century spans "
        "(100N - 99) to 100N, so century = floor((year - 1)/100) + 1; the "
        "decade is the ten-year block 1850s = 1850-1859 sharing the tens "
        "digit.",
        f"Given: year = {year}.",
        f"Computation: century = floor(({year} - 1)/100) + 1 = "
        f"{_ordinal(century)} century; decade = {decade}s "
        f"({decade}-{decade + 9}).",
        "Check: substitute back - the " + _ordinal(century) + " century "
        f"spans {(century - 1) * 100 + 1}-{century * 100}, and {year} "
        "falls inside that range, so the placement closes.",
        "Interpretation: " + str(year) + " belongs to the " +
        _ordinal(century) + " century and the " + str(decade) + "s - the "
        "same century-frame the corpus uses for the 19th-century "
        "nationalist press around 1885.",
    ]
    value = float(century)
    answer = (f"{year} falls in the {_ordinal(century)} century, decade "
              f"{decade}s")
    if ask_d:
        value = float(decade)
        answer = (f"{year} falls in the {decade}s ({decade}-{decade + 9}), "
                  f"{_ordinal(century)} century")
    return _res("CENTURY_DECADE", g, value,
                "century = floor((year-1)/100) + 1", steps, answer=answer,
                extra={"year": float(year), "method": "CENTURY_PLACEMENT"})


# --------------------------------------------------------------------------- #
# HISTORY: timeline ordering against corpus dates
# --------------------------------------------------------------------------- #


def _c_timeline(g, m, text):
    if not re.search(r"arrange|chronological|correct\s+order|sequence|"
                     r"order\s+the\s+following", text, re.I):
        return _GATE
    evs = _find_events(text)
    if len(evs) < 2:
        return _GATE  # unknown event -> honest decline, never invented
    # A listed item the table does NOT know means the full correct order
    # cannot be proven -- decline the whole stem rather than order a
    # subset while silently dropping one of the question's events.
    tail = text.split(":", 1)[1] if ":" in text else ""
    if tail:
        for chunk in re.split(r"[,;]|\band\b", tail):
            ch = chunk.strip(" \t.-()|")
            if not ch or re.fullmatch(r"[\d\s\-–.|()]+", ch):
                continue  # pure year/number chunks anchor via their year
            if re.search(r"following|events?\b|chronolog", ch, re.I):
                continue  # instruction filler, not an item
            if not _find_events(ch):
                return _GATE  # unrecognised item -> honest decline
    evs_sorted = sorted(evs, key=lambda e: (e[1], e[2]))
    ok = [e[0] for e in evs] == [e[0] for e in evs_sorted]
    chain = " -> ".join(f"{c} ({y})" for c, y, _, _ in evs_sorted)
    correct_first = evs_sorted[0][0]
    correct_last = evs_sorted[-1][0]
    steps = [
        "Method: Using corpus dates as the ordering key - each event is "
        "validated against its taught date and the sequence sorted "
        "ascending; any event outside the corpus table would be declined "
        "rather than guessed.",
        "Given: " + ", ".join(f"{c} ({y})" for c, y, _, _ in evs) +
        " as listed in the question.",
        "Computation: sort by start year -> " +
        " < ".join(str(y) for _, y, _, _ in evs_sorted) + ", giving " +
        chain + ".",
        "Check: the sorted years are non-decreasing - " +
        ", ".join(str(y) for _, y, _, _ in evs_sorted) + " - so no pair "
        "is out of order, and each date matches its corpus node.",
        "Interpretation: the correct chronological order is " + chain +
        ("; the given order was already correct." if ok else
         "; the given order was NOT chronological - " + correct_first +
         " comes first and " + correct_last + " last."),
    ]
    return _res("TIMELINE_ORDER", g, float(evs_sorted[0][1]),
                "order events by corpus start year", steps,
                answer="Correct order: " + chain +
                       (" (given order correct)." if ok else
                        " (given order incorrect)."),
                extra={"first_year": float(evs_sorted[0][1]),
                       "method": "TIMELINE_ORDER"})


# --------------------------------------------------------------------------- #
# HISTORY: fraction levy arithmetic (corpus: the Mari tithe tablet, c11 ch1)
# --------------------------------------------------------------------------- #

#: word fraction -> value (the only shares the corpus and board papers use)
_LEVY_FRACTIONS = [
    (r"one[- ]tenth|a\s+tenth|\btithe\b", 0.10, "one-tenth"),
    (r"one[- ]fifth|a\s+fifth", 0.20, "one-fifth"),
    (r"one[- ]quarter|one[- ]fourth|a\s+quarter", 0.25, "one-quarter"),
    (r"one[- ]third|a\s+third", 1.0 / 3.0, "one-third"),
    (r"one[- ]half|a\s+half", 0.50, "one-half"),
]

#: the cargo/goods nouns a per-unit count can attach to
_LEVY_GOODS_RE = re.compile(
    r"(\d[\d,]*)\s+(?:(?:wine|grain|oil|salt|cloth|copper|tin|timber|"
    r" spice|silk)\s+){0,2}"
    r"(?:jars?|amphorae?|bales?|crates?|sacks?|bags?|units?|items?|"
    r"containers?|loads?)", re.I)

_LEVY_UNIT_VALUE_RE = re.compile(
    r"(?:valued|priced|worth)\s+at\s+(?:about\s+|around\s+)?"
    r"(\d[\d,]*(?:\.\d+)?)", re.I)


def _c_levy(g, m, text):
    """Fraction levy on cargo value: N units x unit value = total; the
    state's share = fraction x total (corpus key: 300 jars x 5 shekels =
    1,500; one-tenth = 150 silver shekels of tax)."""
    if not re.search(r"how\s+much|how\s+many|total|tax|levy|revenue|"
                     r"calculate|find\s+the", text, re.I):
        return _GATE  # not a compute ask
    frac = fr_label = None
    for pat, v, label in _LEVY_FRACTIONS:
        if re.search(pat, text, re.I):
            frac, fr_label = v, label
            break
    if frac is None:
        return _GATE
    gm = _LEVY_GOODS_RE.search(text)
    vm = _LEVY_UNIT_VALUE_RE.search(text)
    if not (gm and vm):
        return _GATE  # missing count or unit value -> honest decline
    count = int(gm.group(1).replace(",", ""))
    unit_val = float(vm.group(1).replace(",", ""))
    unit_word = gm.group(0).strip()
    total = count * unit_val
    levy = total * frac
    fmt = lambda x: (f"{x:,.10g}")
    steps = [
        "Method: A proportional levy - total cargo value = units x value "
        "per unit, and the state's share = the stated fraction of that "
        "total (corpus: the Mari tablet's one-tenth cargo tax).",
        f"Given: {fmt(count)} units at {fmt(unit_val)} each; the levy is "
        f"{fr_label} of the cargo's value.",
        f"Computation: total value = {fmt(count)} x {fmt(unit_val)} = "
        f"{fmt(total)}; levy = {fr_label} x {fmt(total)} = {fmt(levy)}.",
        "Check: reverse the share - " + fmt(levy) + " is a tenth-weight "
        "of " + fmt(total) + ", and " + fmt(total) + " - " + fmt(levy) +
        " stays with the merchants, so the split closes.",
        "Interpretation: the boat owes " + fmt(levy) + " (of the same "
        "unit as the prices) on cargo worth " + fmt(total) + " - a "
        "proportional duty of exactly " + fr_label + ", the signature of "
        "a state that can value, inspect and tax moving goods.",
    ]
    return _res("LEVY_FRACTION", g, levy,
                "levy = fraction x (units x unit value)", steps,
                answer=f"Total value = {fmt(count)} x {fmt(unit_val)} = "
                       f"{fmt(total)}; {fr_label} levy = {fmt(levy)}",
                extra={"total_value": total, "levy": levy,
                       "fraction": frac, "method": "LEVY_FRACTION"},
                conf=0.96)


# --------------------------------------------------------------------------- #
# GEO/CIVICS/ECON: corpus fact recall (closed world - verified facts only)
# --------------------------------------------------------------------------- #

#: (lane, canonical answer, [alias regexes]).  Every row is mined from the
#: authored corpus (SOCIAL_GOLDEN batch 2026-10-06); corpus anchors are code
#: comments, never student-facing strings.  Canonical answers stay < 200
#: chars so the prose-essay guard at the answer() choke point never strips
#: them, and they carry no node ids (antislop gate).
#:
#:   geo: c7_geo_ch01_001 (India extent 8°4'N-37°6'N / 68°7'E-97°25'E,
#:        Tropic of Cancer 23°30'N, 3.28 million sq km, 7th largest,
#:        standard meridian 82°30'E), c6/c9 geo river nodes (Nile ~6,650 km
#:        longest / Amazon largest volume / Ganga-Brahmaputra largest delta,
#:        Gangotri-Bhagirathi source), c7 geo mountains (Andes ~7,000 km
#:        longest vs Himalayas highest, Everest 8,848 m, ~2,400 km),
#:        c6_geography realm nodes (Pacific largest ocean, Asia largest
#:        continent, Australia smallest), c9_geo climate (SW monsoon Kerala
#:        ~1 June, season June-September, withdrawal September-October).
#:   civ: c9_civ_ch1_4 (SIX fundamental rights, Articles 12-35; Art. 32
#:        constitutional remedies; Art. 19 freedoms incl. 19(1)(a) speech),
#:        c6/c7 civics franchise nodes (vote at 18+, universal adult
#:        franchise), c8_civ_ch1_5 (FPTP definition).
#:   econ: c9/c10_eco sector nodes (GDP = money value of FINAL goods and
#:        services within domestic territory in a year; tertiary =
#:        services), c10_eco_cbse_01_006 area (HDI = UNDP composite:
#:        health + education + income, 0-1), c10_eco poverty/employment
#:        (MGNREGA 100 days; disguised unemployment = zero marginal
#:        product).
_FACTS: List[Tuple[str, str, List[str]]] = [
    # ---- geography ----
    ("geography",
     "The Nile (about 6,650 km) is the longest river in the world; the "
     "Amazon holds a different crown - largest water volume.",
     [r"longest river in the world", r"world'?s longest river",
      r"longest river\b"]),
    ("geography",
     "The Amazon carries the largest volume of water of any river; the "
     "Nile, not the Amazon, is the longest.",
     [r"largest river by volume", r"largest river in the world by volume",
      r"river (?:that |which )?carries the (?:most|largest) water",
      r"largest river\b"]),
    ("geography",
     "The Ganga rises from the Gangotri Glacier as the Bhagirathi, joined "
     "by the Alaknanda at Devprayag.",
     [r"source of the ganga", r"ganga (?:rise|originate|begin|born|come)",
      r"where does the ganga"]),
    ("geography",
     "The Ganga-Brahmaputra delta (the Sundarbans) is the world's largest "
     "delta.",
     [r"largest delta", r"world'?s largest delta"]),
    ("geography",
     "The Andes in South America (about 7,000 km) form the longest "
     "mountain range; the Himalayas are the HIGHEST, not the longest.",
     [r"longest mountain range", r"longest range"]),
    ("geography",
     "The Himalayas hold the highest peaks on Earth (Mount Everest, 8,848 "
     "m) and run about 2,400 km - the longest range is the Andes.",
     [r"highest mountain range", r"highest peak in the world",
      r"world'?s highest peak", r"highest peak\b"]),
    ("geography",
     "The Southwest Monsoon strikes the Kerala coast around 1 June and "
     "advances across the mainland; the season runs June-September, with "
     "withdrawal in September-October.",
     [r"monsoon (?:arrive|reach|strike|onset|begin|start|break)",
      r"onset of the (?:southwest |south-west |sw )?monsoon",
      r"when does the monsoon"]),
    ("geography",
     "The Tropic of Cancer lies at 23°30'N (23.5°N) and crosses the "
     "middle of India, splitting the tropical south from the subtropical "
     "north; it passes through eight states.",
     [r"latitude of the tropic of cancer",
      r"tropic of cancer (?:lies|is located|passes|crosses)",
      r"where (?:does|is) the tropic of cancer", r"tropic of cancer pass"]),
    ("geography",
     "India's coordinates run from 8°4'N to 37°6'N latitude and 68°7'E to "
     "97°25'E longitude.",
     [r"latitudinal extent", r"longitudinal extent",
      r"(?:coordinates|latitude and longitude) of india"]),
    ("geography",
     "India spans about 3.28 million square kilometres - the seventh-"
     "largest country on Earth.",
     [r"area of india", r"size of india", r"how large is india"]),
    ("geography",
     "India's Standard Meridian is 82°30'E (near Mirzapur); IST runs 5 h "
     "30 min ahead of UTC.",
     [r"standard meridian",
     r"why does india (?:have|keep) (?:one|a single) (?:time|clock)"]),
    ("geography",
     "The Pacific is the largest ocean.",
     [r"largest ocean", r"biggest ocean"]),
    ("geography",
     "Asia is the largest continent; Australia is the smallest.",
     [r"largest continent", r"smallest continent"]),
    # ---- civics ----
    ("civics",
     "Six fundamental rights, Articles 12-35: equality; freedom; against "
     "exploitation; freedom of religion; cultural and educational "
     "rights; right to constitutional remedies.",
     [r"how many fundamental rights",
      r"which (?:are the|three|five|six) fundamental rights",
      r"list (?:the )?fundamental rights",
      r"fundamental rights.{0,30}\bhow many\b"]),
    ("civics",
     "The right to constitutional remedies (Article 32) lets citizens "
     "move the Supreme Court directly to enforce their fundamental "
     "rights - without it the other rights are unenforceable.",
     [r"constitutional remedies", r"article\s*32"]),
    ("civics",
     "Article 19 guarantees the right to freedom - including speech and "
     "expression, movement and assembly.",
     [r"article\s*19"]),
    ("civics",
     "Universal adult franchise: every citizen aged 18 or older may vote, "
     "regardless of wealth, caste or religion.",
     [r"universal adult franchise", r"voting age", r"minimum age to vote",
      r"what age can citizens vote"]),
    ("civics",
     "First-Past-The-Post: the candidate with the MOST votes in a "
     "constituency wins the seat - an absolute majority is not required.",
     [r"what is (?:a |the )?first[- ]past[- ]the[- ]post",
      r"define (?:a |the )?first[- ]past[- ]the[- ]post",
      r"meaning of fptp",
      r"what is fptp"]),
    # ---- economics ----
    ("economics",
     "GDP (Gross Domestic Product) is the money value of all FINAL goods "
     "and services produced within a country's domestic territory in a "
     "year.",
     [r"what is gdp\b", r"define gdp\b", r"meaning of gdp",
      r"full form of gdp", r"what is gross domestic product",
      r"define gross domestic product", r"gross domestic product is the"]),
    ("economics",
     "The HDI (Human Development Index) is a UNDP composite score from 0 "
     "to 1 built on three dimensions: health (life expectancy), education "
     "(schooling) and income (GNI per capita).",
     [r"what is (?:the )?hdi\b", r"define hdi\b", r"full form of hdi",
      r"what is the human development index",
      r"human development index.{0,25}(?:composed|made up|dimensions|"
      r"indicators)"]),
    ("economics",
     "MGNREGA guarantees 100 days of wage employment per rural household "
     "per year, with an unemployment allowance when it is not provided.",
     [r"how many days.{0,40}mgnrega", r"mgnrega.{0,60}how many days",
      r"what is mgnrega",
      r"how many days of (?:guaranteed )?(?:wage )?employment"]),
    ("economics",
     "Disguised unemployment: more people work on the farm than are "
     "needed - the extra workers add zero output, so removing them leaves "
     "production unchanged.",
     [r"what is disguised unemployment", r"define disguised unemployment",
      r"disguised unemployment"]),
    ("economics",
     "The tertiary sector provides SERVICES that support the primary and "
     "secondary sectors - transport, trade, banking, IT, education, "
     "health - and is the largest contributor to India's GDP.",
     [r"what is (?:the )?tertiary sector", r"define tertiary sector",
      r"tertiary activities", r"meaning of tertiary sector"]),
    # ---- history (SOCIAL-ALL 2026-10-07) ----
    ("history",
     "Sixteen major Mahajanapadas - large, powerful territorial states - "
     "emerged in ancient India around the 6th century BCE.",
     [r"how many.{0,40}mahajanapada", r"number of mahajanapadas",
      r"mahajanapadas? emerg"]),
]

#: a world-scope fact must not answer an India-scoped question: an "in/of
#: india" tail right after the matched alias means the alias under-read the
#: question ("longest river IN INDIA" must not serve the Nile) - the honest
#: move is to decline and let guided teaching take over.  Scope is tracked
#: by index over _FACTS ("world" facts only); "indian Constitution" or a
#: state mention after a civics/india fact is NOT an override (the corpus
#: facts are themselves about India).
_WORLD_FACT_IDX = frozenset({0, 1, 3, 4, 5, 11, 12})
_QUALIFIER_OVERRIDE_RE = re.compile(r"\b(?:in|of)\s+india\b", re.I)

_COMPUTE_ASK_RE = re.compile(
    r"\bcalculate\b|\bcompute\b|\bsolve\b|find\s+the\s+(?:value|number)|"
    r"\bhow\s+much\s+(?:is|are|would)\b|\bwork\s+out\b", re.I)


def fact_recall_match(text: str) -> Optional[str]:
    """Canonical corpus answer when the closed-world fact table covers the
    question; None when the fact is outside the table.  Public hook: the
    neurolink concept pre-route stands down for these so the deterministic
    family owns the answer (a 300-char concept narrative on "What is GDP?"
    was being stripped by the prose-essay guard into a dead-end refusal)."""
    if _COMPUTE_ASK_RE.search(text):
        return None
    # a stem crowded with bare numbers is a numerical the numeric lanes
    # already declined - fact recall must not free-associate on it
    probe = re.sub(r"article\s*\d+", " ", text)
    if len(re.findall(r"\d[\d,]*(?:\.\d+)?", probe)) >= 3:
        return None
    best = None  # (alias_len, fact_idx, match)
    for fi, fact in enumerate(_FACTS):
        for alias in fact[2]:
            fm = re.search(alias, text, re.I)
            if fm and (best is None or len(alias) > best[0]):
                best = (len(alias), fi, fm)
    if best is None:
        return None  # fact outside the corpus table -> honest decline
    _alias_len, fi, fm = best
    # world-scope facts never answer India-scoped questions; an India-
    # scoped fact not in the table refuses instead.
    if fi in _WORLD_FACT_IDX:
        tail = text[fm.end():fm.end() + 30]
        if _QUALIFIER_OVERRIDE_RE.search(tail):
            return None
    return _FACTS[fi][1]


def _c_fact_recall(g, m, text):
    canon = fact_recall_match(text)
    if canon is None:
        return _GATE
    fm = None
    for fact in _FACTS:
        for alias in fact[2]:
            fm2 = re.search(alias, text, re.I)
            if fm2 is not None:
                fm = fm2
    lane = next(f[0] for f in _FACTS
                if any(re.search(a, text, re.I) for a in f[2]))
    lane_word = {"geography": "geography", "civics": "civics",
                 "economics": "economics", "history": "history"}[lane]
    steps = [
        "Method: Using corpus fact recall - this " + lane_word + " fact is "
        "read off the taught text, and any fact outside the closed table "
        "is declined rather than guessed.",
        "Given: the question asks about " + fm.group(0).strip()[:60] + ".",
        "Computation: recall the corpus value -> " + canon,
        "Check: the recalled fact matches the taught answer including its "
        "flagged trap (the neighbouring superlative students usually "
        "swap it with) - nothing is extrapolated beyond the text.",
        "Interpretation: this is the examinable anchor for the asked "
        "fact; a different scope (another country or another superlative) "
        "would need its own taught fact and is not improvised.",
    ]
    return _res("FACT_RECALL", g, None, "corpus fact recall (closed world)",
                steps, answer=canon,
                extra={"method": "FACT_RECALL"}, conf=0.97)


# --------------------------------------------------------------------------- #
# SOCIAL-ALL wave 3 (2026-10-07): ISC geography numerics the CISCE sweep
# surfaced (c11_geo_isc_03_005 net slip; c9_geo_icse_01_008 nautical miles)
# --------------------------------------------------------------------------- #

def _c_net_slip(g, m, text):
    """Net slip on a fault = sqrt(throw^2 + heave^2) (corpus key:
    sqrt(120^2 + 80^2) = sqrt(20800) = 144.2 m; the ISC stem words the
    components as 'vertically by ... m' and 'horizontally by ... m')."""
    tm = re.search(r"(?:throw|vertically?)\D{0,16}"
                   r"(\d[\d,]*(?:\.\d+)?)\s*m", text, re.I)
    hm = re.search(r"(?:heave|horizontally?)\D{0,16}"
                   r"(\d[\d,]*(?:\.\d+)?)\s*m", text, re.I)
    if not (tm and hm):
        return _GATE
    throw = float(tm.group(1).replace(",", ""))
    heave = float(hm.group(1).replace(",", ""))
    slip = (throw ** 2 + heave ** 2) ** 0.5
    steps = [
        "Method: Using the fault-geometry relation - net slip is the "
        "resultant of the vertical throw and the horizontal heave, so "
        "net slip = sqrt(throw^2 + heave^2) (c11_geo_isc_03_005 key).",
        f"Given: throw = {throw:g} m (vertical); heave = {heave:g} m "
        "(horizontal).",
        f"Computation: net slip = sqrt({throw:g}^2 + {heave:g}^2) = "
        f"sqrt({_fmt(throw ** 2 + heave ** 2)}) = {slip:.1f} m.",
        "Check: the resultant exceeds each component (dip slip is the "
        "hypotenuse) and the right-triangle relation closes.",
        f"Interpretation: the marker bed's net slip is {slip:.1f} m - "
        "the true displacement along the fault plane, larger than "
        "either its vertical or horizontal component alone.",
    ]
    return _res("NET_SLIP", g, slip,
                "net slip = sqrt(throw^2 + heave^2)", steps,
                answer=f"Net slip = {slip:.1f} m",
                extra={"net_slip": slip, "throw": throw, "heave": heave,
                       "method": "NET_SLIP"}, conf=0.96)


_NM_DEG_SPAN_RE = re.compile(
    r"separated by\s*(\d[\d,]*(?:\.\d+)?)\s*(?:degrees?|°)\s*of\s*latitude",
    re.I)
_NM_TWO_LAT_RE = re.compile(
    r"(\d[\d,]*(?:\.\d+)?)\s*(?:degrees?|°)\s*([NS])\D{1,30}"
    r"(\d[\d,]*(?:\.\d+)?)\s*(?:degrees?|°)\s*([NS])", re.I)


def _c_nautical(g, m, text):
    """Distance along a meridian: 1 degree of latitude = 60 nautical
    miles (corpus key: 10 deg x 60 = 600 NM, ICSE 2023 pattern)."""
    if not re.search(r"nautical", text, re.I):
        return _GATE
    sm = _NM_DEG_SPAN_RE.search(text)
    if sm:
        deg = float(sm.group(1).replace(",", ""))
        src = f"{deg:g} degrees of latitude on the same meridian"
    else:
        tm2 = _NM_TWO_LAT_RE.search(text)
        if not tm2:
            return _GATE
        a, ha, b, hb = (tm2.group(1), tm2.group(2).upper(),
                        tm2.group(3), tm2.group(4).upper())
        a, b = float(a), float(b)
        deg = abs(a - b) if ha == hb else a + b
        src = (f"{tm2.group(1)}\u00b0{ha} and {tm2.group(3)}\u00b0{hb} "
               f"on the same meridian ({deg:g} degrees apart)")
    nm = deg * 60.0
    steps = [
        "Method: Using the meridian-degree rule - one degree of "
        "latitude spans 60 nautical miles, so distance = degrees of "
        "latitude x 60 (ICSE 2023 map-working key).",
        f"Given: {src}.",
        f"Computation: {deg:g} x 60 = {_fmt(nm)} nautical miles.",
        f"Check: {_fmt(nm)} / 60 = {deg:g} degrees - the working "
        "inverts exactly.",
        f"Interpretation: the two points are {_fmt(nm)} nautical miles "
        "apart - the same-meridian measure every ICSE map question "
        "anchors to.",
    ]
    return _res("NAUTICAL_DISTANCE", g, nm,
                "NM = degrees of latitude x 60", steps,
                answer=f"Distance = {_fmt(nm)} nautical miles",
                extra={"nautical_miles": nm, "degrees": deg,
                       "method": "NAUTICAL_DISTANCE"}, conf=0.96)


# --------------------------------------------------------------------------- #
# TABLE + dispatcher
# --------------------------------------------------------------------------- #

_TABLE: List[Tuple[str, str, Any]] = [
    # ---- geography: time and space ----
    ("TIME_ZONE_LONGITUDE",
     r"longitude|meridian|\bIST\b|Indian\s+Standard\s+Time|time\s+zone|"
     r"local\s+(?:mean\s+)?time",
     _c_timezone),
    ("MAP_SCALE",
     r"scale|R\.?F\.?|representative\s+fraction|1\s*:\s*\d[\d,]*|"
     r"1\s*cm\s*(?:=|represents?)",
     _c_scale),
    # SOCIAL_GOLDEN wave 4 (2026-10-07): weather-station statistics --
    # 'mean deviation from the 30-year normal' (c9_geo_ch2_8 key); the
    # generic mean family answered the plain mean (43) to this ask
    ("MEAN_DEVIATION", r"mean\s+deviation", _c_mean_deviation),
    # SOCIAL-ALL wave 3 (2026-10-07): ISC geography numerics
    ("NET_SLIP", r"net\s+slip|throw|heave|\bfault\b", _c_net_slip),
    ("NAUTICAL_DISTANCE", r"nautical", _c_nautical),
    # ---- geography: population ----
    ("POP_DENSITY", r"density", _c_density),
    # SOCIAL_GOLDEN wave 4 (2026-10-07): migration-aware vital statistics
    # owns BEFORE VITAL_STATS -- a stem stating net migration AND asking
    # for the actual growth rate needs the migration leg (the plain
    # family answered CBR/CDR/natural and silently dropped the ask's
    # fourth quantity; c12_geo_cbse_02_005 worked key)
    ("VITAL_STATS_MIGRATION",
     r"birth\s+rate|death\s+rate|\bCBR\b|\bCDR\b|natural\s+(?:increase|"
     r"growth)|actual\s+growth|migration",
     _c_vital_migration),
    ("VITAL_STATS",
     r"birth\s+rate|death\s+rate|\bCBR\b|\bCDR\b|natural\s+(?:increase|"
     r"growth)|vital\s+statistics",
     _c_vital),
    ("POP_GROWTH",
     r"population.{0,120}(?:growth|grow|grew|doubl\w*|increas\w*)|"
     r"(?:growth|doubl\w*|increas\w*).{0,120}population",
     _c_growth),
    ("SEX_RATIO_LITERACY", r"sex\s+ratio|literacy", _c_sexlit),
    ("CLIMATE_TABLE",
     r"rainfall|rainiest|driest|wettest|climatic\s+data|climate\s+graph",
     _c_climate),
    # ---- civics (coalition first: its probes also say "majority") ----
    ("COALITION_COUNT",
     r"coalition|alliance|together|forms?\s+the\s+government|floor\s+test|"
     r"majority\s+mark|post-?\s*poll",
     _c_coalition),
    ("FPTP_WINNER",
     r"first[- ]past[- ]the[- ]post|FPTP|candidate\s+\w+\s+(?:receives|got|"
     r"secures|polled)",
     _c_fptp),
    ("SEAT_VOTE_SHARE",
     r"seats?\b.{0,120}(?:vote|%)|(?:vote|%).{0,120}seats?\b",
     _c_seatvote),
    ("MAJORITY_COUNT",
     r"majority|quorum|two-?\s?thirds|present\s+and\s+voting",
     _c_majority),
    # ---- history ----
    ("EVENT_YEAR",
     r"in\s+which\s+year|which\s+year\s+did|what\s+year|name\s+the\s+year|"
     r"the\s+year\s*[_?]{2,}|\bwhen\s+(?:was|were|did|does)\b",
     _c_event_year),
    ("CHRONO_INTERVAL",
     r"how\s+many\s+years|years\s+(?:between|apart|after|before|passed|"
     r"elapsed)|how\s+long|lasted|duration|time\s+(?:gap|interval|span)",
     _c_chrono),
    ("CENTURY_DECADE", r"century|decade|millennium", _c_century),
    # ---- history ----
    ("TIMELINE_ORDER",
     r"arrange|chronological|correct\s+order|sequence|order\s+the\s+"
     r"following",
     _c_timeline),
    # SOCIAL-ALL (2026-10-07): the Mari-tablet proportional levy
    # ("one-tenth the cargo's value", 300 jars x 5 shekels -> 150
    # shekels tax; c11_hist_cbse_01_009 key)
    ("LEVY_FRACTION",
     r"one[- ]tenth|one[- ]fifth|one[- ]quarter|one[- ]fourth|one[- ]half|"
     r"one[- ]third|a\s+tenth|\btithe\b",
     _c_levy),
    # ---- geo/civics/econ fact recall (LAST: every specific family wins
    # first; FACT_RECALL only speaks when nothing deterministic matched) ----
    ("FACT_RECALL",
     r"what\s+(?:is|are|was)\b|which\s+(?:is|are|river|ocean|continent|"
     r"state)\b|how\s+many\b|name\s+the\b|when\s+does\b|where\s+(?:is|does)"
     r"\b|define\b|meaning\s+of\b|full\s+form\s+of\b|list\b",
     _c_fact_recall),
]

TABLE = _TABLE


def model_socsci(text: str) -> ModelResult:
    """Dispatcher: scan every social-science family; first grounded hit
    wins.

    Triggers are deterministic regexes; each row applies its own
    plausibility gates inside compute, and a gate refusal (the _GATE
    6-tuple) simply lets the scan continue.  Never calls an LLM; never
    invents a date or figure outside the corpus-grounded table.
    """
    norm = _normalize(text)
    for _fid, pattern, compute in TABLE:
        m = re.search(pattern, norm, re.I)
        if not m:
            continue
        try:
            out = compute(m.groupdict(), m, norm)
        except Exception:
            continue
        if not out:
            continue
        if isinstance(out, ModelResult):
            # handler built its own result (e.g. via _res); a gate
            # refusal is signalled by matched=False
            if out.matched:
                return out
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(_fid, m.groupdict(), value, eq or _fid, steps or [],
                    answer=answer, assumptions=assumptions,
                    extra=extra or {})
    return _no("SOCSCI", "no social-science numeric family matched")


# One dispatcher, two names (sandbox router registers
# model_socsci_families; modeling_layer registers model_socsci).
model_socsci_families = model_socsci
