"""test_wave98_fixes.py — regression tests for the wave9.8 hardness
battery defects (battery_wave98.json verified-wrong serves + leak rows).

Defect 1 (cross-domain serve): a political-science stem reached
JOURNAL_ENTRY and shipped a journal entry VERIFIED — the
subject/domain sanity gate now vetoes foreign-domain families, and the
calendar mask removes the year-as-amount binding that fed it.

Defect 2 (visible-string leaks): teach_loop.concept.* corpus text
leaked node ids / 'the student' / raw LaTeX past the serving boundary
because the fetch-key exemption skipped the whole subtree — containers
are now walked.

Defect 3 (wrapper): a correct bank key stored with marking-scheme
meta-prose ('**A wrong answer ...**') served the whole cell — the
compose point now truncates at the commentary boundary.
"""

from __future__ import annotations

import re

import pytest


POLSCI_STEM = (
    "Apply Nozick\u2019s rectification principle to a case where a "
    "family\u2019s land was seized by the state without compensation in "
    "1975 and later sold to a private developer.")
ACC_STEM = (
    "A firm\u2019s Cash Book shows a debit balance of \u20b945,000 on "
    "31 March. The Pass Book shows a credit balance of \u20b942,000. "
    "The following differences are identified: (i) Cheque issued "
    "\u20b93,000 not presented, (ii) Bank charges \u20b9500 debited by "
    "bank not recorded in Cash Book. Prepare a BRS starting from Cash "
    "Book balance and compute the adjusted Pass Book balance.")
CIV_STEM = (
    "In a state legislative assembly, the ruling party has 110 seats, "
    "the main opposition party has 80 seats, and three smaller parties "
    "hold the remaining 10 seats. The Speaker must decide whether to "
    "recognize the main opposition party as the 'Official Opposition.' "
    "Apply the relevant convention to determine if the main opposition "
    "party qualifies, and explain why this recognition matters for "
    "democracy.")


# ------------------------------------------------------------------- #
# subject identification: polsci vocabulary now resolves humanities
# ------------------------------------------------------------------- #

def test_identify_subject_polsci_stem():
    from backend.its.solver.subject_router import identify_subject
    subj, conf, _ = identify_subject(POLSCI_STEM)
    assert subj == "humanities" and conf >= 0.5
    subj2, conf2, _ = identify_subject(CIV_STEM)
    assert subj2 == "humanities" and conf2 >= 0.5


# ------------------------------------------------------------------- #
# journal_entry: calendar spans are dates, not amounts
# ------------------------------------------------------------------- #

def test_journal_entry_refuses_nozick_stem():
    from backend.its.solver.accountancy_families import journal_entry
    # 'sold'+'land'+'in 1975' must NOT produce an entry — 1975 is a
    # year, not a transaction amount (the wave98 wrong serve).
    assert journal_entry(POLSCI_STEM) is None


def test_journal_entry_still_handles_real_transaction():
    from backend.its.solver.accountancy_families import journal_entry
    res = journal_entry("Journalise: sold machinery for cash Rs 50,000 "
                        "on 31 March 2023.")
    # date masked, amount 50000 still binds (tuple: amount, steps, ...)
    assert res is not None and abs(res[0] - 50000) < 1e-6


# ------------------------------------------------------------------- #
# slot extraction: '31 March' / 'in 1975' excluded from the number pool
# ------------------------------------------------------------------- #

def test_calendar_spans_excluded_from_slot_pool():
    from backend.its.solver.slot_extractor import (
        _excluded_spans, _scan_numbers)
    text = ACC_STEM
    spans = _excluded_spans(text)
    pool = [v for v, s, e, _raw in _scan_numbers(text)
            if not any(s0 <= s < s1 for s0, s1 in spans)]
    assert 31.0 not in pool          # '31 March' is a date, not a value
    assert 45000.0 in pool and 42000.0 in pool
    text2 = "land seized by the state in 1975 and sold for Rs 40,000"
    spans2 = _excluded_spans(text2)
    pool2 = [v for v, s, e, _r in _scan_numbers(text2)
             if not any(s0 <= s < s1 for s0, s1 in spans2)]
    assert 1975.0 not in pool2 and 40000.0 in pool2


