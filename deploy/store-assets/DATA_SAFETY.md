# Atlas — Play Data Safety form answers

Every answer below is grounded in the shipped compliance code, not intent:
`backend/modules/compliance/` (consent ledger, data-request workflow with a
30-day SLA, audit log, anonymising erasure worker) and
`backend/modules/mobile/` (device registry). Sources are cited per row so the
form can be re-audited after any change.

## Form answers (Play Console → App content → Data safety)

**Q: Does your app collect or share any of the required user data types?**
→ **Yes**, Atlas collects the data below. **Sharing: No** — data is never
sold and never shared with third parties for advertising. (Razorpay, when
payments are enabled on the website, acts as a payment *processor*, which is
excluded from Play's definition of sharing; no card numbers ever touch Atlas
servers. Play build v1 has no purchases at all — see README-STORE §7.)

**Q: Is all of the user data collected by your app encrypted in transit?**
→ **Yes.** The site is served over HTTPS/TLS only, and the Android shell
ships with `cleartext: false` (`frontend/capacitor/capacitor.config.ts`) —
plain-HTTP is impossible in the app. Passwords are bcrypt-hashed at rest
(`backend/security.py`).

**Q: Do you provide a way for users to request that their data is deleted?**
→ **Yes.** Any signed-in user can file an erasure request against
`POST /api/compliance/data-request` (`kind: "erasure"`); the worker
(`modules/compliance/fulfilment.py → erase_user_data`) destroys the PII
(name → deterministic pseudonym, parent phone/WhatsApp → NULL, audit ids →
pseudonymised) within the **30-day SLA** the endpoint returns, and every step
is audit-logged. Exports (`kind: "export"`) work the same way.
> ⚠ Owner TODO before review: surface this as a visible **Settings → "Delete
> my data"** action in the app/website UI (the API exists; reviewers look for
> a user-visible path, and Apple's 5.1.1(v) will require it too).

## Data types declared in the form

| Play category | Type | Collected | Shared | Purpose | Grounding |
|---|---|---|---|---|---|
| Personal info | Name | Yes | No | Account management | `SignupRequest.name` (required), `UpdateProfileRequest.name` — `schemas/auth.py`, `routers/auth.py` |
| Personal info | Email address | Yes | No | Account management | `SignupRequest.email`; login is email+password |
| Personal info | Phone number | Optional | No | App functionality (parent/guardian contact, only if parent linking is used) | `parents.phone`/`whatsapp` columns; NULLed on erasure — `compliance/fulfilment.py` |
| Personal info | User IDs | Yes | No | Account management | internal user id on every compliance row |
| Financial info | User payment info | **No** (in-app) | No | — | purchases live on the website via Razorpay; servers store order ids + entitlement status only (`modules/payments/`); Play v1 build: free only |
| Health & fitness | — | No | — | — | — |
| Photos & videos | — | No | — | — | avatar is a URL string, no gallery access (`UpdateProfileRequest.avatar_url`) |
| Audio, files, docs | — | No | — | — | — |
| App activity | App interactions | Yes | No | App functionality (mastery, streaks, progress, attempts, homework submissions) | `attempts`, `homework_submissions`, `progress` tables (listed in `compliance/fulfilment.py`); `routers/progress.py`, `achievements.py` |
| App activity | In-app search history | No | — | — | — |
| Web browsing | — | No | — | — | — |
| App info & performance | Crash logs / diagnostics | No | — | — | no crash/analytics SDK |
| Device or other IDs | Device or other IDs | Yes | No | App functionality + Fraud prevention, security, compliance | `mobile_devices.device_id, platform, app_version, push_token?` (`modules/mobile/router.py`); IP + email kept for failed-login rate limiting and the audit trail (`routers/auth.py`, `compliance/models.AuditEvent.ip`) |

**Collected but not user data:** education content itself (questions,
solutions) and the user's own consent records
(`consents: purpose ∈ {analytics, marketing, parental}, policy_version`) and
audit events — the consent ledger defaults every purpose to **off** and
nothing currently consumes analytics/marketing consent (no SDKs exist).

## Explicit negatives (keep these true)

- **No ads, no ad SDKs, no advertising ID usage.**
- **No data sold, no data shared for ads** — the store listing promises this.
- No precise/coarse location, contacts, microphone, camera, SMS.
- No third-party analytics or crash reporters.
- No data flagged "ephemeral" (all of the above is stored server-side under
  the user's account — that is the product's point; the export/erasure
  workflow is the offset).

## Other App-content forms this doc feeds

- **Privacy policy URL (required before review):** `GET /api/compliance/policy`
  serves the active version and points at `/privacy` — that frontend page does
  **not exist yet** (only `/pricing` does). Publish a `/privacy` page stating
  exactly the table above before submitting. This is on the README-STORE §9
  day-of checklist.
- **Families Policy decision (README-STORE §2.5):** classes 6–12 include
  under-13s. Either declare **13+ and gate signup age**, or opt into Families
  (no ads ✓ already true, data-minimisation ✓ mostly true, Play review). The
  data-safety answers above do not change between the two — the gating does.
- **Content rating:** no user-generated content sharing, no ads → questionnaire
  resolves to Everyone / PEGI 3.
- **Government-registered child-directed service (India):** No.
- **Independent security review:** No.
- **Financial-features declaration:** only when subscriptions surface in-app
  (Play Billing v2, README-STORE §7). For v1 (free) answer "No".
