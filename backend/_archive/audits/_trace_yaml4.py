"""Trace which exact solver module import breaks yaml."""
import sys, os, importlib, importlib.util
from pathlib import Path

sys.path.insert(0, '.')
os.environ['DATABASE_URL'] = 'postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app'

import yaml
_orig_yaml = sys.modules.get('yaml')
print(f"Start: yaml.safe_load = {hasattr(_orig_yaml, 'safe_load')}")

solvers_dir = Path('solvers')
skip = {'base', 'registry', 'generate_solvers', 'generate_solvers_v2',
        'generate_batch1', 'latex_sympy_bridge', 'test_harness'}

for subject_dir in sorted(solvers_dir.iterdir()):
    if not subject_dir.is_dir() or subject_dir.name.startswith('_'):
        continue
    for pyfile in sorted(subject_dir.glob('class*_*.py')):
        if pyfile.name.startswith('_'):
            continue
        stem = pyfile.stem
        if stem in skip:
            continue
        if not (stem.endswith('_solver') or stem.endswith('_questions')):
            continue

        # Check yaml before import
        y = sys.modules.get('yaml')
        if y is not _orig_yaml or not hasattr(y, 'safe_load'):
            print(f"\n*** YAML BROKEN before importing {stem} ***")
            print(f"    yaml = {y}")
            print(f"    is original: {y is _orig_yaml}")
            print(f"    safe_load: {hasattr(y, 'safe_load')}")
            sys.exit(0)

        # Replicate registry's import
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
                print(f"\n*** YAML ERROR importing {stem} ***")
                print(f"    Error: {exc}")
                y = sys.modules.get('yaml')
                print(f"    yaml = {y}")
                print(f"    is original: {y is _orig_yaml}")
                print(f"    safe_load: {hasattr(y, 'safe_load')}")
                # Check what yaml is now
                print(f"    yaml file: {getattr(y, '__file__', 'NONE')}")
                print(f"    yaml path: {getattr(y, '__path__', 'NONE')}")
                sys.exit(0)
            sys.modules.pop(mod_name, None)

        # Check yaml after import
        y = sys.modules.get('yaml')
        if y is not _orig_yaml:
            print(f"\n*** YAML REPLACED after importing {stem} ***")
            print(f"    old yaml = {_orig_yaml}")
            print(f"    new yaml = {y}")
            print(f"    safe_load: {hasattr(y, 'safe_load')}")
            sys.exit(0)

print("\nNo yaml breakage detected!")
