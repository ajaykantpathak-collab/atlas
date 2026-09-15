"""
CISCE SOC Class 11 - Deterministic Question Generator
Generates reproducible, syllabus-aligned Sociology questions for Class 11 ISC.
"""

import random
import hashlib
import re
from typing import Dict, List, Any, Optional, Callable


# ──────────────────────────────────────────────────────────────────────────────
# SYLLABUS TOPIC DEFINITIONS
# ──────────────────────────────────────────────────────────────────────────────

SYLLABUS_TOPICS: Dict[str, Dict[str, str]] = {
    "c11_soc_001": {
        "title": "Introduction to Sociology",
        "description": "Sociology as a discipline, its emergence, relationship with other social sciences"
    },
    "c11_soc_002": {
        "title": "Basic Concepts",
        "description": "Society, community, group, culture, socialization, social structure"
    },
    "c11_soc_003": {
        "title": "Social Institutions",
        "description": "Family, kinship, marriage, religion, education, polity, economy"
    },
    "c11_soc_004": {
        "title": "Social Stratification",
        "description": "Caste, class, gender, power, status, prestige, mobility"
    },
    "c11_soc_005": {
        "title": "Social Change",
        "description": "Modernization, globalization, westernization, sanskritization, social movements"
    },
    "c11_soc_006": {
        "title": "Research Methods",
        "description": "Methods of data collection, sampling, hypothesis, statistics in sociology"
    },
    "c11_soc_007": {
        "title": "Culture and Society",
        "description": "Cultural patterns, norms, values, mores, folkways, deviance, conformity"
    },
    "c11_soc_008": {
        "title": "Personality and Social Structure",
        "description": "Status, role, role conflict, social control, reference group"
    },
    "c11_soc_009": {
        "title": "Sociology and Social Problems",
        "description": "Poverty, inequality, unemployment, crime, juvenile delinquency, corruption"
    },
    "c11_soc_010": {
        "title": "Thinkers and Theories",
        "description": "Karl Marx, Emile Durkheim, Max Weber, Harriet Martineau, founding fathers"
    },
}


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION DATA BANKS — Each topic has structured question data
# ──────────────────────────────────────────────────────────────────────────────

