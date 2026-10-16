"""fix_dup_section_headers.py -- GAPS pass WS-B repair.

The 16 legacy class-7 authored defects recorded in BUGS.md [fixed-gen]
("c7 legacy files with empty authored DQ bodies") plus companion file(s)
sharing the identical malformation: a section header is EMITTED TWICE
back-to-back --

    ## DIAGNOSTIC_QUESTION_6
    ## DIAGNOSTIC_QUESTION_6
    <authored body>

The authored body exists in every case; the first (empty) header shadows
it for any per-occurrence reader and makes the parser concatenate an
empty body ("\n\n" prefix) onto the served question.

Repair is PURELY STRUCTURAL (zero content change): drop the FIRST of two
identical consecutive headers.  Post-condition enforced per file: after
removing every '## ' header line from old and new, the remaining content
is byte-identical.  Originals zipped to
backend/_archive/gaps_dupefix_backups.zip.  Idempotent (loop to fixpoint).
"""
import os
import re
import zipfile

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP_ZIP = r"D:\platform\backend\_archive\gaps_dupefix_backups.zip"

#: consecutive duplicated identical '## NAME' header
DUP_RE = re.compile(r"^(## [A-Z_0-9]+[^\n]*)\n(?=\1[^\n]*\n)", re.M)

_HDR_LINE = re.compile(r"^## [^\n]*\n", re.M)


def _content_only(text: str) -> str:
    """Everything that is not a '## ' header line."""
    return _HDR_LINE.sub("", text)


def main():
    zf = zipfile.ZipFile(BACKUP_ZIP, "a", zipfile.ZIP_DEFLATED)
    fixed_files = 0
    fixed_headers = 0
    samples = []
    for f in sorted(os.listdir(MD)):
        if not f.endswith(".md"):
            continue
        path = os.path.join(MD, f)
        with open(path, encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        n = 0
        while True:
            new_text, k = DUP_RE.subn("", text)   # drop the FIRST of the pair
            n += k
            if not k:
                break
            assert not DUP_RE.search(new_text), "still duplicated: " + f
            text = new_text
        if not n:
            continue
        # post-condition: zero content change -- non-header bytes identical
        assert _content_only(new_text) == _content_only(
            open(path, encoding="utf-8-sig", errors="replace").read()), f
        zf.writestr("dupefix_backup/" + f,
                    open(path, "rb").read())
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new_text)
        fixed_files += 1
        fixed_headers += n
        if len(samples) < 3:
            samples.append((f, n))
    zf.close()
    print("files repaired: %d | duplicate headers collapsed: %d"
          % (fixed_files, fixed_headers))
    print("samples:", samples)


if __name__ == "__main__":
    main()
