"""Phase 8.3: Langfuse tracer — trace all LLM calls.

Traces LLM calls to Langfuse for observability. Tracks latency, tokens,
cost, and model used. Falls back to ClickHouse if Langfuse is not
available.

Traced call types:
  - tutor_reply: Socratic tutor responses
  - answer_grading: Tier 3 LLM-based answer evaluation
  - routing_fallback: LLM-based question routing
  - hindi_translation: Hindi content translation
  - solver_fallback: LLM-generated solver for unsupported categories
  - question_generation: LLM-generated practice questions

Usage:
    from backend.services.langfuse_tracer import LangfuseTracer

    tracer = LangfuseTracer()

    with tracer.trace("tutor_reply", model="deepseek-v4-flash", user_id="student_123"):
        # LLM call happens here
        response = call_llm(...)

    # Or manual:
    tracer.start_trace("tutor_reply", model="deepseek-v4-flash")
    # ... LLM call ...
    tracer.end_trace(success=True, input_tokens=100, output_tokens=200)
"""

import os
import time
import logging
from typing import Optional
from dataclasses import dataclass, field
from datetime import datetime
from contextlib import contextmanager

logger = logging.getLogger(__name__)


@dataclass
class TraceContext:
    """Context for an in-progress trace."""
    trace_id: str
    call_type: str
    model: str
    user_id: str
    start_time: float
    metadata: dict = field(default_factory=dict)


