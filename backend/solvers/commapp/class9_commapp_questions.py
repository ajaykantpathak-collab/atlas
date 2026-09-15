"""
CISCE Class 9 Commercial Applications — Question Generator
Deterministic, seeded, covers all three syllabus nodes.
"""

import random
import math
import json
import hashlib
from fractions import Fraction
from typing import Any

# ---------------------------------------------------------------------------
# Deterministic seed helper
# ---------------------------------------------------------------------------

def _make_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    rng.seed(seed)
    return rng


# ---------------------------------------------------------------------------
# Indian company / context data (static, syllabus-aligned)
# ---------------------------------------------------------------------------

INDIAN_COMPANIES = [
    ("Tata Motors Limited",  "Automotive manufacturing (Nexon, Safari)",
     "Production  + Trade", "Tata Group, Pune, Maharashtra",
     "Private limited (Tata Group subsidiary)"),
    ("Tata Steel Limited",  "Steel production and sales",
     "Production  + Trade", "Tata Group, Jamshedpur, Jharkhand",
     "Public limited (BSE/NSE listed)"),
    ("Reliance Industries Limited", "Petrochemicals, retail, telecom (Jio)",
     "Production  + Trade  + Auxiliaries", "Reliance Group, Mumbai, Maharashtra",
     "Public limited (BSE/NSE listed)"),
    ("Hindustan Unilever Limited (HUL)", "FMCG — soaps, detergents, foods",
     "Production  + Trade  + Marketing", "Unilever subsidiary, Mumbai, Maharashtra",
     "Public limited (BSE/NSE listed)"),
    ("Infosys Limited", "IT services and consulting",
     "Trade (service)  + Auxiliaries", "Infosys Group, Bengaluru, Karnataka",
     "Public limited (BSE/NSE listed)"),
    ("ITC Limited", "FMCG, hotels, paperboards, agri-business",
     "Production  + Trade  + Auxiliaries", "ITC Group, Kolkata, West Bengal",
     "Public limited (BSE/NSE listed)"),
    ("State Bank of India (SBI)", "Banking and financial services",
     "Auxiliary to trade (banking)", "Government-owned, Mumbai, Maharashtra",
     "Public sector undertaking (PSU)"),
    ("Maruti Suzuki India Limited", "Automobile manufacturing and sales",
     "Production  + Trade  + Marketing", "Suzuki-Maruti JV, Gurugram, Haryana",
     "Public limited (BSE/NSE listed)"),
    ("Indian Oil Corporation Limited (IOCL)", "Refining, pipelines, retail fuel",
     "Production  + Trade  + Marketing", "Government-owned, New Delhi",
     "Public limited (PSU)"),
    ("Amazon India (Amazon Seller Services Pvt. Ltd.)",
     "E-commerce marketplace, logistics, cloud (AWS)",
     "Auxiliaries to trade (transport, warehousing, insurance)",
     "Amazon Inc. subsidiary, Bengaluru, Karnataka",
     "Private limited company (foreign subsidiary)"),
    ("Swiggy", "Food delivery platform",
     "Auxiliaries to trade (transport, logistics)",
     "Bundl Technologies Pvt. Ltd., Bengaluru, Karnataka",
     "Private limited company"),
    ("Flipkart (Flipkart Internet Pvt. Ltd.)", "E-commerce marketplace",
     "Trade (electronic)  + Auxiliaries (logistics, insurance)",
     "Walmart subsidiary, Bengaluru, Karnataka",
     "Private limited company"),
]

TRADE_TYPES = [
    ("Home Trade / Internal Trade", "Buying and selling within India (e.g., Maruti Suzuki selling cars in Delhi)"),
    ("Foreign Trade / External Trade", "Buying and selling across borders (e.g., Tata Steel exporting steel to Europe)"),
    ("Wholesale Trade", "Buying in large quantities from producers and selling to retailers"),
    ("Retail Trade", "Selling directly to final consumers (e.g., neighbourhood Kirana store)"),
    ("Import Trade", "Buying goods from foreign countries (e.g., India importing crude oil)"),
    ("Export Trade", "Selling goods to foreign countries (e.g., ITC exporting food products)"),
]

AUXILIARIES = [
    ("Banking / Finance",     "Providing credit and managing payments (SBI giving loans to Reliance)"),
    ("Insurance",             "Covering risk of loss in transit (IRDA-regulated companies)"),
    ("Transport / Warehousing","Moving and storing goods (Amazon logistics, Blue Dart couriers)"),
    ("Advertising",           "Creating demand through mass communication (HUL ad campaigns)"),
    ("Communication",         "Enabling coordination between business units (email, intranet, meetings)"),
]

FIRM_VS_COMPANY_DISTINCTIONS = [
    ("Registration",       "A firm is registered under the Partnership Act 1932; a company under the Companies Act 2013"),
    ("Legal Status",       "A firm is not a separate legal entity; a company is a separate legal person (can own property, sue/sued)"),
    ("Liability",          "Partners have unlimited liability; shareholders have limited liability"),
    ("Number of Members",  "Minimum 2, maximum 50 in a firm; minimum 2, maximum unlimited in a public company"),
    ("Management",         "All partners can manage; in a company, directors elected by shareholders manage"),
    ("Transferability",    "A partner cannot transfer interest without consent; company shares are freely transferable (public companies)"),
]

COMMUNICATION_EXAMPLES = [
    ("Tata Group",        "Over 100 companies across 100 countries; 9.35 lakh employees — requires structured memos, reports, intranet"),
    ("Reliance Jamnagar Refinery","25,000+ workers across shifts — daily briefings and digital dashboards"),
    ("Infosys",           "3.17 lakh employees across 50+ global offices — email, video conferencing, intranet portals"),
    ("Wipro",             "2.5 lakh+ employees globally — uses Microsoft Teams, internal knowledge portals"),
    ("Indian Railways",   "14 lakh+ employees — hierarchical communication through circulars and bulletins"),
    ("PMO India",         "Communicates with ministries, states, citizens — press briefings, notifications, social media"),
]

DEPARTMENT_ROLES = {
    "Purchase and Stores": [
        "Receives indent (requisition) from Production department",
        "Sources suppliers, issues Purchase Order (PO)",
        "Receives goods, verifies against PO, issues Goods Receipt Note (GRN)",
        "Stores raw materials in warehouses; issues Material Requisition Slip (MRS) to Production",
    ],
    "Production": [
        "Converts raw materials into finished goods using labour and machines",
        "Plans production schedules based on Sales forecasts",
        "Issues Material Requisition Slip (MRS) to Stores for raw materials",
        "Returns finished goods to Stores/despatch",
    ],
    "Marketing and Sales": [
        "Marketing: research demand, design branding, advertise, set prices (4Ps)",
        "Sales: take orders, negotiate with dealers, invoice, arrange delivery",
        "Together ensure products reach customers profitably",
    ],
}


