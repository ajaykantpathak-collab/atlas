import random
import math
import fractions
import re
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from sympy import symbols, simplify, Eq, solve, N, Rational
import numpy as np
from scipy import stats
import pint

random.seed(42)

_ureg = pint.UnitRegistry()

QUESTION_BANK: List[Dict[str, Any]] = [
    # ==================== NODE c9_commapp_001: BASIC TERMS ====================
    # -- Competency Questions (Indian Context) --
    {
        "id": "c9_basic_comp_mcq_001",
        "type": "mcq",
        "question": "Tata Steel operates its blast furnace at Jamshedpur to produce steel. This activity is best classified as:",
        "options": [
            "A) Trade",
            "B) Industry",
            "C) Commerce",
            "D) Auxiliaries to trade"
        ],
        "answer": "B) Industry",
        "explanation": "Industry involves the production of goods and services. Tata Steel's blast furnace production of steel is manufacturing activity, which is industry. Trade involves buying and selling (exchange of goods), while auxiliaries to trade support exchange activities like banking, transport, and insurance.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_mcq_002",
        "type": "mcq",
        "question": "Reliance Industries Limited is registered under the Companies Act 2013 and its shareholders enjoy limited liability. This makes Reliance Industries a:",
        "options": [
            "A) Firm",
            "B) Partnership",
            "C) Company",
            "D) Sole Proprietorship"
        ],
        "answer": "C) Company",
        "explanation": "A company is a legal entity registered under the Companies Act (e.g., Companies Act 2013 in India) with limited liability for its shareholders. A firm is typically an unregistered business entity like a partnership or sole proprietorship without separate legal status.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_mcq_003",
        "type": "mcq",
        "question": "Amazon India's logistics network delivering products from sellers to customers across India is an example of:",
        "options": [
            "A) Industry",
            "B) Trade",
            "C) Auxiliaries to trade",
            "D) Production"
        ],
        "answer": "C) Auxiliaries to trade",
        "explanation": "Auxiliaries to trade are services that facilitate the smooth flow of trade. Amazon India's logistics (transport and warehousing) supports the exchange of goods between sellers and buyers. The actual buying and selling is trade, while the delivery support is auxiliary to trade.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_mcq_004",
        "type": "mcq",
        "question": "ITC Limited manufactures Aashirvaad atta (industry) and distributes it through retail outlets (trade). The combined activity of production plus distribution represents:",
        "options": [
            "A) Commerce only",
            "B) Business",
            "C) Trade only",
            "D) Auxiliaries to trade"
        ],
        "answer": "B) Business",
        "explanation": "Business is the broader umbrella that includes BOTH industry (production of goods) AND commerce (trade + auxiliaries to trade). ITC's complete activity of manufacturing Aashirvaad atta and distributing it through retail outlets covers both industry and commerce, making it business.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_fb_001",
        "type": "fill_blank",
        "question": "State Bank of India providing working-capital loans to Tata Steel is an example of _____.",
        "options": [],
        "answer": "auxiliaries to trade",
        "explanation": "Auxiliaries to trade are services that facilitate the smooth flow of trade. Banking, insurance, transport, and warehousing are all auxiliaries to trade. SBI providing loans helps finance the operations of a trading or manufacturing company.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_fb_002",
        "type": "fill_blank",
        "question": "A Surat textile trader operating as 'Patel Textiles' under a partnership deed is called a _____.",
        "options": [],
        "answer": "firm",
        "explanation": "A firm is an unregistered business entity typically operated as a sole proprietorship or partnership under a partnership deed. It does not have a separate legal identity from its owners and does not enjoy limited liability like a company.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_sa_001",
        "type": "short_answer",
        "question": "Distinguish between commerce and business with one example each.",
        "options": [],
        "answer": "Business is the broader umbrella that includes both industry (production) and commerce (trade + auxiliaries to trade). Commerce is narrower — it includes only trade (exchange of goods) and auxiliaries to trade (banking, insurance, transport). For example, Reliance Industries operates refineries (industry) and also sells petroleum products through retail outlets (commerce) — together this is business. But SBI providing loans to traders is only an auxiliary to trade, which falls under commerce.",
        "explanation": "Students must clearly state that business = industry + commerce, while commerce = trade + auxiliaries to trade. Business is the wider concept. Indian examples like Reliance Industries help contextualize the distinction.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_sa_002",
        "type": "short_answer",
        "question": "Why is a company legally different from a firm? Cite one Indian example.",
        "options": [],
        "answer": "A company is registered under the Companies Act (e.g., Companies Act 2013 in India), has a separate legal identity, and its shareholders enjoy limited liability (liability limited to share value). A firm is an unregistered entity (partnership or sole proprietorship) without separate legal status, and owners have unlimited liability. Example: Tata Consultancy Services (TCS) is a company, while a local accounting practice operated by two partners is a firm.",
        "explanation": "Key distinction: registration, legal identity, and liability. A company is created by law; a firm is created by agreement. Limited liability means shareholders lose only their investment if the company fails.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_la_001",
        "type": "long_answer",
        "question": "Explain the distinction between industry and trade with reference to Indian companies. Give two examples.",
        "options": [],
        "answer": "Industry refers to the production of goods and services — it transforms raw materials into finished products. Trade refers to the exchange (buying and selling) of goods — it does not produce anything but facilitates the movement of goods from producers to consumers.\n\nExample 1 — Tata Motors: Its Pune and Sanand plants assembling cars from body panels, engines, and components is industry. When Tata Motors sells these cars through its dealership network to customers, that is trade.\n\nExample 2 — ITC Limited: ITC's food processing units manufacturing biscuits, noodles, and Aashirvaad atta are industry. Distributing these products through 9 million retail outlets across India is trade.\n\nThe key distinction is that industry creates utility by producing goods, while trade creates utility by making goods available where needed. Industry adds form utility; trade adds place and time utility.",
        "explanation": "Students must define both terms, explain the distinction clearly, and provide Indian company examples. Industry = production; Trade = exchange. Both are essential parts of business activity.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    {
        "id": "c9_basic_comp_num_001",
        "type": "numerical",
        "question": "A textile company in Ahmedabad produced finished cloth worth ₹12 lakh in a month. Out of this, 75% was sold directly to garment manufacturers (trade activity) and the rest was stored as inventory. Calculate the value of trade activity and the value of inventory.",
        "options": [],
        "answer": "Trade: ₹9,00,000 | Inventory: ₹3,00,000",
        "explanation": "Total production = ₹12,00,000. Trade (sold) = 75% of 12,00,000 = ₹9,00,000. Inventory = 25% of 12,00,000 = ₹3,00,000. This illustrates how industry produces and trade distributes.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": True
    },
    # -- Standard Questions (Generic/International Context) --
    {
        "id": "c9_basic_std_mcq_001",
        "type": "mcq",
        "question": "Which of the following best defines 'business'?",
        "options": [
            "A) Only the buying and selling of goods",
            "B) Only the production of goods and services",
            "C) All economic activities involving production and exchange of goods and services",
            "D) Only the provision of services like banking"
        ],
        "answer": "C) All economic activities involving production and exchange of goods and services",
        "explanation": "Business is the broadest term encompassing all economic activities. It includes industry (production) and commerce (trade + auxiliaries to trade). Option A describes trade only, B describes industry only, and D describes only one auxiliary to trade.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_mcq_002",
        "type": "mcq",
        "question": "Auxiliaries to trade do NOT include which of the following?",
        "options": [
            "A) Banking",
            "B) Insurance",
            "C) Manufacturing",
            "D) Warehousing"
        ],
        "answer": "C) Manufacturing",
        "explanation": "Auxiliaries to trade are services that facilitate trade (buying and selling). Banking, insurance, transport, warehousing, and advertising are all auxiliaries. Manufacturing is industry — it produces goods, it does not facilitate the exchange of goods.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_mcq_003",
        "type": "mcq",
        "question": "Which term refers to the actual buying and selling of goods?",
        "options": [
            "A) Industry",
            "B) Commerce",
            "C) Trade",
            "D) Organisation"
        ],
        "answer": "C) Trade",
        "explanation": "Trade is the exchange of goods and services — it involves buying and selling. Industry produces goods. Commerce includes trade plus auxiliaries to trade. Organisation is a structured group working towards common goals.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_mcq_004",
        "type": "mcq",
        "question": "An organisation is best described as:",
        "options": [
            "A) A single individual doing business",
            "B) A structured group of people working together towards common goals",
            "C) Only a manufacturing unit",
            "D) A bank providing loans"
        ],
        "answer": "B) A structured group of people working together towards common goals",
        "explanation": "An organisation is a structured arrangement of people working together to achieve common objectives. It can be a business, a non-profit, or any formal group. A sole proprietor is not typically called an organisation — the term implies a structured collective.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_fb_001",
        "type": "fill_blank",
        "question": "_____ refers to the production of goods and services.",
        "options": [],
        "answer": "industry",
        "explanation": "Industry is the activity of producing goods and services. It transforms raw materials and inputs into finished products that satisfy human wants. Manufacturing, construction, and mining are all examples of industry.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_fb_002",
        "type": "fill_blank",
        "question": "The buying and selling of goods is called _____.",
        "options": [],
        "answer": "trade",
        "explanation": "Trade is the exchange of goods and services between buyers and sellers. It creates place and time utility by making goods available where and when they are needed. Trade can be internal (domestic) or external (international).",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_sa_001",
        "type": "short_answer",
        "question": "Define commerce and list any two auxiliaries to trade.",
        "options": [],
        "answer": "Commerce includes trade (buying and selling of goods) and all auxiliaries to trade (services that facilitate trade). Two auxiliaries to trade are: (1) Banking — provides finance for trade transactions, and (2) Insurance — protects goods against risks during transit and storage. Other auxiliaries include transport, warehousing, and advertising.",
        "explanation": "Commerce = Trade + Auxiliaries to Trade. Students must mention both components and name at least two auxiliaries with brief descriptions.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_sa_002",
        "type": "short_answer",
        "question": "Why does a company enjoy limited liability?",
        "options": [],
        "answer": "A company enjoys limited liability because it is a separate legal entity distinct from its shareholders. The liability of shareholders is limited only to the value of the shares they have purchased. If the company incurs debts or losses, shareholders cannot be forced to pay from their personal assets beyond their share capital.",
        "explanation": "Limited liability is a key advantage of registering as a company. The company itself is liable for its debts, not the individual shareholders. This encourages investment and entrepreneurship.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_la_001",
        "type": "long_answer",
        "question": "Explain the relationship between business, industry, and commerce with the help of a suitable example.",
        "options": [],
        "answer": "Business is the comprehensive term that encompasses all activities aimed at earning profit. It consists of two major components: (1) Industry — the production of goods and services, and (2) Commerce — trade (buying and selling) plus auxiliaries to trade (banking, insurance, transport, warehousing).\n\nFor example, consider Samsung Electronics. Its manufacturing plants producing smartphones and semiconductors represent industry. When Samsung sells these products through retail stores, online platforms, and distributors, that is trade. Samsung's logistics partners delivering products, banks financing dealers, and insurance companies covering goods in transit are all auxiliaries to trade. The complete activity of producing and distributing Samsung products is business, which includes both industry and commerce.",
        "explanation": "Students should show that Business = Industry + Commerce, and Commerce = Trade + Auxiliaries. They must use a clear example showing how all three concepts interconnect.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    {
        "id": "c9_basic_std_num_001",
        "type": "numerical",
        "question": "A company had total revenue of ₹50 lakh in a year. 60% came from industrial (production) activities and the rest from trade activities. Calculate the revenue from industry and from trade.",
        "options": [],
        "answer": "Industry revenue: ₹30,00,000 | Trade revenue: ₹20,00,000",
        "explanation": "Industry revenue = 60% of 50,00,000 = ₹30,00,000. Trade revenue = 40% of 50,00,000 = ₹20,00,000. This shows how a business combines both industry and commerce activities.",
        "difficulty": "Easy",
        "topic": "c9_commapp_001",
        "competency": False
    },
    # ==================== NODE c9_commapp_009: DEPARTMENTS ====================
    # -- Competency Questions (Indian Context) --
    {
        "id": "c9_dept_comp_mcq_001",
        "type": "mcq",
        "question": "Maruti Suzuki's Purchase department sources steel sheets from JSW Steel and stores them in the Manesar warehouse. Which department is responsible for issuing these steel sheets to the assembly line when needed?",
        "options": [
            "A) Marketing",
            "B) Sales",
            "C) Stores (under Purchase & Stores)",
            "D) Finance"
        ],
        "answer": "C) Stores (under Purchase & Stores)",
        "explanation": "The Stores function, which operates under the Purchase & Stores department, is responsible for storing raw materials and issuing them to the Production department as needed. Maruti Suzuki's Manesar warehouse stores steel sheets and issues them on a material requisition slip to the assembly line.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_mcq_002",
        "type": "mcq",
        "question": "Tata Motors' Pune plant assembles the Nexon from stamped body panels, engines, and components. This activity is performed by which department?",
        "options": [
            "A) Marketing",
            "B) Sales",
            "C) Purchase",
            "D) Production"
        ],
        "answer": "D) Production",
        "explanation": "The Production department is responsible for converting raw materials and components into finished goods. Tata Motors' Pune plant assembling the Nexon from various components is a classic production activity — transforming inputs into a finished car.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_mcq_003",
        "type": "mcq",
        "question": "Hindustan Unilever Limited (HUL) launches the 'Dove Real Beauty' advertising campaign to build brand awareness. This activity falls under which department?",
        "options": [
            "A) Sales",
            "B) Marketing",
            "C) Production",
            "D) Purchase & Stores"
        ],
        "answer": "B) Marketing",
        "explanation": "Marketing creates awareness, builds brand image, conducts market research, and generates demand through advertising and branding. HUL's Dove Real Beauty campaign is a marketing activity designed to create brand recall and demand. Sales, on the other hand, converts that demand into actual transactions.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_mcq_004",
        "type": "mcq",
        "question": "HUL's Sales team distributes Dove soap through 9 million retail outlets across India and handles dealer dispatch and invoicing. The primary KPI for this team is:",
        "options": [
            "A) Brand recall",
            "B) Advertising reach",
            "C) Revenue generated",
            "D) Market research reports"
        ],
        "answer": "C) Revenue generated",
        "explanation": "The Sales team converts demand into actual transactions. Their primary KPI is revenue generated (actual sales). Brand recall and advertising reach are marketing KPIs. Market research is also a marketing function. Sales focuses on closing deals and generating revenue.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_fb_001",
        "type": "fill_blank",
        "question": "Asian Paints' Stores issues raw pigments to Production on a _____.",
        "options": [],
        "answer": "material requisition slip",
        "explanation": "A material requisition slip is a document used by the Stores department to issue raw materials to the Production department. It records what materials are being issued, in what quantity, and for which production order. This ensures proper inventory control.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_fb_002",
        "type": "fill_blank",
        "question": "The _____ department is responsible for converting raw materials into finished goods.",
        "options": [],
        "answer": "production",
        "explanation": "The Production department transforms raw materials and components into finished products through various processes like assembly, manufacturing, or processing. It is at the heart of any manufacturing business.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_sa_001",
        "type": "short_answer",
        "question": "Describe the workflow of the Purchase and Stores department from indent to goods receipt, using an Indian company example.",
        "options": [],
        "answer": "The Purchase and Stores workflow begins when the Production department raises an INDENT (requisition) for raw materials. The Purchase department then issues a Purchase Order (PO) to the approved supplier. When goods arrive, the Stores department verifies the delivery against the PO and prepares a Goods Receipt Note (GRN). Finally, stores issue materials to Production on a Material Requisition Slip. Example: Maruti Suzuki's Manesar plant follows this workflow when sourcing steel sheets from JSW Steel.",
        "explanation": "Students must trace the complete workflow: Indent → Purchase Order → Goods Receipt Note → Material Requisition Slip. Indian company examples add context.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_sa_002",
        "type": "short_answer",
        "question": "How does Marketing differ from Sales in terms of their KPIs? Use HUL as an example.",
        "options": [],
        "answer": "Marketing and Sales have distinct KPIs. Marketing's KPIs include brand recall, advertising reach, market share, and customer engagement. For example, HUL's marketing team tracks brand recall for Dove through surveys. Sales KPIs focus on revenue generated, number of orders closed, and dealer dispatch volumes. HUL's sales team is measured by how many Dove bars are sold through 9 million retail outlets. Marketing creates demand; Sales fulfills it.",
        "explanation": "Students must clearly separate marketing KPIs (awareness, brand recall) from sales KPIs (revenue, orders). HUL example illustrates both functions.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_la_001",
        "type": "long_answer",
        "question": "Describe the four core operating departments of a manufacturing company and explain their inter-dependence using Indian industry examples.",
        "options": [],
        "answer": "The four core operating departments in a manufacturing company are:\n\n1. Purchase & Stores: Sources raw materials from suppliers and stores them safely. Example: Maruti Suzuki's Purchase team sources steel from JSW Steel, and the Stores team manages the Manesar warehouse.\n\n2. Production: Converts raw materials into finished goods using labour, machines, and processes. Example: Tata Motors' Pune plant assembles the Nexon from stamped panels, engines, and electronics.\n\n3. Marketing: Creates awareness, builds brand, conducts market research, and generates demand. Example: HUL's marketing team launches campaigns for Surf Excel and Dove.\n\n4. Sales: Converts demand into actual transactions through order booking, invoicing, and dealer dispatch. Example: HUL's sales team distributes products through 9 million retail outlets.\n\nThese departments are interdependent: Purchase & Stores supplies raw materials to Production; Production creates finished goods for Sales; Sales provides market feedback to Marketing; Marketing generates leads for Sales. Without any one department, the entire business chain breaks.",
        "explanation": "Students must describe all four departments, their roles, Indian examples, and clearly explain how they depend on each other. The inter-dependence is the key concept.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    {
        "id": "c9_dept_comp_num_001",
        "type": "numerical",
        "question": "A manufacturing company received 2,000 kg of raw material. After production, 1,700 kg of finished goods were produced. Calculate the production efficiency as a percentage. Use pint for unit conversion.",
        "options": [],
        "answer": "85%",
        "explanation": "Production efficiency = (Finished goods / Raw material) × 100 = (1700/2000) × 100 = 85%. Using pint: 2000 kg = 2.0 metric tonnes input, 1700 kg = 1.7 metric tonnes output. Efficiency = (1.7/2.0) × 100 = 85%.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": True
    },
    # -- Standard Questions --
    {
        "id": "c9_dept_std_mcq_001",
        "type": "mcq",
        "question": "Which document is prepared when goods are received by the Stores department?",
        "options": [
            "A) Indent",
            "B) Purchase Order",
            "C) Goods Receipt Note",
            "D) Invoice"
        ],
        "answer": "C) Goods Receipt Note",
        "explanation": "The Goods Receipt Note (GRN) is prepared by the Stores department when goods are received. It confirms delivery against the Purchase Order. The Indent is raised by Production, the Purchase Order is issued by Purchase, and the Invoice is sent by the supplier.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": False
    },
    {
        "id": "c9_dept_std_mcq_002",
        "type": "mcq",
        "question": "Which department is primarily responsible for market research and advertising?",
        "options": [
            "A) Production",
            "B) Sales",
            "C) Marketing",
            "D) Finance"
        ],
        "answer": "C) Marketing",
        "explanation": "Marketing is responsible for market research (understanding customer needs), advertising, branding, and creating demand. Sales focuses on converting demand into orders. Production makes goods. Finance manages money.",
        "difficulty": "Easy",
        "topic": "c9_commapp_009",
        "competency": False
    },
    {
        "id": "c9_dept_std_mcq_003",
        "type": "mcq",
        "question": "What is the first step in the Purchase and Stores workflow?",
        "options": [
            "A) Goods Receipt Note",
            "B) Material Requisition Slip",
            "C) Indent",
            "D) Purchase Order"
        ],
        "answer": "C) Indent",
        "explanation": "The Purchase and Stores workflow starts with an Indent — a requisition raised by the Production department requesting raw materials. The Purchase department then issues a Purchase Order, followed by Goods Receipt Note from Stores on delivery."
    }
]


def solve_question(question: Dict, user_input: Optional[str] = None) -> Dict:
    """Solve a question from the bank."""
    qid = question.get('id', '')
    for q in QUESTION_BANK:
        if q['id'] == qid:
            return {
                "answer": q.get('answer'),
                "steps": [q.get('explanation', '')],
                "verification": True,
            }
    return {"answer": None, "steps": ["Question not found"], "verification": False}


def get_coverage_summary() -> Dict:
    return {
        "syllabus": "ICSE Class 9 Commercial Applications",
        "total_questions": len(QUESTION_BANK),
        "topics": ["Basic Terms", "Purchase & Stores", "Sales & Accounting", "GST"],
    }