"""Behavioural tests for harness/loadgen (A5-HARDENING Phase B).

Offline by construction: the mini-run drives an httpx.MockTransport, so no
live server (and no heavy backend import chain) is needed.  The percentile
math is pinned against KNOWN distributions before any real baseline number
produced by the generator can be trusted.

Loaded by import after a sys.path bootstrap (backend/__init__ is a light
sys.path shim — see test_observability.py for why the heavy chain is avoided;
the loadgen package itself is stdlib+httpx only by design).
"""

from __future__ import annotations

import asyncio
import importlib
import json
import pathlib
import random
import sys

import httpx
import pytest

_DEPLOY_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
if str(_DEPLOY_ROOT) not in sys.path:
    sys.path.insert(0, str(_DEPLOY_ROOT))

percentiles = importlib.import_module("backend.harness.loadgen.percentiles")
corpus = importlib.import_module("backend.harness.loadgen.corpus")
scenarios = importlib.import_module("backend.harness.loadgen.scenarios")
runner = importlib.import_module("backend.harness.loadgen.runner")


# --------------------------------------------------------------------------- #
# 1. Percentile math against KNOWN distributions
# --------------------------------------------------------------------------- #
class TestPercentileMath:
    def test_uniform_1_to_100_nearest_rank_exact(self):
        vals = list(range(1, 101))
        p = percentiles.percentiles(vals)
        assert p[50] == 50.0
        assert p[75] == 75.0
        assert p[95] == 95.0
        assert p[99] == 99.0

    def test_nearest_rank_small_sample(self):
        # N=4: p50 -> ceil(0.5*4)=2 -> 20 ; p95 -> ceil(3.8)=4 -> 40
        vals = [10.0, 20.0, 30.0, 40.0]
        assert percentiles.nearest_rank(vals, 50) == 20.0
        assert percentiles.nearest_rank(vals, 75) == 30.0
        assert percentiles.nearest_rank(vals, 95) == 40.0
        assert percentiles.nearest_rank(vals, 0) == 10.0
        assert percentiles.nearest_rank(vals, 100) == 40.0

    def test_unsorted_input_is_sorted_internally(self):
        p = percentiles.percentiles([99.0, 1.0, 50.0, 25.0, 75.0])
        assert p[50] == 50.0
        assert p[95] == 99.0

    def test_single_sample_all_percentiles_equal_it(self):
        p = percentiles.percentiles([42.5])
        assert set(p.values()) == {42.5}

    def test_monotonic_percentiles_on_skewed_distribution(self):
        # 95 fast requests at ~10ms, 5 slow outliers at ~1000ms
        vals = [10.0] * 95 + [1000.0] * 5
        p = percentiles.percentiles(vals)
        assert p[50] <= p[75] <= p[95] <= p[99]
        assert p[95] == 10.0      # outliers live above p95
        assert p[99] == 1000.0    # and are caught by p99

    def test_empty_sample_raises(self):
        with pytest.raises(ValueError):
            percentiles.nearest_rank([], 50)

    def test_summarize_counts_errors_and_rps(self):
        s = percentiles.summarize(
            [10.0, 20.0, 30.0, 40.0], errors=1, window_seconds=2.0
        )
        assert s["requests"] == 4
        assert s["error_rate"] == 0.25
        assert s["rps"] == 2.0
        assert s["p95_ms"] == 40.0
        assert s["mean_ms"] == 25.0


# --------------------------------------------------------------------------- #
# 2. Traffic mix contract
# --------------------------------------------------------------------------- #
def test_scenario_weights_sum_to_100():
    assert sum(scenarios.SCENARIO_WEIGHTS.values()) == 100
    assert scenarios.SCENARIO_WEIGHTS == {
        "content_get": 70,
        "solve_post": 15,
        "tutor_flow": 10,
        "auth_progress": 5,
    }


def test_pick_scenario_only_returns_known_names():
    rng = random.Random(0)
    picks = {scenarios.pick_scenario(rng) for _ in range(2000)}
    assert picks <= set(scenarios.SCENARIO_WEIGHTS)
    # a 2000-sample draw must exercise at least the two heaviest scenarios
    assert "content_get" in picks and "solve_post" in picks


