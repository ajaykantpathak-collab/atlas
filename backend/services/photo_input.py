"""
photo_input.py - Photo-to-LaTeX backend pipeline for math problems.

Receives an uploaded image (multipart or base64), runs preprocessing + OCR
(Tesseract for text, Pix2Tex for math expressions), merges results into
LaTeX, classifies the problem type, and returns a structured response.

Designed for K-12 CISCE/ICSE/ISC students photographing textbook problems.

Author: Platform Backend Team
"""

from __future__ import annotations

import base64
import io
import logging
import os
import re
import time
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Any, Optional

import cv2
import numpy as np

from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Optional imports – Tesseract and Pix2Tex are heavyweight deps.  The service
# degrades gracefully when they are unavailable (returns an error result
# instead of raising).
# ---------------------------------------------------------------------------
try:
    import pytesseract  # type: ignore[import-untyped]
    _TESSERACT_AVAILABLE = True
except ImportError:
    pytesseract = None  # type: ignore[assignment]
    _TESSERACT_AVAILABLE = False
    logger.warning("pytesseract not available – text OCR will be degraded")

try:
    from pix2tex.cli import LatexOCR  # type: ignore[import-untyped]
    _PIX2TEX_AVAILABLE = True
except ImportError:
    LatexOCR = None  # type: ignore[assignment,misc]
    _PIX2TEX_AVAILABLE = False
    logger.warning("pix2tex not available – math OCR will be degraded")


# ---------------------------------------------------------------------------
# Data models (Pydantic v2 schemas for API layer)
# ---------------------------------------------------------------------------
class ProblemType(str, Enum):
    """Enumerated problem types the classifier can detect."""
    DERIVATIVE = "derivative"
    INTEGRAL = "integral"
    LIMIT = "limit"
    ROOT_EQUATION = "root_equation"
    GENERAL_EQUATION = "general_equation"
    MATRIX = "matrix"
    SUM_SERIES = "sum_series"
    SEQUENCE_SERIES = "sequence_series"
    OPTIMIZATION = "optimization"
    GEOMETRY = "geometry"
    TRIGONOMETRY = "trigonometry"
    LOGARITHM = "logarithm"
    UNKNOWN = "unknown"


class PhotoProcessRequest(BaseModel):
    """Request body when a base64-encoded image is sent as JSON."""
    image_base64: str = Field(
        ..., description="Base64-encoded image string (no data-URI prefix)"
    )
    filename: Optional[str] = Field(
        None, description="Original filename for logging / content-type sniffing"
    )
    mime_type: Optional[str] = Field(
        None, description="e.g. 'image/jpeg', 'image/png'"
    )


class PhotoProcessResponse(BaseModel):
    """Standardised response returned to the API caller."""
    latex: str = Field(description="Primary recognised LaTeX representation")
    problem_type: ProblemType = Field(
        description="Classified problem type"
    )
    confidence: float = Field(
        ge=0.0, le=1.0, description="Confidence score 0–1"
    )
    alternatives: list[str] = Field(
        default_factory=list, description="Alternative LaTeX candidates")
    processing_ms: int = Field(description="Total wall-clock ms spent processing")
    warnings: list[str] = Field(
        default_factory=list, description="Non-fatal warnings (e.g. low confidence)"
    )


# ---------------------------------------------------------------------------
# Internal dataclass – keeps solver code decoupled from Pydantic.
# -----------------------------------------------------------------------------
@dataclass
class _ProcessingResult:
    latex: str = ""
    problem_type: ProblemType = ProblemType.UNKNOWN
    confidence: float = 0.0
    alternatives: list[str] = field(default_factory=list)
    processing_ms: int = 0
    warnings: list[str] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Image preprocessing utilities
