# Atlas — iOS: honest assessment (addendum to README-STORE)

One page. Verdict first: **iOS is a 2–3 week follow-on, not a submission-day
task. Ship Android first.**

## What you need (non-negotiable)

| Requirement | Cost | Notes |
|---|---|---|
| A Mac | from ~₹45k (Mac mini) or borrow | Xcode runs only on macOS. No way around this. |
| Xcode (latest stable) | free | App Store download, ~12 GB |
| Apple Developer Program | **$99/year** | enrolment is per-person or org; approval 24–48 h, sometimes longer for orgs |
| An iPhone for testing | any recent device | simulator is not enough for WebView review sign-off |

## Why the port is genuinely cheap (but not zero)

The Capacitor 7 scaffold in `frontend/capacitor/` is cross-platform by
design — the same remote-load shell (Path A), `www/offline.html` fallback and
`capacitor.config.ts` work on iOS. The work is:

1. `npx cap add ios` → generates the Xcode project next to `android/`.
2. Same config: `server.url` → production origin, `errorPath: offline.html`,
   `androidScheme: https` → iOS equivalent handled by Capacitor (WKWebView
   loads https only).
3. Xcode: set Team + bundle id `com.atlaslearning.app`, bump version
   (§Versioning in README-STORE), Product → Archive → upload to App Store
   Connect (Transporter or Xcode organizer).
4. TestFlight internal → external → App Review.

## iOS-specific walls Android doesn't have

- **Guideline 4.2 (Minimum Functionality)** hits wrapped-website apps *harder*
  on iOS than Play's equivalent. Path A passes only with the same mitigations
  (native splash, real offline screen, push wiring). The long-term fix is the
  same Path B migration — on iOS it is closer to mandatory than optional.
- **Account deletion in-app (guideline 5.1.1(v))** is a hard requirement where
  account creation exists. The compliance erasure workflow already satisfies
  the backend (`POST /api/compliance/data-request`), but it must be reachable
  from the app UI — same TODO as the Play data-safety form (DATA_SAFETY.md).
- **Privacy "nutrition labels"** in App Store Connect mirror the Play data
  safety form — copy the answers from DATA_SAFETY.md verbatim.
- **Push** (when enabled) needs APNs keys in addition to FCM.
- Review is human and slower: typically 24–48 h, and first submissions
  commonly take one rejection round (+2–4 days).

## Realistic timeline (Mac + developer account in hand)

| Phase | Duration |
|---|---|
| Developer account enrolment (if not started) | 1–2 days calendar |
| `cap add ios`, signing, first build on device | 1–2 days |
| TestFlight internal + fixes (offline page, splash, keyboard/scroll quirks) | 3–5 days |
| External TestFlight + privacy labels + review | 3–7 days |
| **Total** | **~2–3 weeks calendar**, ~4–6 working days of actual effort |

Without a Mac today, add procurement + account setup: call it a month from
decision to App Store.

## Bottom line

Android first (this folder's assets are Play-ready), start the Apple Developer
enrolment in parallel the day Android is submitted, and schedule the iOS port
as a focused week once the Play closed-test track (14 days) is already running
— the two waits overlap.
