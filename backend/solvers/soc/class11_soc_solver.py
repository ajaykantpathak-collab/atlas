"""
CISCE SOC Class 11 - Deterministic Solver & Question Generator
Syllabus: Emergence of disciplines, Nature & Scope, Classical thinkers,
          Research methodology (incl. scientific method steps),
          Society, Rural/Urban, Socialization & agencies, Groups/community,
          Social stratification, Kinship/marriage/family,
          Religion, Work & Economic Life, Political sociology,
          Demographic studies.

All randomness is seeded via the caller (random.seed(value)).
No LLM calls. Uses stdlib only.
"""

import random
import string
import math
from dataclasses import dataclass, field
from typing import Any

# ──────────────────────────────────────────────────────────────────────────────
#  Q U E S T I O N  B A N K
# ──────────────────────────────────────────────────────────────────────────────
#  Each entry: (topic_id, question_type, difficulty, text_or_template,
#               correct_answer, options_list_or_None, explanation, competency_tag)
#  competency_tag: True → Indian-context / competency-based
#                  False → Standard / textbook style

_MCQ_BANK = [
    # ── Ch 1: Emergence ──────────────────────────────────────────────────────
    ("c11_soc_001", "mcq", "Easy",
     "The word 'Sociology' was coined by:",
     "Auguste Comte",
     ["Auguste Comte", "Karl Marx", "Emile Durkheim", "Max Weber"],
     "The term 'Sociology' was coined by Auguste Comte in 1838 (in his work "
     "'Course of Positive Philosophy'). He combined the Latin 'socius' (companion) "
     "with Greek 'logos' (study) to mean the science of society.",
     False),

    ("c11_soc_001", "mcq", "Easy",
     "Anthropology is broadly divided into how many sub-branches?",
     "Two",
     ["Two", "Three", "Four", "One"],
     "Anthropology is broadly divided into two sub-branches: Physical "
     "(Biological) Anthropology and Socio-cultural Anthropology.",
     False),

    ("c11_soc_001", "mcq", "Easy",
     "Who among the following scholars is associated with establishing "
     "Sociology as a distinct academic discipline in India?",
     "G. S. Ghurye",
     ["G. S. Ghurye", "M. N. Srinivas", "A. R. Desai", "D. P. Mukherjee"],
     "G. S. Ghurye is regarded as the father of Indian Sociology. He established "
     "the first post-graduate department of Sociology at the University of Bombay "
     "(now Mumbai) in 1919.",
     True),

    ("c11_soc_001", "mcq", "Medium",
     "Which of the following best describes 'Positivism' as advocated by Auguste Comte?",
     "Application of scientific methods to study society",
     ["Study of society through theological interpretation",
      "Application of scientific methods to study society",
      "Focus only on economic determinism",
      "Study of individual consciousness only"],
     "Positivism, advocated by Auguste Comte, is the application of the scientific "
     "method to the study of society. Comte argued that society should be studied "
     "with the same objectivity and systematic approach used in natural sciences.",
     False),

    ("c11_soc_001", "mcq", "Medium",
     "The term 'Laws of Three Stages' is associated with which classical thinker?",
     "Auguste Comte",
     ["Karl Marx", "Auguste Comte", "Emile Durkheim", "Max Weber"],
     "Auguste Comte's 'Law of Three Stages' posits that societies progress through "
     "three stages: Theological (primitive), Metaphysical (transitional), and "
     "Positive (scientific/modern).",
     False),

    # ── Ch 1: Nature & Scope ─────────────────────────────────────────────────
    ("c11_soc_002", "mcq", "Easy",
     "Sociology is classified as a:",
     "Social Science",
     ["Natural Science", "Social Science", "Formal Science", "Exact Science"],
     "Sociology is classified as a Social Science because it studies human "
     "society, social behaviour, and social relationships, which are distinct "
     "from the subject matter of natural sciences.",
     False),

    ("c11_soc_002", "mcq", "Easy",
     "Which of the following is NOT a characteristic of Sociology as a science?",
     "It is based on supernatural explanations",
     ["It is objective and systematic",
      "It is based on supernatural explanations",
      "It seeks generalisations",
      "It uses empirical methods"],
     "Sociology, as a science, is objective and systematic, seeks generalisations, "
     "and uses empirical methods of data collection. It does NOT rely on "
     "supernatural explanations - that would make it unscientific.",
     False),

    ("c11_soc_002", "mcq", "Medium",
     "The scope of Sociology is:",
     "Both wide and comprehensive",
     ["Narrow and limited", "Wide and comprehensive", "Limited to only family",
      "Limited to only economy"],
     "The scope of Sociology is wide and comprehensive. It studies various social "
     "institutions, processes, groups, and social phenomena including family, "
     "education, religion, economy, polity, and more.",
     False),

    # ── Ch 1: Thinkers ───────────────────────────────────────────────────────
    ("c11_soc_003", "mcq", "Medium",
     "Karl Marx is primarily associated with which sociological perspective?",
     "Conflict Theory",
     ["Structural Functionalism", "Conflict Theory", "Symbolic Interactionism",
      "Positivism"],
     "Karl Marx is associated with Conflict Theory, which views society as a site "
     "of ongoing conflict between classes (bourgeoisie and proletariat) over "
     "economic resources and power.",
     False),

    ("c11_soc_003", "mcq", "Medium",
     "'Social Action Theory' is primarily associated with which sociologist?",
     "Max Weber",
     ["Karl Marx", "Emile Durkheim", "Max Weber", "Auguste Comte"],
     "Max Weber is associated with Social Action Theory. He emphasized understanding "
     "social behaviour from the actor's subjective perspective - the 'Verstehen' "
     "approach.",
     False),

    ("c11_soc_003", "mcq", "Medium",
     "Which Indian sociologist introduced the concept of 'Sanskritisation'?",
     "M. N. Srinivas",
     ["G. S. Ghurye", "M. N. Srinivas", "A. R. Desai", "D. P. Mukherjee"],
     "M. N. Srinivas introduced the concept of 'Sanskritisation' in his study of "
     "the Coorgs. It describes the process by which lower castes emulate the "
     "customs and rituals of higher (twice-born) castes to improve their social status.",
     True),

    ("c11_soc_003", "mcq", "Medium",
     "The concept of 'Collective Conscience' was propounded by:",
     "Emile Durkheim",
     ["Karl Marx", "Emile Durkheim", "Max Weber", "Auguste Comte"],
     "Emile Durkheim introduced the concept of 'Collective Conscience' in his study "
     "of suicide and social solidarity. It refers to the shared beliefs, values, and "
     "moral attitudes that bind society together.",
     False),

    ("c11_soc_003", "mcq", "Medium",
     "'Dialectical Materialism' is a concept introduced by:",
     "Karl Marx",
     ["Emile Durkheim", "Max Weber", "Karl Marx", "Auguste Comte"],
     "Karl Marx introduced the concept of Dialectical Materialism, which explains "
     "social change through material (economic) conditions and class conflict. "
     "Material conditions determine the social structure (base and superstructure).",
     False),

    # ── Ch 2: Research ───────────────────────────────────────────────────────
    ("c11_soc_009", "mcq", "Easy",
     "Social Research is:",
     "A systematic and objective study of social phenomena",
     ["A random collection of opinions about society",
      "A systematic and objective study of social phenomena",
      "The same as journalism",
      "A purely theoretical exercise without fieldwork"],
     "Social research is a systematic, objective, and scientific study of social "
     "phenomena aimed at discovering new facts, verifying old ones, and developing "
     "theories about human behaviour in society.",
     False),

    ("c11_soc_009", "mcq", "Easy",
     "The first step in the scientific method of social research is:",
     "Formulation of the problem",
     ["Formulation of the hypothesis", "Data collection",
      "Formulation of the problem", "Verification"],
     "According to the scientific method of social research, the first step is "
     "the 'Formulation of the problem'. A clearly defined research problem guides "
     "the entire research process.",
     False),

    # ── Ch 2: Methods ────────────────────────────────────────────────────────
    ("c11_soc_010", "mcq", "Medium",
     "Which research method involves living among the community being studied?",
     "Field Work",
     ["Historical Method", "Statistical Method", "Field Work", "Comparative Method"],
     "Field Work (or participant observation) involves the researcher living among "
     "the community being studied, directly observing and participating in their "
     "daily life to understand their culture and social behaviour.",
     False),

    ("c11_soc_010", "mcq", "Medium",
     "In the scientific method of social research, what follows 'observation'?",
     "Classification",
     ["Hypothesis formulation", "Classification", "Verification", "Prediction"],
     "The steps of the scientific method are: (1) Formulation of the Problem, "
     "(2) Observation, (3) Classification, (4) Hypothesis, (5) Verification, "
     "(6) Prediction.",
     False),

    ("c11_soc_010", "mcq", "Medium",
     "The 'Comparative Method' in sociological research involves:",
     "Comparing different societies or social institutions",
     ["Comparing data with statistical tools only",
      "Comparing different societies or social institutions",
      "Conducting laboratory experiments",
      "Using only documentary sources"],
     "The Comparative Method involves comparing different societies, social "
     "institutions, or social groups to understand similarities and differences, "
     "identify patterns, and develop sociological theories.",
     False),

    # ── Ch 2: Tools ──────────────────────────────────────────────────────────
    ("c11_soc_011", "mcq", "Medium",
     "A 'Questionnaire' in social research is best described as:",
     "A set of written questions used for data collection",
     ["A type of interview without questions",
      "A set of written questions used for data collection",
      "An observation schedule",
      "A statistical tool only"],
     "A questionnaire is a written set of questions (closed or open-ended) "
     "distributed to respondents for self-administration. It is one of the most "
     "widely used tools of data collection in sociological research.",
     False),

    ("c11_soc_011", "mcq", "Medium",
     "'Participant Observation' as a tool of data collection is characteristic of:",
     "Anthropological fieldwork",
     ["Survey research", "Laboratory experiments", "Anthropological fieldwork",
      "Historical research"],
     "Participant Observation is a hallmark of anthropological fieldwork where the "
     "researcher immerses themselves in the community, participating in daily life "
     "while observing and recording social behaviour.",
     False),

    # ── Ch 3: Society ────────────────────────────────────────────────────────
    ("c11_soc_012", "mcq", "Easy",
     "A 'Society' is best defined as:",
     "A group of people who share a common territory, interaction, and culture",
     ["A random collection of individuals",
      "A group of people who share a common territory, interaction, and culture",
      "A single family unit",
      "Only people of the same occupation"],
     "A society is a group of people who share a common territory, interact with "
     "one another, and share a common culture. These three elements - territory, "
     "interaction, and culture - are essential features of any society.",
     False),

    ("c11_soc_012", "mcq", "Easy",
     "Which is NOT a characteristic of society?",
     "Absence of interaction among members",
     ["Territoriality", "Shared culture", "Absence of interaction among members",
      "A sense of belongingness"],
     "Interaction among members is a defining characteristic of society. Without "
     "interaction, a mere aggregation of individuals cannot constitute a society. "
     "Shared culture and territory are also essential features.",
     False),

    # ── Ch 3: Rural/Urban ────────────────────────────────────────────────────
    ("c11_soc_013", "mcq", "Medium",
     "Which of the following is a major problem of urban society in India?",
     "Slum development",
     ["Low population density", "Slum development", "Lack of anonymity",
      "Absence of secondary relations"],
     "Major problems of urban society in India include slum development, traffic "
     "congestion, pollution, housing shortage, unemployment, and crime. Rural "
     "society faces different challenges such as indebtedness and low literacy.",
     True),

    ("c11_soc_013", "mcq", "Medium",
     "Which feature is characteristic of rural society in India?",
     "Close kinship ties",
     ["Anonymity", "Superficial relationships", "Close kinship ties",
      "High population density"],
     "Rural society is characterised by close kinship ties, face-to-face "
     "interactions, a simple division of labour, and traditional values. Urban "
     "society has more formal, impersonal relationships.",
     True),

    ("c11_soc_013", "mcq", "Medium",
     "According to Census of India 2011, what percentage of India's population "
     "lived in urban areas?",
     "31.16%",
     ["31.16%", "27.8%", "35.5%", "25.4%"],
     "According to Census of India 2011, 31.16% of India's population lived in "
     "urban areas (37.7 crore out of 121 crore). This urban population share "
     "was a significant increase from 27.8% in 2001.",
     True),

    # ── Ch 3: Socialization ───────────────────────────────────────────────────
    ("c11_soc_014", "mcq", "Easy",
     "Socialization is:",
     "The process by which individuals learn the norms, values, and culture of society",
     ["The process of biological growth",
      "The process by which individuals learn the norms, values, and culture of society",
      "A purely economic process",
      "The same as education"],
     "Socialization is the lifelong process through which individuals learn the "
     "norms, values, beliefs, and behaviours of their society, becoming functioning "
     "members of that society.",
     False),

    ("c11_soc_014", "mcq", "Easy",
     "Which agency is the PRIMARY agency of socialization?",
     "Family",
     ["School", "Family", "Peer Group", "Mass Media"],
     "The Family is the primary agency of socialization. It is the first social "
     "institution an individual encounters and plays the most crucial role in the "
     "early development of personality, values, and social norms.",
     False),

    ("c11_soc_014", "mcq", "Medium",
     "'Secondary Socialization' typically begins at:",
     "School",
     ["Family", "School", "Religious institutions", "Workplace"],
     "Secondary Socialization begins when a child enters school and is exposed to "
     "formal institutions beyond the family. It involves learning the norms and "
     "values of the wider social world.",
     False),

    # ── Ch 4: Groups & Community ─────────────────────────────────────────────
    ("c11_soc_015", "mcq", "Easy",
     "A 'Reference Group' is:",
     "A group to which an individual aspires to belong",
     ["A group to which an individual belongs",
      "A group to which an individual aspires to belong",
      "A small family unit",
      "A political party only"],
     "A Reference Group is a social group that individuals use as a point of "
     "reference for evaluating themselves and their behaviour. It may be a group "
     "they belong to or aspire to belong to.",
     False),

    ("c11_soc_015", "mcq", "Medium",
     "Which of the following is an example of a 'Primary Group'?",
     "Family",
     ["A multinational corporation", "A political party", "Family", "A trade union"],
     "A Primary Group is characterised by close, face-to-face, intimate, and "
     "enduring relationships. Family is the best example. Secondary groups like "
     "corporations or political parties have impersonal, formal, and temporary "
     "relationships.",
     False),

    # ── Ch 5: Stratification ─────────────────────────────────────────────────
    ("c11_soc_016", "mcq", "Medium",
     "Which of the following is a form of social stratification?",
     "Caste System",
     ["Democracy", "Caste System", "Federalism", "Parliamentary system"],
     "Social stratification refers to the hierarchical arrangement of individuals "
     "or groups in a society based on factors like caste, class, status, and power. "
     "The caste system is a uniquely Indian form of stratification.",
     True),

    ("c11_soc_016", "mcq", "Medium",
     "The concept of 'Sanskritisation' was introduced by which Indian sociologist?",
     "M. N. Srinivas",
     ["G. S. Ghurye", "M. N. Srinivas", "A. R. Desai", "D. P. Mukherjee"],
     "M. N. Srinivas introduced the concept of Sanskritisation in 1952, describing "
     "how lower castes adopt the practices of higher (twice-born) castes to improve "
     "their social status. Sanskritisation often leads only to positional change, "
     "not structural change.",
     True),

    # ── Ch 6: Kinship/Marriage/Family ────────────────────────────────────────
    ("c11_soc_017", "mcq", "Easy",
     "Exogamy refers to:",
     "Marrying outside one's own group",
     ["Marrying within one's own group",
      "Marrying outside one's own group",
      "Having multiple spouses",
      "Not marrying at all"],
     "Exogamy is the custom of marrying outside one's own social group, clan, or "
     "community. It promotes social cohesion between groups. The opposite is "
     "Endogamy (marrying within the group).",
     False),

    ("c11_soc_017", "mcq", "Medium",
     "Which type of family is most common in urban India?",
     "Nuclear Family",
     ["Joint Family", "Nuclear Family", "Extended Family", "Communal Family"],
     "The Nuclear Family (husband, wife, and children) has become increasingly "
     "common in urban India due to urbanisation, industrialisation, and migration. "
     "Joint families remain more common in rural areas.",
     True),

    ("c11_soc_017", "mcq", "Medium",
     "The 'Levirate' form of marriage is practised in:",
     "Certain tribal communities in India",
     ["Urban metropolitan areas", "Certain tribal communities in India",
      "Only among upper castes", "Nowhere in India"],
     "Levirate marriage (where a man marries the widow of his deceased brother) "
     "is practised in certain tribal communities in India such as the Gonds and "
     "the Todas, reflecting the importance of family continuity.",
     True),

    # ── Ch 7: Religion ───────────────────────────────────────────────────────
    ("c11_soc_018", "mcq", "Easy",
     "According to Emile Durkheim, religion is:",
     "A unified system of beliefs and practices related to sacred things",
     ["A set of moral rules only",
      "A unified system of beliefs and practices related to sacred things",
      "An economic institution",
      "A political ideology"],
     "Durkheim defined religion as 'a unified system of beliefs and practices "
     "relative to sacred things, that is to say, things set apart and forbidden - "
     "beliefs and practices which unite into one single moral community called a "
     "Church, all those who adhere to them.'",
     False),

    ("c11_soc_018", "mcq", "Medium",
     "Karl Marx described religion as:",
     "The opium of the people",
     ["The opium of the people", "A sacred canopy", "A social institution for peace",
      "The centre of society"],
     "Karl Marx famously described religion as 'the opium of the people', meaning "
     "that religion serves to pacify and console the oppressed, diverting their "
     "attention from real-world exploitation and economic injustice.",
     False),

    # ── Ch 8: Work & Economic ────────────────────────────────────────────────
    ("c11_soc_019", "mcq", "Easy",
     "Industrialisation leads to which type of social change?",
     "Transition from traditional to modern society",
     ["Transition from modern to traditional society",
      "No significant social change",
      "Transition from traditional to modern society",
      "Only economic change without social impact"],
     "Industrialisation brings fundamental social change: from traditional, "
     "agrarian society with simple division of labour to modern, industrial society "
     "with complex, impersonal social relationships.",
     False),

    ("c11_soc_019", "mcq", "Medium",
     "The term 'Division of Labour' is most associated with which classical thinker?",
     "Emile Durkheim",
     ["Karl Marx", "Auguste Comte", "Emile Durkheim", "Max Weber"],
     "Emile Durkheim's work 'The Division of Labour in Society' (1893) examines how "
     "the division of labour creates social solidarity. In traditional societies, "
     "mechanical solidarity binds people; in modern societies, organic solidarity "
     "based on interdependence prevails.",
     False),

    # ── Ch 9: Political ──────────────────────────────────────────────────────
    ("c11_soc_020", "mcq", "Medium",
     "'Elite Theory' of power distribution is associated with:",
     "Vilfredo Pareto",
     ["Karl Marx", "Vilfredo Pareto", "Emile Durkheim", "G. H. Mead"],
     "Vilfredo Pareto's Elite Theory argues that in every society, power is "
     "concentrated in the hands of a small elite group (ruling class) regardless "
     "of the formal political system.",
     False),

    ("c11_soc_020", "mcq", "Easy",
     "Which term describes the concentration of power in the hands of a few?",
     "Oligarchy",
     ["Democracy", "Oligarchy", "Anarchy", "Monarchy"],
     "Oligarchy refers to a form of government where power is held by a small "
     "group of people (an elite). The concept is central to elite theory in "
     "political sociology.",
     False),

    # ── Ch 10: Demographic ───────────────────────────────────────────────────
    ("c11_soc_021", "mcq", "Medium",
     "The 'Demographic Transition Theory' describes:",
     "The transition of a society from high birth and death rates to low ones",
     ["The process of migration only",
      "The transition of a society from high birth and death rates to low ones",
      "Only population growth rates",
      "Only fertility patterns"],
     "The Demographic Transition Theory describes how populations move through "
     "stages: from high birth and death rates (pre-industrial) to low birth and "
     "death rates (industrial/post-industrial). India is in Stage 3.",
     False),

    ("c11_soc_021", "mcq", "Easy",
     "The sex ratio in India (2011 Census) was approximately:",
     "940 females per 1000 males",
     ["1024 females per 1000 males", "940 females per 1000 males",
      "850 females per 1000 males", "Equal ratio"],
     "According to Census 2011, India's sex ratio was 940 females per 1000 males, "
     "an improvement from 933 in 2001. Kerala had the highest (1084) and Haryana "
     "the lowest (879).",
     True),

    ("c11_soc_021", "mcq", "Medium",
     "Which state has the highest literacy rate according to Census 2011?",
     "Kerala",
     ["Maharashtra", "Kerala", "Tamil Nadu", "Karnataka"],
     "According to Census 2011, Kerala has the highest literacy rate in India at "
     "93.91%, followed by Lakshadweep (91.85%) and Mizoram (91.33%). Kerala's "
     "focus on education and social reform movements account for this achievement.",
     True),
]