# ---------------------------------------------------------------------------
class ImagePreprocessor:
    """
    Static helper methods for image cleanup before OCR.

    Pipeline (each step optional, controlled by flags):
      1. Decode bytes → BGR ndarray
      2. Deskew (rotation correction via Hough transform on text lines)
      3. Denoise (fast NlMeans or bilateral)
      4. Binarise (adaptive Gaussian threshold)
      5. Resize (up-scale if image is small, preserving aspect ratio)
    """

    @staticmethod
    def _decode(image_bytes: bytes) -> np.ndarray:
        """Decode raw bytes into an OpenCV BGR ndarray.  Raises ValueError on
        failure.
        """
        arr = np.frombuffer(image_bytes, dtype=np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Unable to decode image bytes – unsupported format")
        return img

    @staticmethod
    def _deskew(img: np.ndarray) -> np.ndarray:
        """
        Estimate the dominant text-line angle and rotate to correct.

        Uses Hough line detection on the binary edge image; takes the median
        angle of the most common lines.  Falls through silently if detection
        fails (returns image unchanged).
        """
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150, apertureSize=3)
        lines = cv2.HoughLinesP(
            edges, 1, np.pi / 180, threshold=100,
            minLineLength=30, maxLineGap=5
        )
        if lines is None or len(lines) == 0:
            return img

        angles: list[float] = []
        for x1, y1, x2, y2 in lines[:, 0]:
            if x2 - x1 == 0:
                continue
            angle = np.degrees(np.arctan2(y2 - y1, x2 - x1))
            # Keep near-horizontal lines only (±45°)
            if abs(angle) < 45:
                angles.append(angle)

        if not angles:
            return img

        median_angle = float(np.median(angles))
        if abs(median_angle) < 0.5:  # negligible tilt
            return img

        h, w = img.shape[:2]
        centre = (w // 2, h // 2)
        rot_mat = cv2.getRotationMatrix2D(centre, median_angle, 1.0)
        rotated = cv2.warpAffine(
            img, rot_mat, (w, h),
            flags=cv2.INTER_CUBIC,
            borderMode=cv2.BORDER_REPLICATE,
        )
        return rotated

    @staticmethod
    def _denoise(img: np.ndarray) -> np.ndarray:
        """Remove noise while preserving edges.  Uses bilateral filter (fast)
        followed by a light fastNlMeans pass.
        """
        bilat = cv2.bilateralFilter(img, 5, 50, 50)
        denoised = cv2.fastNlMeansDenoisingColored(
            bilat, None, h=5, hColor=5,
            templateWindowSize=7, searchWindowSize=21
        )
        return denoised

    @staticmethod
    def _binarise(img: np.ndarray) -> np.ndarray:
        """
        Adaptive Gaussian thresholding.  Works well on unevenly lit photos.
        Returns the binary image (still 3-channel for downstream compat).
        """
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        binary = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, blockSize=11, C=3
        )
        return cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)

    @staticmethod
    def _resize(img: np.ndarray, min_dim: int = 512) -> np.ndarray:
        """Upscale if the shortest side is below *min_dim* px to help OCR."""
        h, w = img.shape[:2]
        shortest = min(h, w)
        if shortest >= min_dim:
            return img
        scale = min_dim / shortest
        new_w, new_h = int(w * scale), int(h * scale)
        return cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_CUBIC)

    @classmethod
    def preprocess(
        cls,
        image_bytes: bytes,
        deskew: bool = True,
        denoise: bool = True,
        binarise: bool = True,
    ) -> np.ndarray:
        """
        Run the full preprocessing pipeline and return a BGR ndarray.

        Raises ValueError if the image cannot be decoded.
        """
        img = cls._decode(image_bytes)
        if deskew:
            img = cls._deskew(img)
        if denoise:
            img = cls._denoise(img)
        if binarise:
            img = cls._binarise(img)
        img = cls._resize(img)
        return img


