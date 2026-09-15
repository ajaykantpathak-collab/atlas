"""
Accessibility Service — K-12 Learning Platform (CISCE/ICSE/ISC)
Handles accommodations for visual, hearing, motor, and cognitive disabilities.
All async. Pydantic v2. No Claude API.
"""

from __future__ import annotations

import enum
import hashlib
import logging
import random
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from backend.db_types import JSONVariant
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.sql import func

logger = logging.getLogger(__name__)


# ──────────────────────────────────────────────
# 1. DATABASE MODELS
# ──────────────────────────────────────────────

class Base(DeclarativeBase):
    pass


class DisabilityCategory(str, enum.Enum):
    VISUAL = "visual"
    HEARING = "hearing"
    MOTOR = "motor"
    COGNITIVE = "cognitive"
    MULTIPLE = "multiple"
    NONE = "none"


class AccessibilityPreferenceDB(Base):
    """Persisted per-student accessibility settings."""

    __tablename__ = "accessibility_preferences"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    preferences_json: Mapped[dict] = mapped_column(JSONVariant(), nullable=False, default=dict)
    disability_categories: Mapped[list[str]] = mapped_column(JSONVariant(), default=list)
    auto_detected_flags: Mapped[list[str]] = mapped_column(JSONVariant(), default=list)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    __table_args__ = (
        UniqueConstraint("student_id", name="uq_accessibility_student"),
    )


class AccommodationTypeDB(Base):
    """Lookup table for exam-level accommodation definitions."""

    __tablename__ = "accommodation_types"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    code: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    label: Mapped[str] = mapped_column(String(128), nullable=False)
    category: Mapped[str] = mapped_column(String(32), nullable=False)
    applicable_disabilities: Mapped[list[str]] = mapped_column(JSONVariant(), default=list)
    exam_types_applicable: Mapped[list[str]] = mapped_column(JSONVariant(), default=list)
    requires_approval: Mapped[bool] = mapped_column(Boolean, default=False)
    max_duration_multiplier: Mapped[float] = mapped_column(Float, default=1.0)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


# ──────────────────────────────────────────────
# 2. PYDANTIC v2 SCHEMAS
# ──────────────────────────────────────────────

class ScreenReaderPrefs(BaseModel):
    """Screen-reader related settings."""
    model_config = ConfigDict(extra="forbid")

    enabled: bool = True
    verbosity: str = Field(default="normal", pattern="^(minimal|normal|verbose)$")
    announce_interactive_elements: bool = True
    aria_labels_enabled: bool = True
    live_region_announcements: bool = True
    reading_speed_wpm: int = Field(default=180, ge=80, le=400)


class VisualPrefs(BaseModel):
    """Visual impairment accommodations."""
    model_config = ConfigDict(extra="forbid")

    high_contrast_mode: bool = False
    high_contrast_theme: str = Field(
        default="yellow-black", pattern="^(yellow-black|white-black|black-yellow|blue-yellow)$"
    )
    large_text: bool = False
    text_scale: float = Field(default=1.0, ge=0.8, le=3.0)
    colorblind_mode: bool = False
    colorblind_type: str = Field(
        default="deuteranopia",
        pattern="^(protanopia|deuteranopia|tritanopia|monochromacy|none)$",
    )
    text_to_speech: bool = False
    tts_voice: str = "default"
    tts_rate: float = Field(default=1.0, ge=0.5, le=2.0)
    tts_language: str = "en-IN"
    magnifier_enabled: bool = False
    magnifier_level: float = Field(default=2.0, ge=1.5, le=8.0)
    reduce_motion: bool = False
    cursor_size: str = Field(default="medium", pattern="^(small|medium|large|extra-large)$")


class HearingPrefs(BaseModel):
    """Hearing impairment accommodations."""
    model_config = ConfigDict(extra="forbid")

    captions_enabled: bool = True
    caption_language: str = "en-IN"
    caption_size: str = Field(default="medium", pattern="^(small|medium|large|extra-large)$")
    caption_style: str = Field(
        default="standard",
        pattern="^(standard|high-contrast|large-text|monochrome)$",
    )
    visual_cues_enabled: bool = True
    visual_cue_intensity: str = Field(
        default="moderate", pattern="^(subtle|moderate|strong)$"
    )
    vibration_patterns: bool = True
    vibration_intensity: str = Field(
        default="medium", pattern="^(light|medium|strong)$"
    )
    sound_visualizer: bool = False
    frequency_filter_enabled: bool = False
    bell_alerts_enabled: bool = False
    sign_language_video_enabled: bool = False


class MotorPrefs(BaseModel):
    """Motor disability accommodations."""
    model_config = ConfigDict(extra="forbid")

    keyboard_navigation: bool = True
    keyboard_shortcuts_enabled: bool = True
    voice_control: bool = False
    voice_commands_language: str = "en-IN"
    large_touch_targets: bool = False
    touch_target_size: str = Field(
        default="large", pattern="^(medium|large|extra-large)$"
    )
    switch_access: bool = False
    switch_scan_speed_ms: int = Field(default=1000, ge=200, le=5000)
    switch_auto_advance: bool = False
    sticky_keys: bool = False
    slow_keys: bool = False
    slow_keys_delay_ms: int = Field(default=300, ge=100, le=1000)
    dwell_click_enabled: bool = False
    dwell_click_time_ms: int = Field(default=1200, ge=500, le=5000)
    auto_repeat_enabled: bool = False
    gesture_customization: bool = False
    pointer_assist: bool = False


