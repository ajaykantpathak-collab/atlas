# Audit — `D:\platform\scripts\sync-deploy.js`

Scope: the two new behaviours (a) `--quick` size-only compare, (b) the `PROTECTED`
allowlist preventing deletion of deploy-only live data. Reviewed read-only; **no files
in `D:\platform\deploy` were modified, moved or deleted, and the script was never
executed without `--check`.** All evidence below comes from reading the file plus
`git diff`, filesystem inspection of `deploy/content` vs `content/`, `.gitignore`,
`backend/services/qdrant_service.py` and `deploy/docker-compose.prod.yml`.

---

## Findings

### F1 — HIGH — `--quick` produces a **false "in sync"**, the exact opposite of its stated contract
**`scripts/sync-deploy.js:141-143`** (contract asserted at **`:29-33`**)

```js
copy = QUICK
    ? d.size !== s.size
    : (d.size !== s.size || hashFile(absSrc) !== hashFile(absDst));
```

Mechanism: in `--quick` mode `copy` is `true` only when the byte length differs. A file
whose **content changed but whose length is identical** yields `copy === false`, is counted
into `stats.unchanged` (`:144`) and is never copied and never reported as drift. A CI gate
running `--check --quick` therefore exits `0` on a genuinely drifted `deploy/`. Same-length
edits are routine in this repo — version strings, a swapped identifier, a changed digit, a
reordered import of equal width, config values (`"dev"` → `"prd"`).

Context: `Qdrant COLLECTIONS` maps `"nodes" -> "cisce_nodes_v2"`
(`backend/services/qdrant_service.py:91-94`), and `--quick` is advertised in the header as
the CI gate (`:11`).

**Fix:** never let `--quick` conclude "unchanged" from size alone. Hash on equal size even
in quick mode (the expensive case is already the rare one):
```js
copy = d.size !== s.size || hashFile(absSrc) !== hashFile(absDst);
```
If size-only must be kept for speed, rename it (e.g. `--size-only`) and make it exit
**non-zero** on any file whose size matched but was not hashed, so CI can never read it as
clean.

### F2 — HIGH — `--quick` is accepted **without** `--check`, silently corrupting a real mirror
**`scripts/sync-deploy.js:34`**

```js
const QUICK = process.argv.includes('--quick');
```

Mechanism: nothing constrains `QUICK` to `CHECK_ONLY`. `node scripts/sync-deploy.js --quick`
runs a **real, destructive** mirror (`:148`, `:164`) with size-only comparison. Changed
same-size files are skipped (F1), so `deploy/` is left **stale and inconsistent with the
repo**, and because drift only gates the exit code under `CHECK_ONLY` (`:186`) the run
exits `0` — a green pipeline that shipped drifted content.

**Fix:** reject the combination outright:
```js
if (QUICK && !CHECK_ONLY) {
    console.error('! --quick is only valid with --check (it cannot detect same-size changes).');
    process.exit(2);
}
```

### F3 — HIGH — The `--quick` comment is **inverted** and will mislead future maintainers
**`scripts/sync-deploy.js:29-33`**

> "Size-only is deliberately conservative: it may copy a file whose content changed but
> whose length did not. That is wasted I/O, **never a false 'in sync'**."

The implemented code does the reverse: it **does not** copy a same-length changed file and
reports it as in sync. The comment describes behaviour the code does not have, and asserts a
safety property that is false. Left in place, this comment is what causes F1 to be waved
through in review.

**Fix:** rewrite the comment to state the real trade-off (size-only cannot detect same-length
content changes) once F1/F2 are fixed.

### F4 — MEDIUM-HIGH — `PROTECTED` is **incomplete**: three deploy-only `content/` trees are unprotected and *will* be deleted
**`scripts/sync-deploy.js:63`** (consumed at `:102`, `:161`)

`deploy/content` contains **10** directories; the repo source `content/` contains only
**4** (`doodle_cards`, `enhanced_nodes_md`, `marking_points`, `model_answers`).
`PROTECTED` covers 3 of the 6 deploy-only trees. The following exist **only** in `deploy/`
and are **not** in `PROTECTED` and **not** in `TREE_SKIP.content` (`:51`):

| deploy-only dir | in `PROTECTED`? | in source? |
|---|---|---|
| `cisce` | yes | no |
| `cisce_nodes_md` | yes | no |
| `cisce_nodes_v2` | yes | no |
| **`index`** | **NO** | no |
| **`nodes`** | **NO** | no |
| **`practice_variants`** | **NO** | no |

Mechanism: for every file under these three, `protectedPaths.some(...)` at `:161` is
`false` and `seen` (`:127-130`) does not contain the rel, so `:163-164` increments
`stats.deleted` and calls `fs.rmSync`. They are empty on this machine today (0 files), so
nothing is lost *right now* — but `docs/notes/FILE_MAP.md:117` and `:148` document
`content/index/` and `content/nodes/` as real corpora (including a 34 MB
`content/index/v2/question_bank_c6_12.json`). The moment either is populated in `deploy/`,
the next mirror run destroys it, and `--check` will report the destruction as legitimate
drift rather than as a blocked path.

