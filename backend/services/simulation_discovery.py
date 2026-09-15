"""Simulation discovery service — scans frontend simulation assets.

Discovers simulation components from the frontend directory structure
and returns metadata for the API. Replaces the DB-only approach that
returned zero results despite ~915 frontend simulation assets existing.

Filename convention: C{class}_{Subject}{Topic}Sim.tsx
  e.g. C10_PhysicsEfficiencyMachinesetaSim.tsx
       → class_level=10, subject=Physics, topic=EfficiencyMachineseta
"""

from __future__ import annotations

import logging
import os
import re
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)

# Default frontend simulations directory
DEFAULT_SIM_DIR = os.environ.get(
    "FRONTEND_SIM_DIR",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 "..", "frontend", "components", "simulations"),
)

# Filename pattern: C{class}_{Subject}{Topic}Sim.tsx
# Subject is one of the known subject prefixes (longest first for greedy match)
_SUBJECT_PREFIXES = [
    "HistoryCivics", "CommercialStudies", "ComputerScience", "BusinessStudies",
    "AppliedMaths", "EconApplications", "CommerceApp",
    "Mathematics", "Biotechnology", "Accountancy",
    "HomeScience", "LegalStudies", "Psychology", "Sociology",
    "PoliticalScience", "Philosophy", "Anthropology",
    "MassMedia",
    "Physics", "Chemistry", "Biology",
    "Geography", "Economics", "History", "Civics",
    "Commerce", "Computer", "EVS", "Econ",
    "English", "Hindi", "Sanskrit", "Arts",
    "Music", "PhysicalEducation", "ValueEducation",
]

# Build regex with alternation of subject prefixes
_SUBJECT_ALT = "|".join(sorted(_SUBJECT_PREFIXES, key=len, reverse=True))
# Match: C{class}_{Subject}{Topic}Sim[.tsx | _old_{timestamp}.tsx | _{timestamp}.tsx]
_SIM_PATTERN = re.compile(
    rf"^C(\d{{1,2}})_({_SUBJECT_ALT})(.+?)Sim(?:_old_\d+|_\d+)?\.tsx$"
)

# Secondary pattern: generic simulation files (not class-prefixed)
# e.g. CalculusSim.tsx, ChemicalBondingSim.tsx, CircuitBuilderSimulation.tsx, AdditionGame.tsx
_GENERIC_SIM_PATTERN = re.compile(
    rf"^(.+?)(?:Sim(?:ulation)?|Game)\.tsx$"
)

# Subject keywords for generic sim classification
_SUBJECT_KEYWORDS = {
    "physics": ["physics", "circuit", "capacitor", "projectile", "wave", "magnet",
                "battery", "thermometer", "heat", "optics", "mechanics", "force",
                "energy", "motion", "gravity", "electric", "voltage"],
    "chemistry": ["chem", "chemical", "bond", "reaction", "acid", "base",
                  "molecule", "equation", "kinetics", "periodic"],
    "biology": ["bio", "cell", "organism", "genetics", "evolution", "ecology",
                "chromosome", "mitosis", "meiosis", "circulatory", "plant"],
    "mathematics": ["math", "calculus", "algebra", "geometry", "graph",
                    "equation", "number", "fraction", "trigonometry"],
    "computer_science": ["code", "computer", "hardware", "software", "programming",
                         "algorithm", "data"],
    "geography": ["climate", "map", "earth", "terrain", "geography"],
    "history": ["civilization", "history"],
    "economics": ["commercial", "economics", "trade"],
}

