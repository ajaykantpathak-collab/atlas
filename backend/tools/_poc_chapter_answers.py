#!/usr/bin/env python3
"""PoC: one chapter -> exhaustive node-mapped long answers (enriched pack).

Class 10 History ch.2 (Nationalism in India) — inputs:
  - NCERT chapter text          (text_cache_new/jess302.txt)
  - node map id->topic          (source/class_10_history.json)
  - per-node diagnostic answers + wrong-answer signals (marking_points)
  - CBSE marking-scheme spec    (cbse-content skill rules)
  - companion case-study seeds  (*_comp.md for this chapter, if any)

LLM drafts; every marking point names source node(s) for the grounding
check. Output: enhanced_nodes/output/poc_jess302_answers.json
"""
import asyncio
import glob
import json
import os
import re
import sys

import httpx

REPO = r"D:\platform"
BASE = r"C:\Users\Alesha4285\Desktop\enhanced_nodes"
CACHE = r"D:\_KEEP\text_cache_new"
CH = "c10_hist_cbse_02"

chapter_text = open(os.path.join(CACHE, "jess302.txt"),
                    encoding="utf-8", errors="replace").read()

src = json.load(open(os.path.join(BASE, "source", "class_10_history.json"),
                     encoding="utf-8"))
nodes = {n["node_id"]: n["topic"] for n in src
         if n["node_id"].startswith(CH)}
node_block = "\n".join(f"  {nid}: {t}" for nid, t in nodes.items())

# per-node authored diagnostic answers + wrong-answer signals
mp = json.load(open(os.path.join(REPO, "content", "marking_points",
                                 "hist.json"), encoding="utf-8"))
diag_block = []
for nid in nodes:
    entry = mp.get(nid)
    if not entry:
        continue
    for it in entry.get("items", [])[:4]:
        wrong = (" | wrong-answer signal: " + it["wrong_signals"][0]
                 if it.get("wrong_signals") else "")
        diag_block.append(
            f"[{nid}] Q: {it['q']}\n  A: {' '.join(it['points'])[:400]}{wrong}")
diag_text = "\n".join(diag_block)[:24000]

# companion case-study seeds for this chapter (extract-based coverage)
comp_block = ""
for f in glob.glob(os.path.join(
        REPO, "content", "enhanced_nodes_md", f"{CH}_*_comp.md")):
    comp_block += open(f, encoding="utf-8", errors="replace").read()[:3000]

MARKING_SPEC = """CBSE 2025-26 marking scheme:
- 5/6-mark long answer: intro line + one value point per mark + closing line
- each value point = one atomic checkable claim (fact + its role)
- note common errors as "no credit if ..." where the corpus flags them
- dates, names, places must match the chapter text exactly"""

SYSTEM = (
    "You are a senior CBSE History teacher and marking-scheme author. "
    "Write model answers ONLY from the provided chapter text and authored "
    "node material — never import outside facts. Every marking point must "
    "map to the node(s) it draws from.")

PROMPT = f"""CHAPTER: Class 10 History — Nationalism in India (NCERT jess302)

NODES IN THIS CHAPTER (id: topic):
{node_block}

{MARKING_SPEC}

AUTHORED PER-NODE DIAGNOSTIC MATERIAL (ground truth + wrong-answer signals):
{diag_text}

CHAPTER TEXT:
{chapter_text}

{f"COMPANION CASE-STUDY MATERIAL:{chr(10)}{comp_block}" if comp_block else ""}

TASK — exhaustive board-answer coverage for this chapter:
1. Enumerate every distinct 5-mark-style question this chapter can support
   (explain/describe/evaluate/compare/analyse — CBSE 2015-2025 patterns).
   Aim for complete coverage of examinable themes: typically 10-15.
2. For EACH question, write a board-quality model answer: intro line,
   numbered value points (one per mark), closing line.
3. For EACH value point list the node_id(s) it draws from.
4. Where the authored material flags a misconception, add a
   "no_credit_if" note on that point.

Return STRICT JSON only:
{{
  "chapter": "{CH}",
  "questions": [
    {{
      "question": "...",
      "marks": 5,
      "answer": "intro. 1) ... 2) ... closing.",
      "marking_points": [
        {{"point": "atomic checkable claim",
          "node_ids": ["{CH}_003"],
          "no_credit_if": "optional misconception note"}}
      ]
    }}
  ]
}}"""


async def main() -> None:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(REPO, "deploy", ".env"))
    url = "https://generativelanguage.googleapis.com/v1beta/openai"
    key = os.environ["GEMINI_API_KEY"]
    payload = {
        "model": "gemini-flash-latest",
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": PROMPT},
        ],
        "temperature": 0.2,
        "max_tokens": 16000,
    }
    async with httpx.AsyncClient(timeout=300) as c:
        r = await c.post(url + "/chat/completions",
                         headers={"Authorization": f"Bearer {key}"},
                         json=payload)
    print("HTTP", r.status_code)
    if r.status_code != 200:
        print(r.text[:500])
        return
    content = r.json()["choices"][0]["message"]["content"] or ""
    m = re.search(r"\{.*\}", content, re.S)
    if not m:
        print("NO JSON:", content[:800])
        return
    data = json.loads(m.group(0))
    out = os.path.join(BASE, "output", "poc_jess302_answers.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
    qs = data.get("questions", [])
    print(f"questions: {len(qs)}")
    valid_ids = set(nodes)
    for i, q in enumerate(qs, 1):
        nids = {n for mp_ in q.get("marking_points", [])
                for n in mp_.get("node_ids", [])}
        bad = nids - valid_ids
        print(f"  {i}. [{q.get('marks')}m] {str(q.get('question'))[:75]} "
              f"| {len(q.get('marking_points', []))}pts"
              f"{(' | BAD NODES: ' + str(bad)) if bad else ''}")
    print("saved:", out)


if __name__ == "__main__":
    asyncio.run(main())