# ---------------------------------------------------------------------------
# ─── SOLVER FUNCTIONS ────────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def solve_classify_business_activity(params: dict) -> dict:
    """
    Classify a given company's activity as Industry / Trade / Auxiliaries to Trade.

    params = {
        "company_name": str,
        "activity_description": str  (e.g. "manufacturing steel", "giving loans", "transporting goods")
    }
    """
    company = params.get("company_name", "Unknown")
    activity = params.get("activity_description", "").lower().strip()

    category_keywords = {
        "Industry": ["manufacturing", "producing", "mining", "assembling", "cultivating",
                      "refining", "making", "extracting", "processing raw", "farming"],
        "Trade (Internal)": ["selling domestically", "retail", "wholesale", "distributing in india",
                              "selling to indian consumers"],
        "Trade (External/Export)": ["exporting", "selling abroad", "foreign market"],
        "Trade (Import)": ["importing", "buying from abroad", "foreign supplier"],
        "Auxiliary (Banking/Finance)": ["lending", "banking", "loan", "credit", "financing"],
        "Auxiliary (Insurance)": ["insuring", "insurance", "covering risk"],
        "Auxiliary (Transport/Warehousing)": ["transporting", "logistics", "warehousing",
                                               "courier", "shipping goods"],
        "Auxiliary (Advertising)": ["advertising", "promoting", "branding", "marketing campaign"],
    }

    determined = "Trade (general)"
    for cat, keywords in category_keywords.items():
        if any(kw in activity for kw in keywords):
            determined = cat
            break

    reasoning_map = {
        "Industry": f"'{company}' is engaged in {activity}. This is PRODUCTION of goods/services — "
                    f"hence it falls under INDUSTRY (the 'I' in business = Industry + Commerce).",
        "Trade (Internal)": f"'{company}' is engaged in {activity}. This involves EXCHANGE/BUYING-SELLING "
                            f"within India — hence HOME TRADE.",
        "Trade (External/Export)": f"'{company}' exports goods/services. This is EXPORT TRADE "
                                    f"(foreign trade).",
        "Trade (Import)": f"'{company}' imports goods. This is IMPORT TRADE (foreign trade).",
        "Auxiliary (Banking/Finance)": f"'{company}' provides {activity}. Banking/finance removes "
                                        f"financial risk and provides credit — this is an AUXILIARY TO TRADE.",
        "Auxiliary (Insurance)": f"'{company}' covers risk via {activity}. Insurance removes "
                                  f"risk of loss — this is an AUXILIARY TO TRADE.",
        "Auxiliary (Transport/Warehousing)": f"'{company}' handles {activity}. Transport removes "
                                              f"place obstacle and creates place utility — this is an "
                                              f"AUXILIARY TO TRADE.",
        "Auxiliary (Advertising)": f"'{company}' does {activity}. Advertising creates demand and "
                                    f"informs buyers — this is an AUXILIARY TO TRADE.",
        "Trade (general)": f"'{company}' is engaged in {activity}. This involves exchange of goods — "
                            f"hence it falls under TRADE (the 'C' in business = Industry + Commerce; "
                            f"Commerce = Trade + Auxiliaries to Trade).",
    }

    steps = [
        f"Step 1: Read the activity: '{activity}'.",
        "Step 2: Recall the definition:",
        "  Business = Industry (production) + Commerce (Trade + Auxiliaries to Trade).",
        "  Industry = Production of goods/services (creates form utility).",
        "  Trade   = Exchange of goods (buying & selling, removes possession obstacle).",
        "  Auxiliaries to Trade = Supporting services (banking, insurance, transport, advertising, etc.)",
        f"Step 3: Match '{activity}' to categories.",
        f"Step 4: Result: {determined}.",
        reasoning_map.get(determined, reasoning_map["Trade (general)"]),
    ]

    verification = {
        "definition_used": "Business = Industry + Commerce",
        "commerce_formula": "Commerce = Trade + Auxiliaries to Trade",
        "classification": determined,
        "numeric_check": "N/A — conceptual classification",
        "back_substitution": f"If '{company}' does '{activity}', it is classified as '{determined}', "
                             f"which is a subset of {'Commerce' if 'Trade' in determined or 'Auxiliary' in determined else 'Business'}.",
    }

    return {
        "answer": determined,
        "steps": steps,
        "verification": verification,
    }


def solve_distinguish_firm_company(params: dict) -> dict:
    """
    Distinguish between a Firm and a Company.

    params = {
        "entity_a": str,
        "entity_b": str,
    }
    """
    entity_a = params.get("entity_a", "")
    entity_b = params.get("entity_b", "")

    distinctions = [
        ("Registration",  "Partnership Act 1932",         "Companies Act 2013"),
        ("Legal Status",  "No separate legal entity",       "Separate legal person — can sue & be sued in its own name"),
        ("Liability",     "Unlimited (partners liable fully)","Limited (shareholders liable up to face value of shares)"),
        ("Members",        "2–50 partners",                 "Min 2, max unlimited (public company)"),
        ("Management",     "All partners can manage",        "Directors elected by shareholders manage"),
        ("Transferability", "Consent required to transfer share/interest","Shares freely transferable in a public company"),
        ("Perpetual Existence", "Dissolves on death/insolvency of a partner","Continues irrespective of change in shareholders"),
        ("Name Suffix",    "'& Co.', '& Firm'",             "'Ltd.', 'Pvt. Ltd.'"),
    ]

    rows = []
    for feature, firm_val, company_val in distinctions:
        rows.append((feature, firm_val, company_val))

    steps = [
        f"Step 1: Identify the two entities: '{entity_a}' and '{entity_b}'.",
        "Step 2: Recall Partnership vs. Company from Indian legal framework:",
        "  Firms: governed by Partnership Act 1932; Companies: governed by Companies Act 2013.",
        "Step 3: Compare key features:",
    ]
    for feature, fv, cv in rows:
        steps.append(f"  {feature}: Firm = {fv} | Company = {cv}")

    steps.append(f"Step 4: Conclude: '{entity_a}' and '{entity_b}' differ fundamentally in "
                 "legal status, liability, registration, and management.")

    return {
        "answer": rows,
        "steps": steps,
        "verification": {
            "acts_compared": ["Partnership Act 1932", "Companies Act 2013"],
            "key_difference": "Legal status and liability — firm has no separate legal entity and "
                              "unlimited liability; company is a separate legal person with limited liability.",
            "numeric_check": "Firm: max 50 partners (Partnership Act 1932, Section 11). "
                             "Company: min 2 shareholders (Companies Act 2013, Section 3).",
            "back_substitution": "Check: unlimited liability in firms → personal assets at risk. "
                                 "Limited liability in companies → risk capped at investment.",
        },
    }


def solve_verify_trade_chain(params: dict) -> dict:
    """
    Given a trade chain (producer → wholesaler → retailer → consumer),
    identify each entity's trade type and compute number of trade links.

    params = {
        "chain": list[str]   # names/roles in order, e.g. ["Farmer", "Wholesaler", "Retailer", "Consumer"]
    }
    """
    chain = params.get("chain", [])
    n = len(chain)
    trade_links = n - 1

    steps = [
        f"Step 1: Given trade chain ({n} entities): {' → '.join(chain)}",
        "Step 2: A 'trade link' is a transfer of goods from one entity to the next.",
        f"Step 3: Number of trade links = number of entities - 1 = {n} - 1 = {trade_links}.",
        "Step 4: Identify types:",
    ]

    classifications = []
    for i, entity in enumerate(chain):
        if i == 0:
            ctype = "Producer (Industry)"
        elif i == n - 1:
            ctype = "Consumer (End-user)"
        else:
            ctype = "Intermediary (Trade)"
        classifications.append((entity, ctype))
        steps.append(f"  {entity}: {ctype}")

    steps.append(f"Verification: {trade_links} trade transactions occur in this chain.")
    steps.append("The chain demonstrates Home Trade (all transactions within India) if all "
                 "entities are domestic.")

    return {
        "answer": {"classifications": classifications, "trade_links": trade_links},
        "steps": steps,
        "verification": {
            "formula": "Trade links = n - 1",
            "computed_links": trade_links,
            "chain_length": n,
            "back_substitution": f"With {n} entities, the maximum trade links are {n-1}. "
                                 f"Computed: {trade_links} ✓",
        },
    }


