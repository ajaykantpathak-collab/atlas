# Self-Evolving Intelligence Layer for K-12 Learning Platform
## Technical Architecture Document

---

## Executive Summary

This document proposes a **multi-loop, feedback-driven intelligence system** that continuously improves from every student interaction. Unlike a static LLM wrapper that generates responses from fixed prompts, this system builds a persistent, structured knowledge base of what actually works—calibrating question difficulty, discovering real misconceptions from error patterns, mining concept dependencies from student transitions, and optimizing teaching strategies through controlled experimentation.

**Key differentiator**: The system has **memory and learning loops**. It doesn't just tutor—it studies itself getting smarter.

---

## 1. Architecture Overview

### 1.1 Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      STUDENT INTERACTION                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────▼────────────────────┐
        │     API Gateway (FastAPI)              │
        │     Rate limiting, auth, routing        │
        └───────────────────┬────────────────────┘
                            │
        ┌───────────────────▼────────────────────┐
        │  1. Interaction Capture Service         │
        │     - Validate & normalize              │
        │     - Write to PostgreSQL               │
        │     - Update BKT knowledge state        │
        │     - Publish to message queue          │
        └───┬──────────────────────┬──────────────┘
            │                      │
            │ (real-time)          │ (async)
            │                      │
    ┌───────▼──────────┐   ┌───────▼──────────────┐
    │ 2. Real-Time     │   │ 3. Message Queue     │
    │    Intelligence  │   │    (Redis Streams)   │
    │    Service       │   └───────┬──────────────┘
    │    (<200ms)      │           │
    └───┬──────────────┘           │
        │                          │
        │              ┌───────────▼──────────────┐
        │              │ 4. ClickHouse Consumer    │
        │              │    (writes to analytics)  │
        │              └──────────────────────────┘
        │
        ├──────────────┬──────────────┬──────────────┐
        │              │              │              │
    ┌───▼──────┐  ┌───▼──────┐  ┌───▼──────┐  ┌───▼──────────┐
    │ Qdrant   │  │PostgreSQL│  │  Redis   │  │  Claude API  │
    │(vectors) │  │ (state)  │  │  (cache) │  │  (reasoning) │
    └──────────┘  └──────────┘  └──────────┘  └──────────────┘
        │              │              │              │
        │              │              │              │
        └──────────────┴──────────────┴──────────────┘
                            │
        ┌───────────────────▼────────────────────┐
        │  5. Nightly Learning Pipeline (Jobs)    │
        │     - Misconception Discovery            │
        │     - Concept Dependency Mining          │
        │     - Strategy Effectiveness             │
        │     - Difficulty Calibration             │
        │     - Content Gap Detection              │
        │     - Learning Style Updates             │
        └─────────────────────────────────────────┘
                            │
                    Updates all stores
                            │
        ┌───────────────────▼────────────────────┐
        │  6. Feedback Loop: Better tomorrow     │
        │     than today                         │
        └─────────────────────────────────────────┘