# ------------------------------------------------------------------- #
# constitutional remedy engine: fail-closed on non-writ situations
# ------------------------------------------------------------------- #

def test_constitutional_remedy_declines_opposition_question():
    from backend.its.solver.humanities_rubric_engine import (
        HumanitiesRubricEngine)
    res = HumanitiesRubricEngine.evaluate_constitutional_remedy(CIV_STEM)
    assert res is not None and res.success is False


def test_constitutional_remedy_still_answers_writ_questions():
    from backend.its.solver.humanities_rubric_engine import (
        HumanitiesRubricEngine)
    res = HumanitiesRubricEngine.evaluate_constitutional_remedy(
        "A man is kept in unlawful detention without trial. Which writ "
        "remedies this?")
    assert res.success and "Habeas" in " ".join(res.steps)
    res2 = HumanitiesRubricEngine.evaluate_constitutional_remedy(
        "A public official refuses to perform duty despite repeated "
        "requests. Which writ applies?")
    assert res2.success and "Mandamus" in " ".join(res2.steps)


# ------------------------------------------------------------------- #
# competency named-construct collision guard
# ------------------------------------------------------------------- #

def test_brs_ask_rejects_cash_book_concept():
    from backend.its.solver.competency_engine import (
        _foreign_construct_concept)
    cash_book = {
        "id": "keac.4.1.1", "title": "Single Column Cash Book",
        "formula": ("closing_cash = opening_cash + total_cash_receipts "
                    "- total_cash_payments"),
        "key_idea": "", "definition": "",
        "question_patterns": ["calculate the closing balance of single "
                              "column cash book"]}
    assert _foreign_construct_concept(ACC_STEM, cash_book) is True
    reconcil = {
        "id": "keac.105.3.1",
        "title": "Bank Reconciliation Statement from Cash Book Balance",
        "formula": ("pass_book_balance = cash_book_balance + "
                    "cheques_issued_not_presented - "
                    "cheques_deposited_not_credited"),
        "question_patterns": ["prepare a bank reconciliation statement "
                              "from the cash book balance"]}
    assert _foreign_construct_concept(ACC_STEM, reconcil) is False
    # a plain cash-book ask does NOT collide with the cash-book concept
    assert _foreign_construct_concept(
        "Calculate the closing balance of a single column cash book "
        "with opening cash Rs 5,000, receipts Rs 2,000 and payments "
        "Rs 1,500.", cash_book) is False


# ------------------------------------------------------------------- #
# subject/domain sanity gate
# ------------------------------------------------------------------- #

def _mk_res(label="VERIFIED", struct_hint=None):
    from backend.its.solver.answer_pipeline import (
        AuditTrail, PipelineResult)
    audit = AuditTrail(lane="A")
    if struct_hint:
        audit._family_domain = struct_hint
    return PipelineResult(label=label, answer="x", numeric=1.0,
                          steps=[], audit=audit)


def test_domain_gate_vetoes_humanities_to_commerce():
    from backend.its.solver.answer_pipeline import _subject_domain_veto
    r = _mk_res()
    reason = _subject_domain_veto(
        POLSCI_STEM, {"subject": "polsci"}, None, r, "JOURNAL_ENTRY")
    assert reason  # humanities stem may never reach a commerce family


def test_domain_gate_uses_identified_subject():
    from backend.its.solver.answer_pipeline import _subject_domain_veto
    r = _mk_res()
    # no explicit context — identify_subject resolves humanities@0.6
    reason = _subject_domain_veto(POLSCI_STEM, None, None, r,
                                  "JOURNAL_ENTRY")
    assert reason


