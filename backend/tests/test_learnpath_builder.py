"""Tests for services/learnpath_builder.py — the in-chapter path builder.

No DB, no Docker, no network.  Synthetic corpus fixtures are written to a
tmp dir; the real-corpus smoke reads deploy/content/enhanced_nodes_md and
only asserts structural truth (every chapter node appears exactly once,
gates point backwards, entry requirements stay outside the chapter).

Run:  python -m pytest deploy/backend/tests/test_learnpath_builder.py -q
  or: python -m unittest deploy.backend.tests.test_learnpath_builder
"""

from __future__ import annotations

import importlib.util
import json
import os
import shutil
import sys
import tempfile
import unittest

_HERE = os.path.dirname(os.path.abspath(__file__))
_BUILDER_PATH = os.path.join(_HERE, "..", "services", "learnpath_builder.py")
_REAL_CORPUS = os.path.normpath(
    os.path.join(_HERE, "..", "..", "content", "enhanced_nodes_md"))

_spec = importlib.util.spec_from_file_location("learnpath_builder",
                                               _BUILDER_PATH)
lpb = importlib.util.module_from_spec(_spec)
sys.modules.setdefault("learnpath_builder", lpb)
_spec.loader.exec_module(lpb)


def _node(dirpath: str, stem: str, prereqs=(), definition: str = "",
          extra: str = "") -> str:
    """Write one minimal corpus node file; returns its node_id."""
    lines = ["## DEFINITION", definition or f"{stem} is a test concept."]
    if prereqs:
        lines += ["## PREREQUISITE_NODE_IDS", ", ".join(prereqs)]
    if extra:
        lines += ["## PREREQUISITE_REASONS", extra]
    path = os.path.join(dirpath, stem + ".md")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    return stem


class FixtureCorpus:
    """A throwaway corpus dir holding one or more synthetic chapters."""

    def __init__(self):
        self.root = tempfile.mkdtemp(prefix="learnpath_fx_")

    def node(self, stem, prereqs=(), definition="", extra=""):
        return _node(self.root, stem, prereqs, definition, extra)

    def close(self):
        shutil.rmtree(self.root, ignore_errors=True)


