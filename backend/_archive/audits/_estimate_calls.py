import sys; sys.path.insert(0, '.')
from cbse_coverage_pipeline import get_chapters_for_grade, split_large_text, MAX_TEXT_CHARS
from pathlib import Path

chapters = get_chapters_for_grade(12)
total_calls = 0
splits = 0
for ch in chapters:
    text = Path(ch['cache_path']).read_text(encoding='utf-8', errors='replace')
    chunks = split_large_text(text)
    calls = len(chunks)
    total_calls += calls
    if calls > 1:
        splits += 1
        print(f"  SPLIT: {ch['file']} ({len(text)//1024}KB) -> {calls} chunks")

print(f"")
print(f"Total chapters: {len(chapters)}")
print(f"Chapters that split: {splits}")
print(f"Total Claude calls: {total_calls}")
print(f"At 10 workers, ~{total_calls//10} min if each call takes ~1 min")
