"""ITS pipeline: routing -> diagnosis -> tutoring -> agents -> brain. See README.md.

MODULE-IDENTITY NOTE (2026-10-06 dig): legacy fallbacks spell submodules
`its.solver.X` while the deploy layout imports them as
`backend.its.solver.X`.  backend/its/solver/__init__.py aliases the bare
names onto the loaded backend.* modules so both spellings share one
STRUCTURE_SPECS registry (a fork here used to silently empty the
structure lane in combined test runs)."""