```

### 1.2 Time-Scale Breakdown

| Time Scale | Component | Purpose | Latency Target |
|------------|-----------|---------|----------------|
| **<200ms** | Real-Time Intelligence | Serve student, retrieve content, call Claude | 200ms hard limit |
| **<5s** | Interaction Capture | Write to DB, update knowledge state | 5s soft limit |
| **Hourly** | Difficulty Calibration | Update IRT parameters | 1 hour window |
| **Daily (2am-6am)** | Learning Jobs | Misconceptions, dependencies, strategies | 4 hour window |
| **Weekly** | Content Gap Analysis | Flag struggling concepts | 7 day window |

---

## 2. Data Model: What We Capture From Every Interaction

### 2.1 Core Interaction Schema

Every student interaction generates structured data:

```json
{
  "interaction_id": "uuid",
  "student_id": 12345,
  "session_id": "uuid",
  "timestamp": "2025-01-15T10:30:00Z",
  
  "context": {
    "subject": "Mathematics",
    "chapter": "Quadratic Equations",
    "concept": "discriminant_nature",
    "curriculum_node_id": 4521,
    "grade_level": 10,
    "language": "en"  // or "hi"
  },
  
  "interaction": {
    "type": "question_attempt",  // question_attempt, hint_request, simulation_interaction, socratic_turn
    "question_id": 78901,
    "response": {
      "selected_option": "B",
      "is_correct": false,
      "partial_score": 0.0,
      "time_to_respond_ms": 45000,
      "attempt_number": 2,
      "hints_used": 1,
      "hint_sequence": ["hint_1", "hint_3"],
      "error_type": "sign_error"  // structured classification
    }
  },
  
  "teaching_context": {
    "strategy_used": "socratic_guided_discovery",
    "strategy_sequence": ["worked_example", "guided_practice", "independent"],
    "misconceptions_detected": ["sign_error_in_discriminant"],
    "previous_mastery": 0.35
  },
  
  "outcome": {
    "knowledge_state_after": {"discriminant_nature": 0.55, "quadratic_formula": 0.80},
    "engagement_score": 0.72,
    "frustration_signals": false,
    "mastery_achieved": false
  }
}
```

### 2.2 What We Collect Per Interaction Type

| Interaction Type | Critical Fields | Purpose |
|------------------|-----------------|---------|
| **Question Attempt** | Correctness, time, hints, error type | Difficulty calibration, misconception discovery |
| **Hint Request** | Hint level, time after hint, subsequent correctness | Hint effectiveness, frustration detection |
| **Simulation** | Time spent, parameter changes, outcomes | Learning style inference, engagement tracking |
| **Socratic Turn** | Conversation turns, hints used, eventual correctness | Teaching strategy effectiveness, misconception depth |
| **Navigation** | Time on page, scroll depth, back-button usage | Engagement patterns, content difficulty signals |

---

## 3. Database Schema: New Tables

### 3.1 PostgreSQL Tables (Structured State)

```sql
-- ============================================
-- 1. INTERACTION OUTCOMES (Core fact table)
-- ============================================
CREATE TABLE interaction_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id INT NOT NULL,
    session_id UUID NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Curriculum context
    subject VARCHAR(50) NOT NULL,
    chapter VARCHAR(100) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    curriculum_node_id INT NOT NULL,
    grade_level INT NOT NULL,
    
    -- Interaction type
    interaction_type VARCHAR(50) NOT NULL, 
    -- 'question_attempt' | 'hint_request' | 'simulation' | 'socratic_turn'
    
    -- Response data (nullable based on type)
    question_id INT,
    response JSONB,
    is_correct BOOLEAN,
    partial_score FLOAT CHECK (partial_score >= 0 AND partial_score <= 1),
    time_to_respond_ms INT,
    hints_used INT DEFAULT 0,
    hint_sequence TEXT[],
    error_type VARCHAR(100),
    
    -- Teaching context
    teaching_strategy VARCHAR(100),
    strategy_sequence TEXT[],
    misconceptions_detected TEXT[],
    
    -- Knowledge state (JSONB for flexibility)
    knowledge_state_before JSONB,
    knowledge_state_after JSONB,
    
    -- Metadata
    language VARCHAR(10) DEFAULT 'en',
    device_type VARCHAR(20),
    engagement_score FLOAT CHECK (engagement_score >= 0 AND engagement_score <= 1),
    frustration_signals BOOLEAN DEFAULT FALSE,
    mastery_achieved BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_interactions_student_time ON interaction_outcomes(student_id, timestamp DESC);
CREATE INDEX idx_interactions_concept_time ON interaction_outcomes(concept, timestamp DESC);
CREATE INDEX idx_interactions_question ON interaction_outcomes(question_id) WHERE question_id IS NOT NULL;
CREATE INDEX idx_interactions_strategy ON interaction_outcomes(teaching_strategy, concept);
CREATE INDEX idx_interactions_language ON interaction_outcomes(language, concept);

