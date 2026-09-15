"""_peek.py -- extract heading structure + section starts from a chapter text."""
import re
import sys
from pathlib import Path

CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache_new")


def peek(stem, width=95):
    txt = (CACHE / f"{stem}.txt").read_text(encoding="utf-8", errors="ignore")
    lines = [l.strip() for l in txt.splitlines()]
    out = []
    for i, l in enumerate(lines):
        if not l or len(l) > width:
            continue
        words = l.split()
        # heading heuristics: title-case / caps / numbered, not ending with period
        if l.endswith((".", ",", ";", "?")) and not l.endswith(("?\"",)):
            continue
        if len(words) <= 12:
            caps = sum(1 for w in words if w[0].isupper() or not w[0].isalpha())
            if caps >= max(2, len(words) - 2):
                out.append(f"[{i}] {l}")
    print("\n".join(out))


def sec(stem, start, n=28):
    txt = (CACHE / f"{stem}.txt").read_text(encoding="utf-8", errors="ignore")
    lines = txt.splitlines()
    print("\n".join(l for l in lines[start:start + n] if l.strip()))


def grep(stem, pattern, ctx=0):
    txt = (CACHE / f"{stem}.txt").read_text(encoding="utf-8", errors="ignore")
    lines = txt.splitlines()
    for i, l in enumerate(lines):
        if re.search(pattern, l, re.I):
            lo, hi = max(0, i - ctx), min(len(lines), i + ctx + 1)
            print(f"[{i}] " + " | ".join(x.strip() for x in lines[lo:hi] if x.strip()))


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "peek":
        peek(sys.argv[2])
    elif mode == "sec":
        sec(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]) if len(sys.argv) > 4 else 28)
    elif mode == "grep":
        grep(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 0)
