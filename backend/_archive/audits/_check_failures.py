"""Check remaining failures after fixes."""
import sys, os
sys.path.insert(0, '.')
os.environ['DATABASE_URL'] = 'postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app'
from solvers.registry import get_registry
r = get_registry()
stats = r.initialize()
print(f"Solvers: {stats.solver_count}, Problem types: {stats.total_problem_types}, Failed: {len(stats.failed_modules)}")
for f in stats.failed_modules:
    print(f"  FAILED: {f['module']}: {f['error'][:100]}")