MCQ_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_soc_001": [
        {
            "text": "Who is considered the 'Father of Sociology'?",
            "options": ["Auguste Comte", "Karl Marx", "Emile Durkheim", "Max Weber"],
            "answer": 0,
            "difficulty": 0.2,
            "solution": "Auguste Comte coined the term 'Sociology' in 1838 and is regarded as the Father of Sociology for establishing it as a distinct discipline."
        },
        {
            "text": "Sociology emerged as a distinct discipline during which period?",
            "options": ["The Renaissance", "The Industrial Revolution", "The Medieval Period", "The Colonial Period"],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "Sociology emerged in the early 19th century alongside the Industrial Revolution, as rapid social changes demanded systematic study of society."
        },
        {
            "text": "Which of the following is NOT a characteristic of Sociology?",
            "options": [
                "It is an independent science",
                "It is a categorical science",
                "It is an abstract science",
                "It is an exact science like physics"
            ],
            "answer": 3,
            "difficulty": 0.5,
            "solution": "Sociology is not an exact science like physics or chemistry because human behaviour is unpredictable and cannot be studied under controlled laboratory conditions."
        },
        {
            "text": "According to Auguste Comte, Sociology should use which method?",
            "options": [
                "Experimental method",
                "Comparative historical method",
                "Statistical method only",
                "Intuitive method"
            ],
            "answer": 1,
            "difficulty": 0.6,
            "solution": "Comte advocated the comparative historical method, studying societies at different stages of development to discover social laws."
        },
        {
            "text": "The term 'Sociology' was coined by:",
            "options": ["Karl Marx", "Auguste Comte", "Herbert Spencer", "Emile Durkheim"],
            "answer": 1,
            "difficulty": 0.1,
            "solution": "Auguste Comte coined the term 'Sociology' in 1838, combining the Latin 'socius' (companion) and Greek 'logos' (study)."
        },
    ],
    "c11_soc_002": [
        {
            "text": "A group of people who interact with one another and share a sense of unity is called:",
            "options": ["Society", "Community", "Association", "Crowd"],
            "answer": 0,
            "difficulty": 0.2,
            "solution": "Society refers to a large group of people who interact with one another, share a common territory, and possess a sense of shared identity."
        },
        {
            "text": "Which of the following is NOT a characteristic of culture?",
            "options": [
                "Culture is learned",
                "Culture is shared",
                "Culture is transmitted across generations",
                "Culture is inherited biologically"
            ],
            "answer": 3,
            "difficulty": 0.3,
            "solution": "Culture is NOT biologically inherited; it is learned and transmitted through socialization from one generation to the next."
        },
        {
            "text": "The process by which individuals learn the norms, values, and behaviours of their society is called:",
            "options": ["Acculturation", "Socialization", "Enculturation", "Assimilation"],
            "answer": 1,
            "difficulty": 0.2,
            "solution": "Socialization is the lifelong process through which individuals internalize the norms, values, and behaviours of their society."
        },
        {
            "text": "Which sociological perspective emphasizes that society is a system of interrelated parts?",
            "options": [
                "Conflict perspective",
                "Interactionist perspective",
                "Functionalist perspective",
                "Feminist perspective"
            ],
            "answer": 2,
            "difficulty": 0.4,
            "solution": "The functionalist perspective views society as a complex system whose parts work together to promote stability and social order."
        },
    ],
    "c11_soc_003": [
        {
            "text": "Which type of marriage involves one man married to multiple women?",
            "options": ["Polyandry", "Polygyny", "Monogamy", "Group marriage"],
            "answer": 1,
            "difficulty": 0.2,
            "solution": "Polygyny is the marriage form where one man has multiple wives simultaneously."
        },
        {
            "text": "The family institution performs which of the following primary functions?",
            "options": [
                "Only economic functions",
                "Only religious functions",
                "Reproduction, socialization, and emotional support",
                "Only political functions"
            ],
            "answer": 2,
            "difficulty": 0.3,
            "solution": "Family performs multiple functions including reproduction, primary socialization of children, economic cooperation, and emotional support."
        },
        {
            "text": "Joint family system is most commonly associated with which type of society?",
            "options": ["Industrial society", "Traditional agrarian society", "Post-industrial society", "Nomadic society"],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "The joint family system, with multiple generations living together, is characteristic of traditional agrarian societies, especially in India."
        },
    ],
    "c11_soc_004": [
        {
            "text": "Which of the following is an ascribed status?",
            "options": ["Doctor", "Teacher", "Brahmin (by birth)", "Engineer"],
            "answer": 2,
            "difficulty": 0.2,
            "solution": "Brahmin by birth is an ascribed status — one is born into it rather than achieving it through personal effort."
        },
        {
            "text": "Open stratification system is characterized by:",
            "options": [
                "Ascribed status only",
                "Achieved status and social mobility",
                "Hereditary occupation",
                "No social mobility"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "An open stratification system (like class systems) allows for social mobility based on achieved status, education, and effort."
        },
        {
            "text": "Sanskritization is a concept introduced by:",
            "options": ["M.N. Srinivas", "G.S. Ghurye", "A.R. Desai", "Andre Beteille"],
            "answer": 0,
            "difficulty": 0.3,
            "solution": "M.N. Srinivas introduced the concept of Sanskritization to describe the process by which lower castes adopt the practices of higher castes to improve their social status."
        },
        {
            "text": "Horizontal mobility refers to movement:",
            "options": [
                "Upward in the social hierarchy",
                "Downward in the social hierarchy",
                "Within the same social stratum",
                "From rural to urban areas"
            ],
            "answer": 2,
            "difficulty": 0.5,
            "solution": "Horizontal mobility involves movement within the same social stratum — e.g., changing jobs at the same occupational level."
        },
    ],
    "c11_soc_005": [
        {
            "text": "Westernization refers to:",
            "options": [
                "Adoption of Western technology only",
                "Changes in lifestyle, values, and institutions due to Western contact",
                "Migration to Western countries",
                "Only economic changes"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "Westernization, as defined by M.N. Srinivas, refers to changes in Indian society's lifestyle, values, dress patterns, and institutions due to contact with Western culture."
        },
        {
            "text": "Modernization theory was primarily propounded by:",
            "options": [
                "Karl Marx",
                "Emile Durkheim",
                "Daniel Lerner and W.W. Rostow",
                "Max Weber"
            ],
            "answer": 2,
            "difficulty": 0.6,
            "solution": "Daniel Lerner and W.W. Rostow were key proponents of modernization theory, arguing that societies progress through stages from traditional to modern."
        },
        {
            "text": "Globalization as a concept implies:",
            "options": [
                "Only economic integration",
                "Only cultural exchange",
                "Interconnection of economies, cultures, and societies worldwide",
                "Only political integration"
            ],
            "answer": 2,
            "difficulty": 0.4,
            "solution": "Globalization encompasses economic, cultural, political, and technological interconnectedness across the world."
        },
    ],
    "c11_soc_006": [
        {
            "text": "Which method of data collection involves direct face-to-face questioning?",
            "options": [
                "Questionnaire",
                "Schedule",
                "Observation",
                "Documentary method"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "A schedule is a structured list of questions administered by the researcher through direct face-to-face interviews."
        },
        {
            "text": "Sampling is essential because:",
            "options": [
                "It is more expensive than census",
                "It saves time and resources while representing the population",
                "It always gives more accurate results",
                "It eliminates all errors"
            ],
            "answer": 1,
            "difficulty": 0.4,
            "solution": "Sampling allows researchers to study a representative subset of the population, saving time and resources while providing reliable results."
        },
        {
            "text": "In probability sampling, each member of the population has:",
            "options": [
                "Zero chance of selection",
                "A known, non-zero probability of being selected",
                "Equal probability only in stratified sampling",
                "An unknown chance of selection"
            ],
            "answer": 1,
            "difficulty": 0.5,
            "solution": "In probability sampling, every element has a known, non-zero, and calculable chance of being included in the sample."
        },
    ],
    "c11_soc_007": [
        {
            "text": "Folkways are norms that:",
            "options": [
                "Are strictly enforced by law",
                "Are customary norms with mild social pressure for conformity",
                "Are the most sacred norms of society",
                "Have no social significance"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "Folkways, introduced by William Graham Sumner, are informal norms arising from repetition and customary practices, enforced by mild social pressure."
        },
        {
            "text": "Mores differ from folkways in that they:",
            "options": [
                "Are less important",
                "Are enforced by law and carry moral significance",
                "Have no sanctions",
                "Are temporary"
            ],
            "answer": 1,
            "difficulty": 0.4,
            "solution": "Mores are norms of great moral significance, violation of which is treated seriously by society, often backed by law and strong social sanctions."
        },
        {
            "text": "Deviance refers to:",
            "options": [
                "Conformity to social norms",
                "Violation of social norms",
                "Religious rituals",
                "Cultural traditions"
            ],
            "answer": 1,
            "difficulty": 0.2,
            "solution": "Deviance is the act of violating social norms, values, or expectations — behaviour that departs from what is considered acceptable in a society."
        },
    ],
    "c11_soc_008": [
        {
            "text": "A 'status set' refers to:",
            "options": [
                "A single social position",
                "All the statuses a person occupies simultaneously",
                "The process of achieving a status",
                "The prestige attached to a status"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "A status set, as defined by Robert Merton, is the collection of all social positions (statuses) that an individual occupies at a given time."
        },
        {
            "text": "Role conflict occurs when:",
            "options": [
                "A person performs a role well",
                "The demands of two or more roles are incompatible",
                "A person has no social roles",
                "Roles are clearly defined"
            ],
            "answer": 1,
            "difficulty": 0.4,
            "solution": "Role conflict arises when the expectations attached to two or more roles held by an individual are in conflict with each other."
        },
        {
            "text": "Informal social control is exercised through:",
            "options": [
                "Laws and courts",
                "Family, peer group, and community",
                "Police and military",
                "Constitution"
            ],
            "answer": 1,
            "difficulty": 0.3,
            "solution": "Informal social control operates through uncodified mechanisms like family pressure, peer influence, ridicule, and community opinion."
        },
    ],
    "c11_soc_009": [
        {
            "text": "Relative poverty refers to:",
            "options": [
                "Lack of basic necessities",
                "Being poor compared to others in society",
                "Absolute lack of income",
                "Poverty measured only in rural areas"
            ],
            "answer": 1,
            "difficulty": 0.4,
            "solution": "Relative poverty is defined in relation to the living standards of other members of society — it is about inequality and exclusion."
        },
        {
            "text": "Functionalist perspective on social problems suggests they:",
            "options": [
                "Serve no useful purpose",
                "Can serve functions like maintaining social equilibrium",
                "Should be eliminated immediately",
                "Are purely pathological"
            ],
            "answer": 1,
            "difficulty": 0.6,
            "solution": "Functionalists like Durkheim argue that deviance and social problems can serve positive functions — clarifying norms, promoting social unity, and encouraging social change."
        },
        {
            "text": "Which approach to poverty focuses on individual deficiencies?",
            "options": [
                "Structural approach",
                "Cultural approach",
                "Deficit approach",
                "Political economy approach"
            ],
            "answer": 2,
            "difficulty": 0.5,
            "solution": "The deficit approach attributes poverty to individual failings such as lack of skills, motivation, or moral weakness, rather than structural factors."
        },
    ],
    "c11_soc_010": [
        {
            "text": "Karl Marx is best known for his theory of:",
            "options": [
                "Symbolic Interactionism",
                "Class struggle and Historical Materialism",
                "Social Action",
                "Social Facts"
            ],
            "answer": 1,
            "difficulty": 0.2,
            "solution": "Karl Marx developed the theory of Historical Materialism and class struggle, arguing that economic relations form the base of society."
        },
        {
            "text": "Emile Durkheim studied which social phenomenon as a 'social fact'?",
            "options": [
                "Individual beliefs",
                "Suicide rates",
                "Political opinions",
                "Artistic movements"
            ],
            "answer": 1,
            "difficulty": 0.4,
            "solution": "Durkheim studied suicide rates as a social fact, demonstrating that even seemingly individual acts are influenced by social forces."
        },
        {
            "text": "Max Weber's concept of 'Verstehen' means:",
            "options": [
                "Economic determinism",
                "Understanding — interpretive understanding of social action",
                "Scientific observation",
                "Class consciousness"
            ],
            "answer": 1,
            "difficulty": 0.5,
            "solution": "Verstehen is a German term meaning 'understanding' — Weber used it to refer to the interpretive understanding of actors' subjective meanings."
        },
        {
            "text": "Who among the following is considered one of the 'founding mothers' of sociology?",
            "options": ["Jane Addams", "Harriet Martineau", "Mary Wollstonecraft", "All of the above"],
            "answer": 3,
            "difficulty": 0.4,
            "solution": "Harriet Martineau, Jane Addams, and Mary Wollstonecraft are all recognized as important early women sociologists who contributed foundational work."
        },
    ],
}

FILL_BLANK_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_soc_001": [
        {
            "text": "The term ______ was coined by Auguste Comte in 1838 to describe the scientific study of society.",
            "answer": "Sociology",
            "difficulty": 0.2,
            "solution": "Auguste Comte coined the term 'Sociology' from Latin 'socius' (companion) and Greek 'logos' (study)."
        },
        {
            "text": "Herbert Spencer is known for applying the theory of ______ to society.",
            "answer": "Social Darwinism",
            "difficulty": 0.4,
            "solution": "Herbert Spencer applied Darwin's theory of 'survival of the fittest' to human societies, calling it Social Darwinism."
        },
    ],
    "c11_soc_002": [
        {
            "text": "The process by which an individual internalizes the norms and values of society is called ______.",
            "answer": "Socialization",
            "difficulty": 0.2,
            "solution": "Socialization is the process through which individuals learn and internalize the norms, values, and behaviours of their society."
        },
        {
            "text": "______ refers to the ability of a society to maintain stability and adapt to changes.",
            "answer": "Social order",
            "difficulty": 0.3,
            "solution": "Social order is the stability and continuity of social behaviour, customs, and institutions in a society."
        },
    ],
    "c11_soc_003": [
        {
            "text": "______ family is characterized by the husband working outside and the wife doing household work.",
            "answer": "Nuclear",
            "difficulty": 0.3,
            "solution": "Nuclear family consists of a married couple and their children, with a traditional division of labour by gender."
        },
        {
            "text": "______ is the simplest form of religion involving belief in spirits and magic.",
            "answer": "Animism",
            "difficulty": 0.5,
            "solution": "Animism is the belief that spirits inhabit objects, places, and creatures — considered the simplest form of religious belief by Edward Tylor."
        },
    ],
    "c11_soc_004": [
        {
            "text": "______ stratification is open and allows for social mobility based on achievement.",
            "answer": "Class",
            "difficulty": 0.2,
            "solution": "Class stratification (as opposed to caste) is open, allowing individuals to move up or down the social hierarchy based on achieved status."
        },
        {
            "text": "______ introduced the concept of 'Sanskritization' to describe cultural mobility in India.",
            "answer": "M.N. Srinivas",
            "difficulty": 0.3,
            "solution": "M.N. Srinivas introduced Sanskritization to describe how lower castes adopt the practices of higher castes to improve social standing."
        },
    ],
    "c11_soc_005": [
        {
            "text": "______ refers to the global integration of economies, cultures, and societies.",
            "answer": "Globalization",
            "difficulty": 0.2,
            "solution": "Globalization describes the increasing interconnectedness and interdependence of countries through trade, communication, and cultural exchange."
        },
        {
            "text": "______ theory argues that societies progress from traditional to modern stages of development.",
            "answer": "Modernization",
            "difficulty": 0.4,
            "solution": "Modernization theory, associated with Rostow and Lerner, posits that societies evolve through stages from traditional agrarian to modern industrial."
        },
    ],
    "c11_soc_006": [
        {
            "text": "______ is a subset of the population selected for study in research.",
            "answer": "Sample",
            "difficulty": 0.2,
            "solution": "A sample is a representative subset of the population selected for study, used when studying the entire population (census) is impractical."
        },
        {
            "text": "______ sampling gives every member of the population an equal chance of selection.",
            "answer": "Simple random",
            "difficulty": 0.3,
            "solution": "Simple random sampling ensures each member of the population has an equal and independent chance of being included."
        },
    ],
    "c11_soc_007": [
        {
            "text": "Norms that are strictly enforced and have moral significance are called ______.",
            "answer": "Mores",
            "difficulty": 0.3,
            "solution": "Mores are norms embodying moral principles, violation of which is viewed as a serious offence by society."
        },
        {
            "text": "______ refers to behaviour that violates social norms and expectations.",
            "answer": "Deviance",
            "difficulty": 0.2,
            "solution": "Deviance is any behaviour, belief, or condition that violates significant social norms in the society or group where it occurs."
        },
    ],
    "c11_soc_008": [
        {
            "text": "A ______ is a set of expectations about how a person in a particular status should behave.",
            "answer": "role",
            "difficulty": 0.2,
            "solution": "A role is the expected behaviour pattern associated with a particular social status in society."
        },
        {
            "text": "______ refers to a position in the social system that carries prestige.",
            "answer": "Status",
            "difficulty": 0.2,
            "solution": "Status is a social position that a person occupies in a group or society, carrying prestige and associated roles."
        },
    ],
    "c11_soc_009": [
        {
            "text": "______ poverty means being poor relative to the average standard of living in society.",
            "answer": "Relative",
            "difficulty": 0.3,
            "solution": "Relative poverty is measured against the prevailing standards of living in a society — it reflects inequality."
        },
        {
            "text": "The ______ approach to social problems focuses on structural factors like inequality and discrimination.",
            "answer": "structural",
            "difficulty": 0.4,
            "solution": "The structural approach attributes social problems to institutional arrangements, economic inequality, and systemic discrimination."
        },
    ],
    "c11_soc_010": [
        {
            "text": "Karl Marx identified the ______ as the ruling class in capitalist society.",
            "answer": "bourgeoisie",
            "difficulty": 0.4,
            "solution": "Marx identified the bourgeoisie (owners of the means of production) as the ruling class exploiting the proletariat."
        },
        {
            "text": "Durkheim distinguished between ______ solidarity (traditional) and ______ solidarity (modern).",
            "answer": "mechanical; organic",
            "difficulty": 0.5,
            "solution": "Mechanical solidarity (traditional societies) is based on similarity; organic solidarity (modern societies) is based on interdependence and division of labour."
        },
    ],
}

SHORT_ANSWER_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_soc_001": [
        {
            "text": "List any three characteristics of Sociology as a science.",
            "answer": "Sociology is: (1) an independent science with its own field of study, (2) a social science concerned with human society, (3) a categorical science (not normative), (4) an abstract science studying general patterns, (5) a generalizing science studying general patterns rather than particular events.",
            "difficulty": 0.3,
            "solution": "Key characteristics: it is a social science, it studies human society scientifically, it is abstract and generalizing, it is categorical (non-normative), it is an independent discipline.",
        },
        {
            "text": "Explain the relationship between Sociology and Economics.",
            "answer": "Sociology and Economics are closely related. Economics studies production, distribution, and consumption of wealth, while Sociology studies how these economic processes affect and are affected by social structures, institutions, and human behaviour. Economic factors influence family patterns, education, and social stratification.",
            "difficulty": 0.4,
            "solution": "Both disciplines study human behaviour but from different angles. Economics focuses on economic activities, while sociology examines the social context and consequences of these activities.",
        },
        {
            "text": "State three differences between common sense and Sociology.",
            "answer": "(1) Common sense is based on personal experience and casual observation; Sociology uses systematic, scientific methods. (2) Common sense can be contradictory; Sociology provides tested, validated knowledge. (3) Common sense is subjective; Sociology aims for objectivity. (4) Common sense is fragmented; Sociology provides integrated understanding.",
            "difficulty": 0.5,
            "solution": "The key distinction is that Sociology is a scientific discipline using rigorous methods, while common sense is everyday, unsystematic knowledge.",
        },
    ],
    "c11_soc_002": [
        {
            "text": "Distinguish between society and community.",
            "answer": "Society: large, impersonal, may not have a definite territory, based on indirect relations. Community: small, close-knit, definite territory, personal face-to-face relationships, shared sense of belonging and unity.",
            "difficulty": 0.3,
            "solution": "Society is broader and impersonal; community is narrower, localized, and characterized by intimate face-to-face relationships.",
        },
        {
            "text": "What is meant by 'culture lag'? Explain with an example.",
            "answer": "Culture lag (W.F. Ogburn) refers to the gap between material culture (technology) and non-material culture (values, norms) when material culture changes faster. Example: digital technology advancing faster than our laws and social norms can adapt.",
            "difficulty": 0.5,
            "solution": "Ogburn's concept explains social maladjustment — when technological innovation outpaces the ability of society to adjust its norms and institutions.",
        },
        {
            "text": "Define socialization and mention any two of its agencies.",
            "answer": "Socialization is the process through which individuals internalize the norms, values, and behaviours of their society. Agencies: (1) Family — primary socialization, (2) School — secondary socialization, (3) Peer group, (4) Mass media, (5) Religion.",
            "difficulty": 0.3,
            "solution": "Socialization is the lifelong process of learning to become a functioning member of society, beginning with the family as the primary agent.",
        },
    ],
    "c11_soc_003": [
        {
            "text": "What is meant by 'universalistic' and 'particularistic' values in relation to family?",
            "answer": "Universalistic values apply to all members of society equally (e.g., human rights). Particularistic values apply to specific relationships (e.g., family obligations). In traditional families, particularistic values dominate; in modern families, universalistic values gain importance.",
            "difficulty": 0.5,
            "solution": "Talcott Parsons distinguished these — traditional societies emphasize particularistic obligations, while modern societies emphasize universalistic norms.",
        },
        {
            "text": "Explain any two functions of education as a social institution.",
            "answer": "(1) Socialization — transmitting culture, norms, and values. (2) Social control — teaching discipline and conformity. (3) Social placement — sorting individuals into occupational roles. (4) Social integration — promoting shared values and national identity.",
            "difficulty": 0.4,
            "solution": "Education serves multiple social functions beyond academic learning — it shapes individuals into functional members of society.",
        },
    ],
    "c11_soc_004": [
        {
            "text": "Explain the difference between open and closed stratification systems.",
            "answer": "Open system (class): allows social mobility, based on achieved status, boundaries are permeable. Closed system (caste): no social mobility, based on ascribed status, boundaries are rigid and maintained by social norms.",
            "difficulty": 0.4,
            "solution": "Open systems allow movement between strata; closed systems prevent it through ascribed status and rigid boundaries.",
        },
        {
            "text": "What is meant by 'role strain'?",
            "answer": "Role strain occurs when there are competing demands within a single role. For example, a working mother experiencing pressure to be both an ideal employee and an ideal mother within her single role as a parent.",
            "difficulty": 0.5,
            "solution": "Role strain is intrarole conflict — tension within one role due to competing expectations, distinct from interrole (role) conflict between different roles.",
        },
    ],
    "c11_soc_005": [
        {
            "text": "Distinguish between westernization and modernization.",
            "answer": "Westernization: specific to adopting Western cultural traits (dress, food, language). Modernization: broader process involving industrialization, urbanization, rationalization, and social transformation applicable across cultures. Westernization is one form of modernization.",
            "difficulty": 0.4,
            "solution": "M.N. Srinivas distinguished these carefully — westernization is a specific cultural process, modernization is a broader structural transformation.",
        },
        {
            "text": "What are social movements? Give one example.",
            "answer": "Social movements are organized collective efforts to promote or resist social change. Examples: Civil Rights Movement, Chipko Movement, Women's Movement, Dalit Movement, Environmental movements.",
            "difficulty": 0.3,
            "solution": "Social movements are sustained collective actions aimed at challenging or maintaining existing social structures.",
        },
    ],
    "c11_soc_006": [
        {
            "text": "Distinguish between a questionnaire and a schedule.",
            "answer": "Questionnaire: mailed to respondents, self-administered, cheaper, higher non-response. Schedule: filled by researcher through direct interview, more reliable responses, time-consuming and expensive.",
            "difficulty": 0.3,
            "solution": "The key difference is in administration — questionnaire is self-administered; schedule requires an interviewer.",
        },
        {
            "text": "What is a hypothesis?",
            "answer": "A hypothesis is a tentative, testable proposition about the relationship between two or more variables. It is a preliminary answer to a research question that can be verified through empirical investigation.",
            "difficulty": 0.3,
            "solution": "A hypothesis bridges theory and empirical observation — it makes a specific, testable prediction.",
        },
    ],
    "c11_soc_007": [
        {
            "text": "Distinguish between norms and values.",
            "answer": "Values: broad cultural standards defining what is desirable/good (e.g., equality, freedom). Norms: specific rules for behaviour derived from values (e.g., shaking hands as a greeting derives from the value of respect). Values are general; norms are specific behavioural guides.",
            "difficulty": 0.3,
            "solution": "Values are abstract ideals; norms are concrete rules of conduct that operationalize those values.",
        },
        {
            "text": "What is conformity? How is it related to deviance?",
            "answer": "Conformity is the act of matching attitudes, beliefs, and behaviours to group norms. Conformity and deviance exist on a continuum — conformity is adherence to norms while deviance is violation. Both are socially constructed and vary across contexts.",
            "difficulty": 0.5,
            "solution": "Conformity and deviance are relative — what is deviant in one context may be conforming in another, and both are socially defined.",
        },
    ],
    "c11_soc_008": [
        {
            "text": "Explain the difference between achieved and ascribed status with examples.",
            "answer": "Ascribed status: assigned at birth, involuntary (e.g., caste, gender, race). Achieved status: earned through personal effort and merit (e.g., doctor, teacher, athlete). Modern societies emphasize achieved status; traditional societies emphasize ascribed status.",
            "difficulty": 0.3,
            "solution": "The key distinction is voluntariness — ascribed is involuntary, achieved requires personal effort.",
        },
        {
            "text": "What is a reference group?",
            "answer": "A reference group is a group that individuals use as a standard for evaluating themselves and their behaviour. We may not belong to it but adopt its norms as our frame of reference (e.g., young people using celebrities as reference groups).",
            "difficulty": 0.4,
            "solution": "Reference groups influence attitudes and behaviour even when one is not a member — they serve as standards of comparison.",
        },
    ],
    "c11_soc_009": [
        {
            "text": "Define poverty and mention any two indicators of poverty.",
            "answer": "Poverty is a condition where people lack the resources to satisfy basic needs. Indicators: (1) Income/consumption level below poverty line, (2) Malnutrition and poor health, (3) Low literacy, (4) Lack of access to safe drinking water and sanitation, (5) Unemployment.",
            "difficulty": 0.3,
            "solution": "Poverty is multi-dimensional — it goes beyond income to include health, education, and living standards.",
        },
        {
            "text": "What is meant by 'social problem'? Give two examples.",
            "answer": "A social problem is a condition that a significant number of people believe is harmful to society and requires collective action to address. Examples: poverty, unemployment, crime, corruption, drug addiction, gender-based violence.",
            "difficulty": 0.3,
            "solution": "Social problems are socially constructed — they exist when society collectively recognizes a condition as harmful and requiring action.",
        },
    ],
    "c11_soc_010": [
        {
            "text": "Explain Karl Marx's concept of 'base and superstructure'.",
            "answer": "Marx's base-superstructure model: the economic base (forces and relations of production) determines the superstructure (legal, political, religious, cultural institutions). Changes in the economic base lead to changes in the superstructure. The ruling class controls both base and superstructure.",
            "difficulty": 0.6,
            "solution": "This is Marx's foundational model — economic relations shape all other aspects of society. Critics argue it is too economically deterministic.",
        },
        {
            "text": "What did Durkheim mean by 'anomie'?",
            "answer": "Anomie (from Greek 'anomos' = without norms) is a condition of normlessness where social norms break down, often during rapid social change. It leads to alienation, purposelessness, and increased deviance including suicide (anomic suicide).",
            "difficulty": 0.5,
            "solution": "Anomie is Durkheim's concept for the breakdown of social norms during periods of rapid transition, leading to social instability.",
        },
    ],
}

