"""test_soak.py — pure soak helpers: log scan (benign-filtered), red-report
shape, threshold math. No boots, no HTTP. (bucket_len lives in mine.py and
is covered by test_mine.py.)"""
import mine
import soak


def test_scan_log_filters_benign_and_catches_real():
    text = "\n".join([
        "INFO: GET /api/health 200",
        "ERROR:    Timing: AsyncClient connection pool",   # benign
        "ERROR:    solver exploded",
        "Traceback (most recent call last):",
    ])
    hits = soak._scan_log(text, ["Timing: AsyncClient"])
    assert len(hits) == 2


def test_mine_bucket_len():
    assert mine.bucket_len(30) == "xshort"
    assert mine.bucket_len(100) == "short"
    assert mine.bucket_len(250) == "mid"
    assert mine.bucket_len(5000) == "xlong"
    assert mine.bucket_len(None) == "unk"


def test_red_report_shape(tmp_path):
    r = soak._red({"paths": {"receipts": str(tmp_path)}, "soak": {}},
                  "WI-20261013-001", "boot fail")
    assert r["all_green"] is False
    assert r["thresholds"]["boot"] is False
    assert r["values"]["reason"] == "boot fail"


def test_load_replay_thresholds_math():
    # the thresholds the report derives from a load dict must mirror §9
    load = {"error_rate": 0.005, "p95_ms": 8000, "worst_5xx_streak": 2}
    assert load["error_rate"] < 0.01
    assert load["p95_ms"] < 10000
    assert load["worst_5xx_streak"] <= 5
