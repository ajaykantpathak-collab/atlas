"""
CISCE EVS Class 10 - Deterministic Solver & Question Generator
Fully self-contained, reproducible, no external API calls.
"""

import random
import math
from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, List, Any, Optional, Tuple

# ─── Registry ────────────────────────────────────────────────────────
SOLVER_REGISTRY: Dict[str, Any] = {}


def register(cls):
    """Decorator that auto-registers a solver class in SOLVER_REGISTRY."""
    SOLVER_REGISTRY[cls.PROBLEM_TYPE] = cls
    return cls


# ─── Base Solver ─────────────────────────────────────────────────────
class BaseSolver:
    PROBLEM_TYPE: str = "base"

    def __init__(self, seed: int = 42):
        random.seed(seed)

    def solve(self, **kwargs) -> Dict[str, Any]:
        raise NotImplementedError

    def _solve(self, *args, **kwargs) -> Any:
        raise NotImplementedError

    def _verify(self, computed: Any, expected: Any) -> bool:
        if isinstance(computed, float) and isinstance(expected, float):
            return abs(computed - expected) < 1e-6
        if isinstance(computed, Decimal) and isinstance(expected, Decimal):
            return computed == expected
        return computed == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_001  -  Natural Resources: Water Footprint Calculation
# ══════════════════════════════════════════════════════════════════════
@register
class WaterFootprintSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_001"

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self.domestic_factors = {
            "drinking": 3.0,
            "cooking": 5.0,
            "bathing": 70.0,
            "toilet": 40.0,
            "cleaning": 20.0,
            "laundry": 40.0,
            "gardening": 25.0,
        }

    def _solve(self, persons: int, days: int,
               activity_usage: Dict[str, float]) -> Decimal:
        total = Decimal("0")
        for activity, litres_per_person_per_day in activity_usage.items():
            total += Decimal(str(litres_per_person_per_day)) * \
                     Decimal(str(persons)) * Decimal(str(days))
        return total

    def solve(self, persons: int = 4, days: int = 30,
              activities: Optional[Dict[str, float]] = None,
              **kwargs) -> Dict[str, Any]:
        if activities is None:
            activities = {
                "drinking": 3.0,
                "cooking": 5.0,
                "bathing": 70.0,
                "toilet": 40.0,
                "cleaning": 20.0,
                "laundry": 40.0,
            }
        steps = [
            f"Persons: {persons}",
            f"Days: {days}",
            "Activity-wise daily consumption (litres/person):",
        ]
        total_daily = Decimal("0")
        for act, val in activities.items():
            steps.append(f"  {act}: {val} L")
            total_daily += Decimal(str(val))
        total_daily *= Decimal(str(persons))
        steps.append(f"Total daily: {persons} × {sum(activities.values()):.0f} = {total_daily} L")
        answer_litres = self._solve(persons, days, activities)
        answer_kld = (answer_litres / Decimal("1000") / Decimal(str(days))
                      ).quantize(Decimal("0.001"), rounding=ROUND_HALF_UP)
        steps.append(f"Total for {days} days: {answer_litres} L")
        steps.append(f"Average per day: {answer_litres / Decimal(str(days))} L/day")
        steps.append(f"Average per person per day: {total_daily / Decimal(str(persons))} L/person/day")
        return {
            "answer": {
                "total_litres": str(answer_litres),
                "total_kilolitres": str(
                    (answer_litres / Decimal("1000"))
                    .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
                ),
                "average_litres_per_person_per_day": str(
                    (total_daily / Decimal(str(persons)))
                    .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
                ),
                "kilo_litres_per_day": str(answer_kld),
            },
            "steps": steps,
            "verification": self._verify(answer_litres,
                                         persons * days * sum(activities.values())),
        }


def verify_water_footprint(result: Dict, persons: int = 4, days: int = 30) -> bool:
    a = Decimal(result["answer"]["total_litres"])
    expected = Decimal(str(persons * days * 178))
    return abs(a - expected) < Decimal("0.01")


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_002  -  Ecosystems: Energy Pyramid Efficiency
# ══════════════════════════════════════════════════════════════════════
@register
class EnergyPyramidSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_002"

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self.lindeman_efficiency = Decimal("0.10")

    def _solve(self, producer_energy: Decimal,
               levels: int) -> List[Decimal]:
        energies = [producer_energy]
        for _ in range(levels):
            energies.append(
                (energies[-1] * self.lindeman_efficiency)
                .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            )
        return energies

    def solve(self, producer_energy: float = 10000.0,
              trophic_levels: int = 4, **kwargs) -> Dict[str, Any]:
        pe = Decimal(str(producer_energy))
        steps = [
            f"Producer energy input: {pe} kcal/m²/yr",
            f"Trophic levels to compute: {trophic_levels}",
            f"Lindeman's 10% rule applied at each transfer.",
        ]
        energies = self._solve(pe, trophic_levels)
        level_names = [
            "Producers (Trophic Level 1)",
            "Primary Consumers (Trophic Level 2)",
            "Secondary Consumers (Trophic Level 3)",
            "Tertiary Consumers (Trophic Level 4)",
        ]
        result_levels = {}
        for i, (name, energy) in enumerate(
                zip(level_names[:trophic_levels + 1], energies)):
            steps.append(f"  {name}: {energy} kcal/m²/yr")
            result_levels[name] = str(energy)
        total_available = energies[-1]
        steps.append(
            f"Energy at top level: {total_available} kcal/m²/yr "
            f"({(total_available / pe * 100).quantize(Decimal('0.01'))}% of original)"
        )
        energy_lost = (pe - total_available).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP)
        steps.append(f"Total energy lost through transfers: {energy_lost} kcal/m²/yr")
        return {
            "answer": {
                "energy_by_level": result_levels,
                "top_level_energy": str(total_available),
                "energy_lost": str(energy_lost),
                "efficiency_percent": str(
                    (total_available / pe * 100)
                    .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
                ),
            },
            "steps": steps,
            "verification": self._verify(
                energies[trophic_levels],
                pe * (self.lindeman_efficiency ** trophic_levels)
            ),
        }