# ---------------------------------------------------------------------------
# OCR engine wrapper
# ---------------------------------------------------------------------------
class OCREngine:
    """
    Thin wrapper around Tesseract (text) and Pix2Tex (math).

    * Tesseract handles English labels, 'find', 'solve', 'prove', etc.
    * Pix2Tex handles mathematical notation (fractions, integrals, matrices …)

    Results are merged: text tokens are kept as-is, math blocks are
    converted to inline LaTeX and combined with surrounding text.
    """

    def __init__(self) -> None:
        self._pix2tex_model: Any | None = None
        self._tesseract_ok: bool = _TESSERACT_AVAILABLE
        self._pix2tex_ok: bool = _PIX2TEX_AVAILABLE

    def _ensure_pix2tex(self) -> bool:
        if self._pix2tex_model is not None:
            return True
        if not _PIX2TEX_AVAILABLE or LatexOCR is None:
            return False
        try:
            # Pix2Tex downloads a pretrained model on first call (~30 MB).
            # We cache it for subsequent calls.
            self._pix2tex_model = LatexOCR()
            return True
        except Exception as exc:
            logger.warning("Failed to initialise Pix2Tex: %s", exc)
            return False

    @staticmethod
    def _cv2_to_pil(img: np.ndarray) -> Any:
        """Convert BGR ndarray → PIL Image (lazy import)."""
        from PIL import Image  # local import to keep startup fast

        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        return Image.fromarray(rgb)

    def ocr_text(self, img: np.ndarray) -> str:
        """Run Tesseract OCR, returning stripped text."""
        if not self._tesseract_ok or pytesseract is None:
            return ""
        try:
            custom_cfg = (
                "--oem 3 --psm 6 "  # LSTM engine, single uniform block
                "-l eng+hin "       # English + Devanagari (Indian textbooks)
            )
            text = pytesseract.image_to_string(img, config=custom_cfg)
            return text.strip()
        except Exception as exc:
            logger.warning("Tesseract OCR failed: %s", exc)
            return ""

    def ocr_math(self, img: np.ndarray) -> str:
        """Run Pix2Tex on *img*, returning LaTeX string."""
        if not self._ensure_pix2tex():
            return ""
        try:
            pil_img = self._cv2_to_pil(img)
            latex = self._pix2tex_model(list(pil_img.getdata()), pil_img.size)
            return latex.strip() if latex else ""
        except Exception as exc:
            logger.warning("Pix2Tex OCR failed: %s", exc)
            return ""

    def run(self, img: np.ndarray) -> tuple[str, list[str]]:
        """
        Run both OCR passes and return (primary_latex, alternatives).

        Strategy
        --------
        1. Full-image Pix2Tex for dominant math expression.
        2. Tesseract for surrounding text (problem numbers, words).
        3. Merge: prepend text context to the LaTeX math block.

        Returns
        -------
        (latex, [alt1, alt2, …])
        """
        latex_math = self.ocr_math(img)
        text_context = self.ocr_text(img)

        if not latex_math:
            # No math detected – fall back to plain text wrapped as LaTeX.
            if text_context:
                merged = text_context
            else:
                merged = ""
        else:
            if text_context:
                merged = f"{text_context}\\quad {latex_math}"
            else:
                merged = latex_math

        # Build alternatives: Tesseract-only result as fallback candidate.
        alternatives: list[str] = []
        if text_context and text_context != merged:
            alternatives.append(text_context)
        if latex_math and latex_math != merged:
            alternatives.append(latex_math)

        return merged, alternatives


