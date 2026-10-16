"""Tests for harness/boundaries.py — the import-boundary lint (Phase C).

Two layers:

1. RULE tests — synthetic import strings fed straight to ``lint_imports`` /
   ``resolve_relative``; every violation class and every sanctioned exception
   is pinned here.
2. SCAN tests — a synthetic package tree on disk (tmp_path) parsed end-to-end,
   plus a LIVE-TREE scan of the real backend asserting structural soundness:
   every reported finding must correspond to a real import line in that file
   (zero-false-positive guarantee) and calibrated true negatives must NOT be
   flagged.
"""

from __future__ import annotations

import functools
import importlib
import pathlib
import sys

import pytest

_DEPLOY_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
if str(_DEPLOY_ROOT) not in sys.path:
    sys.path.insert(0, str(_DEPLOY_ROOT))

boundaries = importlib.import_module("backend.harness.boundaries")


def codes(violations) -> set:
    return {v.code for v in violations}


def imports_of(violations) -> set:
    return {v.imported for v in violations}


# --------------------------------------------------------------------------- #
# 1. Rule core — synthetic import strings
# --------------------------------------------------------------------------- #
class TestAiLegacyWall:
    def test_ai_importing_its_solver_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.ai.classifier", ["backend.its.solver.kernel"])
        assert codes(v) == {"AI_LEGACY_TO_SOLVER"}
        assert v[0].imported == "backend.its.solver.kernel"

    def test_legacy_module_importing_its_solver_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.its.competency._archive.legacy.bridge",
            ["backend.its.solver.deterministic_service"])
        assert codes(v) == {"AI_LEGACY_TO_SOLVER"}

    def test_ai_importing_services_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.ai.graph_router", ["backend.services.graph_service"])
        assert codes(v) == {"AI_LEGACY_TO_SERVICES"}

    def test_llm_client_is_the_sanctioned_seam(self):
        v = boundaries.lint_imports(
            "backend.ai.llm_solver", ["backend.services.llm_client"])
        assert v == []

    def test_ai_importing_its_tutoring_is_allowed(self):
        # the wall is around its.SOLVER, not the whole its package
        v = boundaries.lint_imports(
            "backend.ai.misconception_matcher",
            ["backend.its.tutoring.misconception_matcher"])
        assert v == []

    def test_legacy_importing_non_solver_its_is_allowed(self):
        v = boundaries.lint_imports(
            "backend.its.competency._archive.legacy.bridge",
            ["backend.its.formula_graph.builder"])
        assert v == []


class TestEdgeSolverWall:
    def test_router_importing_its_solver_directly_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.routers.solver",
            ["backend.its.solver.deterministic_service"])
        assert codes(v) == {"ROUTER_DIRECT_SOLVER"}

    def test_api_importing_its_solver_directly_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.api.verified_practice",
            ["backend.its.solver.answer_pipeline"])
        assert codes(v) == {"ROUTER_DIRECT_SOLVER"}

    def test_router_importing_services_layer_is_the_sanctioned_path(self):
        v = boundaries.lint_imports(
            "backend.routers.progress", ["backend.services.solve_isolation"])
        assert v == []

    def test_router_importing_non_solver_its_is_not_this_rules_job(self):
        v = boundaries.lint_imports(
            "backend.routers.tutor", ["backend.its.tutoring.engine"])
        assert v == []


class TestRouterCrossImports:
    def test_router_importing_another_router_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.routers.auth", ["backend.routers.progress"])
        assert codes(v) == {"ROUTER_CROSS_IMPORT"}

    def test_api_importing_router_internals_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.api.homework", ["backend.routers.compq"])
        assert codes(v) == {"ROUTER_CROSS_IMPORT"}

    def test_router_importing_api_internals_is_flagged(self):
        v = boundaries.lint_imports(
            "backend.routers.guidance", ["backend.api.teacher"])
        assert codes(v) == {"ROUTER_CROSS_IMPORT"}

    def test_api_to_api_helper_sharing_is_documented_carveout(self):
        # api/* share helpers (_assessment_sessions, _require_staff); this is
        # an established tree pattern the lint deliberately does not police.
        v = boundaries.lint_imports(
            "backend.api.assignments", ["backend.api.teacher"])
        assert v == []

    def test_routers_package_init_is_the_wiring_exempt(self):
        v = boundaries.lint_imports(
            "backend.routers",
            ["backend.routers.auth", "backend.routers.content"],
            is_init=True,
        )
        assert v == []

    def test_self_import_ignored(self):
        v = boundaries.lint_imports(
            "backend.routers.auth", ["backend.routers.auth"])
        assert v == []


