# GIT_PUSH_RUNBOOK — first push of the Atlas repo to a private remote

**Why:** audit 2026-10-15 §2 #2 (CRITICAL) — no git remote, last commit
2026-09-30, 9,122 uncommitted paths: the entire product lived on one
Windows disk. This runbook is the OWNER-ONLY procedure to create the
private remote and push. All commands were prepared by fixer-F4
(LAUNCH-FIX-F4); none were executed by any agent (no agent may create
remotes or push).

**Placeholders** — replace before running, never commit real values:

| Placeholder | Meaning | Example shape |
|---|---|---|
| `<GITHUB_USER>` | your GitHub username | `octocorp` |
| `<REMOTE_NAME>` | remote nickname (keep `origin`) | `origin` |
| `<PAT>` | personal access token (repo scope) | `ghp_…` (used by `gh` login, not pasted below) |
| `<BACKUP_USB>` | any second physical device | `E:\AtlasRepoBackup` |

---

## 0. Preconditions (2 min)

```powershell
cd D:\platform
git status --porcelain | Measure-Object -Line   # expect 0 (or only the accounted-residue list)
git log --oneline -3                             # see the fix_2026_10_15 series at HEAD
gh auth status                                   # GitHub CLI logged in? if not: gh auth login
```

If `gh` is missing: `winget install GitHub.cli` then `gh auth login`
(browser flow — the PAT never touches the repo).

## 1. Create the PRIVATE remote + push (5 min)

```powershell
cd D:\platform
gh repo create <GITHUB_USER>/atlas --private --source . --remote <REMOTE_NAME> --push
```

That single command creates the private GitHub repo, registers the
remote, and pushes the current branch (`master`).

Manual equivalent (if you prefer no `gh`):

```powershell
gh repo create <GITHUB_USER>/atlas --private      # or create via github.com UI: Private, NO readme/license/gitignore
git remote add <REMOTE_NAME> https://github.com/<GITHUB_USER>/atlas.git
git push -u <REMOTE_NAME> master
```

> The initial push moves ~1-2 GB (corpus content-data series included).
> Expect 10-40 min on a home uplink; it is one-time.

## 2. Verify the push (2 min)

```powershell
git remote -v                                    # shows exactly one remote
gh repo view <GITHUB_USER>/atlas --json visibility,name  # "PRIVATE"
git ls-remote <REMOTE_NAME> | head               # remote HEAD == local HEAD sha
git rev-parse HEAD                               # compare with the line above
```

Then in the browser: repo → Insights → Community/Code frequency should
show the 2026-10-15 commit spike; repo → Settings → Danger zone →
"Change visibility" should say it is Private.

## 3. Branch protection + CI unblock (optional, recommended)

```powershell
# require a PR to push to master (protects the single-copy-of-record)
gh api -X PUT repos/<GITHUB_USER>/atlas/branches/master/protection \
  -f required_status_checks='{}' -f enforce_admins=false \
  -f required_pull_request_reviews='{"required_approving_review_count":1}' \
  -f restrictions='{}'
```

The existing `.github/workflows/{ci,ci-cd,solver-gate}.yml` start
running on the next push automatically (they were dead-lettered with no
remote — audit B6).

## 4. Nightly push (keep custody current — a one-time push rots fast)

Task Scheduler, daily 05:00 (after the 04:30 off-host backup):

```powershell
schtasks /create /tn "Atlas-Git-Mirror" /tr ^
  "cmd /c cd /d D:\platform && git add -A && git commit -m chore(nightly): auto-mirror && git push" ^
  /sc daily /st 05:00 /f
```

(If you adopted branch protection in step 3, push to a `nightly` branch
instead: `… && git push <REMOTE_NAME> master:nightly`.)

## 5. Escape hatch — restore from the remote onto a fresh box

If THIS disk dies, the product is recoverable from the remote:

```powershell
git clone https://github.com/<GITHUB_USER>/atlas.git D:\platform
cd D:\platform\deploy
copy .env.production.example .env.production   # then fill REAL secrets
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
# databases restore separately: harness/ops/backups + off-host target (rclone pull)
python harness\harness.py restore-drill harness\ops\backups\<newest-db-dir>
```

Data vs code matrix after clone:

| Asset | In git? | Recovery path |
|---|---|---|
| All backend/frontend/infra code (`deploy/**`) | yes | clone |
| CBSE + CISCE corpora (content-data series) | yes | clone |
| Postgres data (users, attempts, bank) | no | `backups\*.dump` / off-host target + restore drill |
| Runtime state (embeddings, caches) | no | regenerated on boot; `runtime_data/` on the off-host target |
| Secrets (`.env.production`, keys) | **never** | password manager / owner vault — set them up BEFORE you need them |

## 6. Second escape hatch — bundle to USB (remote-free)

```powershell
cd D:\platform
git bundle create <BACKUP_USB>\atlas-$(Get-Date -Format yyyyMMdd).bundle --all
```

A bundle is a single file containing the full history; restore with
`git clone atlas-YYYYMMDD.bundle D:\platform`.

---

## What must NOT be pushed (guards already in .gitignore)

- `.env`, `.env.production`, `frontend/.env.local` (real secrets)
- `_work/` workspace (contains live API-key scratch files, e.g.
  `_work/nim_keys.txt`, `_work/overhaul/wsb_verifier_keys.json`)
- `backups/`, `harness/ops/backups/` (contain user PII dumps)
- bulk art (`doodle_cards`, `diagrams`) and runtime dirs
  (`cbse_data/`, `organized/`, `parsed_output/`, `runtime_data/`)

If a push is ever rejected for a large file or you see any of the above
in `git ls-files`, STOP and re-check `.gitignore` before force-anything.
No `--force` push. Ever.