class CognitivePrefs(BaseModel):
    """Cognitive / learning disability accommodations."""
    model_config = ConfigDict(extra="forbid")

    simplified_ui: bool = False
    reduced_distractions: bool = False
    focus_highlight: bool = True
    focus_highlight_color: str = "#FFD700"
    longer_timers: bool = True
    timer_extension_percent: int = Field(default=25, ge=0, le=100)
    dyslexia_friendly_font: str = Field(
        default="none",
        pattern="^(none|opendyslexic|lexend|atkinson-hyperlegible|comic-neue)$",
    )
    reading_guide: bool = False
    reading_guide_color: str = "#FFD700"
    text_spacing: float = Field(default=1.0, ge=1.0, le=2.5)
    line_height: float = Field(default=1.5, ge=1.0, le=3.0)
    highlight_current_line: bool = False
    chunked_content: bool = False
    chunk_size: str = Field(default="medium", pattern="^(small|medium|large)$")
    progress_indicators: bool = True
    adhd_friendly_mode: bool = False
    adhd_break_reminders: bool = False
    break_interval_minutes: int = Field(default=15, ge=5, le=60)
    word_definition_tooltips: bool = False
    avoid_auto_advance: bool = True
    exam_question_navigation_visible: bool = True


class AccessibilityPreferences(BaseModel):
    """Full set of accessibility preferences for a student."""
    model_config = ConfigDict(extra="forbid")

    student_id: str
    disability_categories: List[DisabilityCategory] = Field(default_factory=list)
    screen_reader: ScreenReaderPrefs = Field(default_factory=ScreenReaderPrefs)
    visual: VisualPrefs = Field(default_factory=VisualPrefs)
    hearing: HearingPrefs = Field(default_factory=HearingPrefs)
    motor: MotorPrefs = Field(default_factory=MotorPrefs)
    cognitive: CognitivePrefs = Field(default_factory=CognitivePrefs)
    updated_at: Optional[datetime] = None


class PreferencesUpdate(BaseModel):
    """Partial update — only send fields you want to change."""

    model_config = ConfigDict(extra="forbid")

    disability_categories: Optional[List[DisabilityCategory]] = None
    screen_reader: Optional[ScreenReaderPrefs] = None
    visual: Optional[VisualPrefs] = None
    hearing: Optional[HearingPrefs] = None
    motor: Optional[MotorPrefs] = None
    cognitive: Optional[CognitivePrefs] = None


class AdaptedContent(BaseModel):
    """Result of content adaptation."""
    model_config = ConfigDict(extra="forbid")

    original: str
    adapted: str
    adaptations_applied: List[str]
    tts_markup: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class AdaptedQuestion(BaseModel):
    """Result of question adaptation."""
    model_config = ConfigDict(extra="forbid")

    question_id: str
    original_text: str
    adapted_text: str
    adaptations_applied: List[str]
    alt_instructions: Optional[str] = None
    visual_aids: List[str] = Field(default_factory=list)
    extra_time_seconds: int = 0
    simplified_options: Optional[List[str]] = None
    tts_markup: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class AccommodationInfo(BaseModel):
    """A single accommodation type."""
    model_config = ConfigDict(extra="forbid")

    code: str
    label: str
    category: str
    applicable_disabilities: List[str]
    exam_types_applicable: List[str]
    requires_approval: bool
    max_duration_multiplier: float
    description: Optional[str] = None


class AutoDetectionResult(BaseModel):
    """Result of auto-detecting accessibility needs."""
    model_config = ConfigDict(extra="forbid")

    student_id: str
    suggested_categories: List[str]
    suggested_prefs: Dict[str, Any]
    confidence: str = Field(pattern="^(low|medium|high)$")
    signals: Dict[str, Any] = Field(default_factory=dict)


# ──────────────────────────────────────────────
# 3. CONTENT ADAPTER
# ──────────────────────────────────────────────