class TestSyntheticChapters(unittest.TestCase):
    """Ordering, entry requirements, cycle breaks, gating — tiny fixtures."""

    def setUp(self):
        self.fx = FixtureCorpus()

    def tearDown(self):
        self.fx.close()

    # ── linear chain ──────────────────────────────────────────────────────
    def test_linear_chain_preserves_order(self):
        self.fx.node("c10_bio_cbse_01_001")
        self.fx.node("c10_bio_cbse_01_002", ["c10_bio_cbse_01_001"])
        self.fx.node("c10_bio_cbse_01_003", ["c10_bio_cbse_01_002"])
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 1)
        self.assertIsNotNone(path)
        self.assertEqual([l["node_id"] for l in path["lessons"]],
                         ["c10_bio_cbse_01_001", "c10_bio_cbse_01_002",
                          "c10_bio_cbse_01_003"])
        self.assertEqual(path["lessons"][2]["prereqs_in_chapter"],
                         ["c10_bio_cbse_01_002"])
        self.assertEqual(path["entry_requirements"], [])
        self.assertEqual(path["cycle_breaks"], [])

    # ── diamond a→b, a→c, b+c→d ──────────────────────────────────────────
    def test_diamond_orders_both_branches_before_join(self):
        self.fx.node("c10_bio_cbse_02_001")
        self.fx.node("c10_bio_cbse_02_002", ["c10_bio_cbse_02_001"])
        self.fx.node("c10_bio_cbse_02_003", ["c10_bio_cbse_02_001"])
        self.fx.node("c10_bio_cbse_02_004",
                     ["c10_bio_cbse_02_002", "c10_bio_cbse_02_003"])
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 2)
        ids = [l["node_id"] for l in path["lessons"]]
        self.assertEqual(sorted(ids), sorted(
            ["c10_bio_cbse_02_00%d" % i for i in (1, 2, 3, 4)]))
        self.assertLess(ids.index("c10_bio_cbse_02_001"),
                        ids.index("c10_bio_cbse_02_002"))
        self.assertLess(ids.index("c10_bio_cbse_02_001"),
                        ids.index("c10_bio_cbse_02_003"))
        self.assertLess(ids.index("c10_bio_cbse_02_002"),
                        ids.index("c10_bio_cbse_02_004"))
        self.assertLess(ids.index("c10_bio_cbse_02_003"),
                        ids.index("c10_bio_cbse_02_004"))
        self.assertEqual(path["cycle_breaks"], [])

    # ── cycle a→b→a ───────────────────────────────────────────────────────
    def test_cycle_broken_by_sequence_number(self):
        self.fx.node("c10_bio_cbse_03_002", ["c10_bio_cbse_03_001"])
        self.fx.node("c10_bio_cbse_03_001", ["c10_bio_cbse_03_002"])
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 3)
        ids = [l["node_id"] for l in path["lessons"]]
        self.assertEqual(sorted(ids), ["c10_bio_cbse_03_001",
                                       "c10_bio_cbse_03_002"])
        # lowest seq force-placed first, its forward edge recorded
        self.assertEqual(ids[0], "c10_bio_cbse_03_001")
        self.assertEqual(len(path["cycle_breaks"]), 1)
        brk = path["cycle_breaks"][0]
        self.assertEqual(brk["node_id"], "c10_bio_cbse_03_001")
        self.assertEqual(brk["ignored_in_chapter_prereqs"],
                         ["c10_bio_cbse_03_002"])
        # forward-consistency invariant: gates only name earlier lessons
        self.assertEqual(path["lessons"][0]["prereqs_in_chapter"], [])
        self.assertEqual(path["lessons"][1]["prereqs_in_chapter"],
                         ["c10_bio_cbse_03_001"])

    def test_self_prereq_recorded_as_cycle_break(self):
        self.fx.node("c10_bio_cbse_04_001", ["c10_bio_cbse_04_001"])
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 4)
        self.assertEqual(len(path["lessons"]), 1)
        self.assertEqual(len(path["cycle_breaks"]), 1)
        self.assertEqual(path["lessons"][0]["prereqs_in_chapter"], [])

    # ── external prereqs ─────────────────────────────────────────────────
    def test_external_prereqs_become_entry_requirements(self):
        # resolvable out-of-chapter ids
        self.fx.node("c9_bio_ch1_2")
        self.fx.node("c10_bio_cbse_01_009")           # earlier chapter
        self.fx.node("c10_chem_cbse_05_001")          # cross subject
        self.fx.node(
            "c10_bio_cbse_02_001",
            ["c9_bio_ch1_2", "c10_bio_cbse_01_009", "c10_chem_cbse_05_001",
             "c99_ghost_99_999"],
            extra="c9_bio_ch1_2: builds the base idea.")
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 2)
        self.assertEqual(len(path["lessons"]), 1)
        self.assertEqual(path["lessons"][0]["prereqs_in_chapter"], [])
        kinds = {e["node_id"]: e["kind"] for e in path["entry_requirements"]}
        self.assertEqual(kinds["c9_bio_ch1_2"], "cross_class")
        self.assertEqual(kinds["c10_bio_cbse_01_009"], "earlier_chapter")
        self.assertEqual(kinds["c10_chem_cbse_05_001"], "cross_subject")
        self.assertEqual(kinds["c99_ghost_99_999"], "unresolved")
        by_id = {e["node_id"]: e for e in path["entry_requirements"]}
        self.assertEqual(by_id["c9_bio_ch1_2"]["reason"],
                         "builds the base idea.")
        # entry requirements are listed, never placed as lessons
        self.assertNotIn("c9_bio_ch1_2",
                         [l["node_id"] for l in path["lessons"]])

    # ── titles / unknown chapter / subject aliases ───────────────────────
    def test_title_from_definition_head(self):
        self.fx.node("c10_bio_cbse_05_001",
                     definition="Electric current is the rate of flow of "
                                "charge through a conductor.")
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 5)
        self.assertEqual(path["lessons"][0]["title"], "Electric current")

    def test_unknown_chapter_returns_none(self):
        self.assertIsNone(lpb.scan_chapter(self.fx.root, 10, "biology", 42))

    def test_authored_noise_ids_dropped(self):
        # "N/A" inside a prereq line is authored filler, not a broken id —
        # it must vanish rather than surface as an unresolved requirement
        self.fx.node("c10_bio_cbse_09_001", ["N/A", "None"])
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 9)
        self.assertEqual(path["lessons"][0]["prereqs_in_chapter"], [])
        self.assertEqual(path["entry_requirements"], [])

    def test_subject_alias_resolves_stem_variants(self):
        self.fx.node("c9_physics_ch2_1")
        for alias in ("physics",):
            path = lpb.scan_chapter(self.fx.root, 9, alias, 2)
            self.assertIsNotNone(path, alias)
            self.assertEqual(path["subject"], "physics")

    def test_comp_and_junk_files_skipped(self):
        self.fx.node("c10_bio_cbse_06_001")
        self.fx.node("c10_bio_cbse_06_002", ["c10_bio_cbse_06_001"])
        _node(self.fx.root, "c10_bio_cbse_06_002_comp")   # companion
        _node(self.fx.root, "_grade_map")                 # underscore entry
        _node(self.fx.root, "completely_bogus_name")      # unparseable
        path = lpb.scan_chapter(self.fx.root, 10, "biology", 6)
        self.assertEqual([l["node_id"] for l in path["lessons"]],
                         ["c10_bio_cbse_06_001", "c10_bio_cbse_06_002"])