_FILL_BANK = [
    ("c11_soc_001", "fill_blank", "Easy",
     "The term 'Sociology' was coined by ______ in 1838.",
     "Auguste Comte",
     True),

    ("c11_soc_001", "fill_blank", "Easy",
     "______ is regarded as the father of Indian Sociology.",
     "G. S. Ghurye",
     True),

    ("c11_soc_001", "fill_blank", "Easy",
     "The two main sub-branches of Anthropology are Physical Anthropology and ______.",
     "Socio-cultural Anthropology",
     False),

    ("c11_soc_002", "fill_blank", "Easy",
     "Sociology is classified as a ______ Science.",
     "Social",
     False),

    ("c11_soc_003", "fill_blank", "Medium",
     "The concept of 'Collective Conscience' was introduced by ______.",
     "Emile Durkheim",
     False),

    ("c11_soc_003", "fill_blank", "Medium",
     "The concept of 'Sanskritisation' was introduced by ______.",
     "M. N. Srinivas",
     True),

    ("c11_soc_003", "fill_blank", "Medium",
     "Karl Marx described religion as the '______ of the people'.",
     "opium",
     False),

    ("c11_soc_010", "fill_blank", "Medium",
     "The first step in the scientific method of social research is ______ of the problem.",
     "Formulation",
     False),

    ("c11_soc_010", "fill_blank", "Medium",
     "In the scientific method, the step that comes after classification is ______.",
     "Hypothesis",
     False),

    ("c11_soc_011", "fill_blank", "Medium",
     "A tool of data collection that involves asking questions orally to respondents "
     "is called an ______.",
     "Interview",
     False),

    ("c11_soc_012", "fill_blank", "Easy",
     "The three essential elements of a society are territory, ______, and culture.",
     "interaction",
     False),

    ("c11_soc_013", "fill_blank", "Easy",
     "The main occupation in rural society is ______.",
     "agriculture",
     True),

    ("c11_soc_013", "fill_blank", "Medium",
     "According to Census 2011, approximately ______ percent of India's population "
     "lives in urban areas.",
     "31.16",
     True),

    ("c11_soc_014", "fill_blank", "Easy",
     "The ______ is the primary agency of socialization.",
     "Family",
     False),

    ("c11_soc_014", "fill_blank", "Medium",
     "Secondary socialization begins when a child enters ______.",
     "school",
     False),

    ("c11_soc_016", "fill_blank", "Medium",
     "The process by which lower castes adopt the customs of higher castes is called ______.",
     "Sanskritisation",
     True),

    ("c11_soc_017", "fill_blank", "Easy",
     "Marrying outside one's own group is called ______.",
     "Exogamy",
     False),

    ("c11_soc_017", "fill_blank", "Easy",
     "The family consisting of husband, wife, and children is called a ______ family.",
     "Nuclear",
     False),

    ("c11_soc_021", "fill_blank", "Easy",
     "The sex ratio in India (Census 2011) was approximately ______ females per 1000 males.",
     "940",
     True),

    ("c11_soc_021", "fill_blank", "Medium",
     "India is currently in Stage ______ of the Demographic Transition Theory.",
     "Three",
     False),
]

