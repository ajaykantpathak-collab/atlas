#!/usr/bin/env python3
"""synthetic_students.py -- synthetic-student gauntlet against the live tutor API.

Walks Classes 1..12 with three personas (struggler / lost / average) against
http://localhost:8001/api/tutor-graph/* and records every product failure with
a taxonomy code:

  NO_CONTENT           serve 404 / no concepts available (expected for cl 1-5)
  SERVER_5XX           any 5xx or transport-level failure
  GRADED_FALSE_POSITIVE  nonsense answer graded correct (critical red flag)
  NO_HINT_LADDER       hint 404 / empty hint / degenerate ladder
  NO_VOICE             no voice field in serve/submit response
  SLOW                 request took > 3 s
  RETREAT_BROKEN       same hard question re-served after repeated failure
                       with no easier path (no micro_win / retreated_from)

This is a READ-ONLY audit over HTTP: it never modifies backend logic.  The
only side effects are synthetic in-memory student states inside the running
tutor engine (student ids prefixed "syn_" / "synpeek_").

Outputs:
  D:/platform/backend/tools/gauntlet_results.json   raw machine results
  D:/platform/STRUGGLE_MAP.md                       human report
"""
from __future__ import annotations

import argparse
import json
import random
import re
import sys
import time
from collections import defaultdict

import requests

BASE = "http://localhost:8001/api/tutor-graph"
SLOW_THRESHOLD = 3.0
TIMEOUT = 25

# fixed seed -> reproducible runs
random.seed(20260913)

NONSENSE_ANSWERS = [
    "idk", "i dont know", "half of it", "no idea", "idk lol", "??",
    "banana", "the answer is yes", "blue", "my dog ate it",
]

GIVEUP_STRINGS = ["i dont know", "i give up", "cant do this one"]

SUBJECTS_BY_CLASS = {}
for _c in range(1, 11):
    SUBJECTS_BY_CLASS[_c] = ["maths", "science"]
for _c in (11, 12):
    SUBJECTS_BY_CLASS[_c] = ["physics", "chemistry", "maths", "biology"]

PERSONA_ORDER = ["struggler", "lost", "average"]

PERSONAS = {
    "struggler": {
        "correct_rate": 0.30,
        "hint_levels": [1, 2, 3],       # requests hints at every level
        "idk_rate": 0.15,               # sometimes just submits "i dont know"
        "gives_up_after": None,
    },
    "lost": {
        "correct_rate": 0.15,
        "hint_levels": [1],             # only tries the first hint
        "idk_rate": 0.10,
        "gives_up_after": 2,            # quits a question after 2 wrongs
    },
    "average": {
        "correct_rate": 0.55,
        "hint_levels": [1],             # occasionally
        "hint_chance": 0.35,
        "idk_rate": 0.03,
        "gives_up_after": None,
    },
}


# ---------------------------------------------------------------- recording
class Recorder:
    def __init__(self):
        self.failures = []            # list of failure dicts
        self.latencies = defaultdict(list)   # class_level -> [seconds]
        self.served_ok = defaultdict(int)    # class_level -> count
        self.self_check_by_class = defaultdict(int)
        self.requests_made = 0
        # grading tallies: persona -> {correct, wrong, gave_up, ...}
        self.grades = defaultdict(lambda: defaultdict(int))
        # mastery deltas: (persona, class, subject) -> [before, after]
        self.mastery = {}
        # consecutive fails per (student_id, question_id) for retreat logic
        self.fail_streak = defaultdict(int)
        # extra honest observations outside the strict taxonomy
        self.notes = defaultdict(int)

    def latency(self, class_level, seconds):
        if class_level:
            self.latencies[class_level].append(seconds)

    def fail(self, code, **kw):
        rec = {"code": code}
        rec.update(kw)
        self.failures.append(rec)

    def note(self, key):
        self.notes[key] += 1


REC = Recorder()
SESSION = requests.Session()


# ------------------------------------------------------------------- http
def _elapsed(t0):
    return time.time() - t0


