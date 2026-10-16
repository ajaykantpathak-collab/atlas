"""Class 6 Economics practice-question generator (registry gen surface).

The generator class lives in class6_econ_solver.py; this thin module
exposes it under the *_questions.py naming the registry's generator
discovery expects.
"""

from class6_econ_solver import Class6EconQuestionGenerator

QUESTION_REGISTRY = {
    "c6_eco_questions": Class6EconQuestionGenerator,
}