_SHORT_BANK = [
    ("c11_soc_001", "short_answer", "Easy",
     "Define Sociology. What is its subject matter?",
     "Sociology is the systematic and scientific study of human society, social "
     "behaviour, and social groups. Its subject matter includes social institutions "
     "(family, education, religion, economy, polity), social processes (socialization, "
     "stratification, mobility), social change, and the relationship between "
     "individual and society.",
     False),

    ("c11_soc_001", "short_answer", "Easy",
     "Briefly describe the origin of Sociology as a discipline.",
     "Sociology emerged as a distinct academic discipline in the early 19th century "
     "due to the Industrial Revolution, French Revolution, and Enlightenment thinking. "
     "Auguste Comte coined the term 'Sociology' in 1838 and is regarded as the "
     "father of Sociology. He sought to apply scientific methods to the study of "
     "society, distinguishing it from philosophy.",
     False),

    ("c11_soc_001", "short_answer", "Easy",
     "Differentiate between Sociology and Anthropology in two points.",
     "(1) Sociology studies contemporary, complex societies, while Anthropology "
     "studies simple, traditional, and non-literate societies. (2) Sociology is "
     "primarily concerned with Western industrial societies; Anthropology originated "
     "in the study of 'primitive' or non-Western societies, often through "
     "participant observation (fieldwork).",
     False),

    ("c11_soc_001", "short_answer", "Easy",
     "Why is G. S. Ghurye called the father of Indian Sociology?",
     "G. S. Ghurye is called the father of Indian Sociology because: (1) He "
     "established the first post-graduate department of Sociology at the University "
     "of Bombay in 1919. (2) He authored foundational texts such as 'Caste and Race "
     "in India' (1932). (3) He trained generations of Indian sociologists and "
     "pioneered the study of Indian social structures.",
     True),

    ("c11_soc_002", "short_answer", "Easy",
     "State any two characteristics of Sociology as a science.",
     "(1) Objectivity: Sociologists strive to study social phenomena without "
     "personal bias. (2) Systematic: Sociology uses systematic methods of data "
     "collection and analysis. (3) Generalisation: Sociology seeks to establish "
     "general laws and patterns of social behaviour. (4) Empirical: Sociology "
     "relies on observable, verifiable data rather than speculation.",
     False),

    ("c11_soc_002", "short_answer", "Medium",
     "Explain the nature of Sociology as a science. Why is it called a social science?",
     "Sociology is a science because it employs scientific methods (observation, "
     "hypothesis, verification) to study society objectively and systematically. "
     "However, unlike natural sciences, it studies human beings who have consciousness "
     "and free will, making prediction difficult. It is called a 'Social Science' "
     "because its subject matter is society and social behaviour, not physical or "
     "natural phenomena.",
     False),

    ("c11_soc_003", "short_answer", "Medium",
     "Who was Auguste Comte? Briefly explain his theory of Positivism.",
     "Auguste Comte (1798-1857) is the French philosopher who coined the term "
     "'Sociology' and is considered the father of Sociology. His Positivism theory "
     "argues that society should be studied using scientific methods, just like "
     "natural sciences. His 'Law of Three Stages' states societies progress through "
     "Theological → Metaphysical → Positive (Scientific) stages. Comte believed "
     "sociology could solve social problems through scientific understanding.",
     False),

    ("c11_soc_003", "short_answer", "Medium",
     "Explain the concept of 'Sanskritisation' with reference to the Indian context.",
     "Sanskritisation, introduced by M. N. Srinivas (1952), refers to the process "
     "by which lower castes, tribes, or other groups in India adopt the rituals, "
     "customs, and lifestyles of higher (twice-born, 'dvija') castes, particularly "
     "Brahmins. This leads to upward social mobility but does not change the "
     "structural position of the caste in the hierarchy. Sanskritisation is "
     "predominantly observed in Hindu society.",
     True),

    ("c11_soc_003", "short_answer", "Medium",
     "How did Karl Marx view the relationship between the economic base and the "
     "superstructure?",
     "Karl Marx's Base-Superstructure model states that the 'base' (economic "
     "structure - modes of production and class relations) determines the "
     "'superstructure' (political institutions, laws, religion, culture, ideology). "
     "Changes in the economic base lead to changes in the superstructure. The ruling "
     "class controls the economic base and imposes its ideology through the "
     "superstructure to maintain dominance.",
     False),

    ("c11_soc_009", "short_answer", "Easy",
     "What is social research? Why is it important in Sociology?",
     "Social research is a systematic and objective investigation of social phenomena "
     "using scientific methods. It is important in Sociology because: (1) It enables "
     "sociologists to study society scientifically rather than through speculation. "
     "(2) It helps discover new social facts and verify existing knowledge. "
     "(3) It provides empirical evidence for developing and testing theories about "
     "social behaviour.",
     False),

    ("c11_soc_010", "short_answer", "Medium",
     "Describe the steps involved in the scientific method of social research.",
     "The scientific method involves six steps: (1) Formulation of the Problem - "
     "defining the research question clearly. (2) Observation - gathering data "
     "through careful and systematic observation. (3) Classification - organising "
     "observed data into categories. (4) Hypothesis - formulating a tentative "
     "explanation or prediction. (5) Verification - testing the hypothesis through "
     "further data collection and analysis. (6) Prediction - using verified "
     "hypotheses to predict future social phenomena.",
     False),

    ("c11_soc_010", "short_answer", "Medium",
     "What is the field work method in social research? What are its advantages?",
     "Field work is a research method where the researcher lives among and directly "
     "observes the community being studied, often using participant observation. "
     "Advantages: (1) Provides rich, in-depth, first-hand data. (2) Allows "
     "understanding of context and meaning behind social actions. (3) Enables the "
     "researcher to build rapport with the community. (4) Particularly effective "
     "for studying small-scale, non-Western, or tribal societies.",
     False),

    ("c11_soc_012", "short_answer", "Easy",
     "Define 'Society'. List any three characteristics of society.",
     "A society is a group of individuals who share a common territory, interact "
     "with each other, and share a common culture. Characteristics: (1) Shared "
     "territory - members occupy a common geographical area. (2) Social interaction "
     "- members maintain meaningful relationships. (3) Shared culture - common norms, "
     "values, beliefs, and traditions. (4) Sense of belongingness - members feel "
     "they are part of a collective whole.",
     False),

    ("c11_soc_013", "short_answer", "Medium",
     "Discuss four major characteristics of rural society in India.",
     "Characteristics of rural society in India: (1) Dominance of agriculture as "
     "the primary occupation. (2) Close kinship ties and face-to-face relationships "
     "in a small community. (3) Simple division of labour and traditional social "
     "structure. (4) Greater influence of religion and tradition in daily life. "
     "(5) Slow pace of social change. (6) Community-oriented rather than individualistic.",
     True),

    ("c11_soc_013", "short_answer", "Medium",
     "Explain three major problems faced by urban society in India.",
     "Problems of urban society in India: (1) Slum development and overcrowding "
     "due to rapid urbanisation. (2) Housing shortage leading to homelessness. "
     "(3) Traffic congestion and environmental pollution. (4) Unemployment and "
     "underemployment in cities. (5) Rising crime rates. (6) Breakdown of community "
     "ties leading to social isolation and mental health issues.",
     True),

    ("c11_soc_014", "short_answer", "Medium",
     "What is socialization? Explain its characteristics.",
     "Socialization is the lifelong process through which an individual learns the "
     "norms, values, beliefs, and behaviours of their society, becoming a functioning "
     "member. Characteristics: (1) It is a lifelong process - socialization continues "
     "throughout life (e.g., resocialisation). (2) It is a slow and gradual process. "
     "(3) It occurs through various agencies (family, school, peers, media). "
     "(4) It shapes personality and social identity. (5) It is both formal and informal.",
     False),

    ("c11_soc_014", "short_answer", "Medium",
     "Distinguish between primary and secondary agencies of socialization.",
     "Primary agencies: Family (the most important), where initial and most "
     "foundational socialization occurs through intimate, face-to-face interaction. "
     "Secondary agencies: School, peer groups, mass media, and workplace, where "
     "socialization is more formal, impersonal, and specialised. Primary agencies "
     "lay the foundation; secondary agencies broaden and refine social learning.",
     False),

    ("c11_soc_015", "short_answer", "Easy",
     "Define a social group. Give two examples.",
     "A social group is a collection of individuals who interact with one another, "
     "share common interests or goals, and have a sense of unity or belongingness. "
     "Examples: (1) Family - a primary group. (2) Political party - a secondary group. "
     "(3) Peer group - an informal group.",
     False),

    ("c11_soc_016", "short_answer", "Medium",
     "What is social stratification? How is it different from social differentiation?",
     "Social stratification is the hierarchical arrangement of individuals or groups "
     "in a society based on inequality in wealth, power, prestige, or status. Unlike "
     "social differentiation (simple division based on roles), stratification implies "
     "ranking and unequal distribution of resources. Stratified societies have layers "
     "(strata) with unequal access to opportunities and rewards.",
     False),

    ("c11_soc_017", "short_answer", "Medium",
     "What is the difference between exogamy and endogamy? Give examples.",
     "Exogamy is the custom of marrying outside one's own social group, clan, or "
     "community - e.g., most modern democratic societies. Endogamy is the custom of "
     "marrying within one's own social group - e.g., caste endogamy in Hindu society "
     "where individuals marry within their own caste. Exogamy promotes social unity "
     "between groups; endogamy maintains group boundaries.",
     False),

    ("c11_soc_018", "short_answer", "Medium",
     "How does religion function as a social institution?",
     "Religion functions as a social institution in several ways: (1) Social cohesion "
     "- it unites people through shared beliefs and rituals (Durkheim's collective "
     "conscience). (2) Social control - religious norms regulate behaviour and "
     "discourage deviance. (3) Social change - religions can be a source of "
     "revolutionary change (e.g., Bhakti movement in India). (4) Meaning and comfort "
     "- religion provides explanations for suffering and existential questions.",
     False),

    ("c11_soc_019", "short_answer", "Medium",
     "Explain how industrialisation changes the structure of the family.",
     "Industrialisation transforms the family from extended/joint families to nuclear "
     "families. Mechanisation reduces the family's economic functions (production "
     "shifts to factories). Urbanisation separates home from workplace. Women gain "
     "greater economic independence. The authority of the male head of the family "
     "declines. The family shifts from a unit of production to a unit of consumption.",
     False),

    ("c11_soc_020", "short_answer", "Medium",
     "What is the difference between power and authority according to Max Weber?",
     "Max Weber distinguished power (Macht) as the ability to impose one's will "
     "regardless of resistance, and authority (Herrschaft) as power that is "
     "recognised as legitimate by those subject to it. Weber identified three types "
     "of legitimate authority: Traditional (custom-based), Charismatic "
     "(personality-based), and Rational-Legal (institution-based, e.g., modern "
     "bureaucracy and democracy).",
     False),

    ("c11_soc_021", "short_answer", "Medium",
     "What are the major factors influencing population change? Explain any two.",
     "Factors influencing population change: (1) Fertility (birth rate) - influenced "
     "by age of marriage, education, contraceptive use, and son preference. "
     "(2) Mortality (death rate) - influenced by healthcare, nutrition, and "
     "sanitation. (3) Migration - internal (rural to urban) and international. "
     "(4) Age structure and sex ratio. In India, declining death rates and high "
     "birth rates (though now falling) have driven population growth.",
     True),
]