-- ============================================
-- 2. MISCONCEPTION DATABASE (Discovered patterns)
-- ============================================
CREATE TABLE misconceptions (
    id SERIAL PRIMARY KEY,
    misconception_key VARCHAR(200) UNIQUE NOT NULL,
    -- Format: "{concept}:{error_pattern_hash}"
    
    subject VARCHAR(50) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    grade_level INT NOT NULL,
    
    -- Content (bilingual)
    name_en TEXT NOT NULL,
    description_en TEXT NOT NULL,
    remediation_approach_en TEXT NOT NULL,
    name_hi TEXT,
    description_hi TEXT,
    remediation_approach_hi TEXT,
    
    -- Evidence metrics
    occurrence_count INT DEFAULT 1,
    student_count INT DEFAULT 1,
    confidence_score FLOAT NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    -- 0.7+ = strong evidence, 0.5-0.7 = potential, <0.5 = weak
    
    -- Remediation
    recommended_strategy VARCHAR(100),
    remediation_content_ids INT[],
    
    -- Metadata
    first_discovered TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by VARCHAR(100),
    verified_at TIMESTAMPTZ,
    
    INDEX idx_misconception_concept (concept),
    INDEX idx_misconception_confidence (confidence_score DESC)
);

CREATE TABLE misconception_evidence (
    id SERIAL PRIMARY KEY,
    misconception_id INT NOT NULL REFERENCES misconceptions(id),
    student_id INT NOT NULL,
    question_id INT,
    interaction_id UUID REFERENCES interaction_outcomes(id),
    error_pattern JSONB NOT NULL,
    evidence_strength FLOAT,
    discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    INDEX idx_evidence_misconception (misconception_id),
    INDEX idx_evidence_student (student_id)
);

-- ============================================
-- 3. CONCEPT DEPENDENCY GRAPH (Learned, not just specified)
-- ============================================
CREATE TABLE concept_dependencies (
    id SERIAL PRIMARY KEY,
    source_concept VARCHAR(100) NOT NULL,
    target_concept VARCHAR(100) NOT NULL,
    -- source_concept is prerequisite for target_concept
    
    subject VARCHAR(50) NOT NULL,
    grade_level INT NOT NULL,
    
    -- Strength metrics
    strength FLOAT NOT NULL CHECK (strength >= 0 AND strength <= 1),
    confidence FLOAT NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    support_count INT NOT NULL,  -- number of student transitions observed
    
    -- Statistical evidence
    pmi_score FLOAT,  -- pointwise mutual information
    conditional_probability FLOAT,  -- P(master target | mastered source)
    
    -- Discovery & validation
    discovery_method VARCHAR(50),  -- 'pmc', 'bayesian', 'transition_mining'
    discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_validated TIMESTAMPTZ,
    is_verified BOOLEAN DEFAULT FALSE,
    
    UNIQUE(source_concept, target_concept, subject, grade_level)
);

CREATE INDEX idx_dependencies_target ON concept_dependencies(target_concept, subject, grade_level);

-- ============================================
-- 4. TEACHING STRATEGY EFFECTIVENESS
-- ============================================
CREATE TABLE teaching_strategy_outcomes (
    id SERIAL PRIMARY KEY,
    strategy_name VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    grade_level INT NOT NULL,
    
    -- Cohort metrics
    student_count INT NOT NULL,
    total_interactions INT NOT NULL,
    observation_window_days INT NOT NULL,
    
    -- Effectiveness metrics
    avg_knowledge_gain FLOAT NOT NULL,
    avg_time_to_mastery FLOAT,  -- in minutes, NULL if not achieved
    mastery_rate FLOAT NOT NULL CHECK (mastery_rate >= 0 AND mastery_rate <= 1),
    retention_rate FLOAT,  -- % retaining after 7 days
    engagement_score FLOAT NOT NULL CHECK (engagement_score >= 0 AND engagement_score <= 1),
    error_reduction_rate FLOAT,
    
    -- Statistical comparison
    baseline_strategy VARCHAR(100),
    lift_vs_baseline FLOAT,  -- percentage improvement
    confidence_interval FLOAT,
    is_significant BOOLEAN,  -- p < 0.05
    
    -- Metadata
    observation_start TIMESTAMPTZ NOT NULL,
    observation_end TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(strategy_name, subject, concept, grade_level, observation_end),
    INDEX idx_strategy_effectiveness ON teaching_strategy_outcomes(strategy_name, concept, is_significant DESC, mastery_rate DESC)
);

