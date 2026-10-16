"""Verify hygiene of every authored payload string (no LLM, no slop, no ids, no latex)."""
import warnings
warnings.filterwarnings("ignore")
import glob
import json
import os
import re

banned = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem", "NaN"]
banned_re = [re.compile(r"\b" + re.escape(b) + r"\b", re.I) for b in banned]
nodeid = re.compile(r"\bc\d{1,2}_[a-z]+_[a-z0-9_]+", re.I)
latex = re.compile(r"\\[a-zA-Z]+|\\\(|\\\[|\$[^$]+\$")
float15 = re.compile(r"\b\d\.\d{10,}\b")

HERE = os.path.dirname(os.path.abspath(__file__))
hits = []
n_texts = 0
payloads = sorted(glob.glob(os.path.join(HERE, "authoring", "batch_*.json")))
payloads.append(os.path.join(HERE, "authoring_hand_special.json"))
for pf in payloads:
    payload = json.load(open(pf, encoding="utf-8"))
    for edit in payload["edits"]:
        texts = []
        if edit.get("definition"):
            texts.append(("DEFINITION", edit["definition"]))
        if edit.get("walkthrough_append"):
            texts.append(("WALKTHROUGH+", edit["walkthrough_append"]))
        if edit.get("walkthrough_replace"):
            texts.append(("WALKTHROUGH", edit["walkthrough_replace"]))
        for sec, body in (edit.get("set_sections") or {}).items():
            texts.append((sec, body))
        for n, pair in (edit.get("set_diag") or {}).items():
            if pair.get("question"):
                texts.append(("Q" + n, pair["question"]))
            if pair.get("answer"):
                texts.append(("A" + n, pair["answer"]))
        for sec, body in texts:
            n_texts += 1
            for b, rx in zip(banned, banned_re):
                m = rx.search(body)
                if m:
                    hits.append((os.path.basename(pf), edit["file"], sec, b, m.group(0)))
            m = nodeid.search(body)
            if m:
                hits.append((os.path.basename(pf), edit["file"], sec, "nodeid", m.group(0)))
            m = latex.search(body)
            if m:
                hits.append((os.path.basename(pf), edit["file"], sec, "latex", m.group(0)[:30]))
            if float15.search(body):
                hits.append((os.path.basename(pf), edit["file"], sec, "float15", ""))

print("authored texts scanned:", n_texts)
print("hygiene hits in authored text:", len(hits))
for h in hits[:20]:
    print("  ", h)