def solve_department_workflow(params: dict) -> dict:
    """
    Map the workflow steps across Purchase & Stores, Production, and Marketing/Sales departments.

    params = {
        "company": str,
        "steps": list[str]   # shuffled workflow steps to be ordered
    }
    """
    company = params.get("company", "the company")
    steps_input = params.get("steps", [])

    correct_order = [
        "Marketing: Market research identifies customer demand",
        "Marketing: Sets price and promotional strategy",
        "Sales: Receives customer order / indent",
        "Sales: Passes indent to Purchase & Stores department",
        "Purchase: Sources suppliers, issues Purchase Order (PO)",
        "Stores: Receives goods, verifies against PO, issues Goods Receipt Note (GRN)",
        "Stores: Stores raw materials in warehouse",
        "Production: Issues Material Requisition Slip (MRS) to Stores",
        "Stores: Issues raw materials to Production",
        "Production: Converts raw materials → finished goods",
        "Production: Returns finished goods to Stores/despatch",
        "Marketing & Sales: Distributes finished goods to customers/retail outlets",
    ]

    ordered_steps = []
    for i, step in enumerate(correct_order[:len(steps_input)]):
        ordered_steps.append((i + 1, step))

    explanation_steps = [
        f"Workflow for '{company}':",
        "",
        "The three core departments work in sequence:",
        "",
        "1. MARKETING & SALES (Start):",
        "   • Marketing team researches demand, sets price, plans promotion.",
        "   • Sales team receives customer indent/order.",
        "",
        "2. PURCHASE & STORES (Supply chain):",
        "   • Purchase finds suppliers, issues Purchase Order (PO).",
        "   • Stores receives goods, issues Goods Receipt Note (GRN).",
        "   • Stores keeps inventory, issues Material Requisition Slip (MRS) to Production.",
        "",
        "3. PRODUCTION (Manufacturing):",
        "   • Requests raw materials via MRS.",
        "   • Converts raw materials → finished goods using labour & machines.",
        "   • Returns finished goods to despatch/Stores.",
        "",
        "4. MARKETING & SALES (Delivery):",
        "   • Distributes finished goods through distribution channels.",
        "",
        "Inter-dependence: No department works in isolation — Marketing feeds Sales which "
        "triggers Purchase, which feeds Production, which enables Sales delivery.",
    ]

    return {
        "answer": ordered_steps,
        "steps": explanation_steps,
        "verification": {
            "departments_involved": ["Marketing", "Sales", "Purchase & Stores", "Production"],
            "key_documents": ["Indent", "Purchase Order (PO)", "Goods Receipt Note (GRN)",
                               "Material Requisition Slip (MRS)"],
            "back_substitution": "Trace: Customer demand → Marketing → Sales indent → "
                                 "Purchase → Stores → Production MRS → Finished goods → Customer ✓",
            "numeric_check": f"Workflow has {len(correct_order)} distinct steps covering all 3 departments.",
        },
    }


def solve_communication_analysis(params: dict) -> dict:
    """
    Analyse how communication needs change as an organisation grows.

    params = {
        "org_name": str,
        "employees": int,
        "locations": int,
        "communication_volume_change_pct": float  (e.g. 40.0 for 40% increase)
    }
    """
    org_name = params.get("org_name", "the organisation")
    employees = params.get("employees", 1000)
    locations = params.get("locations", 1)
    vol_change = params.get("communication_volume_change_pct", 0.0)

    # Estimate communication channels: n(n-1)/2
    channels = employees * (employees - 1) // 2

    steps = [
        f"Analysing communication needs for '{org_name}'.",
        f"  Employees      : {employees:,}",
        f"  Locations      : {locations}",
        f"  Volume change  : {vol_change:.1f}% increase",
        "",
        "Step 1: Communication channels formula (Graicunas):",
        f"  Direct relationships  = {employees}",
        f"  Total possible channels ≈ n(n-1)/2 = {employees}×{employees-1}/2 = {channels:,}",
        "",
        "Step 2: Factors increasing communication need:",
        "  (a) Larger workforce → more people to coordinate",
        "  (b) Multiple locations → cross-site coordination required",
        "  (c) Faster decision-making → real-time communication channels",
        "  (d) Global operations → cross-time-zone communication",
        "",
        "Step 3: As organisation grows from a small firm to large company:",
        "  • Informal (face-to-face) → Formal (memos, reports, emails)",
        "  • Verbal → Written/Digital",
        "  • Single channel → Multiple structured channels",
        "",
        f"Step 4: A {vol_change:.1f}% increase in communication volume means digital tools "
        "(intranet, video conferencing, collaboration platforms) become essential.",
        "",
        "Step 5: Poor communication consequences:",
        "  • Delays in decision-making",
        "  • Misunderstandings → production errors",
        "  • Lower employee morale",
        "  • Customer dissatisfaction",
    ]

    return {
        "answer": {
            "estimated_channels": channels,
            "key_factors": [
                "Workforce size", "Geographic spread", "Speed of decision-making",
                "Technology adoption", "Stakeholder diversity"
            ],
            "communication_types": ["Formal (memos, reports)", "Informal (team meetings)",
                                    "Digital (email, intranet, video)", "External (customers, regulators)"],
        },
        "steps": steps,
        "verification": {
            "channel_formula": "n(n-1)/2",
            "computed_channels": channels,
            "back_substitution": f"With {employees} employees, channels = "
                                 f"{employees}×{employees-1}/2 = {channels:,}. "
                                 f"Each additional employee adds {employees-1} new relationships.",
            "volume_increase_pct": vol_change,
        },
    }


def solve_numerical_communication(params: dict) -> dict:
    """
    Numerical: compute communication channels and efficiency metrics.

    params = {
        "employees": int,
        "avg_message_length_chars": int,
        "messages_per_employee_per_day": int,
        "digital_adoption_rate_pct": float,
    }
    """
    employees = params.get("employees", 1000)
    avg_len = params.get("avg_message_length_chars", 200)
    msg_per_day = params.get("messages_per_employee_per_day", 20)
    adoption = params.get("digital_adoption_rate_pct", 80.0) / 100.0

    total_channels = employees * (employees - 1) // 2
    total_messages_per_day = employees * msg_per_day
    total_chars_per_day = total_messages_per_day * avg_len
    digital_messages = int(total_messages_per_day * adoption)
    paper_messages = total_messages_per_day - digital_messages

    # Cost estimate: digital ~₹0.01 per message, paper ~₹5 per message
    digital_cost = digital_messages * 0.01
    paper_cost = paper_messages * 5.0
    total_cost = digital_cost + paper_cost
    cost_saved_by_digital = paper_messages * 5.0  # if all were paper

    steps = [
        f"Communication analysis for {employees:,} employees:",
        "",
        f"Step 1: Communication channels (Graicunas):",
        f"  Total channels = n(n-1)/2 = {employees}×{employees-1}/2 = {total_channels:,}",
        "",
        f"Step 2: Daily message volume:",
        f"  Messages/day = {employees} employees × {msg_per_day} msgs/emp/day = {total_messages_per_day:,}",
        f"  Characters/day = {total_messages_per_day:,} × {avg_len} = {total_chars_per_day:,}",
        "",
        f"Step 3: Digital adoption ({adoption*100:.0f}%):",
        f"  Digital messages  = {total_messages_per_day:,} × {adoption*100:.0f}% = {digital_messages:,}",
        f"  Paper messages    = {total_messages_per_day:,} - {digital_messages:,} = {paper_messages:,}",
        "",
        "Step 4: Cost comparison (Digital: ₹0.01/msg, Paper: ₹5/msg):",
        f"  Digital cost/day  = {digital_messages:,} × ₹0.01 = ₹{digital_cost:,.2f}",
        f"  Paper cost/day    = {paper_messages:,} × ₹5.00 = ₹{paper_cost:,.2f}",
        f"  Total cost/day    = ₹{total_cost:,.2f}",
        f"  Cost saved/day    = ₹{cost_saved_by_digital:,.2f} (vs. 100% paper)",
        "",
        "Step 5: Interpretation:",
        f"  • Digital adoption saves ₹{cost_saved_by_digital:,.2f}/day for this organisation.",
        "  • Higher digital adoption reduces communication cost dramatically.",
        "  • Speed of digital communication is near-instant vs. paper delays.",
    ]

    return {
        "answer": {
            "total_channels": total_channels,
            "messages_per_day": total_messages_per_day,
            "chars_per_day": total_chars_per_day,
            "digital_messages": digital_messages,
            "paper_messages": paper_messages,
            "digital_cost_per_day": round(digital_cost, 2),
            "paper_cost_per_day": round(paper_cost, 2),
            "total_cost_per_day": round(total_cost, 2),
            "cost_saved_per_day": round(cost_saved_by_digital, 2),
        },
        "steps": steps,
        "verification": {
            "formulas": [
                "Channels = n(n-1)/2",
                "Total messages = employees × msgs_per_emp",
                "Digital messages = total × adoption_rate",
                "Paper messages = total - digital",
            ],
            "back_substitution": (
                f"digital({digital_messages:,}) + paper({paper_messages:,}) = "
                f"{digital_messages + paper_messages:,} = total({total_messages_per_day:,}) ✓"
            ),
            "cost_check": f"₹{digital_cost:.2f} + ₹{paper_cost:.2f} = ₹{total_cost:.2f} ✓",
        },
    }


