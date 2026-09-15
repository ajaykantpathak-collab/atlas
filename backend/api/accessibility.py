"""
Accessibility API Router
Handles student accessibility preferences, content adaptation,
and exam accommodation lookups for ICSE/ISC/CBSE boards.
"""

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator, model_validator

# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class FontSize(str, Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    EXTRA_LARGE = "extra_large"

class ColorTheme(str, Enum):
    DEFAULT = "default"
    HIGH_CONTRAST = "high_contrast"
    DARK_MODE = "dark_mode"
    COLOR_BLIND_FRIENDLY = "color_blind_friendly"
    SEPIA = "sepiadark"

class ContentType(str, Enum):
    TEXT = "text"
    MATH = "math"
    SCIENCE = "science"
    SOCIAL_STUDIES = "social_studies"
    LANGUAGE = "language"

class ExamType(str, Enum):
    ICSE = "ICSE"
    ISC = "ISC"
    CBSE = "CBSE"
    NEET = "NEET"
    JEE_MAIN = "JEE_MAIN"
    JEE_ADVANCED = "JEE_ADVANCED"
    STATE_BOARD = "STATE_BOARD"

class AccommodationCategory(str, Enum):
    EXTRA_TIME = "extra_time"
    READER = "reader"
    SCRIBE = "scribe"
    CALCULATOR = "calculator"
    BREAK_TIME = "break_time"
    LARGE_PRINT = "large_print"
    BRAILLE = "braille"
    SIGN_LANGUAGE = "sign_language"
    COMPENSATORY_TIME = "compensatory_time"

# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------

class AccessibilityPreferences(BaseModel):
    """Full accessibility preference set for a student."""

    student_id: str = Field(..., min_length=1, max_length=64,
                            description="Unique student identifier")
    font_size: FontSize = Field(default=FontSize.MEDIUM,
                                description="Preferred font size tier")
    color_theme: ColorTheme = Field(default=ColorTheme.DEFAULT,
                                    description="Active color / contrast theme")
    screen_reader_enabled: bool = Field(default=False)
    text_to_speech_enabled: bool = Field(default=False)
    tts_language: str = Field(default="en-IN", pattern=r"^[a-z]{2}-[A-Z]{2}$",
                              description="BCP-47 locale, e.g. en-IN, hi-IN")
    reduced_motion: bool = Field(default=False)
    keyboard_navigation: bool = Field(default=True)
    focus_indicators_enhanced: bool = Field(default=False)
    line_spacing: Literal["normal", "wide", "extra_wide"] = Field(default="normal")
    dyslexia_friendly_font: bool = Field(default=False)
    captioning_enabled: bool = Field(default=False)
    captions_language: str = Field(default="en-IN")
    extra_time_percentage: int = Field(
        default=0,
        ge=0,
        le=100,
        description="Extra time multiplier percentage (0-100)"
    )
    reader_assistant_allowed: bool = Field(default=False)
    calculator_allowed: bool = Field(default=False)
    scribe_allowed: bool = Field(default=False)
    break_time_allowed: bool = Field(default=False)
    large_print_required: bool = Field(default=False)
    preferred_language: str = Field(default="en",
                                    description="Primary instruction language code")
    created_at: datetime | None = Field(default=None)
    updated_at: datetime | None = Field(default=None)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "student_id": "STU-2024-0042",
                    "font_size": "large",
                    "color_theme": "high_contrast",
                    "screen_reader_enabled": True,
                    "extra_time_percentage": 25,
                    "reader_assistant_allowed": True,
                    "dyslexia_friendly_font": True
                }
            ]
        }
    }


class AccessibilityPreferencesUpdate(BaseModel):
    """Partial update payload — all fields optional."""

    font_size: FontSize | None = None
    color_theme: ColorTheme | None = None
    screen_reader_enabled: bool | None = None
    text_to_speech_enabled: bool | None = None
    tts_language: str | None = Field(default=None, pattern=r"^[a-z]{2}-[A-Z]{2}$")
    reduced_motion: bool | None = None
    keyboard_navigation: bool | None = None
    focus_indicators_enhanced: bool | None = None
    line_spacing: Literal["normal", "wide", "extra_wide"] | None = None
    dyslexia_friendly_font: bool | None = None
    captioning_enabled: bool | None = None
    captions_language: str | None = None
    extra_time_percentage: int | None = Field(default=None, ge=0, le=100)
    reader_assistant_allowed: bool | None = None
    calculator_allowed: bool | None = None
    scribe_allowed: bool | None = None
    break_time_allowed: bool | None = None
    large_print_required: bool | None = None
    preferred_language: str | None = None

    @model_validator(mode="after")
    def at_least_one_field(self) -> "AccessibilityPreferencesUpdate":
        if all(v is None for v in self.__dict__.values()):
            raise ValueError("At least one field must be provided for update")
        return self