class TestNextLessonGating(unittest.TestCase):
    """next_lesson: first not-done lesson whose in-chapter prereqs are done."""

    @classmethod
    def setUpClass(cls):
        cls.fx = FixtureCorpus()
        cls.fx.node("c10_bio_cbse_07_001")
        cls.fx.node("c10_bio_cbse_07_002", ["c10_bio_cbse_07_001"])
        cls.fx.node("c10_bio_cbse_07_003", ["c10_bio_cbse_07_001"])
        cls.fx.node("c10_bio_cbse_07_004",
                    ["c10_bio_cbse_07_002", "c10_bio_cbse_07_003"])
        cls.path = lpb.scan_chapter(cls.fx.root, 10, "biology", 7)

    @classmethod
    def tearDownClass(cls):
        cls.fx.close()

    def test_empty_done_starts_at_head(self):
        self.assertEqual(lpb.next_lesson(self.path, []),
                         self.path["lessons"][0])

    def test_partially_done_follows_gates(self):
        nid = lambda i: "c10_bio_cbse_07_00%d" % i
        self.assertEqual(lpb.next_lesson(self.path, {nid(1)})["node_id"], nid(2))
        self.assertEqual(lpb.next_lesson(self.path, {nid(1), nid(2)})["node_id"],
                         nid(3))
        self.assertEqual(
            lpb.next_lesson(self.path, {nid(1), nid(2), nid(3)})["node_id"],
            nid(4))

    def test_finished_chapter_returns_none(self):
        all_ids = [l["node_id"] for l in self.path["lessons"]]
        self.assertIsNone(lpb.next_lesson(self.path, all_ids))

    def test_empty_or_broken_path_is_none(self):
        self.assertIsNone(lpb.next_lesson(None, []))
        self.assertIsNone(lpb.next_lesson({}, []))


class TestGenerateAll(unittest.TestCase):
    """generate_all: streaming write, index, subject fan-out."""

    def setUp(self):
        self.fx = FixtureCorpus()
        self.out = tempfile.mkdtemp(prefix="learnpath_out_")

    def tearDown(self):
        self.fx.close()
        shutil.rmtree(self.out, ignore_errors=True)

    def test_writes_files_and_index(self):
        for i in (1, 2):
            self.fx.node("c10_bio_cbse_01_%03d" % i,
                         ["c10_bio_cbse_01_%03d" % (i - 1)] if i > 1 else [])
        self.fx.node("c10_chem_cbse_01_001")
        summary = lpb.generate_all(corpus_root=self.fx.root, out_dir=self.out,
                                   classes=(10,),
                                   subjects=("biology", "chemistry"))
        self.assertEqual(summary["chapters"], 2)
        self.assertEqual(summary["nodes"], 3)
        self.assertTrue(os.path.isfile(
            os.path.join(self.out, "10_biology_1.json")))
        self.assertTrue(os.path.isfile(
            os.path.join(self.out, "10_chemistry_1.json")))
        with open(os.path.join(self.out, "10_biology_1.json"),
                  encoding="utf-8") as fh:
            data = json.load(fh)
        self.assertEqual(data["class"], 10)
        self.assertEqual(data["subject"], "biology")
        self.assertEqual(len(data["lessons"]), 2)
        with open(os.path.join(self.out, "_index.json"), encoding="utf-8") as fh:
            index = json.load(fh)
        self.assertEqual(index["chapters"], 2)
        self.assertEqual(len(index["paths"]), 2)

    def test_science_fans_out_to_strands(self):
        for stem in ("bio", "chem", "phy"):
            self.fx.node("c9_%s_ch1_1" % stem)
        summary = lpb.generate_all(corpus_root=self.fx.root, out_dir=self.out,
                                   classes=(9,), subjects=("science",))
        self.assertEqual(sorted(summary["per_subject"]),
                         ["biology", "chemistry", "physics"])
        for subject in ("biology", "chemistry", "physics"):
            self.assertTrue(os.path.isfile(
                os.path.join(self.out, "9_%s_1.json" % subject)))

    def test_get_path_roundtrip(self):
        self.fx.node("c10_bio_cbse_08_001")
        lpb.generate_all(corpus_root=self.fx.root, out_dir=self.out,
                         classes=(10,), subjects=("biology",))
        path = lpb.get_path(10, "biology", 8, cache_dir=self.out)
        self.assertIsNotNone(path)
        self.assertEqual(path["lessons"][0]["node_id"], "c10_bio_cbse_08_001")
        self.assertIsNone(lpb.get_path(10, "biology", 99, cache_dir=self.out))