# ---------------------------------------------------------------------------
# LaTeX-based problem-type classifier
# ---------------------------------------------------------------------------
class ProblemClassifier:
    """
    Classifies a LaTeX string into a ProblemType using pattern matching.

    Patterns are ordered from most-specific to most-general so that
    integral wins over general equation, etc.
    """

    # (regex pattern, problem_type, minimum confidence boost)
    _PATTERNS: list[tuple[str, ProblemType, float]] = [
        # --- Calculus ---
        (r"\\frac\{d\}",                            ProblemType.DERIVATIVE,      0.90),
        (r"\\partial|\\nabla",                      ProblemType.DERIVATIVE,      0.85),
        (r"\\int[^a-z]|\\int_|\\int\\limits",  ProblemType.INTEGRAL,        0.92),
        (r"\\lim_|\\lim\\limits",                 ProblemType.LIMIT,           0.90),
        # --- Algebra / Equations ---
        (r"\\sqrt\[|\\sqrt\{|\\sqrt\s*\\(?\s*\d", ProblemType.ROOT_EQUATION, 0.80),
        (r"\\sqrt\b",                                ProblemType.ROOT_EQUATION,   0.60),
        (r"x\^\d|y\^\d|=0|=0",                     ProblemType.GENERAL_EQUATION,0.55),
        # --- Matrices ---
        (r"\\begin\{pmatrix\}|\\begin\{matrix\}|\\begin\{bmatrix\}",
                                                            ProblemType.MATRIX,          0.95),
        # --- Sums / Series ---
        (r"\\sum_|\\sum\\limits",                 ProblemType.SUM_SERIES,      0.92),
        (r"a_n|U_n|t_n|\\text\{n\}",              ProblemType.SEQUENCE_SERIES, 0.60),
        # --- Optimisation ---
        (r"(?:max|min|maximum|minimum|optimise|optimize)",
                                                            ProblemType.OPTIMIZATION,    0.85),
        # --- Geometry ---
        (r"\\text\{Area\}|\\text\{Volume\}|\\Delta|\\triangle|\\text\{perimeter\}",
                                                            ProblemType.GEOMETRY,        0.80),
        # --- Trigonometry ---
        (r"\\sin|\\cos|\\tan|\\cot|\\sec|\\csc",
                                                            ProblemType.TRIGONOMETRY,    0.70),
        # --- Logarithms ---
        (r"\\log|\\ln\b",                          ProblemType.LOGARITHM,        0.85),
    ]

    @classmethod
    def classify(cls, latex: str) -> tuple[ProblemType, float]:
        """
        Return (problem_type, confidence).

        Confidence is the highest matched-pattern score.  If no pattern
        matches, returns (UNKNOWN, 0.0).
        """
        best_type = ProblemType.UNKNOWN
        best_conf = 0.0

        for pattern, ptype, score in cls._PATTERNS:
            if re.search(pattern, latex, re.IGNORECASE):
                if score > best_conf:
                    best_conf = score
                    best_type = ptype

        # Boost confidence when Tesseract text hints are present
        hint_keywords = {
            "derivative": ProblemType.DERIVATIVE,
            "differentiate": ProblemType.DERIVATIVE,
            "integrate": ProblemType.INTEGRAL,
            "integration": ProblemType.INTEGRAL,
            "limit": ProblemType.LIMIT,
            "solve": ProblemType.GENERAL_EQUATION,
            "find": ProblemType.GENERAL_EQUATION,
            "prove": ProblemType.GENERAL_EQUATION,
            "matrix": ProblemType.MATRIX,
            "determinant": ProblemType.MATRIX,
            "area": ProblemType.GEOMETRY,
            "volume": ProblemType.GEOMETRY,
        }
        lowered = latex.lower()
        for keyword, ptype in hint_keywords.items():
            if keyword in lowered and ptype == best_type:
                best_conf = min(best_conf + 0.05, 1.0)
                break

        return best_type, best_conf