class AdaptContentRequest(BaseModel):
    """Request to transform raw content for accessibility."""

    content: str = Field(..., min_length=1,
                         description="Raw content text to adapt")
    content_type: ContentType = Field(default=ContentType.TEXT)
    preferences: AccessibilityPreferences = Field(
        ...,
        description="Inline preferences driving the adaptation"
    )
    grade_level: int | None = Field(
        default=None,
        ge=1,
        le=12,
        description="Target grade (1-12) for vocabulary adjustment"
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "content": "The mitochondrion is the powerhouse of the cell.",
                    "content_type": "science",
                    "grade_level": 8,
                    "preferences": {
                        "font_size": "large",
                        "dyslexia_friendly_font": True,
                        "line_spacing": "wide",
                        "screen_reader_enabled": True
                    }
                }
            ]
        }
    }


class AdaptedContentResponse(BaseModel):
    """Result of content adaptation."""

    original_content: str
    adapted_content: str
    content_type: ContentType
    transformations_applied: list[str]
    accessibility_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Accessibility score 0-100"
    )
    warnings: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)


class Accommodation(BaseModel):
    """A single allowed accommodation for an exam type."""

    id: str
    category: AccommodationCategory
    name: str
    description: str
    eligibility_criteria: list[str] = Field(default_factory=list)
    max_extra_time_percentage: int = Field(default=0, ge=0, le=100)
    requires_certificate: bool = Field(default=True)
    notes: str | None = None


class AccommodationListResponse(BaseModel):
    """Response for allowed accommodations of a given exam type."""

    exam_type: ExamType
    board: str
    accommodations: list[Accommodation]
    general_instructions: list[str] = Field(default_factory=list)
    application_deadline_guidance: str | None = None


class AccessibilitySummaryResponse(BaseModel):
    """Lightweight summary returned after GET."""

    student_id: str
    preferences: AccessibilityPreferences
    active_adaptations_count: int
    last_synced: datetime | None = None


# ---------------------------------------------------------------------------
# Database dependency  (injected from existing app factory)
# ---------------------------------------------------------------------------

async def get_db_session():
    """
    Yield an async SQLAlchemy session.
    Provided by the platform's existing database.py / app.py.
    """
    from services.database import async_session_maker
    async with async_session_maker() as session:
        yield session


# ---------------------------------------------------------------------------
# Service layer  (pure functions — no Claude API calls)
# ---------------------------------------------------------------------------

EXAM_BOARD_MAP: dict[ExamType, str] = {
    ExamType.ICSE: "Council for the Indian School Certificate Examinations",
    ExamType.ISC: "Council for the Indian School Certificate Examinations",
    ExamType.CBSE: "Central Board of Secondary Education",
    ExamType.NEET: "National Testing Agency",
    ExamType.JEE_MAIN: "National Testing Agency",
    ExamType.JEE_ADVANCED: "IITs (Joint Admission Board)",
    ExamType.STATE_BOARD: "Respective State Education Board",
}

