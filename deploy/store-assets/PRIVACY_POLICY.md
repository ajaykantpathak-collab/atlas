# Atlas Learning — Privacy Policy

> Publish at `/privacy` (the URL `GET /api/compliance/policy` already points
> to). Content below is grounded in the same code facts as
> `DATA_SAFETY.md` — update both together if data handling changes.
> Placeholder tokens in `[…]` must be filled with real contact details.

**Version 1.0 — effective [date].**

Atlas Learning ("Atlas", "we") runs a study platform for students in classes
6–12 (CBSE and CISCE boards). This policy explains what we collect, why, and
the control you have. Plain language: **we collect the minimum needed to run
your learning account, we never sell data, and we show no ads.**

## What we collect

- **Account:** your name and email address, and a password (stored only as a
  bcrypt hash — never in readable form).
- **Profile:** your board and class level; optionally an avatar URL and
  display preferences.
- **Learning data:** your attempts, answers, homework submissions, mastery
  scores, streaks and achievements. This is the product — it exists so your
  progress and recommendations are genuinely yours.
- **Technical (mobile app):** a device identifier, platform and app version,
  and — only if you enable notifications — a push token. IP addresses are
  processed for security (rate-limiting and an audit trail of access to your
  data).
- **Payments:** payments are taken on our website by Razorpay, a PCI-compliant
  payment processor. Atlas servers store only order references and
  entitlement status — **never card numbers.** The Play Store app itself is
  free with no in-app purchases.
- **Parent/guardian contact:** a phone number is stored only if parent
  features are used.

## What we never do

- No advertising, no ad SDKs, no advertising identifiers.
- No selling of personal data, and no sharing with third parties for their
  own marketing.
- No collection of location, contacts, photos, microphone or camera data.
- No third-party analytics or crash-tracking SDKs.

## Security

All traffic is encrypted in transit (HTTPS/TLS; the Android app refuses
plain-HTTP). Access to student data is audit-logged, and you can inspect your
own audit trail.

## Your controls

- **Export:** request a machine-readable export of everything we hold about
  you — `POST /api/compliance/data-request` with `kind: "export"`.
- **Deletion:** request erasure of your data the same way with
  `kind: "erasure"`. We destroy your personal information within 30 days
  (minimal pseudonymised records needed for aggregate integrity and legal
  audit duties survive, with identifiers unrecoverable). Requests are
  fulfilled by our compliance worker and every step is logged.
- **Consent:** optional purposes (analytics, marketing, parental features)
  are opt-in per purpose, versioned, and revocable; today nothing outside
  core learning functionality consumes any consent.

Contact for any privacy matter: [privacy@yourdomain] · [postal address].
Children under 13 should use Atlas only with a parent or guardian's
permission and supervision, per our terms.
