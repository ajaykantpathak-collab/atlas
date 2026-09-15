"""Find the function with arg ordering issue in class9_maths_questions.py"""
import ast

with open('solvers/maths/class9_maths_questions.py') as f:
    source = f.read()

try:
    tree = ast.parse(source)
except SyntaxError as e:
    print(f"SyntaxError at line {e.lineno}: {e.msg}")
    # Can't parse - find the issue manually
    import sys
    sys.exit(1)

for node in ast.walk(tree):
    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
        args = node.args
        if not args.args:
            continue
        defaults_count = len(args.defaults)
        if defaults_count == 0:
            continue
        # first_default is the index of the first arg that has a default
        first_default_idx = len(args.args) - defaults_count
        # Check if any arg after first_default_idx+1 has no default
        # Actually in Python, defaults apply to the last N args
        # The error "non-default argument follows default argument" means
        # there's an arg without default after an arg with default
        # This shouldn't happen in valid AST... unless it's a dataclass
        # or something else. Let me just print all functions with defaults
        arg_names = [a.arg for a in args.args]
        default_args = arg_names[first_default_idx:]
        non_default_args = arg_names[:first_default_idx]
        print(f"Line {node.lineno}: def {node.name}({', '.join(arg_names)})")
        print(f"  Non-default: {non_default_args}")
        print(f"  Default: {default_args}")
        print()
