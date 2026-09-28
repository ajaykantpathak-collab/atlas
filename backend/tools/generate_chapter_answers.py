#!/usr/bin/env python3
"""Chapter-wise board-answer generator — the non-STEM long-answer pipeline.

For every (class, subject, chapter) group in the enhanced_nodes source:
  grounding = NCERT chapter text (text_cache_new) + node map +
              per-node authored diagnostic answers/wrong-signals
  model     = nvidia/nemotron-3-ultra-550b-a55b (fallback: super-120b)
  output    = content/model_answers/<class>_<subject>_ch<NN>.json
              {questions:[{question,marks,answer,marking_points:[{point,
              node_ids,no_credit_if}]}]}

Runs on ONE pinned NVIDIA key (GEN_PIPELINE_KEY_INDEX env, default 1) so
generate.py can run in parallel on the other key.  Deliberately slow:
one request every DISPATCH_S seconds (default 4s) — ultra is slow anyway
and NIM congestion punishes bursts.

Resume-safe: skips chapters whose output file already exists.
Validation: JSON parses, >=4 questions, every marking point cites a valid
node_id — failures retry once on the fallback model then are logged.
"""
import asyncio
import glob
import itertools
import json
import os
import re
import sys
import time
from collections import defaultdict

import httpx

REPO = r"D:\platform"
BASE = r"C:\Users\Alesha4285\Desktop\enhanced_nodes"
SRC_DIR = os.path.join(BASE, "source")
CACHE = r"D:\_KEEP\text_cache_new"
MP_DIR = os.path.join(REPO, "content", "marking_points")
# deploy/content is bind-mounted into the backends at /app/content --
# packs written here are live immediately (no image rebuild needed).
OUT_DIR = os.path.join(REPO, "deploy", "content", "model_answers")
os.makedirs(OUT_DIR, exist_ok=True)

NVIDIA_BASE = "https://integrate.api.nvidia.com/v1"
KEYS = [
    "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",
    "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",
]
KEY = KEYS[int(os.environ.get("GEN_PIPELINE_KEY_INDEX", "1"))]
MODEL = "nvidia/nemotron-3-ultra-550b-a55b"
FALLBACK = "nvidia/nemotron-3-super-120b-a12b"
DISPATCH_S = float(os.environ.get("DISPATCH_S", "4"))
MAX_TEXT = 110_000          # chars of chapter text per call
MAX_DIAG = 24_000           # chars of authored diagnostic material

MARKING_SPEC = """CBSE 2025-26 marking scheme:
- 5/6-mark long answer: intro line + one value point per mark + closing line
- 3-mark short answer: three compact value points
- each value point = ONE atomic claim — never join two facts with "and"
- dates, names, places must match the chapter text exactly
- note common errors as "no_credit_if" where authored material flags them"""

GOLD_EXEMPLAR = """GOLD EXEMPLAR (the quality bar — notice atomicity + node mapping):
{"question": "Analyse the provisions of the Rowlatt Act (1919) and explain
 why Gandhi called for a nationwide hartal on 6 April 1919.", "marks": 5,
 "answer": "The Rowlatt Act granted sweeping detention powers, and Gandhi
 answered it with peaceful mass protest. 1) The Act allowed imprisonment of
 any person suspected of sedition without trial for up to two years. 2) It
 denied the right to appeal. 3) It was passed despite unanimous opposition
 of Indian members of the Imperial Legislative Council. 4) Gandhi viewed it
 as a violation of civil liberties and called an all-India hartal on
 6 April 1919. 5) The hartal was the first nationwide civil-disobedience
 action, marking the shift from petitioning to mass resistance.",
 "marking_points": [
  {"point": "imprisonment without trial for up to two years",
   "node_ids": ["<node covering the Act>"]},
  {"point": "denied the right to appeal", "node_ids": ["<same node>"]},
  {"point": "passed despite unanimous Indian opposition",
   "node_ids": ["<same node>"]},
  {"point": "Gandhi called the all-India hartal on 6 April 1919",
   "node_ids": ["<same node>"]},
  {"point": "first nationwide civil-disobedience action",
   "node_ids": ["<same node>"]}]}"""

THEME_CHECKLIST = """COVERAGE CHECKLIST — a chapter's exhaustive set must span:
  causes/context, key events (with dates), processes/mechanisms,
  personalities/groups, effects/impact, limits/criticism, comparisons,
  and source/extract-style prompts where the chapter supports them.
Aim for 8-15 five-mark questions; add 3-mark questions for isolated facts
that don't support a full long answer.  Every node must be referenced at
least once — leave nothing examinable uncovered."""

SYSTEM = (
    "You are a senior CBSE teacher and marking-scheme author. Write model "
    "answers ONLY from the provided chapter text and authored node material "
    "- never import outside facts. Every marking point must map to the "
    "node(s) it draws from. Return strict JSON only.")


def load_sources():
    """Group source nodes by (class, subject, chapter)."""
    chapters = defaultdict(list)
    for f in sorted(glob.glob(os.path.join(SRC_DIR, "class_*.json"))):
        for n in json.load(open(f, encoding="utf-8")):
            key = (n.get("class_level"), (n.get("subject") or "").lower(),
                   n.get("chapter") or n.get("chapter_num") or 0,
                   n.get("chapter_name") or "")
            chapters[key].append(n)
    return chapters