def solve_trade_chain_optimisation(params: dict) -> dict:
    """
    Optimise a supply chain: minimise number of intermediaries while ensuring coverage.

    params = {
        "producers": int,
        "consumers": int,
        "max_intermediaries": int,
        "coverage_per_intermediary": int,  # consumers one intermediary can reach
    }
    """
    producers = params.get("producers", 1)
    consumers = params.get("consumers", 1000)
    max_inter = params.get("max_intermediaries", 10)
    coverage = params.get("coverage_per_intermediary", 150)

    min_inter_needed = math.ceil(consumers / coverage)
    optimal_inter = min(min_inter_needed, max_inter)
    total_entities = producers + optimal_inter + consumers
    trade_links = total_entities - 1

    actual_coverage = math.ceil(consumers / optimal_inter) if optimal_inter > 0 else consumers

    steps = [
        f"Supply chain optimisation for {producers} producer(s) and {consumers:,} consumers:",
        "",
        f"Step 1: Calculate minimum intermediaries needed:",
        f"  min_inter = ⌈consumers / coverage_per_intermediary⌉ = ⌈{consumers} / {coverage}⌉ = {min_inter_needed}",
        "",
        f"Step 2: Compare with maximum allowed ({max_inter}):",
        f"  optimal_intermediaries = min({min_inter_needed}, {max_inter}) = {optimal_inter}",
        "",
        f"Step 3: Actual coverage per intermediary at optimal level:",
        f"  coverage = ⌈{consumers} / {optimal_inter}⌉ = {actual_coverage} consumers/intermediary",
        "",
        f"Step 4: Total entities in chain: {producers} + {optimal_inter} + {consumers:,} = {total_entities:,}",
        f"Step 5: Total trade links = {total_entities} - 1 = {trade_links}",
        "",
        "Step 6: Trade type classification:",
        f"  Producer → Intermediary: Wholesale Trade ({optimal_inter} links)",
        f"  Intermediary → Consumer: Retail Trade ({optimal_inter} links)",
        "",
        "Step 7: Efficiency check:",
        f"  Each intermediary serves {actual_coverage} consumers "
        f"({'efficient' if actual_coverage <= coverage else 'overloaded'}).",
    ]

    return {
        "answer": {
            "min_intermediaries_needed": min_inter_needed,
            "optimal_intermediaries": optimal_inter,
            "actual_coverage_per_intermediary": actual_coverage,
            "total_entities": total_entities,
            "total_trade_links": trade_links,
        },
        "steps": steps,
        "verification": {
            "formulas": [
                "min_inter = ⌈consumers / coverage_per_intermediary⌉",
                "optimal_inter = min(min_inter, max_inter)",
                "total_entities = producers + optimal_inter + consumers",
                "trade_links = total_entities - 1",
            ],
            "coverage_check": (
                f"{optimal_inter} intermediaries × {actual_coverage} consumers each = "
                f"{optimal_inter * actual_coverage:,} ≥ {consumers:,} ✓"
            ),
            "back_substitution": (
                f"Links: producer→{optimal_inter} inter→{consumers:,} consumers = "
                f"1 + {optimal_inter} + {optimal_inter} = {trade_links} ✓"
            ),
        },
    }


# ---------------------------------------------------------------------------
# ─── QUESTION GENERATION ─────────────────────────────────────────────────
# ---------------------------------------------------------------------------

def _distribute_types(total: int) -> dict:
    """Distribute question counts across types."""
    mcq      = max(1, round(total * 0.30))
    fill_blank = max(1, round(total * 0.15))
    short_ans  = max(1, round(total * 0.20))
    long_ans   = max(1, total - mcq - fill_blank - short_ans)
    # ensure non-negative
    long_ans = max(0, long_ans)
    total_check = mcq + fill_blank + short_ans + long_ans
    # adjust
    while total_check < total and long_ans < total:
        long_ans += 1
        total_check += 1
    return {
        "MCQ": mcq, "fill_blank": fill_blank,
        "short_answer": short_ans, "long_answer": long_ans,
    }


def generate_questions(seed: int, count: int = 30) -> list:
    """
    Generate `count` deterministic questions covering all 3 syllabus nodes.
    Returns list of question dicts.
    """
    rng = _make_rng(seed)
    questions: list = []
    qid_counter = 0

    types = _distribute_types(count)
    per_node = math.ceil(count / 3)

    # ─── Node 1: Basic Terms ─────────────────────────────────────────────
    node1_qs = _gen_node1_basic_terms(rng, per_node, types, qid_counter)
    questions.extend(node1_qs)
    qid_counter += len(node1_qs)

    # ─── Node 2: Departments ─────────────────────────────────────────────
    node2_qs = _gen_node2_departments(rng, per_node, types, qid_counter)
    questions.extend(node2_qs)
    qid_counter += len(node2_qs)

    # ─── Node 3: Communication ────────────────────────────────────────────
    node3_qs = _gen_node3_communication(rng, per_node, types, qid_counter)
    questions.extend(node3_qs)
    qid_counter += len(node3_qs)

    # Trim or pad to exact count
    return questions[:count]


# ─── Node 1 helpers ────────────────────────────────────────────────────────

def _pick_company(rng: random.Random) -> tuple:
    idx = rng.randint(0, len(INDIAN_COMPANIES) - 1)
    return INDIAN_COMPANIES[idx]