# Comprehensive accommodation catalogue keyed by exam type.
ACCOMMODATION_CATALOGUE: dict[ExamType, list[Accommodation]] = {
    ExamType.ICSE: [
        Accommodation(
            id="icse-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Additional 15 minutes per hour for candidates with certified disabilities.",
            eligibility_criteria=[
                "Valid disability certificate from recognised medical authority",
                "Application submitted at least 30 days before the exam"
            ],
            max_extra_time_percentage=25,
            requires_certificate=True,
            notes="CISCE Form 6 must accompany the request."
        ),
        Accommodation(
            id="icse-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="A designated person writes answers on behalf of the candidate.",
            eligibility_criteria=[
                "Physical disability affecting writing ability",
                "OR dyslexia / specific learning disorder (certified)"
            ],
            max_extra_time_percentage=15,
            requires_certificate=True,
            notes="Scribe must be at least two grades below the candidate."
        ),
        Accommodation(
            id="icse-reader",
            category=AccommodationCategory.READER,
            name="Reader",
            description="A designated person reads the question paper aloud.",
            eligibility_criteria=[
                "Visual impairment (certified)",
                "OR specific learning disability affecting reading"
            ],
            requires_certificate=True,
            notes="Reader shall not explain or interpret questions."
        ),
        Accommodation(
            id="icse-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Question Paper",
            description="Question paper printed in 18-pt font.",
            eligibility_criteria=["Visual impairment certified by ophthalmologist"],
            requires_certificate=True,
        ),
        Accommodation(
            id="icse-calculator",
            category=AccommodationCategory.CALCULATOR,
            name="Use of Calculator",
            description="Basic calculator permitted for Mathematics.",
            eligibility_criteria=[
                "Dyscalculia or specific learning disorder in Mathematics",
                "Certified by clinical psychologist"
            ],
            requires_certificate=True,
            notes="Only non-programmable calculators allowed."
        ),
        Accommodation(
            id="icse-break-time",
            category=AccommodationCategory.BREAK_TIME,
            name="Extra Break Time",
            description="Permitted to take additional breaks during the exam.",
            eligibility_criteria=[
                "Anxiety disorders, ADHD, or medical conditions requiring breaks",
                "Medical certificate from psychiatrist or physician"
            ],
            requires_certificate=True,
        ),
    ],
    ExamType.ISC: [
        Accommodation(
            id="isc-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Additional 15 minutes per hour for candidates with certified disabilities.",
            eligibility_criteria=["Valid disability certificate"],
            max_extra_time_percentage=25,
            requires_certificate=True,
            notes="CISCE Form 6 required."
        ),
        Accommodation(
            id="isc-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="A designated person writes answers for the candidate.",
            eligibility_criteria=["Physical or learning disability affecting writing"],
            max_extra_time_percentage=15,
            requires_certificate=True,
        ),
        Accommodation(
            id="isc-reader",
            category=AccommodationCategory.READER,
            name="Reader",
            description="Question paper read aloud by designated reader.",
            eligibility_criteria=["Visual impairment or SLD affecting reading"],
            requires_certificate=True,
        ),
        Accommodation(
            id="isc-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Question Paper",
            description="Question paper in 18-pt font.",
            eligibility_criteria=["Visual impairment certified"],
            requires_certificate=True,
        ),
        Accommodation(
            id="isc-braille",
            category=AccommodationCategory.BRAILLE,
            name="Braille Question Paper",
            description="Question paper in Braille (Grade 1 or 2).",
            eligibility_criteria=["Blind / certified visual impairment"],
            requires_certificate=True,
        ),
        Accommodation(
            id="isc-calculator",
            category=AccommodationCategory.CALCULATOR,
            name="Use of Calculator",
            description="Non-programmable calculator for Mathematics/Physics.",
            eligibility_criteria=["Certified dyscalculia or learning disability"],
            requires_certificate=True,
        ),
        Accommodation(
            id="isc-break-time",
            category=AccommodationCategory.BREAK_TIME,
            name="Extra Break Time",
            description="Permitted to take additional breaks.",
            eligibility_criteria=["Medical / psychiatric certification"],
            requires_certificate=True,
        ),
    ],
    ExamType.CBSE: [
        Accommodation(
            id="cbse-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Up to 30 minutes per hour for cerebral palsy and related conditions.",
            eligibility_criteria=["Valid disability certificate under RPwD Act 2016"],
            max_extra_time_percentage=50,
            requires_certificate=True,
            notes="Form for concession ( Annexure-VI ) required."
        ),
        Accommodation(
            id="cbse-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="A designated scribe writes answers for the candidate.",
            eligibility_criteria=["Physical disability or blindness"],
            max_extra_time_percentage=30,
            requires_certificate=True,
            notes="Candidate availing scribe gets 30 minutes extra per hour."
        ),
        Accommodation(
            id="cbse-reader",
            category=AccommodationCategory.READER,
            name="Reader",
            description="Designated reader reads the question paper.",
            eligibility_criteria=["Blindness or visual impairment"],
            requires_certificate=True,
        ),
        Accommodation(
            id="cbse-braille",
            category=AccommodationCategory.BRAILLE,
            name="Braille Question Paper",
            description="Question paper in Braille format.",
            eligibility_criteria=["Blind candidates"],
            requires_certificate=True,
        ),
        Accommodation(
            id="cbse-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Question Paper (14-pt or 18-pt)",
            description="Enlarged-font question paper.",
            eligibility_criteria=["Low vision certified"],
            requires_certificate=True,
        ),
        Accommodation(
            id="cbse-calculator",
            category=AccommodationCategory.CALCULATOR,
            name="Use of Calculator",
            description="Permitted for Mathematics.",
            eligibility_criteria=["Dyscalculia certified by psychologist"],
            requires_certificate=True,
        ),
        Accommodation(
            id="cbse-break-time",
            category=AccommodationCategory.BREAK_TIME,
            name="Extra Break / Rest Time",
            description="Breaks allowed between sections.",
            eligibility_criteria=["Medical condition requiring breaks"],
            requires_certificate=True,
        ),
    ],
    ExamType.NEET: [
        Accommodation(
            id="neet-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="10 minutes extra per hour for PwD candidates (benchmark disability ≥40%).",
            eligibility_criteria=["PwD certificate with benchmark disability ≥40%"],
            max_extra_time_percentage=17,
            requires_certificate=True,
            notes="NTA NEET regulations; availing scribe automatically grants extra time."
        ),
        Accommodation(
            id="neet-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="Scribe provided for physically disabled or blind candidates.",
            eligibility_criteria=["PwD certificate; unable to write independently"],
            max_extra_time_percentage=17,
            requires_certificate=True,
        ),
        Accommodation(
            id="neet-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print OMR / Question Paper",
            description="OMR sheet and question paper in large print.",
            eligibility_criteria=["Visual impairment (low vision)"],
            requires_certificate=True,
        ),
        Accommodation(
            id="neet-break-time",
            category=AccommodationCategory.BREAK_TIME,
            name="Extra Break Time",
            description="Permitted to take additional breaks.",
            eligibility_criteria=["Medical certificate"],
            requires_certificate=True,
        ),
    ],
    ExamType.JEE_MAIN: [
        Accommodation(
            id="jee-main-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Extra time as per NTA guidelines for PwD candidates.",
            eligibility_criteria=["PwD certificate from recognised authority"],
            max_extra_time_percentage=17,
            requires_certificate=True,
        ),
        Accommodation(
            id="jee-main-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe for Physically Disabled",
            description="Scribe permitted for candidates with physical disabilities.",
            eligibility_criteria=["Physical disability certificate"],
            max_extra_time_percentage=17,
            requires_certificate=True,
        ),
        Accommodation(
            id="jee-main-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Question Paper",
            description="Enlarged-font question paper for visually impaired.",
            eligibility_criteria=["Visual impairment certificate"],
            requires_certificate=True,
        ),
    ],
    ExamType.JEE_ADVANCED: [
        Accommodation(
            id="jee-adv-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Extra time as per JEE (Advanced) regulations.",
            eligibility_criteria=["PwD certificate with benchmark disability"],
            max_extra_time_percentage=17,
            requires_certificate=True,
            notes="Must be declared during registration."
        ),
        Accommodation(
            id="jee-adv-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="Permitted for physically disabled candidates.",
            eligibility_criteria=["Valid disability certificate"],
            requires_certificate=True,
        ),
        Accommodation(
            id="jee-adv-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Question Paper",
            description="Question paper in large print format.",
            eligibility_criteria=["Visual impairment certificate"],
            requires_certificate=True,
        ),
    ],
    ExamType.STATE_BOARD: [
        Accommodation(
            id="state-extra-time",
            category=AccommodationCategory.EXTRA_TIME,
            name="Extra Time (Compensatory)",
            description="Extra time per state board policy.",
            eligibility_criteria=["Valid disability certificate"],
            max_extra_time_percentage=25,
            requires_certificate=True,
            notes="Varies by state — check respective board circular."
        ),
        Accommodation(
            id="state-scribe",
            category=AccommodationCategory.SCRIBE,
            name="Scribe / Amanuensis",
            description="Scribe provided as per state norms.",
            eligibility_criteria=["Disability certificate"],
            requires_certificate=True,
        ),
        Accommodation(
            id="state-larger-print",
            category=AccommodationCategory.LARGE_PRINT,
            name="Large Print Paper",
            description="Enlarged-font question paper.",
            eligibility_criteria=["Low vision certificate"],
            requires_certificate=True,
        ),
    ],
}

