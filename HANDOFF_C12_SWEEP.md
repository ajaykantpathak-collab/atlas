# Handoff — Class 12 Diagram Sweep (OpenStax/BioIcons era)

> Written 2026-09-23. Read this + `AGENTS.md` before continuing. The goal: every curriculum node gets the best visual medium — diagram, sim, painter, or text — with world-class quality.

---

## Live environment (as of last check)

- **Dev server**: `http://localhost:3000` — persistent `next dev` running in background shell `devserver` (started with `cd frontend && PORT=3000 npm run dev`). Hot reload ~2s. **Use this for all iteration.**
- **Production**: `http://localhost/` and `:3001` — old bundle until next ship.
- **Backend**: `dream-backend-1/2` healthy, `/api/health` OK.
- **Diagram preview route**: `/sandbox?lab=<labKey>` e.g. `/sandbox?lab=dgm_os_menstrual`. Browser preview open (id `fd844f7e-547c-4a68-99c3-5d07e4b1ed8b`).
- A production host build may still be running in shell `b3f454` (`deploy/frontend npm run build`). Check `get_output b3f454`; when done, ship via `docker cp` (see below) instead of a Docker rebuild.

---

## The fast workflow (replace the slow one)

1. **Edit** in `frontend/` (dev tree) — diagrams mds live in `assets/diagram_lab/md_c12/`.
2. **Targeted sync** to deploy (NOT `node scripts/sync-deploy.js` — it hashes 16k files, 4+ min):
   ```
   robocopy frontend/components/sims_v2 deploy/frontend/components/sims_v2 /MIR
   robocopy frontend/public/diagrams deploy/frontend/public/diagrams /MIR
   ```
3. **Host build** in `deploy/frontend` (`npm run build`, ~5-8 min), then **ship without Docker rebuild**:
   ```
   docker cp deploy/frontend/.next/standalone/. dream-frontend:/app/
   docker cp deploy/frontend/.next/static/. dream-frontend:/app/.next/static/
   docker cp deploy/frontend/public/. dream-frontend:/app/public/
   docker restart dream-frontend
   ```
   (Container is Next standalone: `/app` = standalone, `/app/.next/static`, `/app/public`.)
4. Backend `.py` edits: `docker cp` straight into `dream-backend-1/2` at `/app/backend/` — no restart needed per AGENTS.md.

---

## Diagram pipeline (proven, repeatable)

Per node/chapter: pick source → write `.md` → `validate.py` → `render_overlay` QC → fix spots → `publish.py` → wire sim mission → typecheck.

```bash
python tools/diagram_lab/validate.py assets/diagram_lab/md_c12/<slug>.md
# QC overlay -> assets/diagram_lab/md_c12/<slug>_qc.png (read it as image!)
python tools/diagram_lab/publish.py    # -> frontend/components/sims_v2/engine/diagrams.ts
```

- `.md` format: parts list (`id | label | x | y | r | fn`), `## explain`, `## exam` prompts.
- **Validator rejects**: overlapping hotspots AND exam prompts that leak answer words — iterate until PASS.
- **Always render + read the QC overlay** — figure layouts routinely differ from assumptions; nearly every md needed a coordinate rewrite after first QC.
- Sim wiring: `frontend/components/sims_v2/class12/v3/c12_<subj>_chNN_pM.ts` → `mission: { widget: 'dgm_<slug>', validate: 'dgm_<slug>:sel=<partIndex>', instruction: '...' }`.
- Typecheck: `cd frontend && npx tsc --noEmit --skipLibCheck` — **~84 errors are PRE-EXISTING** in legacy `components/simulations/c6_12*/` files (BKTState renames, `;,` corruption). Ignore unless a new file appears (esp. `canvasLab.tsx`, `class12/v3/`).

---

## Asset sources — the working stack

| Source | Path/URL | License | Status |
|---|---|---|---|
| **OpenStax Biology 2e** | `github.com/openstax/osbooks-biology-bundle` `media/` dir | **CC BY-NC-SA 4.0** | 46 figures downloaded+indexed |
| **BioIcons** | `github.com/duerrsimon/bioicons` `static/icons/<license>/<cat>/<author>/` | per-dir CC0/BY/BY-SA/MIT | 9 SVGs downloaded |
| **Wikimedia Commons** | earlier pipeline | PD/CC-BY | 161 older diagrams |
| **Hand-painted canvas** | `canvasLab.tsx` painters | original | 8 painters (synapse, genetics, etc.) |

**Licensing flag (unresolved, decide before commercial ship)**: OpenStax is CC **BY-NC-SA** — fine if Atlas is free for students, needs permission/different source if paid. Every shipped figure's license lives in `assets/diagram_lab/img/assets_exp.json`.

**Copyright rule (user-mandated)**: NCERT figures are the *spec*, never shipped. The 115 extracted crops in `assets/diagram_lab/ncert_figs/` are reference only — what each figure must teach, which labels, canonical vocab. Tracing/vectorizing them = still a copy. Licensed equivalents or genuine redraws only.

**Figure indexes already built**:
- `assets/diagram_lab/lebo_figures.json` — every NCERT c12 bio figure (chapter, page, caption)
- `assets/diagram_lab/os_figures.json` — **1,135 OpenStax figures** indexed with captions + media paths (full book)
- `ncert_books/text_cache_new/` — parsed text of all NCERT books (class_12/misc/lebo1XX.txt)
- `ncert_books/class_12/lebo1_Biology/lebo1NN.pdf` — raw PDFs

To fetch an OpenStax figure: `https://raw.githubusercontent.com/openstax/osbooks-biology-bundle/main/media/<file>` — filenames are in `os_figures.json` entries' `src` field.

