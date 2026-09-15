from pathlib import Path
import re

t = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache\9th-Democratic-Politics.txt").read_text(encoding="utf-8")
print(f"Total chars: {len(t)}")
print()

# Find chapter markers — look for patterns like "CHAPTER 1", "CHAPTER 2", etc.
# Also look for page number patterns that indicate chapter starts
for m in re.finditer(r'CHAPTER\s+([0-9IV]+)', t):
    pos = m.start()
    context = t[max(0,pos-50):pos+100].replace('\n', ' ')
    print(f"  pos={pos:>6}  CHAPTER {m.group(1)}  ctx: {context!r}")

# Also look for "What is Democracy", "Constitutional", "Electoral", "Working", "Democratic Rights"
print("\n=== Key phrases ===")
for phrase in ["What is Democracy", "Constitutional Design", "Electoral Politics", "Working of Institutions", "Democratic Rights", "Democracy in the Contemporary"]:
    positions = [m.start() for m in re.finditer(re.escape(phrase), t, re.IGNORECASE)]
    if positions:
        print(f"  '{phrase}': positions {positions[:5]}")
