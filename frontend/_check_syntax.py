import sys

with open('app/(student)/diagnostic/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

counts = {
    'brace_open': content.count('{'),
    'brace_close': content.count('}'),
    'paren_open': content.count('('),
    'paren_close': content.count(')'),
    'bracket_open': content.count('['),
    'bracket_close': content.count(']'),
    'backtick': content.count('`'),
    'single_quote': content.count("'"),
    'double_quote': content.count('"'),
}

print('Counts:', counts)
print(f'Braces diff: {counts["brace_open"] - counts["brace_close"]}')
print(f'Parens diff: {counts["paren_open"] - counts["paren_close"]}')
print(f'Brackets diff: {counts["bracket_open"] - counts["bracket_close"]}')
print(f'Backticks: {counts["backtick"]} (even={counts["backtick"] % 2 == 0})')
print(f'Single quotes: {counts["single_quote"]} (even={counts["single_quote"] % 2 == 0})')
print(f'Double quotes: {counts["double_quote"]} (even={counts["double_quote"] % 2 == 0})')

# Find lines with odd single quotes
lines = content.split('\n')
for i, line in enumerate(lines, 1):
    sq = line.count("'")
    if sq % 2 != 0 and '`' not in line and not line.strip().startswith('//'):
        print(f'L{i} [odd sq={sq}]: {line[:120]}')