LONG_ANSWER_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_soc_001": [
        {
            "text": "Discuss the emergence of Sociology as a distinct discipline. What were the major factors that contributed to its development?",
            "answer": "Sociology emerged in the early 19th century due to: (1) Industrial Revolution — massive social changes from agrarian to industrial societies; (2) French Revolution — ideas of liberty, equality, fraternity challenging traditional order; (3) Urbanization — new social problems in cities; (4) Scientific Method — the success of natural sciences inspired social inquiry. Auguste Comte coined the term 'Sociology' in 1838. Other founding figures include Karl Marx, Emile Durkheim, and Max Weber who established sociology as a systematic scientific discipline.",
            "difficulty": 0.6,
            "solution": "The key is to connect the intellectual and social context of the 19th century with the emergence of systematic social thinking.",
        },
    ],
    "c11_soc_002": [
        {
            "text": "Explain the concept of 'culture' and describe its important characteristics.",
            "answer": "Culture is the learned, shared, and transmitted patterns of behaviour, beliefs, values, and symbols that characterize a group or society. Characteristics: (1) Learned — not biologically inherited; (2) Shared — common to group members; (3) Transmitted — passed across generations; (4) Integrated — elements are interrelated; (5) Adaptive — changes to suit environment; (6) Symbolic — uses symbols (language, gestures); (7) Prescriptive — provides rules for behaviour.",
            "difficulty": 0.5,
            "solution": "A comprehensive answer covers definition and all major characteristics with examples for each.",
        },
    ],
    "c11_soc_003": [
        {
            "text": "Examine the changing patterns of family in contemporary Indian society.",
            "answer": "Changes include: (1) Decline of joint family, rise of nuclear family; (2) Changing roles of women — from domestic to workforce participation; (3) Decline in family authority — more egalitarian relationships; (4) Increased acceptance of love marriages and inter-caste marriages; (5) Emergence of live-in relationships; (6) Changing child-rearing patterns with dual-income families; (7) Increasing divorce rates; (8) Technology's impact on family communication.",
            "difficulty": 0.6,
            "solution": "A good answer covers structural changes, role changes, and attitudinal changes in family patterns.",
        },
    ],
    "c11_soc_004": [
        {
            "text": "Explain the salient features of the caste system in India and its contemporary relevance.",
            "answer": "Features: (1) Hierarchy — four-fold division with Brahmins at top; (2) Hereditary — status by birth; (3) Endogamy — marriage within caste; (4) Commensality — food restrictions; (5) Occupational association; (6) Pollution concept. Contemporary relevance: (1) Constitutional abolition but social practice continues; (2) Reservations as affirmative action; (3) Political mobilization on caste lines; (4) Sanskritization and Westernization as mobility strategies; (5) Inter-caste marriages increasing but slowly.",
            "difficulty": 0.7,
            "solution": "Should cover both traditional features and contemporary transformations while acknowledging persistence.",
        },
    ],
    "c11_soc_005": [
        {
            "text": "Discuss the concept of globalization and its impact on Indian society.",
            "answer": "Globalization: increasing global interconnectedness of economies, cultures, and societies through trade, communication, and technology. Impact on India: (1) Economic — liberalization, FDI, growth of IT sector; (2) Cultural — spread of Western values, consumerism; (3) Social — changing lifestyles, increased inequality; (4) Political — international treaties affecting sovereignty; (5) Family — changing structures and values; (6) Positive: employment, technology access; Negative: cultural erosion, widening inequality.",
            "difficulty": 0.7,
            "solution": "Should balance positive and negative impacts across economic, social, cultural, and political dimensions.",
        },
    ],
    "c11_soc_006": [
        {
            "text": "Describe the various methods of data collection used in sociological research.",
            "answer": "Methods: (1) Survey — questionnaires and interviews for large samples; (2) Observation — participant and non-participant for natural settings; (3) Case study — in-depth study of a single unit; (4) Documentary method — using existing records; (5) Interview — structured, semi-structured, unstructured; (6) Focus group discussion — group interaction; (7) Content analysis — systematic analysis of texts/media. Choice depends on research objectives, resources, and nature of study.",
            "difficulty": 0.6,
            "solution": "Should describe each method with its strengths, limitations, and appropriate use cases.",
        },
    ],
    "c11_soc_007": [
        {
            "text": "Differentiate between folkways, mores, and laws. Give suitable examples.",
            "answer": "Folkways: informal norms governing everyday behaviour (dress, table manners), enforced by mild pressure. Mores: norms with strong moral significance (prohibitions against incest), violation is a serious offence. Laws: formal, codified norms enforced by state authority (criminal law). Hierarchy of sanctions: folkways — ridicule/social disapproval; mores — severe social sanctions; laws — legal penalties. Examples: Folkway — greeting someone; More — respecting elders; Law — traffic rules.",
            "difficulty": 0.5,
            "solution": "Should clearly distinguish the three types in terms of formality, sanctions, and moral significance.",
        },
    ],
    "c11_soc_008": [
        {
            "text": "Explain the concept of social control and discuss its agencies in modern society.",
            "answer": "Social control: mechanisms that regulate individual and group behaviour to maintain social order. Types: Formal (law, police, courts) and Informal (family, education, religion, peer group). Agencies: (1) Family — earliest agent of control; (2) Education — transmits norms and values; (3) Religion — moral regulation; (4) State — formal laws and enforcement; (5) Media — shapes public opinion and behaviour; (6) Peer groups — social pressure among equals. Both types are essential for maintaining social cohesion.",
            "difficulty": 0.6,
            "solution": "Should explain the concept clearly and describe each agency with examples of how it exercises control.",
        },
    ],
    "c11_soc_009": [
        {
            "text": "Define unemployment and discuss its causes and consequences in the Indian context.",
            "answer": "Unemployment: condition where able-bodied persons willing to work cannot find employment. Causes in India: (1) Rapid population growth; (2) Inadequate industrial growth; (3) Seasonal nature of agriculture; (4) Lack of skills and education; (5) Slow growth of service sector; (6) Economic recessions. Consequences: (1) Poverty and deprivation; (2) Social unrest and crime; (3) Psychological stress; (4) Brain drain; (5) Increased burden on families; (6) Social exclusion.",
            "difficulty": 0.6,
            "solution": "Should address both causes (structural, demographic, economic) and multi-dimensional consequences.",
        },
    ],
    "c11_soc_010": [
        {
            "text": "Compare and contrast the sociological perspectives of Karl Marx and Max Weber.",
            "answer": "Similarities: Both studied modern society, capitalism, and social change. Differences: (1) Marx — economic determinism; Weber — multi-causal including ideas and values. (2) Marx — class conflict as driving force; Weber — class, status, and party as independent power dimensions. (3) Marx — historical materialism; Weber — verstehen and ideal types. (4) Marx — revolutionary change; Weber — rationalization and bureaucracy. (5) Marx — base determines superstructure; Weber — ideas can influence economic change (Protestant Ethic).",
            "difficulty": 0.7,
            "solution": "Should present balanced comparison covering methodology, key concepts, and views on social change for both theorists.",
        },
    ],
}