**Fix:** stop using a hand-maintained denylist as the sole safety mechanism. Invert the
default — only delete paths under an explicit `SYNCABLE` prefix list, and treat every other
`content/` path as deploy-owned. At minimum, add `index`, `nodes`, `practice_variants` to
`PROTECTED` today, and refuse to run when a deploy-only top-level directory is found in
`deploy/content` that is neither in `PROTECTED` nor present in source.

### F5 — MEDIUM — Fail-**open** on an empty source tree: mass deletion of non-protected `deploy/content`
**`scripts/sync-deploy.js:105`, `:127-130`, `:159-166`**

Mechanism: `content/` is **100% gitignored** — `git ls-files content` returns **0 tracked
files**, and `.gitignore:47-50` ignores `content/doodle_cards/`, `content/enhanced_nodes_md/`,
`content/index/`, `content/nodes/`. The local working copy has 26,464 files, but **none are
in git**. On a fresh clone or a CI runner, `content/` will be absent (handled — `:105` returns
early) **or present-but-empty**. In the present-but-empty case the script proceeds:
`walk(src)` yields nothing, `seen` stays empty, and the delete loop at `:159-166` removes
**every** non-protected file under `deploy/content` — i.e. the mirror wipes the content tree
because the checkout happened to have an empty directory.

**Fix:** never delete from a tree whose source yielded zero files:
```js
let sourceFiles = 0;
// ...in the copy loop, after the relOf call:
sourceFiles++;
// before the delete loop:
if (sourceFiles === 0) {
    console.log(`  ${tree}: source is empty - skipping deletion pass (fail-closed).`);
    return stats;
}
```

### F6 — MEDIUM — The per-tree summary line omits `blocked`, making a blocked tree look clean
**`scripts/sync-deploy.js:178-179`**

```js
console.log(`${tree}: +${s.copied} copied, -${s.deleted} deleted, ` +
    `${s.unchanged} unchanged  (...)`);
```

Mechanism: when the pre-flight at `:114-123` aborts a tree, `stats` is all zeros, so the line
prints `content: +0 copied, -0 deleted, 0 unchanged` — byte-identical to a successful
no-drift sync. Nothing in the summary distinguishes "content is in sync" from "content was
**refused**". A reviewer reading only the summary concludes the tree verified clean.

**Fix:** include the blocked count and an explicit status:
```js
const tag = s.blocked ? `NOT SYNCED - ${s.blocked} PROTECTED conflict(s)` : '';
console.log(`${tree}: +${s.copied} copied, -${s.deleted} deleted, ` +
    `${s.unchanged} unchanged  ${tag} (${...}s)`);
```

### F7 — MEDIUM — "Fail closed — write nothing" is only true *per tree*; the run is partially applied
**`scripts/sync-deploy.js:110-112`** (loop order at `:173`)

The comment promises the conflict check happens "BEFORE any copy or delete" and that the
script will "write nothing". In reality the trees are processed in the order
`backend, frontend, content` (`:173`) and the `content` pre-flight runs **inside**
`syncTree('content')` (`:114`), i.e. **last**. By the time the conflict is detected,
`deploy/backend` and `deploy/frontend` have already been overwritten (`:150`, `:164`).
The run exits 1 with a half-updated `deploy/`, and the "NOT synced" message (`:118`) refers
only to `content`.

**Fix:** two-phase execution — run every tree's pre-flight first, and only if
`blockedTotal === 0` perform the mutating passes. Alternatively, soften the comment to state
that only the affected tree is left untouched.

### F8 — LOW — Case-sensitive string compare against a case-insensitive filesystem
**`scripts/sync-deploy.js:161`**

```js
if (protectedPaths.some((p) => rel === p || rel.startsWith(p + '/'))) continue;
```

Mechanism: the pre-flight at `:113` uses `fs.existsSync`, which is case-insensitive on
Windows, but the delete guard is a case-sensitive string compare. If a protected directory
is ever renamed to different casing (`CISCE`, `Cisce_Nodes_V2`), the pre-flight still
correctly **blocks** the run when it appears in source, but the delete guard would **fail to
match** and delete the live corpus. The two checks disagree about what "the same path" means.

**Fix:** normalise the comparison:
```js
const r = rel.toLowerCase();
if (protectedPaths.some((p) => {
    const q = p.toLowerCase();
    return r === q || r.startsWith(q + '/');
})) continue;
```

### F9 — LOW — `hashFile` cache key can serve a stale hash
**`scripts/sync-deploy.js:74`**

```js
const key = `${p}|${st.size}|${st.mtimeMs}`;
```

Mechanism: the cache is never invalidated and is keyed on size + mtime. A file rewritten
with an identical byte length within the same mtime tick resolves to the cached digest and
is wrongly reported as unchanged. Low probability for a one-shot run, and `src`/`dst` are
distinct paths so there is no cross-tree collision — but the cache buys nothing, because
source files do not change during a run.

**Fix:** drop the cache, or key on `p` alone (the source is immutable for the process
lifetime).

