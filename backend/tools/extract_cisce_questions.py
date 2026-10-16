"""Extract all question sections from cisce_nodes_v2 into board_questions.

CISCE twin of extract_node_questions.py — identical section mining
(diagnostics / competency / seed sub-parts / worked examples), but reads
the CISCE corpus and tags each row's board from the filename
(``_icse_`` -> ICSE, ``_isc_`` -> ISC) so a CISCE student can be served
their own board's authored bank instead of generator fallback.

Idempotent: skips (source_file, question_text) pairs already present.
Never touches CBSE rows.
"""
import asyncio
import re
import sys
from pathlib import Path

from sqlalchemy import select

from backend.database import async_session
from backend.models.enrichment import BoardQuestion

MD_DIR = Path("/app/content/cisce_nodes_v2")
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*\n", re.MULTILINE)
# c10_bio_icse_01_001 / c12_acc_isc_03_002 — class, subject, board, ch, node
FNAME_RE = re.compile(
    r"c(\d+)_([a-z]+(?:_[a-z]+)*?)_(icse|isc)_(\d+)_(\d+)$", re.IGNORECASE)
SUBPART_RE = re.compile(r"^#{3,4}\s+SUB_PART_([A-Z])\s*\n", re.MULTILINE)

DIFF_MAP = {
    "easy": "easy", "basic": "easy", "foundation": "easy",
    "medium": "medium", "intermediate": "medium", "main": "medium",
    "advanced": "hard", "hard": "hard", "challenge": "hard",
}


def norm_diff(s: str) -> str:
    return DIFF_MAP.get((s or "").strip().lower(), "medium")


def parse_md(text: str) -> dict[str, str]:
    parts = SECTION_RE.split(text)
    return {parts[i].strip(): parts[i + 1].strip()
            for i in range(1, len(parts) - 1, 2)}


def _fields(text: str) -> dict[str, str]:
    out = {}
    for m in re.finditer(
            r"(?:^|\n)\s*(?:\*\*)?([A-Za-z_]+):(?:\*\*)?\s*\n?(.*?)"
            r"(?=\n\s*(?:\*\*)?[A-Za-z_]+:(?:\*\*)?|\Z)",
            text, re.DOTALL):
        out[m.group(1).upper()] = m.group(2).strip()
    return out


def extract(path: Path, sections: dict[str, str]) -> list[dict]:
    stem = path.stem
    node_id = stem[:-5] if stem.endswith("_comp") else stem
    m = FNAME_RE.match(node_id)
    if not m:
        return []
    class_level, subject = int(m.group(1)), m.group(2)
    board = m.group(3).upper()
    chapter = f"ch{m.group(4)}"
    rows: list[dict] = []

    def base(**kw):
        d = dict(node_tags=[node_id], subject=subject, class_level=class_level,
                 chapter=chapter, board=board, source_file=str(path))
        d.update(kw)
        return d

    for key, body in sections.items():
        dm = re.match(r"DIAGNOSTIC_QUESTION_(\d+)$", key)
        if dm:
            n = int(dm.group(1))
            rows.append(base(
                question_number=n, section="diagnostic",
                question_type="short_answer", question_text=body,
                correct_answer=sections.get(f"DIAGNOSTIC_ANSWER_{n}"),
                model_answer=sections.get(f"DIAGNOSTIC_ANSWER_{n}"),
                marks=1, difficulty="medium", source_type="diagnostic"))
            continue

        cqm = re.match(r"COMPETENCY_QUESTION_(\d+)$", key)
        if cqm:
            f = _fields(body)
            if not f.get("QUESTION"):
                continue
            steps = f.get("STEPS", "")
            rows.append(base(
                question_number=int(cqm.group(1)),
                section="competency",
                question_type="long_answer", question_text=f["QUESTION"],
                correct_answer=f.get("ANSWER"),
                model_answer=f.get("ANSWER"),
                marking_scheme=steps or None,
                explanation=f.get("COMPETENCY"),
                marks=5, difficulty=norm_diff(f.get("DIFFICULTY", "")),
                source_type="competency"))
            continue

        wem = re.match(r"WORKED_EXAMPLE_(\d+)$", key)
        if wem:
            f = _fields(body)
            if not f.get("PROBLEM"):
                continue
            model = "\n\n".join(x for x in [
                f.get("STEPS", ""),
                ("REASONING: " + f["REASONING"]) if f.get("REASONING") else "",
            ] if x)
            rows.append(base(
                question_number=int(wem.group(1)),
                section="worked_example",
                question_type="long_answer", question_text=f["PROBLEM"],
                correct_answer=f.get("ANSWER"),
                model_answer=model or f.get("ANSWER"),
                marking_scheme=f.get("STEPS") or None,
                marks=5, difficulty="medium", source_type="worked_example"))
            continue

        sqm = re.match(r"SEED_QUESTION_(\d+)$", key)
        if sqm:
            sq_num = int(sqm.group(1))
            cut = re.search(r"^#{3,4}\s+SUB_PART_", body, re.MULTILINE)
            meta_head = body[:cut.start()] if cut else body
            meta = {mm.group(1).upper(): mm.group(2).strip() for mm in
                    re.finditer(r"#{3,4}\s*([A-Za-z_]+):\s*(.*?)(?=\n#{3,4}|\Z)",
                                meta_head, re.DOTALL)}
            scenario = meta.get("SCENARIO", "")
            tier = meta.get("DIFFICULTY_TIER", "")
            sub_parts = SUBPART_RE.split(body)
            for i in range(1, len(sub_parts) - 1, 2):
                letter = sub_parts[i]
                sf = _fields(sub_parts[i + 1])
                q = sf.get("Q", "")
                if not q:
                    continue
                qtext = (f"{scenario}\n\n({letter}) {q}").strip() if scenario else q
                guideline = sf.get("GUIDELINE", "")
                extras = "\n\n".join(
                    f"{lbl}: {sf[lbl.upper()]}" for lbl in
                    ("SHORTCUT", "TRAPS", "VARIANTS") if sf.get(lbl.upper()))
                rows.append(base(
                    question_number=sq_num * 100 + (ord(letter) - 64),
                    section=f"seed_{meta.get('TITLE', '')[:60]}",
                    question_type="long_answer", question_text=qtext,
                    correct_answer=guideline or None,
                    model_answer=guideline or None,
                    marking_scheme=guideline or None,
                    explanation=extras or None,
                    marks=5, difficulty=norm_diff(tier),
                    source_type="seed"))
    return rows


async def main() -> None:
    files = sorted(MD_DIR.glob("*.md"))
    all_rows: list[dict] = []
    skipped = 0
    for f in files:
        stem = f.stem[:-5] if f.stem.endswith("_comp") else f.stem
        if not FNAME_RE.match(stem):
            skipped += 1
            continue
        sections = parse_md(f.read_text(encoding="utf-8", errors="ignore"))
        all_rows.extend(extract(f, sections))
    print(f"extracted {len(all_rows)} questions from {len(files)} files"
          f" ({skipped} filenames unmatched)")

    async with async_session() as db:
        existing = set((await db.execute(select(
            BoardQuestion.source_file, BoardQuestion.question_text).where(
            BoardQuestion.board.in_(("ICSE", "ISC"))))).all())
        print(f"existing CISCE rows: {len(existing)}")

        inserted = 0
        for r in all_rows:
            if (r["source_file"], r["question_text"]) in existing:
                continue
            db.add(BoardQuestion(**r))
            inserted += 1
            if inserted % 2000 == 0:
                await db.commit()
                print(f"  {inserted}...")
        await db.commit()
        print(f"done: {inserted} inserted")


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
