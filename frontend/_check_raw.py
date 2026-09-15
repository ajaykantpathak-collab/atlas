with open('app/(student)/homework/page.tsx.raw', 'r', encoding='utf-8') as f:
    content = f.read()
idx = content.find('"code"')
print(f'Code field at index {idx}')
snippet = content[idx:idx+300]
print(repr(snippet))
# Also check for double-escaped newlines
print(f'\nCount of \\\\n (double-escaped): {content.count(chr(92)+chr(92)+chr(110))}')
print(f'Count of \\n (single-escaped): {content.count(chr(92)+chr(110))}')
# Check around line 1041 area - find the role="group" text
idx2 = content.find('role=')
if idx2 > 0:
    print(f'\nAround role= at {idx2}:')
    print(repr(content[idx2-50:idx2+100]))