def test_domain_gate_allows_in_domain_serves():
    from backend.its.solver.answer_pipeline import _subject_domain_veto
    r = _mk_res()
    assert _subject_domain_veto(
        ACC_STEM, {"subject": "acc"}, None, r,
        "COMPETENCY:keac.4.1.1") is None
    assert _subject_domain_veto(
        ACC_STEM, {"subject": "economics"}, None, r,
        "COMPETENCY:keac.4.1.1") is None   # commerce in-domain for econ
    # maths is the lingua franca — never gated
    assert _subject_domain_veto(
        "Find the sum of 2 and 3.", {"subject": "civ"}, None, r,
        "ARITHMETIC_EVAL") is None


def test_domain_gate_competency_cid_resolution():
    from backend.its.solver.answer_pipeline import (
        _structure_domain, _competency_domain)
    assert _competency_domain("keac.4.1.1") == "commerce"
    assert _competency_domain("keph.2.4.2") == "physics"
    assert _competency_domain("keps101.1.1") == "humanities"
    assert _structure_domain("COMPETENCY:keac.4.1.1") == "commerce"
    assert _structure_domain("JOURNAL_ENTRY") == "commerce"
    assert _structure_domain("HUMANITIES_REMEDY") == "humanities"
    assert _structure_domain("ARITHMETIC_EVAL") is None  # generic maths


def test_domain_gate_evidence_fallback():
    from backend.its.solver.answer_pipeline import _subject_domain_veto
    r = _mk_res()
    # unresolvable subject (no context, no intent words) + commerce
    # structure + zero commerce evidence in the stem -> veto
    stem = ("Explain the principle a philosopher would apply to a case "
            "where land was seized without redress and later sold.")
    reason = _subject_domain_veto(stem, None, None, r, "JOURNAL_ENTRY")
    assert reason
    # same shape WITH currency evidence -> admissible
    stem2 = ("A trader sold land for \u20b950,000 and recorded the "
             "proceeds. Show the working.")
    assert _subject_domain_veto(stem2, None, None, r,
                                "JOURNAL_ENTRY") is None


# ------------------------------------------------------------------- #
# end-to-end: the three battery stems through model_problem / answer()
# ------------------------------------------------------------------- #

def test_polsci_stem_no_journal_entry_sweep():
    from backend.its.solver.modeling_layer import model_problem
    r = model_problem(POLSCI_STEM)
    assert r is not None
    assert "JOURNAL" not in (r.structure or "")
    assert all("JOURNAL" not in (a.structure or "")
               for a in (r.alternates or []))


def test_model_result_carries_domain_provenance():
    from backend.its.solver.modeling_layer import model_problem
    r = model_problem("Calculate simple interest on Rs 10,000 at 5% "
                      "per annum for 2 years.")
    if r is not None and r.matched:
        assert getattr(r, "_family_domain", None) in (
            "maths", "commerce", "economics", "physics", "chemistry",
            "biology", "language", "cs", "humanities", "competency")


def test_civ_stem_no_writ_answer():
    from backend.its.solver.answer_pipeline import answer
    r = answer(CIV_STEM)
    ans = str(getattr(r, "answer", "") or "")
    assert "Certiorari" not in ans and "Prohibition" not in ans \
        and "Habeas" not in ans and "Mandamus" not in ans
    assert "writ" not in ans.lower()


def test_polsci_stem_no_journal_entry_answer():
    from backend.its.solver.answer_pipeline import answer
    r = answer(POLSCI_STEM)
    ans = str(getattr(r, "answer", "") or "")
    assert "A/c" not in ans and "Dr." not in ans
    if getattr(r, "label", "") == "VERIFIED":
        # any surviving VERIFIED must not be a commerce-family serve
        assert not str(getattr(r, "answer", "") or "").startswith(
            "Cash A/c")