def http_get(path, params, class_level=None, tag=""):
    """GET with failure capture. Returns (status, payload_or_None)."""
    t0 = time.time()
    REC.requests_made += 1
    try:
        r = SESSION.get(BASE + path, params=params, timeout=TIMEOUT)
        dt = _elapsed(t0)
        REC.latency(class_level, dt)
        if dt > SLOW_THRESHOLD:
            REC.fail("SLOW", endpoint=path, method="GET",
                     request=r.url, status=r.status_code,
                     class_level=class_level, persona=tag,
                     detail="GET took %.2fs" % dt)
        return r.status_code, _safe_json(r)
    except requests.RequestException as exc:
        dt = _elapsed(t0)
        REC.latency(class_level, dt)
        REC.fail("SERVER_5XX", endpoint=path, method="GET",
                 request=BASE + path + "?" + str(params),
                 status=None, class_level=class_level, persona=tag,
                 detail="transport error: %s" % exc.__class__.__name__)
        return None, None


def http_post(path, body, class_level=None, tag=""):
    """POST with failure capture. Returns (status, payload_or_None)."""
    t0 = time.time()
    REC.requests_made += 1
    try:
        r = SESSION.post(BASE + path, json=body, timeout=TIMEOUT)
        dt = _elapsed(t0)
        REC.latency(class_level, dt)
        if dt > SLOW_THRESHOLD:
            REC.fail("SLOW", endpoint=path, method="POST",
                     request="POST %s body=%s" % (BASE + path,
                                                  json.dumps(body)[:300]),
                     status=r.status_code, class_level=class_level,
                     persona=tag, detail="POST took %.2fs" % dt)
        return r.status_code, _safe_json(r)
    except requests.RequestException as exc:
        dt = _elapsed(t0)
        REC.latency(class_level, dt)
        REC.fail("SERVER_5XX", endpoint=path, method="POST",
                 request="POST %s body=%s" % (BASE + path,
                                              json.dumps(body)[:300]),
                 status=None, class_level=class_level, persona=tag,
                 detail="transport error: %s" % exc.__class__.__name__)
        return None, None


def _safe_json(r):
    try:
        return r.json()
    except ValueError:
        return None


# ------------------------------------------------------- answer generation
NUM_RE = re.compile(r"\d+(?:\.\d+)?")


def perturbed_wrong(question_text):
    """A plausibly-attempted wrong answer: perturb a number from the
    question text, else a generic wrong string."""
    nums = NUM_RE.findall(question_text or "")
    if nums:
        n = random.choice(nums)
        val = float(n)
        options = [val + 1, val * 2, val / 2, val - 1, val + 10]
        pick = random.choice(options)
        if pick == int(pick):
            return str(int(pick)), "perturbed"
        return ("%.2f" % pick).rstrip("0").rstrip("."), "perturbed"
    return random.choice(NONSENSE_ANSWERS), "nonsense"


def harvest_correct_answer(sid, question_id, class_level, persona,
                           qtext, hint_texts):
    """Get an answer that will grade correct, without polluting the
    persona's own attempt history.

    Order: (1) a bare numeric/fraction in a fetched hint text (the ladder
    frequently leaks the raw answer), (2) a 'peek' submit on a shadow
    student id -- a wrong submit response carries the 'expected' field.
    Returns (answer_or_None, source)."""
    for txt in hint_texts:
        if txt:
            m = re.fullmatch(r"\s*[-+]?\d+(?:\.\d+)?(?:\s*/\s*\d+)?\s*",
                             str(txt))
            if m:
                REC.note("harvest_hint_leak")
                return str(txt).strip(), "hint_leak"
    status, out = http_post("/submit",
                            {"student_id": sid + "_peek",
                             "question_id": question_id, "answer": "0"},
                            class_level=class_level, tag=persona)
    if status == 200 and isinstance(out, dict):
            exp = out.get("expected") or out.get("worked_solution")
            if exp and str(exp).strip():
                REC.note("harvest_peek_expected")
                return str(exp).strip(), "peek_expected"
    REC.note("harvest_failed")
    return None, "none"


# ---------------------------------------------------------------- checks
def check_voice(out, where, question_id, class_level, persona, request):
    if not isinstance(out, dict):
        return
    voice = out.get("voice")
    if not voice or not isinstance(voice, dict) \
            or not str(voice.get("text") or "").strip():
        REC.fail("NO_VOICE", endpoint=where, question_id=question_id,
                 request=request, class_level=class_level, persona=persona,
                 detail="response missing voice/text")