GENERAL_INSTRUCTIONS: dict[ExamType, list[str]] = {
    ExamType.ICSE: [
        "Submit Form 6 (Application for Special Consideration) to the Council at least 30 days before the exam.",
        "The candidate must appear in person at the designated centre.",
        "The scribe must be at least two grades below the candidate in academic level."
    ],
    ExamType.ISC: [
        "Submit Form 6 well in advance. Late submissions may not be entertained.",
        "Candidates using a scribe are granted 15 minutes extra per hour automatically.",
        "Large-print papers must be requested at least 21 days prior."
    ],
    ExamType.CBSE: [
        "Fill Annexure-I and Annexure-VI and submit to the board at least 15 days before the exam.",
        "Candidates with benchmark disabilities (≥40%) must also register on the CBSE web portal.",
        "The scribe must be from the same or a lower class and must not be a subject expert."
    ],
    ExamType.NEET: [
        "Indicate PwD status during online registration on the NTA website.",
        "PwD certificate issued by a District Medical Board / Civil Surgeon is mandatory.",
        "Candidates availing scribe automatically receive 10 minutes extra per hour."
    ],
    ExamType.JEE_MAIN: [
        "Declare PwD status during registration. Upload certificate during document upload.",
        "Scribe arrangement must be requested during form filling — cannot be added later."
    ],
    ExamType.JEE_ADVANCED: [
        "PwD status must be correctly entered during JEE (Advanced) registration.",
        "Certificates must be issued by a notified medical authority."
    ],
    ExamType.STATE_BOARD: [
        "Contact your regional board office for the correct form and deadline.",
        "State-specific circulars govern the exact list of accommodations."
    ],
}

