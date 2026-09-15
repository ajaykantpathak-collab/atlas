#!/usr/bin/env python3
"""Audit band c11_/c12_ (non-comp node files) for the completion checklist:
cycles, prereq<->forward symmetry, orphan forwards, N/A tokens in reference
sections, reasons coverage, dangling refs. Read-only; writes JSON findings.

md truth = same parse contract as tools/load_graph_neo4j.py (value line =
single line right after '## SECTION').
"""
import json
import os
import re
import sys
from collections import defaultdict

MD = r"C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache"
INDEX = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                     "..", "_cache", "enhanced_nodes_index.json")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "_cache", "band_11_12_audit.json")

LIST_SECTIONS = ["PREREQUISITE_NODE_IDS", "FORWARD_NODE_IDS", "LEADS_TO",
                 "BUILDS_ON", "CROSS_SUBJECT_PREREQS"]
REF_PATTERNS = {s: re.compile(r"^## " + s + r"[ \t]*\r?\n(.*?)(?=\r?\n## |\Z)",
                              re.S | re.M) for s in LIST_SECTIONS}


def parse_band():
    files = {}
    for fname in sorted(os.listdir(MD)):
        if not fname.endswith(".md"):
            continue
        if "_comp" in fname:
            continue
        if not (fname.startswith("c11_") or fname.startswith("c12_")):
            continue
        raw = open(os.path.join(MD, fname), "rb").read()
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError as e:
            files[fname[:-3]] = {"_decode_error": str(e)}
            continue
        files[fname[:-3]] = {
            "raw": raw,
            "text": text,
            "crlf": b"\r\n" in raw,
        }
    return files


def get_section(text, name):
    m = REF_PATTERNS[name].search(text)
    if not m:
        return None
    body = m.group(1)
    lines = [ln.strip() for ln in body.replace("\r\n", "\n").split("\n")]
    nonempty = [ln for ln in lines if ln]
    return {"body": body, "lines": nonempty,
            "multiline": len(nonempty) > 1,
            "first_line": nonempty[0] if nonempty else ""}


def tokens_of(sec):
    if sec is None:
        return []
    toks = []
    for tok in sec["first_line"].split(","):
        t = tok.strip()
        if t:
            toks.append(t)
    return toks


