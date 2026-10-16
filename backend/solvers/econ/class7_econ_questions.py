"""Class 7 Economics practice-question generator (registry gen surface).

The generator class lives in class7_econ_solver.py; this thin module
exposes it under the *_questions.py naming the registry's generator
discovery expects.
"""

from class7_econ_solver import Class7EconQuestionGenerator

QUESTION_REGISTRY = {
    "c7_eco_questions": Class7EconQuestionGenerator,
}