def test_corpus_has_20_real_questions_in_three_flavours():
    assert len(corpus.QUESTIONS) == 20
    flavours = {q["flavour"] for q in corpus.QUESTIONS}
    assert flavours == {"numeric", "bank", "prose"}
    for q in corpus.QUESTIONS:
        assert len(q["text"]) >= 20          # server schema min_length=5
        assert len(q["text"]) <= 4000        # server schema max_length
        assert q["node_id"]                  # repertoire binding rides along
    assert len(set(q["id"] for q in corpus.QUESTIONS)) == 20
    # node ids and doodle assets must be real corpus shapes
    assert corpus.NODE_IDS and all(n.startswith("c") for n in corpus.NODE_IDS)
    assert corpus.doodle_asset_path(random.Random(1)).endswith(".webp")


# --------------------------------------------------------------------------- #
# 3. Mini-run against httpx.MockTransport (10-request smoke, offline)
# --------------------------------------------------------------------------- #
def _mock_handler(request: httpx.Request) -> httpx.Response:
    path = request.url.path
    if path == "/api/auth/signup":
        return httpx.Response(201, json={"access_token": "tok-smoke",
                                         "user": {"id": "u1"}})
    if path == "/api/auth/login":
        return httpx.Response(200, json={"access_token": "tok-smoke"})
    if path == "/api/auth/me":
        return httpx.Response(200, json={"id": "u1", "email": "x@example.com"})
    if path in ("/api/progress/overview", "/api/progress/dashboard"):
        return httpx.Response(200, json={})
    if path == "/api/practice/deterministic/solve":
        return httpx.Response(200, json={"tier": "VERIFIED", "answer": "1"})
    if path == "/api/tutor/sessions":
        return httpx.Response(201, json={"session_id": "sess-1", "messages": []})
    if path.startswith("/api/tutor/sessions/") and path.endswith("/reply"):
        return httpx.Response(200, json={"session_id": "sess-1", "reply": {}})
    if path.startswith("/api/content/nodes/"):
        return httpx.Response(200, json={"id": "n", "title": "t"})
    if path.startswith("/doodle_cards/"):
        return httpx.Response(200, content=b"\x00webp")
    return httpx.Response(404, json={"detail": "nope"})


def _mini_run(max_requests: int = 10, ramp: int = 2, steady: bool = True):
    """Mini-run against the mock.  ``steady=True`` zeroes the warm-up window
    so all samples land in the steady phase (the percentile path); the
    default window keeps >=1s warm-up so run-level phase tagging is exercised
    too."""
    cfg = runner.RunConfig(
        base="http://mock",
        ramp=ramp,
        seconds=5.0,
        warmup_frac=0.0 if steady else 0.2,
        warmup_min_s=0.0 if steady else 1.0,
        max_requests=max_requests,
        think_time=0.0,
        seed=7,
        signup_budget=5,
        transport=httpx.MockTransport(_mock_handler),
    )
    return asyncio.run(runner.run_load(cfg))


class TestMockSmokeRun:
    def test_ten_request_run_completes_zero_errors(self):
        # steady=False keeps the >=1s warm-up window: the whole mini-run lands
        # inside it, which is exactly how phase tagging is exercised
        result = _mini_run(max_requests=10, steady=False)
        # request cap reached (multi-request tutor iterations may overshoot
        # the cap by at most one iteration per in-flight worker)
        assert len(result.samples) >= 10
        assert len(result.samples) <= 10 + 5 * 2
        assert all(s.ok for s in result.samples), [
            (s.endpoint, s.status) for s in result.samples if not s.ok
        ]
        # phase tagging ran: every sample is warm-up, none leaked into steady
        assert result.report["meta"]["warmup_samples"] == len(result.samples)
        assert result.report["summary"]["requests_steady"] == 0
        assert all(s.phase == "warmup" for s in result.samples)

    def test_report_shape_and_percentile_ordering(self):
        result = _mini_run(max_requests=10, steady=True)
        report = result.report
        # load_baseline.json shape
        assert set(report) == {"meta", "summary", "endpoints"}
        assert report["meta"]["tool"] == "backend.harness.loadgen"
        assert report["meta"]["ramp"] == 2
        for key in ("requests_total", "requests_steady", "errors_steady",
                    "error_rate_steady", "rps_steady",
                    "p50_ms", "p75_ms", "p95_ms", "p99_ms"):
            assert key in report["summary"]
        assert report["summary"]["requests_total"] == len(result.samples)
        assert report["summary"]["requests_steady"] >= 1
        assert report["summary"]["errors_steady"] == 0
        assert report["summary"]["error_rate_steady"] == 0
        # per-endpoint rows: percentiles positive + monotonic + JSON-serializable
        assert report["endpoints"], "expected at least one endpoint row"
        for row in report["endpoints"]:
            for key in ("p50_ms", "p75_ms", "p95_ms", "p99_ms"):
                assert row[key] > 0
            assert row["p50_ms"] <= row["p75_ms"] <= row["p95_ms"] <= row["p99_ms"]
            assert row["requests"] >= 1
        json.dumps(report)  # must not raise

    def test_mix_produces_multiple_endpoint_families(self):
        result = _mini_run(max_requests=24, ramp=3, steady=True)
        families = set()
        for row in result.report["endpoints"]:
            if row["endpoint"].startswith("GET /api/content"):
                families.add("content")
            elif row["endpoint"].startswith("GET /doodle_cards"):
                families.add("asset")
            elif "deterministic/solve" in row["endpoint"]:
                families.add("solve")
            elif "auth" in row["endpoint"]:
                families.add("auth")
            elif "tutor" in row["endpoint"]:
                families.add("tutor")
        # with 24+ weighted draws every family is statistically certain
        assert {"content", "solve"} <= families


