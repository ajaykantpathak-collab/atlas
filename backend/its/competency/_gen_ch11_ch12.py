import json
import os

OUT_DIR = r"D:\platform\backend\its\competency"

# ---------------------------------------------------------------------------
# Chapter 11: Grassroots Democracy -- Part 2: Local Government in Rural Areas
# ---------------------------------------------------------------------------
ch11 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 11,
    "chapter_title": "Grassroots Democracy -- Part 2: Local Government in Rural Areas",
    "source_file": "",
    "concepts": [
        {
            "id": "c6ss.11.1",
            "title": "Panchayati Raj System",
            "section": "11.1",
            "definition": "The Panchayati Raj system is a three-tier framework of local self-government in rural India, created to decentralise administrative power and bring democratic decision-making to the village level.",
            "formula": "",
            "key_idea": "Panchayati Raj empowers rural citizens to participate in governance and manage local affairs through their elected representatives.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the panchayati raj system",
                "explain the main objectives of the panchayati raj system in rural india",
                "how does the panchayati raj system promote grassroots democracy",
                "describe the three tiers of the panchayati raj system",
                "why was the panchayati raj system introduced in india"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the system and its purpose",
                    "explain": "Recognise that Panchayati Raj is a decentralised rural local self-government framework meant to bring administration closer to villagers."
                },
                {
                    "step": 2,
                    "action": "describe the three-tier structure",
                    "explain": "Outline the Gram Panchayat at the village level, Panchayat Samiti at the block level, and Zila Parishad at the district level."
                },
                {
                    "step": 3,
                    "action": "verify democratic significance",
                    "explain": "Confirm that the system enables direct and indirect participation of villagers in decision-making, making governance responsive and accountable at the grassroots."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the Panchayati Raj system and why was it introduced in India?",
                    "solution": "The Panchayati Raj system is a three-tier structure of rural local self-government consisting of the Gram Panchayat, Panchayat Samiti, and Zila Parishad. It was introduced to decentralise power so that villagers can participate in decisions affecting their daily lives.",
                    "answer": "A three-tier rural local self-government system introduced to decentralise administration and promote grassroots democracy."
                },
                {
                    "question": "How does the Panchayati Raj system promote grassroots democracy?",
                    "solution": "By electing representatives from within the village, the system ensures that governance happens close to the people. Villagers can raise local issues, approve plans, and monitor implementation through the Gram Sabha and elected Panchayat members.",
                    "answer": "It brings decision-making to the village level through elected representatives and direct participation in the Gram Sabha."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the three tiers of the Panchayati Raj system.",
                    "type": "short_answer"
                },
                {
                    "question": "Why is the Panchayati Raj system considered a step towards grassroots democracy?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.2",
            "title": "Gram Sabha and Gram Panchayat",
            "section": "11.2",
            "definition": "The Gram Sabha is the general assembly of all registered voters of a village or group of villages, while the Gram Panchayat is the elected executive body that carries out the decisions of the Gram Sabha.",
            "formula": "",
            "key_idea": "The Gram Sabha provides direct democracy through mass participation, whereas the Gram Panchayat provides representative democracy by implementing decisions.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the difference between gram sabha and gram panchayat",
                "who are the members of the gram sabha",
                "explain the role of the gram sabha in village governance",
                "how is the gram panchayat formed",
                "describe the relationship between the gram sabha and the gram panchayat"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "define the gram sabha",
                    "explain": "Identify the Gram Sabha as the body of all adult registered voters of the village who meet periodically to discuss and approve village plans and accounts."
                },
                {
                    "step": 2,
                    "action": "define the gram panchayat",
                    "explain": "Identify the Gram Panchayat as the elected executive body, chosen by the Gram Sabha, responsible for implementing decisions and managing village administration."
                },
                {
                    "step": 3,
                    "action": "verify the relationship",
                    "explain": "Confirm that the Gram Sabha supervises and guides the Gram Panchayat, approving its budget and reviewing its work, ensuring accountability of the elected body to the villagers."
                }
            ],
            "worked_examples": [
                {
                    "question": "Distinguish between the Gram Sabha and the Gram Panchayat.",
                    "solution": "The Gram Sabha is the general body of all registered voters of the village and acts as the deliberative and supervisory assembly. The Gram Panchayat is the elected executive body that implements the decisions taken by the Gram Sabha and manages day-to-day village affairs.",
                    "answer": "Gram Sabha = all voters (deliberative); Gram Panchayat = elected executive (implementing)."
                },
                {
                    "question": "Who can become a member of the Gram Sabha?",
                    "solution": "Any adult who is a registered voter of the village is automatically a member of the Gram Sabha. No election is needed to join it; membership is based on voter registration in that village.",
                    "answer": "All registered adult voters of the village are members of the Gram Sabha."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the role of the Gram Sabha in village governance.",
                    "type": "short_answer"
                },
                {
                    "question": "How does the Gram Panchayat remain accountable to the villagers?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.3",
            "title": "Structure of Panchayati Raj: Gram, Block and Zila Levels",
            "section": "11.3",
            "definition": "The Panchayati Raj operates through three tiers: the Gram Panchayat at the village level, the Panchayat Samiti (Block) at the block or tehsil level, and the Zila Parishad at the district level.",
            "formula": "",
            "key_idea": "Each tier handles governance at its respective administrative level, with higher tiers coordinating and supporting the work of lower tiers.",
            "textbook_ref": "",
            "question_patterns": [
                "describe the three-tier structure of the panchayati raj",
                "what is the role of the panchayat samiti at the block level",
                "explain the functions of the zila parishad",
                "how are the three tiers of panchayati raj connected",
                "which tier of panchayati raj functions at the district level"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the village tier",
                    "explain": "Locate the Gram Panchayat as the lowest tier, directly elected by villagers to manage village-level civic affairs."
                },
                {
                    "step": 2,
                    "action": "identify the block tier",
                    "explain": "Locate the Panchayat Samiti as the middle tier at the block level, coordinating the work of Gram Panchayats and implementing block-level development programmes."
                },
                {
                    "step": 3,
                    "action": "identify the district tier and verify linkage",
                    "explain": "Locate the Zila Parishad as the apex tier at the district level, overseeing district-wide planning and channelling funds to lower tiers, confirming the three tiers are linked through a chain of planning and supervision."
                }
            ],
            "worked_examples": [
                {
                    "question": "Describe the three-tier structure of the Panchayati Raj system.",
                    "solution": "The three tiers are the Gram Panchayat at the village level, the Panchayat Samiti at the block level, and the Zila Parishad at the district level. The Gram Panchayat handles village affairs, the Panchayat Samiti coordinates block-level development, and the Zila Parishad oversees district-wide planning and allocation of resources.",
                    "answer": "Gram Panchayat (village) -> Panchayat Samiti (block) -> Zila Parishad (district)."
                },
                {
                    "question": "What is the role of the Zila Parishad in the Panchayati Raj system?",
                    "solution": "The Zila Parishad is the apex body at the district level. It coordinates the activities of all Panchayat Samitis in the district, prepares district development plans, and distributes funds received from the state government to the lower tiers.",
                    "answer": "It coordinates block-level bodies, prepares district plans, and channels funds to lower tiers."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the functions of the Panchayat Samiti at the block level.",
                    "type": "short_answer"
                },
                {
                    "question": "How are the three tiers of the Panchayati Raj connected to each other?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.4",
            "title": "Functions of the Gram Panchayat",
            "section": "11.4",
            "definition": "The Gram Panchayat performs civic and developmental functions such as providing water supply, maintaining sanitation and drainage, street lighting, repairing village roads, and implementing government welfare schemes.",
            "formula": "",
            "key_idea": "The Gram Panchayat is responsible for the day-to-day administration of the village and the delivery of basic civic services to residents.",
            "textbook_ref": "",
            "question_patterns": [
                "list the main functions of the gram panchayat",
                "how does the gram panchayat maintain sanitation in the village",
                "explain the role of the gram panchayat in implementing welfare schemes",
                "what civic services are provided by the gram panchayat",
                "describe how the gram panchayat manages water supply in the village"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify civic functions",
                    "explain": "List basic services such as drinking water supply, street lighting, drainage, sanitation, and maintenance of village roads and public spaces."
                },
                {
                    "step": 2,
                    "action": "identify developmental functions",
                    "explain": "List implementation of welfare and development schemes like housing, employment programmes, and health initiatives assigned by higher governments."
                },
                {
                    "step": 3,
                    "action": "verify service delivery role",
                    "explain": "Confirm that the Gram Panchayat acts as the primary local agency ensuring that essential civic services reach every household and that development schemes are carried out at the village level."
                }
            ],
            "worked_examples": [
                {
                    "question": "List any four important functions of the Gram Panchayat.",
                    "solution": "The Gram Panchayat (1) arranges drinking water supply, (2) maintains street lighting and village roads, (3) manages sanitation and drainage, and (4) implements government welfare schemes such as housing and employment programmes.",
                    "answer": "Water supply, street lighting and roads, sanitation and drainage, and implementation of welfare schemes."
                },
                {
                    "question": "How does the Gram Panchayat contribute to the implementation of welfare schemes?",
                    "solution": "The Gram Panchayat identifies beneficiaries in the village, selects projects approved by the Gram Sabha, receives funds from higher levels of government, and ensures that schemes such as rural housing and employment guarantee programmes are executed properly.",
                    "answer": "It identifies beneficiaries, manages funds, and executes welfare schemes at the village level."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the civic functions of the Gram Panchayat.",
                    "type": "short_answer"
                },
                {
                    "question": "How does the Gram Panchayat help in rural development?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.5",
            "title": "Elections to Panchayats",
            "section": "11.5",
            "definition": "Panchayat elections are held every five years in which members are elected by direct vote of village adults; seats are reserved for Scheduled Castes, Scheduled Tribes, and women to ensure inclusive representation.",
            "formula": "",
            "key_idea": "Regular, direct elections with reservations ensure democratic accountability and representation of marginalised groups in rural local government.",
            "textbook_ref": "",
            "question_patterns": [
                "how are members of the gram panchayat elected",
                "what is the term of a gram panchayat",
                "explain the system of reservation of seats in panchayat elections",
                "why are seats reserved for women in panchayats",
                "describe the process of election to the panchayati raj institutions"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the election process",
                    "explain": "Note that members of the Gram Panchayat, including the Sarpanch, are elected directly by the registered voters of the village through secret ballot."
                },
                {
                    "step": 2,
                    "action": "identify the term and reservations",
                    "explain": "State that the term of the Panchayat is five years and that seats are reserved for SCs, STs, and women (including one-third reservation for women) to ensure representation."
                },
                {
                    "step": 3,
                    "action": "verify democratic purpose",
                    "explain": "Confirm that regular five-year elections and reservations make the Panchayat accountable to all sections of village society and prevent dominance by any single group."
                }
            ],
            "worked_examples": [
                {
                    "question": "How are members of the Gram Panchayat elected and what is their term?",
                    "solution": "Members of the Gram Panchayat are elected directly by the adult registered voters of the village through secret ballot. The elected body serves a term of five years, after which fresh elections are held.",
                    "answer": "Directly elected by village voters for a five-year term."
                },
                {
                    "question": "Why are seats reserved in Panchayat elections and for whom?",
                    "solution": "Seats are reserved for Scheduled Castes, Scheduled Tribes, and women to ensure that these historically marginalised groups get adequate representation in local governance. At least one-third of seats are reserved for women.",
                    "answer": "Reserved for SCs, STs, and women (at least one-third) to ensure inclusive representation."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the importance of reservations in Panchayat elections.",
                    "type": "short_answer"
                },
                {
                    "question": "Describe the complete process of election to the Gram Panchayat.",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.6",
            "title": "Role of Sarpanch and Panch",
            "section": "11.6",
            "definition": "The Sarpanch (also called Gram Pradhan) is the elected head of the Gram Panchayat who leads its administration, while the Panchs are the elected ward members who represent their respective wards and assist in governance.",
            "formula": "",
            "key_idea": "The Sarpanch provides leadership and coordination, while the Panchs ensure that the concerns of each ward are represented in Panchayat decisions.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the role of the sarpanch in the gram panchayat",
                "who is a panch and what functions does a panch perform",
                "explain the difference between a sarpanch and a panch",
                "how is the sarpanch elected",
                "describe the responsibilities of the sarpanch in village administration"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "define the sarpanch",
                    "explain": "Identify the Sarpanch as the elected president of the Gram Panchayat who convenes meetings, signs official decisions, and represents the Panchayat before higher authorities."
                },
                {
                    "step": 2,
                    "action": "define the panch",
                    "explain": "Identify the Panchs as the elected members representing individual wards who raise local issues, participate in meetings, and vote on Panchayat decisions."
                },
                {
                    "step": 3,
                    "action": "verify complementary roles",
                    "explain": "Confirm that the Sarpanch leads and the Panchs support, together ensuring that village administration runs smoothly and that every ward's concerns reach the Panchayat."
                }
            ],
            "worked_examples": [
                {
                    "question": "What are the main responsibilities of the Sarpanch?",
                    "solution": "The Sarpanch convenes and presides over Gram Panchayat and Gram Sabha meetings, implements the decisions taken, manages Panchayat funds and records, and represents the village before government officials and higher Panchayat tiers.",
                    "answer": "Convenes meetings, implements decisions, manages funds, and represents the village to higher authorities."
                },
                {
                    "question": "Distinguish between a Sarpanch and a Panch.",
                    "solution": "The Sarpanch is the elected head of the entire Gram Panchayat and leads its administration, while a Panch is an elected member representing a particular ward. The Sarpanch coordinates overall work; the Panch focuses on the concerns of their ward.",
                    "answer": "Sarpanch = head of the Panchayat; Panch = ward-level elected member."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the functions of a Panch in the Gram Panchayat.",
                    "type": "short_answer"
                },
                {
                    "question": "How do the Sarpanch and the Panchs work together for village development?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.11.7",
            "title": "Sources of Income for Panchayats",
            "section": "11.7",
            "definition": "Gram Panchayats raise income from local taxes such as house tax and water tax, fees from licences and fairs, revenue from common property resources, and grants received from the state and central governments.",
            "formula": "total_income = local_taxes + fees + grants + other_revenue",
            "key_idea": "Panchayat finances combine locally generated revenue with government grants to fund village development and services.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the main sources of income of the gram panchayat",
                "calculate the total income of a gram panchayat from its various sources",
                "explain the difference between local taxes and government grants for panchayats",
                "how do panchayats use common property resources to generate revenue",
                "why do panchayats depend on grants from the state government"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "list all income sources and their amounts",
                    "explain": "Identify each source of Panchayat income: local taxes (house tax, water tax), fees (licences, fairs), revenue from common property resources, and government grants.",
                    "compute": "local_taxes + fees + grants + other_revenue"
                },
                {
                    "step": 2,
                    "action": "compute total income",
                    "explain": "Add the amounts from all sources to find the total income of the Gram Panchayat for the period.",
                    "compute": "total_income = local_taxes + fees + grants + other_revenue"
                },
                {
                    "step": 3,
                    "action": "interpret the income composition",
                    "explain": "Determine what proportion of income comes from local sources versus government grants, and assess whether the Panchayat is financially self-reliant or grant-dependent.",
                    "compute": "local_share = (local_taxes + fees + other_revenue) / total_income; grant_share = grants / total_income"
                }
            ],
            "worked_examples": [
                {
                    "question": "A Gram Panchayat collects Rs 40,000 as house tax, Rs 15,000 as water tax, Rs 5,000 from licence fees, and receives a government grant of Rs 60,000. Calculate its total income.",
                    "solution": "Local taxes = 40,000 + 15,000 = 55,000. Fees = 5,000. Grants = 60,000. Total income = 55,000 + 5,000 + 60,000 = 1,20,000.",
                    "answer": "Total income = Rs 1,20,000."
                },
                {
                    "question": "A Gram Panchayat earns Rs 25,000 from local taxes, Rs 10,000 from fees, and Rs 50,000 as a state grant. What share of its total income comes from local sources?",
                    "solution": "Local sources = 25,000 + 10,000 = 35,000. Total income = 35,000 + 50,000 = 85,000. Local share = 35,000 / 85,000 = 0.4118, that is about 41%.",
                    "answer": "Local sources contribute about 41% of the total income of Rs 85,000."
                }
            ],
            "exercises": [
                {
                    "question": "List the main sources of income of a Gram Panchayat.",
                    "type": "short_answer"
                },
                {
                    "question": "A Gram Panchayat collects Rs 30,000 in taxes, Rs 8,000 in fees, and receives a grant of Rs 45,000. Calculate its total income and the share from local sources.",
                    "type": "compute"
                }
            ]
        },
        {
            "id": "c6ss.11.8",
            "title": "Importance of Local Self-Government in Rural Areas",
            "section": "11.8",
            "definition": "Local self-government in rural areas ensures that development decisions are made close to the people, promotes participatory democracy, and addresses local needs efficiently through the Panchayati Raj system.",
            "formula": "",
            "key_idea": "Decentralised rural governance empowers citizens, improves accountability, and makes administration responsive to village-level problems.",
            "textbook_ref": "",
            "question_patterns": [
                "why is local self-government important in rural areas",
                "how does the panchayati raj system empower rural citizens",
                "explain the benefits of decentralisation of power in villages",
                "what are the advantages of grassroots democracy for rural development",
                "how does local self-government make administration more responsive"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify benefits to citizens",
                    "explain": "Note that local self-government allows villagers to participate directly in decision-making through the Gram Sabha and to hold elected representatives accountable."
                },
                {
                    "step": 2,
                    "action": "identify benefits to administration",
                    "explain": "Note that decentralisation brings administration closer to the people, enabling quicker identification of local problems and faster delivery of services."
                },
                {
                    "step": 3,
                    "action": "verify overall significance",
                    "explain": "Confirm that rural local self-government strengthens democracy at the grassroots, promotes inclusive development, and ensures that resources and schemes reach those who need them most."
                }
            ],
            "worked_examples": [
                {
                    "question": "Why is local self-government important in rural areas?",
                    "solution": "Local self-government brings administration close to the villagers, allows them to participate in decision-making through the Gram Sabha, ensures accountability of representatives, and makes development schemes responsive to local needs.",
                    "answer": "It empowers villagers, ensures accountability, and makes administration responsive to local needs."
                },
                {
                    "question": "How does the Panchayati Raj system empower rural citizens?",
                    "solution": "Through regular elections, the Gram Sabha, and reserved seats for marginalised groups, the system gives every section of village society a voice in governance. Citizens can approve plans, review accounts, and elect their own representatives.",
                    "answer": "It gives villagers a direct voice in governance through elections, the Gram Sabha, and inclusive representation."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the advantages of decentralisation of power in rural areas.",
                    "type": "short_answer"
                },
                {
                    "question": "Discuss how local self-government contributes to rural development and grassroots democracy.",
                    "type": "long_answer"
                }
            ]
        }
    ]
}

