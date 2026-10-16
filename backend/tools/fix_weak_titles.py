"""Repair degenerate enrichment_content.title rows (W2 audit, Fixer A2).

Root cause: titles on /learn serve preferentially from
``enrichment_content.title`` (see routers/content.py — the slug map and
``/api/content/nodes/<id>/enrichment``), but those rows were loaded
before the serve-time deriver
(``backend.services.enhanced_nodes._title_from_head``) was hardened.
The table still holds raw first-sentence fragments the old loader cut:
``"This node covers the classic laboratory experiments presc…"``,
``"An **Electrolyte**"``, ``"This chapter provides a panoramic view…"`` —
plus the flat meta nouns the audit saw ("This Chapter", "An Object").

What this does, per weak row:
  1. Re-derives a title from the node .md itself — the DEFINITION head
     via ``_title_from_head``, then the SCOPE_BOUNDARY ``TEACH:`` clause,
     then a quoted topic name in the definition.
  2. Falls back to ``"<Subject> · Ch <n>"`` only when the stored title
     is outright degenerate (meta/markup/fragment), never when it is
     merely short (a real topic word like "नदी" is left alone).
  3. ``--apply`` UPDATEs ``enrichment_content.title`` via asyncpg and,
     with ``--md``, pins the repaired title as a ``## TITLE`` section in
     the .md (before ``## DEFINITION``) so a future
     load_cbse_enrichment run reproduces it — the loader prefers an
     explicit TITLE section.

Every candidate comes from the file's own words — nothing is invented.
Default is a dry run; pass --apply to write.

Usage (inside a backend container):
    python -m backend.tools.fix_weak_titles --board cisce           # dry run
    python -m backend.tools.fix_weak_titles --board cisce --apply --md
"""
from __future__ import annotations

import argparse
import asyncio
import os
import re
import sys
from pathlib import Path

# ── title machinery ──────────────────────────────────────────────────
# Post-ship this imports the hardened backend.services.enhanced_nodes.
# Running ahead of the ship (container still on the old module), point
# ENHANCED_NODES_PATH at a copy of the new file (e.g. bind-mounted via
# /app/cbse_data).
try:
    from backend.services import enhanced_nodes as _en
    _en.is_weak_title  # sentinel — absent in pre-hardening containers
except (ImportError, AttributeError):
    import importlib.util

    _path = os.environ.get(
        "ENHANCED_NODES_PATH", "/app/cbse_data/_fixa2_enhanced_nodes.py")
    _spec = importlib.util.spec_from_file_location(
        "enhanced_nodes_fixed", _path)
    _en = importlib.util.module_from_spec(_spec)
    _spec.loader.exec_module(_en)

MD_DIRS = {
    "cisce": "cisce_nodes_v2",
    "cbse": "enhanced_nodes_md",
}
BOARD_OF = {"cisce": "CISCE", "cbse": "CBSE"}

_SUBJECT_NAMES = {
    "bio": "Biology", "chem": "Chemistry", "phy": "Physics",
    "phys": "Physics", "math": "Maths", "eng": "English",
    "engl": "English", "hin": "Hindi", "geo": "Geography",
    "histciv": "History & Civics", "hist": "History", "civ": "Civics",
    "econ": "Economics", "eco": "Economics", "envsci": "Environmental Science",
    "compapp": "Computer Applications", "comst": "Computer Studies",
    "cs": "Computer Science", "ai": "AI", "acc": "Accounts",
    "comm": "Commerce", "bst": "Business Studies", "gram": "Grammar",
    "evs": "EVS", "sci": "Science", "sans": "Sanskrit", "geo": "Geography",
    "polsc": "Political Science", "soc": "Sociology", "psy": "Psychology",
}

_TEACH_RE = re.compile(
    r"TEACH\s*:\s*(.+?)(?:DO\s+NOT|ALREADY\s+COVERED|\n\s*\n|$)",
    re.S | re.I)
#: Authors bold the node's key term in the definition head — a strong
#: topic signal when the head itself is a meta/fragment ("This node
#: develops **complementary angles**").
_BOLD_RE = re.compile(r"\*\*([^*]{3,80}?)\*\*")


def _degenerate(title: str) -> bool:
    """Strictly-broken stored title (meta/markup/fragment/oversize) —
    as opposed to merely short, which may be a real topic word."""
    t = (title or "").strip()
    if not t or len(t) > 60 or "\n" in t:
        return True
    if _en._TITLE_WEAK_META.match(t) or _en._TITLE_MARKUP.search(t):
        return True
    return re.search(r"…|\.{3,}", t) is not None