def main():
    band = parse_band()
    band_ids = set(band)

    # universe of valid targets: any non-comp md file in md_cache (c6..c12)
    all_node_files = set()
    for fname in sorted(os.listdir(MD)):
        if fname.endswith(".md") and "_comp" not in fname:
            all_node_files.add(fname[:-3])

    index_ids = None
    if os.path.exists(INDEX):
        idx = json.load(open(INDEX, encoding="utf-8"))
        index_ids = {n.get("node_id") for n in idx.get("nodes", [])}

    findings = {
        "band_files": len(band),
        "band_nodes": len(band_ids),
        "decode_errors": [k for k, v in band.items() if "_decode_error" in v],
        "sections_missing": defaultdict(int),
        "multiline_list_bodies": [],
        "na_tokens": [],          # (id, section, kind)
        "dangling": [],           # (src, section, tgt)
        "self_loops": [],
        "dup_tokens": [],
        "prereq_edges_intra": 0,
        "prereq_edges_cross": 0,
        "missing_mirror_intra": [],   # (src, tgt) both in band, tgt forward lacks src
        "missing_mirror_cross": [],   # (src, tgt) tgt out of band (unmirrorable in-scope)
        "orphan_forward_intra": [],   # (src, tgt) tgt in band, tgt prereq lacks src
        "orphan_forward_cross": [],   # (src, tgt) tgt out of band
        "forward_self_orphans": [],
        "prereq_missing_reason": [],  # (src, tgt)
        "prereq_orphan_reason": [],   # (src, rid) reason without edge
        "forward_missing_reason": [],
        "cycles_scc": [],
        "crlf_all": all(v.get("crlf", False) for v in band.values()),
    }

    PN = {}   # src -> set(tgt)  (prereq, any band)
    FN = {}   # src -> set(tgt)

    for src in sorted(band):
        v = band[src]
        if "_decode_error" in v:
            continue
        text = v["text"]
        secs = {}
        for s in LIST_SECTIONS:
            sec = get_section(text, s)
            secs[s] = sec
            if sec is None:
                findings["sections_missing"][s] += 1
            elif sec["multiline"]:
                findings["multiline_list_bodies"].append((src, s))
        # N/A token scan across the 5 reference sections (whole body)
        for s in LIST_SECTIONS:
            sec = secs[s]
            if sec is None:
                continue
            for ln in sec["lines"]:
                toks = [t.strip() for t in ln.split(",")]
                for t in toks:
                    if t.upper() == "N/A" or t.upper().startswith("N/A"):
                        findings["na_tokens"].append((src, s, ln[:80]))
        p = set()
        for t in tokens_of(secs["PREREQUISITE_NODE_IDS"]):
            if t == src:
                findings["self_loops"].append((src, "PREREQUISITE_NODE_IDS"))
                continue
            p.add(t)
            if t not in all_node_files:
                findings["dangling"].append((src, "PREREQUISITE_NODE_IDS", t))
        f = set()
        for t in tokens_of(secs["FORWARD_NODE_IDS"]):
            if t == src:
                findings["self_loops"].append((src, "FORWARD_NODE_IDS"))
                continue
            f.add(t)
            if t not in all_node_files:
                findings["dangling"].append((src, "FORWARD_NODE_IDS", t))
        for s in ("LEADS_TO", "BUILDS_ON", "CROSS_SUBJECT_PREREQS"):
            for t in tokens_of(secs[s]):
                if t not in all_node_files and t.upper() != "N/A":
                    findings["dangling"].append((src, s, t))
        # duplicates on the raw first line
        for s in ("PREREQUISITE_NODE_IDS", "FORWARD_NODE_IDS"):
            toks = tokens_of(secs[s])
            seen = set()
            for t in toks:
                if t in seen and t not in findings["dup_tokens"]:
                    findings["dup_tokens"].append((src, s, t))
                seen.add(t)
        PN[src] = p
        FN[src] = f

        # reasons coverage
        m = re.search(r"^## PREREQUISITE_REASONS[ \t]*\r?\n(.*?)(?=\r?\n## |\Z)",
                      text, re.S | re.M)
        pr_ids = set()
        if m:
            for ln in m.group(1).replace("\r\n", "\n").split("\n"):
                mm = re.match(r"^([A-Za-z0-9_]+)\s*:", ln.strip())
                if mm:
                    pr_ids.add(mm.group(1))
        for t in p:
            if t not in pr_ids:
                findings["prereq_missing_reason"].append((src, t))
        for rid in pr_ids:
            if rid not in p:
                findings["prereq_orphan_reason"].append((src, rid))

    # extra reason-section patterns for sections not in LIST_SECTIONS
    def get_any(text, name):
        m = re.search(r"^## " + name + r"[ \t]*\r?\n(.*?)(?=\r?\n## |\Z)",
                      text, re.S | re.M)
        return m

    for src in sorted(band):
        v = band[src]
        if "_decode_error" in v:
            continue
        text = v["text"]
        fr_sec_m = get_any(text, "FORWARD_REASONS")
        fr_ids = set()
        if fr_sec_m:
            for ln in fr_sec_m.group(1).replace("\r\n", "\n").split("\n"):
                mm = re.match(r"^([A-Za-z0-9_]+)\s*:", ln.strip())
                if mm:
                    fr_ids.add(mm.group(1))
        for t in FN[src]:
            if t not in fr_ids:
                findings["forward_missing_reason"].append((src, t))

    # symmetry
    for src in sorted(PN):
        for t in PN[src]:
            if t in band_ids:
                findings["prereq_edges_intra"] += 1
                if src not in FN.get(t, set()):
                    findings["missing_mirror_intra"].append((src, t))
            else:
                findings["prereq_edges_cross"] += 1
                if src not in FN.get(t, set()):
                    findings["missing_mirror_cross"].append((src, t))
    for src in sorted(FN):
        for t in FN[src]:
            if src in PN.get(t, set()):
                continue
            if t in band_ids:
                findings["orphan_forward_intra"].append((src, t))
            else:
                findings["orphan_forward_cross"].append((src, t))

    # SCC on intra-band prereq graph (band nodes only)
    edges = {s: {t for t in PN.get(s, set()) if t in band_ids}
             for s in band_ids}
    index_counter = [0]
    stack, index, lowlink, on_stack = [], {}, {}, set()
    sccs = []
    for v0 in sorted(band_ids):
        if v0 in index:
            continue
        work = [(v0, iter(sorted(edges.get(v0, ()))))]
        index[v0] = lowlink[v0] = index_counter[0]
        index_counter[0] += 1
        stack.append(v0)
        on_stack.add(v0)
        while work:
            node, it = work[-1]
            advanced = False
            for w in it:
                if w not in index:
                    index[w] = lowlink[w] = index_counter[0]
                    index_counter[0] += 1
                    stack.append(w)
                    on_stack.add(w)
                    work.append((w, iter(sorted(edges.get(w, ())))))
                    advanced = True
                    break
                elif w in on_stack:
                    lowlink[node] = min(lowlink[node], index[w])
            if advanced:
                continue
            work.pop()
            if lowlink[node] == index[node]:
                comp = []
                while True:
                    w = stack.pop()
                    on_stack.discard(w)
                    comp.append(w)
                    if w == node:
                        break
                if len(comp) > 1:
                    sccs.append(sorted(comp))
    findings["cycles_scc"] = sccs

    # summary numbers
    intra = findings["prereq_edges_intra"]
    miss = len(findings["missing_mirror_intra"])
    findings["symmetry_pct_intra"] = round(
        100.0 * (intra - miss) / intra, 3) if intra else 100.0
    findings["counts"] = {
        "na_tokens": len(findings["na_tokens"]),
        "dangling": len(findings["dangling"]),
        "self_loops": len(findings["self_loops"]),
        "dup_tokens": len(findings["dup_tokens"]),
        "missing_mirror_intra": miss,
        "missing_mirror_cross": len(findings["missing_mirror_cross"]),
        "orphan_forward_intra": len(findings["orphan_forward_intra"]),
        "orphan_forward_cross": len(findings["orphan_forward_cross"]),
        "prereq_missing_reason": len(findings["prereq_missing_reason"]),
        "prereq_orphan_reason": len(findings["prereq_orphan_reason"]),
        "forward_missing_reason": len(findings["forward_missing_reason"]),
        "cycles_scc": len(sccs),
        "multiline_list_bodies": len(findings["multiline_list_bodies"]),
    }
    if index_ids is not None:
        findings["band_ids_not_in_index"] = sorted(band_ids - index_ids)[:20]
        findings["band_ids_not_in_index_n"] = len(band_ids - index_ids)

    for k in ("na_tokens", "dangling", "prereq_missing_reason",
              "orphan_forward_intra", "orphan_forward_cross",
              "missing_mirror_intra", "missing_mirror_cross"):
        findings[k + "_sample"] = findings[k][:25]

    json.dump(findings, open(OUT, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1, default=list)
    print("band files:", findings["band_files"])
    print("counts:", json.dumps(findings["counts"], indent=1))
    print("symmetry intra:", findings["symmetry_pct_intra"])
    print("crlf_all:", findings["crlf_all"])
    print("decode_errors:", findings["decode_errors"][:5])
    print("sections_missing:", dict(findings["sections_missing"]))
    if index_ids is not None:
        print("band ids not in loader index:",
              findings["band_ids_not_in_index_n"])
    print("audit ->", OUT)


if __name__ == "__main__":
    sys.exit(main())
