"""mailer.py — transactional email transport (WS-LEGAL).

Today there is NO configured SMTP relay in this stack (forgot-password
documents the same gap by returning the reset token as delivery:"demo").
This module is the single seam every mail-worthy flow calls:

  smtp_configured()           env check — PLATFORM_SMTP_HOST / SMTP_HOST
  send_email(...)             send via stdlib smtplib when configured,
                              otherwise LOG the fully-composed message
                              and report 'unconfigured' — never raises,
                              never pretends a send happened.
  send_parent_consent_notice  the DPDP §9 notice a student's parent or
                              guardian receives when the signup consent
                              checkbox is recorded.  Returns 'sent' or
                              'unconfigured'; the caller stores that as
                              users.consent_status ('notified'/'pending').

Env contract when a relay is wired later:
  PLATFORM_SMTP_HOST | SMTP_HOST        relay host (presence = configured)
  PLATFORM_SMTP_PORT | SMTP_PORT        default 587
  PLATFORM_SMTP_USER | SMTP_USER        optional AUTH user
  PLATFORM_SMTP_PASSWORD | SMTP_PASSWORD
  PLATFORM_SMTP_FROM | SMTP_FROM        default no-reply@atlas.local
  PLATFORM_SMTP_STARTTLS                '0' to disable (default on)

"Queue only" today means: the message is fully composed and logged
(auditable), consent_status stays 'pending', and nothing blocks signup.
"""
from __future__ import annotations

import logging
import os
import smtplib
from email.message import EmailMessage

log = logging.getLogger("atlas.mailer")


def _env(*names: str, default: str = "") -> str:
    for n in names:
        v = os.environ.get(n)
        if v:
            return v
    return default


def smtp_configured() -> bool:
    """True when a relay host is set — the only env that means 'real mail'."""
    return bool(_env("PLATFORM_SMTP_HOST", "SMTP_HOST").strip())


def send_email(to: str, subject: str, text: str, *,
               timeout_s: float = 10.0) -> str:
    """Send one plain-text email, or log it when unconfigured.

    Returns 'sent' | 'unconfigured' | 'error'.  Never raises: mail is a
    side-effect of a committed write, and a dead relay must not roll a
    signup or a deletion back.  An 'error' return still means nothing was
    delivered — callers treat anything but 'sent' as undelivered.
    """
    if not smtp_configured():
        log.info(
            "mailer[unconfigured] composed-only | to=%s subject=%r\n%s",
            to, subject, text,
        )
        return "unconfigured"
    try:
        msg = EmailMessage()
        msg["To"] = to
        msg["From"] = _env("PLATFORM_SMTP_FROM", "SMTP_FROM",
                           default="no-reply@atlas.local")
        msg["Subject"] = subject
        msg.set_content(text)
        host = _env("PLATFORM_SMTP_HOST", "SMTP_HOST")
        port = int(_env("PLATFORM_SMTP_PORT", "SMTP_PORT", default="587"))
        user = _env("PLATFORM_SMTP_USER", "SMTP_USER")
        password = _env("PLATFORM_SMTP_PASSWORD", "SMTP_PASSWORD")
        starttls = _env("PLATFORM_SMTP_STARTTLS", default="1") != "0"
        with smtplib.SMTP(host, port, timeout=timeout_s) as smtp:
            if starttls:
                smtp.starttls()
            if user:
                smtp.login(user, password)
            smtp.send_message(msg)
        return "sent"
    except Exception:
        log.exception("mailer: send to %s failed", to)
        return "error"


def send_parent_consent_notice(
    *,
    parent_email: str,
    student_name: str,
    student_email: str,
    class_level: int | None,
    board: str | None,
) -> str:
    """Compose + send the DPDP parental-consent notice.

    Informs the parent/guardian that a student account was created under
    their declared consent, what was recorded, and how to reach the
    Grievance Officer / request deletion.  Returns the send_email() status.
    """
    cls = f"Class {class_level}" if class_level else "school"
    brd = f" ({board})" if board else ""
    body = f"""Dear parent or guardian,

An Atlas student account was just created for {student_name or 'your child'}
({student_email}) — {cls}{brd} — naming you as the consenting parent or
guardian, as required for users under 18 under India's Digital Personal
Data Protection Act, 2023.

What was recorded: your email address as the consent contact, the time of
consent, and the method (signup consent checkbox). Your email is used only
for consent verification and important account notices — never for
marketing.

If you did NOT consent to this account, or you want to review, export, or
delete your child's data at any time, reply to this email or contact our
Grievance Officer at [GRIEVANCE OFFICER EMAIL — see Atlas Privacy Policy].
Account deletion can also be started inside the app: Settings → Privacy &
Security → Delete account.

— The Atlas team
"""
    return send_email(
        parent_email,
        "Atlas: a student account was created with your consent",
        body,
    )
