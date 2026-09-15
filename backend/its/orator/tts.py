"""tts.py — Natural Orator: text-to-speech engine for the ITS pipeline.

Turns tutoring turns and solver steps into speech (Hindi + English), with
deterministic caching so repeated content never re-synthesizes.

Adapters (chosen lazily by availability):
    EdgeTTSAdapter   — Microsoft edge-tts neural voices (hi-IN, en-IN).
                       Best quality/cost ratio; requires network.
    NullAdapter      — offline stub: returns the chunk plan so the caller
                       can render captions/limits without audio.

Teaching-aware chunking (the differentiator):
    speak_plan() splits a tutoring turn into speakable chunks with pause
    and emphasis markers driven by the Socratic phase — questions get a
    rising pause marker and a wait-for-answer flag, so the frontend can
    stop playback and wait for the student instead of talking over them.

Usage::

    engine = OratorEngine()                       # picks best adapter
    plan  = engine.speak_plan(content, phase="probe", lang="hi")
    for chunk in plan["chunks"]:
        audio = await engine.synthesize(chunk["text"], voice=plan["voice"])
"""

from __future__ import annotations

import hashlib
import os
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

# Phases where the tutor must stop and wait for the student's answer
_WAIT_PHASES = {"probe", "probe_q1", "probe_q2", "probe_q3", "probe_q4",
                "probe_q5", "challenge"}

# Sentence-ending pattern for chunk splitting (Devanagari danda included)
_SENTENCE_END = re.compile(r"(?<=[।.!?])\s+")

# Default voices per language
_VOICES = {
    "hi": "hi-IN-MadhurNeural",   # warm male Hindi voice
    "en": "en-IN-NeerjaNeural",   # Indian English female
}


@dataclass
class SpeakChunk:
    """One speakable chunk with delivery markers."""

    index: int
    text: str
    pause_after_ms: int = 250       # delivery pacing between chunks
    wait_for_student: bool = False  # True -> stop playback, await answer
    emphasis: List[str] = field(default_factory=list)  # words to stress

    def to_dict(self) -> Dict[str, Any]:
        return asdict_safe(self)


def asdict_safe(obj: Any) -> Dict[str, Any]:
    """Dataclass -> dict without importing dataclasses at call sites."""
    from dataclasses import asdict
    return asdict(obj)


def chunk_for_speech(text: str, phase: str = "teach",
                     max_words: int = 45) -> List[SpeakChunk]:
    """Split tutoring text into speakable chunks with delivery markers.

    Rules:
    - Split on sentence boundaries (Latin + Devanagari danda)
    - Long sentences are further split at max_words to keep audio snappy
    - Question sentences in probe phases get wait_for_student=True
    - Units and numbers get emphasis markers (students must hear them)
    """
    phase = (phase or "teach").lower()
    wait = phase in _WAIT_PHASES
    chunks: List[SpeakChunk] = []

    text = re.sub(r"\s+", " ", (text or "").strip())
    if not text:
        return chunks

    sentences = _SENTENCE_END.split(text)
    idx = 0
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
        words = sentence.split(" ")
        for i in range(0, len(words), max_words):
            part = " ".join(words[i:i + max_words])
            is_question = part.endswith("?")
            emphasis = re.findall(r"\b\d+(?:[.,]\d+)?\s*(?:km|kg|ms|cm|m|s|N|J|W|%)\b",
                                  part)
            chunks.append(SpeakChunk(
                index=idx,
                text=part,
                pause_after_ms=600 if is_question else 250,
                wait_for_student=(wait and is_question) or (wait and idx == 0 and phase.startswith("probe")),
                emphasis=emphasis,
            ))
            idx += 1
    if chunks:
        chunks[-1].wait_for_student = chunks[-1].wait_for_student or wait
    return chunks


def cache_key(text: str, voice: str, rate: str = "+0%") -> str:
    """Deterministic cache key: same text+voice+rate = same audio file."""
    payload = f"{voice}|{rate}|{text}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()[:24]


class EdgeTTSAdapter:
    """Neural TTS via edge-tts (lazy import; async synth to bytes)."""

    def __init__(self, cache_dir: Optional[str] = None) -> None:
        self.cache_dir = cache_dir or os.environ.get(
            "TTS_CACHE_DIR",
            os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                         "..", "cbse_data", "tts_cache"),
        )
        os.makedirs(self.cache_dir, exist_ok=True)
        self._edge_tts = None

    def _module(self):
        if self._edge_tts is None:
            try:
                import edge_tts  # type: ignore
                self._edge_tts = edge_tts
            except ImportError:
                raise RuntimeError(
                    "edge-tts is not installed — run: pip install edge-tts"
                )
        return self._edge_tts

    async def synthesize(self, text: str, voice: str, rate: str = "+0%") -> bytes:
        key = cache_key(text, voice, rate)
        path = os.path.join(self.cache_dir, f"{key}.mp3")
        if os.path.exists(path):
            with open(path, "rb") as fh:
                return fh.read()
        edge = self._module()
        import asyncio
        communicate = edge.Communicate(text, voice=voice, rate=rate)
        buf = bytearray()
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                buf.extend(chunk["data"])
        audio = bytes(buf)
        with open(path, "wb") as fh:  # cache for next time
            fh.write(audio)
        return audio


class NullAdapter:
    """Offline stub: reports what *would* be spoken (for tests/captions)."""

    async def synthesize(self, text: str, voice: str, rate: str = "+0%") -> bytes:
        raise RuntimeError("TTS adapter unavailable — serve captions instead")


class OratorEngine:
    """Public entry: text/turn -> chunk plan -> audio bytes."""

    def __init__(self, adapter=None, cache_dir: Optional[str] = None) -> None:
        self.adapter = adapter or self._pick_adapter(cache_dir)

    @staticmethod
    def _pick_adapter(cache_dir: Optional[str]):
        try:
            import edge_tts  # noqa: F401
            return EdgeTTSAdapter(cache_dir)
        except ImportError:
            return NullAdapter()

    @staticmethod
    def voice_for(lang: str = "en") -> str:
        return _VOICES.get((lang or "en")[:2].lower(), _VOICES["en"])

    def speak_plan(self, content: Any, phase: str = "teach",
                   lang: str = "en") -> Dict[str, Any]:
        """Tutoring turn content -> full speech plan for the frontend.

        ``content``: str, or dict with a "text"/"explanation"/"walkthrough" key.
        """
        if isinstance(content, dict):
            text = (content.get("text") or content.get("explanation")
                    or content.get("walkthrough") or "")
        else:
            text = str(content or "")
        chunks = [c.to_dict() for c in chunk_for_speech(text, phase=phase)]
        return {
            "voice": self.voice_for(lang),
            "lang": (lang or "en")[:2].lower(),
            "phase": phase,
            "chunks": chunks,
            "wait_for_student": any(c["wait_for_student"] for c in chunks),
        }

    async def synthesize(self, text: str, lang: str = "en",
                         rate: str = "+0%") -> bytes:
        return await self.adapter.synthesize(
            text, voice=self.voice_for(lang), rate=rate
        )