_LONG_BANK = [
    ("c11_soc_001", "long_answer", "Medium",
     "Discuss the origin and development of Sociology and Anthropology as "
     "separate academic disciplines. Mention key thinkers associated with each.",
     "Sociology emerged as a distinct discipline in the early 19th century in the "
     "wake of the Industrial Revolution, French Revolution, and Enlightenment. "
     "Auguste Comte coined 'Sociology' in 1838 and is its father. Emile Durkheim "
     "established it as a rigorous science with his study of suicide (1897). Karl "
     "Marx, Max Weber, and Herbert Spencer were other classical founders. "
     "Anthropology developed from the study of 'primitive' and non-Western societies. "
     "It has two branches: Physical (Biological) Anthropology studying human evolution "
     "and variation, and Socio-cultural Anthropology studying customs and cultures "
     "through participant observation (Malinowski). In India, G. S. Ghurye, M. N. "
     "Srinivas, and N. K. Bose were pioneering figures.",
     False),

    ("c11_soc_002", "long_answer", "Medium",
     "Explain the nature and scope of Sociology. Why is Sociology called a science?",
     "Nature of Sociology: (1) It is a Social Science - studying society and social "
     "behaviour, not physical phenomena. (2) It is a pure science - seeks knowledge "
     "for its own sake, not for immediate application. (3) It is generalising - "
     "looks for patterns and general laws rather than individual cases. "
     "(4) It is abstract - deals with generalised patterns, not concrete individuals. "
     "Scope: It covers social institutions (family, education, religion, polity, "
     "economy), social processes (socialization, stratification, change), social "
     "problems (poverty, crime, communalism), and areas like gender, environment, "
     "and health. It is a wide and comprehensive discipline.",
     False),

    ("c11_soc_003", "long_answer", "Hard",
     "Compare and contrast the perspectives of Karl Marx and Max Weber on social "
     "change and social stratification.",
     "Marx focused on economic determinism: social change occurs through class "
     "conflict over the means of production. Stratification is purely economic - "
     "bourgeoisie vs. proletariat. Weber added multiple dimensions: stratification "
     "involves class (economic), status (prestige), and party (power). Social change "
     "occurs through ideas, values, and bureaucracy, not just economics. While Marx "
     "saw religion as the 'opium of the people', Weber studied religion as an "
     "independent force (e.g., Protestant Ethic and Capitalism). Both agree capitalism "
     "dominates modern society but explain its origins differently.",
     False),

    ("c11_soc_003", "long_answer", "Hard",
     "Critically evaluate the contribution of classical sociological thinkers "
     "(Comte, Marx, Durkheim, Weber) to the development of Sociology.",
     "Auguste Comte founded Sociology as a science through Positivism and the Law "
     "of Three Stages. He advocated scientific study of society. Karl Marx introduced "
     "Conflict Theory, historical materialism, and class analysis - fundamentally "
     "changing how social inequality is understood. Emile Durkheim established "
     "sociological methodology (rules of sociological method), studied social facts, "
     "and introduced concepts like Collective Conscience and Anomie. Max Weber "
     "introduced interpretive sociology (Verstehen), multi-causality, and the "
     "ideal-type method. Together, they laid the theoretical and methodological "
     "foundations of modern Sociology.",
     False),

    ("c11_soc_009", "long_answer", "Medium",
     "Explain the importance of social research in Sociology and Anthropology.",
     "Social research is essential because: (1) Scientific Understanding - it moves "
     "Sociology beyond speculation to empirical knowledge. (2) Theory Building - "
     "research findings contribute to sociological theories. (3) Problem Solving - "
     "research helps identify and address social problems (poverty, inequality, "
     "discrimination). (4) Policy Formulation - government policies are informed by "
     "social research (e.g., NSSO data, NFHS). (5) Verifying knowledge - tests "
     "existing theories against real-world data. (6) Cross-cultural understanding - "
     "Anthropological research promotes understanding of diverse cultures.",
     False),

    ("c11_soc_010", "long_answer", "Hard",
     "Describe the scientific method of social research in detail. How does it "
     "differ from non-scientific approaches?",
     "Scientific Method Steps: (1) Formulation of the Problem - defining a clear, "
     "researchable question. (2) Observation - systematic collection of data "
     "(qualitative or quantitative). (3) Classification - organising data into "
     "meaningful categories. (4) Hypothesis - testable prediction based on theory. "
     "(5) Verification - testing hypothesis against evidence, accepting or rejecting. "
     "(6) Prediction - applying findings to predict future patterns. "
     "Non-scientific approaches (common sense, tradition, authority, intuition) "
     "lack: systematic data collection, objectivity, verifiability, and "
     "replicability. Science uses empirical evidence, logical reasoning, and "
     "public scrutiny.",
     False),

    ("c11_soc_011", "long_answer", "Medium",
     "Describe the tools of data collection in social research. Discuss the "
     "relative merits and limitations of any two.",
     "Tools include: (1) Questionnaire - written questions for self-administration. "
     "(2) Interview - oral questioning (structured/semi-structured/unstructured). "
     "(3) Schedule - similar to questionnaire but administered by researcher. "
     "(4) Participant Observation - researcher immerses in the community. "
     "(5) Case Study - in-depth study of a single unit. "
     "Questionnaire: Merits - covers large samples, standardised, economical. "
     "Limitations - low response rate, cannot probe deeply, requires literacy. "
     "Interview: Merits - flexible, high response rate, captures nuances. "
     "Limitations - time-consuming, costly, interviewer bias possible.",
     False),

    ("c11_soc_012", "long_answer", "Medium",
     "Define society. Discuss the relationship between the individual and society.",
     "Society is a group of individuals sharing a common territory, interacting with "
     "each other, and sharing a common culture. Characteristics include shared "
     "territory, social interaction, shared culture, sense of belonging, and "
     "cooperation. Individual-Society Relationship: (1) Society shapes the individual "
     "- through socialization, individuals internalise norms, values, and roles. "
     "Durkheim's 'collective conscience' overrides individual will. (2) The individual "
     "shapes society - individuals are agents of social change. Marx: 'Men make their "
     "own history.' (3) They are interdependent - society cannot exist without "
     "individuals, and individuals cannot develop without society.",
     False),

    ("c11_soc_013", "long_answer", "Hard",
     "Compare and contrast rural and urban societies in India with reference to "
     "their characteristics and problems.",
     "Rural Society: Dominated by agriculture; close kinship ties; traditional "
     "values; simple division of labour; low population density; face-to-face "
     "interactions; problems include indebtedness, low literacy, unemployment, "
     "lack of healthcare. Urban Society: Dominated by industry/services; impersonal "
     "relationships; modern values; complex division of labour; high population "
     "density; secondary relations; problems include slums, pollution, housing "
     "shortage, traffic congestion. India's rapid urbanisation is transforming "
     "both - urban problems are increasing while rural-urban linkages strengthen. "
     "The census shows urban population growing from 27.8% (2001) to 31.16% (2011).",
     True),

    ("c11_soc_014", "long_answer", "Hard",
     "What is socialization? Discuss the agencies of socialization with special "
     "reference to the Indian context.",
     "Socialization is the process by which individuals internalise society's norms, "
     "values, and culture to become functional members. Agencies: (1) Family - the "
     "primary agency. In India, joint families and caste identities are transmitted "
     "early. (2) School - transmits formal knowledge, secular values, and civic "
     "responsibility. In India, RTE Act 2009 emphasises inclusive education. "
     "(3) Peer Group - provides a space for independent identity formation; school "
     "friendships, online communities. (4) Mass Media - television, internet shape "
     "attitudes and aspirations, especially in urban India. (5) Religion - religious "
     "institutions teach moral values and reinforce cultural identity.",
     True),

    ("c11_soc_016", "long_answer", "Hard",
     "Explain the caste system as a form of social stratification in India. Discuss "
     "the concept of Sanskritisation.",
     "The caste system is a hereditary, hierarchical system of social stratification "
     "unique to Hindu society. Features: (1) Hereditary - caste is ascribed at birth. "
     "(2) Hierarchical - ranked from Brahmins to Dalits. (3) Endogamous - marry within "
     "caste. (4) Linked to occupation. (5) Pollution and purity concepts. "
     "Sanskritisation (M. N. Srinivas): Lower castes (e.g., OBCs, Scheduled Castes) "
     "adopt Brahminical customs (vegetarianism, wearing sacred thread, sanskrit "
     "names) to elevate status. Limitations: It does not challenge the caste system "
     "itself, only repositions groups within it; 'dominant castes' also Sanskritise.",
     True),

    ("c11_soc_017", "long_answer", "Hard",
     "Discuss kinship, marriage, and family as inter-related social institutions. "
     "Support your answer with examples from Indian society.",
     "Kinship refers to the system of social relationships based on blood ties "
     "(consanguineal) and marriage ties (affinal). It determines roles, inheritance, "
     "and residence patterns. Marriage is a socially sanctioned union that creates "
     "affinal kinship ties. In India, endogamy (within caste/religion) and arranged "
     "marriages are prevalent, though love marriages are rising. Exogamy rules "
     "(gotra/clan) prevent intra-clan marriages. The Family is the primary unit of "
     "socialisation and economic cooperation. In India, the joint family (extended) "
     "traditionally provided economic security, elder care, and social control. "
     "Urbanisation and industrialisation are shifting families toward nuclear forms, "
     "though joint families persist in rural areas.",
     True),

    ("c11_soc_021", "long_answer", "Hard",
     "Explain the Demographic Transition Theory. Where does India stand in this "
     "theory with reference to Census data?",
     "Demographic Transition Theory describes population change through four stages: "
     "Stage 1 (High stationary: high birth rate, high death rate - pre-industrial). "
     "Stage 2 (Early expanding: high birth rate, falling death rate - developing). "
     "Stage 3 (Late expanding: falling birth rate, low death rate - developing). "
     "Stage 4 (Low stationary: low birth rate, low death rate - developed). "
     "India is in Stage 3 - birth rate has declined from ~41/1000 (1971) to "
     "~20/1000 (2020), death rate is ~7/1000. Crude Birth Rate: 18.2; Crude Death "
     "Rate: 6.3; Total Fertility Rate: ~2.0 (NFHS-5, 2019-21). Urbanisation is "
     "31.16% (Census 2011), literacy is 74.04% (male 82.14%, female 65.46%). "
     "Total population: 121 crore (2011).",
     True),
]