def check_hint_ladder(sid, question_id, class_level, persona):
    """Fetch the hint ladder; returns list of hint texts fetched."""
    texts = []
    levels = PERSONAS[persona]["hint_levels"]
    for lvl in levels:
        status, out = http_get("/hint",
                               {"student_id": sid, "question_id": question_id,
                                "level": lvl},
                               class_level=class_level, tag=persona)
        if status == 404:
            REC.fail("NO_HINT_LADDER", endpoint="/hint",
                     request="/hint?student_id=%s&question_id=%s&level=%d"
                             % (sid, question_id, lvl),
                     status=404, class_level=class_level, persona=persona,
                     detail="hint 404 at level %d" % lvl)
            continue
        if status != 200 or not isinstance(out, dict):
            REC.fail("NO_HINT_LADDER", endpoint="/hint",
                     request="/hint?student_id=%s&question_id=%s&level=%d"
                             % (sid, question_id, lvl),
                     status=status, class_level=class_level, persona=persona,
                     detail="hint level %d not usable" % lvl)
            continue
        txt = str(out.get("hint") or "").strip()
        if not txt:
            REC.fail("NO_HINT_LADDER", endpoint="/hint",
                     request="/hint?student_id=%s&question_id=%s&level=%d"
                             % (sid, question_id, lvl),
                     status=200, class_level=class_level, persona=persona,
                     detail="empty hint text at level %d" % lvl)
            continue
        if re.fullmatch(r"\s*[-+]?\d+(?:\.\d+)?(?:\s*/\s*\d+)?\s*", txt):
            REC.note("hint_leaks_raw_answer_L%d" % lvl)
        texts.append(txt)
    if len(set(texts)) == 1 and len(PERSONAS[persona]["hint_levels"]) > 1:
        REC.fail("NO_HINT_LADDER", endpoint="/hint",
                 request="/hint?student_id=%s&question_id=%s&levels=%s"
                         % (sid, question_id, levels),
                 status=200, class_level=class_level, persona=persona,
                 detail="degenerate ladder: all levels identical")
    return texts


# ----------------------------------------------------------------- journey
def progress_mastery(sid, subject):
    status, out = http_get("/progress", {"student_id": sid, "subject": subject},
                           class_level=None, tag="probe")
    if status == 200 and isinstance(out, dict):
        ps = out.get("per_subject") or {}
        entry = ps.get(subject) or {}
        try:
            return float(entry.get("avg_mastery") or 0.0)
        except (TypeError, ValueError):
            return 0.0
    return None


