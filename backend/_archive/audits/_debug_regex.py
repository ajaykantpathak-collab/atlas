import re
s = ']},\n      "prerequisite'
result = re.sub(r'([}\]])\s*\n\s*"', r'\1,\n"', s)
print(repr(result))
# The issue: ]} already has the } but the regex needs to match } followed by newline+quote
# But the original text has ]} then newline then " — the } should match
# Let me check if the issue is that ]} is on the same line
s2 = '"negotiations"]},\n      "prerequisite_node_ids"'
result2 = re.sub(r'([}\]])\s*\n\s*"', r'\1,\n"', s2)
print(repr(result2))
