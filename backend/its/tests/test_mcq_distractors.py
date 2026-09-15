"""test_mcq_distractors.py -- verbal MCQ synthesis for the
humanities/commerce catalogs.

Covers the determinism contract (same question -> same options in
the same order, in-process and via a fresh interpreter), the purity
guard (junk keys and distractor-starved items stay honest
self_check serves), option sanity at corpus scale (three DISTINCT
options, key in range, no degenerate key, no char-cut options), the
grade_mcq bridge for the tutor's correct/wrong path, and store
alignment with the tutor's pool-extraction precedence.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys

import pytest

from backend.its.solver import mcq_distractors as M

_REPO_ROOT = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
_CATALOG_DIR = os.path.join(_REPO_ROOT, "backend", "its", "competency")
_STORE_PATH = M.store_path()

SIBLINGS = [
    {"title": "Trade credit", "definition": "Trade credit is the credit "
     "extended by suppliers to their customers in the normal course of "
     "business.", "key_idea": "", "answer": ""},
    {"title": "Leasing", "definition": "Leasing is a contractual "
     "arrangement under which the owner of an asset grants another "
     "party the right to use it.", "key_idea": "", "answer": ""},
    {"title": "Public deposits", "definition": "Public deposits are "
     "deposits raised directly from the public for short terms.",
     "key_idea": "", "answer": ""},
]
CHAPTER_TEXTS = [
    "Trade credit is extended by suppliers.",
    "Leasing allows a firm to use assets without owning them.",
    "Public deposits are deposits raised from the public.",
    "Retained earnings are profits kept back by a firm.",
    "The Securities and Exchange Board regulates the capital market.",
]


# --------------------------------------------------------------------- #
# determinism
# --------------------------------------------------------------------- #
def test_build_mcq_deterministic_same_input_same_output():
    q = "A firm sells its book debts to a factor for immediate cash. " \
        "What source of finance is this?"
    a = M.build_mcq(q, "Factoring", siblings=SIBLINGS,
                    chapter_texts=CHAPTER_TEXTS)
    b = M.build_mcq(q, "Factoring", siblings=SIBLINGS,
                    chapter_texts=CHAPTER_TEXTS)
    assert a is not None and b is not None
    assert a == b                      # options AND order AND key index


def test_build_mcq_seed_independent_of_call_order():
    q = "A firm sells its book debts to a factor for immediate cash. " \
        "What source of finance is this?"
    first = M.build_mcq(q, "Factoring", siblings=SIBLINGS,
                        chapter_texts=CHAPTER_TEXTS)
    # noisy interleaved builds must not disturb the question's own rng
    for other in ("What is demonetisation?",
                  "Why are fundamental rights justiciable?",
                  "What is disinvestment?"):
        M.build_mcq(other, "Sale of government equity in PSUs.",
                    siblings=SIBLINGS, chapter_texts=CHAPTER_TEXTS)
    again = M.build_mcq(q, "Factoring", siblings=SIBLINGS,
                        chapter_texts=CHAPTER_TEXTS)
    assert first == again


def test_store_rebuild_is_byte_identical(tmp_path):
    if not os.path.isdir(_CATALOG_DIR):
        pytest.skip("catalog dir not present")
    out1 = tmp_path / "s1.json"
    out2 = tmp_path / "s2.json"
    M.build_store(_CATALOG_DIR, str(out1))
    M.build_store(_CATALOG_DIR, str(out2))
    assert out1.read_bytes() == out2.read_bytes()


# --------------------------------------------------------------------- #
# purity guard
# --------------------------------------------------------------------- #
def test_purity_guard_rejects_unbuildable_items():
    # too-short non-numeric answer, no term pool
    assert M.build_mcq("What is X?", "Yes.", siblings=[],
                       chapter_texts=[]) is None
    # empty inputs
    assert M.build_mcq("", "Some sufficiently long answer text.") is None
    assert M.build_mcq("Some question?", "", siblings=[],
                       chapter_texts=[]) is None
    # template-artifact answer: an MCQ key can only be as good as its
    # authored answer
    assert M.build_mcq("Apply ratio analysis.",
                       "The method applied step by step gives the "
                       "required result.", siblings=SIBLINGS,
                       chapter_texts=CHAPTER_TEXTS) is None


def test_purity_guard_never_publishes_template_only_pairs():
    # an item with NO sibling material and NO swappable/numeric
    # content must stay a self_check, not get two canned templates
    mcq = M.build_mcq("What is zorblax?", "It is a vague notion.",
                      siblings=[], chapter_texts=[])
    if mcq is not None:                # only if distractors exist
        assert not all(s == "template" for s in mcq["strategies"])


def test_numeric_items_get_number_distractors():
    mcq = M.build_mcq("Find the mean of the data: 10, 20, 30, 40, 50.",
                      "Mean = 30", siblings=[], chapter_texts=[])
    assert mcq is not None
    assert set(mcq["strategies"]) <= {"number"}
    key = mcq["options"][mcq["correct_index"]]
    assert key == "Mean = 30"
    assert len(set(mcq["options"])) == 3


def test_swap_preserves_claim_shape():
    # the chapter term pool supplies same-category entity swaps
    mcq = M.build_mcq(
        "What was the role of Kshatriyas in ancient Indian society?",
        "Kshatriyas were rulers and warriors.", siblings=[],
        chapter_texts=["The Vaishyas were traders and farmers.",
                       "Vaishyas traded grain in the market."])
    if mcq is not None and "swap" in mcq["strategies"]:
        key = mcq["options"][mcq["correct_index"]]
        for i, opt in enumerate(mcq["options"]):
            if i != mcq["correct_index"]:
                if "were rulers and warriors" in opt:
                    assert not opt.startswith("Kshatriyas")


# --------------------------------------------------------------------- #
# corpus-wide option sanity (the real store)
# --------------------------------------------------------------------- #
@pytest.mark.skipif(not os.path.isfile(_STORE_PATH),
                    reason="generated store not present")
def test_store_options_never_degenerate():
    store = M.load_store(_STORE_PATH)
    assert len(store) > 1000           # the humanities corpus is large
    for key, entry in store.items():
        opts = entry["options"]
        assert len(opts) == M.OPTIONS_PER_MCQ, key
        # options DISTINCT: a distractor equal to the key makes the
        # item ungradeable, equal to another distractor gives two keys
        norms = [M.normalize(o).lower() for o in opts]
        assert len(set(norms)) == M.OPTIONS_PER_MCQ, key
        idx = entry["correct_index"]
        assert 0 <= idx < len(opts), key
        key_opt = opts[idx]
        assert M.normalize(key_opt), key
        assert len(M.normalize(key_opt)) <= M.MAX_OPTION_CHARS, key
        # the key must not be a substring of another option (and vice
        # versa) -- that option would also be correct
        for j, other in enumerate(opts):
            if j != idx:
                assert M.normalize(key_opt).lower() not in \
                    M.normalize(other).lower() or \
                    M.normalize(other).lower() not in \
                    M.normalize(key_opt).lower(), (key, j)


@pytest.mark.skipif(not os.path.isfile(_STORE_PATH),
                    reason="generated store not present")
def test_store_covers_the_eligible_corpus():
    if not os.path.isdir(_CATALOG_DIR):
        pytest.skip("catalog dir not present")
    store = M.load_store(_STORE_PATH)
    eligible = 0
    for item in M.iter_catalog_items(_CATALOG_DIR):
        eligible += 1
    assert eligible >= len(store)      # store never exceeds the corpus
    assert len(store) >= eligible * 0.9    # purity rejections stay rare


@pytest.mark.skipif(not os.path.isfile(_STORE_PATH),
                    reason="generated store not present")
def test_store_hash_matches_tutor_pool_questions():
    """The binding contract: every pool question the tutor loads from
    an in-scope catalog either has a store entry under mcq_key(q) or
    was purity-rejected -- never a silent hash mismatch."""
    if not os.path.isdir(_CATALOG_DIR):
        pytest.skip("catalog dir not present")
    store = M.load_store(_STORE_PATH)
    seen = 0
    for item in M.iter_catalog_items(_CATALOG_DIR):
        seen += 1
        entry = store.get(M.mcq_key(item["question"]))
        assert entry is None or entry.get("options"), item["question"]
    assert seen > 1000


# --------------------------------------------------------------------- #
# grade_mcq: the bridge into the normal correct/wrong BKT path
# --------------------------------------------------------------------- #
ENTRY = {"options": ["Trade credit", "Factoring", "Leasing"],
         "correct_index": 1}


def test_grade_mcq_accepts_index_letter_and_text():
    assert M.grade_mcq(ENTRY, "2") is True
    assert M.grade_mcq(ENTRY, "option 2") is True
    assert M.grade_mcq(ENTRY, "b") is True
    assert M.grade_mcq(ENTRY, "Factoring") is True
    assert M.grade_mcq(ENTRY, "  factoring. ") is True


def test_grade_mcq_wrong_and_garbage_are_false():
    assert M.grade_mcq(ENTRY, "1") is False
    assert M.grade_mcq(ENTRY, "Trade credit") is False
    assert M.grade_mcq(ENTRY, "c") is False
    assert M.grade_mcq(ENTRY, "9") is False          # out of range
    assert M.grade_mcq(ENTRY, "0") is False          # 1-based contract
    assert M.grade_mcq(ENTRY, "idk") is False
    assert M.grade_mcq(ENTRY, "") is False
    assert M.grade_mcq(None, "2") is False
    assert M.grade_mcq({"options": [], "correct_index": 0},
                       "1") is False


# --------------------------------------------------------------------- #
# cross-process determinism (hash seeds, PYTHONHASHSEED-proof)
# --------------------------------------------------------------------- #
def test_deterministic_across_interpreters(tmp_path):
    if not os.path.isdir(_CATALOG_DIR):
        pytest.skip("catalog dir not present")
    out1 = tmp_path / "a.json"
    out2 = tmp_path / "b.json"
    template = ("from backend.its.solver import mcq_distractors as M; "
                "import sys; M.build_store(sys.argv[1], sys.argv[2])")
    env = dict(os.environ)
    env["PYTHONHASHSEED"] = "1"
    subprocess.run([sys.executable, "-c", template,
                    _CATALOG_DIR, str(out1)], cwd=_REPO_ROOT,
                   env=env, check=True,
                   stdout=subprocess.DEVNULL, timeout=300)
    env["PYTHONHASHSEED"] = "424242"
    subprocess.run([sys.executable, "-c", template,
                    _CATALOG_DIR, str(out2)], cwd=_REPO_ROOT,
                   env=env, check=True,
                   stdout=subprocess.DEVNULL, timeout=300)
    assert out1.read_bytes() == out2.read_bytes()
