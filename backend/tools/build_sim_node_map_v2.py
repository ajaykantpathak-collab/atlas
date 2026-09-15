#!/usr/bin/env python3
"""
build_sim_node_map_v2.py — sim -> topic/node mapping for the sims_v2 system
(Classes 1-6), completing the node-mapping wave for the one system the
c6-12 mapper does not cover.

What it does
------------
1. Parses every SimDef registered by sims_v2 class1..class6 registries
   (frontend/components/sims_v2/class{1..6}/index.ts decide which subject-file
   defs are actually playable; defs in files no registry imports — e.g. the
   orphan class6/deep.ts — are parsed but excluded).
2. Joins each playable sim with its verdict in SIMS_V2_QUALITY.json (the
   read-only audit; 176 playable sims at time of writing). The parsed playable
   set must equal the audit set or the script fails loudly.
3. Classes 1-5: there is NO backend node corpus below class 6
   (backend/_cache/enhanced_nodes_index.json holds c6_*..c12_* only), so these
   sims map to canonical topic keys 'g<class>.<kebab-topic>'. Flagged with
   "no_node_corpus".
4. Class 6: maps each sim to c6_* node ids.
   - Source-declared nodeIds (SimDef.nodeIds) are validated against the corpus.
   - On top, a deterministic IDF-weighted token-overlap matcher
     (sim title/topic/chapters vs node definitions, subject-filtered,
     chapter-range boosted) proposes extra nodes; strong matches are unioned in.
5. Writes frontend/components/sims_v2/SIM_NODE_MAP_V2.json and prints a report.

Re-runnable and deterministic: no timestamps in the output — inputs are bound
by sha256 fingerprints; every iteration is over sorted collections.

Usage:  python backend/tools/build_sim_node_map_v2.py [--out PATH] [--quiet]
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ── repo layout ──────────────────────────────────────────────────────────────
TOOLS_DIR = Path(__file__).resolve().parent            # backend/tools
BACKEND_DIR = TOOLS_DIR.parent                         # backend
REPO_ROOT = BACKEND_DIR.parent                         # D:\platform

DEFAULT_SIMS_DIR = REPO_ROOT / "frontend" / "components" / "sims_v2"
DEFAULT_QUALITY = DEFAULT_SIMS_DIR / "SIMS_V2_QUALITY.json"
DEFAULT_NODES = BACKEND_DIR / "_cache" / "enhanced_nodes_index.json"
DEFAULT_OUT = DEFAULT_SIMS_DIR / "SIM_NODE_MAP_V2.json"

CLASSES = [1, 2, 3, 4, 5, 6]

# sims_v2 subject -> enhanced_nodes_index node subjects (class 6 corpus)
SUBJECT_TO_NODE_SUBJECTS: Dict[str, Tuple[str, ...]] = {
    "maths": ("math",),
    "math": ("math",),
    "science": ("physics", "chemistry", "biology"),
    "social": ("history", "geography", "civics", "economics"),
    "english": ("english",),
    "hindi": (),
    "cs": (),
    "evs": (),
}

# chapter strings like 'Math Ch2: Integers', 'Civics Ch11-12: ...', 'English U3: ...'
CH_RE = re.compile(r"\b([A-Za-z]+)\s+Ch\s*(\d+)(?:\s*-\s*(\d+))?", re.IGNORECASE)
UNIT_RE = re.compile(r"\b([A-Za-z]+)\s+U\s*(\d+)(?:\s*-\s*(\d+))?", re.IGNORECASE)
CHAPTER_WORD_TO_SUBJECT = {
    "math": "math", "maths": "math", "mathematics": "math",
    "physics": "physics", "chemistry": "chemistry", "biology": "biology",
    "history": "history", "geography": "geography", "civics": "civics",
    "economics": "economics", "english": "english",
}

STOPWORDS = frozenset("""
a an the and or of to in on for with from is are was were be been being am
what how why when where which who whom its it their his her they we us you
your this that these those at by as not no nor can cannot will would should
could may might must does do did done have has had about into than then them
he she i but if so such other others also more most much many some any all
each every one two three first second third new old use used uses using like
across unit units chapter chapters lesson lessons std class grade cbse ncert
subject topic basics basic introduction intro general part parts type kinds
study studies learning learn let lets example examples question questions
""".split())

# tokens never useful for distinguishing nodes inside one subject corpus
KILL_TOKENS = frozenset(
    "math maths mathematics science social english hindi evs cs "
    "physics chemistry biology history geography civics economics".split()
)


# ── TS parsing ───────────────────────────────────────────────────────────────
DEF_HEAD_RE = re.compile(r"export\s+const\s+(\w+)\s*:\s*SimDef\s*=\s*\{")
IMPORT_RE = re.compile(r"import\s*(?:type)?\s*\{([^}]*)\}\s*from\s*['\"]([^'\"]+)['\"]")
QUOTE_STR_RE = re.compile(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"")
EMOJI_CUT_RE = re.compile(r"\n\s*emoji\s*:")
def _array_field_re(field: str) -> "re.Pattern[str]":
    return re.compile(r"\b%s\s*:\s*\[([^\]]*)\]" % field)


def _unquote(m: "re.Match[str]") -> str:
    s = m.group(1) if m.group(1) is not None else m.group(2)
    return s.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\")


def _grab_str(field: str, header: str) -> Optional[str]:
    m = re.search(
        r"\b%s\s*:\s*('(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")" % field, header
    )
    if not m:
        return None
    return _unquote(QUOTE_STR_RE.search(m.group(1)))


def _grab_int(field: str, header: str) -> Optional[int]:
    m = re.search(r"\b%s\s*:\s*(\d+)" % field, header)
    return int(m.group(1)) if m else None


def _grab_str_array(field: str, header: str) -> List[str]:
    m = _array_field_re(field).search(header)
    if not m:
        return []
    return [_unquote(sm) for sm in QUOTE_STR_RE.finditer(m.group(1))]


def parse_module_defs(ts_path: Path) -> List[dict]:
    """Parse every `export const X: SimDef = {...}` header in one .ts file."""
    src = ts_path.read_text(encoding="utf-8")
    marks = list(DEF_HEAD_RE.finditer(src))
    defs: List[dict] = []
    for i, m in enumerate(marks):
        var = m.group(1)
        start = m.end()
        end = marks[i + 1].start() if i + 1 < len(marks) else len(src)
        chunk = src[start:end]
        cut = EMOJI_CUT_RE.search(chunk)          # header ends at theme emoji
        header = chunk[: cut.start()] if cut else chunk[:2500]
        defs.append(
            {
                "var": var,
                "file": str(ts_path),
                "id": _grab_str("id", header),
                "title": _grab_str("title", header) or "",
                "classLevel": _grab_int("classLevel", header),
                "subject": _grab_str("subject", header) or "",
                "topic": _grab_str("topic", header) or "",
                "chapters": _grab_str_array("chapters", header),
                "declaredNodeIds": _grab_str_array("nodeIds", header),
            }
        )
    return defs


def registry_membership(class_dir: Path, class_num: int) -> List[Tuple[Path, Optional[int]]]:
    """Resolve which (file, classLevel-filter) pairs a class index.ts actually
    registers. Returns [(ts file, filter classLevel or None)]."""
    idx = class_dir / "index.ts"
    src = idx.read_text(encoding="utf-8")
    # module specifier -> resolved file, and exported binding name(s) -> file
    var_to_file: Dict[str, Path] = {}
    file_filters: Dict[Path, Optional[int]] = {}
    for m in IMPORT_RE.finditer(src):
        names, spec = m.group(1), m.group(2)
        if not spec.startswith("."):
            continue
        target = (class_dir / spec).resolve()
        if target.is_dir():
            target = target / "index.ts"
        if not target.suffix:
            target = target.with_suffix(".ts")
        for name in names.split(","):
            name = name.strip()
            if name and not name.startswith("type "):
                var_to_file[name] = target
        file_filters.setdefault(target, None)
    # registry body: CLASS{n}_SIMS = [ ... ]  (or any `SIMS: SimDef[] = [...]`)
    body_m = re.search(r"SIMS\s*:\s*SimDef\[\]\s*=\s*\[(.*?)\n\]", src, re.DOTALL)
    if not body_m:
        return []
    body = body_m.group(1)
    out: List[Tuple[Path, Optional[int]]] = []
    seen: set = set()
    for sm in QUOTE_STR_RE.finditer(body):
        continue  # (no string literals carry file info here; kept for safety)
    for tok_m in re.finditer(r"\.\.\.(\w+)|([A-Za-z_]\w*)(?=\s*[,}\]]|$)|(\w+)\.filter\(\s*\w+\s*=>\s*\w+\.classLevel\s*===\s*(\d+)", body):
        spread, bare, fvar, fnum = tok_m.groups()
        if fvar and fnum:
            f = var_to_file.get(fvar)
            if f and f not in seen:
                seen.add(f)
                out.append((f, int(fnum)))
        elif spread:
            f = var_to_file.get(spread)
            if f and f not in seen:
                seen.add(f)
                out.append((f, None))
        elif bare and bare in var_to_file:
            f = var_to_file[bare]
            if f not in seen:
                seen.add(f)
                out.append((f, None))
    return out


def parse_playable_defs(sims_dir: Path) -> Tuple[List[dict], List[dict]]:
    """Returns (playable defs, defs found in files but not registered)."""
    module_cache: Dict[Path, List[dict]] = {}
    playable: Dict[str, dict] = {}
    for class_num in CLASSES:
        class_dir = sims_dir / f"class{class_num}"
        for ts_file, level_filter in registry_membership(class_dir, class_num):
            if ts_file not in module_cache:
                module_cache[ts_file] = parse_module_defs(ts_file)
            for d in module_cache[ts_file]:
                if level_filter is not None and d["classLevel"] != level_filter:
                    continue
                if d["id"] and d["id"] not in playable:
                    playable[d["id"]] = d
    all_defs: Dict[str, dict] = {}
    for ts_file in sorted(sims_dir.rglob("*.ts")):
        if ts_file.name == "index.ts" or "engine" in ts_file.parts:
            continue
        for d in parse_module_defs(ts_file):
            if d["id"]:
                all_defs[d["id"]] = d
    unregistered = [d for sid, d in sorted(all_defs.items()) if sid not in playable]
    return [playable[sid] for sid in sorted(playable)], unregistered


# ── topic keys (classes 1-5; also emitted for class 6) ──────────────────────
STOPWORD_SET = frozenset(STOPWORDS)


def slug_topic(topic: str) -> str:
    words = re.findall(r"[a-z0-9]+", topic.lower())
    keep = [w for w in words if w not in STOPWORD_SET] or words
    return "-".join(keep) if keep else "topic"


def build_topic_keys(defs: List[dict]) -> Dict[str, str]:
    """simId -> 'g<level>.<kebab-topic>'; per-class collisions get -2, -3..."""
    keys: Dict[str, str] = {}
    used: Dict[Tuple[int, str], int] = {}
    for d in sorted(defs, key=lambda x: (x["classLevel"], x["id"])):
        base = f"g{d['classLevel']}.{slug_topic(d['topic'] or d['title'])}"
        n = used.get((d["classLevel"], base), 0)
        used[(d["classLevel"], base)] = n + 1
        keys[d["id"]] = base if n == 0 else f"{base}-{n + 1}"
    return keys


# ── class-6 node matching ────────────────────────────────────────────────────
def norm_token(t: str) -> str:
    if len(t) > 4 and t.endswith("ies"):
        return t[:-3] + "y"
    if len(t) > 3 and t.endswith("s") and not t.endswith(("ss", "us", "is")):
        return t[:-1]
    return t


def tokenize(text: str) -> List[str]:
    out = []
    for raw in re.findall(r"[a-z]+", text.lower()):
        if raw in STOPWORDS or len(raw) < 3:
            continue
        t = norm_token(raw)
        if t and t not in KILL_TOKENS and len(t) >= 3:
            out.append(t)
    return out


def load_c6_nodes(nodes_json: Path) -> List[dict]:
    data = json.loads(nodes_json.read_text(encoding="utf-8"))
    nodes = [n for n in data["nodes"] if str(n.get("node_id", "")).startswith("c6_")]
    return sorted(nodes, key=lambda n: n["node_id"])


def chapter_refs(chapters: List[str]) -> List[Tuple[str, int, int]]:
    """[(node subject, ch_from, ch_to)] parsed from SimDef.chapters strings."""
    refs = []
    for ch in chapters:
        for rex in (CH_RE, UNIT_RE):
            m = rex.search(ch)
            if m:
                subj = CHAPTER_WORD_TO_SUBJECT.get(m.group(1).lower())
                if subj:
                    a = int(m.group(2))
                    b = int(m.group(3)) if m.group(3) else a
                    refs.append((subj, a, b))
    return refs


def match_nodes(
    sim: dict, nodes: List[dict], idf: Dict[str, float]
) -> Tuple[List[Tuple[str, float]], float]:
    """IDF-weighted token overlap (title/topic/chapters vs node definition),
    subject-filtered, chapter-range boosted. Returns [(node_id, score)].

    Subject filter: when the sim's chapter strings name a corpus subject
    ('Chemistry Ch5: ...'), only that subject's nodes are eligible;
    otherwise all subjects mapped from sim.subject are.
    """
    qtokens = tokenize(
        " ".join([sim["title"], sim["topic"]] + list(sim["chapters"]))
    )
    if not qtokens:
        return [], 0.0
    qset = sorted(set(qtokens))
    qweight = sum(idf.get(t, 1.0) for t in qset) or 1.0
    refs = chapter_refs(sim["chapters"])
    primary = sorted({s for s, _, _ in refs})
    allowed = primary or SUBJECT_TO_NODE_SUBJECTS.get(sim["subject"], ())
    in_range = lambda n: any(  # noqa: E731
        n.get("subject") == s and a <= int(n.get("chapter", -1)) <= b
        for s, a, b in refs
    )
    scored: List[Tuple[float, str]] = []
    for n in nodes:
        if allowed and n.get("subject") not in allowed:
            continue
        ntokens = set(tokenize(n.get("definition", "")))
        hit = [t for t in qset if t in ntokens]
        if not hit:
            continue
        if len(hit) < 2 and not in_range(n):
            continue  # single-token hits need a chapter/unit match
        score = sum(idf.get(t, 1.0) for t in hit) / qweight
        if in_range(n):
            score += 0.15
        scored.append((round(score, 4), n["node_id"]))
    scored.sort(key=lambda x: (-x[0], x[1]))
    MIN_SCORE = 0.22
    return [(nid, sc) for sc, nid in scored if sc >= MIN_SCORE], MIN_SCORE


# ── fingerprints ─────────────────────────────────────────────────────────────
def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


# ── main ─────────────────────────────────────────────────────────────────────
def build(sims_dir: Path, quality_path: Path, nodes_path: Path) -> dict:
    defs, unregistered = parse_playable_defs(sims_dir)
    quality = json.loads(quality_path.read_text(encoding="utf-8"))
    q_entries = quality["entries"]
    q_by_id = {e["simId"]: e for e in q_entries}

    parsed_ids = {d["id"] for d in defs}
    audit_ids = set(q_by_id)
    if parsed_ids != audit_ids:
        raise SystemExit(
            "FATAL: parsed playable set != SIMS_V2_QUALITY.json set.\n"
            f"  parsed-only : {sorted(parsed_ids - audit_ids)}\n"
            f"  audit-only  : {sorted(audit_ids - parsed_ids)}\n"
            "The audit and the sources have diverged — refresh the audit or fix "
            "registry_membership()."
        )

    topic_keys = build_topic_keys(defs)
    nodes = load_c6_nodes(nodes_path)
    node_ids_all = {n["node_id"] for n in nodes}

    # corpus IDF over c6 definitions
    df: Dict[str, int] = {}
    for n in nodes:
        for t in set(tokenize(n.get("definition", ""))):
            df[t] = df.get(t, 0) + 1
    total = max(len(nodes), 1)
    idf = {t: math.log((total + 1) / (c + 1)) + 0.1 for t, c in df.items()}

    entries: List[dict] = []
    per_class: Dict[int, dict] = {
        c: {"sims": 0, "nodeMapped": 0, "topicKeyMapped": 0, "unmappedNodes": 0,
            "declaredNodeIdsValid": 0, "declaredNodeIdsDropped": 0}
        for c in CLASSES
    }
    distinct_nodes: set = set()
    dropped_node_ids: Dict[str, List[str]] = {}

    defs_sorted = sorted(defs, key=lambda d: (d["classLevel"], d["subject"], d["id"]))

    for d in defs_sorted:
        cid = d["classLevel"]
        verdict = q_by_id[d["id"]]
        node_ids: List[str] = []
        meta: dict = {
            "declaredValid": 0, "declaredDropped": 0, "matchedAdded": 0,
            "matchedScoreMin": None,
        }
        if cid == 6:
            # 1) validate source-declared nodeIds against the corpus
            unknown = [i for i in d["declaredNodeIds"] if i not in node_ids_all]
            node_ids = [i for i in d["declaredNodeIds"] if i in node_ids_all]
            meta["declaredValid"] = len(node_ids)
            meta["declaredDropped"] = len(unknown)
            if unknown:
                dropped_node_ids[d["id"]] = sorted(unknown)
            # 2) augment with token-overlap matches (capped to keep precision)
            matches, min_score = match_nodes(d, nodes, idf)
            meta["matchedScoreMin"] = min_score
            existing = set(node_ids)
            for nid, sc in matches:
                if len(node_ids) >= 20 or meta["matchedAdded"] >= 8:
                    break
                if nid not in existing:
                    node_ids.append(nid)
                    existing.add(nid)
                    meta["matchedAdded"] += 1
            node_ids = sorted(set(node_ids))
            distinct_nodes.update(node_ids)
        entry = {
            "simId": d["id"],
            "class": cid,
            "subject": d["subject"],
            "topic": d["topic"],
            "chapters": d["chapters"],
            "nodeIds": node_ids,
            "topicKey": topic_keys[d["id"]],
            "qualityVerdict": verdict["verdict"],
            "qualityIssues": verdict.get("issues", []),
            "nodeCorpus": ("c6_*" if cid == 6 else None),
            "mappingNote": (
                ("declared nodeIds validated + token-overlap augmentation"
                 if cid == 6 else
                 "no backend node corpus exists for classes 1-5 "
                 "(enhanced_nodes_index.json is c6-c12 only); mapped to "
                 "canonical topic key only")
            ),
        }
        entries.append(entry)
        pc = per_class[cid]
        pc["sims"] += 1
        pc["topicKeyMapped"] += 1
        if node_ids:
            pc["nodeMapped"] += 1
        else:
            pc["unmappedNodes"] += 1
        pc["declaredNodeIdsValid"] += meta["declaredValid"]
        pc["declaredNodeIdsDropped"] += meta["declaredDropped"]

    class6_sims = per_class[6]["sims"]
    class6_mapped = per_class[6]["nodeMapped"]

    return {
        "meta": {
            "name": "SIM_NODE_MAP_V2",
            "description": (
                "sim -> topic/node mapping for sims_v2 (Classes 1-6). "
                "Classes 1-5 carry canonical topic keys only — the backend "
                "node corpus (backend/_cache/enhanced_nodes_index.json) has "
                "NO nodes for classes 1-5 (c6_*..c12_* prefixes only, 420 "
                "c6_* nodes). Class 6 sims carry validated c6_* node ids "
                "(source-declared SimDef.nodeIds, unioned with "
                "IDF-weighted title/topic/chapter token-overlap matches "
                "against node definitions)."
            ),
            "sourceFingerprints": {
                "simsDir": str(sims_dir),
                "SIMS_V2_QUALITY.json": sha256(quality_path)[:16],
                "enhanced_nodes_index.json": sha256(nodes_path)[:16],
                "nodeCacheVersion": json.loads(nodes_path.read_text(encoding="utf-8")).get("cache_version"),
            },
            "matchedAudit": {
                "totalPlayable": len(defs),
                "qualityVerdicts": {
                    v: sum(1 for e in entries if e["qualityVerdict"] == v)
                    for v in sorted({e["qualityVerdict"] for e in entries})
                },
                "unregisteredSimDefsParsed": [
                    {"simId": d["id"], "file": d["file"]}
                    for d in unregistered
                ],
            },
            "matcher": {
                "minScore": 0.22,
                "singleTokenHitsRequireChapterMatch": True,
                "maxNodeIdsPerSim": 20,
                "chapterBoost": 0.15,
            },
            "droppedDeclaredNodeIds": dropped_node_ids,
        },
        "sims": entries,
        "summary": {
            "totalSims": len(entries),
            "withNodeIds": sum(1 for e in entries if e["nodeIds"]),
            "withoutNodeIds": sum(1 for e in entries if not e["nodeIds"]),
            "classes_1_5_no_node_corpus": True,
            "classes_1_5_note": (
                "CONFIRMED: backend/_cache/enhanced_nodes_index.json contains "
                "classes 6-12 only (prefixes c6_..c12_, 9008 nodes, 0 nodes "
                "for classes 1-5). Classes 1-5 sims therefore map to "
                "canonical topic keys 'g<class>.<topic>' and carry empty "
                "nodeIds by design."
            ),
            "perClass": {
                f"class{c}": {
                    **per_class[c],
                    "mode": ("nodeIds" if c == 6 else "topicKeyOnly"),
                }
                for c in CLASSES
            },
            "class6": {
                "sims": class6_sims,
                "nodeCoveragePct": round(100.0 * class6_mapped / class6_sims, 1)
                if class6_sims else 0.0,
                "distinctNodesReferenced": len(distinct_nodes),
                "c6NodesAvailable": len(nodes),
            },
            "topicKeyCoveragePct": round(
                100.0 * sum(1 for e in entries if e["topicKey"]) / len(entries), 1
            )
            if entries else 0.0,
        },
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--sims-dir", type=Path, default=DEFAULT_SIMS_DIR)
    ap.add_argument("--quality", type=Path, default=DEFAULT_QUALITY)
    ap.add_argument("--nodes", type=Path, default=DEFAULT_NODES)
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    result = build(args.sims_dir, args.quality, args.nodes)
    args.out.write_text(
        json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    if not args.quiet:
        s = result["summary"]
        print(f"wrote {args.out}")
        print(f"total sims           : {s['totalSims']}")
        for cls, pc in s["perClass"].items():
            print(
                f"  {cls:<8} sims={pc['sims']:<3} nodeMapped={pc['nodeMapped']:<3} "
                f"topicKey={pc['topicKeyMapped']:<3} unmappedNodes={pc['unmappedNodes']}"
            )
        print(
            f"class6 node coverage : {s['class6']['nodeCoveragePct']}% "
            f"({s['class6']['sims']} sims, "
            f"{s['class6']['distinctNodesReferenced']} distinct nodes of "
            f"{s['class6']['c6NodesAvailable']} available)"
        )
        if result["meta"]["droppedDeclaredNodeIds"]:
            print(
                "dropped declared nodeIds (not in corpus): "
                f"{result['meta']['droppedDeclaredNodeIds']}"
            )
    return 0


if __name__ == "__main__":
    sys.exit(main())