APPLICATION_DEADLINE_GUIDANCE = (
    "Submit accommodation requests at least 21–30 days before the exam date. "
    "Late submissions may be rejected at the board's discretion."
)


async def get_student_preferences(db_session, student_id: str) -> AccessibilityPreferences:
    """Fetch the persisted preferences for a student from the database."""
    from sqlalchemy import select
    from services.models import AccessibilityPreferencesModel

    result = await db_session.execute(
        select(AccessibilityPreferencesModel).where(
            AccessibilityPreferencesModel.student_id == student_id
        )
    )
    row = result.scalar_one_or_none()
    if row is None:
        raise LookupError(f"No accessibility preferences found for student '{student_id}'")

    return AccessibilityPreferences(
        student_id=row.student_id,
        font_size=FontSize(row.font_size),
        color_theme=ColorTheme(row.color_theme),
        screen_reader_enabled=row.screen_reader_enabled,
        text_to_speech_enabled=row.text_to_speech_enabled,
        tts_language=row.tts_language,
        reduced_motion=row.reduced_motion,
        keyboard_navigation=row.keyboard_navigation,
        focus_indicators_enhanced=row.focus_indicators_enhanced,
        line_spacing=row.line_spacing,
        dyslexia_friendly_font=row.dyslexia_friendly_font,
        captioning_enabled=row.captioning_enabled,
        captions_language=row.captions_language,
        extra_time_percentage=row.extra_time_percentage,
        reader_assistant_allowed=row.reader_assistant_allowed,
        calculator_allowed=row.calculator_allowed,
        scribe_allowed=row.scribe_allowed,
        break_time_allowed=row.break_time_allowed,
        large_print_required=row.large_print_required,
        preferred_language=row.preferred_language,
        created_at=row.created_at,
        updated_at=row.updated_at,
    )


async def upsert_student_preferences(
    db_session, student_id: str, data: AccessibilityPreferencesUpdate
) -> AccessibilityPreferences:
    """Create or update preferences for a student (upsert)."""
    from sqlalchemy import select, update, insert
    from services.models import AccessibilityPreferencesModel

    result = await db_session.execute(
        select(AccessibilityPreferencesModel).where(
            AccessibilityPreferencesModel.student_id == student_id
        )
    )
    row = result.scalar_one_or_none()

    now = datetime.now(timezone.utc)

    if row is None:
        # Build defaults
        defaults: dict[str, Any] = {
            "student_id": student_id,
            "created_at": now,
            "updated_at": now,
            "font_size": FontSize.MEDIUM.value,
            "color_theme": ColorTheme.DEFAULT.value,
            "screen_reader_enabled": False,
            "text_to_speech_enabled": False,
            "tts_language": "en-IN",
            "reduced_motion": False,
            "keyboard_navigation": True,
            "focus_indicators_enhanced": False,
            "line_spacing": "normal",
            "dyslexia_friendly_font": False,
            "captioning_enabled": False,
            "captions_language": "en-IN",
            "extra_time_percentage": 0,
            "reader_assistant_allowed": False,
            "calculator_allowed": False,
            "scribe_allowed": False,
            "break_time_allowed": False,
            "large_print_required": False,
            "preferred_language": "en",
        }
        update_data = {k: v for k, v in data.model_dump(exclude_unset=True).items()}
        insert_values = {**defaults, **update_data}

        stmt = insert(AccessibilityPreferencesModel).values(**insert_values)
        await db_session.execute(stmt)
        await db_session.commit()

        return AccessibilityPreferences(
            student_id=student_id,
            font_size=FontSize(insert_values["font_size"]),
            color_theme=ColorTheme(insert_values["color_theme"]),
            screen_reader_enabled=insert_values["screen_reader_enabled"],
            text_to_speech_enabled=insert_values["text_to_speech_enabled"],
            tts_language=insert_values["tts_language"],
            reduced_motion=insert_values["reduced_motion"],
            keyboard_navigation=insert_values["keyboard_navigation"],
            focus_indicators_enhanced=insert_values["focus_indicators_enhanced"],
            line_spacing=insert_values["line_spacing"],
            dyslexia_friendly_font=insert_values["dyslexia_friendly_font"],
            captioning_enabled=insert_values["captioning_enabled"],
            captions_language=insert_values["captions_language"],
            extra_time_percentage=insert_values["extra_time_percentage"],
            reader_assistant_allowed=insert_values["reader_assistant_allowed"],
            calculator_allowed=insert_values["calculator_allowed"],
            scribe_allowed=insert_values["scribe_allowed"],
            break_time_allowed=insert_values["break_time_allowed"],
            large_print_required=insert_values["large_print_required"],
            preferred_language=insert_values["preferred_language"],
            created_at=insert_values["created_at"],
            updated_at=now,
        )

    # Update existing row
    patch = data.model_dump(exclude_unset=True)
    if not patch:
        # Nothing to update — return current state
        return AccessibilityPreferences(
            student_id=row.student_id,
            font_size=FontSize(row.font_size),
            color_theme=ColorTheme(row.color_theme),
            screen_reader_enabled=row.screen_reader_enabled,
            text_to_speech_enabled=row.text_to_speech_enabled,
            tts_language=row.tts_language,
            reduced_motion=row.reduced_motion,
            keyboard_navigation=row.keyboard_navigation,
            focus_indicators_enhanced=row.focus_indicators_enhanced,
            line_spacing=row.line_spacing,
            dyslexia_friendly_font=row.dyslexia_friendly_font,
            captioning_enabled=row.captioning_enabled,
            captions_language=row.captions_language,
            extra_time_percentage=row.extra_time_percentage,
            reader_assistant_allowed=row.reader_assistant_allowed,
            calculator_allowed=row.calculator_allowed,
            scribe_allowed=row.scribe_allowed,
            break_time_allowed=row.break_time_allowed,
            large_print_required=row.large_print_required,
            preferred_language=row.preferred_language,
            created_at=row.created_at,
            updated_at=row.updated_at,
        )

    patch["updated_at"] = now
    stmt = (
        update(AccessibilityPreferencesModel)
        .where(AccessibilityPreferencesModel.student_id == student_id)
        .values(**patch)
    )
    await db_session.execute(stmt)
    await db_session.commit()

    # Re-fetch to return the fresh row
    return await get_student_preferences(db_session, student_id)


