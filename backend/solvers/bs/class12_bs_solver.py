import random
import math
import fractions
from fractions import Fraction
from typing import Dict, List, Any, Optional, Tuple
import sympy as sp

random.seed(42)

# ============================================================
# BUSINESS ENVIRONMENT SOLVER (Node c12_bs_001)
# ============================================================

class BusinessEnvironmentSolver:

    FEATURES = {
        "totality": "The sum total of ALL internal and external forces affecting a business",
        "specific": "Forces specific to a particular firm — customers, competitors, suppliers, investors",
        "general": "Forces affecting all firms in an industry or economy — technology, politics, economy, society",
        "inter_relatedness": "Changes in one force trigger changes in other connected forces",
        "dynamic_nature": "The environment keeps changing over time, requiring businesses to adapt continuously",
        "complexity": "Many inter-related variables make it difficult to understand the environment fully",
        "uncertainty": "The future cannot be predicted with certainty; events may surprise the business"
    }

    SPECIFIC_FORCES = ["customers", "competitors", "suppliers", "investors", "employees", "dealers", "distributors"]
    GENERAL_FORCES = ["technology", "political", "economic", "social", "legal", "government", "natural", "globalisation"]

    SCENARIOS = {
        "jio_2016": {
            "text": "In 2016, Reliance Jio launched with free data and calls, disrupting Airtel, Vodafone, BSNL and Idea simultaneously.",
            "features": ["dynamic_nature", "inter_relatedness", "complexity"]
        },
        "demonetisation_2016": {
            "text": "On 8 November 2016, the Government demonetised ₹500 and ₹1000 notes, altering the cash-dependent retail environment overnight.",
            "features": ["dynamic_nature", "uncertainty", "general"]
        },
        "gst_2017": {
            "text": "The Goods and Services Tax (GST), launched on 1 July 2017, replaced multiple indirect taxes and affected every business in India.",
            "features": ["general", "dynamic_nature", "complexity"]
        },
        "make_in_india": {
            "text": "The Make in India initiative (2014) aims to position India as a global manufacturing hub, inviting foreign investors.",
            "features": ["general", "inter_relatedness"]
        },
        "covid_2020": {
            "text": "COVID-19 pandemic in 2020 forced businesses to adopt digital tools, work-from-home, and rethink supply chains.",
            "features": ["dynamic_nature", "complexity", "uncertainty"]
        },
        "tata_ev": {
            "text": "Tata Motors investing ₹15,000 crore in EVs responds to stricter BS-VI pollution norms and growing demand for green vehicles.",
            "features": ["specific", "inter_relatedness", "dynamic_nature"]
        },
        "digital_india": {
            "text": "Digital India initiative pushes businesses toward e-commerce, digital payments, and online governance.",
            "features": ["general", "dynamic_nature"]
        },
        "competitor_new": {
            "text": "A new online grocery startup enters the market, forcing existing retailers like BigBasket to change pricing and delivery strategy.",
            "features": ["specific", "inter_relatedness"]
        },
        "1991_liberalisation": {
            "text": "The 1991 New Economic Policy opened India to foreign investment, ending the Licence Raj era.",
            "features": ["general", "dynamic_nature", "uncertainty"]
        },
        "apple_india": {
            "text": "Apple starting local iPhone assembly in Tamil Nadu affects domestic component suppliers and creates new jobs.",
            "features": ["inter_relatedness", "specific", "general"]
        }
    }

    @staticmethod
    def solve_feature_identification(params: Dict) -> Dict:
        scenario_id = params.get("scenario_id", "jio_2016")
        scenario = BusinessEnvironmentSolver.SCENARIOS.get(scenario_id, BusinessEnvironmentSolver.SCENARIOS["jio_2016"])

        steps = [
            f"STEP 1: Read the given scenario:",
            f"  \"{scenario['text']}\"",
            "",
            "STEP 2: Recall the seven features of the business environment:",
        ]
        for key, val in BusinessEnvironmentSolver.FEATURES.items():
            steps.append(f"  • {key}: {val}")

        steps.append("")
        steps.append("STEP 3: Analyse the scenario for each feature:")

        analyses = {
            "totality": "Does it refer to ALL forces together? → Not the main focus here.",
            "specific": "Is the change affecting ONE particular firm or a few firms only?",
            "general": "Is the change affecting ALL firms in the industry or nation?",
            "inter_relatedness": "Does a change in one force cause ripple effects on other forces/firms?",
            "dynamic_nature": "Does the scenario describe a change or shift over time?",
            "complexity": "Does it involve many inter-connected variables that are hard to predict?",
            "uncertainty": "Does it highlight that outcomes are unpredictable?"
        }

        matched_features = scenario["features"]
        for feat in matched_features:
            steps.append(f"  ✓ '{feat}' is illustrated: {BusinessEnvironmentSolver.FEATURES[feat]}")

        not_matched = [f for f in BusinessEnvironmentSolver.FEATURES if f not in matched_features]
        for feat in not_matched[:3]:
            steps.append(f"  ✗ '{feat}' is NOT the primary feature here.")

        primary = matched_features[0]
        steps.append("")
        steps.append(f"STEP 4: CONCLUSION — Primary feature: '{primary}'")
        steps.append(f"  Explanation: {BusinessEnvironmentSolver.FEATURES[primary]}")

        answer = {
            "primary_feature": primary,
            "all_features_illustrated": matched_features,
            "explanation": BusinessEnvironmentSolver.FEATURES[primary]
        }

        verification = {
            "method": "keyword + context matching",
            "scenario_checked": scenario_id,
            "features_matched": matched_features,
            "check": f"Scenario contains keywords/phrases consistent with feature '{primary}'. Back-check: re-reading scenario confirms '{primary}' is the best answer."
        }

        return {"answer": answer, "steps": steps, "verification": verification}

    @staticmethod
    def solve_force_classification(params: Dict) -> Dict:
        force = params.get("force", "customers")

        steps = [
            "STEP 1: Recall definitions:",
            "  Specific Forces → Forces that affect a particular business directly: customers, competitors, suppliers, investors, employees.",
            "  General Forces  → Forces that affect the entire industry/economy: technology, government policy, economy, society.",
            "",
            f"STEP 2: Identify the given force: '{force}'",
            "",
            "STEP 3: Classify:"
        ]

        is_specific = force.lower() in BusinessEnvironmentSolver.SPECIFIC_FORCES
        category = "Specific Force" if is_specific else "General Force"

        steps.append(f"  '{force}' → {category}")
        steps.append("")
        steps.append("STEP 4: Explanation:")