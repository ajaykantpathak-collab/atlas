"""C3 Misconception-Corrector — unit tests (real compq bank, offline)."""
import json
import re

from backend.services.misconception_corrector import (
    correction_for,
    is_node_like,
)

_ID = re.compile(r"c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{2}_\d{3}")
Q = ("A and B are partners sharing profits in the ratio 3:2. C is admitted "
     "for 1/5th share. Calculate the new profit sharing ratio.")


def test_happy_path_worked_example_and_follow_up():
    out = correction_for("c12_acc_cbse_01_001", Q)
    assert out["worked_example"], "node has authored worked examples"
    assert out["worked_example"].get("problem"), "worked example carries a problem"
    assert out["follow_up"], "node has 11 diagnostics — follow-up must exist"
    assert out["follow_up"].get("question")
    # the loop closes on re-attempt: the follow-up answer is withheld
    assert not out["follow_up"].get("answer")


def test_honest_nulls_for_non_node():
    assert correction_for("not-a-node", "anything") == {
        "matched_misconception": None, "worked_example": None, "follow_up": None}
    assert correction_for(None, "x")["worked_example"] is None
    assert correction_for("", "")["follow_up"] is None


def test_is_node_like():
    assert is_node_like("c12_acc_cbse_01_001")
    assert is_node_like("c10_bio_icse_02_003")
    assert not is_node_like("chapter_1")
    assert not is_node_like(None)


def test_no_node_ids_in_payload():
    out = correction_for("c12_acc_cbse_01_001", Q)
    blob = json.dumps(out, ensure_ascii=False)
    assert not _ID.search(blob), "node id leaked into student-visible correction"


def test_matched_misconception_may_be_honestly_none():
    # the matched diagnostic may carry no misconception text — the field is
    # then None and the client falls back to the node-level misconception
    out = correction_for("c12_acc_cbse_01_001", Q)
    assert "matched_misconception" in out
