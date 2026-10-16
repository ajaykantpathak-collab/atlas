# DIAGRAMS WAVE-D resume state — FINAL for this session (handoff)

## UPDATE 2026-09-30 — WAVE D-2 COMPLETE (batches 5-6, classes 11-12 geo/hist maps)
38 diagrams published to waveD2 PART-FILES (0 validator errors):
- deploy/frontend/public/diagrams/diagrams_index_waveD2.json  (38 nodes: class11 x31, class12 x7)
- deploy/frontend/public/diagrams/diagram_attributions_waveD2.json
- images: deploy/frontend/public/diagrams/class{11,12}/{node_id}.{png|jpg|svg}
- root mirror D:\platform\frontend\public\diagrams\ (verified byte-equal)
- backups: D:\platform\_cisce_build\diagwaveD2_backup\ (part-files + picks + final
  search_terms + manifest snapshot + emit/validate D2 scripts)
diagrams_index.json (188, wave A) and *_waveD.json (71) NOT touched (verified counts).
No git, no docker, corpus md untouched.
Licenses: PD x9, CC BY-SA 4.0 x11, CC BY-SA 3.0 x10, CC BY 4.0 x3, CC BY-SA 1.0/2.0/3.0de x3, CC BY 3.0 x1, CC0 x1.
D2 emit/validate are SEPARATE scripts (emit_diagrams_waved2.py / validate_diagrams_waved2.py)
that only read/write *_waveD2.json part-files; picks.json stays shared+cumulative.

Batch 5 geography: 22/25 published. Explicit rejects (documented absence):
- c11_geo_cbse_09_009 (India drainage): 3 query rounds — Commons has no all-India
  English drainage map; best hit was South-India-only 1909 survey (region-partial).
- c11_geo_cbse_15_004 (biosphere reserves map): only mapsofindia/mapsintra copies
  (site watermarks) + scenery photos; watermarks = reject per spec.
- c12_geo_cbse_09_009 (migration in India): only Malaysia/Singapore diaspora maps
  (off-node); internal-migration maps absent on Commons.
