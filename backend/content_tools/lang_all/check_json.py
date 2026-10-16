"""check_json.py — string-aware bracket scan + per-entry json check."""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

s = open(sys.argv[1], encoding='utf-8').read()
BS = chr(92)
depth = 0; in_str = False; esc = False; line = 1
for i, ch in enumerate(s):
    if ch == '\n':
        line += 1
    if in_str:
        if esc:
            esc = False
        elif ch == BS:
            esc = True
        elif ch == '"':
            in_str = False
            if i + 1 < len(s) and s[i+1] not in '\n,:}] ':
                pass
    else:
        if ch == '"':
            in_str = True
        elif ch in '[{':
            depth += 1
        elif ch in ']}':
            depth -= 1
print('final depth:', depth, '| in_str at EOF:', in_str)

# per-entry: try to load each "key": {...} chunk standalone
import re
keys = list(re.finditer(r'\n "(c7_hin_cbse_\d+\.md)": \{"pairs": \[', s))
for m in keys:
    start = m.start() + 1
    nxt = keys[keys.index(m)+1].start() if keys.index(m) < len(keys)-1 else s.rindex('}')
    chunk = s[start:nxt]
    body = chunk[chunk.index('['):chunk.rindex(']')+1]
    try:
        json.loads(body)
    except json.JSONDecodeError as e:
        print('BAD ENTRY', m.group(1), 'line-err', e.lineno, e.colno, e.msg)
        print('  near:', body.splitlines()[e.lineno-1][:100] if e.lineno-1 < len(body.splitlines()) else '?')
