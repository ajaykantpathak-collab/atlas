"""Accessibility preferences model.

Backs ``GET/PUT /api/accessibility/{student_id}`` (backend.api.accessibility).
The endpoint previously imported ``services.models.AccessibilityPreferencesModel``,
a module that never existed in this codebase, so every DB-backed call 500'd;
this model is the real store the router and the ``/api/student/a11y-prefs``
sync alias write through.

``student_id`` is the platform principal id (users.id, string form) so parent
and teacher records work identically to student records.
"""

import uuid

from sqlalchemy import Boolean, Column, Integer, String

from backend.database import Base


class AccessibilityPreferencesModel(Base):
    """Per-student accessibility preference set (one row per principal)."""

    __tablename__ = "accessibility_preferences"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String(64), unique=True, nullable=False, index=True)

    # Presentation
    font_size = Column(String(16), nullable=False, default="medium")
    color_theme = Column(String(32), nullable=False, default="default")
    line_spacing = Column(String(16), nullable=False, default="normal")
    dyslexia_friendly_font = Column(Boolean, nullable=False, default=False)
    preferred_language = Column(String(16), nullable=False, default="en")

    # Assistive tech
    screen_reader_enabled = Column(Boolean, nullable=False, default=False)
    text_to_speech_enabled = Column(Boolean, nullable=False, default=False)
    tts_language = Column(String(16), nullable=False, default="en-IN")
    captioning_enabled = Column(Boolean, nullable=False, default=False)
    captions_language = Column(String(16), nullable=False, default="en-IN")
    reduced_motion = Column(Boolean, nullable=False, default=False)
    keyboard_navigation = Column(Boolean, nullable=False, default=True)
    focus_indicators_enhanced = Column(Boolean, nullable=False, default=False)

    # Exam accommodations
    extra_time_percentage = Column(Integer, nullable=False, default=0)
    reader_assistant_allowed = Column(Boolean, nullable=False, default=False)
    calculator_allowed = Column(Boolean, nullable=False, default=False)
    scribe_allowed = Column(Boolean, nullable=False, default=False)
    break_time_allowed = Column(Boolean, nullable=False, default=False)
    large_print_required = Column(Boolean, nullable=False, default=False)

    def __repr__(self) -> str:  # pragma: no cover
        return f"<AccessibilityPreferences(student_id={self.student_id!r})>"