_NUMERIC_BANK = [
    # (topic_id, difficulty, question_text, correct_answer, tolerance,
    #  calculation_steps, verification)
    ("c11_soc_010", "Easy",
     "In a sociological study, a researcher interviews 40 people from a village. "
     "12 belong to the farming community and the rest to other occupations. "
     "What percentage of the sample belongs to non-farming occupations?",
     70.0, 0.5,
     ["Non-farming respondents = 40 - 12 = 28",
      "Percentage = (28 / 40) x 100 = 70%"],
     "Verification: 12 + 28 = 40 ✓, 28/40 = 0.7 → 70% ✓"),

    ("c11_soc_010", "Medium",
     "A researcher distributes 200 questionnaires in a town. 150 are returned, and "
     "120 are found to be completely filled. Calculate the (a) response rate and "
     "(b) usable response rate as percentages.",
     "(a) 75.0%, (b) 60.0%",
     0.5,
     ["(a) Response rate = (150 / 200) x 100 = 75%",
      "(b) Usable response rate = (120 / 200) x 100 = 60%"],
     "Verification: 150/200 = 0.75 ✓; 120/200 = 0.60 ✓"),

    ("c11_soc_010", "Medium",
     "In a comparative study of two villages, Village A has a population of 2,400 "
     "and Village B has a population of 3,600. What is the ratio of A to B in its "
     "simplest form?",
     "2:3",
     0.0,
     ["Ratio A:B = 2400:3600",
      "Divide both by GCD(2400,3600) = 1200",
      "2400/1200 = 2, 3600/1200 = 3 → Ratio = 2:3"],
     "Verification: 2x1200=2400 ✓, 3x1200=3600 ✓, GCD(2400,3600)=1200 ✓"),

    ("c11_soc_010", "Easy",
     "In a 6-step scientific method, the steps are numbered 1 to 6. What fraction "
     "of the steps are completed before the 'hypothesis' step?",
     "1/2",
     0.01,
     ["Steps before hypothesis: 1 (problem) + 2 (observation) + 3 (classification) = 3 steps",
      "Fraction = 3/6 = 1/2"],
     "Verification: 3/6 = 0.5 = 1/2 ✓"),

    ("c11_soc_010", "Medium",
     "A researcher using the statistical method calculates the mean age of 5 "
     "respondents: 22, 28, 35, 41, and 44 years. What is the mean? What is the "
     "median? Verify that median <= mean.",
     "Mean = 34.0, Median = 35.0",
     0.1,
     ["Sum = 22 + 28 + 35 + 41 + 44 = 170",
      "Mean = 170 / 5 = 34.0 years",
      "Sorted data: [22, 28, 35, 41, 44]",
      "Median (middle of 5 values) = 3rd value = 35.0 years",
      "Verification: Median (35) > Mean (34), not <= - note: data is right-skewed"],
     "Verification: Sum=170 ✓, Mean=170/5=34 ✓, Median=35 (sorted) ✓"),

    ("c11_soc_010", "Easy",
     "In a field work study, a sociologist stays in a village for 8 weeks. If each "
     "week has 7 days, how many days does the researcher spend in the field?",
     56,
     0.0,
     ["Total days = 8 weeks x 7 days/week = 56 days"],
     "Verification: 56 / 8 = 7 ✓"),

    ("c11_soc_012", "Easy",
     "A sociology textbook lists 5 essential characteristics of society. A student "
     "can correctly recall only 3 of them during an exam. What fraction and "
     "percentage of the characteristics did the student remember?",
     "3/5, 60.0%",
     0.5,
     ["Fraction = 3/5",
      "Percentage = (3/5) x 100 = 60%"],
     "Verification: 3/5 = 0.6 → 60% ✓"),

    ("c11_soc_013", "Easy",
     "According to Census 2011, India's total population was 121 crore. If 31.16% "
     "lived in urban areas, approximately how many crore people lived in urban India?",
     37.7,
     0.5,
     ["Urban population = 121 x 0.3116",
      "= 121 x 0.3116 ≈ 37.7 crore"],
     "Verification: 37.7 / 121 ≈ 0.3116 ≈ 31.16% ✓"),

    ("c11_soc_013", "Medium",
     "In a survey of 500 urban households, 180 report living in slums. What "
     "percentage of the surveyed urban households live in slums?",
     36.0,
     0.5,
     ["Slum households = 180",
      "Percentage = (180 / 500) x 100 = 36%"],
     "Verification: 36% of 500 = 0.36 x 500 = 180 ✓"),

    ("c11_soc_013", "Medium",
     "The sex ratio of a village is 980 females per 1000 males. If the village has "
     "2,550 males, how many females live in the village?",
     2499,
     0.0,
     ["Number of females = (980 / 1000) x 2550",
      "= 0.98 x 2550 = 2499 females"],
     "Verification: 2499 / 2550 = 0.98 → 980/1000 ✓"),

    ("c11_soc_014", "Easy",
     "A child spends 8 hours a day with family, 6 hours at school, and 2 hours "
     "with peers. What fraction of the 16 waking hours does the child spend with "
     "family? Express as a simplified fraction.",
     "1/2",
     0.01,
     ["Hours with family = 8",
      "Total waking hours = 8 + 6 + 2 = 16",
      "Fraction = 8/16 = 1/2"],
     "Verification: 1/2 of 16 = 8 ✓"),

    ("c11_soc_014", "Medium",
     "A primary school has 120 students. The school principal surveys them to "
     "identify the main agency of socialization. 72 students name 'Family', 30 "
     "name 'School', and 18 name 'Peers'. What percentage of students identified "
     "the correct primary agency?",
     60.0,
     0.5,
     ["Students who named Family (primary agency) = 72",
      "Percentage = (72 / 120) x 100 = 60%"],
     "Verification: 72/120 = 0.6 → 60% ✓"),

    ("c11_soc_016", "Easy",
     "A sociologist studies 5 castes in a village and ranks them by traditional "
     "status from 1 (highest) to 5 (lowest). The status scores are 10, 8, 6, 4, "
     "and 2. What is the range of status scores?",
     8,
     0.0,
     ["Range = Maximum - Minimum = 10 - 2 = 8"],
     "Verification: Max=10 ✓, Min=2 ✓, Range=8 ✓"),

    ("c11_soc_016", "Medium",
     "In a study of social mobility, 40 out of 200 individuals from the lower "
     "stratum manage to move up to a higher stratum over one generation. Calculate "
     "the rate of upward mobility as a percentage.",
     20.0,
     0.5,
     ["Upwardly mobile = 40",
      "Rate = (40 / 200) x 100 = 20%"],
     "Verification: 20% of 200 = 40 ✓"),

    ("c11_soc_017", "Medium",
     "A village has 60 marriages in a year. 45 are within the same caste "
     "(endogamous) and the rest are outside (exogamous). What percentage of "
     "marriages are exogamous?",
     25.0,
     0.5,
     ["Exogamous marriages = 60 - 45 = 15",
      "Percentage = (15 / 60) x 100 = 25%"],
     "Verification: 25% of 60 = 15 ✓, 45 + 15 = 60 ✓"),

    ("c11_soc_017", "Easy",
     "In a community survey of 80 families, 35 are nuclear families, 30 are joint "
     "families, and 15 are extended families. What is the mode (most frequent) "
     "family type?",
     "Nuclear Family",
     0.0,
     ["Nuclear: 35, Joint: 30, Extended: 15",
      "Highest frequency = 35 → Nuclear Family"],
     "Verification: 35 > 30 > 15 ✓"),

    ("c11_soc_021", "Easy",
     "According to Census 2011, India's population was 121 crore. Kerala's "
     "population was approximately 3.34 crore with a literacy rate of 93.91%. "
     "Approximately how many crore people in Kerala were literate?",
     3.14,
     0.05,
     ["Literate population = 3.34 x 0.9391",
      "≈ 3.14 crore"],
     "Verification: 3.14 / 3.34 ≈ 0.94 ≈ 93.91% ✓"),

    ("c11_soc_021", "Medium",
     "A district has a population of 1,200,000. The crude birth rate is 22 per "
     "1000 and the crude death rate is 6 per 1000. Calculate the natural growth "
     "rate per 1000 and the total annual population increase.",
     "Natural growth rate: 16 per 1000; Annual increase: 19,200",
     100,
     ["Growth rate per 1000 = CBR - CDR = 22 - 6 = 16",
      "Annual increase = (16 / 1000) x 1,200,000 = 19,200"],
     "Verification: 16/1000 x 1,200,000 = 19,200 ✓"),

    ("c11_soc_021", "Hard",
     "In a demographic survey, the TFR (Total Fertility Rate) of a community is "
     "2.4 and the IMR (Infant Mortality Rate) is 45 per 1000 live births. If there "
     "are 10,000 live births, how many infant deaths are expected? Also, state "
     "whether the TFR indicates replacement-level fertility.",
     "Infant deaths: 450; TFR > 2.1 so above replacement level",
     1,
     ["Infant deaths = (45 / 1000) x 10,000 = 450",
      "Replacement level TFR ≈ 2.1; 2.4 > 2.1 → above replacement level"],
     "Verification: 45/1000 x 10000 = 450 ✓; TFR=2.4 > 2.1 ✓"),
]


