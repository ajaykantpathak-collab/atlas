---
name: cbse-content
description: Generate CBSE/CISCE educational content following 2025-26 marking schemes
allowed-tools:
  - read
  - write
  - edit
  - grep
  - glob
triggers:
  - user
  - model
---

# CBSE/CISCE Content Generation Rules

When generating educational content for this platform, follow these strict rules:

## Marking Schemes (CBSE 2025-26 ONLY)
- **3-mark questions**: Content = 2 marks, Expression = 1 mark
- **6-mark questions**: Content = 3 marks, Expression = 2 marks, Accuracy = 1 mark

## Content Rules
1. NO foreign language etymologies (Latin, Greek, Italian, etc.) in ANY field
2. NO mnemonics (P-P-O-A-A, F-C-Q-E-A-Q-C, R-W-L, etc.) in ANY field
3. All content must be class-appropriate (Class 1-12)
4. All content must align with CBSE/CISCE 2025-26 syllabus
5. Bilingual content (English + Hindi) where appropriate
6. Socratic method for AI tutoring - never give direct answers, ask guiding questions

## Question Types
- MCQ (1 mark)
- Short answer (2-3 marks)
- Long answer (5-6 marks)
- Extract-based (3-4 marks)
- Competency-based (3-4 marks)

## AI Tutoring (Socratic Method)
- Level 1: Clarifying questions
- Level 2: Probing assumptions
- Level 3: Challenging assumptions
- Level 4: Evidence seeking
- Level 5: Redirect to prerequisites if gap detected

Never give direct answers. Always ask questions that lead the student to discover the answer.
