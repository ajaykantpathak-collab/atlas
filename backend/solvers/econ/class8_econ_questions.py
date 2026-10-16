"""Class 8 Economics practice-question generator (registry gen surface).

The generator class lives in class8_econ_solver.py; this thin module
exposes it under the *_questions.py naming the registry's generator
discovery expects.
"""

from class8_econ_solver import Class8EconQuestionGenerator

QUESTION_REGISTRY = {
    "c8_eco_questions": Class8EconQuestionGenerator,
}