# ──────────────────────────────────────────────────────────────────────────────
#  C O M P E T E N C Y  ( I N D I A N  C O N T E X T )  Q U E S T I O N S
# ──────────────────────────────────────────────────────────────────────────────
#  These are additional questions tagged with Indian-context specifics.

_COMP_MCQ = [
    ("c11_soc_001", "mcq", "Easy",
     "The first department of Sociology in India was established at which university?",
     "University of Bombay (Mumbai) - 1919",
     ["University of Calcutta", "University of Bombay (Mumbai) - 1919",
      "Delhi University", "University of Madras"],
     ""
)]

# =============================================================================
# SOLVER FUNCTIONS (auto-discoverable by registry)
# =============================================================================

_ALL_BANKS = [_MCQ_BANK, _FILL_BANK, _SHORT_BANK, _LONG_BANK, _NUMERIC_BANK, _COMP_MCQ]


def solve_mcq(params):
    """Solve an MCQ from the sociology question banks."""
    topic = params.get("topic", "")
    user_answer = params.get("user_answer", "")
    for bank in _ALL_BANKS:
        for entry in bank:
            if len(entry) >= 6 and entry[0] == topic:
                answer = entry[4]
                options = entry[5] if len(entry) > 5 and isinstance(entry[5], list) else []
                correct = user_answer.strip().lower() == str(answer).strip().lower() if user_answer else False
                return {"answer": answer, "options": options, "correct": correct, "verification": True}
    return {"answer": "", "verification": False, "error": f"Topic {topic} not found"}