### F10 — LOW / PERF — The delete walk traverses all 14,646 protected files before discarding them
**`scripts/sync-deploy.js:159-161`**

`walk(dst, skipPaths)` descends into `cisce_nodes_md` (9,433 files, 45 MB) and
`cisce_nodes_v2` (5,213 files, 138 MB) and only then discards each entry at `:161`. On the
"~30k-file trees" the header cites, a large fraction of the traversal is wasted work on
paths that can never be deleted.

**Fix:** push the predicate into `walk` so protected subtrees are pruned at the directory
level, as `skipPaths` already does at `:89`.

### F11 — NIT — Dead defensive default
**`scripts/sync-deploy.js:177`** — `blockedTotal += s.blocked || 0;`

`stats.blocked` is always initialised at `:103`, so `|| 0` can never fire. Harmless, but it
implies `blocked` is optional and hides the fact that the field is always present. Prefer
`blockedTotal += s.blocked;`.

---

## Verdicts on the five questions

**1. Does the `PROTECTED` skip cover nested paths correctly (`rel === p || rel.startsWith(p + '/')`)?**
**Yes, structurally correct — with two caveats.** At `:161` the predicate is a
prefix-on-segment-boundary match, so `cisce/a/b.md` is correctly matched by
`startsWith('cisce/')` while a sibling named `cisce_nodes_v2` cannot be matched by
`cisce` (the trailing `/` prevents that). A protected path that is itself a *file* is
covered by `rel === p`. Caveats: (a) the comparison is case-sensitive on a
case-insensitive filesystem (**F8**); (b) correctness is moot for the three *unlisted*
deploy-only trees (**F4**). The pre-flight at `:113` correctly covers nesting too, since
`path.join(src, p)` is true whenever the subtree exists at any depth under it.

**2. Are there remaining code paths that could delete a protected file?**
**No path can delete the three *listed* protected trees** — the copy loop (`:128-153`) can
only write a protected rel if the same rel exists in source, which the pre-flight (`:113`)
rejects first; and the delete loop (`:159-166`) filters before `fs.rmSync`. **But data loss
is still reachable two ways:** (a) the three deploy-only trees missing from `PROTECTED`
(`index`, `nodes`, `practice_variants`) are deleted with no guard at all (**F4**), and
(b) a present-but-empty source `content/` — highly likely in CI, since `content/` has zero
tracked files — drives `seen` to empty and deletes every non-protected file in
`deploy/content` (**F5**). F4/F5 are the real residual risk; the `PROTECTED` mechanism itself
is sound for what it names.

**3. Is the `stats.blocked` / exit-code logic correct? Does `--check` still exit 1 on drift?**
**The exit-code logic itself is correct.** `:186`
`process.exit((blockedTotal || (CHECK_ONLY && drift)) ? 1 : 0)` correctly returns 1 on drift
in `--check` (drift is set at `:176` from `copied`/`deleted`, both of which are incremented
in dry-run at `:147`/`:163` because the `CHECK_ONLY` guard only wraps the writes at
`:148`/`:164`), and returns 1 for a blocked conflict in **both** modes as documented at
`:184-185`. `blocked` is correctly scoped per tree. Two reporting/behaviour defects around
it: the summary line hides the block (**F6**), and the run is partially applied before the
block is detected (**F7**). Note also that a **missing** source tree (`:105`) prints a
warning but sets neither `drift` nor `blocked`, so `--check` exits 0 — a warning that does
not gate.

**4. Any bug in the `--quick` size-only branch?**
**Yes — two, and both are release-blocking for a CI gate.** (i) The branch yields a **false
"in sync"** for same-size content changes, directly contradicting the comment above it
(**F1**), which is the precise failure a drift gate exists to prevent. (ii) `--quick` is not
constrained to `--check`, so it can drive a real, destructive mirror that silently leaves
`deploy/` stale and still exits 0 (**F2**). The inverted comment (**F3**) is what makes
(i) look safe on review. Recommended: hash on equal size regardless of mode, and reject
`--quick` without `--check`.

**5. Does `blocked` get reset per-tree correctly?**
**Yes — no bug.** `stats` is constructed fresh inside `syncTree` at `:103` on every call,
and `syncTree` is invoked once per tree in the loop at `:173-175`, so each tree gets its own
`blocked` starting at 0; the early returns at `:105` and `:122` return that same fresh
object. Accumulation across trees at `:177` and the terminal check at `:186` are correct.
The only related nit is the redundant `|| 0` (**F11**).

---

## Summary

The `PROTECTED` design is sound in principle and the pre-flight ordering is genuinely
fail-closed for the paths it names. The blocking defects are on the `--quick` side: it
yields false "in sync" verdicts (**F1**), can be used for a real destructive mirror (**F2**),
and is documented with an inverted safety claim (**F3**). Independently, the protection is
**incomplete** — three deploy-only `content/` trees are unguarded (**F4**) and an empty
source tree makes the mirror fail open (**F5**) — which together mean the script can still
destroy deploy-only data today, not just in the future. Recommend fixing F1/F2/F3 before
any non-`--check` run, and F4/F5 before the next CI execution.