def _subject_pretty(code: str) -> str:
    return _SUBJECT_NAMES.get((code or "").lower(), (code or "").title())


def _chapter_of(node_id: str, row_chapter) -> str:
    m = re.match(r"^ch0*(\d+)$", str(row_chapter or ""), re.I)
    if m:
        return m.group(1)
    parts = node_id.split("_")
    return parts[-2].lstrip("0") if len(parts) >= 2 else "?"


_LEADING_FUNC = re.compile(
    r"^(when|if|for|a|an|the|in|on|to|as|by|at|while|during|where)\b", re.I)


def _fragmenty(title: str) -> bool:
    """A head-fragment like 'When a dilute acid' or 'For a quadratic
    polynomial p(x)' — grammatical opener, no topic noun."""
    t = (title or "").strip()
    return bool(_LEADING_FUNC.match(t)) or len(t.split()) < 2


def derive_repair_title(node_id: str, sections: dict,
                        subject: str, row_chapter) -> tuple[str, str]:
    """(title, source) — every candidate from the file's own words."""
    definition = (sections.get("DEFINITION") or "").strip()
    head = definition.split("\n")[0] if definition else ""

    head_title = ""
    if head:
        t = _en._title_from_head(head)
        if t:
            t = t[0].upper() + t[1:]
        if t and _en._title_ok(t) and not _degenerate(t):
            head_title = t

    def _post(t: str) -> str:
        t = (t or "").split(";", 1)[0]
        t = re.sub(
            r"^(?:the\s+)?(?:meaning|definition|concept|overview|"
            r"introduction|scope|basics|idea)s?\s+of\s+", "", t,
            flags=re.I)
        return re.sub(r"[\s,;:.\-–—=×+*/()\[\]{}]+$", "", t)

    # Bold key-term and scope TEACH clause are competing signals —
    # take the more informative (longer) one; a lone adjective
    # ("Exact") loses to the scoped phrase ("Exact differential
    # equations") while a specific bold name ("INA (Red Fort)
    # Trials") beats a generic scope item ("Charges").
    alt = []
    # Scan the whole definition for bold key terms, not just the head —
    # "When a dilute acid reacts with a reactive metal, a displacement
    # reaction occurs" bolds the term a clause or two in.
    for b in _BOLD_RE.finditer(definition):
        cand = _post(_en._title_clean(b.group(1)))
        if cand and _en._title_ok(cand) and not _degenerate(cand):
            alt.append((cand[0].upper() + cand[1:], "bold_term"))
            break
    scope = sections.get("SCOPE_BOUNDARY") or ""
    m = _TEACH_RE.search(scope)
    if m:
        for item in re.split(r"[;,]", m.group(1)):
            cand = _post(_en._title_clean(item))
            if cand and _en._title_ok(cand) and not _degenerate(cand):
                alt.append((cand[0].upper() + cand[1:], "scope_boundary"))
                break

    q = (_en._TITLE_QUOTED.search(head[:250]) if head else None)
    if q:
        cand = _en._title_clean(q.group(1))
        if cand and _en._title_ok(cand) and not _degenerate(cand):
            alt.append((cand[0].upper() + cand[1:], "quoted"))

    # Main-clause noun phrase — "When a dilute acid reacts with a
    # reactive metal, a displacement reaction occurs" → 'Displacement
    # reaction'. Only competes when the head itself is fragmenty.
    if not head_title or _fragmenty(head_title):
        _BAD_TAIL = re.compile(
            r"\b(?:of|in|on|at|for|with|to|by|as|and|or|the|a|an|"
            r"which|that|who|whom|whose|between|is|are|was|were)$", re.I)
        for clause in re.split(r",\s*", head):
            mm = re.match(
                r"^(?:a|an|the|this|these|such|each|every)\s+"
                r"([a-z][a-z0-9\-() ]{4,60}?)\s+(?:occurs?|forms?|"
                r"is\b|are\b|produces?|results?|happens?|reacts?|"
                r"releases?|leads?|causes?|follows?|takes?|acts?)",
                clause.strip(), re.I)
            if mm:
                cand = _post(_en._title_clean(mm.group(1)))
                if (cand and len(cand.split()) >= 2
                        and not _BAD_TAIL.search(cand)
                        and not re.search(r"\b(of which|that the|which |whose )\b", cand)
                        and _en._title_ok(cand) and not _degenerate(cand)):
                    alt.append((cand[0].upper() + cand[1:], "main_clause"))
                    break

    # Head-fragment beats alternates only when it reads like a real
    # topic name; otherwise the bold/scope/quoted terms win.
    if head_title and not _fragmenty(head_title):
        return head_title, "definition"
    if alt:
        alt.sort(key=lambda x: -len(x[0].split()))
        return alt[0]
    if head_title:
        return head_title, "definition"
    return (f"{_subject_pretty(subject)} · Ch "
            f"{_chapter_of(node_id, row_chapter)}", "container")