def run_block(persona, class_level, subject, cycles):
    """One persona x class x subject journey: `cycles` serve/submit rounds
    plus hint calls; records mastery delta from /progress."""
    sid = "syn_%s_c%d" % (persona, class_level)
    p = PERSONAS[persona]
    before = progress_mastery(sid, subject)

    gave_up_count = 0
    for cycle in range(cycles):
        # ---- serve
        status, out = http_get("/serve",
                               {"student_id": sid, "subject": subject,
                                "class_level": class_level},
                               class_level=class_level, tag=persona)
        if status == 404:
            REC.fail("NO_CONTENT", endpoint="/serve",
                     request="/serve?student_id=%s&subject=%s&class_level=%d"
                             % (sid, subject, class_level),
                     status=404, class_level=class_level, persona=persona,
                     detail=str((out or {}).get("detail")
                                if isinstance(out, dict) else "404"))
            break        # nothing servable here; stop burning cycles
        if status is None:
            break        # transport failure already recorded
        if status >= 500:
            REC.fail("SERVER_5XX", endpoint="/serve",
                     request="/serve?student_id=%s&subject=%s&class_level=%d"
                             % (sid, subject, class_level),
                     status=status, class_level=class_level, persona=persona,
                     detail="serve returned %d" % status)
            break
        if status != 200 or not isinstance(out, dict):
            REC.fail("SERVER_5XX", endpoint="/serve",
                     request="/serve?student_id=%s&subject=%s&class_level=%d"
                             % (sid, subject, class_level),
                     status=status, class_level=class_level, persona=persona,
                     detail="serve returned unexpected %s" % status)
            break

        REC.served_ok[class_level] += 1
        qid = str(out.get("question_id") or "")
        qtext = str(out.get("question") or "")
        request_repr = ("/serve?student_id=%s&subject=%s&class_level=%d"
                        % (sid, subject, class_level))
        check_voice(out, "/serve", qid, class_level, persona, request_repr)

        # ---- retreat check: same question re-served after repeated fails
        streak = REC.fail_streak[(sid, qid)]
        if streak >= 2 and not out.get("retreated_from") \
                and not out.get("micro_win"):
            REC.fail("RETREAT_BROKEN", endpoint="/serve",
                     request=request_repr, status=200,
                     class_level=class_level, persona=persona,
                     question_id=qid,
                     detail="question re-served after %d consecutive fails, "
                            "no easier path (micro_win/retreated_from absent)"
                            % streak)

        # ---- hints
        hint_texts = []
        want_hints = p.get("hint_levels") or []
        if want_hints and p.get("hint_chance") is not None:
            if persona == "average" and random.random() > p["hint_chance"]:
                want_hints = []
        if want_hints:
            hint_texts = check_hint_ladder(sid, qid, class_level, persona)

        # ---- decide the answer
        will_be_correct = random.random() < p["correct_rate"]
        if random.random() < p.get("idk_rate", 0.0):
            answer, kind = random.choice(GIVEUP_STRINGS), "nonsense"
        elif will_be_correct:
            answer, kind = harvest_correct_answer(
                sid, qid, class_level, persona, qtext, hint_texts)
            if answer is None:
                # could not harvest: submit the last hint text, honestly
                # likely wrong -- recorded as a normal wrong answer
                answer = hint_texts[-1] if hint_texts else \
                    random.choice(NONSENSE_ANSWERS)
                kind = "nonsense" if not hint_texts else "hint_text"
        else:
            answer, kind = perturbed_wrong(qtext)

        # ---- submit
        status, out = http_post("/submit",
                                {"student_id": sid, "question_id": qid,
                                 "answer": answer},
                                class_level=class_level, tag=persona)
        submit_repr = ("POST /submit body=%s"
                       % json.dumps({"student_id": sid, "question_id": qid,
                                     "answer": answer}))
        if status is None:
            continue
        if status >= 500:
            REC.fail("SERVER_5XX", endpoint="/submit", question_id=qid,
                     request=submit_repr, status=status,
                     class_level=class_level, persona=persona,
                     detail="submit returned %d" % status)
            continue
        if status != 200 or not isinstance(out, dict):
            REC.fail("SERVER_5XX", endpoint="/submit", question_id=qid,
                     request=submit_repr, status=status,
                     class_level=class_level, persona=persona,
                     detail="submit returned unexpected %s" % status)
            continue

        check_voice(out, "/submit", qid, class_level, persona, submit_repr)
        outcome = str(out.get("outcome") or "")

        if outcome == "correct" and kind == "nonsense":
            REC.fail("GRADED_FALSE_POSITIVE", endpoint="/submit",
                     question_id=qid, request=submit_repr, status=200,
                     class_level=class_level, persona=persona,
                     detail="nonsense answer %r graded correct "
                            "(outcome=correct)" % answer)
            REC.grades[persona]["wrong"] += 1
            REC.fail_streak[(sid, qid)] = 0
            continue

        if outcome == "self_check":
            REC.self_check_by_class[class_level] += 1
        if outcome == "correct":
            REC.grades[persona]["correct"] += 1
            REC.fail_streak[(sid, qid)] = 0
        elif outcome in ("wrong", "lets_learn", "retry") or outcome == "":
            REC.grades[persona]["wrong"] += 1
            REC.fail_streak[(sid, qid)] += 1
        else:
            # self_check / ungraded etc: not a graded interaction
            REC.grades[persona][outcome or "unknown_outcome"] += 1

        # ---- give-up behaviour
        ga = p.get("gives_up_after")
        if ga and REC.fail_streak[(sid, qid)] >= ga:
            gave_up_count += 1
            REC.grades[persona]["gave_up"] += 1
            REC.fail_streak[(sid, qid)] = 0
            # lost student walks away: no further attempt on this question
            continue

    after = progress_mastery(sid, subject)
    REC.mastery[(persona, class_level, subject)] = [before, after]