class TestRealCorpusSmoke(unittest.TestCase):
    """The real corpus: every chapter node appears exactly once, in a
    prereq-consistent order.  Skipped only when the corpus is absent."""

    @classmethod
    def setUpClass(cls):
        cls.have_corpus = os.path.isdir(_REAL_CORPUS)
        if cls.have_corpus:
            cls.corpus = lpb.list_corpus(_REAL_CORPUS)

    def _check_chapter(self, cls, subject, chapter):
        path = lpb.scan_chapter(_REAL_CORPUS, cls, subject, chapter,
                                corpus=self.corpus)
        self.assertIsNotNone(path, "%d %s ch%d" % (cls, subject, chapter))
        lessons = path["lessons"]
        ids = [l["node_id"] for l in lessons]
        # 1. exactly the corpus nodes of this chapter, no dupes, no extras
        expected = {c["node_id"] for c in self.corpus.values()
                    if c["class"] == cls
                    and lpb.canonical_subject(c["subject_stem"]) == subject
                    and c["chapter"] == chapter}
        self.assertEqual(len(ids), len(set(ids)), "duplicate lessons")
        self.assertEqual(set(ids), expected)
        # 2. the serving invariant: gates only name earlier lessons
        pos = {nid: i for i, nid in enumerate(ids)}
        for lesson in lessons:
            for p in lesson["prereqs_in_chapter"]:
                self.assertIn(p, pos, "gate outside the chapter")
                self.assertLess(pos[p], pos[lesson["node_id"]],
                                "gate points forward: %s" % lesson["node_id"])
        # 3. entry requirements really are outside the chapter
        for e in path["entry_requirements"]:
            self.assertNotIn(e["node_id"], pos)
            self.assertIn(e["kind"],
                          ("cross_class", "cross_subject",
                           "earlier_chapter", "later_chapter", "unresolved"))
        return path

    @unittest.skipUnless(os.path.isdir(_REAL_CORPUS), "corpus not mounted")
    def test_class10_biology_ch1_full_coverage(self):
        path = self._check_chapter(10, "biology", 1)
        self.assertGreaterEqual(len(path["lessons"]), 10)
        titles = [l["title"] for l in path["lessons"]]
        self.assertTrue(all(t and t.strip() for t in titles))
        self.assertFalse(any("_" in t for t in titles), "raw ids in titles")

    @unittest.skipUnless(os.path.isdir(_REAL_CORPUS), "corpus not mounted")
    def test_class9_physics_ch1_full_coverage(self):
        path = self._check_chapter(9, "physics", 1)
        self.assertGreaterEqual(len(path["lessons"]), 5)

    @unittest.skipUnless(os.path.isdir(_REAL_CORPUS), "corpus not mounted")
    def test_known_cycle_chapter_records_breaks(self):
        # class-6 maths ch1 carries the authored sibling mesh (001 lists 002)
        path = self._check_chapter(6, "maths", 1)
        self.assertGreaterEqual(len(path["cycle_breaks"]), 1,
                                "expected the documented c6 mesh cycle")

    @unittest.skipUnless(os.path.isdir(_REAL_CORPUS), "corpus not mounted")
    def test_generate_all_smoke_matches_corpus(self):
        out = tempfile.mkdtemp(prefix="learnpath_real_")
        try:
            summary = lpb.generate_all(corpus_root=_REAL_CORPUS, out_dir=out,
                                       classes=(10, 9),
                                       subjects=("biology", "physics"))
            self.assertEqual(summary["chapters"], len(summary["files"]))
            # every generated file parses and covers its chapter exactly
            for fname in summary["files"]:
                with open(os.path.join(out, fname), encoding="utf-8") as fh:
                    data = json.load(fh)
                cls_, subj, ch = data["class"], data["subject"], data["chapter"]
                ids = [l["node_id"] for l in data["lessons"]]
                expected = {c["node_id"] for c in self.corpus.values()
                            if c["class"] == cls_
                            and lpb.canonical_subject(c["subject_stem"]) == subj
                            and c["chapter"] == ch}
                self.assertEqual(set(ids), expected, fname)
                self.assertEqual(len(ids), len(set(ids)), fname)
        finally:
            shutil.rmtree(out, ignore_errors=True)


if __name__ == "__main__":
    unittest.main()