Batch 6 history: 16/16 published. Era proofs: "Roman Empire (117 AD)" on the
27 BCE-476 CE node; "Map of the partition boundaries in the Punjab" (Sept 1948,
Boundary Commission award) on the 1947-Partition node. Full era table in the
wave D-2 final report.
D2 MARGINAL ACCEPTS for owner review:
- c12_hist_cbse_01_003 (Harappan town planning): Mohenjo-daro entrance-gate PHOTO
  (Commons has no clean English-labeled MD city plan; shared-query instruction was
  pick 0 = the other index vs c6's pick 1). Remove node from index if unwanted.
- c12_hist_cbse_02_010 (Uttarapatha/Dakshinapatha): "Periplus World Map" (60 AD,
  PD) — era+region correct but shows maritime Indo-Roman routes, not the two named
  overland routes ("Transasia trade routes 1stC CE" PNG kept 429-failing).
- c11_hist_cbse_04_007 (Abbasid): "Map of the Abbasid Caliphate in 1180 CE" — the
  labeled rump-era map (Arabic-script classical PD map rejected for language).
- c11_hist_cbse_06_004 (Third Order): medieval ploughing woodcut PD (no feudal
  structure diagram available on Commons).
- c11_geo_cbse_14_001: 1909 Imperial Gazetteer vegetation map (PD, English) —
  vintage but the only English India vegetation map.
Note: c12_hist_cbse_02_002 uses "Maurya Empire synthetic map 250 BCE.png" — a
DIFFERENT file from c6_history_ch05_007's "Ashoka Maurya Empire 250 BCE.jpg"
(shared-query dedup satisfied).
CONCURRENT-WAVE ALERT (merge-time): sibling waves (E/F/G/H) are actively writing
class11/12 (bio/phy/chem anchors + other hist node ids). One SAME-NODE collision:
c11_hist_cbse_01_001 — waveD2 owns class11/c11_hist_cbse_01_001.png ("Map of
Mesopotamia, 1770 BCE"); a sibling also dropped class11/c11_hist_cbse_01_001.jpg
(its own part-file claims it). At merge, keep exactly ONE entry per node id and
delete the loser file — do NOT let both part-files claim it. All other sibling
c1[12]_(geo|hist)_ files use node ids outside waveD2's 38 — untouched per trap 6.



## Shipped (validated, 0 errors)
71 diagrams published to waveD PART-FILES:
- deploy/frontend/public/diagrams/diagrams_index_waveD.json  (71 nodes)
- deploy/frontend/public/diagrams/diagram_attributions_waveD.json
- images: deploy/frontend/public/diagrams/class{6,7,8}/{node_id}.{png|jpg|svg}
- root mirror D:\platform\frontend\public\diagrams\ (verified equal)
- backups: D:\platform\_cisce_build\diagwaveD_backup\
diagrams_index.json (wave A) NOT touched. No git, no docker, corpus md untouched.

Licenses: CC BY-SA 3.0 x20, CC BY-SA 4.0 x17, PD x16, CC0 x13, CC BY 4.0 x3,
CC BY 2.0 x2 — all in the allowed set, every entry has title/source_url/artist/credit.

Coverage: c6 bio 6 / geo 6 / hist 10 / phy 7; c7 bio 4 / chem 1 / geo 4 / hist 4 /
math 2 / phy 5; c8 bio 2 / geo 3 / hist 3 / math 1 / physics 13.

## Batch 4 notes (accepted with caveats)
- c6_history_ch09_033: Mughal map "Imperium mogolskie 1526-1707" — Polish TITLE
  banner but all geographic labels are English; accepted as comprehension-safe.
  If the owner disagrees: remove node from index (pick stays 0).
- c7_math_ch05_001 (intersecting lines) and c8_geo_ch2_2 (map projection =
  Robinson-projection example) are MARGINAL accepts — flag for owner review.

## Remaining work (handoff): batches 5-6, classes 11-12 geo/hist maps
Shortlists already curated (all ids verified present in node_classes.json):
- Batch 5 (c11-12 GEOGRAPHY, ~25): earth interior c11_geo_cbse_03_003; continental
  drift c11_geo_cbse_04_001; sea-floor spreading c11_geo_cbse_04_007; tectonic
  plates c11_geo_cbse_04_008; quake/volcano belts c11_geo_cbse_04_010; volcano
  c11_geo_cbse_06_003; meander c11_geo_cbse_07_003; delta c11_geo_cbse_07_004;
  India location c11_geo_cbse_08_001; physiographic divisions c11_geo_cbse_09_001;
  India drainage c11_geo_cbse_09_009; monsoon c11_geo_cbse_10_002; rainfall
  distribution c11_geo_cbse_10_004; Koppen India c11_geo_cbse_10_005; soil
  profile c11_geo_cbse_12_002; soil types map c11_geo_cbse_12_003; vegetation map
  c11_geo_cbse_14_001; biosphere reserves map c11_geo_cbse_15_004; India
  population density c11_geo_cbse_16_001; world population c12_geo_cbse_02_001;
  India migration c12_geo_cbse_09_009; land use c12_geo_cbse_11_002; rural
  settlement patterns c11_geo_cbse_17_002; earthquake c11_geo_cbse_11_002;
  tropical cyclone c11_geo_cbse_11_007.
- Batch 6 (c11-12 HISTORY, ~17): Mesopotamia c11_hist_cbse_01_001; Akkadian
  c11_hist_cbse_01_006; Roman Empire c11_hist_cbse_02_001; Byzantine
  c11_hist_cbse_02_010; Rise of Islam c11_hist_cbse_03_006; Umayyad
  c11_hist_cbse_04_006; Abbasid c11_hist_cbse_04_007; Mongol conquests
  c11_hist_cbse_05_006; feudalism c11_hist_cbse_06_004; Renaissance spread
  c11_hist_cbse_07_010; Gold Rush c11_hist_cbse_08_003; Harappan town planning
  c12_hist_cbse_01_003 (query "Mohenjo-daro plan" already in manifest — use a
  DIFFERENT pick index than c6_history_ch04_003's pick 1, e.g. pick 0);
  Mauryan c12_hist_cbse_02_002 (same: "Maurya Empire map" shared — take the
  other index); Uttarapatha/Dakshinapatha c12_hist_cbse_02_010 ("ancient India
  trade routes map"); Vijayanagara setting c12_hist_cbse_07_005 ("Hampi map");
  Partition 1947 c12_hist_cbse_11_010 ("dominion of india pakistan map" —
  c8_hist_ch4_11 found no clean English one; try this fresh query).
- History-era rule: verify each map's dates match the node (a 1900-map on a
  modern-politics node = critical fail).

## Pipeline traps learned (MUST follow)
1. search_terms.json holds ONE batch at a time (emit iterates it). Restore the
   FULL batch's terms (final queries) before emit.
2. CHANGING a node's query? First DELETE staging/<node_id>__*.* — old files
   otherwise mask new downloads and cause file/metadata index mismatch.
3. Class-8 physics ids are c8_physics_chN_M (NOT c8_phy_). Class-6 history is
   c6_history_chNN_MMM (zero-padded); c7/c8 hist are c7_hist_chNN / c8_hist_chN.
   Always verify via node_classes.json before sourcing.
4. Syllabus class comes from node_classes.json (index `class` field), NOT the id
   prefix — grade map re-maps content (c6_biology_ch10_* = class 7 etc.).
5. Thumb-first downloads (429 workaround, wave-B relay) are already in
   source_commons_waved.py. Keep --sleep >= 2.5 on searches, 1.6s+ on downloads.
6. Orphan scope in validate_diagrams_waved.py is limited to MY families in
   class11/12 (c1[12]_(geo|hist)_*) because sibling waves publish sci anchors
   there concurrently — do not "fix" files you do not own.
7. Wrong-language hits are the top rejection cause on Commons (Bengali/Hebrew/
   Arabic/Turkish/German/French maps of Indian topics are common). English-label
   requirement is strict; re-query with different phrasing before giving up.
   Wave B's re-query notes: D:\platform\_cisce_build\diagwaveB_backup\.

## VERIFICATION POSTSCRIPT 2026-09-30 (post-registry-drop resume audit)
D-2 outputs re-verified on disk after the interrupted session — all COMPLETE claims hold:
- 38/38 images exist in deploy AND root mirror (byte-equal both trees); part-files
  byte-equal to backup; picks.json == backup; 3 rejects are pick=-1 and have NO
  leaked files in class dirs; master diagrams_index.json now carries IDENTICAL
  entries for all 38 waveD2 ids (merge landed; c11_hist_cbse_01_001 resolved to
  waveD2's .png — sibling .jpg gone).
- c12_geo_cbse_02_001.png mtime moved to 02:49 in both trees: re-copy only,
  sha256 still equals staging pick __0 — content intact.
- KNOWN NOISE (not a D-2 defect): validate_diagrams_waved2.py now reports 41
  "orphan" errors — ALL are sibling-wave files (mtimes 02:44+, after D-2's
  01:55 finish) for geo/hist node ids OUTSIDE D-2's 38, incl.
  c12_geo_cbse_09_009.jpg (D-2 rejected this node, pick=-1; a sibling
  published their own map). Per trap 6 these belong to sibling part-files —
  reconcile at MERGE time, do not delete from D-2. "0 errors" was true at
  D-2 finish and remains true for D-2-owned state.

## Per-batch flow
write search_terms.json (batch only) -> python source_commons_waved.py
--per-node 2 --sleep 2.5 -> rm -f sheets/*.png && python contact_sheet_waved.py
'^<batch-prefix-regex>' -> Read every sheet -> update picks.json (cumulative,
-1 = reject) -> restore full terms -> python emit_diagrams_waved.py ->
python validate_diagrams_waved.py (must be 0 errors) -> update this file.
