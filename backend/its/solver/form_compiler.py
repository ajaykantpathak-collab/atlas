"""form_compiler.py — Compile the question bank into a retrieval index.

The correctness path for K-12: boards recycle question forms. This
module compiles every mined question into a normalized FORM (numbers
replaced by slots), clusters duplicates, and attaches official
marking-scheme answer steps where pairing succeeds.

    question  "A train covers 180 km in 3 hours. Find its speed."
    form      "a train covers {} km in {} hours find the speed of the"
    slots     the {} positions, aligned with the original numbers

Runtime (form_solver): embed the student question -> nearest forms ->
align their numbers to slot positions -> execute the official solution
chain via the cascade -> verify. The answer path comes from CBSE's own
marking scheme, not from guessed bindings.
"""

from __future__ import annotations

import hashlib
import re
import sqlite3
import unicodedata
from pathlib import Path
from typing import Dict, List, Optional, Tuple

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")
INDEX_PATH = Path(r"D:\platform\cbse_data\form_index.npz")

_WS_RE = re.compile(r"\s+")
_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?(?:\s*[x×]\s*10\s*[-–]?\d+)?")
_PUNCT_RE = re.compile(r"[^\w\s{}]")


_MARKS_NOISE_RE = re.compile(
    r"\n\s*\d{1,3}\s*\n"        # bare marks digits on their own line
    r"|[\(\[]\s*\d{1,2}\s*(?:marks?|m)?\s*[\)\]]\s*$"
    r"|\b(?:3|2|1|4|5)\s*SECTION\b", re.I)
_ANSWER_CUT_RE = re.compile(
    r"\b(?:Answer|Ans)\s*[:\.]", re.I)


def normalize_form(text: str) -> str:
    """Question text -> slot skeleton (numbers -> {})."""
    t = unicodedata.normalize("NFKC", text or "")
    t = t.replace("𝒙", "x").replace("𝑥", "x").replace("𝑦", "y")
    t = _ANSWER_CUT_RE.split(t)[0]          # drop answer sections
    t = _MARKS_NOISE_RE.sub(" ", t)
    t = _NUM_RE.sub(" {} ", t)
    t = t.lower()
    t = _PUNCT_RE.sub(" ", t)
    t = _WS_RE.sub(" ", t).strip()
    # strip section-instructions noise that survives cleaning
    for noise in ("section c this section contains", "section d",
                  "section e", "long answers", "this section",
                  "or ", "case study"):
        t = t.replace(noise, " ")
    return _WS_RE.sub(" ", t).strip()


def form_key(skeleton: str) -> str:
    return hashlib.sha1(skeleton.encode("utf-8")).hexdigest()[:16]


# --------------------------------------------------------------------------- #
# Build
# --------------------------------------------------------------------------- #

