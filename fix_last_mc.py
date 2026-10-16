"""Last one: c8_engl_ch5_17 — author its COMMON_MISCONCEPTION section
verbatim from the node's own diagnostic analysis (authored content)."""
import json, re

idx = json.load(open(r"D:\platform\backend\_cache\enhanced_nodes_index.json", encoding="utf-8"))
n = [x for x in idx["nodes"] if x["node_id"] == "c8_engl_ch5_17"][0]
d0 = (n.get("diagnostics") or [{}])[0]
mc = str(d0.get("misconception") or "").strip()
print("misconception len:", len(mc))
assert len(mc) > 20, "no authored misconception to derive from"

p = r"D:\platform\content\enhanced_nodes_md\c8_engl_ch5_17.md"
text = open(p, encoding="utf-8-sig", errors="replace").read()
if "## COMMON_MISCONCEPTION" not in text:
    new = re.sub(r"(?=## DEFINITION)", "## COMMON_MISCONCEPTION\n" + mc + "\n\n", text, count=1)
    open(p, "w", encoding="utf-8", newline="").write(new)
    print("written, len:", len(new) - len(text))
else:
    print("already present")