CREATE TABLE student_strategy_history (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    strategy_name VARCHAR(100) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_by VARCHAR(50) NOT NULL,  -- 'system' | 'teacher' | 'default'
    outcome_measured BOOLEAN DEFAULT FALSE,
    outcome_data JSONB,
    
    INDEX idx_student_strategy_history (student_id, concept)
);

-- ============================================
-- 5. QUESTION DIFFICULTY CALIBRATION
-- ============================================
CREATE TABLE question_difficulty (
    question_id INT PRIMARY KEY,
    
    -- IRT parameters (2PL model: a, b, c)
    difficulty_parameter FLOAT NOT NULL DEFAULT 0.0,  -- b: difficulty
    discrimination_parameter FLOAT DEFAULT 1.0,  -- a: how well it discriminates
    guessing_parameter FLOAT DEFAULT 0.25,  -- c: chance of guessing correctly
    
    -- Calibration metadata
    calibration_count INT NOT NULL DEFAULT 0,
    last_calibrated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confidence_interval FLOAT DEFAULT 1.0,
    
    -- Language variants
    difficulty_en FLOAT,
    difficulty_hi FLOAT,
    
    -- Quality flags
    is_calibrated BOOLEAN DEFAULT FALSE,
    needs_recalibration BOOLEAN DEFAULT FALSE,
    quality_flag VARCHAR(50),  -- 'excellent' | 'good' | 'poor' | 'insufficient_data'
);

-- ============================================
-- 6. CONTENT GAP FLAGS
-- ============================================
CREATE TABLE content_gap_flags (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    concept VARCHAR(100) NOT NULL,
    grade_level INT NOT NULL,
    
    -- Gap evidence
    avg_error_rate FLOAT NOT NULL,
    remediation_attempts INT DEFAULT 0,
    affected_student_count INT NOT NULL,
    evidence_snapshot JSONB,  -- sample of struggling students
    
    -- Severity classification
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    gap_type VARCHAR(50),  -- 'missing_content' | 'insufficient_practice' | 'prerequisite_gap' | 'poor_explanation'
    
    -- Action items
    recommended_action TEXT,
    content_ids_to_create INT[],
    prerequisite_concepts TEXT[],
    
    -- Metadata
    flagged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    content_created_ids INT[],
    
    INDEX idx_gap_severity ON content_gap_flags(severity, resolved),
    INDEX idx_gap_concept ON content_gap_flags(concept)
);

-- ============================================
-- 7. LEARNING STYLE PROFILES (Per student)
-- ============================================
CREATE TABLE learning_style_profiles (
    student_id INT PRIMARY KEY,
    
    -- Style dimensions (0-1, updated incrementally)
    visual_preference FLOAT DEFAULT 0.5,
    auditory_preference FLOAT DEFAULT 0.5,
    kinesthetic_preference FLOAT DEFAULT 0.5,
    reading_preference FLOAT DEFAULT 0.5,
    
    -- Cognitive traits
    working_memory_capacity FLOAT DEFAULT 0.5,
    processing_speed FLOAT DEFAULT 0.5,
    attention_span_minutes FLOAT DEFAULT 15.0,
    error_recovery_speed FLOAT DEFAULT 0.5,
    
    -- Strategy effectiveness (JSONB: {strategy_name: effectiveness_score})
    strategy_effectiveness JSONB DEFAULT '{}',
    best_performing_strategies TEXT[] DEFAULT '{}',
    worst_performing_strategies TEXT[] DEFAULT '{}',
    
    -- Engagement patterns
    optimal_session_length_minutes FLOAT DEFAULT 20.0,
    preferred_difficulty FLOAT DEFAULT 0.5,
    preferred_pace VARCHAR(20) DEFAULT 'medium',  -- 'slow' | 'medium' | 'fast'
    optimal_hint_timing VARCHAR(20) DEFAULT 'after_first_error',
    
    -- Engagement signals
    avg_session_duration_minutes FLOAT DEFAULT 20.0,
    dropout_rate FLOAT DEFAULT 0.0,
    repeat_visit_rate FLOAT DEFAULT 0.0,
    
    -- Metadata
    total_interactions INT DEFAULT 0,
    profile_confidence FLOAT DEFAULT 0.0 CHECK (profile_confidence >= 0 AND profile_confidence <= 1),
    -- 0.0 = new student, 1.0 = high confidence
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 8. SOCRATIC SESSIONS (AI tutoring memory)
-- ============================================
CREATE TABLE socratic_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id INT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    
    -- Context
    concept VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    grade_level INT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    
    -- Conversation (structured)
    turns JSONB NOT NULL DEFAULT '[]',
    -- Array of: {role: "tutor"|"student", content: "...", timestamp: "...", metadata: {}}
    turn_count INT DEFAULT 0,
    
    -- Session outcome
    mastery_achieved BOOLEAN,
    misconceptions_identified TEXT[],
    hints_used INT DEFAULT 0,
    session_effectiveness FLOAT,
    
    INDEX idx_socratic_student ON socratic_sessions(student_id),
    INDEX idx_socratic_concept ON socratic_sessions(concept)
);

