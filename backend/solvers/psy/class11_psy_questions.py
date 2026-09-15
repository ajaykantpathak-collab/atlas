"""
CISCE Class 11 Psychology - Deterministic Question Generator
Covers all syllabus nodes from the provided markers.
"""

import random
import math
from fractions import Fraction
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field


# ============================================================================
# SYLLABUS NODE CATALOGUE
# ============================================================================

SYLLABUS_NODES = {
    "c11_psy_001": {
        "title": "Definition of Psychology and Basic Terms",
        "topic": "The Subject Psychology",
        "keywords": ["psychology", "behaviour", "stimulus", "response", "science"],
        "difficulty": "Easy",
        "cognitive": "Remember",
        "exam_weightage": "Medium",
    },
    "c11_psy_002": {
        "title": "Schools of Thought in Psychology",
        "topic": "The Subject Psychology",
        "keywords": ["structuralism", "functionalism", "behaviourism", "psychoanalysis",
                      "gestalt", "wundt", "james", "watson", "freud", "wertheimer"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "High",
    },
    "c11_psy_003": {
        "title": "Modern Eclectic Approaches in Psychology",
        "topic": "The Subject Psychology",
        "keywords": ["eclectic", "integrated", "modern", "approaches", "synthesis"],
        "difficulty": "Easy",
        "cognitive": "Understand",
        "exam_weightage": "Low",
    },
    "c11_psy_008": {
        "title": "Scientific Methods - Observation and Case Study",
        "topic": "Methods of Psychology",
        "keywords": ["observation", "case study", "field study", "controlled", "uncontrolled",
                      "longitudinal", "cross-sectional", "case history", "advantage", "disadvantage"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c11_psy_009": {
        "title": "Surveys and Experimentation",
        "topic": "Methods of Psychology",
        "keywords": ["experiment", "variable", "control", "questionnaire", "self-report",
                      "sample", "random", "biased", "representative", "population"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c11_psy_013": {
        "title": "Nature of Attention - Inner and Outer Determinants",
        "topic": "Attention and Perception",
        "keywords": ["attention", "perception", "size", "colour", "movement", "change",
                      "intensity", "contrast", "need", "interest", "emotion"],
        "difficulty": "Easy",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c11_psy_014": {
        "title": "Sensation vs Perception and Perceptual Organization",
        "topic": "Attention and Perception",
        "keywords": ["sensation", "perception", "figure", "ground", "similarity",
                      "proximity", "continuity", "simplicity", "closure", "grouping"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "High",
    },
}

# ============================================================================
# QUESTION BANKS (pre-authored, syllabus-aligned)
# ============================================================================

QUESTION_BANK: List[Dict[str, Any]] = [
    # ---- c11_psy_001: Definition of Psychology and Basic Terms ----
    {
        "id": "psy_001_mcq_01", "node": "c11_psy_001", "type": "mcq",
        "difficulty": "Easy",
        "question": "Psychology is best defined as the scientific study of:",
        "options": ["A) The soul and mind", "B) Behaviour and mental processes",
                     "C) Only conscious experiences", "D) Spiritual experiences"],
        "answer": "B",
        "explanation": "Psychology is defined as the science of behaviour and mental processes. It studies observable actions (behaviour) and internal experiences (thoughts, feelings)."
    },
    {
        "id": "psy_001_mcq_02", "node": "c11_psy_001", "type": "mcq",
        "difficulty": "Easy",
        "question": "In psychological terms, 'behaviour' refers to:",
        "options": ["A) Only overt actions visible to others",
                     "B) Only internal thoughts and feelings",
                     "C) Both overt (visible) and covert (internal) actions",
                     "D) Only reflexes and instincts"],
        "answer": "C",
        "explanation": "Behaviour in psychology includes both overt behaviour (visible actions like walking, talking) and covert behaviour (internal processes like thinking, feeling)."
    },
    {
        "id": "psy_001_fill_01", "node": "c11_psy_001", "type": "fill_blank",
        "difficulty": "Easy",
        "question": "In psychology, a _______ is any event or situation that elicits a response from an organism.",
        "options": [],
        "answer": "stimulus",
        "explanation": "A stimulus is any environmental event or internal cue that triggers a response in an organism. For example, a loud noise (stimulus) causes a person to jump (response)."
    },
    {
        "id": "psy_001_fill_02", "node": "c11_psy_001", "type": "fill_blank",
        "difficulty": "Easy",
        "question": "The _______ is the reaction or behaviour produced by a stimulus.",
        "options": [],
        "answer": "response",
        "explanation": "A response is the reaction or behaviour that follows a stimulus. For example, touching a hot stove (stimulus) produces withdrawing the hand (response)."
    },
    {
        "id": "psy_001_sa_01", "node": "c11_psy_001", "type": "short_answer",
        "difficulty": "Easy",
        "question": "Differentiate between overt and covert behaviour with one example of each.",
        "options": [],
        "answer": "Overt behaviour is observable by others (e.g., speaking, running). Covert behaviour is internal and not directly observable (e.g., thinking, feeling happy).",
        "explanation": "Overt behaviour = visible actions that others can see. Covert behaviour = internal mental activities like thoughts, feelings, and images that only the person experiencing them can directly know."
    },
    {
        "id": "psy_001_la_01", "node": "c11_psy_001", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Define Psychology as a science of behaviour. Explain the meaning of stimulus and response with suitable examples from daily life.",
        "options": [],
        "answer": "Psychology is the scientific study of behaviour and mental processes. A stimulus is any event/situation that triggers a response, and the response is the resulting behaviour/action.",
        "explanation": "Psychology uses scientific methods to study human and animal behaviour. A stimulus (S) is an event that produces a reaction. The response (R) is that reaction. For example: Bell rings (S) → Student stands up (R). Hot food (S) → sweating/watering of mouth (R)."
    },
    # Competency-based (Indian context)
    {
        "id": "psy_001_comp_01", "node": "c11_psy_001", "type": "mcq",
        "difficulty": "Easy",
        "competency": True,
        "question": "Priya felt nervous before her exam (internal state) and started biting her nails (visible action). In psychological terms, biting nails is an example of:",
        "options": ["A) Covert behaviour", "B) Overt behaviour",
                     "C) Stimulus", "D) Mental process only"],
        "answer": "B",
        "explanation": "Biting nails is overt behaviour because it is visible and can be observed by others. The nervousness is covert (internal mental process). Indian students often show exam-related anxiety through such observable behaviours."
    },
    {
        "id": "psy_001_comp_02", "node": "c11_psy_001", "type": "short_answer",
        "difficulty": "Easy",
        "competency": True,
        "question": "During the morning assembly at your school, the drum beat (stimulus) signals all students to stand in attention (response). Identify the stimulus and response in this situation.",
        "options": [],
        "answer": "Stimulus = drum beat; Response = students standing in attention.",
        "explanation": "This is a real-life example from Indian school context. The drum beat is the external stimulus that triggers the collective response of students standing at attention during assembly."
    },
    # ---- c11_psy_002: Schools of Thought ----
    {
        "id": "psy_002_mcq_01", "node": "c11_psy_002", "type": "mcq",
        "difficulty": "Medium",
        "question": "Who is considered the father of Structuralism in psychology?",
        "options": ["A) William James", "B) John B. Watson",
                     "C) Wilhelm Wundt", "D) Sigmund Freud"],
        "answer": "C",
        "explanation": "Wilhelm Wundt is considered the father of Structuralism. He established the first psychology laboratory at Leipzig University, Germany in 1879. He used introspection to study the structure of mind."
    },
    {
        "id": "psy_002_mcq_02", "node": "c11_psy_002", "type": "mcq",
        "difficulty": "Medium",
        "question": "The school of psychology that focused on the purpose of consciousness and behaviour rather than its structure is called:",
        "options": ["A) Structuralism", "B) Functionalism",
                     "C) Behaviourism", "D) Gestalt Psychology"],
        "answer": "B",
        "explanation": "Functionalism, led by William James and John Dewey, focused on the purpose (function) of consciousness - 'what does consciousness do?' rather than 'what is it made of?'."
    },
    {
        "id": "psy_002_mcq_03", "node": "c11_psy_002", "type": "mcq",
        "difficulty": "Medium",
        "question": "Which school of psychology stated that 'the whole is more than the sum of its parts'?",
        "options": ["A) Structuralism", "B) Behaviourism",
                     "C) Gestalt Psychology", "D) Functionalism"],
        "answer": "C",
        "explanation": "Gestalt Psychology (Max Wertheimer, Wolfgang Köhler) emphasized that we perceive wholes or patterns, not just individual elements. The Gestalt principle is 'the whole is greater than the sum of its parts.'"
    },
    {
        "id": "psy_002_mcq_04", "node": "c11_psy_002", "type": "mcq",
        "difficulty": "Medium",
        "question": "Who founded Psychoanalysis?",
        "options": ["A) Carl Rogers", "B) Sigmund Freud",
                     "C) B.F. Skinner", "D) Jean Piaget"],
        "answer": "B",
        "explanation": "Sigmund Freud founded Psychoanalysis in the late 19th/early 20th century. He emphasized the role of the unconscious mind, childhood experiences, and psychosexual development in shaping personality."
    },
    {
        "id": "psy_002_fill_01", "node": "c11_psy_002", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "_______ is associated with the method of introspection in Structuralism.",
        "options": [],
        "answer": "Wilhelm Wundt",
        "explanation": "Wilhelm Wundt used introspection (self-observation) as the primary method in Structuralism. He trained subjects to report their conscious experiences in response to stimuli."
    },
    {
        "id": "psy_002_fill_02", "node": "c11_psy_002", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "The concept of 'stream of consciousness' was proposed by _______.",
        "options": [],
        "answer": "William James",
        "explanation": "William James, a key figure in Functionalism, described consciousness as a 'stream of consciousness' - continuous, ever-changing, and personal."
    },
    {
        "id": "psy_002_fill_03", "node": "c11_psy_002", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "_______ psychology is associated with the concept of insight learning.",
        "options": [],
        "answer": "Gestalt",
        "explanation": "Gestalt psychologists like Wolfgang Köhler studied insight learning in chimpanzees, where solutions to problems appeared suddenly rather than through trial-and-error."
    },
    {
        "id": "psy_002_sa_01", "node": "c11_psy_002", "type": "short_answer",
        "difficulty": "Medium",
        "question": "List any two main features of Behaviourism.",
        "options": [],
        "answer": "(1) Psychology should study only observable behaviour, not consciousness. (2) Behaviour is determined by environmental stimuli (S-R connections). John B. Watson and B.F. Skinner are key Behaviourists.",
        "explanation": "Behaviourism, founded by John B. Watson (1913), rejected the study of consciousness and mind. It emphasized that behaviour can be studied objectively through stimulus-response (S-R) relationships. B.F. Skinner later developed Operant Conditioning."
    },
    {
        "id": "psy_002_sa_02", "node": "c11_psy_002", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Mention two psychologists associated with Gestalt Psychology and one key concept of each.",
        "options": [],
        "answer": "Max Wertheimer - Phi phenomenon (apparent movement); Wolfgang Köhler - Insight Learning.",
        "explanation": "Max Wertheimer discovered the phi phenomenon - two flashing lights appear as one moving light. Wolfgang Köhler demonstrated insight learning in chimpanzees (e.g., Sultan stacking boxes to reach bananas)."
    },
    {
        "id": "psy_002_la_01", "node": "c11_psy_002", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Compare and contrast any two schools of thought in Psychology. Mention two psychologists and their key concepts for each school.",
        "options": [],
        "answer": "Structuralism (Wundt, Titchener; introspection) vs Functionalism (James, Dewey; stream of consciousness, adaptation).",
        "explanation": "Structuralism studied the structure of mind using introspection. Functionalism studied the purpose/function of consciousness. Structuralism asked 'what?' while Functionalism asked 'why?' and 'how?'."
    },
    # Competency-based (Indian context)
    {
        "id": "psy_002_comp_01", "node": "c11_psy_002", "type": "short_answer",
        "difficulty": "Medium",
        "competency": True,
        "question": "Arun's teacher believes that a child's behaviour is shaped entirely by rewards and punishments given by parents. Which school of thought does this teacher's belief align with? Name one psychologist of this school.",
        "options": [],
        "answer": "Behaviourism. Psychologist: B.F. Skinner (or John B. Watson).",
        "explanation": "This is an Indian classroom scenario. The teacher's belief that behaviour is shaped by environmental rewards/punishments aligns with Behaviourism. B.F. Skinner's Operant Conditioning theory is based on reinforcement (rewards) and punishment shaping behaviour."
    },
    {
        "id": "psy_002_comp_02", "node": "c11_psy_002", "type": "mcq",
        "difficulty": "Medium",
        "competency": True,
        "question": "A student in Mumbai notices that when students in her class are arranged in rows (proximity), she tends to befriend those sitting next to her. Which Gestalt principle of grouping does this illustrate?",
        "options": ["A) Similarity", "B) Proximity",
                     "C) Closure", "D) Continuity"],
        "answer": "B",
        "explanation": "The Gestalt principle of Proximity states that objects close to each other tend to be grouped together. In Indian classrooms, students sitting near each other often form friendships based on proximity."
    },
    # ---- c11_psy_003: Modern Eclectic Approaches ----
    {
        "id": "psy_003_mcq_01", "node": "c11_psy_003", "type": "mcq",
        "difficulty": "Easy",
        "question": "The eclectic approach in modern psychology means:",
        "options": ["A) Following only one school of thought",
                     "B) Using techniques and ideas from multiple schools",
                     "C) Rejecting all traditional schools",
                     "D) Studying only observable behaviour"],
        "answer": "B",
        "explanation": "The eclectic approach means selecting and using the best methods, techniques, and concepts from different schools of psychology depending on the problem, rather than being confined to one school."
    },
    {
        "id": "psy_003_fill_01", "node": "c11_psy_003", "type": "fill_blank",
        "difficulty": "Easy",
        "question": "Modern Psychology adopts an _______ approach, drawing from various schools of thought.",
        "options": [],
        "answer": "eclectic",
        "explanation": "Modern psychology is eclectic - it does not follow any single school rigidly but uses insights from Structuralism, Functionalism, Behaviourism, Psychoanalysis, Gestalt, Humanistic, Cognitive, etc."
    },
    {
        "id": "psy_003_sa_01", "node": "c11_psy_003", "type": "short_answer",
        "difficulty": "Easy",
        "question": "What is meant by the eclectic approach in modern Psychology?",
        "options": [],
        "answer": "The eclectic approach means psychologists use concepts, methods, and techniques from different schools of thought rather than following a single school rigidly.",
        "explanation": "For example, a clinical psychologist might use Behaviourist techniques (reward systems) alongside Psychoanalytic approaches (exploring childhood experiences) depending on the client's needs."
    },
    # ---- c11_psy_008: Scientific Methods - Observation and Case Study ----
    {
        "id": "psy_008_mcq_01", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "question": "In a controlled observation, the observer:",
        "options": ["A) Observes behaviour in natural settings without interference",
                     "B) Manipulates variables and controls conditions in a lab",
                     "C) Uses only questionnaires to collect data",
                     "D) Studies one individual over a long period"],
        "answer": "B",
        "explanation": "In controlled observation, the researcher manipulates independent variables and controls conditions, usually in a laboratory setting, to study cause-effect relationships."
    },
    {
        "id": "psy_008_mcq_02", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "question": "Uncontrolled observation is also called:",
        "options": ["A) Laboratory observation", "B) Field study",
                     "C) Experimental method", "D) Survey method"],
        "answer": "B",
        "explanation": "Uncontrolled observation is conducted in natural settings (field study) where the researcher observes behaviour without manipulating variables or interfering with the situation."
    },
    {
        "id": "psy_008_mcq_03", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "question": "A study that follows the same group of individuals over an extended period is called:",
        "options": ["A) Cross-sectional study", "B) Longitudinal study",
                     "C) Case study", "D) Field study"],
        "answer": "B",
        "explanation": "In a longitudinal study, the same group of participants is observed and tested over a long period (e.g., studying the same children from age 5 to age 15)."
    },
    {
        "id": "psy_008_mcq_04", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "question": "A cross-sectional study:",
        "options": ["A) Follows one group over many years",
                     "B) Studies different age groups at the same point in time",
                     "C) Studies a single individual in depth",
                     "D) Is conducted only in laboratories"],
        "answer": "B",
        "explanation": "A cross-sectional study compares different groups (e.g., ages 10, 20, 30) at the same time, whereas a longitudinal study follows one group over time."
    },
    {
        "id": "psy_008_mcq_05", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "question": "The case history method is most useful for studying:",
        "options": ["A) Large population trends", "B) Rare or unique cases in depth",
                     "C) Quick surveys of attitudes", "D) Laboratory experiments"],
        "answer": "B",
        "explanation": "Case history method involves an in-depth study of a single individual or a very small group (e.g., studying a child with rare disorder, or Phineas Gage). It provides rich detail but findings cannot be generalized."
    },
    {
        "id": "psy_008_fill_01", "node": "c11_psy_008", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "Observation conducted in natural settings without interference is called _______ observation.",
        "options": [],
        "answer": "uncontrolled",
        "explanation": "Uncontrolled observation (field study) is done in natural settings like homes, schools, or playgrounds where the observer does not manipulate any variables."
    },
    {
        "id": "psy_008_fill_02", "node": "c11_psy_008", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "The _______ method involves a detailed study of a single individual over a period of time.",
        "options": [],
        "answer": "case history",
        "explanation": "Case history method (or case study) involves collecting detailed information about a single person through interviews, observation, and records to understand unusual behaviour or disorders."
    },
    {
        "id": "psy_008_sa_01", "node": "c11_psy_008", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Give one advantage and one disadvantage of the observation method in psychology.",
        "options": [],
        "answer": "Advantage: Behaviour is studied in natural/real settings. Disadvantage: Observer bias may affect results.",
        "explanation": "Observation method provides rich, naturalistic data about behaviour as it actually occurs. However, the observer's expectations can bias what they notice and record (observer bias)."
    },
    {
        "id": "psy_008_sa_02", "node": "c11_psy_008", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Give one advantage and one disadvantage of the case study method.",
        "options": [],
        "answer": "Advantage: Provides in-depth, detailed understanding of rare cases. Disadvantage: Findings cannot be generalized to others.",
        "explanation": "Case studies are invaluable for understanding rare conditions (e.g., Phineas Gage's brain injury). However, since only one or few individuals are studied, results may not apply to the general population."
    },
    {
        "id": "psy_008_la_01", "node": "c11_psy_008", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Distinguish between controlled and uncontrolled observation. Also, explain the difference between longitudinal and cross-sectional studies with examples.",
        "options": [],
        "answer": "Controlled observation = lab, variables manipulated. Uncontrolled = natural setting, no manipulation. Longitudinal = same group over time. Cross-sectional = different groups at same time.",
        "explanation": "Example: A psychologist studying children's playground behaviour uses uncontrolled observation at a school playground. A longitudinal study might track IQ from age 5 to 15; a cross-sectional study compares IQs of ages 5, 10, 15 at one time."
    },
    # Competency-based
    {
        "id": "psy_008_comp_01", "node": "c11_psy_008", "type": "short_answer",
        "difficulty": "Medium",
        "competency": True,
        "question": "Ms. Sharma, a school counsellor in Delhi, wants to study how students in her school cope with exam stress. She decides to observe students in the school courtyard during exam week without interfering. Which observation method is she using? Give one reason why this method is appropriate here.",
        "options": [],
        "answer": "Uncontrolled observation (field study). It is appropriate because it captures real, natural stress-coping behaviour without the artificiality of a lab setting.",
        "explanation": "This is an Indian school counselling scenario. Ms. Sharma's method is field study/uncontrolled observation because she is observing in a natural school setting without manipulating any conditions."
    },
    {
        "id": "psy_008_comp_02", "node": "c11_psy_008", "type": "mcq",
        "difficulty": "Medium",
        "competency": True,
        "question": "Dr. Patel in Mumbai is studying the development of problem-solving skills. He tests the same group of 50 children when they are 8, 10, and 12 years old. This is an example of:",
        "options": ["A) Cross-sectional study", "B) Longitudinal study",
                     "C) Case study", "D) Survey"],
        "answer": "B",
        "explanation": "This is a longitudinal study because the same group of 50 children is followed and tested at different ages (8, 10, and 12) over time."
    },
    # ---- c11_psy_009: Surveys and Experimentation ----
    {
        "id": "psy_009_mcq_01", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "question": "In an experiment, the variable that is manipulated by the researcher is called:",
        "options": ["A) Dependent variable", "B) Independent variable",
                     "C) Extraneous variable", "D) Controlled variable"],
        "answer": "B",
        "explanation": "The independent variable (IV) is the variable that the researcher manipulates or changes to observe its effect on the dependent variable (DV)."
    },
    {
        "id": "psy_009_mcq_02", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "question": "In an experiment, the variable that is measured to see the effect of the independent variable is called:",
        "options": ["A) Independent variable", "B) Dependent variable",
                     "C) Controlled variable", "D) Sample"],
        "answer": "B",
        "explanation": "The dependent variable (DV) is the outcome that is measured. It 'depends' on the manipulation of the independent variable. For example: Does caffeine (IV) affect alertness (DV)?"
    },
    {
        "id": "psy_009_mcq_03", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "question": "A representative sample is one that:",
        "options": ["A) Includes only friends and family of the researcher",
                     "B) Accurately reflects the characteristics of the population",
                     "C) Is always larger than 1000",
                     "D) Is chosen based on convenience"],
        "answer": "B",
        "explanation": "A representative sample is a subgroup of the population that accurately represents the population's characteristics (age, gender, income, etc.) so that findings can be generalized."
    },
    {
        "id": "psy_009_mcq_04", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "question": "The entire group of individuals about which a researcher wants to draw conclusions is called:",
        "options": ["A) Sample", "B) Population",
                     "C) Control group", "D) Experimental group"],
        "answer": "B",
        "explanation": "The population is the complete set of individuals or items of interest (e.g., all Class 11 students in India). A sample is a smaller subgroup selected from the population for study."
    },
    {
        "id": "psy_009_mcq_05", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "question": "A questionnaire in a survey is an example of:",
        "options": ["A) Direct observation", "B) Self-report method",
                     "C) Experimental method", "D) Case study"],
        "answer": "B",
        "explanation": "Questionnaires and self-reports ask participants to report their own thoughts, feelings, and behaviours. This is the self-report method used in surveys."
    },
    {
        "id": "psy_009_fill_01", "node": "c11_psy_009", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "In an experiment, variables other than the independent variable that could affect the dependent variable are called _______ variables.",
        "options": [],
        "answer": "extraneous",
        "explanation": "Extraneous variables are unwanted variables that could influence the dependent variable. Researchers control these to ensure that only the IV affects the DV."
    },
    {
        "id": "psy_009_fill_02", "node": "c11_psy_009", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "A _______ is a small portion of a population selected for study.",
        "options": [],
        "answer": "sample",
        "explanation": "A sample is a manageable subset of the population selected for research. A good sample should be representative, random, and large enough to be statistically meaningful."
    },
    {
        "id": "psy_009_sa_01", "node": "c11_psy_009", "type": "short_answer",
        "difficulty": "Medium",
        "question": "What is a control group in an experiment?",
        "options": [],
        "answer": "A control group is the group of participants that does NOT receive the experimental treatment, used as a baseline for comparison.",
        "explanation": "For example, in a drug experiment, the experimental group receives the drug while the control group receives a placebo. Comparing the two groups shows the drug's actual effect."
    },
    {
        "id": "psy_009_sa_02", "node": "c11_psy_009", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Give one advantage and one disadvantage of the survey method.",
        "options": [],
        "answer": "Advantage: Can collect data from many people quickly. Disadvantage: Responses may be dishonest or inaccurate.",
        "explanation": "Surveys are efficient for gathering information from large groups. However, participants may not answer truthfully (social desirability bias) or may not understand the questions correctly."
    },
    {
        "id": "psy_009_la_01", "node": "c11_psy_009", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Explain the steps involved in conducting a psychological experiment with an example. Also distinguish between random, biased, and representative samples.",
        "options": [],
        "answer": "Experiment steps: (1) Identify problem, (2) Form hypothesis, (3) Define variables, (4) Select sample, (5) Control conditions, (6) Conduct experiment, (7) Analyze results.",
        "explanation": "Example: Studying music's effect on memory. Steps: Problem → Does music affect memory? Hypothesis → Music improves memory. Variables: IV = music/no music; DV = memory score. Random sample = everyone has equal chance. Biased sample = selected by convenience. Representative sample = mirrors population."
    },
    # Competency-based
    {
        "id": "psy_009_comp_01", "node": "c11_psy_009", "type": "mcq",
        "difficulty": "Medium",
        "competency": True,
        "question": "A teacher in Kolkata wants to know if students who study with music score differently on tests. She divides her class into two groups: one studies with music, one in silence. The 'presence of music' is the:",
        "options": ["A) Dependent variable", "B) Independent variable",
                     "C) Control group", "D) Extraneous variable"],
        "answer": "B",
        "explanation": "The presence/absence of music is the independent variable because the teacher manipulates it to see its effect on test scores (the dependent variable)."
    },
    {
        "id": "psy_009_comp_02", "node": "c11_psy_009", "type": "short_answer",
        "difficulty": "Medium",
        "competency": True,
        "question": "A researcher in Chennai wants to study smartphone usage patterns among Class 11 students. She only surveys students from her own coaching class. What type of sample is this? Why might it be a problem?",
        "options": [],
        "answer": "This is a biased/convenience sample. It may not represent all Class 11 students - coaching class students may differ from others in income, study habits, and smartphone access.",
        "explanation": "A biased sample occurs when participants are selected based on convenience rather than randomly. This compromises the generalizability of findings. A representative sample would include students from different schools and backgrounds."
    },
    # ---- c11_psy_013: Attention - Inner and Outer Determinants ----
    {
        "id": "psy_013_mcq_01", "node": "c11_psy_013", "type": "mcq",
        "difficulty": "Easy",
        "question": "Attention is best described as:",
        "options": ["A) A type of memory", "B) The process of selectively focusing on certain stimuli",
                     "C) A reflex action", "D) An emotion"],
        "answer": "B",
        "explanation": "Attention is the cognitive process of selectively concentrating on one aspect of the environment while ignoring others. It is the 'spotlight' of the mind."
    },
    {
        "id": "psy_013_mcq_02", "node": "c11_psy_013", "type": "mcq",
        "difficulty": "Easy",
        "question": "Which of the following is an OUTER (physical) determinant of attention?",
        "options": ["A) Need", "B) Interest", "C) Colour", "D) Emotion"],
        "answer": "C",
        "explanation": "Outer/physical determinants of attention are properties of the stimulus itself: size, colour, movement, change, intensity, contrast. Inner determinants are psychological: need, interest, emotion."
    },
    {
        "id": "psy_013_mcq_03", "node": "c11_psy_013", "type": "mcq",
        "difficulty": "Easy",
        "question": "When a student pays more attention to a topic because it relates to their career goals, which determinant of attention is operating?",
        "options": ["A) Size", "B) Colour", "C) Need", "D) Movement"],
        "answer": "C",
        "explanation": "'Need' is an inner (psychological) determinant of attention. When something fulfils a personal need (career goals), it captures more attention."
    },
    {
        "id": "psy_013_fill_01", "node": "c11_psy_013", "type": "fill_blank",
        "difficulty": "Easy",
        "question": "_______ is the process of selectively focusing on some stimuli while ignoring others.",
        "options": [],
        "answer": "Attention",
        "explanation": "Attention is the selective focusing of cognitive resources on certain stimuli or tasks while filtering out others. It is limited - we cannot attend to everything at once."
    },
    {
        "id": "psy_013_fill_02", "node": "c11_psy_013", "type": "fill_blank",
        "difficulty": "Easy",
        "question": "A flashing neon sign captures attention due to the outer determinant of _______.",
        "options": [],
        "answer": "movement",
        "explanation": "Movement is a powerful outer determinant of attention. Moving or flashing objects automatically draw our attention more than static ones - this is an evolutionary adaptation."
    },
    {
        "id": "psy_013_sa_01", "node": "c11_psy_013", "type": "short_answer",
        "difficulty": "Easy",
        "question": "Differentiate between inner and outer determinants of attention, giving two examples of each.",
        "options": [],
        "answer": "Outer determinants are physical properties of stimuli (e.g., colour, size). Inner determinants are psychological factors (e.g., interest, emotion).",
        "explanation": "Outer: colour (bright colours attract), movement (flashing lights), intensity (loud sounds), size (big billboard), contrast (black on white). Inner: need (hungry → notice food), interest (sports fan notices cricket news), emotion (angry person notices threats)."
    },
    {
        "id": "psy_013_la_01", "node": "c11_psy_013", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Explain the role of attention in perception. Discuss how outer determinants (physical factors) and inner determinants (psychological factors) influence what we perceive, with suitable examples.",
        "options": [],
        "answer": "Attention acts as a gateway to perception - we only perceive what we attend to. Outer determinants (size, colour, movement, intensity, contrast) are physical properties of stimuli. Inner determinants (need, interest, emotion) are psychological states that guide attention.",
        "explanation": "Example 1: A bright red banner (colour + contrast) catches attention at a fair. Example 2: A hungry student walking past a food stall (need) notices the smell while others don't. Example 3: A cricket fan spots a cricket score on a news ticker (interest) while others miss it."
    },
    # Competency-based
    {
        "id": "psy_013_comp_01", "node": "c11_psy_013", "type": "short_answer",
        "difficulty": "Easy",
        "competency": True,
        "question": "During a school assembly in Bangalore, Ravi was very hungry because he skipped breakfast. He noticed the smell of snacks from the nearby canteen while most other students focused on the principal's speech. Which inner determinant of attention explains Ravi's experience?",
        "options": [],
        "answer": "Need. Ravi's hunger (a physiological need) directed his attention toward food-related stimuli (smell of snacks) despite the assembly.",
        "explanation": "This is an Indian school scenario demonstrating how inner determinants like 'need' guide attention. When you have a strong need (hunger), you selectively attend to stimuli relevant to that need."
    },
    {
        "id": "psy_013_comp_02", "node": "c11_psy_013", "type": "mcq",
        "difficulty": "Easy",
        "competency": True,
        "question": "At a Diwali mela in Jaipur, Meera immediately noticed the largest, most brightly lit rangoli, while her friend was drawn to the sound of the camel race nearby. What outer determinant attracted each of them?",
        "options": ["A) Meera: size; Friend: movement",
                     "B) Meera: colour; Friend: intensity",
                     "C) Meera: contrast; Friend: change",
                     "D) Meera: interest; Friend: need"],
        "answer": "A",
        "explanation": "Meera was attracted by SIZE (the largest rangoli) and her friend by MOVEMENT (camel race). Both are outer/physical determinants of attention."
    },
    # ---- c11_psy_014: Sensation vs Perception & Perceptual Organization ----
    {
        "id": "psy_014_mcq_01", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "question": "The difference between sensation and perception is that:",
        "options": ["A) Sensation is mental, perception is physical",
                     "B) Sensation is detection of stimuli by sense organs; perception is interpretation of those sensations",
                     "C) Perception comes before sensation",
                     "D) They are the same process"],
        "answer": "B",
        "explanation": "Sensation is the raw data received by sense organs (eyes, ears, etc.) when they detect stimuli. Perception is the process of organizing and interpreting those sensory inputs to give them meaning."
    },
    {
        "id": "psy_014_mcq_02", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "question": "The figure-ground relationship in perception means:",
        "options": ["A) The background is always more important than the figure",
                     "B) We perceive a figure (object) as distinct from the ground (background)",
                     "C) Figures and grounds are indistinguishable",
                     "D) Perception is only about figures, not backgrounds"],
        "answer": "B",
        "explanation": "Figure-ground perception is the tendency to see objects (figures) as distinct from their backgrounds (ground). For example, you see words on a page (figure) against the white background (ground)."
    },
    {
        "id": "psy_014_mcq_03", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "question": "The Gestalt law of proximity states that:",
        "options": ["A) Similar objects are grouped together",
                     "B) Objects close to each other are perceived as a group",
                     "C) We prefer smooth, continuous patterns",
                     "D) We fill in gaps to perceive complete forms"],
        "answer": "B",
        "explanation": "The Law of Proximity: Objects that are close together tend to be perceived as belonging to the same group. For example, dots arranged in clusters are seen as separate groups."
    },
    {
        "id": "psy_014_mcq_04", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "question": "The Gestalt law of closure states that:",
        "options": ["A) We close our eyes to perceive better",
                     "B) We tend to fill in gaps to perceive a complete, whole object",
                     "C) We ignore incomplete information",
                     "D) Perception is always exact and complete"],
        "answer": "B",
        "explanation": "The Law of Closure: We tend to mentally 'fill in' gaps to perceive a complete, meaningful whole. For example, we see a complete circle even if part of it is missing."
    },
    {
        "id": "psy_014_mcq_05", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "question": "When you see a line of dots as a continuous row rather than individual dots, which Gestalt law is operating?",
        "options": ["A) Similarity", "B) Proximity",
                     "C) Continuity", "D) Closure"],
        "answer": "C",
        "explanation": "The Law of Continuity (or Good Continuation): We tend to perceive smooth, continuous patterns rather than discontinuous ones. We prefer to see lines as continuing in their established direction."
    },
    {
        "id": "psy_014_fill_01", "node": "c11_psy_014", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "The process of transforming raw sensory data into meaningful experiences is called _______.",
        "options": [],
        "answer": "perception",
        "explanation": "Perception is the cognitive process of organizing, interpreting, and giving meaning to sensory information (sensation). It goes beyond mere detection to involve understanding."
    },
    {
        "id": "psy_014_fill_02", "node": "c11_psy_014", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "The Gestalt law of _______ states that similar objects are grouped together in perception.",
        "options": [],
        "answer": "similarity",
        "explanation": "The Law of Similarity: Similar objects (same colour, shape, size) tend to be perceived as belonging together. For example, all red balls in a mixed display are seen as one group."
    },
    {
        "id": "psy_014_fill_03", "node": "c11_psy_014", "type": "fill_blank",
        "difficulty": "Medium",
        "question": "The _______ law states that we perceive the simplest, most regular form possible.",
        "options": [],
        "answer": "simplicity (or Prägnanz)",
        "explanation": "The Law of Simplicity (Prägnanz): Among possible interpretations of a stimulus, we tend to perceive the simplest, most stable, and regular form. We prefer order and simplicity."
    },
    {
        "id": "psy_014_sa_01", "node": "c11_psy_014", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Differentiate between sensation and perception. How does sensation get transformed into perception?",
        "options": [],
        "answer": "Sensation = raw sensory data from sense organs. Perception = organization and interpretation of that data. Sensation → transduction → neural processing → organization (perception).",
        "explanation": "Sensation occurs when sense organs detect physical energy (light, sound) and convert it to neural signals (transduction). Perception organizes and interprets these signals using past experience, context, and Gestalt principles."
    },
    {
        "id": "psy_014_sa_02", "node": "c11_psy_014", "type": "short_answer",
        "difficulty": "Medium",
        "question": "Explain the figure-ground relationship in perception with an example.",
        "options": [],
        "answer": "In figure-ground perception, we see a central object (figure) against a background (ground). Example: A face (figure) seen in the clouds against the sky (ground).",
        "explanation": "The figure is the object of focus - it appears solid and in front. The ground recedes into the background. Rubin's vase is a classic example: you can see either a vase (figure) or two faces (figure) against the other as ground."
    },
    {
        "id": "psy_014_la_01", "node": "c11_psy_014", "type": "long_answer",
        "difficulty": "Medium",
        "question": "Explain any four laws of perceptual organization (grouping) proposed by Gestalt psychologists. Use suitable examples for each.",
        "options": [],
        "answer": "Four laws: (1) Proximity - close objects grouped; (2) Similarity - similar objects grouped; (3) Continuity - prefer smooth/continuous patterns; (4) Closure - fill gaps to see complete forms.",
        "explanation": "Proximity: Dots close together seen as a group. Similarity: Rows of circles and squares seen separately by shape. Continuity: Line seen as continuing, not abruptly changing. Closure: Incomplete circle seen as complete circle."
    },
    # Competency-based
    {
        "id": "psy_014_comp_01", "node": "c11_psy_014", "type": "short_answer",
        "difficulty": "Medium",
        "competency": True,
        "question": "Kavya saw the Indian tricolour (saffron, white, green with blue chakra). She immediately perceived it as a national flag rather than three separate coloured stripes. Which Gestalt law explains this?",
        "options": [],
        "answer": "Law of Similarity and Law of Closure. The stripes are perceived together as one meaningful whole (the flag) rather than separate colours. The blue chakra completes the meaning.",
        "explanation": "Similarity groups the three stripes as a unified pattern. Closure helps Kavya mentally complete the flag's identity as a national symbol even if only a portion was visible."
    },
    {
        "id": "psy_014_comp_02", "node": "c11_psy_014", "type": "mcq",
        "difficulty": "Medium",
        "competency": True,
        "question": "When a student in Pune looks at a flock of birds flying in a V-formation, she perceives the whole V-shape rather than individual birds. Which Gestalt principle is illustrated?",
        "options": ["A) Figure-ground", "B) Similarity",
                     "C) Proximity", "D) Closure"],
        "answer": "C",
        "explanation": "The Law of Proximity: Birds flying close together in a V-formation are perceived as a group (the V-shape) rather than as individual birds because of their spatial closeness."
    },
    {
        "id": "psy_014_comp_03", "node": "c11_psy_014", "type": "short_answer",
        "difficulty": "Medium",
        "competency": True,
        "question": "When 10th standard students in a Hyderabad school saw a partially damaged poster of Mahatma Gandhi on the wall, everyone could recognize it immediately even though parts were torn. Which Gestalt law explains this? Relate it to the concept of perception vs sensation.",
        "options": [],
        "answer": "Law of Closure and Perception. Students filled in the missing parts mentally (closure) to perceive the complete image of Gandhi. This shows perception goes beyond mere sensation (raw sensory input) to meaningful interpretation.",
        "explanation": "Sensation would only detect the torn paper and paint. Perception uses the law of closure to fill gaps, using past knowledge of Gandhi's image. This demonstrates how perception is an active, constructive process."
    },
    # ---- c11_psy_007: Heredity-Environment (prerequisite, inferential) ----
    {
        "id": "psy_007_mcq_01", "node": "c11_psy_007", "type": "mcq",
        "difficulty": "Easy",
        "question": "The relative contributions of heredity (genes) and environment to behaviour is studied in:",
        "options": ["A) Social psychology", "B) Developmental psychology",
                     "C) Behavioural genetics", "D) Cognitive psychology"],
        "answer": "C",
        "explanation": "Behavioural genetics examines how heredity (genes) and environment interact to influence behaviour. Twin studies are a key method used in this field."
    },
    {
        "id": "psy_007_sa_01", "node": "c11_psy_007", "type": "short_answer",
        "difficulty": "Easy",
        "question": "Explain with an example how heredity and environment interact to influence behaviour.",
        "options": [],
        "answer": "Heredity provides the genetic potential (e.g., musical ability), while environment determines whether it develops (e.g., access to music training). Both interact - genes load the gun, environment pulls the trigger.",
        "explanation": "Example: A child may inherit a genetic predisposition for high intelligence (heredity), but without proper nutrition, education, and stimulation (environment), this potential may not be realized. Both factors work together."
    },
    # ---- c11_psy_012: Statistics in Psychology (prerequisite, inferential) ----
    {
        "id": "psy_012_mcq_01", "node": "c11_psy_012", "type": "mcq",
        "difficulty": "Medium",
        "question": "In psychology, descriptive statistics are used to:",
        "options": ["A) Test hypotheses about populations",
                     "B) Summarize and describe data",
                     "C) Determine cause-effect relationships",
                     "D) Control variables in experiments"],
        "answer": "B",
        "explanation": "Descriptive statistics (mean, median, mode, range, standard deviation) summarize and describe data. Inferential statistics are used to draw conclusions about populations from samples."
    },
    {
        "id": "psy_012_num_01", "node": "c11_psy_012", "type": "numerical",
        "difficulty": "Medium",
        "question": "A psychologist collected anxiety scores from 5 students: 12, 18, 15, 20, 14. Calculate the mean and median of these scores.",
        "options": [],
        "answer": {"mean": 15.8, "median": 15.0},
        "explanation": "Mean = (12+18+15+20+14)/5 = 79/5 = 15.8. Median = middle value when sorted: 12, 14, 15, 18, 20 → median = 15."
    },
]

# ============================================================================
# NODE METADATA LOOKUPS
# ============================================================================

def get_node_metadata(node_id: str) -> Optional[Dict]:
    return SYLLABUS_NODES.get(node_id)

# ============================================================================
# SOLVER FUNCTIONS
# ============================================================================

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a multiple-choice question."""
    question_id = params.get("question_id", "")
    selected_option = params.get("selected_option", "")
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {"error": f"Question {question_id} not found"}
    correct = question["answer"]
    is_correct = selected_option.upper() == correct.upper()
    return {
        "answer": correct,
        "selected": selected_option.upper(),
        "correct": is_correct,
        "steps": [
            f"Step 1: Read the question carefully - '{question['question']}'",
            f"Step 2: Evaluate each option against psychological knowledge",
            f"Step 3: Identify the correct answer - {correct}",
            f"Step 4: Compare with selected option - {selected_option.upper()}",
        ],
        "verification": {
            "method": "Direct knowledge verification",
            "result": "Correct" if is_correct else "Incorrect",
            "correct_answer": correct,
            "explanation": question["explanation"],
        }
    }

def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blanks question."""
    question_id = params.get("question_id", "")
    user_answer = params.get("user_answer", "").strip().lower()
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {"error": f"Question {question_id} not found"}
    correct = question["answer"].lower()
    is_correct = user_answer == correct
    return {
        "answer": question["answer"],
        "user_answer": user_answer,
        "correct": is_correct,
        "steps": [
            f"Step 1: Read the sentence - '{question['question']}'",
            f"Step 2: Identify the missing term based on syllabus context",
            f"Step 3: Fill in the blank with the correct term - '{question['answer']}'",
            f"Step 4: Verify - User answer '{user_answer}' matches '{correct}': {is_correct}",
        ],
        "verification": {
            "method": "String comparison after normalization",
            "result": "Correct" if is_correct else "Incorrect",
            "correct_answer": question["answer"],
            "explanation": question["explanation"],
        }
    }

def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/evaluate a short answer question."""
    question_id = params.get("question_id", "")
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {"error": f"Question {question_id} not found"}
    return {
        "answer": question["answer"],
        "steps": [
            f"Step 1: Understand the question - '{question['question']}'",
            f"Step 2: Recall relevant concepts from the syllabus node",
            f"Step 3: Structure the answer logically",
            f"Step 4: Check against model answer - '{question['answer']}'",
        ],
        "verification": {
            "method": "Conceptual verification against syllabus",
            "result": "Model answer provided for evaluation",
            "model_answer": question["answer"],
            "explanation": question["explanation"],
            "checklist": [
                "Answer addresses all parts of the question",
                "Key terms/concepts from syllabus are included",
                "Examples are provided where required",
                "Explanation is logically structured",
            ]
        }
    }

def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a numerical question with full computation."""
    question_id = params.get("question_id", "")
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {"error": f"Question {question_id} not found"}
    
    if question["type"] == "numerical":
        data = question["answer"]
        scores = params.get("scores", [12, 18, 15, 20, 14])
        
        n = len(scores)
        total = sum(scores)
        mean = total / n
        
        sorted_scores = sorted(scores)
        if n % 2 == 1:
            median = sorted_scores[n // 2]
        else:
            median = (sorted_scores[n // 2 - 1] + sorted_scores[n // 2]) / 2
        
        variance = sum((x - mean) ** 2 for x in scores) / n
        std_dev = math.sqrt(variance)
        
        return {
            "answer": {"mean": round(mean, 2), "median": round(median, 2)},
            "steps": [
                f"Step 1: List the data - scores: {scores}",
                f"Step 2: Calculate sum = {total}, n = {n}",
                f"Step 3: Mean = sum/n = {total}/{n} = {mean}",
                f"Step 4: Sort data for median: {sorted_scores}",
                f"Step 5: Median (middle value) = {median}",
            ],
            "verification": {
                "method": "Numerical calculation with formula verification",
                "mean_formula": f"Σx/n = {total}/{n} = {mean}",
                "median_formula": f"Middle value of sorted list = {median}",
                "numerical_check": f"Mean ≈ 15.8 (model answer: {data['mean']}), Match: {abs(mean - data['mean']) < 0.01}",
            }
        }
    return {"error": "Not a numerical question"}

def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve/evaluate a long answer question."""
    question_id = params.get("question_id", "")
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question:
        return {"error": f"Question {question_id} not found"}
    return {
        "answer": question["answer"],
        "steps": [
            f"Step 1: Understand all parts of the long answer question - '{question['question']}'",
            f"Step 2: Identify relevant syllabus topics and concepts",
            f"Step 3: Organize answer with introduction, body, conclusion",
            f"Step 4: Include definitions, examples, and distinctions as needed",
            f"Step 5: Review against model answer - '{question['answer']}'",
        ],
        "verification": {
            "method": "Comprehensive rubric-based evaluation",
            "model_answer": question["answer"],
            "key_points_to_cover": [
                "All sub-questions addressed",
                "Correct definitions of key terms",
                "Relevant examples provided",
                "Logical flow and organization",
            ],
            "explanation": question["explanation"],
        }
    }

def solve_question(params: Dict[str, Any]) -> Dict[str, Any]:
    """Unified solver dispatcher."""
    qtype = params.get("type", "").lower()
    if qtype == "mcq":
        return solve_mcq(params)
    elif qtype == "fill_blank":
        return solve_fill_blank(params)
    elif qtype == "short_answer":
        return solve_short_answer(params)
    elif qtype == "long_answer":
        return solve_long_answer(params)
    elif qtype == "numerical":
        return solve_numerical(params)
    else:
        return solve_short_answer(params)


# ============================================================================
# QUESTION GENERATOR
# ============================================================================

def generate_questions(seed: int = 42, count: int = 20) -> List[Dict[str, Any]]:
    """
    Generate a deterministic set of questions from the syllabus.
    
    Args:
        seed: Random seed for deterministic generation
        count: Number of questions to generate
    
    Returns:
        List of question dicts with id, type, question, options, answer, etc.
    """
    rng = random.Random(seed)
    
    # Shuffle the question bank deterministically
    shuffled = QUESTION_BANK[:]
    rng.shuffle(shuffled)
    
    # Determine target composition
    competency_target = count // 2
    standard_target = count - competency_target
    
    selected = []
    competency_pool = [q for q in shuffled if q.get("competency", False)]
    standard_pool = [q for q in shuffled if not q.get("competency", False)]
    
    # Pick competency questions
    rng.shuffle(competency_pool)
    for q in competency_pool:
        if len([s for s in selected if s.get("competency", False)]) >= competency_target:
            break
        selected.append(q)
    
    # Pick standard questions (avoiding duplicates)
    selected_ids = {q["id"] for q in selected}
    remaining = [q for q in standard_pool if q["id"] not in selected_ids]
    rng.shuffle(remaining)
    for q in remaining:
        if len(selected) >= count:
            break
        selected.append(q)
    
    # Pad with remaining if needed
    if len(selected) < count:
        remaining_all = [q for q in shuffled if q["id"] not in selected_ids]
        rng.shuffle(remaining_all)
        for q in remaining_all:
            if len(selected) >= count:
                break
            selected.append(q)
    
    # Build output format
    result = []
    for i, q in enumerate(selected[:count]):
        entry = {
            "id": q["id"],
            "type": q["type"],
            "question": q["question"],
            "answer": q["answer"],
            "explanation": q["explanation"],
            "difficulty": q["difficulty"],
            "topic": q["node"],
            "competency": q.get("competency", False),
            "node_title": SYLLABUS_NODES.get(q["node"], {}).get("title", q["node"]),
            "syllabus_topic": SYLLABUS_NODES.get(q["node"], {}).get("topic", ""),
        }
        if q["type"] == "mcq" and q.get("options"):
            entry["options"] = q["options"]
        if q["type"] == "numerical":
            entry["numerical_params"] = {
                "scores": [12, 18, 15, 20, 14],
                "formula": "mean = sum/count, median = middle value",
            }
        result.append(entry)
    
    return result

def generate_mixed_quiz(seed: int = 42, num_mcq: int = 5, num_fill: int = 3,
                        num_sa: int = 2, num_la: int = 1, num_num: int = 1) -> Dict[str, Any]:
    """
    Generate a structured quiz with specific counts of each type.
    
    Returns a dict with categorized question lists.
    """
    rng = random.Random(seed)
    
    pools = {
        "mcq": [q for q in QUESTION_BANK if q["type"] == "mcq"],
        "fill_blank": [q for q in QUESTION_BANK if q["type"] == "fill_blank"],
        "short_answer": [q for q in QUESTION_BANK if q["type"] == "short_answer"],
        "long_answer": [q for q in QUESTION_BANK if q["type"] == "long_answer"],
        "numerical": [q for q in QUESTION_BANK if q["type"] == "numerical"],
    }
    
    counts = {
        "mcq": num_mcq,
        "fill_blank": num_fill,
        "short_answer": num_sa,
        "long_answer": num_la,
        "numerical": num_num,
    }
    
    result = {"seed": seed, "quiz": {}}
    total_competency = 0
    total_standard = 0
    
    for qtype, pool in pools.items():
        rng.shuffle(pool)
        n = counts.get(qtype, 0)
        selected = pool[:n]
        formatted = []
        for q in selected:
            entry = {
                "id": q["id"],
                "type": q["type"],
                "question": q["question"],
                "answer": q["answer"],
                "explanation": q["explanation"],
                "difficulty": q["difficulty"],
                "topic": SYLLABUS_NODES.get(q["node"], {}).get("title", ""),
                "competency": q.get("competency", False),
                "node_id": q["node"],
            }
            if qtype == "mcq" and q.get("options"):
                entry["options"] = q["options"]
            formatted.append(entry)
            if q.get("competency", False):
                total_competency += 1
            else:
                total_standard += 1
        result["quiz"][qtype] = formatted
    
    result["summary"] = {
        "total_questions": sum(len(v) for v in result["quiz"].values()),
        "competency_based": total_competency,
        "standard": total_standard,
        "competency_percentage": round(total_competency / max(total_competency + total_standard, 1) * 100, 1),
        "nodes_covered": list(set(q["node"] for q in QUESTION_BANK)),
    }
    
    return result


def get_syllabus_coverage() -> Dict[str, Any]:
    """Return coverage statistics of the question bank against syllabus nodes."""
    coverage = {}
    for node_id, node_info in SYLLABUS_NODES.items():
        questions = [q for q in QUESTION_BANK if q["node"] == node_id]
        types = list(set(q["type"] for q in questions))
        competency = [q for q in questions if q.get("competency", False)]
        coverage[node_id] = {
            "title": node_info["title"],
            "total_questions": len(questions),
            "types": types,
            "competency_questions": len(competency),
            "difficulty": node_info["difficulty"],
            "exam_weightage": node_info["exam_weightage"],
        }
    return coverage


# ============================================================================
# VERIFICATION UTILITIES
# ============================================================================

def verify_mcq_answer(question_id: str, selected: str) -> Dict[str, Any]:
    """Verify an MCQ answer with step-by-step reasoning."""
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question or question["type"] != "mcq":
        return {"error": "Invalid MCQ question ID"}
    
    correct = question["answer"]
    is_correct = selected.upper() == correct.upper()
    options = question.get("options", [])
    
    return {
        "question_id": question_id,
        "question": question["question"],
        "selected_option": selected.upper(),
        "correct_option": correct,
        "is_correct": is_correct,
        "all_options": options,
        "verification_steps": [
            f"Step 1: Question - {question['question']}",
            f"Step 2: Selected option - {selected.upper()}",
            f"Step 3: Correct option - {correct}",
            f"Step 4: Match result - {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}",
        ],
        "explanation": question["explanation"],
    }

def verify_fill_blank_answer(question_id: str, user_answer: str) -> Dict[str, Any]:
    """Verify a fill-in-the-blank answer."""
    question = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
    if not question or question["type"] != "fill_blank":
        return {"error": "Invalid fill-blank question ID"}
    
    correct = question["answer"]
    is_correct = user_answer.strip().lower() == correct.lower()
    
    return {
        "question_id": question_id,
        "question": question["question"],
        "user_answer": user_answer,
        "correct_answer": correct,
        "is_correct": is_correct,
        "verification_steps": [
            f"Step 1: Sentence - {question['question']}",
            f"Step 2: User filled - '{user_answer}'",
            f"Step 3: Correct answer - '{correct}'",
            f"Step 4: Match result -"
]}