# ---------------------------------------------------------------------------
# Content adaptation engine  (programmatic, no external APIs)
# ---------------------------------------------------------------------------

def _apply_font_size(content: str, font_size: FontSize) -> tuple[str, str]:
    """Wrap content in a div with inline font-size for rendering contexts."""
    size_map = {
        FontSize.SMALL: "0.875rem",
        FontSize.MEDIUM: "1rem",
        FontSize.LARGE: "1.25rem",
        FontSize.EXTRA_LARGE: "1.5rem",
    }
    px = size_map[font_size]
    wrapped = (
        f'<div class="accessibility-adapted" style="font-size:{px};line-height:1.6">'
        f"{content}</div>"
    )
    return wrapped, f"font_size_{font_size.value}"


def _apply_color_theme(content: str, theme: ColorTheme) -> tuple[str, str]:
    """Apply a CSS class for color-theme-based rendering."""
    theme_classes = {
        ColorTheme.DEFAULT: "theme-default",
        ColorTheme.HIGH_CONTRAST: "theme-high-contrast",
        ColorTheme.DARK_MODE: "theme-dark-mode",
        ColorTheme.COLOR_BLIND_FRIENDLY: "theme-colorblind",
        ColorTheme.SEPIA: "theme-sepia",
    }
    cls = theme_classes[theme]
    wrapped = f'<div class="{cls} accessibility-adapted">{content}</div>'
    return wrapped, f"color_theme_{theme.value}"


def _apply_line_spacing(content: str, spacing: str) -> tuple[str, str]:
    """Adjust line-height via inline style."""
    spacing_map = {"normal": "1.5", "wide": "2.0", "extra_wide": "2.5"}
    lh = spacing_map.get(spacing, "1.5")
    wrapped = f'<div style="line-height:{lh}">{content}</div>'
    return wrapped, f"line_spacing_{spacing}"


def _apply_dyslexia_font(content: str) -> tuple[str, str]:
    """Suggest OpenDyslexic-compatible styling."""
    wrapped = (
        '<div class="accessibility-adapted dyslexia-font" '
        'style="font-family:OpenDyslexic,Arial,sans-serif;'
        'letter-spacing:0.05em;word-spacing:0.1em">'
        f"{content}</div>"
    )
    return wrapped, "dyslexia_friendly_font"


def _apply_markdown_structure(content: str, ctype: ContentType) -> tuple[str, str]:
    """Add structural HTML wrapping for complex content types."""
    if ctype == ContentType.MATH:
        wrapped = (
            '<div class="content-block content-math" '
            'role="math" aria-label="Mathematical content">'
            f"{content}</div>"
        )
        return wrapped, "math_structure"
    if ctype == ContentType.SCIENCE:
        wrapped = (
            '<div class="content-block content-science" '
            'aria-label="Science content">'
            f"{content}</div>"
        )
        return wrapped, "science_structure"
    if ctype == ContentType.LANGUAGE:
        wrapped = (
            '<div class="content-block content-language" '
            'lang="en" aria-label="Language content">'
            f"{content}</div>"
        )
        return wrapped, "language_structure"
    return content, "no_structure_change"