_MP_IDX = None
def mp_index():
    global _MP_IDX
    if _MP_IDX is None:
        try:
            _MP_IDX = json.load(open(os.path.join(MP_DIR, "_index.json"),
                                     encoding="utf-8"))
        except OSError:
            _MP_IDX = {}
    return _MP_IDX


def node_diag(nid):
    subj = mp_index().get(nid)
    if not subj:
        return None
    try:
        return json.load(open(os.path.join(MP_DIR, subj + ".json"),
                              encoding="utf-8")).get(nid)
    except OSError:
        return None


def chapter_text(ncert_files):
    parts = []
    for nf in ncert_files:
        p = os.path.join(CACHE, nf)
        if os.path.exists(p):
            parts.append(open(p, encoding="utf-8",
                              errors="replace").read())
    return "\n\n".join(parts)[:MAX_TEXT]


def build_prompt(cls, subject, chapter_name, nodes, text):
    node_block = "\n".join(
        f"  {n['node_id']}: {n.get('topic','')}" for n in nodes)
    diag = []
    for n in nodes:
        e = node_diag(n["node_id"])
        if not e:
            continue
        for it in e.get("items", [])[:3]:
            w = (" | wrong: " + it["wrong_signals"][0]
                 if it.get("wrong_signals") else "")
            diag.append(f"[{n['node_id']}] Q: {it['q']}\n"
                        f"  A: {' '.join(it['points'])[:350]}{w}")
    hindi = subject.startswith("hindi")
    lang = ("Write questions and model answers in Hindi (Devanagari) since "
            "this is a Hindi subject." if hindi else
            "Write questions and model answers in English.")
    return f"""CLASS {cls} {subject.upper()} — chapter "{chapter_name}"
{lang}

NODES IN THIS CHAPTER (id: topic):
{node_block}

{MARKING_SPEC}

{THEME_CHECKLIST}

{GOLD_EXEMPLAR}

AUTHORED PER-NODE MATERIAL (ground truth + wrong-answer signals):
{chr(10).join(diag)[:MAX_DIAG] or "(none — rely on chapter text only)"}

CHAPTER TEXT (NCERT):
{text or "(unavailable — rely on authored node material only)"}

TASK — exhaustive board-answer coverage for THIS chapter:
1. Enumerate every distinct 5-mark-style question this chapter supports
   (explain/describe/evaluate/compare/analyse; CBSE patterns). Complete
   coverage of examinable themes — typically 8-15.
2. For EACH: board-quality model answer (intro + numbered value points,
   one per mark + closing line).
3. Each value point lists the node_id(s) it draws from.
4. "no_credit_if" note where authored material flags a misconception.

STRICT JSON:
{{"chapter": "{chapter_name}", "questions": [{{"question": "...",
"marks": 5, "answer": "intro. 1) ... 2) ...",
"marking_points": [{{"point": "...", "node_ids": ["..."],
"no_credit_if": "..."}}]}}]}}"""


async def call_llm(prompt, model, retries=15):
    """NIM 503s/429s under congestion — retry with capped backoff, same
    discipline as generate.py (first attempts cheap, retries patient)."""
    # Round-robin across all keys — both keys free once generate.py finishes
    # (GEN_PIPELINE_KEY_INDEX pins a single key when it is still running).
    _key_pool = ([KEYS[int(os.environ["GEN_PIPELINE_KEY_INDEX"])]]
                 if "GEN_PIPELINE_KEY_INDEX" in os.environ else list(KEYS))
    _kr = itertools.count()
    for attempt in range(retries):
        # ultra for the first 10 attempts, super for the last 5
        use_model = model if attempt < 10 else FALLBACK
        try:
            async with httpx.AsyncClient(timeout=600) as c:
                r = await c.post(
                    NVIDIA_BASE + "/chat/completions",
                    headers={"Authorization": f"Bearer {_key_pool[next(_kr) % len(_key_pool)]}",
                             "Content-Type": "application/json"},
                    json={"model": use_model, "messages": [
                        {"role": "system", "content": SYSTEM},
                        {"role": "user", "content": prompt}],
                        "temperature": 0.2, "max_tokens": 32000})
        except Exception as e:
            await asyncio.sleep(min(3 * (attempt + 1), 15))
            continue
        if r.status_code == 200:
            content = r.json()["choices"][0]["message"].get("content") or ""
            m = re.search(r"\{.*\}", content, re.S)
            if not m:
                return None, "no json"
            try:
                return json.loads(m.group(0)), None
            except json.JSONDecodeError:
                return None, "bad json"
        if r.status_code in (429, 500, 502, 503, 504):
            await asyncio.sleep(min(3 * (attempt + 1), 15))
            continue
        return None, f"HTTP {r.status_code}"
    return None, "retries exhausted"