def _gen_node1_basic_terms(rng, count: int, types: dict, qid_start: int) -> list:
    qs = []
    competency_count = count // 2
    standard_count   = count - competency_count

    term_definitions = {
        "Commerce": "Commerce refers to all those activities which help in the removal of "
                     "obstacles in the exchange of goods and services. It includes trade and "
                     "auxiliaries to trade (transport, banking, insurance, warehousing, advertising).",
        "Business": "Business is a human activity directed towards producing or acquiring wealth "
                     "through buying and selling of goods. It includes Industry (production) and "
                     "Commerce (trade + auxiliaries to trade).",
        "Industry": "Industry is concerned with the production of goods and services. It creates "
                     "form utility. It is divided into primary (agriculture, mining), secondary "
                     "(manufacturing), and tertiary (services) industries.",
        "Trade":    "Trade is the buying and selling of goods and services. It removes the "
                     "obstacle of possession. Trade is of two types: Home Trade (internal) and "
                     "Foreign Trade (external, i.e., import and export).",
        "Auxiliaries to Trade": "Activities that support trade by removing various obstacles. "
                                  "They include: Banking (removes financial risk), Insurance "
                                  "(removes risk of loss), Transport (removes place obstacle), "
                                  "Warehousing (creates time utility), Advertising (creates demand).",
        "Organisation": "An organisation is a group of people working together to achieve common "
                         "goals. It provides structure, coordination, and direction for business activities.",
        "Firm":     "A firm is a business enterprise usually formed under the Partnership Act 1932. "
                     "It has 2–50 partners who share profits and losses. Partners have unlimited "
                     "liability. It is NOT a separate legal entity.",
        "Company":  "A company is an association of persons formed under the Companies Act 2013. "
                     "It is a separate legal entity with limited liability. Shares are transferable. "
                     "It has a board of directors. It continues despite changes in membership.",
    }

    terms_list = list(term_definitions.keys())

    # ── Competency questions (Indian context) ──────────────────────────
    for i in range(competency_count):
        qtype = rng.choice(["MCQ", "fill_blank", "short_answer"])
        company_name, company_activity, company_sector, company_hq, company_status = _pick_company(rng)

        if qtype == "MCQ":
            correct_term = rng.choice(terms_list)
            wrong_terms  = [t for t in terms_list if t != correct_term]
            rng.shuffle(wrong_terms)
            options = [correct_term] + wrong_terms[:3]
            rng.shuffle(options)

            correct_idx = options.index(correct_term)
            option_labels = ["(A)", "(B)", "(C)", "(D)"]

            question = (
                f"[Competency — Indian Context] '{company_name}', headquartered at "
                f"{company_hq}, is {company_status.lower()}. Its primary business activities "
                f"include: {company_activity}. The company operates as part of its broader group "
                "structure with shareholders having limited liability.\n\n"
                f"Which of the following terms BEST describes the legal structure of "
                f"'{company_name}' as described above?"
            )
            explanation = (
                f"A '{company_name}' is registered under the Companies Act 2013 "
                f"(Companies Act, 2013 — the current Indian legislation for corporate "
                f"entities), has a board of directors, shareholders with limited liability, "
                f"and is a separate legal person. These are the defining features of a COMPANY.\n\n"
                f"Key distinction:\n"
                f"• Company: Separate legal entity, limited liability, governed by Companies Act 2013.\n"
                f"• Firm: No separate legal entity, unlimited liability, governed by Partnership Act 1932.\n\n"
                f"Other options:\n"
                f"• Industry = production activity (what the company DOES).\n"
                f"• Trade = buying/selling (an ACTIVITY, not a legal form).\n"
                f"• Organisation = broader concept (includes companies, firms, NGOs, etc.)."
            )
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "MCQ",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": question,
                "options": [f"{lbl} {opt}" for lbl, opt in zip(option_labels, options)],
                "answer": f"{option_labels[correct_idx]} {correct_term}",
                "explanation": explanation,
                "solver": "solve_classify_business_activity",
                "solver_params": {"company_name": company_name, "activity_description": company_activity},
            })

        elif qtype == "fill_blank":
            correct_term = rng.choice(terms_list)
            wrong_term   = rng.choice([t for t in terms_list if t != correct_term])

            question = (
                f"[Competency — Indian Context] '{company_name}' is engaged in the activity "
                f"of {company_activity.lower()} at its {company_hq} facilities. The activity of "
                f"PRODUCING goods involves transforming raw materials into finished products. "
                f"This activity creates ________ utility and is part of Industry.\n\n"
                f"(A) Place    (B) Possession    (C) Form    (D) Time"
            )
            explanation = (
                f"Industry involves the production/manufacturing of goods. When Tata Motors "
                f"assembles the Nexon from stamped body panels, it creates FORM UTILITY — "
                f"the utility of having a usable car instead of raw steel sheets.\n\n"
                f"Types of utilities in commerce:\n"
                f"• Form Utility — created by Industry/Production (transforming inputs → outputs).\n"
                f"• Place Utility — created by Transport (moving goods where needed).\n"
                f"• Time Utility — created by Warehousing (storing goods for future use).\n"
                f"• Possession Utility — created by Trade (transferring ownership)."
            )
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "fill_blank",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": question,
                "options": ["(A) Place", "(B) Possession", "(C) Form", "(D) Time"],
                "answer": "(C) Form",
                "explanation": explanation,
                "solver": "solve_classify_business_activity",
                "solver_params": {"company_name": company_name, "activity_description": company_activity},
            })

        else:  # short_answer
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "short_answer",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": (
                    f"[Competency — Indian Context] '{company_name}' ({company_hq}) is "
                    f"{company_status.lower()} with the primary activity of {company_activity.lower()}.\n\n"
                    "Q1: Is '{company_name}' an industry or engaged in trade? Explain in one sentence.\n"
                    "Q2: State ONE key difference between a Firm and a Company under Indian law."
                ),
                "options": None,
                "answer": (
                    f"Q1: Industry — '{company_name}' produces/manufactures goods ({company_activity}), "
                    f"which creates form utility. This is INDUSTRY.\n"
                    "Q2: A Firm is not a separate legal entity and partners have unlimited liability; "
                    "a Company is a separate legal person and shareholders have limited liability "
                    "(governed by Companies Act 2013 vs. Partnership Act 1932)."
                ),
                "explanation": (
                    "Industry produces goods/services; Trade exchanges them. The Companies Act 2013 "
                    "defines a company as a separate legal entity, while the Partnership Act 1932 "
                    "defines a firm as an association of partners with unlimited liability."
                ),
                "solver": "solve_distinguish_firm_company",
                "solver_params": {"entity_a": "Firm (Partnership)", "entity_b": "Company"},
            })

    # ── Standard questions ─────────────────────────────────────────────
    for i in range(standard_count):
        qtype = rng.choice(["MCQ", "fill_blank", "short_answer"])

        if qtype == "MCQ":
            term = rng.choice(terms_list)
            definition = term_definitions[term]
            wrong_terms = [t for t in terms_list if t != term]
            rng.shuffle(wrong_terms)
            options = [term] + wrong_terms[:3]
            rng.shuffle(options)
            correct_idx = options.index(term)
            option_labels = ["(A)", "(B)", "(C)", "(D)"]

            question = (
                f"[Standard] Match the term with its correct definition:\n\n"
                f"Term: {term}\n\n"
                f"Definition: '{definition}'\n\n"
                f"Which term does this definition describe?"
            )
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "MCQ",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": question,
                "options": [f"{lbl} {opt}" for lbl, opt in zip(option_labels, options)],
                "answer": f"{option_labels[correct_idx]} {term}",
                "explanation": f"Definition of '{term}': {definition}",
                "solver": "solve_classify_business_activity",
                "solver_params": {"company_name": term, "activity_description": definition},
            })

        elif qtype == "fill_blank":
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "fill_blank",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": (
                    "[Standard] Commerce = Trade + ________.\n"
                    "Business = Industry + ________."
                ),
                "options": None,
                "answer": "Auxiliaries to Trade; Commerce",
                "explanation": (
                    "Commerce = Trade + Auxiliaries to Trade.\n"
                    "Business = Industry + Commerce.\n"
                    "These are the fundamental structural formulas in commercial studies."
                ),
                "solver": "solve_classify_business_activity",
                "solver_params": {"company_name": "Generic Enterprise",
                                   "activity_description": "Commerce and Business activities"},
            })

        else:  # short_answer
            qs.append({
                "id": f"c9_ca_n1_{qid_start + len(qs):03d}",
                "type": "short_answer",
                "difficulty": "Easy",
                "topic": "Basic Terms",
                "node": "c9_commapp_001",
                "question": (
                    "[Standard] 'State Bank of India provides working capital loans to Tata Steel. "
                    "State Bank of India also sells insurance policies and offers locker facilities.'\n\n"
                    "(a) Under which heading of Commerce does SBI's lending activity fall?\n"
                    "(b) Name the obstacle that lending removes.\n"
                    "(c) List TWO other auxiliaries to trade mentioned in the above statement."
                ),
                "options": None,
                "answer": (
                    "(a) Auxiliary to Trade (Banking/Finance).\n"
                    "(b) Financial risk / lack of funds (financial obstacle).\n"
                    "(c) Insurance and Warehousing (locker facilities)."
                ),
                "explanation": (
                    "Banking and insurance are auxiliaries to trade because they remove "
                    "obstacles (financial risk, risk of loss) that hinder trade. "
                    "Commerce = Trade + Auxiliaries to Trade."
                ),
                "solver": "solve_classify_business_activity",
                "solver_params": {"company_name": "State Bank of India",
                                   "activity_description": "banking and insurance auxiliaries to trade"},
            })

    return qs