def _adjust_vocabulary(content: str, grade_level: int | None) -> tuple[str, str | None]:
    """
    Simplify vocabulary for younger grades.
    This is a lightweight heuristic — not a full NLP pipeline.
    """
    if grade_level is None or grade_level >= 8:
        return content, None

    replacements: dict[str, str] = {
        "mitochondrion": "powerhouse of the cell",
        "photosynthesis": "how plants make food from sunlight",
        "ecosystem": "community of living things together",
        "democracy": "rule by the people",
        "constitution": "the set of main rules of a country",
        "algebra": "math with letters and numbers",
        "fraction": "part of something",
        "biodiversity": "variety of living things",
        "revolution": "big sudden change",
        "legislature": "group that makes laws",
        "photosynthetic": "related to making food from sunlight",
        "metamorphosis": "big change in shape or form",
    }
    lower = content
    applied: list[str] = []
    for term, simple in replacements.items():
        if term.lower() in lower.lower():
            content = content.replace(term, f"<abbr title='{term}'>{simple}</abbr>")
            applied.append(term)
    return content, "; ".join(applied) if applied else None


def _accessibility_score(prefs: AccessibilityPreferences) -> float:
    """
    Compute a 0–100 accessibility readiness score.
    Higher = more accommodations active.
    """
    score = 40.0  # baseline for having preferences configured
    if prefs.font_size in (FontSize.LARGE, FontSize.EXTRA_LARGE):
        score += 10
    if prefs.color_theme != ColorTheme.DEFAULT:
        score += 5
    if prefs.screen_reader_enabled:
        score += 10
    if prefs.dyslexia_friendly_font:
        score += 10
    if prefs.reduced_motion:
        score += 5
    if prefs.line_spacing != "normal":
        score += 5
    if prefs.captioning_enabled:
        score += 5
    if prefs.extra_time_percentage > 0:
        score += 5
    if prefs.reader_assistant_allowed:
        score += 3
    if prefs.scribe_allowed:
        score += 3
    if prefs.large_print_required:
        score += 4
    return min(score, 100.0)


def adapt_content(request: AdaptContentRequest) -> AdaptedContentResponse:
    """
    Programmatic content adaptation engine.
    No external LLM / API calls. Pure deterministic transformations.
    """
    prefs = request.preferences
    content = request.content
    transformations: list[str] = []
    warnings: list[str] = []
    metadata: dict[str, Any] = {
        "student_id": prefs.student_id,
        "grade_level": request.grade_level,
        "content_type": request.content_type.value,
    }

    # 1. Structural wrapping
    content, tag = _apply_markdown_structure(content, request.content_type)
    if tag != "no_structure_change":
        transformations.append(tag)

    # 2. Font size
    content, tag = _apply_font_size(content, prefs.font_size)
    transformations.append(tag)

    # 3. Color theme
    content, tag = _apply_color_theme(content, prefs.color_theme)
    transformations.append(tag)

    # 4. Line spacing
    if prefs.line_spacing != "normal":
        content, tag = _apply_line_spacing(content, prefs.line_spacing)
        transformations.append(tag)

    # 5. Dyslexia font
    if prefs.dyslexia_friendly_font:
        content, tag = _apply_dyslexia_font(content)
        transformations.append(tag)

    # 6. Screen-reader hooks
    if prefs.screen_reader_enabled:
        content = f'<div role="document" aria-live="polite">{content}</div>'
        transformations.append("screen_reader_hooks")

    # 7. Captioning hint
    if prefs.captioning_enabled:
        content = (
            '<div class="captions-ready" data-caption-lang="'
            + prefs.captions_language + '">' + content + "</div>"
        )
        transformations.append("captioning_hooks")

    # 8. Reduced motion
    if prefs.reduced_motion:
        content = (
            '<div class="reduced-motion" style="animation:none!important;'
            'transition:none!important">' + content + "</div>"
        )
        transformations.append("reduced_motion")

    # 9. Vocabulary simplification
    if request.grade_level and request.grade_level < 8:
        content, simplified = _adjust_vocabulary(content, request.grade_level)
        if simplified:
            transformations.append(f"vocab_simplification:{simplified}")

    # 10. Accessibility score
    score = _accessibility_score(prefs)
    if prefs.keyboard_navigation:
        transformations.append("keyboard_nav_ready")
    if prefs.extra_time_percentage > 0:
        metadata["effective_extra_time"] = f"+{prefs.extra_time_percentage}%"

    # 11. Warnings
    if prefs.dyslexia_friendly_font and prefs.content_type == ContentType.MATH:
        warnings.append(
            "Dyslexia-friendly font may affect mathematical symbol clarity. "
            "Consider verifying rendering with the student."
        )
    if request.grade_level and request.grade_level > 12:
        warnings.append("grade_level exceeds supported range (1-12); simplification skipped.")
    if not transformations:
        warnings.append("No transformations were applied; check preference configuration.")

    return AdaptedContentResponse(
        original_content=request.content,
        adapted_content=content,
        content_type=request.content_type,
        transformations_applied=transformations,
        accessibility_score=score,
        warnings=warnings,
        metadata=metadata,
    )