# ------------------------------------------------------------------- #
# display boundary: containers under fetch-key names are walked
# ------------------------------------------------------------------- #

def test_teach_loop_concept_subtree_is_scrubbed():
    from backend.services.display_scrub import clean_student_payload
    payload = {
        "teach_loop": {
            "concept": {
                "title": "Haloalkanes",
                "definition": ("The student learns \\( \\times \\) here "
                               "(see c6_phy_icse_07_003 for context)."),
                "eli5": "The student builds carbon-halogen bonds.",
                "node_id": "c9_chem_cbse_04_007",
            },
            "check": {"question": "What is R-X?",
                      "answer": "The student applies nomenclature."},
        }
    }
    out = clean_student_payload(payload)
    d = out["teach_loop"]["concept"]["definition"]
    assert "c6_phy_icse_07_003" not in d          # embedded id removed
    assert "the student" not in d.lower()
    assert "\\(" not in d and "\\times" not in d   # LaTeX normalized
    e = out["teach_loop"]["concept"]["eli5"]
    assert "the student" not in e.lower()
    # fetch-key scalar survives byte-exact (owner law)
    assert out["teach_loop"]["concept"]["node_id"] == \
        "c9_chem_cbse_04_007"
    q = out["teach_loop"]["check"]["answer"]
    assert "the student" not in q.lower()


def test_fetch_key_scalar_and_id_list_preserved():
    from backend.services.display_scrub import clean_student_payload
    payload = {"next": "c6_math_cbse_03_001",
               "unlocks": ["c6_math_cbse_03_001", "c6_math_cbse_03_002"],
               "concept": "c9_chem_cbse_04_007"}
    out = clean_student_payload(payload)
    assert out["next"] == "c6_math_cbse_03_001"
    assert out["unlocks"] == ["c6_math_cbse_03_001",
                              "c6_math_cbse_03_002"]
    assert out["concept"] == "c9_chem_cbse_04_007"  # pure-id transport


# ------------------------------------------------------------------- #
# slop gate: recursive socratic scrub
# ------------------------------------------------------------------- #

def test_gate_result_scrubs_nested_socratic():
    from backend.its.solver.slop_gate import gate_result
    from backend.its.solver.answer_pipeline import (
        AuditTrail, PipelineResult)
    r = PipelineResult(
        label="VERIFIED", answer="ok", numeric=None, steps=[],
        audit=AuditTrail(lane="A"),
        socratic={"teach": {"definition":
                            "The student reads c6_phy_icse_07_003."},
                  "board_steps": ["The student checks the work."]})
    out = gate_result(r)
    assert "c6_phy_icse_07_003" not in out.socratic["teach"]["definition"]
    assert "the student" not in \
        out.socratic["teach"]["definition"].lower()
    assert "the student" not in \
        out.socratic["board_steps"][0].lower()


# ------------------------------------------------------------------- #
# bank key wrapper: marking-scheme meta-prose stripped at compose
# ------------------------------------------------------------------- #

def test_answer_text_unwraps_marking_scheme_meta():
    from backend.its.solver.bank_answer import _unwrap_meta_prose
    cell = ("stem\n\n**A wrong answer (a blank left wrong) reveals the "
            "student has not learned the term the sentence needs.** "
            "The blank's own answer, stem, is exactly what both the "
            "definition and the walkthrough use.")
    assert _unwrap_meta_prose(cell) == "stem"
    cell2 = ("The correct answer is B) $\\angle B$.\n\nWhat a wrong "
             "answer reveals: If a student chooses $\\angle A$...")
    assert _unwrap_meta_prose(cell2) == "The correct answer is B) " \
        "$\\angle B$."
    # no meta -> untouched
    plain = "36 ATP per glucose in skeletal muscle."
    assert _unwrap_meta_prose(plain) == plain


if __name__ == "__main__":
    pytest.main([__file__, "-x", "-q"])
