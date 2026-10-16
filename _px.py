import pathlib
codes=["leph","heph","jeph","leps","hees","jesc","iesc","lech","kech","lecs","jess","hees103"]
for code in codes:
    fs=sorted(pathlib.Path(r"D:\_KEEP\text_cache_new").glob(code+"*.txt"))
    if not fs: print("%-8s MISSING" % code); continue
    f=fs[0]
    head=f.read_text(encoding="utf-8",errors="ignore").strip().splitlines()
    first=next((h.strip() for h in head if h.strip()),"")
    print("%-8s %-3d files  %s | %s" % (code,len(fs),f.name,first[:70]))