def validate(data, valid_ids):
    """Hard-fail on structural defects; record soft quality flags."""
    qs = (data or {}).get("questions") or []
    if len(qs) < 4:
        return "too few questions", None
    flags = {}
    used_nodes = set()
    compound_pts = 0
    for q in qs:
        if not q.get("answer") or not q.get("marking_points"):
            return "missing answer/points", None
        for mp_ in q["marking_points"]:
            bad = set(mp_.get("node_ids") or []) - valid_ids
            if bad:
                return f"bad node ref {bad}", None
            used_nodes.update(mp_.get("node_ids") or [])
            pt = mp_.get("point") or ""
            # compound points defeat per-mark grading
            if re.search(r"\b(and|while|whereas|both)\b.*\b(and|which)\b",
                         pt.lower()):
                compound_pts += 1
    uncovered = valid_ids - used_nodes
    if uncovered:
        flags["uncovered_nodes"] = sorted(uncovered)
    if compound_pts:
        flags["compound_points"] = compound_pts
    total_pts = sum(len(q.get("marking_points") or []) for q in qs)
    flags["avg_points_per_q"] = round(total_pts / max(1, len(qs)), 1)
    return None, flags


async def gen_chapter(cls, subject, chnum, chname, nodes):
    valid = {n["node_id"] for n in nodes}
    texts = sorted({n.get("ncert_file") for n in nodes
                    if n.get("ncert_file")})
    text = chapter_text(texts)
    prompt = build_prompt(cls, subject, chname, nodes, text)
    data, err = await call_llm(prompt, MODEL)
    if err is None:
        verr, flags = validate(data, valid)
        if verr is None:
            data["_meta"] = {"class": cls, "subject": subject,
                             "chapter_num": chnum, "model": MODEL,
                             "ncert_files": texts,
                             "quality": flags or {}}
            return data, None
        err = verr
    return None, err


async def main():
    chapters = load_sources()
    print(f"{len(chapters)} chapters | model={MODEL} | "
          f"key_idx={os.environ.get('GEN_PIPELINE_KEY_INDEX','1')} | "
          f"dispatch={DISPATCH_S}s")

    # sort for determinism; skip existing outputs (resume)
    todo = []
    for (cls, subject, chnum, chname), nodes in sorted(
            chapters.items(), key=lambda kv: (kv[0][0], kv[0][1],
                                              str(kv[0][2]))):
        chkey = (f"{int(chnum):02d}" if str(chnum).isdigit()
                 else re.sub(r"[^a-z0-9]+", "_", str(chnum).lower())[:40])
        out = os.path.join(OUT_DIR,
                           f"c{cls}_{subject}_ch{chkey}.json")
        if os.path.exists(out):
            continue
        todo.append((cls, subject, chnum, chname, nodes, out))
    print(f"{len(todo)} to generate "
          f"({len(chapters)-len(todo)} already done)")

    # QUEUE-1 promotion: unanswered student questions vote for their
    # chapters — generate those packs first (demand-driven coverage).
    queue_file = os.path.join(REPO, "runtime_data", "answer_queue.jsonl")
    if os.path.exists(queue_file):
        try:
            sys.path.insert(0, REPO)
            os.environ.setdefault(
                "HF_HOME", os.path.join(REPO, "runtime_data", "hf_cache"))
            from backend.services.enhanced_nodes import (
                load_index, _semantic_hits)
            index = load_index()
            hot = set()
            for line in open(queue_file, encoding="utf-8"):
                try:
                    q = json.loads(line)["question"]
                except Exception:
                    continue
                for nid in _semantic_hits(index, q.lower(), 3):
                    node = index.nodes.get(nid)
                    if node:
                        hot.add((int(node["class"]),
                                 (node.get("subject") or "").lower(),
                                 node.get("chapter")))
            if hot:
                def rank(item):
                    cls, subject, chnum, chname, nodes, out = item
                    return 0 if (cls, subject, chnum) in hot else 1
                todo.sort(key=rank)
                print(f"queue-promoted {len(hot)} chapters first")
        except Exception as e:
            print(f"queue read skipped: {type(e).__name__}")

    limit = int(os.environ.get("CHAPTER_LIMIT", "0"))
    if limit:
        todo = todo[:limit]

    sem = asyncio.Semaphore(int(os.environ.get("CONCURRENCY", "3")))   # ultra is slow; keep N in flight max
    last = [0.0]

    async def one(cls, subject, chnum, chname, nodes, out):
        async with sem:
            # global pacing
            dt = time.time() - last[0]
            if dt < DISPATCH_S:
                await asyncio.sleep(DISPATCH_S - dt)
            last[0] = time.time()
            try:
                data, err = await gen_chapter(cls, subject, chnum,
                                              chname, nodes)
            except Exception as e:
                data, err = None, type(e).__name__
            if data is not None:
                with open(out, "w", encoding="utf-8") as fh:
                    json.dump(data, fh, ensure_ascii=False, indent=1)
                print(f"OK  c{cls} {subject} ch{chnum} "
                      f"({len(data['questions'])}q)", flush=True)
            else:
                print(f"ERR c{cls} {subject} ch{chnum}: {err}",
                      flush=True)

    await asyncio.gather(*[one(*t) for t in todo])
    print("done.")


if __name__ == "__main__":
    asyncio.run(main())