# ---------------------------------------------------------------------------
# Chapter 12: Grassroots Democracy -- Part 3: Local Government in Urban Areas
# ---------------------------------------------------------------------------
ch12 = {
    "class": 6,
    "subject": "social_science",
    "chapter": 12,
    "chapter_title": "Grassroots Democracy -- Part 3: Local Government in Urban Areas",
    "source_file": "",
    "concepts": [
        {
            "id": "c6ss.12.1",
            "title": "Municipal Corporation and Municipality",
            "section": "12.1",
            "definition": "Municipal corporations govern large cities, while municipalities or municipal councils govern smaller towns; both are urban local self-government bodies created by state law.",
            "formula": "",
            "key_idea": "The type of urban local body depends on the size of the urban settlement; bigger cities have corporations and smaller towns have municipalities.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the difference between a municipal corporation and a municipality",
                "which urban local body governs a large city",
                "how is a municipality different from a municipal corporation",
                "explain the types of urban local self-government in india",
                "why do large cities have municipal corporations while small towns have municipalities"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the municipal corporation",
                    "explain": "Recognise that a municipal corporation is the urban local body for large cities, with a larger structure, bigger budget, and wider range of functions."
                },
                {
                    "step": 2,
                    "action": "identify the municipality",
                    "explain": "Recognise that a municipality or municipal council is the urban local body for smaller towns, with a simpler structure and fewer functions than a corporation."
                },
                {
                    "step": 3,
                    "action": "verify the basis of distinction",
                    "explain": "Confirm that the choice between a corporation and a municipality depends mainly on the population and size of the urban area, as determined by state law."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the difference between a municipal corporation and a municipality?",
                    "solution": "A municipal corporation is the governing body of a large city and has a more complex structure with a mayor, commissioner, and many councillors. A municipality governs a smaller town and has a simpler structure with a chairperson and fewer members. Both provide civic services but the scale differs.",
                    "answer": "Corporation = large city, complex structure; Municipality = small town, simpler structure."
                },
                {
                    "question": "Which urban local body would govern a city with a population of over ten lakh, and why?",
                    "solution": "A municipal corporation would govern such a large city because its bigger administrative structure and larger budget are better suited to manage the complex needs of a big urban population.",
                    "answer": "A municipal corporation, because of the large population and complex urban needs."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the types of urban local self-government bodies in India.",
                    "type": "short_answer"
                },
                {
                    "question": "Why does the structure of urban local government vary between large cities and small towns?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.2",
            "title": "Structure of Urban Local Government",
            "section": "12.2",
            "definition": "Urban local government is organised into wards represented by elected councillors, with a mayor as the elected head and a municipal commissioner as the appointed administrative head.",
            "formula": "",
            "key_idea": "Urban local bodies combine an elected political wing (councillors and mayor) with an appointed administrative wing (commissioner and staff) for governance.",
            "textbook_ref": "",
            "question_patterns": [
                "describe the structure of urban local government",
                "what are the two wings of a municipal corporation",
                "explain how a city is divided into wards",
                "who is the administrative head of a municipal corporation",
                "how do elected representatives and officials work together in urban local government"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the political wing",
                    "explain": "Note that the city is divided into wards, each represented by an elected councillor, with the mayor as the elected head of the corporation."
                },
                {
                    "step": 2,
                    "action": "identify the administrative wing",
                    "explain": "Note that the municipal commissioner, appointed by the state government, leads the administrative staff that implements decisions and manages daily operations."
                },
                {
                    "step": 3,
                    "action": "verify the balance of wings",
                    "explain": "Confirm that the political wing reflects the people's will through elections while the administrative wing provides professional execution, and that both must work together for effective urban governance."
                }
            ],
            "worked_examples": [
                {
                    "question": "Describe the structure of a municipal corporation.",
                    "solution": "A municipal corporation has two wings. The political wing consists of elected councillors from each ward and a mayor as the elected head. The administrative wing consists of the municipal commissioner and staff who implement decisions. The corporation council makes policies and the administration executes them.",
                    "answer": "Political wing (councillors + mayor) and administrative wing (commissioner + staff)."
                },
                {
                    "question": "How is a city divided for the purpose of urban local government?",
                    "solution": "A city is divided into wards, which are smaller electoral units. Each ward elects one councillor to represent its residents in the municipal corporation or municipality, ensuring that every part of the city has a voice.",
                    "answer": "The city is divided into wards, each electing a councillor to the municipal body."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the two wings of a municipal corporation.",
                    "type": "short_answer"
                },
                {
                    "question": "How do elected representatives and appointed officials work together in urban local government?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.3",
            "title": "Functions of the Municipal Corporation",
            "section": "12.3",
            "definition": "Municipal corporations provide essential civic services including water supply, sewage and drainage, garbage collection and disposal, street lighting, public health, urban planning, and maintenance of roads and public parks.",
            "formula": "",
            "key_idea": "Municipal corporations are responsible for delivering the basic civic services and infrastructure that keep a large city functioning and livable.",
            "textbook_ref": "",
            "question_patterns": [
                "list the main functions of a municipal corporation",
                "how does the municipal corporation manage garbage disposal",
                "explain the role of the municipal corporation in public health",
                "what civic services are provided by the municipal corporation",
                "describe how the municipal corporation maintains urban infrastructure"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify essential civic services",
                    "explain": "List services such as piped water supply, sewage and drainage, garbage collection and disposal, street lighting, and maintenance of roads and public spaces."
                },
                {
                    "step": 2,
                    "action": "identify public health and planning functions",
                    "explain": "List functions such as maintaining public hospitals and dispensaries, preventing epidemics, issuing birth and death certificates, and regulating land use through urban planning."
                },
                {
                    "step": 3,
                    "action": "verify comprehensive service role",
                    "explain": "Confirm that the municipal corporation is the primary agency ensuring that a large city remains clean, healthy, and orderly through the delivery of these civic and developmental services."
                }
            ],
            "worked_examples": [
                {
                    "question": "List any four important functions of a municipal corporation.",
                    "solution": "A municipal corporation (1) supplies piped drinking water, (2) collects and disposes of garbage, (3) maintains street lighting and roads, and (4) runs public health services such as hospitals and dispensaries.",
                    "answer": "Water supply, garbage disposal, street lighting and roads, and public health services."
                },
                {
                    "question": "How does the municipal corporation contribute to public health in a city?",
                    "solution": "The corporation maintains public hospitals and dispensaries, carries out vaccination drives, monitors and prevents epidemics, ensures food safety, and manages sewage and drainage to keep the city sanitary.",
                    "answer": "It runs health facilities, prevents epidemics, ensures food safety, and manages sanitation."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the civic functions of a municipal corporation.",
                    "type": "short_answer"
                },
                {
                    "question": "How does the municipal corporation keep a city clean and livable?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.4",
            "title": "Ward Committees and Councillors",
            "section": "12.4",
            "definition": "Ward committees are bodies formed for each ward to address local issues, with elected councillors representing the interests and concerns of their ward residents in the municipal body.",
            "formula": "",
            "key_idea": "Ward committees bring governance closer to citizens and ensure that local neighbourhood problems are heard and addressed at the municipal level.",
            "textbook_ref": "",
            "question_patterns": [
                "what is a ward committee and what is its function",
                "who is a municipal councillor and how is a councillor elected",
                "explain the role of councillors in urban local government",
                "how do ward committees help citizens",
                "describe the relationship between a councillor and the ward committee"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "define the ward committee",
                    "explain": "Identify the ward committee as a local body for a ward that discusses neighbourhood issues and advises the municipal corporation on local needs."
                },
                {
                    "step": 2,
                    "action": "define the councillor",
                    "explain": "Identify the councillor as the elected representative of a ward who raises local issues in the municipal council, votes on decisions, and communicates with residents."
                },
                {
                    "step": 3,
                    "action": "verify citizen-government linkage",
                    "explain": "Confirm that ward committees and councillors together act as the link between citizens and the municipal body, ensuring that local problems reach the decision-making forum."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is the role of a municipal councillor?",
                    "solution": "A councillor is elected by the residents of a ward to represent them in the municipal body. The councillor raises local issues such as water supply or street lighting in council meetings, votes on the budget and policies, and informs residents about municipal decisions.",
                    "answer": "Represents the ward, raises local issues, votes on decisions, and links citizens to the municipal body."
                },
                {
                    "question": "How do ward committees help citizens of a city?",
                    "solution": "Ward committees provide a forum where residents can discuss neighbourhood problems, prioritise local needs, and forward their concerns to the municipal corporation through the councillor. This makes urban governance more responsive at the local level.",
                    "answer": "They provide a local forum for citizens to raise and prioritise neighbourhood issues for the municipal body."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the function of a ward committee.",
                    "type": "short_answer"
                },
                {
                    "question": "How do councillors and ward committees together strengthen urban local government?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.5",
            "title": "Mayor and Municipal Commissioner",
            "section": "12.5",
            "definition": "The Mayor is the elected ceremonial head of the municipal corporation who presides over council meetings, while the Municipal Commissioner is the appointed administrative officer who implements the council's decisions.",
            "formula": "",
            "key_idea": "The Mayor represents the people's democratic will while the Commissioner provides professional administration; together they balance political leadership and executive function.",
            "textbook_ref": "",
            "question_patterns": [
                "what is the role of the mayor in a municipal corporation",
                "who is the municipal commissioner and what are the duties",
                "explain the difference between the mayor and the municipal commissioner",
                "how is the mayor elected",
                "describe how the mayor and the commissioner work together"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "define the mayor",
                    "explain": "Identify the Mayor as the elected head of the corporation, chosen by the councillors, who presides over meetings, represents the city, and provides political leadership."
                },
                {
                    "step": 2,
                    "action": "define the municipal commissioner",
                    "explain": "Identify the Municipal Commissioner as the appointed administrative head, usually an IAS officer, who manages the corporation's staff, budget, and day-to-day operations."
                },
                {
                    "step": 3,
                    "action": "verify the balance of roles",
                    "explain": "Confirm that the Mayor provides democratic legitimacy and policy direction while the Commissioner provides professional execution, and that effective urban governance requires cooperation between the two."
                }
            ],
            "worked_examples": [
                {
                    "question": "Distinguish between the Mayor and the Municipal Commissioner.",
                    "solution": "The Mayor is the elected head of the corporation, chosen by councillors, who presides over meetings and represents the city. The Municipal Commissioner is the appointed administrative head, usually a senior government officer, who implements decisions and manages staff and finances.",
                    "answer": "Mayor = elected political head; Commissioner = appointed administrative head."
                },
                {
                    "question": "How do the Mayor and the Municipal Commissioner work together?",
                    "solution": "The Mayor and council decide policies and approve the budget based on the people's needs. The Municipal Commissioner and the administrative staff then implement these decisions, manage daily operations, and report back to the council. Cooperation between both is essential for the city to function.",
                    "answer": "The Mayor sets policy direction; the Commissioner executes it through the administration."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the duties of the Municipal Commissioner.",
                    "type": "short_answer"
                },
                {
                    "question": "How do the Mayor and the Municipal Commissioner complement each other in running a city?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.6",
            "title": "Sources of Income for Municipalities",
            "section": "12.6",
            "definition": "Municipalities earn revenue from property tax, water tax, taxes on goods and services, fees for licences and permits, and grants from the state and central governments.",
            "formula": "total_municipal_income = property_tax + water_tax + fees + grants + other_revenue",
            "key_idea": "Urban local bodies rely on a mix of locally collected taxes and government grants to fund city services and infrastructure.",
            "textbook_ref": "",
            "question_patterns": [
                "what are the main sources of income of a municipal corporation",
                "calculate the total income of a municipality from its various sources",
                "explain the difference between property tax and government grants for municipalities",
                "why do municipalities depend on grants from the state government",
                "how do municipalities generate revenue from fees and licences"
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "list all income sources and their amounts",
                    "explain": "Identify each source of municipal income: property tax, water tax, fees from licences and permits, and grants from state and central governments.",
                    "compute": "property_tax + water_tax + fees + grants + other_revenue"
                },
                {
                    "step": 2,
                    "action": "compute total income",
                    "explain": "Add the amounts from all sources to find the total income of the municipality for the financial year.",
                    "compute": "total_municipal_income = property_tax + water_tax + fees + grants + other_revenue"
                },
                {
                    "step": 3,
                    "action": "interpret the income composition",
                    "explain": "Determine the share of income from local taxes versus grants, and assess whether the municipality is financially self-reliant or dependent on government support.",
                    "compute": "local_share = (property_tax + water_tax + fees + other_revenue) / total_municipal_income; grant_share = grants / total_municipal_income"
                }
            ],
            "worked_examples": [
                {
                    "question": "A municipality collects Rs 5,00,000 as property tax, Rs 2,00,000 as water tax, Rs 1,00,000 from licence fees, and receives a government grant of Rs 4,00,000. Calculate its total income.",
                    "solution": "Local taxes = 5,00,000 + 2,00,000 = 7,00,000. Fees = 1,00,000. Grants = 4,00,000. Total income = 7,00,000 + 1,00,000 + 4,00,000 = 12,00,000.",
                    "answer": "Total income = Rs 12,00,000."
                },
                {
                    "question": "A municipal corporation earns Rs 8,00,000 from property tax, Rs 3,00,000 from other local taxes and fees, and Rs 5,00,000 as grants. What share of total income comes from local sources?",
                    "solution": "Local sources = 8,00,000 + 3,00,000 = 11,00,000. Total income = 11,00,000 + 5,00,000 = 16,00,000. Local share = 11,00,000 / 16,00,000 = 0.6875, that is about 69%.",
                    "answer": "Local sources contribute about 69% of the total income of Rs 16,00,000."
                }
            ],
            "exercises": [
                {
                    "question": "List the main sources of income of a municipality.",
                    "type": "short_answer"
                },
                {
                    "question": "A municipality collects Rs 6,00,000 in property tax, Rs 2,50,000 in water tax, Rs 1,50,000 in fees, and receives a grant of Rs 5,00,000. Calculate its total income and the share from local sources.",
                    "type": "compute"
                }
            ]
        },
        {
            "id": "c6ss.12.7",
            "title": "Urban Planning and Services",
            "section": "12.7",
            "definition": "Urban planning is the organised development of cities through land-use regulation, infrastructure provision, building bylaws, and the delivery of civic services to ensure orderly and sustainable urban growth.",
            "formula": "",
            "key_idea": "Planned urban development ensures orderly growth, adequate services, and livable conditions for city residents.",
            "textbook_ref": "",
            "question_patterns": [
                "what is urban planning and why is it important",
                "how do municipalities regulate land use in cities",
                "explain the role of building bylaws in urban planning",
                "what services are planned and provided by urban local bodies",
                "why is planned urban development necessary for sustainable cities"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify planning tools",
                    "explain": "List tools such as master plans, land-use zoning, building bylaws, and layout approvals that regulate how land and buildings are used in a city."
                },
                {
                    "step": 2,
                    "action": "identify planned services",
                    "explain": "List services such as roads, water supply, drainage, public transport, parks, schools, and health facilities that are planned and provided by the municipal body."
                },
                {
                    "step": 3,
                    "action": "verify purpose of urban planning",
                    "explain": "Confirm that urban planning ensures that cities grow in an orderly and sustainable manner, with adequate infrastructure and services, preventing haphazard and unhealthy development."
                }
            ],
            "worked_examples": [
                {
                    "question": "What is urban planning and why is it important?",
                    "solution": "Urban planning is the systematic organisation of a city's land use, infrastructure, and services through master plans, zoning, and building bylaws. It is important because it ensures orderly growth, prevents haphazard construction, and provides adequate services for a livable city.",
                    "answer": "Organised city development through land-use regulation and service provision for orderly, sustainable growth."
                },
                {
                    "question": "How do building bylaws help in urban planning?",
                    "solution": "Building bylaws set rules for construction such as setbacks, height limits, and safety standards. They prevent unsafe and overcrowded construction, ensure proper ventilation and light, and keep the city's development consistent with the master plan.",
                    "answer": "They regulate construction to ensure safety, order, and consistency with the city plan."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the role of land-use regulation in urban planning.",
                    "type": "short_answer"
                },
                {
                    "question": "Why is planned urban development necessary for sustainable cities?",
                    "type": "long_answer"
                }
            ]
        },
        {
            "id": "c6ss.12.8",
            "title": "Importance of Local Self-Government in Urban Areas",
            "section": "12.8",
            "definition": "Urban local self-government ensures that city residents can participate in governance, hold their elected representatives accountable, and access essential civic services efficiently through municipal bodies.",
            "formula": "",
            "key_idea": "Decentralised urban governance makes administration responsive to local needs and promotes citizen participation in city management.",
            "textbook_ref": "",
            "question_patterns": [
                "why is local self-government important in urban areas",
                "how does urban local government benefit city residents",
                "explain the role of municipal bodies in promoting citizen participation",
                "what are the advantages of decentralised urban governance",
                "how does local self-government make city administration more responsive"
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify benefits to citizens",
                    "explain": "Note that urban local government allows residents to elect councillors, raise ward-level issues, and hold representatives accountable for service delivery."
                },
                {
                    "step": 2,
                    "action": "identify benefits to administration",
                    "explain": "Note that decentralisation brings administration closer to neighbourhoods, enabling faster identification of problems and more efficient delivery of civic services."
                },
                {
                    "step": 3,
                    "action": "verify overall significance",
                    "explain": "Confirm that urban local self-government strengthens democracy, ensures inclusive and responsive city management, and improves the quality of life for all residents."
                }
            ],
            "worked_examples": [
                {
                    "question": "Why is local self-government important in urban areas?",
                    "solution": "Urban local self-government allows city residents to participate in governance through elected councillors, ensures accountability of the municipal body, and delivers civic services efficiently by addressing problems at the ward level.",
                    "answer": "It enables citizen participation, ensures accountability, and delivers services efficiently at the local level."
                },
                {
                    "question": "How does urban local government promote citizen participation?",
                    "solution": "Through ward-based elections, ward committees, and public meetings, citizens can choose their representatives, raise local issues, and monitor municipal work. This gives residents a direct role in shaping the development of their neighbourhoods.",
                    "answer": "Through elections, ward committees, and public forums that let citizens influence city governance."
                }
            ],
            "exercises": [
                {
                    "question": "Explain the advantages of decentralised urban governance.",
                    "type": "short_answer"
                },
                {
                    "question": "Discuss how local self-government contributes to better city management and citizen welfare.",
                    "type": "long_answer"
                }
            ]
        }
    ]
}


def write_catalog(data, filename):
    path = os.path.join(OUT_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {path}")


write_catalog(ch11, "catalog_class6_social_ch11.json")
write_catalog(ch12, "catalog_class6_social_ch12.json")

# Validate both files by reading them back
for fn in ["catalog_class6_social_ch11.json", "catalog_class6_social_ch12.json"]:
    path = os.path.join(OUT_DIR, fn)
    with open(path, "r", encoding="utf-8") as f:
        loaded = json.load(f)
    print(f"VALIDATED {fn}: class={loaded['class']} subject={loaded['subject']} chapter={loaded['chapter']} concepts={len(loaded['concepts'])}")
    for c in loaded["concepts"]:
        assert c["id"], "missing id"
        assert len(c["question_patterns"]) == 5, f"{c['id']} has {len(c['question_patterns'])} patterns"
        assert len(c["solution_steps"]) == 3, f"{c['id']} has {len(c['solution_steps'])} steps"
        assert len(c["worked_examples"]) >= 2, f"{c['id']} has {len(c['worked_examples'])} examples"
        assert len(c["exercises"]) >= 2, f"{c['id']} has {len(c['exercises'])} exercises"
        if c["solution_type"] == "compute":
            for s in c["solution_steps"]:
                assert "compute" in s, f"{c['id']} step {s['step']} missing compute field"
    print(f"  All assertions passed for {fn}")

print("DONE")