# ─── Node 2 helpers ────────────────────────────────────────────────────────

def _gen_node2_departments(rng, count: int, types: dict, qid_start: int) -> list:
    qs = []
    competency_count = count // 2

    for i in range(count):
        qtype  = rng.choice(["MCQ", "fill_blank", "short_answer", "long_answer"])
        company_name, _, _, company_hq, _ = _pick_company(rng)

        is_competency = i < competency_count
        prefix = "[Competency — Indian Context] " if is_competency else "[Standard] "

        if qtype == "MCQ":
            dept = rng.choice(list(DEPARTMENT_ROLES.keys()))
            roles = DEPARTMENT_ROLES[dept]
            correct_role = roles[rng.randint(0, len(roles) - 1)]

            # Generate plausible distractors from other departments
            other_roles = []
            for other_dept, other_roles_list in DEPARTMENT_ROLES.items():
                if other_dept != dept:
                    other_roles.extend(other_roles_list)
            rng.shuffle(other_roles)
            options = [correct_role] + other_roles[:3]
            rng.shuffle(options)
            correct_idx = options.index(correct_role)
            option_labels = ["(A)", "(B)", "(C)", "(D)"]

            question = (
                f"{prefix}'{company_name}' ({company_hq}) has four core operating departments. "
                f"Consider the '{dept}' department. Which of the following is a primary "
                f"responsibility of this department?"
            )
            explanation = (
                f"The {dept} department's roles include:\n"
                + "\n".join(f"  • {r}" for r in roles) +
                f"\n\nDistinction from other departments:\n"
                + "\n".join(
                    f"• {d}: " + "; ".join(DEPARTMENT_ROLES[d][:2]) for d in DEPARTMENT_ROLES if d != dept
                )
            )
            qs.append({
                "id": f"c9_ca_n2_{qid_start + len(qs):03d}",
                "type": "MCQ",
                "difficulty": "Easy",
                "topic": "Departments",
                "node": "c9_commapp_009",
                "question": question,
                "options": [f"{lbl} {opt}" for lbl, opt in zip(option_labels, options)],
                "answer": f"{option_labels[correct_idx]} {correct_role}",
                "explanation": explanation,
                "solver": "solve_department_workflow",
                "solver_params": {"company": company_name,
                                   "steps": [correct_role] + other_roles[:3]},
            })

        elif qtype == "fill_blank":
            doc_sequence = [
                ("Indent / Purchase Requisition", "initiated by Production/Sales"),
                ("Purchase Order (PO)", "issued by Purchase Department to supplier"),
                ("Goods Receipt Note (GRN)", "issued by Stores upon receiving goods"),
                ("Material Requisition Slip (MRS)", "issued by Production to Stores for raw materials"),
            ]
            correct_doc, correct_desc = rng.choice(doc_sequence)

            question = (
                f"{prefix}In the Purchase & Stores workflow at '{company_name}', "
                f"after the supplier delivers goods to the warehouse, the Stores department "
                "verifies the delivery against the purchase order and issues a ________ "
                "(________) to confirm receipt."
            )
            qs.append({
                "id": f"c9_ca_n2_{qid_start + len(qs):03d}",
                "type": "fill_blank",
                "difficulty": "Easy",
                "topic": "Departments",
                "node": "c9_commapp_009",
                "question": question,
                "options": None,
                "answer": f"Goods Receipt Note (GRN); {correct_desc}",
                "explanation": (
                    "Purchase & Stores workflow:\n"
                    "1. Indent → 2. Purchase Order (PO) → 3. Goods Receipt Note (GRN) → "
                    "4. Storage → 5. Material Requisition Slip (MRS) → 6. Issue to Production\n\n"
                    "The GRN is the documentary proof that goods have been received and is "
                    "essential for the accounts department to process payment to the supplier."
                ),
                "solver": "solve_department_workflow",
                "solver_params": {"company": company_name,
                                   "steps": [d for d, _ in doc_sequence]},
            })

        elif qtype == "short_answer":
            focus_dept = rng.choice(list(DEPARTMENT_ROLES.keys()))
            roles = DEPARTMENT_ROLES[focus_dept]
            question = (
                f"{prefix}'{company_name}' has four core operating departments. "
                f"Describe the role of the '{focus_dept}' department. "
                f"In your answer, mention at least TWO specific tasks it performs and explain "
                f"how it depends on another department."
            )
            other_depts = [d for d in DEPARTMENT_ROLES if d != focus_dept]
            dependency = rng.choice(other_depts)

            qs.append({
                "id": f"c9_ca_n2_{qid_start + len(qs):03d}",
                "type": "short_answer",
                "difficulty": "Easy",
                "topic": "Departments",
                "node": "c9_commapp_009",
                "question": question,
                "options": None,
                "answer": (
                    f"Role of {focus_dept}:\n"
                    + "\n".join(f"  • {r}" for r in roles) +
                    f"\n\nDependency on {dependency}:\n"
                    f"  {focus_dept} receives inputs from {dependency}. "
                    f"For example, if {focus_dept} is Production, it receives raw materials "
                    f"from Stores (part of Purchase & Stores) via an MRS, and receives demand "
                    f"forecasts from Sales to plan production schedules."
                ),
                "explanation": (
                    "All four departments are interdependent:\n"
                    "• Marketing & Sales → generate demand and customer orders.\n"
                    "• Purchase & Stores → procure and store raw materials.\n"
                    "• Production → converts raw materials → finished goods.\n"
                    "The workflow forms a circular chain: Sales → Purchase → Stores → Production → Sales."
                ),
                "solver": "solve_department_workflow",
                "solver_params": {"company": company_name,
                                   "steps": list(DEPARTMENT_ROLES.keys())},
            })

        else:  # long_answer
            qs.append({
                "id": f"c9_ca_n2_{qid_start + len(qs):03d}",
                "type": "long_answer",
                "difficulty": "Medium",
                "topic": "Departments",
                "node": "c9_commapp_009",
                "question": (
                    f"{prefix}'{company_name}' ({company_hq}) operates as a large-scale "
                    "manufacturing and trading enterprise. The company has four core operating "
                    "departments: Purchase & Stores, Production, Marketing, and Sales.\n\n"
                    "(a) Describe the complete workflow starting from when Sales receives a "
                    "customer order to when the finished goods are delivered. Mention at least "
                    "FOUR key documents used.\n"
                    "(b) Explain how the Marketing department differs from the Sales department "
                    "in terms of objectives and activities. Use a relevant Indian example.\n"
                    "(c) Why is it said that no department can work in isolation? Support your "
                    "answer with reference to the Purchase & Stores and Production departments."
                ),
                "options": None,
                "answer": (
                    "(a) Workflow:\n"
                    "  1. Sales receives customer indent/order.\n"
                    "  2. Sales passes indent to Purchase & Stores.\n"
                    "  3. Purchase issues Purchase Order (PO) to supplier.\n"
                    "  4. Stores receives goods, issues Goods Receipt Note (GRN).\n"
                    "  5. Stores stores raw materials; Production issues Material "
                    "Requisition Slip (MRS).\n"
                    "  6. Stores issues raw materials to Production.\n"
                    "  7. Production converts raw materials → finished goods.\n"
                    "  8. Marketing & Sales distribute finished goods to customers.\n"
                    "  Documents: Indent, PO, GRN, MRS, Invoice, Delivery Challan.\n\n"
                    "(b) Marketing vs. Sales:\n"
                    "  • Marketing creates demand (advertising, branding, market research, "
                    "pricing strategy). Objective: build brand awareness.\n"
                    "  • Sales converts demand into orders (order booking, invoicing, dealer "
                    "dispatch). Objective: generate revenue.\n"
                    "  Example: HUL's 'Dove Real Beauty' campaign (Marketing) vs. HUL's "
                    "sales team placing Dove soap in 9 million retail outlets (Sales).\n\n"
                    "(c) Interdependence:\n"
                    "  • Purchase & Stores cannot buy without knowing what Production needs "
                    "(MRS from Production).\n"
                    "  • Production cannot make goods without raw materials from Stores.\n"
                    "  • Production quantities depend on Sales forecasts.\n"
                    "  • Sales cannot deliver without Production completing goods.\n"
                    "  This chain shows every department is linked — a delay in one affects all."
                ),
                "explanation": (
                    "This long-answer question assesses comprehensive understanding of department "
                    "inter-dependence. Students should identify all workflow documents, distinguish "
                    "Marketing from Sales (common error), and explain the circular dependency."
                ),
                "solver": "solve_department_workflow",
                "solver_params": {"company": company_name,
                                   "steps": list(DEPARTMENT_ROLES.keys()) * 2},
            })

    return qs