class ContentAdapter:
    """Transforms content based on accessibility preferences."""

    # ── Colorblind-safe palettes (WCAG 2.1 compliant) ──────────────
    COLORBLIND_PALETTES: Dict[str, Dict[str, str]] = {
        "protanopia": {
            "primary": "#1f77b4",
            "secondary": "#ff7f0e",
            "success": "#2ca02c",
            "warning": "#ffbb78",
            "danger": "#d62728",
            "info": "#17becf",
            "background": "#FFFFFF",
            "text": "#1A1A2E",
            "border": "#4C4C6D",
        },
        "deuteranopia": {
            "primary": "#0072B2",
            "secondary": "#E69F00",
            "success": "#009E73",
            "warning": "#F0E442",
            "danger": "#D55E00",
            "info": "#56B4E9",
            "background": "#FFFFFF",
            "text": "#1A1A2E",
            "border": "#4C4C6D",
        },
        "tritanopia": {
            "primary": "#CC3311",
            "secondary": "#0077BB",
            "success": "#009988",
            "warning": "#EE7733",
            "danger": "#EE3377",
            "info": "#33BBEE",
            "background": "#FFFFFF",
            "text": "#1A1A2E",
            "border": "#4C4C6D",
        },
        "monochromacy": {
            "primary": "#000000",
            "secondary": "#555555",
            "success": "#2A2A2A",
            "warning": "#7A7A7A",
            "danger": "#3A3A3A",
            "info": "#1A1A1A",
            "background": "#FFFFFF",
            "text": "#000000",
            "border": "#444444",
        },
    }

    # ── High-contrast themes ────────────────────────────────────────
    HIGH_CONTRAST_THEMES: Dict[str, Dict[str, str]] = {
        "yellow-black": {"bg": "#000000", "fg": "#FFD700", "accent": "#FFFF00"},
        "white-black": {"bg": "#FFFFFF", "fg": "#000000", "accent": "#1A1A1A"},
        "black-yellow": {"bg": "#FFD700", "fg": "#000000", "accent": "#000000"},
        "blue-yellow": {"bg": "#00008B", "fg": "#FFFF00", "accent": "#FFFF00"},
    }

    # ── Dyslexia-friendly font CSS ─────────────────────────────────
    DYSLEXIA_FONT_MAP: Dict[str, str] = {
        "opendyslexic": "OpenDyslexic, sans-serif",
        "lexend": "Lexend, sans-serif",
        "atkinson-hyperlegible": "Atkinson Hyperlegible, sans-serif",
        "comic-neue": "'Comic Neue', cursive",
    }

    # ── Vibrations for sound cues (pattern: on_ms, off_ms x repeats) ─
    VIBRATION_PATTERNS: Dict[str, List[tuple[int, int]]] = {
        "success": [(100, 50), (100, 0)],
        "error": [(200, 100), (200, 100), (200, 0)],
        "warning": [(150, 80), (150, 0)],
        "info": [(80, 40), (80, 0)],
        "timer_reminder": [(100, 50), (100, 50), (100, 0)],
        "question_change": [(60, 30), (60, 0)],
        "exam_start": [(100, 100), (100, 100), (100, 100), (200, 0)],
        "exam_end": [(300, 100), (300, 0)],
    }

    # ── Keyboard shortcut defaults ─────────────────────────────────
    KEYBOARD_SHORTCUTS: Dict[str, str] = {
        "next_question": "ArrowRight",
        "previous_question": "ArrowLeft",
        "submit_answer": "Enter",
        "toggle_tts": "Alt+T",
        "toggle_high_contrast": "Alt+H",
        "toggle_large_text": "Alt+L",
        "toggle_captions": "Alt+C",
        "toggle_simplified_ui": "Alt+S",
        "go_to_question": "Ctrl+Shift+G",
        "bookmark_question": "Ctrl+B",
        "start_exam": "Ctrl+Enter",
        "read_question_aloud": "Alt+R",
        "increase_text_size": "Ctrl+Plus",
        "decrease_text_size": "Ctrl+Minus",
    }

    @staticmethod
    def _safe_text(text: str) -> str:
        """Basic HTML-escaping for safe insertion into markup."""
        return (
            text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
        )

    @classmethod
    def adapt_content(cls, content: str, prefs: AccessibilityPreferences) -> AdaptedContent:
        """Apply all relevant adaptations to a content string.

        Args:
            content: Raw HTML/markdown content string.
            prefs: Student's accessibility preferences.

        Returns:
            AdaptedContent with adapted text, applied adaptations, and optional TTS markup.
        """
        applied: List[str] = []
        result = content
        tts_markup: str | None = None

        # ── Dyslexia font ────────────────────────────────────────────
        if prefs.cognitive.dyslexia_friendly_font != "none":
            font_css = cls.DYSLEXIA_FONT_MAP[prefs.cognitive.dyslexia_friendly_font]
            result = f'<div style="font-family:{font_css};">{result}</div>'
            applied.append(f"font:{prefs.cognitive.dyslexia_friendly_font}")

        # ── Text spacing ─────────────────────────────────────────────
        if prefs.cognitive.text_spacing > 1.0:
            result = (
                f'<div style="letter-spacing:{prefs.cognitive.text_spacing * 0.05}em;'
                f'line-height:{prefs.cognitive.line_height};">{result}</div>'
            )
            applied.append("text_spacing")

        # ── Chunked content ──────────────────────────────────────────
        if prefs.cognitive.chunked_content:
            chunk_size = cls._chunk_size_words(prefs.cognitive.chunk_size)
            result = cls._chunk_html(result, chunk_size)
            applied.append("chunked_content")

        # ── Highlight current line (for reading) ─────────────────────
        if prefs.cognitive.highlight_current_line:
            result = cls._wrap_lines_with_highlight(result)
            applied.append("line_highlight")

        # ── Screen reader TTS markup ─────────────────────────────────
        if prefs.screen_reader.enabled or prefs.visual.text_to_speech:
            safe = cls._safe_text(content)
            tts_markup = f'<span aria-live="polite" aria-atomic="true">{safe}</span>'
            applied.append("tts_markup")

        # ── Visual cues metadata for hearing impaired ────────────────
        visual_cue_meta: Dict[str, Any] = {}
        if prefs.hearing.visual_cues_enabled:
            visual_cue_meta["vibration_patterns"] = cls.VIBRATION_PATTERNS
            visual_cue_meta["visual_cue_intensity"] = prefs.hearing.visual_cue_intensity
            applied.append("visual_cues_metadata")

        return AdaptedContent(
            original=content,
            adapted=result,
            adaptations_applied=applied,
            tts_markup=tts_markup,
            metadata=visual_cue_meta,
        )

    @classmethod
    def adapt_question(
        cls, question: Dict[str, Any], prefs: AccessibilityPreferences
    ) -> AdaptedQuestion:
        """Adapt an exam question for the student's accessibility needs.

        Args:
            question: Dict with keys like question_id, text, options, type, etc.
            prefs: Student preferences.

        Returns:
            AdaptedQuestion with all adaptations applied.
        """
        applied: List[str] = []
        question_id = question.get("question_id", "unknown")
        original_text = question.get("text", "")
        adapted_text = original_text
        visual_aids: List[str] = []
        extra_time = 0
        simplified: Optional[List[str]] = None
        tts_markup: str | None = None
        alt_instructions: Optional[str] = None

        # ── Longer timers ────────────────────────────────────────────
        if prefs.cognitive.longer_timers:
            base_seconds = question.get("time_limit_seconds", 60)
            extra_time = int(base_seconds * (prefs.cognitive.timer_extension_percent / 100))
            applied.append(f"extra_time:{extra_time}s")

        # ── Dyslexia font + spacing ──────────────────────────────────
        if prefs.cognitive.dyslexia_friendly_font != "none":
            font_css = cls.DYSLEXIA_FONT_MAP[prefs.cognitive.dyslexia_friendly_font]
            adapted_text = (
                f'<div style="font-family:{font_css};'
                f'letter-spacing:{prefs.cognitive.text_spacing * 0.05}em;'
                f'line-height:{prefs.cognitive.line_height};">{adapted_text}</div>'
            )
            applied.append(f"font:{prefs.cognitive.dyslexia_friendly_font}")

        # ── Simplify options for cognitive disabilities ──────────────
        options = question.get("options", [])
        if prefs.cognitive.simplified_ui and options:
            simplified = cls._simplify_options(options)
            applied.append("simplified_options")

        # ── Large text ───────────────────────────────────────────────
        if prefs.visual.large_text:
            scale = prefs.visual.text_scale
            adapted_text = f'<div style="font-size:{scale * 100}%;">{adapted_text}</div>'
            applied.append(f"text_scale:{scale}x")

        # ── High contrast ────────────────────────────────────────────
        if prefs.visual.high_contrast_mode:
            theme = cls.HIGH_CONTRAST_THEMES[prefs.visual.high_contrast_theme]
            adapted_text = (
                f'<div style="background:{theme["bg"]};color:{theme["fg"]};'
                f'padding:12px;border:2px solid {theme["fg"]};border-radius:4px;">'
                f'{adapted_text}</div>'
            )
            applied.append(f"high_contrast:{prefs.visual.high_contrast_theme}")

        # ── Colorblind palette ────────────────────────────────────────
        if prefs.visual.colorblind_mode:
            palette = cls.COLORBLIND_PALETTES[prefs.visual.colorblind_type]
            visual_aids.append(f"colorblind_palette:{prefs.visual.colorblind_type}")
            applied.append("colorblind_safe")

        # ── Text-to-speech markup ────────────────────────────────────
        if prefs.screen_reader.enabled or prefs.visual.text_to_speech:
            safe = cls._safe_text(original_text)
            tts_markup = (
                f'<span aria-live="assertive" aria-label="{safe}" '
                f'role="text">{safe}</span>'
            )
            applied.append("tts_markup")

        # ── Alt instructions for question ────────────────────────────
        if prefs.cognitive.reading_guide:
            alt_instructions = cls._generate_alt_instructions(question)
            applied.append("alt_instructions")

        # ── Motor: keyboard navigation hint ──────────────────────────
        if prefs.motor.keyboard_navigation:
            visual_aids.append("keyboard_focus_ring")
            applied.append("keyboard_navigation")

        # ── ADHD: progress + avoid auto-advance ──────────────────────
        if prefs.cognitive.adhd_friendly_mode:
            visual_aids.append("progress_bar")
            visual_aids.append("question_counter")
            applied.append("adhd_mode")
            # Force avoid auto-advance
            alt_instructions = (
                alt_instructions or ""
            ) + " Stay on this question until you are ready. "
            "Use arrow keys to navigate. You control the pace."

        return AdaptedQuestion(
            question_id=question_id,
            original_text=original_text,
            adapted_text=adapted_text,
            adaptations_applied=applied,
            alt_instructions=alt_instructions.strip() if alt_instructions else None,
            visual_aids=visual_aids,
            extra_time_seconds=extra_time,
            simplified_options=simplified,
            tts_markup=tts_markup,
            metadata={
                "extra_time_seconds": extra_time,
                "font_applied": prefs.cognitive.dyslexia_friendly_font,
                "colorblind_mode": prefs.visual.colorblind_mode,
                "adhd_mode": prefs.cognitive.adhd_friendly_mode,
            },
        )

    # ── Helpers ────────────────────────────────────────────────────

    @staticmethod
    def _chunk_size_words(chunk_size: str) -> int:
        return {"small": 20, "medium": 40, "large": 80}[chunk_size]

    @staticmethod
    def _chunk_html(html: str, words_per_chunk: int) -> str:
        """Break long paragraphs into collapsible chunks."""
        import re
        parts = re.split(r"(</p>|</div>)", html)
        result: List[str] = []
        for part in parts:
            if part.lower().startswith("<p") or part.lower().startswith("<div"):
                result.append(part)
            elif part.lower() == "</p>" or part.lower() == "</div>":
                word_count = len(result[-1].split()) if result else 0
                if word_count > words_per_chunk:
                    result[-1] += (
                        f'<details><summary>Read more ({word_count} words)</summary>'
                        f'{result[-1]}</details>'
                    )
                result.append(part)
            else:
                result.append(part)
        return "".join(result)

    @staticmethod
    def _wrap_lines_with_highlight(html: str) -> str:
        """Wrap each line with a span for focus highlighting."""
        return f'<div class="line-highlight" style="line-height:2em;">{html}</div>'

    @staticmethod
    def _simplify_options(options: List[Any]) -> List[str]:
        """Reduce option text length for cognitive accessibility."""
        if isinstance(options[0], dict):
            return [opt.get("text", str(opt))[:80] for opt in options]
        return [str(opt)[:80] for opt in options]

    @staticmethod
    def _generate_alt_instructions(question: Dict[str, Any]) -> str:
        """Generate simplified alternative instructions."""
        q_type = question.get("type", "unknown")
        instructions = {
            "mcq": "Choose the best answer from the options below.",
            "true_false": "Select whether the statement is True or False.",
            "fill_blank": "Fill in the missing word or words in the blank.",
            "essay": "Write your answer in the space provided. Take your time.",
            "match": "Match the items from the left column to the right column.",
            "numerical": "Enter the numerical answer. Show your working if possible.",
        }
        return instructions.get(q_type, "Answer the question as instructed.")