# --------------------------------------------------------------------------- #
# 4. Report aggregation semantics (hand-built samples)
# --------------------------------------------------------------------------- #
class TestReportAggregation:
    def test_warmup_samples_excluded_from_endpoint_rows(self):
        samples = [
            runner.Sample("warmup", "GET /warm", 99999.0, 500, 0.1),
            runner.Sample("steady", "GET /api/x", 10.0, 200, 2.0),
            runner.Sample("steady", "GET /api/x", 30.0, 200, 2.4),
            runner.Sample("steady", "GET /api/x", 20.0, 200, 2.8),
        ]
        report = runner.build_report(
            samples, base_url="http://mock", ramp=1, seconds=10.0,
            warmup_seconds=1.0, steady_window=9.0, elapsed=9.5,
        )
        eps = {r["endpoint"]: r for r in report["endpoints"]}
        assert "GET /warm" not in eps          # warm-up never reaches the table
        row = eps["GET /api/x"]
        assert row["requests"] == 3
        assert row["p50_ms"] == 20.0           # nearest-rank of [10,20,30]
        assert row["errors"] == 0
        assert report["meta"]["warmup_samples"] == 1
        assert report["summary"]["requests_steady"] == 3

    def test_error_classification_500_and_transport_fail_409_benign(self):
        samples = [
            runner.Sample("steady", "GET /a", 5.0, 200, 1.0),
            runner.Sample("steady", "GET /a", 5.0, 409, 1.1),   # benign probe
            runner.Sample("steady", "GET /a", 5.0, 500, 1.2),   # server error
            runner.Sample("steady", "GET /b", 5.0, -1, 1.3),    # transport fail
            runner.Sample("steady", "GET /b", 5.0, 429, 1.4),   # rate limited
        ]
        report = runner.build_report(
            samples, base_url="http://mock", ramp=1, seconds=10.0,
            warmup_seconds=1.0, steady_window=9.0, elapsed=9.5,
        )
        eps = {r["endpoint"]: r for r in report["endpoints"]}
        assert eps["GET /a"]["errors"] == 1            # 409 does not count
        assert eps["GET /b"]["errors"] == 2            # -1 and 429 count
        assert report["summary"]["errors_steady"] == 3

    def test_format_table_renders_rows(self):
        result = _mini_run(max_requests=10, steady=True)
        table = runner.format_table(result.report)
        assert "endpoint" in table
        assert "p95" in table
        assert len(table.splitlines()) >= 5


# --------------------------------------------------------------------------- #
# 5. Relative-import resolution helper shared with the boundaries lint
# --------------------------------------------------------------------------- #
def test_runner_config_defaults_documented():
    cfg = runner.RunConfig()
    assert cfg.base == "http://localhost"
    assert cfg.ramp == 50 and cfg.seconds == 600.0
    assert cfg.warmup_frac == 0.10
    assert cfg.warmup_min_s == 1.0   # production floor; tests zero it
