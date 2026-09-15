import sys

with open('app/(student)/diagnostic/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Track brace depth, accounting for strings and template literals
depth = 0
in_string = None  # None, '"', "'", '`'
in_comment = False
in_line_comment = False
prev_char = ''
in_template_expr = 0  # depth of ${...} inside template literals

for i, line in enumerate(lines, 1):
    j = 0
    while j < len(line):
        c = line[j]
        next_c = line[j+1] if j+1 < len(line) else ''
        
        if in_line_comment:
            if c == '\n':
                in_line_comment = False
            j += 1
            continue
        
        if in_comment:
            if c == '*' and next_c == '/':
                in_comment = False
                j += 2
                continue
            j += 1
            continue
        
        if in_string:
            if c == '\\':
                j += 2
                continue
            if c == in_string:
                in_string = None
            j += 1
            continue
        
        # Not in string or comment
        if c == '/' and next_c == '/':
            in_line_comment = True
            j += 2
            continue
        if c == '/' and next_c == '*':
            in_comment = True
            j += 2
            continue
        if c == '"' or c == "'":
            in_string = c
            j += 1
            continue
        if c == '`':
            in_string = '`'
            j += 1
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth < 0:
                print(f'L{i} col{j+1}: EXTRA close brace (depth went to {depth})')
        j += 1
    
    # Report depth at end of each function/component (heuristic: lines starting with 'function' or 'const X =')
    if depth < 0:
        print(f'After L{i}: depth={depth}')

print(f'\nFinal depth: {depth}')
print(f'In string at end: {in_string}')
print(f'In comment at end: {in_comment}')