# ──────────────────────────────────────────────
# 4. AUTO-DETECTOR
# ──────────────────────────────────────────────

class AutoDetector:
    """Analyzes usage signals to suggest accessibility preferences."""

    @staticmethod
    async def detect(
        student_id: str,
        session: AsyncSession,
    ) -> AutoDetectionResult:
        """Analyze historical signals and suggest accommodations.

        Currently uses heuristics on stored usage events.
        In production, replace with real analytics queries.
        """
        from sqlalchemy import select

        from services import models  # noqa: F401 — ensure models loaded

        # ── Fetch existing preferences & signals ─────────────────────
        result = await session.execute(
            select(AccessibilityPreferenceDB).where(
                AccessibilityPreferenceDB.student_id == student_id
            )
        )
        row = result.scalar_one_or_none()

        signals: Dict[str, Any] = {}
        suggested_categories: List[str] = []
        suggested_prefs: Dict[str, Any] = {}

        if row:
            existing = row.preferences_json or {}
            auto_flags = row.auto_detected_flags or []
            signals = {
                "existing_auto_flags": auto_flags,
                "preferences_count": len(existing),
            }
        else:
            signals = {"existing_auto_flags": [], "preferences_count": 0}

        # ── Heuristic: voice control usage → suggest motor aid ───────
        # (In production: query a usage_events table)
        voice_usage_count = signals.get("voice_command_count", 0)
        if voice_usage_count > 10:
            suggested_categories.append("motor")
            suggested_prefs["motor"] = {"voice_control": True, "large_touch_targets": True}
            signals["motor_signal"] = f"voice_commands_used:{voice_usage_count}"

        # ── Heuristic: frequent zoom requests → visual impairment ────
        zoom_requests = signals.get("zoom_count", 0)
        if zoom_requests > 5:
            suggested_categories.append("visual")
            suggested_prefs["visual"] = {
                "large_text": True,
                "text_scale": 1.3,
                "magnifier_enabled": True,
            }
            signals["visual_signal"] = f"zoom_requests:{zoom_requests}"

        # ── Heuristic: exam retakes with timing issues → cognitive ───
        exam_retakes = signals.get("exam_retake_count", 0)
        timing_issues = signals.get("timing_flag_count", 0)
        if exam_retakes > 2 or timing_issues > 3:
            suggested_categories.append("cognitive")
            suggested_prefs["cognitive"] = {
                "longer_timers": True,
                "timer_extension_percent": 50,
                "reading_guide": True,
                "adhd_friendly_mode": True,
            }
            signals["cognitive_signal"] = (
                f"retakes:{exam_retakes},timing_issues:{timing_issues}"
            )

        # ── Heuristic: caption toggle frequency → hearing ────────────
        caption_toggles = signals.get("caption_toggle_count", 0)
        if caption_toggles > 8:
            suggested_categories.append("hearing")
            suggested_prefs["hearing"] = {
                "captions_enabled": True,
                "visual_cues_enabled": True,
                "vibration_patterns": True,
            }
            signals["hearing_signal"] = f"caption_toggles:{caption_toggles}"

        confidence = "low"
        if len(suggested_categories) >= 3:
            confidence = "high"
        elif len(suggested_categories) >= 1:
            confidence = "medium"

        return AutoDetectionResult(
            student_id=student_id,
            suggested_categories=suggested_categories or ["none"],
            suggested_prefs=suggested_prefs,
            confidence=confidence,
            signals=signals,
        )