def verify_energy_pyramid(result: Dict, producer_energy: float = 10000.0) -> bool:
    a = Decimal(result["answer"]["top_level_energy"])
    expected = (Decimal(str(producer_energy)) * Decimal("0.1") ** 3)
    expected = expected.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return a == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_003  -  Water Resources: Rainwater Harvesting Sizing
# ══════════════════════════════════════════════════════════════════════
@register
class RainwaterHarvestingSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_003"

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self.runoff_coefficients = {
            "concrete": Decimal("0.85"),
            "tile": Decimal("0.75"),
            "corrugated_metal": Decimal("0.90"),
            "thatch": Decimal("0.30"),
            "tiled_roof": Decimal("0.80"),
        }

    def _solve(self, roof_area: Decimal, rainfall: Decimal,
               runoff_coeff: Decimal, persons: int,
               demand_per_person: Decimal, days: int) -> Dict[str, Decimal]:
        catchment = roof_area * rainfall * runoff_coeff
        catchment = catchment.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        demand = Decimal(str(persons)) * demand_per_person * Decimal(str(days))
        demand = demand.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        adequacy = ((catchment / demand) * Decimal("100")
                    ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        tank_size = demand.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "catchment_volume": catchment,
            "demand_volume": demand,
            "adequacy_percent": adequacy,
            "recommended_tank_litres": tank_size,
        }

    def solve(self, roof_area: float = 100.0, rainfall: float = 800.0,
              surface_type: str = "concrete", persons: int = 5,
              demand_per_person: float = 135.0, days: int = 365,
              **kwargs) -> Dict[str, Any]:
        ra = Decimal(str(roof_area))
        rf = Decimal(str(rainfall))
        coeff = self.runoff_coefficients.get(
            surface_type, Decimal("0.80"))
        dpp = Decimal(str(demand_per_person))
        steps = [
            f"Roof area: {roof_area} m²",
            f"Annual rainfall: {rainfall} mm = {rainfall / 1000} m",
            f"Surface type: {surface_type} → Runoff coefficient: {coeff}",
            f"Persons: {persons}, Demand: {demand_per_person} L/person/day",
            f"Period: {days} days",
            f"Formula: Catchment = Area × Rainfall × RunoffCoeff",
        ]
        result = self._solve(ra, rf, coeff, persons, dpp, days)
        steps.append(
            f"Catchment volume = {roof_area} × {rainfall/1000} × {coeff}"
            f" = {result['catchment_volume']} m³"
        )
        steps.append(
            f"Demand volume = {persons} × {demand_per_person} × {days}"
            f" = {result['demand_volume']} L"
        )
        steps.append(
            f"Adequacy = {result['catchment_volume'] * 1000} / {result['demand_volume']}"
            f" × 100 = {result['adequacy_percent']}%"
        )
        status = "Sufficient" if result["adequacy_percent"] >= 100 else "Insufficient - augmentation needed"
        steps.append(f"Status: {status}")
        return {
            "answer": {
                "catchment_volume_m3": str(result["catchment_volume"]),
                "catchment_volume_litres": str(
                    (result["catchment_volume"] * Decimal("1000"))
                    .quantize(Decimal("1"), rounding=ROUND_HALF_UP)
                ),
                "demand_volume_litres": str(result["demand_volume"]),
                "adequacy_percent": str(result["adequacy_percent"]),
                "recommended_tank_litres": str(result["recommended_tank_litres"]),
                "status": status,
            },
            "steps": steps,
            "verification": self._verify(
                result["catchment_volume"],
                ra * rf / Decimal("1000") * coeff
            ),
        }


def verify_rainwater_harvesting(result: Dict, roof_area: float = 100.0,
                                rainfall: float = 800.0,
                                surface_type: str = "concrete") -> bool:
    coeff_map = {"concrete": Decimal("0.85"), "tile": Decimal("0.75"),
                 "corrugated_metal": Decimal("0.90"),
                 "thatch": Decimal("0.30"), "tiled_roof": Decimal("0.80")}
    expected = (Decimal(str(roof_area)) *
                Decimal(str(rainfall)) / Decimal("1000") *
                coeff_map.get(surface_type, Decimal("0.80")))
    expected = expected.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    actual = Decimal(result["answer"]["catchment_volume_m3"])
    return actual == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_004  -  Air Pollution: AQI Classification & Health Impact
