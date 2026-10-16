import json

raw = open("batches/take13.json", encoding="utf-8").read()
out = []
i = 0
in_str = False
BS = chr(92)
while i < len(raw):
    c = raw[i]
    if not in_str:
        if c == '"':
            in_str = True
        out.append(c)
        i += 1
        continue
    if c == BS:
        out.append(raw[i:i + 2])
        i += 2
        continue
    if c == '"':
        j = i + 1
        while j < len(raw) and raw[j] in ' \t':
            j += 1
        if j < len(raw) and raw[j] in ',}\n]':
            in_str = False
            out.append(c)
            i += 1
            continue
        prev = out[-1] if out else ' '
        nxt = raw[i + 1] if i + 1 < len(raw) else ' '
        if prev in ' (:\t\n' or prev == chr(0x2014) or (prev == ' ' and nxt.isalpha()):
            out.append(chr(0x201C))
        else:
            out.append(chr(0x201D))
        i += 1
        continue
    out.append(c)
    i += 1

fixed = ''.join(out)
open("batches/take13.json", "w", encoding="utf-8").write(fixed)
d = json.load(open("batches/take13.json", encoding="utf-8"))
print("valid, edits:", len(d["edits"]))