# ──────────────────────────────────────────────
# 5. TTS ENGINE (no external API)
# ──────────────────────────────────────────────

class TTSEngine:
    """Offline-friendly text-to-speech wrapper.

    Prefers pyttsx3 for offline use; falls back to a markup-only mode
    that emits SSML-compatible markup consumed by a frontend TTS engine.
    """

    def __init__(self) -> None:
        self._engine = None
        self._use_offline = False

    def _ensure_engine(self) -> None:
        if self._engine is None and not self._use_offline:
            try:
                import pyttsx3  # type: ignore

                self._engine = pyttsx3.init()
                self._engine.setProperty("rate", 180)
            except ImportError:
                logger.info(
                    "pyttsx3 not installed — TTS will produce markup only."
                )
                self._use_offline = True

    async def speak(
        self,
        text: str,
        rate: float = 1.0,
        voice: str = "default",
        language: str = "en-IN",
    ) -> str:
        """Speak text. Returns SSML markup string for frontend use.

        In a deployment with pyttsx3, also speaks offline.
        """
        self._ensure_engine()

        if self._engine and not self._use_offline:
            try:
                self._engine.setProperty("rate", int(180 * rate))
                self._engine.say(text)
                self._engine.runAndWait()
            except Exception as exc:
                logger.warning("pyttsx3 TTS failed: %s — falling back to markup", exc)
                self._use_offline = True

        # Always return markup for frontend consumption
        safe = ContentAdapter._safe_text(text)
        return (
            f'<speak xmlns="http://www.w3.org/2001/10/synthesis" '
            f'xml:lang="{language}">'
            f'<voice name="{voice}">{safe}</voice>'
            f'</speak>'
        )

    async def stop(self) -> None:
        if self._engine:
            try:
                self._engine.stop()
            except Exception:
                pass