# ══════════════════════════════════════════════════════════════════════
@register
class AQISolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_004"

    BREAKPOINTS = [
        (0, 50, "Good", "Minimal impact"),
        (51, 100, "Satisfactory", "Minor breathing discomfort to sensitive persons"),
        (101, 200, "Moderately polluted",
         "Breathing discomfort to people with lung disease"),
        (201, 300, "Poor",
         "Breathing discomfort to most people on prolonged exposure"),
        (301, 400, "Very Poor",
         "Respiratory illness on prolonged exposure"),
        (401, 500, "Severe",
         "Affects healthy people, serious impact on patients"),
    ]

    def _solve(self, aqi_value: int) -> Tuple[str, str]:
        for lo, hi, category, health in self.BREAKPOINTS:
            if lo <= aqi_value <= hi:
                return category, health
        return "Beyond Index", "Health warning of emergency conditions"

    def solve(self, aqi_value: int = 150, **kwargs) -> Dict[str, Any]:
        category, health = self._solve(aqi_value)
        pm25 = max(0, (aqi_value * Decimal("0.5"))
                   .quantize(Decimal("0.1"), rounding=ROUND_HALF_UP))
        pm10 = max(0, (aqi_value * Decimal("0.8"))
                   .quantize(Decimal("0.1"), rounding=ROUND_HALF_UP))
        steps = [
            f"Given AQI value: {aqi_value}",
            "AQI breakpoint classification:",
        ]
        for lo, hi, cat, _ in self.BREAKPOINTS:
            marker = " ◄" if lo <= aqi_value <= hi else ""
            steps.append(f"  {lo}-{hi}: {cat}{marker}")
        steps.append(f"Category: {category}")
        steps.append(f"Health Impact: {health}")
        steps.append(
            f"Estimated PM2.5: ~{pm25} µg/m³  |  "
            f"Estimated PM10: ~{pm10} µg/m³"
        )
        precautions = {
            "Good": "No precautions needed. Enjoy outdoor activities.",
            "Satisfactory": "Acceptable air quality.",
            "Moderately polluted":
                "Limit prolonged outdoor exertion. Sensitive groups at risk.",
            "Poor":
                "Avoid outdoor activities. Use masks if going outside.",
            "Very Poor":
                "Stay indoors. Use air purifiers. Avoid physical exertion.",
            "Severe":
                "Emergency health alert. Stay indoors. Avoid all outdoor activity.",
            "Beyond Index":
                "Evacuate if possible. Emergency measures only.",
        }
        steps.append(f"Precaution: {precautions.get(category, 'N/A')}")
        return {
            "answer": {
                "aqi": aqi_value,
                "category": category,
                "health_impact": health,
                "estimated_pm25": str(pm25),
                "estimated_pm10": str(pm10),
                "precaution": precautions.get(category, "N/A"),
            },
            "steps": steps,
            "verification": self._verify(
                self._solve(aqi_value)[0],
                ("Poor" if 101 <= aqi_value <= 200 else
                 "Very Poor" if 201 <= aqi_value <= 300 else
                 "Severe" if aqi_value >= 301 else
                 "Good" if aqi_value <= 50 else "Satisfactory")
            ),
        }


def verify_aqi(result: Dict, aqi_value: int = 150) -> bool:
    expected = ("Poor" if 101 <= aqi_value <= 200 else
                "Very Poor" if 201 <= aqi_value <= 300 else
                "Severe" if aqi_value >= 301 else
                "Good" if aqi_value <= 50 else "Satisfactory")
    return result["answer"]["category"] == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_005  -  Waste Management: Material Recovery Rate