-- ============================================
-- 9. CLAUDE API TRACKING & CACHING
-- ============================================
CREATE TABLE claude_reasoning_cache (
    cache_key VARCHAR(200) PRIMARY KEY,
    prompt_hash VARCHAR(64) NOT NULL,
    response JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    hit_count INT DEFAULT 1,
    last_used TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    language VARCHAR(10),
    endpoint VARCHAR(100),
    
    INDEX idx_cache_last_used ON claude_reasoning_cache(last_used)
);

CREATE TABLE claude_token_usage (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    endpoint VARCHAR(100) NOT NULL,
    input_tokens INT NOT NULL,
    output_tokens INT NOT NULL,
    total_tokens INT NOT NULL,
    cache_hit BOOLEAN DEFAULT FALSE,
    language VARCHAR(10),
    
    INDEX idx_token_usage_date ON claude_token_usage(date, endpoint)
);

-- ============================================
-- 10. STRATEGY RECOMMENDATION CACHE
-- ============================================
CREATE TABLE strategy_recommendations (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    concept VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    
    recommended_strategies JSONB NOT NULL,
    -- Array of: [{strategy: "name", confidence: 0.8, expected_effectiveness: 0.75}, ...]
    
    knowledge_state JSONB,
    learning_style_profile JSONB,
    confidence FLOAT NOT NULL,
    
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    
    UNIQUE(student_id, concept, subject),
    INDEX idx_strategy_rec_expires ON strategy_recommendations(expires_at)
);
```

### 3.2 ClickHouse Tables (Analytics)

```sql
-- Hourly aggregated metrics for fast dashboard queries
CREATE TABLE interaction_metrics_hourly
(
    timestamp DateTime,
    hour_start DateTime,
    student_id INT,
    subject VARCHAR(50),
    concept VARCHAR(100),
    grade_level INT,
    language VARCHAR(10),
    
    -- Volume
    interaction_count INT DEFAULT 0,
    question_count INT DEFAULT 0,
    hint_count INT DEFAULT 0,
    simulation_count INT DEFAULT 0,
    socratic_turn_count INT DEFAULT 0,
    
    -- Performance
    correct_count INT DEFAULT 0,
    incorrect_count INT DEFAULT 0,
    partial_count INT DEFAULT 0,
    accuracy FLOAT DEFAULT 0,
    avg_time_to_respond_ms FLOAT DEFAULT 0,
    hints_per_question FLOAT DEFAULT 0,
    
    -- Engagement
    avg_engagement_score FLOAT DEFAULT 0,
    session_count INT DEFAULT 0,
    avg_session_duration_minutes FLOAT DEFAULT 0
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (hour_start, student_id, subject, concept)
TTL timestamp + INTERVAL 2 YEAR;

-- Concept mastery tracking over time
CREATE TABLE concept_mastery_timeseries
(
    timestamp DateTime,
    student_id INT,
    concept VARCHAR(100),
    subject VARCHAR(50),
    grade_level INT,
    
    mastery_probability FLOAT,
    interactions_in_concept INT,
    days_since_first_exposure INT,
    last_interaction_type VARCHAR(50),
    knowledge_state JSONB
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (student_id, concept, timestamp)
TTL timestamp + INTERVAL 3 YEAR;

-- Question effectiveness tracking
CREATE TABLE question_effectiveness_timeseries
(
    timestamp DateTime,
    question_id INT,
    concept VARCHAR(100),
    subject VARCHAR(50),
    
    attempts INT DEFAULT 0,
    correct_count INT DEFAULT 0,
    avg_time FLOAT DEFAULT 0,
    hint_usage_rate FLOAT DEFAULT 0,
    effectiveness_score FLOAT DEFAULT 0,
    -- Composite: (accuracy * (1 - hint_rate) * (1 / normalized_time))
    
    INDEX idx_question_effectiveness (question_id, effectiveness_score)
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (question_id, timestamp)
TTL timestamp + INTERVAL 2 YEAR;

-- Language-specific performance
CREATE TABLE language_performance_timeseries
(
    timestamp DateTime,
    subject VARCHAR(50),
    concept VARCHAR(100),
    language VARCHAR(10),
    
    attempts INT DEFAULT 0,
    accuracy FLOAT DEFAULT 0,
    avg_time FLOAT DEFAULT 0,
    engagement_score FLOAT DEFAULT 0,
    
    student_count INT DEFAULT 0
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (subject, concept, language, timestamp)
TTL timestamp + INTERVAL 2 YEAR;
```

### 3.3 Qdrant Collections (Vector Search Extensions)

**Existing:**
- `question_embeddings` - for content retrieval

**New:**
- `misconception_embeddings` - for finding similar misconceptions
- `strategy_embeddings` - for retrieving relevant teaching strategies
- `error_pattern_embeddings` - for clustering errors

---

## 4. Data Flow: A Single Interaction

Let's trace a real interaction through the system to see how learning happens:

### 4.1 Step-by-Step: Student Attempts Question

**Step 1: Student submits answer**
```
POST /api/v1/interactions
{
  "student_id": 12345,
  "question_id": 78901,
  "response": {"selected_option": "B", "time_ms": 45000},
  "session_id": "uuid-123"
}
```

**Step 2: Interaction Capture Service (5ms)**
```python
# FastAPI endpoint
@app.post("/api/v1/interactions")
async def capture_interaction(data: InteractionRequest):
    # 1. Validate
    question = await db.get_question(data.question_id)
    concept = await db.get_concept(question.concept_id)
    is_correct = data.response.selected_option == question.correct_answer
    
    # 2. Write to PostgreSQL
    interaction = await db.execute("""
        INSERT INTO interaction_outcomes 
        (student_id, session_id, subject, chapter, concept, 
         curriculum_node_id, grade_level, interaction_type, 
         question_id, response, is_correct, time_to_respond_ms,
         language, knowledge_state_before)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'question_attempt', 
                $8, $9, $10, $11, $12, $13)
        RETURNING id
    """, student_id, session_id, ...)
    
    # 3. Update BKT knowledge state (real-time)
    new_mastery = await bkt_engine.update_mastery(
        student_id, concept.id, is_correct, time_to_respond_ms
    )
    
    # 4. Publish event
    await redis.xadd("interaction_stream", {
        "interaction_id": interaction.id,
        "student_id": student_id,
        "concept": concept.name,
        "is_correct": is_correct,
        "timestamp": datetime.utcnow().isoformat()
    })
    
    # 5. Invalidate strategy cache for this student-concept
    await redis.delete(f"strategy_rec:{student_id}:{concept.name}")
    
    return {"interaction_id": interaction.id, "mastery_probability": new_mastery}
```

**Step 3: Real-Time Intelligence Service (<150ms remaining budget)**

```python
async def get_next_content(student_id: int, concept: str) -> dict:
    start_time = time.time()
    
    # 1. Load student state (10ms)
    knowledge_state = await db.get_knowledge_state(student_id, concept)
    learning_style = await db.get_learning_style(student_id)
    
    # 2. Get recommended strategy (5ms, usually cached)
    strategy_rec = await get_cached_strategy_recommendation(student_id, concept)
    if not strategy_rec:
        # Cache miss - query from DB (rare, ~5% of requests)
        strategy_rec = await db.get_best_strategy_for_concept(
            concept, 
            student_profile=learning_style
        )
    
    # 3. Get relevant misconceptions (10ms from Qdrant)
    misconceptions = await qdrant.search(
        collection_name="misconception_embeddings",
        query_vector=embed(concept + " misconceptions"),
        limit=5,
        filter={"concept": concept, "confidence__gte": 0.7}
    )
    
    # 4. Retrieve content from Qdrant (15ms)
    difficulty_target = calculate_difficulty_target(knowledge_state)
    questions = await qdrant.search(
        collection_name="question_embeddings",
        query_vector=embed(f"{concept} difficulty:{difficulty_target}"),
        limit=10,
        filter={
            "concept": concept,
            "difficulty__range": [difficulty_target - 0.2, difficulty_target + 0.2],
            "language": student_language
        }
    )
    
    # 5. Select best question using IRT (5ms)
    best_question = select_optimal_question(
        questions, 
        knowledge_state,
        discrimination_weights=learning_style
    )
    
    # Total: ~45ms, well under 200ms budget
    return {
        "question": best_question,
        "strategy": strategy_rec,
        "misconceptions_to_watch": misconceptions,
        "knowledge_state": knowledge_state
    }
```

**Step 4: Socratic Tutoring (when needed)**

When student requests help or fails twice:
```python
async def socratic_tutor(session_id: UUID, student_id: int, concept: str) -> dict:
    # Load session context (5ms)
    session = await db.get_session(session_id)
    
    # Prepare context (10ms)
    context = {
        "concept": concept,
        "student_knowledge_state": await db.get_knowledge_state(student_id, concept),
        "misconceptions": await get_active_misconceptions(student_id, concept),
        "teaching_strategy": await get_current_strategy(student_id, concept),
        "conversation_history": session.turns[-5:],  # last 5 turns
        "grade_level": await db.get_grade_level(student_id),
        "language": await db.get_language_preference(student_id)
    }
    
    # Check cache first (2ms)
    cache_key = hash(f"socratic:{context['concept']}:{context['teaching_strategy']}:{len(context['conversation_history'])}")
    cached = await redis.get(cache_key)
    if cached and can_use_cached(context):
        return cached
    
    # Call Claude API (100-150ms)
    prompt = build_socratic_prompt(context)
    response = await claude_client.messages.create(
        model="claude-3-5-haiku-20241022",  # Use cheaper model for tutoring
        max_tokens=300,
        temperature=0.7,
        system=SOCRATIC_SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    # Parse structured response
    result = parse_socratic_response(response.content[0].text)
    
    # Log turn (5ms)
    await db.add_turn_to_session(session_id, {
        "role": "tutor",
        "content": result.response_text,
        "metadata": {
            "strategy_used": context["teaching_strategy"],
            "misconceptions_detected": result.misconceptions_detected,
            "hint_level": result.hint_level
        }
    })
    
    # Cache response (2ms)
    await redis.setex(cache_key, 3600, result.json())
    
    return result
```

**Total latency budget:**
- PostgreSQL writes: 10-20ms
- BKT update: 10ms
- Strategy cache hit: 5ms
- Qdrant queries: 25-40ms
- Claude API (if needed): 100-150ms
- **Total: 150-225ms** (acceptable with cache hit; fallback if miss)

---

## 5. The Learning Jobs: How the System Improves

### 5.1 Job 1: Question Difficulty Calibration (Hourly)

**Purpose**: Update IRT parameters for all questions based on recent responses.

```python
# Job runs every hour, processes last hour's interactions
async def calibrate_question_difficulty():
    # 1. Get recent responses for uncalibrated or flagged questions
    responses = await db.query("""
        SELECT 
            qd.question_id,
            COUNT(*) as response_count,
            SUM(CASE WHEN io.is_correct THEN 1 ELSE 0 END) as correct_count,
            AVG(io.time_to_respond_ms) as avg_time,
            AVG(io.hints_used) as avg_hints,
            STDDEV(io.knowledge_state_after->>concept) as ability_variance
        FROM question_difficulty qd
        JOIN interaction_outcomes io ON qd.question_id = io.question_id
        WHERE io.timestamp > NOW() - INTERVAL '1 hour'
        AND (qd.needs_recalibration = true OR qd.calibration_count < 30)
        GROUP BY qd.question_id
        HAVING COUNT(*) >= 5  -- minimum responses for update
    """)
    
    # 2. Update IRT parameters using Expectation-Maximization
    for question_data in responses:
        question_id = question_data['question_id']
        
        # Get existing parameters
        params = await db.get_question_params(question_id)
        
        # Update using EM algorithm
        new_params = irt_em_update(
            existing_params=params,
            responses=question_data,
            ability_estimates=get_current_ability_estimates(question_id)
        )
        
        # Calculate confidence interval
        ci = calculate_confidence_interval(
            new_params,
            sample_size=question_data['response_count']
        )
        
        # Update database
        await db.execute("""
            UPDATE question_difficulty
            SET difficulty_parameter = $1,
                discrimination_parameter = $2,
                guessing_parameter = $3,
                calibration_count = calibration_count + $4,
                last_calibrated = NOW(),
                confidence_interval = $5,
                is_calibrated = CASE WHEN calibration_count + $4 >= 30 THEN true ELSE false END,
                needs_recalibration = false
            WHERE question_id = $6
        """, new_params.difficulty, new_params.discrimination, 
           new_params.guessing, question_data['response_count'],
           ci, question_id)
        
        # Update Qdrant metadata
        await qdrant.update_payload(
            collection_name="question_embeddings",
            points=[question_id],
            payload={
                "difficulty": new_params.difficulty,
                "discrimination": new_params.discrimination,
                "last_calibrated": datetime.utcnow().isoformat()
            }
        )
```

**Algorithm**: 2-parameter IRT (2PL) with Bayesian updating:
```
P(correct | ability θ, difficulty b, discrimination a) = 
    1 / (1 + exp(-a * (θ - b)))
```

We use Expectation-Maximization to update parameters from observed data.

### 5.2 Job 2: Misconception Discovery (Nightly, 2am)

**Purpose**: Mine real misconceptions from student error patterns.

```python
async def discover_misconceptions():
    # 1. Get error patterns from last 7 days
    errors = await db.query("""
        SELECT 
            io.concept,
            io.question_id,
            io.student_id,
            io.error_type,
            io.response->>'selected_option' as selected,
            io.response->>'correct_answer' as correct,
            io.knowledge_state_before,
            io.knowledge_state_after,
            io.time_to_respond_ms
        FROM interaction_outcomes io
        WHERE io.is_correct = false
        AND io.timestamp > NOW() - INTERVAL '7 days'
        AND io.error_type IS NOT NULL
        ORDER BY io.concept, io.student_id, io.timestamp
    """)
    
    # 2. Group by concept
    errors_by_concept = groupby(errors, 'concept')
    
    new_misconceptions = []
    
    for concept, concept_errors in errors_by_concept.items():
        # 3. Feature extraction
        features = []
        for error in concept_errors:
            feature_vector = extract_error_features(error)
            # Features: selected_option, error_type, response_time, 
            #           knowledge_state_before, question_features
            features.append(feature_vector)
        
        # 4. Cluster errors using DBSCAN
        clusters = dbscan_cluster(
            features, 
            eps=0.3,  # similarity threshold
            min_samples=5  # minimum 5 students with same error
        )
        
        # 5. For each cluster, classify with Claude
        for cluster in clusters:
            if len(cluster