# ──────────────────────────────────────────────
# 6. KEYBOARD NAVIGATION BUILDER
# ──────────────────────────────────────────────

class KeyboardNavBuilder:
    """Builds keyboard-navigation-friendly HTML attributes."""

    SHORTCUTS = ContentAdapter.KEYBOARD_SHORTCUTS

    @classmethod
    def build_nav_attrs(cls, element_id: str, element_type: str) -> Dict[str, str]:
        """Return a dict of HTML attributes for keyboard accessibility."""
        attrs: Dict[str, str] = {
            "tabindex": "0",
            "role": element_type,
            "aria-roledescription": f"Interactive {element_type}",
            "data-nav-id": element_id,
        }

        # Focus indicator for motor-impaired users
        attrs["style"] = (
            "outline: 3px solid #2563EB; "
            "outline-offset: 2px; "
            "border-radius: 4px;"
        )

        # Skip link hint
        attrs["aria-describedby"] = f"nav-hint-{element_id}"

        return attrs

    @classmethod
    def get_shortcuts_help(cls) -> Dict[str, str]:
        return dict(cls.SHORTCUTS)

    @classmethod
    def build_shortcuts_markup(cls) -> str:
        rows = "".join(
            f'<tr><td><kbd>{k}</kbd></td><td>{v}</td></tr>'
            for k, v in cls.SHORTCUTS.items()
        )
        return f"<table>{rows}</table>"


# ──────────────────────────────────────────────
# 7. MAIN SERVICE
# ──────────────────────────────────────────────