class TestNeutralZone:
    def test_main_and_services_are_unconstrained(self):
        assert boundaries.lint_imports(
            "backend.main",
            ["backend.routers.auth", "backend.its.solver.contract"],
        ) == []
        assert boundaries.lint_imports(
            "backend.services.solve_isolation",
            ["backend.its.solver.deterministic_service"],
        ) == []

    def test_third_party_imports_ignored(self):
        assert boundaries.lint_imports(
            "backend.ai.classifier", ["httpx", "sqlalchemy.orm"]) == []

    def test_multiple_violations_deduped_and_ordered(self):
        v = boundaries.lint_imports(
            "backend.routers.solver",
            ["backend.its.solver.a", "backend.its.solver.a",
             "backend.its.solver.b"])
        assert len(v) == 2
        assert imports_of(v) == {
            "backend.its.solver.a", "backend.its.solver.b"}


# --------------------------------------------------------------------------- #
# 2. Relative import resolution
# --------------------------------------------------------------------------- #
class TestResolveRelative:
    def test_level1_from_plain_module_hits_sibling(self):
        assert boundaries.resolve_relative(
            "backend.routers.auth", False, 1, None) == "backend.routers"

    def test_level1_with_target_from_plain_module(self):
        assert boundaries.resolve_relative(
            "backend.routers.auth", False, 1, "progress") == \
            "backend.routers.progress"

    def test_level1_from_package_init_stays_in_package(self):
        assert boundaries.resolve_relative(
            "backend.routers", True, 1, "auth") == "backend.routers.auth"

    def test_level2_climbs_one_package(self):
        assert boundaries.resolve_relative(
            "backend.routers.auth", False, 2, "services.x") == \
            "backend.services.x"