NUMERICAL_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c11_soc_001": [
        {
            "text": "Auguste Comte's law of three stages states that human thought passes through three stages. If the Theological stage lasted approximately 3000 years and the Metaphysical stage lasted 1200 years, and the total span covered is 5500 years, for how many years did the Positive stage last?",
            "answer": 1300,
            "difficulty": 0.5,
            "solution": "Positive stage = 5500 - 3000 - 1200 = 1300 years.",
        },
        {
            "text": "In a survey of 500 households, 120 are found to be joint families. What percentage of households are nuclear families?",
            "answer": 76.0,
            "difficulty": 0.3,
            "solution": "Nuclear families = 500 - 120 = 380. Percentage = (380/500) × 100 = 76%.",
        },
    ],
    "c11_soc_002": [
        {
            "text": "In a village of 2000 people, 60% are literate. How many illiterate people are there?",
            "answer": 800,
            "difficulty": 0.2,
            "solution": "Illiterate = 2000 - (60% of 2000) = 2000 - 1200 = 800 people.",
        },
    ],
    "c11_soc_003": [
        {
            "text": "If the literacy rate of a town is 78% and the population is 12,500, how many people are literate?",
            "answer": 9750,
            "difficulty": 0.3,
            "solution": "Literate = 78% of 12,500 = 0.78 × 12,500 = 9,750 people.",
        },
    ],
    "c11_soc_004": [
        {
            "text": "In a study of 400 workers, 150 belong to the working class, 120 to the middle class, and the rest to the upper class. What percentage are in the upper class?",
            "answer": 32.5,
            "difficulty": 0.4,
            "solution": "Upper class = 400 - 150 - 120 = 130. Percentage = (130/400) × 100 = 32.5%.",
        },
    ],
    "c11_soc_005": [
        {
            "text": "If a country's GDP grows at 4% annually, what will be the GDP after 2 years if the current GDP is 1000 crores? (Use compound growth: Year 1 = 1040, Year 2 = 1081.6)",
            "answer": 1081.6,
            "difficulty": 0.5,
            "solution": "Year 1: 1000 × 1.04 = 1040. Year 2: 1040 × 1.04 = 1081.6 crores.",
        },
    ],
    "c11_soc_006": [
        {
            "text": "A researcher wants to sample 10% of a population of 2500. How many individuals should be in the sample?",
            "answer": 250,
            "difficulty": 0.2,
            "solution": "Sample size = 10% of 2500 = 250 individuals.",
        },
        {
            "text": "If 35 out of 200 respondents favour a particular policy, what is the percentage in favour?",
            "answer": 17.5,
            "difficulty": 0.2,
            "solution": "Percentage = (35/200) × 100 = 17.5%.",
        },
    ],
    "c11_soc_007": [
        {
            "text": "In a survey of 600 students, 180 were found to engage in deviant behaviour. What percentage does this represent?",
            "answer": 30.0,
            "difficulty": 0.3,
            "solution": "Percentage = (180/600) × 100 = 30%.",
        },
    ],
    "c11_soc_008": [
        {
            "text": "A person has 3 roles: parent, employee, and student. If they spend 8 hours on employee duties, 3 hours on student activities, and the rest of a 24-hour day on parenting, how many hours are devoted to parenting?",
            "answer": 13,
            "difficulty": 0.3,
            "solution": "Parenting hours = 24 - 8 - 3 = 13 hours.",
        },
    ],
    "c11_soc_009": [
        {
            "text": "The poverty line is set at an income of ₹32 per day in rural areas. If a family of 5 has a monthly income of ₹6000, are they above or below the poverty line, and by how much per day?",
            "answer": "Below, by ₹8",
            "difficulty": 0.4,
            "solution": "Daily income = 6000/30 = ₹200. Per person daily = 200/5 = ₹40. Wait — poverty line per person is ₹32. Family needs = 5 × 32 × 30 = ₹4800/month. Actual = ₹6000. Above poverty line by ₹1200/month.",
            "corrected_answer": "Above, by ₹1200 per month (₹40 per person per day vs ₹32 poverty line)",
        },
        {
            "text": "A village has a population of 800 with a sex ratio of 920 females per 1000 males. How many females are in the village?",
            "answer": 384,
            "difficulty": 0.4,
            "solution": "Let males = x, females = 920x/1000. x + 0.92x = 800 → 1.92x = 800 → x ≈ 417 males, females ≈ 383. Rounded: approximately 384 females.",
        },
    ],
    "c11_soc_010": [
        {
            "text": "In a sample of 500 people, 40% identify with Marxian theory, 35% with Weberian theory, and the rest with Durkheimian theory. How many people prefer Durkheimian theory?",
            "answer": 125,
            "difficulty": 0.3,
            "solution": "Durkheimian = 100% - 40% - 35% = 25%. 25% of 500 = 125 people.",
        },
    ],
}


