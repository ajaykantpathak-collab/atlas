"""Get full traceback for the yaml error during registry init."""
import sys, os, importlib, importlib.util, traceback
from pathlib import Path

sys.path.insert(0, '.')
os.environ['DATABASE_URL'] = 'postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app'

# Replicate exactly what the registry does
solvers_dir = Path('solvers')

# First import base (like the registry does)
try:
    from solvers.base import SolverResult
except Exception:
    pass

# Now scan and import, looking for the yaml error
for subject_dir in sorted(solvers_dir.iterdir()):
    if not subject_dir.is_dir() or subject_dir.name.startswith('_'):
        continue
    for pyfile in sorted(subject_dir.glob('class*_*.py')):
        if pyfile.name.startswith('_'):
            continue
        stem = pyfile.stem
        if not (stem.endswith('_solver') or stem.endswith('_questions')):
            continue
        if stem in ('base', 'registry', 'generate_solvers', 'generate_solvers_v2',
                     'generate_batch1', 'latex_sympy_bridge', 'test_harness'):
            continue

        # Replicate registry's _import_file
        solvers_root = str(pyfile.parents[1]) if len(pyfile.parents) > 1 else str(pyfile.parent)
        parent_dir = str(pyfile.parent)
        for p in (solvers_root, parent_dir):
            if p not in sys.path:
                sys.path.insert(0, p)

        mod_name = f"solvers._plugins.{stem}"
        spec = importlib.util.spec_from_file_location(mod_name, pyfile)
        if spec is None or spec.loader is None:
            continue

        module = importlib.util.module_from_spec(spec)
        sys.modules[mod_name] = module
        try:
            spec.loader.exec_module(module)
        except Exception as exc:
            if 'yaml' in str(exc):
                print(f"=== YAML ERROR at {stem} ===")
                print(f"File: {pyfile}")
                traceback.print_exc()
                print(f"\n--- File contents around line 13 ---")
                with open(pyfile, 'r') as f:
                    lines = f.readlines()
                    for i, line in enumerate(lines[:20], 1):
                        marker = " >>> " if i == 13 else "     "
                        print(f"{marker}{i:4d}: {line.rstrip()}")
                sys.exit(0)
            # Clean up
            sys.modules.pop(mod_name, None)
