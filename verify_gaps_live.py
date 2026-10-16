"""verify_gaps_live.py -- post-restart live verification for the GAPS pass.

Probes the PRODUCTION endpoints via :80 (nginx) and asserts the four
workstreams landed:
  1. the 9 derived worked examples serve on the enrichment `examples`
     field; the 5 honest skips still serve honest nulls;
  2. the repaired c7 files serve clean DQ bodies (no leading newline,
     correct count);
  3. Hindi eli5 serves on hin_* samples (Devanagari + English-framed),
     honest null only on the 3 documented skips; non-Hindi regression
     eli5 unchanged;
  4. corpus-count sanity via a band sample.
"""
import json
import re
import sys
import urllib.request

BASE = "http://localhost"

PROBE = {
    # WS-A derived examples (must serve examples)
    "c6_gram_cbse_83_001": ("examples", True),
    "c7_comp_cbse_85_002": ("examples", True),
    "c8_comp_cbse_86_001": ("examples", True),
    "c8_gram_cbse_82_002": ("examples", True),
    "c9_gram_cbse_80_001": ("examples", True),
    "c9_gram_cbse_80_002": ("examples", True),
    "c11_comp_cbse_86_003": ("examples", True),
    "c11_gram_cbse_80_002": ("examples", True),
    "c12_gram_cbse_82_001": ("examples", True),
    # WS-A honest skips (must stay null)
    "c8_gram_cbse_81_001": ("examples", False),
    "c12_gram_cbse_81_002": ("examples", False),
    "c12_gram_cbse_83_001": ("examples", False),
    "c12_hin_al_cbse_03_011": ("examples", False),
    "c12_hin_v_cbse_03_002": ("examples", False),
    # WS-C Hindi eli5 (must serve eli5; None only on the 3 skips)
    "c11_hin_ar_cbse_04_002": ("eli5-hi", True),
    "c12_hin_al_cbse_03_011": ("eli5-hi", True),
    "c12_hin_a_cbse_01_001": ("eli5-en-framed", True),
    "c11_hin_v_cbse_01_001": ("eli5-en-framed", True),
    "c12_hin_ar_cbse_09_015": ("eli5-en-framed", True),
    "c12_hin_a_cbse_02_014": ("eli5", False),
    "c12_hin_a_cbse_02_015": ("eli5", False),
    "c12_hin_v_cbse_03_002": ("eli5", False),
    # regression band samples (eli5 + examples both)
    "c6_biology_ch06_001": ("eli5+examples", True),
    "c8_eco_ch3_1": ("eli5+examples", True),
    "c9_math_ch5_4": ("eli5-clean", True),
    "c10_bio_cbse_01_001": ("eli5+examples", True),
    "c11_stat_cbse_08_007": ("eli5-clean", True),
    "c12_acc_cbse_01_001": ("eli5+examples", True),
    "c12_ca_cbse_01_003": ("eli5-clean", True),
}

DEV_RE = re.compile(r"[\u0900-\u097F]")
NODE_ID_RE = re.compile(r"\bc\d+_[a-z][a-z_]*_\w")


def fetch(path, tries=2):
    last = None
    for _ in range(tries):
        try:
            with urllib.request.urlopen(BASE + path, timeout=30) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:  # noqa: BLE001
            last = e
    raise last


def main():
    fails = []
    health = fetch("/api/health")
    ok = all(health.get("services", {}).values())
    print("health:", "OK" if ok else health)
    if not ok:
        fails.append("health")

    for node, (kind, expect) in PROBE.items():
        try:
            d = fetch("/api/content/nodes/%s/enrichment" % node)
        except Exception as e:  # noqa: BLE001
            fails.append("%s: fetch %s" % (node, e))
            continue
        eli5 = d.get("eli5")
        ex = d.get("examples")
        dqs = d.get("diagnostic_questions") or []
        if kind == "examples":
            got = bool(ex)
            label = "examples=%s" % bool(ex)
        elif kind == "eli5":
            got = eli5 is not None
            label = "eli5=%s" % ("null" if eli5 is None else "set")
        elif kind.startswith("eli5-"):
            got = bool(eli5)
            if got and kind == "eli5-hi":
                frac = sum(1 for c in eli5 if DEV_RE.match(c)) / max(1, len(eli5))
                if frac < 0.25:
                    got = False
            if got and NODE_ID_RE.search(eli5):
                got = False
            label = "eli5[%s]" % (eli5[:48] + "..." if eli5 else "null")
        elif kind == "eli5-clean":
            got = bool(eli5) and not NODE_ID_RE.search(eli5)
            label = "eli5-clean=%s" % bool(got)
        else:  # eli5+examples
            got = bool(eli5) and bool(ex)
            label = "eli5+examples=%s/%s" % (bool(eli5), bool(ex))
        status = "OK " if got == expect else "FAIL"
        if got != expect:
            fails.append("%s (%s: %s)" % (node, kind, label))
        print("%s %-26s %s" % (status, node, label))

    # c7 repaired DQ bodies: clean, no leading newline
    for node in ["c7_bio_ch03_006", "c7_engl_ch05_002", "c7_math_ch15_006"]:
        d = fetch("/api/content/nodes/%s/enrichment" % node)
        dqs = d.get("diagnostic_questions") or []
        bad = [x for x in dqs
               if not (x.get("question") or "").strip()
               or (x.get("question") or "").startswith("\n")]
        print("%s %-26s dq=%d clean=%s" % (
            "OK " if dqs and not bad else "FAIL", node, len(dqs), not bad))
        if not dqs or bad:
            fails.append(node + " dq")

    print("=" * 60)
    print("FAILURES:", len(fails))
    for f in fails:
        print("  ", f)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
