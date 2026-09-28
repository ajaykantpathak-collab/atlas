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
  History    corpus-dated national movement only: Revolt of 1857
             (c10_histciv_icse_04_010), INC 1885 (05_001), Partition of
             Bengal 1905, WWI 1914-18 (10_001), Lucknow Pact 1916 (06_009),
             Rowlatt Act / Jallianwala Bagh 1919, Non-Cooperation 1920-22,
             Lahore Congress 1929, Civil Disobedience 1930-34 (07_001..005),
             Quit India August 1942 (07_004/006), Independence 1947
             (c10_civ_cbse_02_003), Constitution adopted 26 Nov 1949 /
             in force 26 Jan 1950 (c9_civ_ch1_3).  Any date or figure not
             in this closed table is declined -- no invention.

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
        ref = next((lon for lon, p in lons if p == ref_pos), _IST_LON)
        if not tgt:
            tgt = [_IST_LON if abs(ref - _IST_LON) > 1e-9 else ref]
        target = tgt[-1]
        mins = (target - ref) * 4.0
        ans = (t[0] + mins / 60.0) % 24.0
        ahead = mins > 0
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
            "Interpretation: local solar time at " + _lon_str(target) +
            " is " + _clock(ans) + " while the country's clocks stay on "
            "IST from the 82°30'E meridian - the east-west spread the "
            "corpus puts at about 1 h 57 min across India.",
        ]
        return _res("TIME_ZONE_LONGITUDE", g, ans,
                    "local time = ref time + (dLon) x 4 min", steps,
                    answer=f"{_clock(ans)} local solar time at "
                           f"{_lon_str(target)}",
                    assumptions=[
                        "anchored on IST 82°30'E = UTC+5:30 "
                        "(corpus: c11_geo_cbse_08_003/08_006)"],
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
    pop = _count_near(text, r"population\b")
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
    # statement scale: "1 cm = 150 km"
    sm = re.search(r"1\s*cm\s*(?:=|represents?|:)\s*(\d+(?:\.\d+)?)\s*"
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
]


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
    if re.search(r"how\s+long|lasted|duration|span", text, re.I):
        rm = re.search(r"\(?\s*(1[5-9]\d{2}|20[0-9]{2})\s*(?:[-\u2013]|to)\s*"
                       r"((?:1[5-9]\d{2}|20[0-9]{2})|(\d{2}))\s*\)?", text)
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
    if re.search(r"how\s+many\s+years|years\s+(?:between|after|before|"
                 r"passed|elapsed)|time\s+(?:gap|interval|span)|how\s+much"
                 r"\s+later", text, re.I):
        if len(evs) >= 2:
            first, second = evs[0], evs[1]
            span = abs(second[1] - first[1])
            steps = [
                "Method: Using chronology intervals - the gap in years "
                "between two corpus-dated events is the difference of "
                "their dates; the corpus table (1857 Revolt, 1885 INC, "
                "1919 Rowlatt, 1920-22 Non-Cooperation, 1930 CDM, 1942 "
                "Quit India, 1947 Independence) is the ground truth.",
                f"Given: {first[0]} = {first[1]}; {second[0]} = "
                f"{second[1]} (both corpus-dated).",
                f"Computation: interval = {second[1]} - {first[1]} = "
                f"{span} years.",
                "Check: substitute back - " + str(first[1]) + " + " +
                str(span) + " years = " + str(first[1] + span) +
                ", which lands on the second event's date, so the gap "
                "closes.",
                "Interpretation: " + str(span) + " years separate " +
                first[0] + " from " + second[0] + " - the arc the "
                "national movement travelled between the two.",
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
    if not ym:
        return _GATE
    year = int(ym.group(1))
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
    # ---- geography: population ----
    ("POP_DENSITY", r"density", _c_density),
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
    ("CHRONO_INTERVAL",
     r"how\s+many\s+years|years\s+(?:between|after|before|passed|elapsed)|"
     r"how\s+long|lasted|duration|time\s+(?:gap|interval|span)",
     _c_chrono),
    ("CENTURY_DECADE", r"century|decade|millennium", _c_century),
    ("TIMELINE_ORDER",
     r"arrange|chronological|correct\s+order|sequence|order\s+the\s+"
     r"following",
     _c_timeline),
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