# ------------------------------------------------------------------ report
CODE_RANK = {
    "GRADED_FALSE_POSITIVE": 0,
    "SERVER_5XX": 1,
    "RETREAT_BROKEN": 2,
    "NO_HINT_LADDER": 3,
    "NO_VOICE": 4,
    "NO_CONTENT": 5,
    "SLOW": 6,
}


def top_failure_sites(n=10):
    sites = defaultdict(lambda: {"count": 0, "example": None,
                                 "personas": set()})
    for f in REC.failures:
        key = (f["code"], f.get("endpoint"), f.get("class_level"))
        s = sites[key]
        s["count"] += 1
        s["personas"].add(str(f.get("persona")))
        if s["example"] is None:
            s["example"] = f
    ranked = sorted(sites.items(),
                    key=lambda kv: (CODE_RANK.get(kv[0][0], 9),
                                    -kv[1]["count"]))
    return ranked[:n]


def write_report(path, meta):
    L = []
    L.append("# STRUGGLE_MAP.md -- Synthetic-Student Gauntlet Report")
    L.append("")
    L.append("Generated %s by `backend/tools/synthetic_students.py` against "
             "the live tutor API (`http://localhost:8001/api/tutor-graph/*`)."
             % meta["generated_at"])
    L.append("")
    L.append("**Method.** Three synthetic personas walked Classes 1-12: "
             "*struggler* (~30%% correct, hint ladder levels 1-3 every "
             "question, sometimes submits \"i dont know\"), *lost* (~15%% "
             "correct, always wrong first, gives up after 2 wrongs) and "
             "*average* (~55%% correct, control). Each persona x class x "
             "subject block ran %d serve/submit cycles. Wrong answers were "
             "numbers perturbed from the question text or generic nonsense "
             "(\"idk\", \"half of it\", ...). Correct answers were harvested "
             "from hint text or a peek-submit on a shadow student, so a "
             "persona's own mastery history stays honest. ~%d HTTP requests "
             "total. READ-ONLY audit: no backend logic touched."
             % (meta["cycles"], meta["requests"]))
    L.append("")
    L.append("Baseline discovered at runtime: classes 1-5 have **no tutor "
             "concepts at all** (serve 404 `no concepts available` for every "
             "subject); science only exists for classes 6-10; physics / "
             "chemistry / biology only for 11-12.")
    L.append("")
    L.append("## Per-class results (all personas combined)")
    L.append("")
    L.append("| Class | Served OK | NO_CONTENT | SERVER_5XX | GRADED_FALSE"
             "_POSITIVE | NO_HINT_LADDER | NO_VOICE | SLOW | RETREAT_BROKEN"
             " | Ungraded self_check submits | Avg latency (s) |")
    L.append("|---|---|---|---|---|---|---|---|---|---|---|")
    for c in range(1, 13):
        row = [str(c), str(REC.served_ok[c])]
        for code in ("NO_CONTENT", "SERVER_5XX", "GRADED_FALSE_POSITIVE",
                     "NO_HINT_LADDER", "NO_VOICE", "SLOW", "RETREAT_BROKEN"):
            row.append(str(sum(1 for f in REC.failures
                               if f["code"] == code
                               and f.get("class_level") == c)))
        row.append(str(REC.self_check_by_class[c]))
        lats = REC.latencies[c]
        avg = ("%.2f" % (sum(lats) / len(lats))) if lats else "-"
        row.append(avg)
        L.append("| " + " | ".join(row) + " |")
    L.append("")
    L.append("## Actual grading outcomes per persona (what the tutor judged)")
    L.append("")
    L.append("| Persona | correct | wrong | gave up | other outcomes |")
    L.append("|---|---|---|---|---|")
    for p in PERSONA_ORDER:
        g = REC.grades[p]
        other = {k: v for k, v in g.items()
                 if k not in ("correct", "wrong", "gave_up")}
        L.append("| %s | %d | %d | %d | %s |"
                 % (p, g.get("correct", 0), g.get("wrong", 0),
                    g.get("gave_up", 0),
                    json.dumps(other) if other else "-"))
    L.append("")
    L.append("## Mastery delta per class (avg_mastery after - before, "
             "per subject)")
    L.append("")
    L.append("| Class | Subject | struggler | lost | average |")
    L.append("|---|---|---|---|---|")
    for c in range(1, 13):
        for s in SUBJECTS_BY_CLASS[c]:
            cells = []
            for p in PERSONA_ORDER:
                d = REC.mastery.get((p, c, s))
                if d and d[0] is not None and d[1] is not None:
                    cells.append("%+.3f" % (d[1] - d[0]))
                else:
                    cells.append("-")
            L.append("| %d | %s | %s |" % (c, s, " | ".join(cells)))
    L.append("")
    L.append("## Extra observations (outside the strict taxonomy)")
    L.append("")
    if REC.notes:
        for k in sorted(REC.notes):
            L.append("- %s: %d" % (k, REC.notes[k]))
    else:
        L.append("- none")
    L.append("")
    L.append("## Top failure sites")
    L.append("")
    ranked = top_failure_sites(10)
    if not ranked:
        L.append("(no failures recorded)")
    for i, ((code, endpoint, cls), site) in enumerate(ranked, 1):
        ex = site["example"]
        L.append("### %d. %s -- %s (class %s; personas: %s) -- %d occurrence(s)"
                 % (i, code, endpoint, cls,
                    ", ".join(sorted(site["personas"])) or "-",
                    site["count"]))
        L.append("- exact request: `%s`" % (ex.get("request") or ""))
        L.append("- detail: %s" % (ex.get("detail") or ""))
        if ex.get("question_id"):
            L.append("- question_id: `%s`" % ex["question_id"])
        L.append("")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")
    # verdict placeholder -- filled in by the auditor after reading results
    return ranked


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cycles", type=int, default=6)
    ap.add_argument("--out-json",
                    default="D:/platform/backend/tools/gauntlet_results.json")
    ap.add_argument("--out-md", default="D:/platform/STRUGGLE_MAP.md")
    args = ap.parse_args()

    # health gate
    for attempt in range(10):
        try:
            r = SESSION.get("http://localhost:8001/health", timeout=5)
            if r.status_code == 200:
                break
        except requests.RequestException:
            pass
        time.sleep(2)
    else:
        print("FATAL: backend not healthy on :8001", flush=True)
        sys.exit(1)

    meta = {
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "cycles": args.cycles,
        "requests": 0,
    }

    for cls in range(1, 13):
        for persona in PERSONA_ORDER:
            for subject in SUBJECTS_BY_CLASS[cls]:
                run_block(persona, cls, subject, args.cycles)
        print("done class %d (requests=%d failures=%d)"
              % (cls, REC.requests_made, len(REC.failures)), flush=True)

    meta["requests"] = REC.requests_made
    ranked = write_report(args.out_md, meta)

    # dump raw results
    dump = {
        "meta": meta,
        "failures": REC.failures,
        "failure_counts_by_code": dict(
            (k, sum(1 for f in REC.failures if f["code"] == k))
            for k in CODE_RANK),
        "served_ok_by_class": dict(REC.served_ok),
        "avg_latency_by_class": dict(
            (c, round(sum(v) / len(v), 3))
            for c, v in REC.latencies.items() if v),
        "grades_by_persona": dict(
            (p, dict(g)) for p, g in REC.grades.items()),
        "mastery_deltas": dict(
            ("%s|c%d|%s" % k,
             (round(v[1] - v[0], 4)
              if (v[0] is not None and v[1] is not None) else None))
            for k, v in REC.mastery.items()),
        "notes": dict(REC.notes),
        "top_sites": [
            {"code": k[0], "endpoint": k[1], "class": k[2],
             "personas": sorted(s["personas"]), "count": s["count"],
             "example": s["example"]}
            for k, s in ranked],
    }
    with open(args.out_json, "w", encoding="utf-8") as fh:
        json.dump(dump, fh, indent=2, default=str)

    print("WROTE %s and %s" % (args.out_md, args.out_json), flush=True)
    print("failure counts by code:")
    for k in sorted(CODE_RANK):
        print("  %-22s %d" % (k, sum(1 for f in REC.failures
                                     if f["code"] == k)), flush=True)


if __name__ == "__main__":
    main()