# ══════════════════════════════════════════════════════════════════════
@register
class WasteManagementSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_005"

    COMPOSITION = {
        "organic": Decimal("0.51"),
        "recyclable_paper": Decimal("0.09"),
        "recyclable_plastic": Decimal("0.08"),
        "recyclable_metal": Decimal("0.03"),
        "recyclable_glass": Decimal("0.04"),
        "e_waste": Decimal("0.02"),
        "hazardous": Decimal("0.03"),
        "inert": Decimal("0.20"),
    }

    RECOVERY_RATES = {
        "organic": Decimal("0.60"),
        "recyclable_paper": Decimal("0.85"),
        "recyclable_plastic": Decimal("0.70"),
        "recyclable_metal": Decimal("0.90"),
        "recyclable_glass": Decimal("0.80"),
        "e_waste": Decimal("0.65"),
        "hazardous": Decimal("0.40"),
        "inert": Decimal("0.10"),
    }

    def _solve(self, total_waste_tons: Decimal,
               composition: Dict[str, Decimal],
               recovery_rates: Dict[str, Decimal]
               ) -> Dict[str, Decimal]:
        recovered = Decimal("0")
        landfill = Decimal("0")
        breakdown = {}
        for waste_type, fraction in composition.items():
            amount = (total_waste_tons * fraction
                      ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            recovered_amt = (amount * recovery_rates.get(waste_type, Decimal("0.5"))
                             ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            landfilled = (amount - recovered_amt
                          ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            breakdown[waste_type] = {
                "total_tons": str(amount),
                "recovered_tons": str(recovered_amt),
                "landfilled_tons": str(landfilled),
            }
            recovered += recovered_amt
            landfill += landfilled
        overall_rate = ((recovered / total_waste_tons) * Decimal("100")
                        ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "total_waste": total_waste_tons,
            "total_recovered": recovered,
            "total_landfilled": landfill,
            "recovery_rate_percent": overall_rate,
            "breakdown": breakdown,
        }

    def solve(self, total_waste_tons: float = 500.0,
              **kwargs) -> Dict[str, Any]:
        tw = Decimal(str(total_waste_tons))
        steps = [
            f"Total municipal solid waste: {total_waste_tons} tonnes/day",
            "Waste composition and recovery:",
        ]
        result = self._solve(tw, self.COMPOSITION, self.RECOVERY_RATES)
        for wtype, data in result["breakdown"].items():
            pct = (Decimal(data["total_tons"]) / tw * 100
                   ).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
            steps.append(
                f"  {wtype}: {data['total_tons']} t ({pct}%) → "
                f"recovered: {data['recovered_tons']} t, "
                f"landfilled: {data['landfilled_tons']} t"
            )
        steps.append(
            f"Total recovered: {result['total_recovered']} t/day "
            f"({result['recovery_rate_percent']}%)"
        )
        steps.append(
            f"Total landfilled: {result['total_landfilled']} t/day"
        )
        steps.append(
            f"Zero-waste gap to close: {result['total_landfilled']} t/day"
        )
        return {
            "answer": {
                "total_waste_tons": str(result["total_waste"]),
                "total_recovered_tons": str(result["total_recovered"]),
                "total_landfilled_tons": str(result["total_landfilled"]),
                "recovery_rate_percent": str(result["recovery_rate_percent"]),
                "breakdown": result["breakdown"],
            },
            "steps": steps,
            "verification": self._verify(
                result["total_recovered"] + result["total_landfilled"],
                tw
            ),
        }


def verify_waste_management(result: Dict, total_waste_tons: float = 500.0) -> bool:
    recovered = Decimal(result["answer"]["total_recovered_tons"])
    landfilled = Decimal(result["answer"]["total_landfilled_tons"])
    total = Decimal(str(total_waste_tons))
    return (recovered + landfilled - total).copy_abs() < Decimal("0.01")


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_006  -  Climate Change: Carbon Footprint Calculation
# ══════════════════════════════════════════════════════════════════════
@register
class CarbonFootprintSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_006"

    EMISSION_FACTORS = {
        "electricity_kwh": Decimal("0.82"),   # kg CO₂ per kWh (India avg)
        "lpg_cylinder": Decimal("14.2"),       # kg CO₂ per 14.2 kg cylinder
        "petrol_litre": Decimal("2.31"),        # kg CO₂ per litre petrol
        "diesel_litre": Decimal("2.68"),         # kg CO₂ per litre diesel
        "natural_gas_m3": Decimal("2.02"),      # kg CO₂ per m³
        "flight_short_km": Decimal("0.255"),    # kg CO₂ per km (short haul)
        "beef_meal": Decimal("6.61"),           # kg CO₂ per meal
        "vegetarian_meal": Decimal("1.70"),     # kg CO₂ per meal
    }

    TREES_PER_TON = Decimal("16.5")  # Trees needed to offset 1 tonne CO₂

    def __init__(self, seed: int = 42):
        super().__init__(seed)

    def _solve(self, activities: Dict[str, Decimal],
               emission_factors: Dict[str, Decimal]) -> Decimal:
        total = Decimal("0")
        for activity, value in activities.items():
            factor = emission_factors.get(activity, Decimal("0"))
            total += value * factor
        return total.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    def solve(self, electricity_kwh: float = 300.0,
              lpg_cylinders: float = 2.0,
              petrol_litres: float = 50.0,
              flight_km: float = 1000.0,
              **kwargs) -> Dict[str, Any]:
        activities = {
            "electricity_kwh": Decimal(str(electricity_kwh)),
            "lpg_cylinder": Decimal(str(lpg_cylinders)),
            "petrol_litre": Decimal(str(petrol_litres)),
            "flight_short_km": Decimal(str(flight_km)),
        }
        steps = [
            "Computing annual carbon footprint (CO₂ emissions in kg)...",
            f"Electricity: {electricity_kwh} kWh × 0.82 = "
            f"{Decimal(str(electricity_kwh)) * Decimal('0.82')} kg CO₂",
            f"LPG: {lpg_cylinders} cylinders × 14.2 = "
            f"{Decimal(str(lpg_cylinders)) * Decimal('14.2')} kg CO₂",
            f"Petrol: {petrol_litres} L × 2.31 = "
            f"{Decimal(str(petrol_litres)) * Decimal('2.31')} kg CO₂",
            f"Flights: {flight_km} km × 0.255 = "
            f"{Decimal(str(flight_km)) * Decimal('0.255')} kg CO₂",
        ]
        total_kg = self._solve(activities, self.EMISSION_FACTORS)
        total_tonnes = (total_kg / Decimal("1000")
                        ).quantize(Decimal("0.001"), rounding=ROUND_HALF_UP)
        trees_needed = (total_tonnes * self.TREES_PER_TON
                        ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        india_avg = Decimal("1.9")  # tonnes CO₂ per capita India
        comparison = ((total_tonnes / india_avg) * 100
                      ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        steps.append(f"Total CO₂ emissions: {total_kg} kg = {total_tonnes} tonnes/year")
        steps.append(f"Trees needed to offset: {trees_needed}")
        steps.append(
            f"India per-capita average: {india_avg} t/year -- "
            f"this is {comparison}% of average"
        )
        rating = ("Low" if total_tonnes < 2.0 else
                  "Below Average" if total_tonnes < 5.0 else
                  "Above Average" if total_tonnes < 15.0 else
                  "Very High")
        steps.append(f"Carbon footprint rating: {rating}")
        return {
            "answer": {
                "total_co2_kg": str(total_kg),
                "total_co2_tonnes": str(total_tonnes),
                "trees_to_offset": str(trees_needed),
                "india_comparison_percent": str(comparison),
                "rating": rating,
            },
            "steps": steps,
            "verification": self._verify(
                total_kg,
                Decimal(str(electricity_kwh)) * Decimal("0.82")
                + Decimal(str(lpg_cylinders)) * Decimal("14.2")
                + Decimal(str(petrol_litres)) * Decimal("2.31")
                + Decimal(str(flight_km)) * Decimal("0.255")
            ),
        }


def verify_carbon_footprint(result: Dict, **params) -> bool:
    a = Decimal(result["answer"]["total_co2_kg"])
    ek = Decimal(str(params.get("electricity_kwh", 300)))
    lc = Decimal(str(params.get("lpg_cylinders", 2)))
    pl = Decimal(str(params.get("petrol_litres", 50)))
    fk = Decimal(str(params.get("flight_km", 1000)))
    expected = (ek * Decimal("0.82") + lc * Decimal("14.2")
                + pl * Decimal("2.31") + fk * Decimal("0.255"))
    expected = expected.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return a == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_007  -  Biodiversity: Species Diversity Indices
# ══════════════════════════════════════════════════════════════════════
@register
class BiodiversitySolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_007"

    def _solve(self, species_counts: Dict[str, int]) -> Dict[str, Any]:
        total = sum(species_counts.values())
        if total == 0:
            return {"richness": 0, "evenness": 0.0,
                    "shannon_index": 0.0, "simpson_index": 0.0}
        S = len(species_counts)
        proportions = [n / total for n in species_counts.values()]
        shannon = -sum(
            (p * math.log(p) if p > 0 else 0) for p in proportions
        )
        simpson = sum(p ** 2 for p in proportions)
        max_shannon = math.log(S) if S > 1 else 1.0
        evenness = shannon / max_shannon if max_shannon > 0 else 0.0
        return {
            "richness": S,
            "total_individuals": total,
            "evenness": round(evenness, 4),
            "shannon_index": round(shannon, 4),
            "simpson_index": round(simpson, 4),
            "proportions": {
                sp: round(n / total, 4) for sp, n in species_counts.items()
            },
        }

    def solve(self, species_counts: Optional[Dict[str, int]] = None,
              **kwargs) -> Dict[str, Any]:
        if species_counts is None:
            random.seed(42)
            species_counts = {
                "Species_A": random.randint(10, 50),
                "Species_B": random.randint(5, 40),
                "Species_C": random.randint(3, 30),
                "Species_D": random.randint(1, 20),
                "Species_E": random.randint(1, 15),
            }
        steps = [
            "Given species counts:",
        ]
        for sp, cnt in species_counts.items():
            steps.append(f"  {sp}: {cnt} individuals")
        steps.append(f"Total individuals: {sum(species_counts.values())}")
        steps.append(f"Species Richness (S): {len(species_counts)}")
        result = self._solve(species_counts)
        steps.append(f"Shannon-Wiener Index (H'): {result['shannon_index']}")
        steps.append(f"Simpson's Index (D): {result['simpson_index']}")
        steps.append(f"Pielou's Evenness (J'): {result['evenness']}")
        h_prime = result["shannon_index"]
        if h_prime > 2.5:
            diversity_level = "Very High diversity"
        elif h_prime > 2.0:
            diversity_level = "High diversity"
        elif h_prime > 1.0:
            diversity_level = "Moderate diversity"
        elif h_prime > 0.0:
            diversity_level = "Low diversity"
        else:
            diversity_level = "No diversity"
        steps.append(f"Diversity assessment: {diversity_level}")
        dominant = max(species_counts, key=species_counts.get)
        steps.append(f"Dominant species: {dominant}")
        return {
            "answer": {
                "species_richness": result["richness"],
                "total_individuals": result["total_individuals"],
                "shannon_index": result["shannon_index"],
                "simpson_index": result["simpson_index"],
                "pielou_evenness": result["evenness"],
                "proportions": result["proportions"],
                "dominant_species": dominant,
                "diversity_level": diversity_level,
            },
            "steps": steps,
            "verification": self._verify(
                result["richness"], len(species_counts)
            ),
        }


def verify_biodiversity(result: Dict, **kwargs) -> bool:
    return result["answer"]["richness"] == len(
        result["answer"]["proportions"]
    )


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_008  -  Renewable Energy: Solar Panel Sizing
# ══════════════════════════════════════════════════════════════════════
@register
class SolarPanelSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_008"

    def __init__(self, seed: int = 42):
        super().__init__(seed)
        self.system_efficiency = Decimal("0.75")

    def _solve(self, daily_load_kwh: Decimal,
               peak_sun_hours: Decimal,
               panel_wattage: Decimal) -> Dict[str, Any]:
        num_panels = (daily_load_kwh / (panel_wattage / 1000 *
                                        peak_sun_hours * self.system_efficiency)
                      ).quantant(Decimal("0.01"), rounding=ROUND_HALF_UP)
        num_panels = max(num_panels, Decimal("1"))
        total_capacity = (num_panels * panel_wattage / 1000
                          ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        battery_ah = (daily_load_kwh * Decimal("1000") / Decimal("24")
                      ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        cost_per_kw = Decimal("45000")  # INR per kW
        total_cost = (total_capacity * cost_per_kw
                      ).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
        energy_per_day = (num_panels * panel_wattage / 1000 *
                          peak_sun_hours * self.system_efficiency
                          ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "num_panels": num_panels,
            "total_capacity_kw": total_capacity,
            "battery_ah": battery_ah,
            "total_cost_inr": total_cost,
            "daily_generation_kwh": energy_per_day,
            "surplus_kwh": (energy_per_day - daily_load_kwh
                            ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP),
        }

    def solve(self, daily_load_kwh: float = 5.0,
              peak_sun_hours: float = 5.5,
              panel_wattage: float = 400.0,
              **kwargs) -> Dict[str, Any]:
        dl = Decimal(str(daily_load_kwh))
        psh = Decimal(str(peak_sun_hours))
        pw = Decimal(str(panel_wattage))
        steps = [
            f"Daily energy requirement: {daily_load_kwh} kWh",
            f"Peak sun hours: {peak_sun_hours} hrs/day",
            f"Panel wattage: {panel_wattage} W",
            f"System efficiency: 75%",
            f"Formula: Panels = Load / (Panel_kW × PSH × Efficiency)",
            f"Energy per panel per day = {pw/1000} × {psh} × 0.75"
            f" = {(pw/1000 * psh * Decimal('0.75')).quantize(Decimal('0.01'))} kWh",
        ]
        result = self._solve(dl, psh, pw)
        steps.append(
            f"Number of panels needed: {result['num_panels']} → round up → "
            f"{int(result['num_panels'])} panels"
        )
        steps.append(f"Total capacity: {result['total_capacity_kw']} kW")
        steps.append(
            f"Battery bank (24V system): {result['battery_ah']} Ah"
        )
        steps.append(f"Estimated system cost: Rs.{result['total_cost_inr']:,}")
        steps.append(
            f"Daily generation: {result['daily_generation_kwh']} kWh"
        )
        surplus = result["surplus_kwh"]
        surplus_str = f"+{surplus}" if surplus > 0 else str(surplus)
        steps.append(f"Surplus/Deficit: {surplus_str} kWh/day")
        return {
            "answer": {
                "num_panels": str(result["num_panels"]),
                "num_panels_rounded_up": str(
                    int(result["num_panels"]) + (1 if result["num_panels"] % 1 > 0 else 0)
                    if float(result["num_panels"]) != int(float(result["num_panels"]))
                    else result["num_panels"]
                ),
                "total_capacity_kw": str(result["total_capacity_kw"]),
                "battery_ah_24v": str(result["battery_ah"]),
                "estimated_cost_inr": str(result["total_cost_inr"]),
                "daily_generation_kwh": str(result["daily_generation_kwh"]),
                "surplus_deficit_kwh": str(surplus),
            },
            "steps": steps,
            "verification": self._verify(
                result["total_capacity_kw"],
                (result["num_panels"] * pw / 1000).quantize(
                    Decimal("0.01"), rounding=ROUND_HALF_UP
                ),
            ),
        }


def verify_solar_panel(result: Dict, **params) -> bool:
    pw = Decimal(str(params.get("panel_wattage", 400)))
    num = Decimal(result["answer"]["num_panels"])
    expected = (num * pw / 1000).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return Decimal(result["answer"]["total_capacity_kw"]) == expected


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_009  -  Environmental Laws: MCQ Solver
# ══════════════════════════════════════════════════════════════════════
@register
class EnvironmentalLawSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_009"

    QUESTION_BANK = [
        {
            "id": "env_001",
            "question": "Which Act regulates the protection and improvement of the environment in India?",
            "options": {
                "A": "Water (Prevention and Control of Pollution) Act, 1974",
                "B": "Environment (Protection) Act, 1986",
                "C": "Air (Prevention and Control of Pollution) Act, 1981",
                "D": "Wildlife Protection Act, 1972",
            },
            "correct": "B",
            "explanation": "The Environment (Protection) Act, 1986 was enacted under Article 253 of the Constitution following the UN Conference on the Human Environment (Stockholm, 1972).",
        },
        {
            "id": "env_002",
            "question": "Under which schedule of the Indian Constitution were forests added by the 42nd Amendment?",
            "options": {
                "A": "Schedule VII, List II (State List)",
                "B": "Schedule VII, List III (Concurrent List)",
                "C": "Schedule VII, List I (Union List)",
                "D": "Schedule VII, List II, Entry 18",
            },
            "correct": "B",
            "explanation": "The 42nd Amendment (1976) moved Forests from State List to Concurrent List (Entry 17A) under Schedule VII, List III.",
        },
        {
            "id": "env_003",
            "question": "What is the full form of CPCB?",
            "options": {
                "A": "Central Pollution Control Board",
                "B": "Central Public Control Bureau",
                "C": "Central Pollution Control Bureau",
                "D": "Comprehensive Pollution Control Board",
            },
            "correct": "A",
            "explanation": "CPCB stands for Central Pollution Control Board, established in 1974 under the Water Act. It works with SPCBs (State Pollution Control Boards).",
        },
        {
            "id": "env_004",
            "question": "Which constitutional amendment added the directive principle for environmental protection (Article 48A)?",
            "options": {
                "A": "42nd Amendment",
                "B": "44th Amendment",
                "C": "73rd Amendment",
                "D": "86th Amendment",
            },
            "correct": "A",
            "explanation": "The 42nd Constitutional Amendment (1976) added Article 48A: 'The State shall endeavour to protect and improve the environment and to safeguard the forests and wildlife of the country.'",
        },
        {
            "id": "env_005",
            "question": "National Forest Policy of India recommends what percentage of forest cover for the country?",
            "options": {
                "A": "33%",
                "B": "50%",
                "C": "25%",
                "D": "66%",
            },
            "correct": "A",
            "explanation": "The National Forest Policy (1988) recommends that a minimum of 33% of the total land area should be under forest/tree cover.",
        },
    ]

    def _solve(self, question_id: str,
               selected_option: str) -> Dict[str, Any]:
        for q in self.QUESTION_BANK:
            if q["id"] == question_id:
                is_correct = selected_option.upper() == q["correct"]
                return {
                    "correct": q["correct"],
                    "selected": selected_option.upper(),
                    "is_correct": is_correct,
                    "explanation": q["explanation"],
                    "question": q["question"],
                    "all_options": q["options"],
                }
        return {"error": f"Question {question_id} not found"}

    def solve(self, question_index: int = 0,
              selected_option: str = "A",
              **kwargs) -> Dict[str, Any]:
        idx = max(0, min(question_index, len(self.QUESTION_BANK) - 1))
        q = self.QUESTION_BANK[idx]
        steps = [
            f"Loading question [{q['id']}]:",
            f"Q: {q['question']}",
            f"Options:",
        ]
        for letter, text in q["options"].items():
            marker = " (selected)" if letter == selected_option.upper() else ""
            marker += " (correct)" if letter == q["correct"] else ""
            steps.append(f"  {letter}. {text}{marker}")
        result = self._solve(q["id"], selected_option)
        steps.append(f"User selected: {selected_option.upper()}")
        steps.append(f"Correct answer: {q['correct']}")
        steps.append(f"Result: {'CORRECT ✓' if result['is_correct'] else 'INCORRECT ✗'}")
        steps.append(f"Explanation: {q['explanation']}")
        return {
            "answer": {
                "question_id": q["id"],
                "selected_option": selected_option.upper(),
                "correct_option": q["correct"],
                "is_correct": result["is_correct"],
                "explanation": q["explanation"],
            },
            "steps": steps,
            "verification": self._verify(
                result["is_correct"],
                selected_option.upper() == q["correct"]
            ),
        }

    def generate_question(self, index: int = 0) -> Dict[str, Any]:
        idx = max(0, min(index, len(self.QUESTION_BANK) - 1))
        q = self.QUESTION_BANK[idx]
        return {
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
            "type": "multiple_choice",
        }


def verify_env_law(result: Dict, **kwargs) -> bool:
    return result["answer"]["is_correct"] == (
        result["answer"]["selected_option"] == result["answer"]["correct_option"]
    )


# ══════════════════════════════════════════════════════════════════════
#  c10_evs_010  -  Sustainable Development: Ecological Footprint
# ══════════════════════════════════════════════════════════════════════
@register
class EcologicalFootprintSolver(BaseSolver):
    PROBLEM_TYPE = "c10_evs_010"

    YIELD_FACTORS = {
        "cropland": Decimal("2.51"),
        "grazing_land": Decimal("0.46"),
        "forest_land": Decimal("1.24"),
        "fishing_ground": Decimal("0.37"),
        "built_up_land": Decimal("2.79"),
        "carbon_land": Decimal("1.24"),
    }

    def _solve(self, consumption_data: Dict[str, Decimal],
               population: int) -> Dict[str, Any]:
        total_ef = Decimal("0")
        breakdown = {}
        for land_type, consumption in consumption_data.items():
            yield_factor = self.YIELD_FACTORS.get(
                land_type, Decimal("1.0"))
            adjusted = (consumption * yield_factor
                        ).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)
            breakdown[land_type] = {
                "consumption_gha": str(consumption),
                "yield_factor": str(yield_factor),
                "adjusted_gha": str(adjusted),
            }
            total_ef += adjusted
        per_capita = (total_ef / Decimal(str(population))
                      ).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)
        biocapacity = (Decimal("1.6")  # global average gha per capita
                       ).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)
        deficit = (per_capita - biocapacity
                   ).quantize(Decimal("0.0001"), rounding=ROUND_HALF_UP)
        deficit_pct = ((per_capita / biocapacity) * 100
                       ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        earths = (per_capita / Decimal("1.6")
                  ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "total_ef_gha": total_ef.quantize(Decimal("0.01")),
            "per_capita_ef_gha": per_capita,
            "biocapacity_gha": biocapacity,
            "ecological_deficit_gha": deficit,
            "deficit_percent": deficit_pct,
            "earths_needed": earths,
            "breakdown": breakdown,
        }

    def solve(self, population: int = 1000000,
              consumption_data: Optional[Dict[str, float]] = None,
              **kwargs) -> Dict[str, Any]:
        if consumption_data is None:
            random.seed(42)
            base = {
                "cropland": 0.25 + random.uniform(0, 0.1),
                "grazing_land": 0.05 + random.uniform(0, 0.05),
                "forest_land": 0.10 + random.uniform(0, 0.1),
                "fishing_ground": 0.05 + random.uniform(0, 0.05),
                "built_up_land": 0.10 + random.uniform(0, 0.05),
                "carbon_land": 0.80 + random.uniform(0, 0.3),
            }
            consumption_data = {k: round(v, 4) for k, v in base.items()}
        steps = [
            f"Population: {population:,}",
            "Land use consumption (global hectares per capita):",
        ]
        cd = {k: Decimal(str(v)) for k, v in consumption_data.items()}
        for lt, val in cd.items():
            steps.append(f"  {lt}: {val} gha")
        steps.append(
            "Applying yield factors to get biologically productive area..."
        )
        result = self._solve(cd, population)
        steps.append(
            f"Total ecological footprint: {result['total_ef_gha']} gha"
        )
        steps.append(
            f"Per capita footprint: {result['per_capita_ef_gha']} gha"
        )
        steps.append(
            f"Biocapacity available: {result['biocapacity_gha']} gha"
        )
        steps.append(
            f"Ecological deficit: {result['ecological_deficit_gha']} gha "
            f"({result['deficit_percent']}%)"
        )
        steps.append(
            f"Earths needed if everyone lived like this: {result['earths_needed']}"
        )
        verdict = (
            "Sustainable" if result["ecological_deficit_gha"] <= 0
            else "Unsustainable - ecological overshoot"
        )
        steps.append(f"Sustainability verdict: {verdict}")
        top_consumer = max(
            consumption_data, key=lambda k: float(consumption_data[k])
            * float(self.YIELD_FACTORS.get(k, Decimal("1.0")))
        )
        steps.append(f"Largest contributor: {top_consumer}")
        return {
            "answer": {
                "total_ef_gha": str(result["total_ef_gha"]),
                "per_capita_ef_gha": str(result["per_capita_ef_gha"]),
                "biocapacity_gha": str(result["biocapacity_gha"]),
                "ecological_deficit_gha": str(result["ecological_deficit_gha"]),
                "deficit_percent": str(result["deficit_percent"]),
                "earths_needed": str(result["earths_needed"]),
                "verdict": verdict,
                "largest_contributor": top_consumer,
                "breakdown": result["breakdown"],
            },
            "steps": steps,
            "verification": self._verify(
                result["total_ef_gha"],
                sum(
                    cd[k] * self.YIELD_FACTORS.get(k, Decimal("1.0"))
                    for k in cd
                ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            ),
        }


def verify_ecological_footprint(result: Dict, **kwargs) -> bool:
    breakdown = result["answer"]["breakdown"]
    total = sum(
        Decimal(v["adjusted_gha"]) for v in breakdown.values()
    )
    return abs(total - Decimal(result["answer"]["total_ef_gha"])) < Decimal("0.01")


# ══════════════════════════════════════════════════════════════════════
#  Question Generator
# ══════════════════════════════════════════════════════════════════════
class QuestionGenerator:
    """Generates CISCE Class 10 EVS questions with seeded reproducibility."""

    PROBLEM_TYPES = [
        "c10_evs_001", "c10_evs_002", "c10_evs_003",
        "c10_evs_004", "c10_evs_005", "c10_evs_006",
        "c10_evs_007", "c10_evs_008", "c10_evs_009", "c10_evs_010",
    ]

    def __init__(self, seed: int = 42):
        self.seed = seed

    def generate(self, problem_type: str,
                 difficulty: str = "medium") -> Dict[str, Any]:
        random.seed(self.seed)
        if problem_type not in SOLVER_REGISTRY:
            raise ValueError(f"Unknown problem type: {problem_type}")
        solver = SOLVER_REGISTRY[problem_type](seed=self.seed)
        result = solver.solve()
        result["problem_type"] = problem_type
        result["difficulty"] = difficulty
        return result

    def generate_batch(self, count: int = 10,
                       seed: Optional[int] = None) -> List[Dict[str, Any]]:
        if seed is not None:
            random.seed(seed)
        results = []
        for i in range(count):
            ptype = self.PROBLEM_TYPES[i % len(self.PROBLEM_TYPES)]
            solver_cls = SOLVER_REGISTRY[ptype]
            solver = solver_cls(seed=seed if seed else self.seed + i)
            result = solver.solve()
            result["problem_type"] = ptype
            results.append(result)
        return results


# ══════════════════════════════════════════════════════════════════════
#  Self-Test
# ══════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("=" * 70)
    print("CISCE Class 10 EVS - Deterministic Solver & Question Generator")
    print("Self-Test Suite")
    print("=" * 70)
    all_passed = True
    test_count = 0
    passed_count = 0

    test_cases = [
        ("c10_evs_001", WaterFootprintSolver,
         lambda r: verify_water_footprint(r), {}),
        ("c10_evs_002", EnergyPyramidSolver,
         lambda r: verify_energy_pyramid(r), {}),
        ("c10_evs_003", RainwaterHarvestingSolver,
         lambda r: verify_rainwater_harvesting(r), {}),
        ("c10_evs_004", AQISolver,
         lambda r: verify_aqi(r, 150), {}),
        ("c10_evs_005", WasteManagementSolver,
         lambda r: verify_waste_management(r), {}),
        ("c10_evs_006", CarbonFootprintSolver,
         lambda r: verify_carbon_footprint(r), {}),
        ("c10_evs_007", BiodiversitySolver,
         lambda r: verify_biodiversity(r), {}),
        ("c10_evs_008", SolarPanelSolver,
         lambda r: verify_solar_panel(r), {}),
        ("c10_evs_009", EnvironmentalLawSolver,
         lambda r: verify_env_law(r), {}),
        ("c10_evs_010", EcologicalFootprintSolver,
         lambda r: verify_ecological_footprint(r), {}),
    ]

    for ptype, cls, verify_fn, kwargs in test_cases:
        test_count += 1
        solver = cls(seed=42)
        result = solver.solve(**kwargs)
        try:
            passed = verify_fn(result)
        except Exception as e:
            passed = False
            print(f"  EXCEPTION in {ptype}: {e}")
        status = "PASS" if passed else "FAIL"
        if not passed:
            all_passed = False
        if passed:
            passed_count += 1
        answer_summary = str(result["answer"])[:80]
        print(f"\n[{status}] {ptype}")
        print(f"   Class: {cls.__name__}")
        print(f"   Answer: {answer_summary}...")
        print(f"   Verification: {result['verification']}")

    print("\n" + "=" * 70)
    print(f"Results: {passed_count}/{test_count} tests passed")
    if all_passed:
        print("ALL TESTS PASSED ✓")
    else:
        print("SOME TESTS FAILED ✗")
    print("=" * 70)

    # Batch generation test
    print("\n--- Batch Generation Test (3 questions) ---")
    gen = QuestionGenerator(seed=100)
    batch = gen.generate_batch(count=3, seed=100)
    for i, q in enumerate(batch):
        print(f"\n  Q{i+1} [{q['problem_type']}]: {q['steps'][0][:60]}...")

    # Registry report
    print(f"\n--- Registry: {len(SOLVER_REGISTRY)} solvers registered ---")
    for key in sorted(SOLVER_REGISTRY):
        print(f"  {key}: {SOLVER_REGISTRY[key].__name__}")