# ─── Node 3 helpers ────────────────────────────────────────────────────────

def _gen_node3_communication(rng, count: int, types: dict, qid_start: int) -> list:
    qs = []
    competency_count = count // 2

    org_data = {
        "Tata Group":        (935000, 100, 40.0),
        "Reliance Industries":(25000,  1,  35.0),
        "Infosys":           (317000, 50,  45.0),
        "Wipro":             (250000, 55,  38.0),
        "Indian Railways":   (1400000, 1, 25.0),
    }

    for i in range(count):
        qtype = rng.choice(["MCQ", "fill_blank", "short_answer", "long_answer"])
        is_competency = i < competency_count
        prefix = "[Competency — Indian Context] " if is_competency else "[Standard] "

        org_name = rng.choice(list(org_data.keys()))
        employees, locations, vol_change = org_data[org_name]

        if qtype == "MCQ":
            question = (
                f"{prefix}'{org_name}' employs approximately {employees:,} people across "
                f"{locations} location(s) and experienced a {vol_change:.0f}% increase in "
                "communication volume recently.\n\n"
                "Why has communication become increasingly important for large organisations "
                "like the one described above?"
            )
            correct_letter = "B"
            options = [
                "(A) Communication is only about talking face-to-face and is unaffected by organisation size",
                "(B) As organisations grow in size and geographic spread, structured communication "
                    "channels (written reports, digital platforms) become essential for coordination",
                "(C) Communication is only important for the marketing department, not for production",
                "(D) Small organisations need more communication than large ones because "
                    "there are fewer people to share information",
            ]
            explanation = (
                f"'{org_name}' is a large organisation with {employees:,} employees. "
                "As organisations grow:\n"
                "1. Larger workforce → more people need to be coordinated.\n"
                "2. Geographic spread → cross-location communication is required.\n"
                "3. Faster decision-making → needs efficient information flow.\n"
                "4. Digital adoption → remote work tools (email, Teams, intranet).\n\n"
                "Graicunas' formula: A supervisor with n subordinates has n(n-1)/2 potential "
                f"communication channels. With {employees:,} employees, the number of channels "
                "is enormous — hence structured, formal communication is essential."
            )
            qs.append({
                "id": f"c9_ca_n3_{qid_start + len(qs):03d}",
                "type": "MCQ",
                "difficulty": "Easy",
                "topic": "Communication in Organisations",
                "node": "c9_commapp_013",
                "question": question,
                "options": options,
                "answer": correct_letter,
                "explanation": explanation,
                "solver": "solve_communication_analysis",
                "solver_params": {"org_name": org_name, "employees": employees,
                                   "locations": locations,
                                   "communication_volume_change_pct": vol_change},
            })

        elif qtype == "fill_blank":
            question = (
                f"{prefix}According to Graicunas, the number of direct communication channels "
                f"for a supervisor with n subordinates is given by the formula: ________.\n\n"
                f"If '{org_name}' has {employees:,} employees, the approximate number of "
                f"communication channels is: ________."
            )
            ans_formula = "n(n-1)/2"
            ans_channels = employees * (employees - 1) // 2

            qs.append({
                "id": f"c9_ca_n3_{qid_start + len(qs):03d}",
                "type": "fill_blank",
                "difficulty": "Easy",
                "topic": "Communication in Organisations",
                "node": "c9_commapp_013",
                "question": question,
                "options": None,
                "answer": f"{ans_formula}; {ans_channels:,} channels",
                "explanation": (
                    f"Graicunas' formula for direct communication channels: n(n-1)/2.\n"
                    f"For {employees:,} employees: {employees}×{employees-1}/2 = {ans_channels:,}.\n"
                    f"This shows why large organisations need structured communication systems."
                ),
                "solver": "solve_numerical_communication",
                "solver_params": {"employees": employees, "avg_message_length_chars": 200,
                                   "messages_per_employee_per_day": 20,
                                   "digital_adoption_rate_pct": 80.0},
            })

        elif qtype == "short_answer":
            question = (
                f"{prefix}The table below shows communication statistics for '{org_name}' "
                f"({employees:,} employees):\n\n"
                f"  • Before digital transformation: ~5 messages/employee/day (face-to-face, "
                f"paper memos, telephone)\n"
                f"  • After digital transformation: ~20 messages/employee/day (email, Teams, "
                f"intranet, video calls)\n\n"
                "(a) Calculate the percentage increase in daily communication volume.\n"
                "(b) Name TWO digital communication tools that have helped Indian companies like "
                f"'{org_name}' manage this increase.\n"
                "(c) Explain ONE disadvantage of relying solely on face-to-face communication "
                "in a large organisation."
            )

            pct_increase = ((20 - 5) / 5) * 100

            qs.append({
                "id": f"c9_ca_n3_{qid_start + len(qs):03d}",
                "type": "short_answer",
                "difficulty": "Easy",
                "topic": "Communication in Organisations",
                "node": "c9_commapp_013",
                "question": question,
                "options": None,
                "answer": (
                    f"(a) Percentage increase = ((20 - 5) / 5) × 100 = {pct_increase:.0f}%.\n"
                    "(b) Two digital tools: Email/Intranet (internal memos, reports), "
                    "Microsoft Teams/Zoom (video conferencing).\n"
                    "(c) Disadvantage of face-to-face only: "
                    "In a {:,}-employee organisation, it is physically impossible for "
                    "everyone to meet face-to-face. Key issues:\n"
                    "  • No record/evidence of communication (no paper trail).\n"
                    "  • Time delays for distant teams (geographic spread).\n"
                    "  • No way to communicate with multiple people simultaneously.\n"
                    "  • Missed information for employees in different shifts/locations."
                    .format(employees)
                ),
                "explanation": (
                    "Digital tools increase communication volume and speed while maintaining "
                    "a record. Face-to-face is good for small teams but does not scale to "
                    "organisations with thousands of employees across multiple locations."
                ),
                "solver": "solve_numerical_communication",
                "solver_params": {"employees": employees, "avg_message_length_chars": 200,
                                   "messages_per_employee_per_day": 20,
                                   "digital_adoption_rate_pct": 80.0},
            })

        else:  # long_answer
            question = (
                f"{prefix}Over the past decade, Indian organisations have undergone "
                "significant changes:\n\n"
                f"  • '{org_name}' grew from {employees//2:,} to {employees:,} employees.\n"
                f"  • Operations expanded from {max(1, locations//2)} to {locations} location(s).\n"
                "  • COVID-19 (2020–21) forced remote work, increasing digital communication "
                "volume by 40–50%.\n"
                "  • New tools (Microsoft Teams, Zoom, Slack) replaced many face-to-face meetings.\n\n"
                "(a) Explain THREE reasons why communication has become more critical as "
                "organisations have grown in size and geographic spread.\n"
                "(b) How did the COVID-19 pandemic (2020–21) change the communication "
                "needs of Indian companies? Give TWO specific examples.\n"
                "(c) What is Graicunas' communication channels formula? Calculate the "
                f"approximate number of channels for a supervisor managing {employees:,} "
                "employees.\n"
                "(d) Explain how poor communication can lead to financial losses in a "
                "business. Support with a hypothetical example relevant to an Indian context."
            )

            channels = employees * (employees - 1) // 2

            qs.append({
                "id": f"c9_ca_n3_{qid_start + len(qs):03d}",
                "type": "long_answer",
                "difficulty": "Medium",
                "topic": "Communication in Organisations",
                "node": "c9_commapp_013",
                "question": question,
                "options": None,
                "answer": (
                    "(a) THREE reasons:\n"
                    "  1. Larger workforce: More employees need coordination — Graicunas "
                    f"formula gives {channels:,} channels for {employees:,} employees.\n"
                    "  2. Geographic spread: Multi-location companies need cross-site "
                    "communication (e.g., Infosys across 50+ global offices).\n"
                    "  3. Faster decision-making: Competitive markets demand quicker "
                    "information flow — digital tools speed up communication.\n\n"
                    "(b) COVID-19 impact:\n"
                    "  1. Indian companies shifted to remote work tools (Zoom, Teams).\n"
                    "     Example: Tata Consultancy Services (TCS) enabled 5 lakh+ employees "
                    "     to work from home using its 'Secure Borderless Workspace'.\n"
                    "  2. Communication volume increased ~40% as all daily briefings, meetings, "
                    "     and reports moved to digital platforms.\n\n"
                    f"(c) Graicunas' formula: Total channels = n(n-1)/2.\n"
                    f"    For {employees:,} employees: {employees}×{employees-1}/2 = {channels:,}.\n\n"
                    "(d) Poor communication → losses example:\n"
                    "  • A production manager at a Pune-based auto parts company sends "
                    "    an informal WhatsApp message to the Purchase team saying 'Reduce "
                    "    steel orders by 30%'. The Purchase team does not receive this "
                    "    message and places a large order. The company faces a cash crunch "
                    "    from excess inventory worth ₹2 crore.\n"
                    "  • Formal written communication (email with read receipt) would have "
                    "    prevented this misunderstanding."
                ),
                "explanation": (
                    "This long-answer question covers syllabus criteria: explaining why "
                    "communication is critical in growing organisations, listing changes "
                    "in modern business, using Graicunas' formula, and justifying poor "
                    "communication risks with a real-world Indian example."
                ),
                "solver": "solve_communication_analysis",
                "solver_params": {"org_name": org_name, "employees": employees,
                                   "locations": locations,
                                   "communication_volume_change_pct": vol_change},
            })

    return qs