# ---------------------------------------------------------------------------
# Main service class
# ---------------------------------------------------------------------------
class PhotoInputService:
    """
    Orchestrates the full photo-to-LaTeX pipeline.

    Usage
    -----
    >>> svc = PhotoInputService()
    >>> result = svc.process_bytes(image_bytes, filename="photo.jpg")
    >>> print(result.latex, result.problem_type, result.confidence)
    """

    def __init__(
        self,
        *,
        enable_deskew: bool = True,
        enable_denoise: bool = True,
        enable_binarise: bool = True,
        confidence_threshold: float = 0.30,
        max_processing_ms: int = 3000,
    ) -> None:
        self._enable_deskew = enable_deskew
        self._enable_denoise = enable_deskoise  # type: ignore[attr-defined]
        self._enable_binarise = enable_binarise
        self._confidence_threshold = confidence_threshold
        self._max_processing_ms = max_processing_ms
        self._ocr = OCREngine()
        self._preprocessor = ImagePreprocessor()

    # -- Public API ---------------------------------------------------------

    def process_bytes(
        self,
        image_bytes: bytes,
        filename: str | None = None,
    ) -> _ProcessingResult:
        """
        Process raw image bytes and return a _ProcessingResult.

        Raises
        ~~~~~~
        ValueError  – if the image cannot be decoded.
        TimeoutError – if processing exceeds *max_processing_ms*.
        """
        t0 = time.monotonic()

        # 1. Preprocess
        img = self._preprocessor.preprocess(
            image_bytes,
            deskew=self._enable_deskew,
            denoise=self._enable_denoise,
            binarise=self._enable_binarise,
        )

        elapsed_ms = int((time.monotonic() - t0) * 1000)
        if elapsed_ms > self._max_processing_ms:
            raise TimeoutError(
                f"Preprocessing exceeded {self._max_processing_ms} ms "
                f"(actual {elapsed_ms} ms)"
            )

        # 2. OCR
        latex, alternatives = self._ocr.run(img)

        if not latex:
            return _ProcessingResult(
                latex="",
                confidence=0.0,
                processing_ms=elapsed_ms,
                warnings=[
                    "Could not extract any LaTeX from the image. "
                    "Try typing the problem instead."
                ],
            )

        # 3. Classify
        problem_type, confidence = ProblemClassifier.classify(latex)

        # 4. Build alternatives list (limit to 3)
        alt_list = alternatives[:3]

        elapsed_ms = int((time.monotonic() - t0) * 1000)

        warnings: list[str] = []
        if confidence < self._confidence_threshold:
            warnings.append(
                f"Low confidence ({confidence:.0%}). Please verify the result."
            )
        if elapsed_ms > self._max_processing_ms:
            warnings.append(
                f"Slow processing ({elapsed_ms} ms). Result may be inaccurate."
            )

        return _ProcessingResult(
            latex=latex,
            problem_type=problem_type,
            confidence=round(confidence, 2),
            alternatives=alt_list,
            processing_ms=elapsed_ms,
            warnings=warnings,
        )

    def process_base64(
        self,
        b64_string: str,
        filename: str | None = None,
    ) -> _ProcessingResult:
        """Decode a base64 string (optionally with data-URI prefix) and
        process it.

        Accepts both 'data:image/png;base64,AAA…' and raw 'AAA…'.
        """
        # Strip optional data-URI header
        if "," in b64_string and b64_string.startswith("data:"):
            b64_string = b64_string.split(",", 1)[1]

        try:
            image_bytes = base64.b64decode(b64_string)
        except Exception as exc:
            raise ValueError(f"Invalid base64 image data: {exc}") from exc

        return self.process_bytes(image_bytes, filename=filename)

    def process_file(self, file_path: str | Path) -> _ProcessingResult:
        """Read an image file from disk and process it."""
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"Image file not found: {path}")
        data = path.read_bytes()
        return self.process_bytes(data, filename=path.name)

    def to_api_response(
        self,
        result: _ProcessingResult,
    ) -> PhotoProcessResponse:
        """Convert internal _ProcessingResult → Pydantic response model."""
        return PhotoProcessResponse(
            latex=result.latex,
            problem_type=result.problem_type,
            confidence=result.confidence,
            alternatives=result.alternatives,
            processing_ms=result.processing_ms,
            warnings=result.warnings,
        )


# ---------------------------------------------------------------------------
# Convenience singleton – used by the API router without re-initialising
# the (potentially large) Pix2Tex model on every request.
# ---------------------------------------------------------------------------
_service_singleton: PhotoInputService | None = None


def get_service(
    confidence_threshold: float = 0.30,
    max_processing_ms: int = 3000,
) -> PhotoInputService:
    """Return (and lazily create) the singleton PhotoInputService."""
    global _service_singleton
    if _service_singleton is None:
        _service_singleton = PhotoInputService(
            confidence_threshold=confidence_threshold,
            max_processing_ms=max_processing_ms,
        )
    return _service_singleton


# ---------------------------------------------------------------------------
# Self-test / CLI smoke-test
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import sys

    logging.basicConfig(level=logging.DEBUG)

    if len(sys.argv) < 2:
        print("Usage: python photo_input.py <image_file>")
        sys.exit(1)

    svc = get_service()
    try:
        res = svc.process_file(sys.argv[1])
        print(f"LaTeX     : {res.latex}")
        print(f"Type      : {res.problem_type.value}")
        print(f"Confidence: {res.confidence}")
        print(f"Alternatives: {res.alternatives}")
        print(f"Time      : {res.processing_ms} ms")
        if res.warnings:
            print(f"Warnings  : {res.warnings}")
    except Exception as exc:
        print(f"ERROR: {exc}")
        sys.exit(2)

    # Also test base64 round-trip if a second arg is given
    if len(sys.argv) > 2:
        with open(sys.argv[1], "rb") as fh:
            raw = fh.read()
        b64 = base64.b64encode(raw).decode()
        b64_with_prefix = f"data:image/jpeg;base64,{b64}"
        res2 = svc.process_base64(b64_with_prefix)
        print("\n--- base64 round-trip ---")
        print(f"LaTeX     : {res2.latex}")
        print(f"Type      : {res2.problem_type.value}")
        print(f"Confidence: {res2.confidence}")