class AccessibilityService:
    """Primary service class — async, DB-backed."""

    def __init__(self, session_factory):
        self._session_factory = session_factory
        self._adapter = ContentAdapter()
        self._detector = AutoDetector()
        self._tts = TTSEngine()
        self._nav_builder = KeyboardNavBuilder()

    # ── Helpers ────────────────────────────────────────────────────

    async def _get_session(self) -> AsyncSession:
        return self._session_factory()

    @staticmethod
    def _prefs_to_json(prefs: AccessibilityPreferences) -> dict:
        return prefs.model_dump(mode="json")

    @staticmethod
    def _json_to_prefs(data: dict) -> AccessibilityPreferences:
        return AccessibilityPreferences(**data)

    # ── Public API ─────────────────────────────────────────────────

    async def get_preferences(
        self, student_id: str
    ) -> Optional[AccessibilityPreferences]:
        """Fetch stored accessibility preferences for a student.

        Returns None if no preferences are stored yet.
        """
        session = await self._get_session()
        try:
            result = await session.execute(
                select(AccessibilityPreferenceDB).where(
                    AccessibilityPreferenceDB.student_id == student_id
                )
            )
            row = result.scalar_one_or_none()
            if row is None:
                return None
            return self._json_to_prefs(row.preferences_json)
        finally:
            await session.close()

    async def set_preferences(
        self,
        student_id: str,
        prefs: PreferencesUpdate,
    ) -> AccessibilityPreferences:
        """Save (partial) accessibility preferences for a student.

        Merges the update with existing preferences if present,
        otherwise creates defaults and applies the update.
        """
        session = await self._get_session()
        try:
            result = await session.execute(
                select(AccessibilityPreferenceDB).where(
                    AccessibilityPreferenceDB.student_id == student_id
                )
            )
            row = result.scalar_one_or_none()

            now = datetime.now(timezone.utc)

            if row is None:
                # Create defaults then merge
                default_prefs = AccessibilityPreferences(student_id=student_id)
                merged = self._apply_update(default_prefs, prefs)
                merged.updated_at = now
                row = AccessibilityPreferenceDB(
                    student_id=student_id,
                    preferences_json=self._prefs_to_json(merged),
                    disability_categories=[c.value for c in merged.disability_categories],
                    auto_detected_flags=[],
                    created_at=now,
                    updated_at=now,
                )
                session.add(row)
            else:
                existing = self._json_to_prefs(row.preferences_json)
                merged = self._apply_update(existing, prefs)
                merged.updated_at = now
                row.preferences_json = self._prefs_to_json(merged)
                row.disability_categories = [c.value for c in merged.disability_categories]
                row.updated_at = now

            await session.commit()
            await session.refresh(row)
            return self._json_to_prefs(row.preferences_json)
        finally:
            await session.close()

    async def adapt_content(
        self, content: str, student_id: str
    ) -> AdaptedContent:
        """Convenience: look up prefs and adapt content."""
        prefs = await self.get_preferences(student_id)
        if prefs is None:
            prefs = AccessibilityPreferences(student_id=student_id)
        return self._adapter.adapt_content(content, prefs)

    async def adapt_question(
        self, question: Dict[str, Any], student_id: str
    ) -> AdaptedQuestion:
        """Convenience: look up prefs and adapt a question."""
        prefs = await self.get_preferences(student_id)
        if prefs is None:
            prefs = AccessibilityPreferences(student_id=student_id)
        return self._adapter.adapt_question(question, prefs)

    async def get_accommodations(
        self, exam_type: str
    ) -> List[AccommodationInfo]:
        """Return all active accommodations allowed for a given exam type.

        Args:
            exam_type: e.g. "icse_x", "isc_xii", "midsemester", etc.
        """
        session = await self._get_session()
        try:
            result = await session.execute(
                select(AccommodationTypeDB).where(
                    AccommodationTypeDB.is_active == True,
                    AccommodationTypeDB.exam_types_applicable.contains([exam_type]),
                )
            )
            rows = result.scalars().all()
            return [
                AccommodationInfo(
                    code=row.code,
                    label=row.label,
                    category=row.category,
                    applicable_disabilities=row.applicable_disabilities,
                    exam_types_applicable=row.exam_types_applicable,
                    requires_approval=row.requires_approval,
                    max_duration_multiplier=row.max_duration_multiplier,
                    description=row.description,
                )
                for row in rows
            ]
        finally:
            await session.close()

    async def auto_detect(
        self, student_id: str
    ) -> AutoDetectionResult:
        """Run auto-detection and return suggestions.

        Does NOT persist — call set_preferences() to apply.
        """
        return await self._detector.detect(student_id, await self._get_session())

    async def speak(
        self,
        text: str,
        student_id: str,
    ) -> str:
        """Speak text using the student's TTS preferences.

        Returns SSML markup string.
        """
        prefs = await self.get_preferences(student_id)
        tts_prefs = prefs.visual if prefs else None
        rate = tts_prefs.tts_rate if tts_prefs else 1.0
        voice = tts_prefs.tts_voice if tts_prefs else "default"
        lang = tts_prefs.tts_language if tts_prefs else "en-IN"
        return await self._tts.speak(text, rate=rate, voice=voice, language=lang)

    async def get_vibration_pattern(self, cue_type: str) -> List[tuple[int, int]]:
        """Return vibration pattern for a given cue type."""
        return self._adapter.VIBRATION_PATTERNS.get(
            cue_type, [(100, 100), (100, 0)]
        )

    async def get_keyboard_shortcuts(self) -> Dict[str, str]:
        """Return all registered keyboard shortcut mappings."""
        return self._nav_builder.get_shortcuts_help()

    # ── Static utility ─────────────────────────────────────────────

    @staticmethod
    def _apply_update(
        existing: AccessibilityPreferences,
        update: PreferencesUpdate,
    ) -> AccessibilityPreferences:
        """Deep-merge a partial update into existing prefs."""
        update_data = update.model_dump(exclude_unset=True)

        if "disability_categories" in update_data:
            existing.disability_categories = [
                DisabilityCategory(c) for c in update_data["disability_categories"]
            ]
        if "screen_reader" in update_data and update_data["screen_reader"]:
            merged = existing.screen_reader.model_dump()
            merged.update(update_data["screen_reader"])
            existing.screen_reader = ScreenReaderPrefs(**merged)
        if "visual" in update_data and update_data["visual"]:
            merged = existing.visual.model_dump()
            merged.update(update_data["visual"])
            existing.visual = VisualPrefs(**merged)
        if "hearing" in update_data and update_data["hearing"]:
            merged = existing.hearing.model_dump()
            merged.update(update_data["hearing"])
            existing.hearing = HearingPrefs(**merged)
        if "motor" in update_data and update_data["motor"]:
            merged = existing.motor.model_dump()
            merged.update(update_data["motor"])
            existing.motor = MotorPrefs(**merged)
        if "cognitive" in update_data and update_data["cognitive"]:
            merged = existing.cognitive.model_dump()
            merged.update(update_data["cognitive"])
            existing.cognitive = CognitivePrefs(**merged)

        return existing


