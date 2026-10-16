"""W6 id scrub — remove raw node ids from all visible prose in ISC lane.

Owner law (AGENTS.md 2026-09-29): node ids travel as opaque fetch keys in
*_NODE_IDS / CROSS_SUBJECT_PREREQS sections only; visible display text must
carry zero ids. This tool rewrites every id occurrence in PROSE sections to
direction-aware natural phrases:

  "revisit node c11_acc_isc_02_001 (Double entry system)"
      -> "revisit the earlier node on Double entry system"
  "Tangible assets (node c11_acc_isc_01_007) have physical substance"
      -> "Tangible assets have physical substance"
  "those belong to later nodes (c11_acc_isc_01_003 onward)"
      -> "those belong to later nodes in this chain"
  "Node c11_acc_isc_04_006 establishes the depreciation basis"
      -> "The prerequisite node establishes the depreciation basis"
  CHAIN_DESCRIPTION "Node <self-id> concludes ..."
      -> "This node concludes ..."

Integrity: per-file backup before first write; manifest records SHA-256 of
every file before/after and the per-section edit counts; a post-pass asserts
zero ids remain in prose sections. Sections never touched: *_NODE_IDS,
CROSS_SUBJECT_PREREQS (key sections by design), and every section with no id.

Usage: python w6_scrub_ids.py [--corpus DIR] [--backup DIR] [--dry-run]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
from collections import Counter

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups\scrub"

FILE_RE = re.compile(r"^c1[12]_([a-z]+(?:_[a-z0-9]+)*?)_isc_(\d+)_(\d+)\.md$")
PARKED = {"eng", "eng_elec", "eng_mod", "hin"}
ID = r"c1[12]_(?:[a-z0-9]+_)?(?:isc|icse)_[0-9]{2}_[0-9]{3}"   # subject optional (c11_isc_01_006 malformed variant exists)
NUM = r"(?<![\w₹,])0\d{2}"   # short chapter-local node number, e.g. 006 (never a 1,000s tail)
ID_RE = re.compile(ID)
KEY_SUFFIX = ("_NODE_IDS",)
KEY_EXACT = {"CROSS_SUBJECT_PREREQS"}
SEC_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
SP = r"[ \t\u00a0\u202f]"
NB = r"(?:to|through|–|—)"


def id_pair(id_str: str):
    parts = id_str.split("_")
    return int(parts[-2]), int(parts[-1])


def parse_sections(text: str):
    ms = list(SEC_RE.finditer(text))
    out = []
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        out.append([m.group(0), m.group(1), text[m.end():end]])
    pre = text[: ms[0].start()] if ms else text
    return pre, out


def join_sections(pre, parts) -> str:
    return pre + "".join(h + b for h, _n, b in parts)


class Scrubber:
    def __init__(self, cur_fn: str, section: str):
        self.cur = coords(cur_fn)
        self.section = section
        self.count = 0

    def dw(self, id_str: str) -> str:
        if self.section == "FORWARD_REASONS":
            return "next"
        if self.section in ("PREREQUISITE_REASONS", "PREREQ_BEFORE",
                            "PREREQ_STUCK", "PREREQ_CONCEPT"):
            return "prerequisite"
        return "earlier" if id_pair(id_str) < self.cur else "later"

    def cap_for(self, body: str, start: int) -> str:
        """Return 'The' if the replacement sits at sentence start, else 'the'."""
        before = body[:start].rstrip(" \t\u00a0\u202f")
        before = before.rstrip("*")           # a bold CLOSE is not a sentence start
        before = before.rstrip(" \t\u00a0\u202f")
        if not before or before.endswith((".", "!", "?", ":", ";")):
            return "The"
        return "the"

    def title_ok(self, title: str) -> bool:
        t = title.strip().lower()
        if not re.search(r"[a-z]{3}", t):
            return False
        return not t.startswith(("see", "refer", "covered", "discussed",
                                 "already", "note ", "as ", "e.g", "i.e",
                                 "earlier", "later", "node", "above", "below"))

    def scrub(self, body: str) -> tuple[str, int]:
        self.count = 0
        body = self._ranges(body)
        body = self._short_ranges(body)
        body = self._short_lists(body)
        body = self._with_title(body)
        body = self._short_with_title(body)
        body = self._self_ref(body)
        body = self._paren_drop(body)
        body = self._short_paren_drop(body)
        body = self._node_word(body)
        body = self._short_node_word(body)
        body = self._bare(body)
        body = self._tidy(body)
        return body, self.count

    def dir_num(self, num: str) -> str:
        if self.section == "FORWARD_REASONS":
            return "next"
        if self.section in ("PREREQUISITE_REASONS", "PREREQ_BEFORE",
                            "PREREQ_STUCK", "PREREQ_CONCEPT"):
            return "prerequisite"
        return "earlier" if int(num) < self.cur[1] else "later"

    def _short_ranges(self, body: str) -> str:
        sep = r"[–—\-‑]"
        def r(m):
            self.count += 1
            d = self.dir_num(m.group(1))
            cap = self.cap_for(body, m.start())
            return f"{cap} {d} nodes of this chapter"
        body = re.sub(r"(?<![\w(])[Nn]odes?" + SP + r"+(" + NUM + r")" + sep +
                      r"(" + NUM + r")\b", r, body)
        return body

    def _short_with_title(self, body: str) -> str:
        def r(m):
            if not self.title_ok(m.group(2)):
                return m.group(0)
            self.count += 1
            d = self.dir_num(m.group(1))
            title = m.group(2).strip().strip(".").strip()
            return f"{self.cap_for(body, m.start())} {d} node on {title}"
        # node word MANDATORY — prevents "₹100 (taxable)" style false hits
        return re.sub(r"(?<![\w₹(])[Nn]odes?" + SP + r"+(" + NUM + r")" + SP +
                      r"+\(([^()\n]{3,90})\)(?:\*{0,2})", r, body)

    def _short_lists(self, body: str) -> str:
        # "nodes 007, 008" / "nodes 007, 008 and 009" -> "the <dir> nodes"
        def r(m):
            self.count += 1
            nums = [m.group(2)] + re.findall(NUM, m.group(3) or "") + ([m.group(4)] if m.group(4) else [])
            d = self.dir_num(min(nums))
            cap = self.cap_for(body, m.start())
            return f"{cap} {d} nodes"
        return re.sub(r"(?<![\w(])([Nn]odes)" + SP + r"+(" + NUM + r")((?:"
                      + SP + r"*, *" + NUM + r")+)(?:" + SP + r"+and" + SP +
                      r"+(" + NUM + r"))?\b", r, body)

    def _short_paren_drop(self, body: str) -> str:
        def r(m):
            self.count += 1
            return ""
        return re.sub(SP + r"* *\((?:nodes?" + SP + r"+)?(" + NUM + r")\)", r, body)

    def _short_node_word(self, body: str) -> str:
        def r(m):
            self.count += 1
            plural = "s" if m.group(1).endswith("s") else ""
            if self.section == "CHAIN_DESCRIPTION" and int(m.group(3)) == self.cur[1]:
                return "This node"
            d = self.dir_num(m.group(3))
            cap = "The" if m.group(1) == "Node" or self.cap_for(body, m.start()) == "The" else "the"
            return f"{cap} {d} node{plural}"
        return re.sub(r"\b([Nn]odes?)(" + SP + r"+)(" + NUM + r")\b", r, body)

    def _ranges(self, body: str) -> str:
        # "(nodes X to Y)" / "(nodes X-Y)" -> "(the <dir> nodes in this chain)"
        def r1(m):
            self.count += 1
            return f"({self.cap_for(body, m.start())} {self.dw(m.group(1))} nodes in this chain)"
        body = re.sub(r"\((?:[Nn]odes" + SP + r"+)?(" + ID + r")" + SP + r"+"
                      + NB + SP + r"*" + ID + r"\)", r1, body)
        # bare "nodes X to Y"
        def r2(m):
            self.count += 1
            return f"{self.cap_for(body, m.start())} {self.dw(m.group(1))} nodes in this chain"
        body = re.sub(r"(?<![\w(])(?:[Nn]odes" + SP + r"+)?(" + ID + r")" + SP + r"+"
                      + NB + SP + r"*" + ID + r"\b", r2, body)
        # "(X onward)" / "(node X onward)" -> "in this chain"
        def r3(m):
            self.count += 1
            return "in this chain" if self.dw(m.group(1)) == "later" else "earlier in this chain"
        body = re.sub(r"\((?:node" + SP + r"+)?(" + ID + r")" + SP + r"*onward\)", r3, body)
        return body

    def _with_title(self, body: str) -> str:
        # optional direction phrase already authored before the id
        # ("the prerequisite node **X** (Title)") — preserved, not doubled
        pref = r"((?:[Tt]he" + SP + r"+)?(?:prerequisite|next|previous|earlier|later)"
        pref += SP + r"+nodes?" + SP + r"+)?"
        def r(m):
            if not self.title_ok(m.group(3)):
                return m.group(0)
            self.count += 1
            title = m.group(3).strip().strip(".").strip()
            if m.group(1):                       # keep the authored direction word
                word = re.search(r"(prerequisite|next|previous|earlier|later)",
                                 m.group(1)).group(1)
                lead = "The " if m.group(1)[0].isupper() else "the "
                return f"{lead}{word} node on {title}"
            d = self.dw(m.group(2))
            return f"{self.cap_for(body, m.start())} {d} node on {title}"
        pat = pref + r"(?:\*{0,2})(?:[Nn]ode" + SP + r"+)?(?:\*{0,2})(" + ID + \
              r")(?:\*{0,2})" + SP + r"+\(([^()\n]{3,90})\)(?:\*{0,2})"
        return re.sub(pat, r, body)

    def _self_ref(self, body: str) -> str:
        if self.section != "CHAIN_DESCRIPTION":
            return body
        self_id = FILE_RE.match(CURRENT_FN).group(0)[:-3]
        pat = re.compile(r"\b[Nn]odes?" + SP + r"+" + re.escape(self_id) + r"\b")
        n = len(pat.findall(body))

        def r(m):
            self.count += 1
            return "This node"
        return pat.sub(r, body)

    def _paren_drop(self, body: str) -> str:
        def r(m):
            self.count += 1
            return ""
        return re.sub(SP + r"* *\((?:node" + SP + r"+)?(" + ID + r")\)", r, body)

    def _node_word(self, body: str) -> str:
        def r(m):
            self.count += 1
            cap = "The" if m.group(1) == "Node" or self.cap_for(body, m.start()) == "The" else "the"
            return f"{cap} {self.dw(m.group(3))} node"
        return re.sub(r"\b([Nn]ode)(" + SP + r"+)(" + ID + r")\b", r, body)

    def _bare(self, body: str) -> str:
        def r(m):
            self.count += 1
            return f"{self.cap_for(body, m.start())} {self.dw(m.group(0))} node"
        return ID_RE.sub(r, body)

    def _tidy(self, body: str) -> str:
        # NOTE: no whitespace collapsing — ledger/journal columns in walkthroughs
        # depend on aligned runs of spaces
        body = re.sub(r"\(\s*\)", "", body)
        return body


def coords(fn: str):
    m = FILE_RE.match(fn)
    return (int(m.group(2)), int(m.group(3))) if m else (99, 999)


CURRENT_FN = ""  # set per file; used by _self_ref

# ---- topic-phrase map for section bodies that consist ONLY of ids ----------
TOPIC_CACHE: dict[str, str] = {}
ONLY_IDS_RE = re.compile(r"^(?:(?:and" + SP + r"+|,|;|" + SP + r")+)*" +
                         r"(" + ID + r")(?:(?:and|,|;|" + SP + r")+(" + ID +
                         r"))*(?:(?:and" + SP + r"+|,|;|" + SP + r"+)*)$")


def topic_phrase(node_id: str, corpus: str) -> str:
    """Short topic noun-phrase for a node, from its DEFINITION first clause."""
    if node_id in TOPIC_CACHE:
        return TOPIC_CACHE[node_id]
    path = os.path.join(corpus, node_id + ".md")
    phrase = ""
    try:
        with open(path, encoding="utf-8") as f:
            text = f.read()
        m = re.search(r"^##\s+DEFINITION\s*$", text, re.M)
        if m:
            nxt = re.search(r"^##\s+[A-Z_0-9]+\s*$", text[m.end():], re.M)
            body = text[m.end(): m.end() + nxt.start() if nxt else len(text)]
            for line in body.splitlines():
                clean = line.strip().strip("*").strip()
                if len(clean.split()) >= 3:
                    clean = re.sub(r"^\*{1,2}", "", clean)
                    cut = re.split(r"[,;:—]|\b(?:are|is|refers?|means|denote)\b",
                                   clean, maxsplit=1)[0].strip()
                    words = cut.split()
                    if len(words) > 12:
                        cut = " ".join(words[:12])
                    cut = cut.rstrip(".,;: ").strip("*").strip()
                    if 2 <= len(cut.split()) <= 12:
                        phrase = cut
                    break
    except OSError:
        pass
    TOPIC_CACHE[node_id] = phrase or "the linked topic"
    return TOPIC_CACHE[node_id]


def main() -> None:
    global CURRENT_FN
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    manifest = []
    edits = Counter()
    files_touched = 0
    leftovers = []

    for fn in sorted(os.listdir(args.corpus)):
        m = FILE_RE.match(fn)
        if not m or m.group(1) in PARKED:
            continue
        path = os.path.join(args.corpus, fn)
        with open(path, encoding="utf-8") as f:
            original = f.read()
        pre, parts = parse_sections(original)
        changed = False
        file_edits = {}
        CURRENT_FN = fn
        for p in parts:
            header, name, body = p
            if name.endswith(KEY_SUFFIX) or name in KEY_EXACT:
                continue
            SHORT_NUM_RE = re.compile(r"(?<![\w₹,])\b[Nn]odes?" + SP + r"+" + NUM + r"\b")
            if not (ID_RE.search(body) or SHORT_NUM_RE.search(body)):
                continue
            # section whose entire body is just id(s) (e.g. PREREQ_BEFORE):
            # replace with topic phrases so no content is lost
            stripped = body.strip()
            m_only = ONLY_IDS_RE.match(stripped)
            if m_only and name not in ("CHAIN_DESCRIPTION",):
                ids = [m_only.group(1)] + re.findall(r"(?:and|,|;|" + SP + r")+(" + ID + r")",
                                                     stripped[m_only.end(1):])
                phrases = []
                for nid in ids:
                    tp = topic_phrase(nid, args.corpus)
                    tp = tp[0].upper() + tp[1:] if tp else tp
                    phrases.append(tp if tp[0].isupper() or tp.startswith("The")
                                   else tp)
                new_body = "\n" + " and ".join(phrases) + "\n\n"
                n = len(ids)
                if new_body != body:
                    p[2] = new_body
                    file_edits[name] = n
                    edits[name] += n
                    changed = True
                continue
            scrub = Scrubber(fn, name)
            new_body, n = scrub.scrub(body)
            if n and new_body != body:
                p[2] = new_body
                file_edits[name] = n
                edits[name] += n
                changed = True
        new_text = join_sections(pre, parts)
        if ID_RE.search(new_text):
            _p2, parts2 = parse_sections(new_text)
            for _h, name2, b2 in parts2:
                if (not name2.endswith(KEY_SUFFIX) and name2 not in KEY_EXACT
                        and ID_RE.search(b2)):
                    leftovers.append((fn, name2))
        if not changed:
            continue
        if not args.dry_run:
            bak = os.path.join(args.backup, fn)
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            if not os.path.exists(bak):
                shutil.copy2(path, bak)
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
        files_touched += 1
        manifest.append({
            "file": fn,
            "before_sha256": hashlib.sha256(original.encode("utf-8")).hexdigest(),
            "after_sha256": hashlib.sha256(new_text.encode("utf-8")).hexdigest(),
            "section_edits": file_edits,
        })

    out = os.path.join(os.path.dirname(args.backup), "scrub_manifest.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"files_touched": files_touched,
                   "dry_run": args.dry_run,
                   "edits_by_section": dict(edits),
                   "leftovers": leftovers,
                   "files": manifest}, f, ensure_ascii=False, indent=1)
    print(f"files touched: {files_touched} (dry_run={args.dry_run})")
    print("edits by section:")
    for k, v in edits.most_common():
        print(f"  {k:<26} {v}")
    print(f"prose leftovers: {len(leftovers)}")
    for fn, sec in leftovers[:10]:
        print(f"  LEFTOVER {fn} :: {sec}")
    print(f"manifest: {out}")


if __name__ == "__main__":
    main()