# --------------------------------------------------------------------------- #
# 3. Full AST scan on a synthetic tree
# --------------------------------------------------------------------------- #
def _write(path: pathlib.Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


@pytest.fixture()
def synthetic_backend(tmp_path: pathlib.Path) -> pathlib.Path:
    root = tmp_path / "backend"
    _write(root / "__init__.py", "")
    _write(root / "ai" / "__init__.py", "")
    _write(root / "ai" / "classifier.py", "import httpx\n")
    _write(root / "ai" / "bad_solver.py",
           "def f():\n"
           "    from backend.its.solver.kernel import k\n"
           "    return k\n")
    _write(root / "ai" / "bad_services.py",
           "from backend.services.graph_service import g\n")
    _write(root / "ai" / "ok_llm.py",
           "from backend.services.llm_client import chat\n")
    _write(root / "its" / "__init__.py", "")
    _write(root / "its" / "solver" / "__init__.py", "")
    _write(root / "its" / "solver" / "kernel.py", "K = 1\n")
    _write(root / "services" / "__init__.py", "")
    _write(root / "services" / "graph_service.py", "g = 1\n")
    _write(root / "services" / "llm_client.py", "chat = 1\n")
    _write(root / "services" / "solve_isolation.py", "run = 1\n")
    _write(root / "routers" / "__init__.py",
           "from backend.routers.ok_router import router\n")
    _write(root / "routers" / "ok_router.py",
           "from backend.services.solve_isolation import run\n"
           "router = 1\n")
    _write(root / "routers" / "bad_direct.py",
           "from backend.its.solver.kernel import K\nrouter = 2\n")
    _write(root / "routers" / "bad_cross.py",
           "from backend.routers.ok_router import router\nrouter = 3\n")
    _write(root / "main.py", "from backend.routers import bad_direct\n")
    return root


class TestScanTreeSynthetic:
    def test_all_three_classes_detected_with_line_numbers(
            self, synthetic_backend):
        violations, scanned = boundaries.scan_tree(synthetic_backend)
        assert scanned >= 13
        by_code = {}
        for v in violations:
            by_code.setdefault(v.code, []).append(v)

        direct = by_code.get("ROUTER_DIRECT_SOLVER", [])
        assert len(direct) == 1
        assert direct[0].module == "backend.routers.bad_direct"
        assert direct[0].imported == "backend.its.solver.kernel"
        assert direct[0].line == 1

        ai_solver = by_code.get("AI_LEGACY_TO_SOLVER", [])
        assert len(ai_solver) == 1
        assert ai_solver[0].module == "backend.ai.bad_solver"
        assert ai_solver[0].line == 2          # function-level import caught

        ai_services = by_code.get("AI_LEGACY_TO_SERVICES", [])
        assert {v.module for v in ai_services} == {"backend.ai.bad_services"}

        cross = by_code.get("ROUTER_CROSS_IMPORT", [])
        assert {v.module for v in cross} == {"backend.routers.bad_cross"}

        # the sanctioned files produced nothing
        flagged_modules = {v.module for v in violations}
        assert "backend.ai.ok_llm" not in flagged_modules
        assert "backend.routers.ok_router" not in flagged_modules
        assert "backend.routers" not in flagged_modules   # init aggregator

    def test_render_contains_finding_facts(self, synthetic_backend):
        violations, _ = boundaries.scan_tree(synthetic_backend)
        assert violations
        for v in violations:
            text = v.render()
            assert v.code in text
            assert v.imported in text
            assert f":{v.line}" in text


# --------------------------------------------------------------------------- #
# 4. LIVE-TREE scan — findings are findings; false positives are failures
# --------------------------------------------------------------------------- #
def _live_scan():
    """One cached live-tree scan shared by all live-tree tests (the parse of
    ~1.5k files costs seconds; never pay it per-test)."""
    root = boundaries.default_pkg_root()
    assert (root / "main.py").exists(), f"unexpected pkg root: {root}"
    violations, scanned = boundaries.scan_tree(root)
    return root, scanned, violations


_live_scan = functools.lru_cache(maxsize=1)(_live_scan)


class TestLiveTree:
    def test_scan_completes_and_codes_are_known(self):
        _, scanned, violations = _live_scan()
        assert scanned > 100, "sanity: real backend has hundreds of files"
        assert codes(violations) <= set(boundaries.ALL_CODES) | {"SYNTAX_ERROR"}

    def test_zero_false_positives_every_finding_is_a_real_import_line(self):
        root, _, violations = _live_scan()
        for v in violations:
            if v.code == "SYNTAX_ERROR":
                continue
            path = pathlib.Path(v.file)
            if not path.is_absolute():
                path = root / v.file
            lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
            src_line = lines[v.line - 1] if v.line <= len(lines) else ""
            # the flagged line must literally import the flagged module
            assert v.imported in src_line, (
                f"FALSE POSITIVE? {v.render()} — line reads: {src_line!r}")
            # and must be a genuine import statement
            assert "import" in src_line, v.render()

    def test_calibrated_true_negatives_are_never_flagged(self):
        _, _, violations = _live_scan()
        # its.tutoring / its.formula_graph shims from ai/ are ALLOWED by design
        for v in violations:
            assert not v.imported.startswith("backend.its.tutoring"), v.render()
            assert not v.imported.startswith("backend.its.formula_graph"), v.render()
            assert v.imported != "backend.services.llm_client"
            # the routers/__init__ aggregator must never be a finding
            assert v.module != "backend.routers"
            assert v.module != "backend.api"

    def test_edge_and_ai_walls_are_clean(self):
        _, _, violations = _live_scan()
        # closed 2026-10-02: the 24 ROUTER_DIRECT_SOLVER findings were
        # re-routed through backend.services.solver_gateway / vision_extract;
        # the 2 AI_LEGACY_TO_SERVICES findings (graph_router,
        # conceptual_handler) were inverted into injected dependencies.
        assert [v for v in violations
                if v.code == "ROUTER_DIRECT_SOLVER"] == []
        assert [v for v in violations
                if v.code == "AI_LEGACY_TO_SERVICES"] == []
        assert [v for v in violations
                if v.code == "AI_LEGACY_TO_SOLVER"] == []
        # router cross-imports must stay gone too
        assert [v for v in violations
                if v.code == "ROUTER_CROSS_IMPORT"] == []

    def test_cli_exit_codes(self, synthetic_backend, capsys):
        # exit-code semantics on the synthetic tree (fast, deterministic);
        # the live tree is exercised by TestLiveTree + the CLI run in the
        # build report.
        rc_ok = boundaries.main(["check", "--root", str(synthetic_backend / "services")])
        assert rc_ok == 0
        assert "OK" in capsys.readouterr().out
        rc_bad = boundaries.main(["check", "--root", str(synthetic_backend)])
        assert rc_bad == 1
        out = capsys.readouterr().out
        assert "violation" in out