# ──────────────────────────────────────────────
# 8. SEED DATA
# ──────────────────────────────────────────────

DEFAULT_ACCOMMODATIONS: List[dict] = [
    {
        "code": "extra_time_25",
        "label": "25% Extra Time",
        "category": "timing",
        "applicable_disabilities": ["cognitive", "motor"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.25,
        "description": "25 percent additional time for completing the exam.",
    },
    {
        "code": "extra_time_50",
        "label": "50% Extra Time",
        "category": "timing",
        "applicable_disabilities": ["cognitive", "visual", "motor"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.50,
        "description": "50 percent additional time for completing the exam.",
    },
    {
        "code": "scribe_assistance",
        "label": "Scribe / Amanuensis",
        "category": "writing",
        "applicable_disabilities": ["visual", "motor"],
        "exam_types_applicable": ["icse_x", "isc_xii"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "A scribe writes responses as dictated by the student.",
    },
    {
        "code": "laptop_use",
        "label": "Laptop Use (with assistive software)",
        "category": "equipment",
        "applicable_disabilities": ["motor", "visual", "cognitive"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "Use a personal laptop with JAWS/NVDA or other assistive tech.",
    },
    {
        "code": "oral_exam",
        "label": "Oral Exam / Viva",
        "category": "format",
        "applicable_disabilities": ["visual", "motor"],
        "exam_types_applicable": ["icse_x", "isc_xii"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "Exam administered orally with responses recorded by examiner.",
    },
    {
        "code": "large_print_paper",
        "label": "Large Print Question Paper",
        "category": "format",
        "applicable_disabilities": ["visual"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": False,
        "max_duration_multiplier": 1.0,
        "description": "Question paper printed in 18pt or larger font.",
    },
    {
        "code": "braille_paper",
        "label": "Braille Question Paper",
        "category": "format",
        "applicable_disabilities": ["visual"],
        "exam_types_applicable": ["icse_x", "isc_xii"],
        "requires_approval": True,
        "max_duration_multiplier": 1.25,
        "description": "Question paper transcribed in Braille.",
    },
    {
        "code": "deaf_aware_invigilator",
        "label": "Deaf-Aware Invigilator",
        "category": "support",
        "applicable_disabilities": ["hearing"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": False,
        "max_duration_multiplier": 1.0,
        "description": "Invigilator trained in deaf awareness for clear communication.",
    },
    {
        "code": "rest_breaks",
        "label": "Rest Breaks",
        "category": "timing",
        "applicable_disabilities": ["motor", "cognitive", "multiple"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.5,
        "description": "Extra rest breaks that do not count toward exam time.",
    },
    {
        "code": "reader_only",
        "label": "Reader Only (human or digital)",
        "category": "support",
        "applicable_disabilities": ["visual", "dyslexia"],
        "exam_types_applicable": ["icse_x", "isc_xii"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "A reader reads the exam paper aloud; no explanation given.",
    },
    {
        "code": "supervised_breaks",
        "label": "Supervised Breaks",
        "category": "support",
        "applicable_disabilities": ["adhd", "cognitive"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "Short supervised breaks allowed during exam.",
    },
    {
        "code": "separate_room",
        "label": "Separate Exam Room",
        "category": "environment",
        "applicable_disabilities": ["adhd", "autism", "motor", "multiple"],
        "exam_types_applicable": ["icse_x", "isc_xii", "midsemester"],
        "requires_approval": True,
        "max_duration_multiplier": 1.0,
        "description": "Quiet room with minimal distractions.",
    },
]


async def seed_accommodations(session: AsyncSession) -> None:
    """Idempotently insert default accommodation types."""
    from sqlalchemy import select

    for acc in DEFAULT_ACCOMMODATIONS:
        existing = await session.execute(
            select(AccommodationTypeDB).where(
                AccommodationTypeDB.code == acc["code"]
            )
        )
        if existing.scalar_one_or_none() is None:
            session.add(AccommodationTypeDB(**acc))
    await session.commit()