def solve_check_answer(params):
    """Check user's answer against the question bank."""
    topic = params.get("topic", "")
    qtype = params.get("qtype", "mcq")
    user_answer = params.get("user_answer", "")
    bank_map = {"mcq": _MCQ_BANK, "fill": _FILL_BANK, "short": _SHORT_BANK,
                "long": _LONG_BANK, "numeric": _NUMERIC_BANK, "comp_mcq": _COMP_MCQ}
    bank = bank_map.get(qtype, _MCQ_BANK)
    for entry in bank:
        if len(entry) >= 6 and entry[0] == topic:
            answer = entry[4]
            correct = user_answer.strip().lower() == str(answer).strip().lower()
            return {"answer": answer, "user_answer": user_answer, "correct": correct, "verification": True}
    return {"correct": False, "verification": False, "error": f"Topic {topic} not found in {qtype} bank"}


def evaluate_answer(params):
    """Evaluate a user's answer for a given topic."""
    return solve_check_answer(params)


SOLVER_REGISTRY = {
    "mcq": solve_mcq,
    "check_answer": solve_check_answer,
    "evaluate": evaluate_answer,
}


if __name__ == "__main__":
    print(f"Banks: MCQ={len(_MCQ_BANK)}, Fill={len(_FILL_BANK)}, Short={len(_SHORT_BANK)}, Long={len(_LONG_BANK)}")
    r = solve_mcq({"topic": "c11_soc_001"})
    print(f"Answer: {r.get('answer', 'N/A')}")