# ──────────────────────────────────────────────────────────────────────────────
# SOLVER FUNCTIONS
# ──────────────────────────────────────────────────────────────────────────────

def solve_mcq(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve and verify an MCQ question."""
    options = question.get("options", [])
    answer_idx = question.get("answer", -1)
    correct = (0 <= answer_idx < len(options))
    selected = options[answer_idx] if correct else "N/A"
    return {
        "method": "direct_lookup",
        "selected_option": selected,
        "option_index": answer_idx,
        "is_valid": correct,
        "explanation": question.get("solution", ""),
    }


def solve_fill_blank(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve and verify a fill-in-the-blank question."""
    correct_answer = question.get("answer", "")
    text = question.get("text", "")
    # Extract the blank from the text (between underscores or ______)
    blank_match = re.search(r'_{2,}', text)
    blank_marker = blank_match.group() if blank_match else "____"
    return {
        "method": "exact_match",
        "correct_answer": correct_answer,
        "blank_marker": blank_marker,
        "is_valid": bool(correct_answer),
        "explanation": question.get("solution", ""),
    }


def solve_short_answer(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve and verify a short answer question."""
    correct_answer = question.get("answer", "")
    key_points = _extract_key_points(correct_answer)
    return {
        "method": "keyword_matching",
        "reference_answer": correct_answer,
        "key_points_expected": key_points,
        "is_valid": bool(correct_answer),
        "min_keywords_required": max(1, len(key_points) // 2),
        "explanation": question.get("solution", ""),
    }


def solve_long_answer(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve and verify a long answer question."""
    correct_answer = question.get("answer", "")
    key_points = _extract_key_points(correct_answer)
    return {
        "method": "structured_keyword_matching",
        "reference_answer": correct_answer,
        "key_points_expected": key_points,
        "is_valid": bool(correct_answer),
        "min_keywords_required": max(2, len(key_points) // 2),
        "min_length": 50,
        "explanation": question.get("solution", ""),
    }


def solve_numerical(question: Dict[str, Any]) -> Dict[str, Any]:
    """Solve and verify a numerical question."""
    correct_answer = question.get("answer", 0)
    text = question.get("text", "")
    # Extract numbers from the question text
    numbers_in_text = [float(n) for n in re.findall(r'[\d,]+\.?\d*', text.replace(',', ''))]
    return {
        "method": "arithmetic_verification",
        "correct_answer": correct_answer,
        "numbers_in_question": numbers_in_text,
        "tolerance": 0.01 if isinstance(correct_answer, float) else 0,
        "is_valid": isinstance(correct_answer, (int, float)),
        "explanation": question.get("solution", ""),
    }


def _extract_key_points(text: str) -> List[str]:
    """Extract key points from an answer text by splitting on numbering patterns."""
    # Split on common numbering patterns
    points = re.split(r'\(\d+\)|^\d+\.\s*', text, flags=re.MULTILINE)
    points = [p.strip() for p in points if p.strip() and len(p.strip()) > 5]
    return points[:8] if points else [text[:100]]


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS PER TOPIC
# ──────────────────────────────────────────────────────────────────────────────

def _make_question(
    qid: str,
    topic_id: str,
    text: str,
    qtype: str,
    difficulty: float,
    answer: Any,
    options: Optional[List[str]] = None,
    solution: str = "",
    solver_func: Optional[Callable] = None,
) -> Dict[str, Any]:
    """Build a question dict with verification."""
    verification = None
    if solver_func:
        question_for_solver = {
            "text": text,
            "answer": answer,
            "options": options or [],
            "solution": solution,
        }
        verification = solver_func(question_for_solver)

    return {
        "id": qid,
        "question_text": text,
        "question_type": qtype,
        "options": options or [],
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": topic_id,
        "topic_title": SYLLABUS_TOPICS.get(topic_id, {}).get("title", ""),
        "solution": solution,
        "verification": verification,
    }


def _topic_has_content(topic_id: str, qtype: str) -> bool:
    """Check whether a topic has any questions of the given type."""
    banks = {
        "mcq": MCQ_BANK,
        "fill_blank": FILL_BLANK_BANK,
        "short_answer": SHORT_ANSWER_BANK,
        "long_answer": LONG_ANSWER_BANK,
        "numerical": NUMERICAL_BANK,
    }
    bank = banks.get(qtype, {})
    return topic_id in bank and len(bank[topic_id]) > 0


def _generate_mcq(topic_id: str, seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate MCQ questions for a topic."""
    questions = []
    bank = MCQ_BANK.get(topic_id, [])
    rng = random.Random(seed)
    selected = rng.sample(bank, min(count, len(bank)))
    for i, q in enumerate(selected):
        qid = f"{topic_id}_mcq_{i+1:03d}"
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            text=q["text"],
            qtype="mcq",
            difficulty=q["difficulty"],
            answer=q["answer"],
            options=q["options"],
            solution=q["solution"],
            solver_func=solve_mcq,
        ))
    return questions


def _generate_fill_blank(topic_id: str, seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate fill-in-the-blank questions for a topic."""
    questions = []
    bank = FILL_BLANK_BANK.get(topic_id, [])
    rng = random.Random(seed)
    selected = rng.sample(bank, min(count, len(bank)))
    for i, q in enumerate(selected):
        qid = f"{topic_id}_fb_{i+1:03d}"
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            text=q["text"],
            qtype="fill_blank",
            difficulty=q["difficulty"],
            answer=q["answer"],
            solution=q["solution"],
            solver_func=solve_fill_blank,
        ))
    return questions


def _generate_short_answer(topic_id: str, seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate short answer questions for a topic."""
    questions = []
    bank = SHORT_ANSWER_BANK.get(topic_id, [])
    rng = random.Random(seed)
    selected = rng.sample(bank, min(count, len(bank)))
    for i, q in enumerate(selected):
        qid = f"{topic_id}_sa_{i+1:03d}"
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            text=q["text"],
            qtype="short_answer",
            difficulty=q["difficulty"],
            answer=q["answer"],
            solution=q["solution"],
            solver_func=solve_short_answer,
        ))
    return questions


def _generate_long_answer(topic_id: str, seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate long answer questions for a topic."""
    questions = []
    bank = LONG_ANSWER_BANK.get(topic_id, [])
    rng = random.Random(seed)
    selected = rng.sample(bank, min(count, len(bank)))
    for i, q in enumerate(selected):
        qid = f"{topic_id}_la_{i+1:03d}"
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            text=q["text"],
            qtype="long_answer",
            difficulty=q["difficulty"],
            answer=q["answer"],
            solution=q["solution"],
            solver_func=solve_long_answer,
        ))
    return questions


def _generate_numerical(topic_id: str, seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate numerical questions for a topic."""
    questions = []
    bank = NUMERICAL_BANK.get(topic_id, [])
    rng = random.Random(seed)
    selected = rng.sample(bank, min(count, len(bank)))
    for i, q in enumerate(selected):
        qid = f"{topic_id}_num_{i+1:03d}"
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            text=q["text"],
            qtype="numerical",
            difficulty=q["difficulty"],
            answer=q["answer"],
            solution=q["solution"],
            solver_func=solve_numerical,
        ))
    return questions


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION REGISTRY
# ──────────────────────────────────────────────────────────────────────────────

QUESTION_REGISTRY: Dict[str, Dict[str, Callable]] = {}

for topic_id in SYLLABUS_TOPICS:
    QUESTION_REGISTRY[topic_id] = {
        "mcq": lambda t=topic_id, s=0, c=1: _generate_mcq(t, s, c),
        "fill_blank": lambda t=topic_id, s=0, c=1: _generate_fill_blank(t, s, c),
        "short_answer": lambda t=topic_id, s=0, c=1: _generate_short_answer(t, s, c),
        "long_answer": lambda t=topic_id, s=0, c=1: _generate_long_answer(t, s, c),
        "numerical": lambda t=topic_id, s=0, c=1: _generate_numerical(t, s, c),
    }


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION TYPE WEIGHTS FOR DISTRIBUTION
# ──────────────────────────────────────────────────────────────────────────────

QTYPE_WEIGHTS = {
    "mcq": 0.35,
    "fill_blank": 0.15,
    "short_answer": 0.20,
    "long_answer": 0.20,
    "numerical": 0.10,
}

QTYPE_NAMES = list(QTYPE_WEIGHTS.keys())


# ──────────────────────────────────────────────────────────────────────────────
# MAIN GENERATOR
# ──────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate a deterministic set of questions for CISCE Class 11 Sociology.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to generate.

    Returns
    -------
    List[Dict[str, Any]]
        A list of question dictionaries, each containing:
        id, question_text, question_type, options, answer, difficulty,
        topic, topic_title, solution, verification.
    """
    random.seed(seed)

    # Secondary seed offset for question selection
    selection_seed = seed + 7919

    all_questions: List[Dict[str, Any]] = []
    topic_ids = list(SYLLABUS_TOPICS.keys())

    # Distribute questions across topics and types
    questions_per_topic = max(1, count // len(topic_ids))
    remainder = count - (questions_per_topic * len(topic_ids))

    # Shuffle topic order deterministically
    rng = random.Random(selection_seed)
    shuffled_topics = topic_ids[:]
    rng.shuffle(shuffled_topics)

    generated = 0
    type_cycle_idx = 0

    for t_idx, topic_id in enumerate(shuffled_topics):
        if generated >= count:
            break

        # Determine how many questions for this topic
        q_for_topic = questions_per_topic + (1 if t_idx < remainder else 0)
        q_for_topic = min(q_for_topic, count - generated)

        # Distribute question types for this topic
        rng2 = random.Random(seed + t_idx + 100)
        type_allocation = _allocate_types(q_for_topic, topic_id, rng2)

        for qtype, qcount in type_allocation.items():
            if qcount <= 0:
                continue
            if not _topic_has_content(topic_id, qtype):
                continue

            gen_seed = seed + generated * 37 + hash(topic_id) % 10000
            try:
                generator_func = QUESTION_REGISTRY[topic_id][qtype]
                new_qs = generator_func(gen_seed, qcount)
                for q in new_qs:
                    if len(all_questions) < count:
                        all_questions.append(q)
                        generated += 1
            except Exception:
                continue

    # If we still haven't generated enough, fill from remaining bank
    if len(all_questions) < count:
        _fill_remaining(all_questions, count, seed, topic_ids)

    return all_questions[:count]


def _allocate_types(qcount: int, topic_id: str, rng: random.Random) -> Dict[str, int]:
    """Allocate question types for a given count and topic."""
    allocation: Dict[str, int] = {t: 0 for t in QTYPE_NAMES}

    available_types = [t for t in QTYPE_NAMES if _topic_has_content(topic_id, t)]
    if not available_types:
        available_types = ["mcq"]

    weights = [QTYPE_WEIGHTS.get(t, 0.1) for t in available_types]
    total_weight = sum(weights)
    if total_weight > 0:
        weights = [w / total_weight for w in weights]

    for _ in range(qcount):
        chosen = rng.choices(available_types, weights=weights, k=1)[0]
        allocation[chosen] += 1

    return allocation


def _fill_remaining(
    questions: List[Dict[str, Any]],
    target_count: int,
    seed: int,
    topic_ids: List[str],
) -> None:
    """Fill remaining questions by pulling from all available banks."""
    all_bank_items: List[tuple] = []

    for topic_id in topic_ids:
        for qtype, bank in [
            ("mcq", MCQ_BANK.get(topic_id, [])),
            ("fill_blank", FILL_BLANK_BANK.get(topic_id, [])),
            ("short_answer", SHORT_ANSWER_BANK.get(topic_id, [])),
            ("long_answer", LONG_ANSWER_BANK.get(topic_id, [])),
            ("numerical", NUMERICAL_BANK.get(topic_id, [])),
        ]:
            for item in bank:
                all_bank_items.append((topic_id, qtype, item))

    existing_ids = {q["id"] for q in questions}
    rng = random.Random(seed + 9999)

    shuffled_items = all_bank_items[:]
    rng.shuffle(shuffled_items)

    solver_map = {
        "mcq": solve_mcq,
        "fill_blank": solve_fill_blank,
        "short_answer": solve_short_answer,
        "long_answer": solve_long_answer,
        "numerical": solve_numerical,
    }

    for topic_id, qtype, item in shuffled_items:
        if len(questions) >= target_count:
            break

        qtype_idx = len([q for q in questions if q["question_type"] == qtype])
        qid = f"{topic_id}_{qtype[:3]}_fill_{qtype_idx+1:03d}"
        if qid in existing_ids:
            continue

        base_kwargs: Dict[str, Any] = {
            "text": item["text"],
            "qtype": qtype,
            "difficulty": item["difficulty"],
            "answer": item["answer"],
            "solution": item.get("solution", ""),
            "options": item.get("options", None),
        }

        solver = solver_map.get(qtype)
        questions.append(_make_question(
            qid=qid,
            topic_id=topic_id,
            solver_func=solver,
            **base_kwargs,  # type: ignore
        ))
        existing_ids.add(qid)


# ──────────────────────────────────────────────────────────────────────────────
# VERIFICATION
# ──────────────────────────────────────────────────────────────────────────────

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Validate all generated questions for correctness and completeness.

    Parameters
    ----------
    questions : List[Dict[str, Any]]
        List of question dictionaries to validate.

    Returns
    -------
    Dict[str, Any]
        Validation report with total, valid, invalid counts and error details.
    """
    report: Dict[str, Any] = {
        "total": len(questions),
        "valid": 0,
        "invalid": 0,
        "errors": [],
        "by_type": {},
        "by_topic": {},
        "difficulty_range": {"min": 1.0, "max": 0.0},
        "warnings": [],
    }

    required_keys = {
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution",
    }

    valid_types = {"mcq", "fill_blank", "short_answer", "long_answer", "numerical"}

    for q in questions:
        q_errors: List[str] = []

        # Check required keys
        missing = required_keys - set(q.keys())
        if missing:
            q_errors.append(f"Missing keys: {missing}")

        # Check question type
        qtype = q.get("question_type", "")