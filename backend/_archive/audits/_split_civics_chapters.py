"""Split the avallark text-based Democratic Politics PDF into chapter cache files.
Creates iess401.txt through iess405.txt matching the nit-in PDF naming.
Only creates/overwrites cache files (generated artifacts), NOT source data.
"""
from pathlib import Path

TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
full_text = (TEXT_CACHE / "9th-Democratic-Politics.txt").read_text(encoding="utf-8")

# Chapter boundaries found by scanning the text
# Ch1 starts ~2075, Ch2 starts ~53067, Ch3 starts ~101114, Ch4 starts ~146576,
# Ch5 starts ~200592, Ch6 starts ~249334
# Mapping: iess401=Ch1+Ch2, iess402=Ch3, iess403=Ch4, iess404=Ch5, iess405=Ch6

chapters = {
    "iess401": full_text[2075:101114],       # Ch 1+2: Democracy in Contemporary World + What is Democracy
    "iess402": full_text[101114:146576],     # Ch 3: Constitutional Design
    "iess403": full_text[146576:200592],     # Ch 4: Electoral Politics
    "iess404": full_text[200592:249334],     # Ch 5: Working of Institutions
    "iess405": full_text[249334:],           # Ch 6: Democratic Rights
}

for name, content in chapters.items():
    path = TEXT_CACHE / f"{name}.txt"
    path.write_text(content, encoding="utf-8")
    print(f"  {name}.txt: {len(content)} chars")

# Verify
for name in ["iess401", "iess402", "iess403", "iess404", "iess405"]:
    p = TEXT_CACHE / f"{name}.txt"
    print(f"  Verify {p.name}: exists={p.exists()}, size={p.stat().st_size}")