def inject_title_section(md_path: Path, title: str) -> bool:
    """Write ``## TITLE\\n<title>`` before ``## DEFINITION`` (once)."""
    text = md_path.read_text(encoding="utf-8", errors="ignore")
    if re.search(r"^##\s*TITLE\b", text, re.M | re.I):
        return False
    m = re.search(r"^##\s*DEFINITION[^\n]*\n", text, re.M)
    block = f"## TITLE\n{title}\n\n"
    if m:
        text = text[:m.start()] + block + text[m.start():]
    else:
        text = block + text
    md_path.write_text(text, encoding="utf-8")
    return True


async def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--board", choices=["cisce", "cbse", "all"],
                    default="cisce")
    ap.add_argument("--content-root", default=os.environ.get(
        "CONTENT_ROOT", "/app/content"))
    ap.add_argument("--apply", action="store_true",
                    help="write DB updates (default: dry run)")
    ap.add_argument("--md", action="store_true",
                    help="pin repaired titles as ## TITLE sections")
    args = ap.parse_args()

    boards = ["cisce", "cbse"] if args.board == "all" else [args.board]

    import asyncpg
    url = os.environ["DATABASE_URL"].replace(
        "postgresql+asyncpg://", "postgresql://")
    con = await asyncpg.connect(url)

    try:
        plan = []          # (node_id, old, new, source, md_path)
        skipped = []       # (node_id, old, reason)
        for board in boards:
            root = Path(args.content_root) / MD_DIRS[board]
            rows = await con.fetch(
                "select node_id, title, subject, chapter "
                "from enrichment_content where board=$1 order by node_id",
                BOARD_OF[board])
            weak = degenerate = 0
            for node_id, title, subject, chapter in rows:
                if not _en.is_weak_title(title):
                    continue
                weak += 1
                if _degenerate(title):
                    degenerate += 1
                md = root / f"{node_id}.md"
                if not md.is_file():
                    skipped.append((node_id, title, "no_md"))
                    continue
                text = md.read_text(encoding="utf-8", errors="ignore")
                sections = _en.parse_markdown(text)["sections"]
                new, source = derive_repair_title(
                    node_id, sections, subject, chapter)
                if new == (title or "").strip():
                    skipped.append((node_id, title, "same"))
                    continue
                if source == "container" and not _degenerate(title):
                    # Old title is merely short — a real topic word
                    # beats a container label.
                    skipped.append((node_id, title, "short_ok"))
                    continue
                plan.append((node_id, title, new, source, md))
            print(f"{BOARD_OF[board]}: {len(rows)} rows, {weak} weak "
                  f"({degenerate} degenerate), {len(plan)} repairs "
                  f"planned, {len(skipped)} skipped")

        from collections import Counter
        print("  sources:", dict(Counter(src for *_x, src, _m in plan)))
        shown = Counter()
        for nid, old, new, src, _ in plan:
            if shown[src] >= 15:
                continue
            shown[src] += 1
            print(f"  {src:14} {nid}: {str(old)[:60]!r} -> {new!r}")

        if not args.apply:
            print("DRY RUN — pass --apply to write")
            return

        await con.executemany(
            "update enrichment_content set title=$2 where node_id=$1",
            [(nid, new) for nid, _o, new, _s, _m in plan])
        md_written = 0
        if args.md:
            # Pin only titles the deriver could NOT reproduce on its own
            # (a reload re-derives 'definition'-source titles anyway).
            for _nid, _o, new, src, md in plan:
                if src != "definition" and inject_title_section(md, new):
                    md_written += 1
        print(f"APPLIED: {len(plan)} titles updated"
              + (f", {md_written} ## TITLE sections written" if args.md
                 else ""))
    finally:
        await con.close()


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