# Subject normalization
_SUBJECT_MAP = {
    "physics": "physics",
    "chemistry": "chemistry",
    "biology": "biology",
    "mathematics": "mathematics",
    "maths": "mathematics",
    "appliedmaths": "applied_maths",
    "evs": "evs",
    "geography": "geography",
    "history": "history",
    "historycivics": "history_civics",
    "civics": "civics",
    "economics": "economics",
    "econ": "economics",
    "econapplications": "economics",
    "commerce": "commerce",
    "commercialstudies": "commercial_studies",
    "commerceapp": "commerce",
    "computer": "computer_science",
    "computerscience": "computer_science",
    "accountancy": "accountancy",
    "businessstudies": "business_studies",
    "biotechnology": "biotechnology",
    "english": "english",
    "hindi": "hindi",
    "homescience": "home_science",
    "legalstudies": "legal_studies",
    "psychology": "psychology",
    "sociology": "sociology",
    "politicalscience": "political_science",
    "philosophy": "philosophy",
    "anthropology": "anthropology",
    "sanskrit": "sanskrit",
    "arts": "arts",
    "music": "music",
    "physicaleducation": "physical_education",
    "valueeducation": "value_education",
    "massmedia": "mass_media",
}


def _camel_to_words(s: str) -> str:
    """Convert CamelCase to human-readable words."""
    return re.sub(r"(?<!^)(?=[A-Z])", " ", s).strip()


def _parse_sim_filename(filename: str) -> Optional[dict[str, Any]]:
    """Parse a simulation filename into metadata."""
    # Try class-prefixed pattern first
    m = _SIM_PATTERN.match(filename)
    if m:
        class_level = m.group(1)
        subject_raw = m.group(2)
        topic_raw = m.group(3)

        subject = _SUBJECT_MAP.get(subject_raw.lower(), subject_raw.lower())
        topic_name = _camel_to_words(topic_raw)

        sim_id = filename.replace(".tsx", "").rsplit("_old_", 1)[0].rsplit("_", 1)[0] \
            if "_old_" in filename or filename[:-5].split("_")[-1].isdigit() \
            else filename.replace(".tsx", "")

        title = f"{subject_raw} — {topic_name} (Class {class_level})"

        return {
            "sim_id": sim_id,
            "title": title,
            "description": f"Interactive simulation for {topic_name} in {subject_raw} (Class {class_level}).",
            "subject": subject,
            "class_level": class_level,
            "topic_id": None,
            "topic_name": topic_name,
            "is_verified": True,
            "thumbnail_url": None,
            "estimated_duration_min": 10,
            "launch_count": 0,
            "created_at": None,
            "component_path": f"components/simulations/c6_12/{filename}",
        }

    # Try generic sim pattern (no class prefix)
    m2 = _GENERIC_SIM_PATTERN.match(filename)
    if m2:
        name_raw = m2.group(1)
        topic_name = _camel_to_words(name_raw)

        # Classify subject by keywords
        subject = "general"
        name_lower = name_raw.lower()
        for subj, keywords in _SUBJECT_KEYWORDS.items():
            if any(kw in name_lower for kw in keywords):
                subject = subj
                break

        sim_id = filename.replace(".tsx", "")

        # Detect class level from filename or parent directory
        # e.g. ComputerSkillsC1_5Sim -> class 1-5, class1/AdditionGame.tsx -> class 1
        class_level = "general"
        cls_match = re.search(r'C(\d)(?:_(\d))?', filename)
        if cls_match:
            if cls_match.group(2):
                class_level = f"{cls_match.group(1)}-{cls_match.group(2)}"
            else:
                class_level = cls_match.group(1)

        return {
            "sim_id": sim_id,
            "title": topic_name,
            "description": f"Interactive simulation: {topic_name}.",
            "subject": subject,
            "class_level": class_level,
            "topic_id": None,
            "topic_name": topic_name,
            "is_verified": True,
            "thumbnail_url": None,
            "estimated_duration_min": 10,
            "launch_count": 0,
            "created_at": None,
            "component_path": f"components/simulations/{filename}",
        }

    return None


