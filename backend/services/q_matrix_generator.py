"""Deprecated shim — the module behind this name was archived 2026-10-10 (overhaul G-P19/G-P05).

``q_matrix_generator`` had zero live importers and zero test pins (grep-proven);
its implementation, backend/its/diagnosis/q_matrix_generator.py, was moved to
backend/_trash/gp19_dead_2026-10-10/its_diagnosis/. This docstring-only stub remains
(2026-09-13 audit precedent) so the WS-D-owned KNOWN_UNWIRED baseline in
tests/test_service_reachability.py keeps passing until WS-D drops the baseline row and
deletes this file. Any ``from ... import X`` on it raises ImportError by design.
"""