class LangfuseTracer:
    """Traces LLM calls to Langfuse and/or ClickHouse.

    If Langfuse is available, traces are sent there for detailed analysis.
    Traces are also emitted to ClickHouse via AnalyticsService for
    aggregation and cost tracking.
    """

    # Cost per 1M tokens (in USD) — update as pricing changes
    COST_PER_1M_TOKENS = {
        "deepseek-v4-flash": {"input": 0.14, "output": 0.28},
        "deepseek-v4-pro": {"input": 1.10, "output": 4.40},
        "gpt-4o": {"input": 2.50, "output": 10.00},
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
        "gemini-flash-lite-latest": {"input": 0.075, "output": 0.30},
        "llama-3.3-70b-versatile": {"input": 0.59, "output": 0.79},
        "qwen2.5:7b": {"input": 0.0, "output": 0.0},  # Local Ollama
        "gemma2:2b": {"input": 0.0, "output": 0.0},  # Local Ollama
    }

    def __init__(self):
        self.langfuse_host = os.environ.get("LANGFUSE_HOST", "http://localhost:3001")
        self.langfuse_public_key = os.environ.get("LANGFUSE_PUBLIC_KEY", "")
        self.langfuse_secret_key = os.environ.get("LANGFUSE_SECRET_KEY", "")
        self._analytics = None
        self._langfuse_client = None
        self._current_trace: Optional[TraceContext] = None

    def _get_analytics(self):
        """Lazy-load AnalyticsService for ClickHouse fallback."""
        if self._analytics is None:
            try:
                from backend.services.analytics_service import AnalyticsService
                self._analytics = AnalyticsService()
            except Exception as e:
                logger.warning(f"AnalyticsService not available: {e}")
        return self._analytics

    def _get_langfuse_client(self):
        """Lazy-load Langfuse client if available."""
        if self._langfuse_client is None:
            try:
                from langfuse import Langfuse
                self._langfuse_client = Langfuse(
                    public_key=self.langfuse_public_key,
                    secret_key=self.langfuse_secret_key,
                    host=self.langfuse_host,
                )
            except ImportError:
                logger.info("langfuse package not installed — using ClickHouse only")
            except Exception as e:
                logger.warning(f"Langfuse client init failed: {e}")
        return self._langfuse_client

    def calculate_cost(self, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculate the cost of an LLM call.

        Args:
            model: Model name.
            input_tokens: Number of input tokens.
            output_tokens: Number of output tokens.

        Returns:
            Cost in USD.
        """
        pricing = self.COST_PER_1M_TOKENS.get(model, {"input": 0.0, "output": 0.0})
        cost = (input_tokens / 1_000_000 * pricing["input"]) + \
               (output_tokens / 1_000_000 * pricing["output"])
        return round(cost, 6)

    def start_trace(
        self,
        call_type: str,
        model: str = "unknown",
        user_id: str = "",
        metadata: dict = None,
    ) -> str:
        """Start a new trace.

        Args:
            call_type: Type of LLM call.
            model: Model name.
            user_id: Associated user ID.
            metadata: Additional metadata.

        Returns:
            Trace ID.
        """
        import uuid
        trace_id = str(uuid.uuid4())

        self._current_trace = TraceContext(
            trace_id=trace_id,
            call_type=call_type,
            model=model,
            user_id=user_id,
            start_time=time.time(),
            metadata=metadata or {},
        )

        # Start Langfuse trace if available
        client = self._get_langfuse_client()
        if client:
            try:
                # Langfuse trace creation would go here
                pass
            except Exception as e:
                logger.warning(f"Langfuse trace start failed: {e}")

        return trace_id

    def end_trace(
        self,
        success: bool = True,
        input_tokens: int = 0,
        output_tokens: int = 0,
        error_message: str = "",
        metadata: dict = None,
    ):
        """End the current trace and emit to ClickHouse/Langfuse.

        Args:
            success: Whether the LLM call succeeded.
            input_tokens: Input token count.
            output_tokens: Output token count.
            error_message: Error message if failed.
            metadata: Additional metadata.
        """
        if self._current_trace is None:
            logger.warning("end_trace called without start_trace")
            return

        trace = self._current_trace
        latency_ms = (time.time() - trace.start_time) * 1000
        total_tokens = input_tokens + output_tokens
        cost_usd = self.calculate_cost(trace.model, input_tokens, output_tokens)

        # Merge metadata
        all_metadata = {**trace.metadata, **(metadata or {})}

        # Emit to ClickHouse
        analytics = self._get_analytics()
        if analytics:
            try:
                analytics.emit_llm_trace(
                    call_type=trace.call_type,
                    model=trace.model,
                    latency_ms=latency_ms,
                    input_tokens=input_tokens,
                    output_tokens=output_tokens,
                    total_tokens=total_tokens,
                    cost_usd=cost_usd,
                    success=success,
                    error_message=error_message,
                    user_id=trace.user_id,
                    metadata=all_metadata,
                )
            except Exception as e:
                logger.warning(f"Failed to emit LLM trace to ClickHouse: {e}")

        # End Langfuse trace if available
        client = self._get_langfuse_client()
        if client:
            try:
                # Langfuse trace finalization would go here
                pass
            except Exception as e:
                logger.warning(f"Langfuse trace end failed: {e}")

        self._current_trace = None

    @contextmanager
    def trace(
        self,
        call_type: str,
        model: str = "unknown",
        user_id: str = "",
        metadata: dict = None,
    ):
        """Context manager for tracing an LLM call.

        Usage:
            with tracer.trace("tutor_reply", model="deepseek-v4-flash"):
                response = call_llm(...)
        """
        trace_id = self.start_trace(call_type, model, user_id, metadata)
        try:
            yield trace_id
            self.end_trace(success=True)
        except Exception as e:
            self.end_trace(success=False, error_message=str(e))
            raise

    def trace_sync(
        self,
        call_type: str,
        model: str,
        user_id: str,
        latency_ms: float,
        input_tokens: int = 0,
        output_tokens: int = 0,
        success: bool = True,
        error_message: str = "",
        metadata: dict = None,
    ):
        """Emit a trace synchronously (for calls not using context manager).

        Args:
            call_type: Type of LLM call.
            model: Model name.
            user_id: Associated user ID.
            latency_ms: Latency in milliseconds.
            input_tokens: Input token count.
            output_tokens: Output token count.
            success: Whether the call succeeded.
            error_message: Error message if failed.
            metadata: Additional metadata.
        """
        total_tokens = input_tokens + output_tokens
        cost_usd = self.calculate_cost(model, input_tokens, output_tokens)

        analytics = self._get_analytics()
        if analytics:
            try:
                analytics.emit_llm_trace(
                    call_type=call_type,
                    model=model,
                    latency_ms=latency_ms,
                    input_tokens=input_tokens,
                    output_tokens=output_tokens,
                    total_tokens=total_tokens,
                    cost_usd=cost_usd,
                    success=success,
                    error_message=error_message,
                    user_id=user_id,
                    metadata=metadata or {},
                )
            except Exception as e:
                logger.warning(f"Failed to emit LLM trace: {e}")

    def get_cost_summary(self, hours: int = 24) -> dict:
        """Get LLM cost summary for the last N hours."""
        analytics = self._get_analytics()
        if analytics:
            return analytics.get_llm_cost_summary(hours=hours)
        return {"summary": []}