# ---------------------------------------------------------------------------
# Router
# ---------------------------------------------------------------------------

router = APIRouter(prefix="/api/accessibility", tags=["Accessibility"])


@router.get(
    "/{student_id}",
    response_model=AccessibilityPreferences,
    summary="Get student accessibility preferences",
    description=(
        "Retrieve the full accessibility preference set for a student. "
        "Returns 404 if no preferences have been configured yet."
    ),
    responses={
        404: {"description": "No accessibility preferences found for the student"},
        500: {"description": "Database or internal server error"},
    },
)
async def get_accessibility(
    student_id: str,
    db_session=Depends(get_db_session),
) -> AccessibilityPreferences:
    """GET /api/accessibility/{student_id}"""
    try:
        return await get_student_preferences(db_session, student_id)
    except LookupError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No accessibility preferences found for student '{student_id}'. "
                   "Please configure preferences via PUT first.",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve preferences: {exc}",
        ) from exc


@router.put(
    "/{student_id}",
    response_model=AccessibilityPreferences,
    status_code=status.HTTP_200_OK,
    summary="Create or update student accessibility preferences",
    description=(
        "Upsert the accessibility preference set. Only the fields provided "
        "in the request body are modified; all others retain their existing values "
        "(or sensible defaults for new records)."
    ),
    responses={
        422: {"description": "Validation error — no fields provided or bad input"},
        500: {"description": "Database or internal server error"},
    },
)
async def update_accessibility(
    student_id: str,
    payload: AccessibilityPreferencesUpdate,
    db_session=Depends(get_db_session),
) -> AccessibilityPreferences:
    """PUT /api/accessibility/{student_id}"""
    try:
        prefs = await upsert_student_preferences(db_session, student_id, payload)
        return prefs
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update preferences: {exc}",
        ) from exc


@router.post(
    "/adapt",
    response_model=AdaptedContentResponse,
    status_code=status.HTTP_200_OK,
    summary="Adapt content for accessibility",
    description=(
        "Transforms raw content (text, math, science, etc.) into an "
        "accessibility-enhanced format driven by the provided preference set. "
        "All transformations are programmatic — no external API is called."
    ),
    responses={
        422: {"description": "Validation error"},
        500: {"description": "Internal server error during adaptation"},
    },
)
async def adapt_content_endpoint(
    request: AdaptContentRequest,
) -> AdaptedContentResponse:
    """POST /api/accessibility/adapt"""
    try:
        return adapt_content(request)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Content adaptation failed: {exc}",
        ) from exc


@router.get(
    "/accommodations/{exam_type}",
    response_model=AccommodationListResponse,
    summary="List allowed accommodations for an exam type",
    description=(
        "Returns the set of accessibility accommodations permitted for the "
        "specified Indian examination board (ICSE, ISC, CBSE, NEET, JEE, etc.) "
        "along with eligibility criteria and board-specific instructions."
    ),
    responses={
        404: {"description": "Unknown exam type"},
        500: {"description": "Internal server error"},
    },
)
async def get_accommodations(
    exam_type: ExamType = Path(..., description="Examination board / type"),
) -> AccommodationListResponse:
    """GET /api/accessibility/accommodations/{exam_type}"""
    try:
        accommodations = ACCOMMODATION_CATALOGUE.get(exam_type, [])
        board = EXAM_BOARD_MAP.get(exam_type, "Unknown Board")
        instructions = GENERAL_INSTRUCTIONS.get(exam_type, [])
        return AccommodationListResponse(
            exam_type=exam_type,
            board=board,
            accommodations=accommodations,
            general_instructions=instructions,
            application_deadline_guidance=APPLICATION_DEADLINE_GUIDANCE,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch accommodations: {exc}",
        ) from exc


# ---------------------------------------------------------------------------
# Re-export for app.py inclusion
# ---------------------------------------------------------------------------

__all__ = ["router"]