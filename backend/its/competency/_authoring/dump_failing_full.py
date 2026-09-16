#!/usr/bin/env python3
"""Dump FULL text (definition + walkthrough + failing diagnostics) for every
still-failing node into _authoring/failing_full/<cluster>.txt for authoring."""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
INDEX = os.path.join(PLATFORM, "_cache", "enhanced_nodes_index.json")


def clean(t):
    t = re.sub(r"\*\*|__|`{1,3}", "", t or "")
    return re.sub(r"[ \t]{2,}", " ", t).strip()


def main():
    det = json.load(open(os.path.join(HERE, "_remaining83.json"),
                         encoding="utf-8"))
    raw = json.load(open(INDEX, encoding="utf-8"))
    nodes = {n["node_id"]: n for n in raw["nodes"]}
    outdir = os.path.join(HERE, "failing_full")
    os.makedirs(outdir, exist_ok=True)
    by_file = {}
    for nid, v in sorted(det.items()):
        n = nodes[nid]
        lines = ["=" * 100,
                 f"NODE {nid} verdict={v['verdict']} cluster={v['cluster']} "
                 f"failing_abs={v['failing_abs']}",
                 f"DEFINITION: {clean(n['definition'])}",
                 f"WALKTHROUGH: {clean(n['walkthrough'])[:2200]}"]
        for fa in v["failing_abs"]:
            d = n["diagnostics"][fa - 1]
            lines.append(f"D{fa} Q: {clean(d['q'])}")
            lines.append(f"D{fa} A: {clean(d['a'])}")
        key = f"{n['class']}_{n['subject']}"
        by_file.setdefault(key, []).append("\n".join(lines))
    for key, chunks in sorted(by_file.items()):
        with open(os.path.join(outdir, f"{key}.txt"), "w",
                  encoding="utf-8") as f:
            f.write("\n\n".join(chunks) + "\n")
    print("wrote", len(by_file), "files to", outdir)


if __name__ == "__main__":
    main()