def build_forms(db_path: Path = DB_PATH,
                embed: bool = True) -> Dict[str, int]:
    """Compile questions -> forms table + embedding index npz."""
    conn = sqlite3.connect(str(db_path))
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS forms (
        form_id TEXT PRIMARY KEY, skeleton TEXT, subject TEXT,
        class_label TEXT, q_type TEXT, n_instances INT,
        sample_text TEXT, answer_steps TEXT, has_answer INT);
    """)
    rows = conn.execute(
        """SELECT q.id, q.text, q.qno, d.subject, d.class_label, q.q_type,
                  d.session
           FROM questions q JOIN documents d ON q.doc_id = d.id""").fetchall()

    # MS answer pairing: (subject, session[:4]) -> {qno: steps}
    ms_pairs: Dict[Tuple[str, str], Dict[int, List[str]]] = {}
    for doc_id, subject, session in conn.execute(
            "SELECT id, subject, session FROM documents WHERE doc_type='MS'"):
        if not session:
            continue
        steps = conn.execute(
            "SELECT qno, text FROM marking_steps WHERE doc_id=? "
            "ORDER BY step_no", (doc_id,)).fetchall()
        by_q: Dict[int, List[str]] = {}
        for qno, txt in steps:
            by_q.setdefault(qno, []).append(txt)
        ms_pairs[(subject, (session or "")[:4])] = by_q

    # collapse questions into forms; attach official steps when the
    # question's own document session pairs with a marking scheme
    forms: Dict[str, dict] = {}
    for q_id, text, qno, subject, cls, q_type, session in rows:
        skeleton = normalize_form(text)
        if len(skeleton) < 25 or skeleton.count("{}") < 1:
            continue
        key = form_key(skeleton[:400])
        f = forms.setdefault(key, {
            "skeleton": skeleton[:400], "subject": subject,
            "class_label": cls, "q_type": q_type,
            "n": 0, "sample": (text or "")[:600],
            "steps": None,
        })
        f["n"] += 1
        if f["steps"] is None:
            pair = ms_pairs.get((subject, (session or "")[:4]))
            if pair and qno in pair:
                f["steps"] = "\n".join(pair[qno][:8])

    conn.execute("DELETE FROM forms")
    n_with_answers = 0
    for key, f in forms.items():
        has = 1 if f["steps"] else 0
        n_with_answers += has
        conn.execute(
            "INSERT OR REPLACE INTO forms(form_id, skeleton, subject, "
            "class_label, q_type, n_instances, sample_text, answer_steps, "
            "has_answer) VALUES (?,?,?,?,?,?,?,?,?)",
            (key, f["skeleton"], f["subject"], f["class_label"],
             f["q_type"], f["n"], f["sample"], f["steps"], has))

    conn.commit()

    stats = {
        "questions": len(rows),
        "forms": len(forms),
        "with_answer_steps": n_with_answers,
    }

    # embeddings
    if embed:
        try:
            import numpy as np

            from backend.its.solver.variable_registry import embed_texts

            skels = [f["skeleton"] for f in forms.values()]
            keys = list(forms.keys())
            vecs = embed_texts(skels)
            if vecs is not None:
                np.savez_compressed(INDEX_PATH,
                                    keys=np.array(keys),
                                    vecs=vecs.astype("float32"))
                stats["indexed"] = len(keys)
        except Exception as exc:
            stats["embed_error"] = str(exc)

    conn.close()
    return stats


# --------------------------------------------------------------------------- #
# Retrieval
# --------------------------------------------------------------------------- #

class FormIndex:
    """Loaded form index: embed -> cosine top-k over compiled forms."""

    def __init__(self) -> None:
        self._keys = None
        self._vecs = None
        self._conn = None

    def _ensure(self) -> bool:
        if self._keys is None:
            import numpy as np

            if not INDEX_PATH.exists():
                return False
            data = np.load(INDEX_PATH, allow_pickle=False)
            self._keys = [str(k) for k in data["keys"]]
            self._vecs = data["vecs"]
            self._conn = sqlite3.connect(str(DB_PATH))
        return True

    def retrieve(self, text: str, k: int = 3) -> List[dict]:
        if not self._ensure():
            return []
        import numpy as np

        from backend.its.solver.variable_registry import embed_texts

        vecs = embed_texts([normalize_form(text)])
        if vecs is None:
            return []
        v = vecs[0]
        sims = self._vecs @ v / (
            np.linalg.norm(self._vecs, axis=1) * np.linalg.norm(v) + 1e-9)
        top = sims.argsort()[-k:][::-1]
        out = []
        for i in top:
            fid = self._keys[int(i)]
            row = self._conn.execute(
                "SELECT skeleton, subject, class_label, q_type, "
                "n_instances, sample_text, answer_steps, has_answer "
                "FROM forms WHERE form_id=?", (fid,)).fetchone()
            if row:
                out.append({
                    "form_id": fid, "skeleton": row[0],
                    "subject": row[1], "class_label": row[2],
                    "q_type": row[3], "n_instances": row[4],
                    "sample": row[5], "steps": row[6], "has_answer": row[7],
                    "score": float(sims[int(i)]),
                })
        return out


_index: Optional[FormIndex] = None


def get_form_index() -> FormIndex:
    global _index
    if _index is None:
        _index = FormIndex()
    return _index


if __name__ == "__main__":
    import sys

    print(build_forms())