# ---------------------------------------------------------------------------
# ─── DISPATCH / SOLVER ROUTER ─────────────────────────────────────────────
# ---------------------------------------------------------------------------

_SOLVER_MAP = {
    "solve_classify_business_activity": solve_classify_business_activity,
    "solve_distinguish_firm_company":   solve_distinguish_firm_company,
    "solve_department_workflow":        solve_department_workflow,
    "solve_communication_analysis":     solve_communication_analysis,
    "solve_numerical_communication":    solve_numerical_communication,
    "solve_trade_chain_optimisation":   solve_trade_chain_optimisation,
    "solve_verify_trade_chain":         solve_verify_trade_chain,
}


def solve_question(question_dict: dict) -> dict:
    """
    Route a question dict to the appropriate solver.
    Returns {answer, steps, verification}.
    """
    solver_name = question_dict.get("solver")
    params = question_dict.get("solver_params", {})
    solver = _SOLVER_MAP.get(solver_name)
    if solver is None:
        return {
            "answer": question_dict.get("answer", "N/A"),
            "steps": ["No dedicated solver; answer provided in question data."],
            "verification": {"note": "Solver not available for this question type."},
        }
    return solver(params)


def verify_all_questions(questions: list) -> dict:
    """
    Run verification on all questions that have solvers.
    Returns a summary dict.
    """
    results = {}
    for q in questions:
        qid = q["id"]
        if q.get("solver") and q.get("solver_params"):
            try:
                sol = solve_question(q)
                results[qid] = {"status": "OK", "solver_answer": sol["answer"],
                                "verification": sol["verification"]}
            except Exception as exc:
                results[qid] = {"status": "ERROR", "error": str(exc)}
        else:
            results[qid] = {"status": "SKIPPED", "reason": "No solver assigned"}
    return results


# ---------------------------------------------------------------------------
# ─── UTILITY: export questions to JSON-like format ─────────────────────────
# ---------------------------------------------------------------------------

def questions_to_json(questions: list, indent: int = 2) -> str:
    """Serialise questions to a JSON string."""
    exportable = []
    for q in questions:
        eq = dict(q)
        # solver_params may contain non-serialisable types — keep as-is if simple
        exportable.append(eq)
    return json.dumps(exportable, indent=indent, ensure_ascii=False)


def get_question_by_id(questions: list, qid: str) -> dict | None:
    """Look up a question by its ID."""
    for q in questions:
        if q.get('id') == qid:
            return q
    return None


def get_coverage_summary() -> dict:
    """Return a summary of topics covered."""
    return {
        "syllabus": "ICSE Class 9 Commercial Applications",
        "topics": [
            "Business Communication",
            "Accounting Fundamentals",
            "GST Calculations",
            "Business Mathematics",
            "Trade Documentation",
        ],
        "question_types": ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"],
    }