---

## Current state

- **232 diagrams published** in `frontend/components/sims_v2/engine/diagrams.ts`.
- Session added ~70 `os_*` OpenStax figures: griffith, hershey, codon_wheel, ribosome, translation, hiv_cycle, menstrual, ovarian_cycle, spermatogenesis, oogenesis, fert_implant, xlinked, apc, antibody_response, antibody2, inflammation, bcell, tcell, finches, homologous, adaptive_rad, hardy_weinberg, speciation, bottleneck, age_pyramids, exp_growth (J+S panels), trophic, energy_flow, eco_pyramids, carbon_cycle, nitrogen_cycle, water_cycle, food_web, lynx_hare, mimicry, competition, hotspots, species_area, survivorship, nucleosome, embryo_sac, seeds, trna, splicing, frameshift, sperm, capsella, double_fert, anther, pollen, follicle, tryptophan, punnett, darwin_tree, gene_flow, flower_parts.
- **Dropped** (weak assets): `os_logistic` (seal photo — S-curve lives inside `os_exp_growth`), `os_genetic_drift` (noisy figure — `os_bottleneck` covers it).
- **Sims wired** through c12 bio ch13 (all p1/p2 mission slots filled through ch11-13: ecori, pcr, agrobacterium, pbr322, age_pyramids, exp_growth; ch07/08: homologous, finches, antibody_response, hiv_cycle).
- Downloaded but **not yet authored** (`assets/diagram_lab/img/`): `os_translation_term`, `os_hormone_sperm`, `os_ovarian_cycle` is done… check `img/` for `os_*` without a matching `md_c12/os_*.md` — at last count ~4 stragglers.

## Remaining gaps (next session's work)

1. **QC sweep of newest batch** — capsella, double_fert, anther, pollen, follicle, tryptophan, punnett, darwin_tree, gene_flow, flower_parts, embryo_sac, seeds, trna, splicing, frameshift, sperm were validated but **QC overlays not yet visually reviewed** — render and eyeball each, fix coords (this is the step that catches misaligned spots).
2. **Ch8 microbes** (lebo108): fermentor, sewage plant, biogas — NCERT-specific, no OpenStax equivalent → canvas painters.
3. **Ch10 biotech apps** (lebo110): Bt cotton lifecycle, RNAi mechanism — agrobacterium exists; consider painters.
4. **Remaining sim wiring**: `c12_bio_ch09_p*` (dairy/microbes) and `c12_bio_ch10_p*` (fermentation) still on `molecule` placeholder.
5. **Physics/chem c12 stragglers** — node sweep continues into non-bio subjects after bio is done.
6. Then the node-driven sweep descends to c11 (its corpus is denser: phys/chem/bio/maths).
7. **License decision**: OpenStax NC — needed before any commercial launch.

## Don't repeat these mistakes

- Never ship NCERT pixels/traces — spec only.
- Don't trust assumed figure layouts — QC overlay read is mandatory.
- Exam prompts must not contain any word from a part label (validator checks) — use indirect phrasing ("the nurse layer feeding the grains" not "tapetum").
- Don't use `sync-deploy.js` for iteration — robocopy the two changed dirs.
- Don't rebuild the frontend Docker image for iteration — host build + `docker cp`.
- `c9_budding`, `c6_air_composition`, `c9_epithelium` publish-skips are pre-existing broken entries, not new failures.

---

## Update — 2026-09-24 (session 2)

**Done this session:**
- QC'd all 16 unreviewed newest-batch overlays (`tools/diagram_lab/qc_overlay.py` — NEW script, draws hotspot circles on source images; the old `render_overlay.py` doesn't exist) — all clean, zero repairs.
- Found + fixed **7 corrupted validate strings** (`dgm_X:mission: { widget:...` doubled junk) in c12_bio ch01_p1/p2, ch03_p2, c12_biotech_ch10_p1, c12_phy_ch05_p1, ch13_p1/p2.
- Wired `c12_biotech_ch01_p2` mission (pBR322 node) from generic `dna` → `dgm_c12_pbr322`.
- Physics stragglers: ch03_p2 meter bridge → `dgm_c12_wheatstone` (sel=5, output/null point); ch04_p2 solenoid → `dgm_c10_solenoid` (sel=1, field inside); ch07_p2 power factor → `dgm_c12_rlc` (sel=0, resistor = only real-power element).
- All `c12_bio_*` (13 chapters × 2) fully diagram-wired — zero generic widgets left in bio.
- robocopy **must run via `cmd //c`** in Git Bash — `/MIR` gets path-mangled otherwise (prints usage, does nothing).
- Synced sims_v2 + public/diagrams to deploy (59 os_ images both trees).

**New tool**: `tools/diagram_lab/qc_overlay.py <md>` — renders hotspot QC overlay to `<slug>_qc.png`. Use this, not the nonexistent render_overlay.py.

**Remaining gaps:**
- `c12_phy_ch02_p2/p3` still on `circuit` — conductors/Van de Graaff nodes need real figures (no diagram exists; Van de Graaff is a painter candidate — sphere/belt/rollers, geometric).
- `c12_biotech_*` (7 files) still on `dna` — mostly text-fine nodes (ethics, regulation, public perception); gene therapy (10_007) is the one diagram-worthy node.
- Remediation `labTask` entries throughout still use generic `circuit`/`grow` — secondary cleanup.
- c12 chem chapters unreviewed.

**CISCE side-project** (separate): `_cisce_build/fill_cisce_nodes.js` — hardened + prompt-strengthened, smoke test 2/2 at CBSE quality. Ready for full 9,433-node run (~16h at 12s cadence) on owner's word.