class SimulationDiscovery:
    """Discovers simulation components from the frontend filesystem."""

    # Directories to skip (backups, utilities)
    SKIP_DIRS = {"c6_12_backups"}

    # Files to skip (utility/shared components, not actual simulations)
    SKIP_FILES = {
        "GameRenderer.tsx",
        "SimulationRenderer.tsx",
        "InteractiveNumberLine.tsx",
        "SVGBodyDiagram.tsx",
        "VisualChallenge.tsx",
    }

    def __init__(self, sim_dir: Optional[str] = None, include_class_1_5: bool = True):
        self.sim_dir = Path(sim_dir or DEFAULT_SIM_DIR).resolve()
        self._cache: Optional[list[dict[str, Any]]] = None
        self.include_class_1_5 = include_class_1_5

    def discover(self, force_refresh: bool = False) -> list[dict[str, Any]]:
        """Scan the frontend simulations directory and return metadata for all sims."""
        if self._cache is not None and not force_refresh:
            return self._cache

        sims: list[dict[str, Any]] = []

        if not self.sim_dir.exists():
            logger.warning("Simulation directory does not exist: %s", self.sim_dir)
            self._cache = sims
            return sims

        try:
            seen_ids = set()
            for tx_file in self.sim_dir.rglob("*.tsx"):
                # Skip backup directories
                if any(skip in tx_file.parts for skip in self.SKIP_DIRS):
                    continue

                # Skip known utility files
                if tx_file.name in self.SKIP_FILES:
                    continue

                # Skip class 1-5 game directories unless explicitly included
                if not self.include_class_1_5:
                    parts_lower = [p.lower() for p in tx_file.parts]
                    if any(p in parts_lower for p in ["class1", "class2", "class3", "class4", "class5"]):
                        continue

                meta = _parse_sim_filename(tx_file.name)
                if meta:
                    meta["component_path"] = str(
                        tx_file.relative_to(self.sim_dir.parent.parent)
                    ).replace("\\", "/")

                    # If class_level is still "general", try to detect from parent dir
                    if meta["class_level"] == "general":
                        parent = tx_file.parent.name.lower()
                        dir_match = re.match(r'^class(\d)$', parent)
                        if dir_match:
                            meta["class_level"] = dir_match.group(1)
                        elif parent in ("c6_8",):
                            meta["class_level"] = "6-8"
                        elif parent in ("c9_12",):
                            meta["class_level"] = "9-12"
                        elif parent in ("c6_12",):
                            meta["class_level"] = "6-12"

                    # Make sim_id unique by prefixing with class level when
                    # the same filename exists in multiple directories
                    base_sim_id = meta["sim_id"]
                    if base_sim_id in seen_ids:
                        # Duplicate filename in different dir — make unique
                        unique_id = f"{meta['class_level']}_{base_sim_id}"
                        meta["sim_id"] = unique_id
                        # If still a dupe, skip
                        if unique_id in seen_ids:
                            continue
                    seen_ids.add(meta["sim_id"])
                    sims.append(meta)
        except Exception as exc:
            logger.error("Error scanning simulation directory: %s", exc)

        # Sort by class_level, then subject, then title
        sims.sort(key=lambda s: (s.get("class_level", "0"), s.get("subject", ""), s.get("title", "")))

        logger.info("Discovered %d simulations in %s", len(sims), self.sim_dir)
        self._cache = sims
        return sims

    def get_by_id(self, sim_id: str) -> Optional[dict[str, Any]]:
        """Get a single simulation by its ID."""
        for sim in self.discover():
            if sim["sim_id"] == sim_id:
                return sim
        return None

    def filter(
        self,
        subject: Optional[str] = None,
        class_level: Optional[str] = None,
        topic: Optional[str] = None,
    ) -> list[dict[str, Any]]:
        """Filter simulations by subject, class_level, or topic."""
        sims = self.discover()
        result = []
        for sim in sims:
            if subject and sim.get("subject", "").lower() != subject.lower():
                continue
            if class_level and str(sim.get("class_level", "")) != str(class_level):
                continue
            if topic and topic.lower() not in (sim.get("topic_name", "")).lower():
                continue
            result.append(sim)
        return result

    def count(self) -> int:
        """Return total number of discovered simulations."""
        return len(self.discover())
