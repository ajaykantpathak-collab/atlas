/* ═══════════════════════════════════════════════════════════════════════════
   gameRegistry.ts — Maps CISCE node IDs to interactive game components.
   Used by the living world to launch the right game when a topic is tapped.

   Games that cover multiple nodes map ALL their nodes to the same component.
   The game's teaching intro covers all bundled nodes.
   ═══════════════════════════════════════════════════════════════════════════ */

import dynamic from 'next/dynamic'

// ─── Game metadata ────────────────────────────────────────────

export interface GameMeta {
  id: string
  name: string
  emoji: string
  color: string
  nodeIds: string[]
  subject: string
  classLevel: number
  component: React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
}

// ─── Lazy-loaded game components ──────────────────────────────

const CountingGame = dynamic(() => import('@/components/simulations/class1/CountingGame').then(m => m.CountingGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const ShapeSortGame = dynamic(() => import('@/components/simulations/class1/ShapeSortGame').then(m => m.ShapeSortGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const AdditionGame = dynamic(() => import('@/components/simulations/class1/AdditionGame').then(m => m.AdditionGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const BalanceGame = dynamic(() => import('@/components/simulations/class1/BalanceGame').then(m => m.BalanceGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const PatternsGame = dynamic(() => import('@/components/simulations/class1/PatternsGame').then(m => m.PatternsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const AnimalsGame = dynamic(() => import('@/components/simulations/class1/AnimalsGame').then(m => m.AnimalsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const PlantsGame = dynamic(() => import('@/components/simulations/class1/PlantsGame').then(m => m.PlantsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const FoodGame = dynamic(() => import('@/components/simulations/class1/FoodGame').then(m => m.FoodGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const SafetyGame = dynamic(() => import('@/components/simulations/class1/SafetyGame').then(m => m.SafetyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const CleanlinessGame = dynamic(() => import('@/components/simulations/class1/CleanlinessGame').then(m => m.CleanlinessGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const AirGame = dynamic(() => import('@/components/simulations/class1/AirGame').then(m => m.AirGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const TransportGame = dynamic(() => import('@/components/simulations/class1/TransportGame').then(m => m.TransportGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const SunMoonGame = dynamic(() => import('@/components/simulations/class1/SunMoonGame').then(m => m.SunMoonGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const WaterGame = dynamic(() => import('@/components/simulations/class1/WaterGame').then(m => m.WaterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const BodyGame = dynamic(() => import('@/components/simulations/class1/BodyGame').then(m => m.BodyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const PlantTypesGame = dynamic(() => import('@/components/simulations/class1/PlantTypesGame').then(m => m.PlantTypesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const AnimalTypesGame = dynamic(() => import('@/components/simulations/class1/AnimalTypesGame').then(m => m.AnimalTypesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const EarthGame = dynamic(() => import('@/components/simulations/class1/EarthWeatherGame').then(m => m.EarthWeatherGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const NeighbourhoodGame = dynamic(() => import('@/components/simulations/class1/NeighbourhoodGame').then(m => m.NeighbourhoodGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

const ComputerBasicsGame = dynamic(() => import('@/components/simulations/class1/ComputerBasicsGame').then(m => m.ComputerBasicsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const ComputerInputGame = dynamic(() => import('@/components/simulations/class1/ComputerInputGame').then(m => m.ComputerInputGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

// ─── Class 2 game components ──────────────────────────────────

const C2BodyFunctionsGame = dynamic(() => import('@/components/simulations/class2/BodyFunctionsGame').then(m => m.BodyFunctionsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2FoodGroupsGame = dynamic(() => import('@/components/simulations/class2/FoodGroupsGame').then(m => m.FoodGroupsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2PlantsGame = dynamic(() => import('@/components/simulations/class2/PlantsGame').then(m => m.PlantsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2AnimalsGame = dynamic(() => import('@/components/simulations/class2/AnimalsGame').then(m => m.AnimalsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2AirCleanGame = dynamic(() => import('@/components/simulations/class2/AirCleanGame').then(m => m.AirCleanGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2WaterGame = dynamic(() => import('@/components/simulations/class2/WaterGame').then(m => m.WaterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2ComputerBasicsGame = dynamic(() => import('@/components/simulations/class2/ComputerBasicsGame').then(m => m.ComputerBasicsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2ComputerFilesGame = dynamic(() => import('@/components/simulations/class2/ComputerFilesGame').then(m => m.ComputerFilesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2MyEnvironmentGame = dynamic(() => import('@/components/simulations/class2/MyEnvironmentGame').then(m => m.MyEnvironmentGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2SafetyCleanGame = dynamic(() => import('@/components/simulations/class2/SafetyCleanGame').then(m => m.SafetyCleanGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2EarthSunGame = dynamic(() => import('@/components/simulations/class2/EarthSunGame').then(m => m.EarthSunGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2DirectionsMapGame = dynamic(() => import('@/components/simulations/class2/DirectionsMapGame').then(m => m.DirectionsMapGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2NumbersGame = dynamic(() => import('@/components/simulations/class2/NumbersGame').then(m => m.NumbersGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2AddSubGame = dynamic(() => import('@/components/simulations/class2/AddSubGame').then(m => m.AddSubGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2MulDivGame = dynamic(() => import('@/components/simulations/class2/MulDivGame').then(m => m.MulDivGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2ShapesLinesGame = dynamic(() => import('@/components/simulations/class2/ShapesLinesGame').then(m => m.ShapesLinesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2MeasurementGame = dynamic(() => import('@/components/simulations/class2/MeasurementGame').then(m => m.MeasurementGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2PatternsGame = dynamic(() => import('@/components/simulations/class2/PatternsGame').then(m => m.PatternsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2AirVehiclesGame = dynamic(() => import('@/components/simulations/class2/AirVehiclesGame').then(m => m.AirVehiclesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C2SolarSystemGame = dynamic(() => import('@/components/simulations/class2/SolarSystemGame').then(m => m.SolarSystemGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

// ─── Class 3 dynamic imports ───
const C3LivingThingsGame = dynamic(() => import('@/components/simulations/class3/LivingThingsGame').then(m => m.LivingThingsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3BirdsGame = dynamic(() => import('@/components/simulations/class3/BirdsGame').then(m => m.BirdsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3InsectsGame = dynamic(() => import('@/components/simulations/class3/InsectsGame').then(m => m.InsectsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3PlantsGame = dynamic(() => import('@/components/simulations/class3/PlantsGame').then(m => m.PlantsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3PlantUsesGame = dynamic(() => import('@/components/simulations/class3/PlantUsesGame').then(m => m.PlantUsesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3HealthGame = dynamic(() => import('@/components/simulations/class3/HealthGame').then(m => m.HealthGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3MatterGame = dynamic(() => import('@/components/simulations/class3/MatterGame').then(m => m.MatterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3WaterSunGame = dynamic(() => import('@/components/simulations/class3/WaterSunGame').then(m => m.WaterSunGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3ComputerSystemGame = dynamic(() => import('@/components/simulations/class3/ComputerSystemGame').then(m => m.ComputerSystemGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3WindowsWordGame = dynamic(() => import('@/components/simulations/class3/WindowsWordGame').then(m => m.WindowsWordGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3InternetGame = dynamic(() => import('@/components/simulations/class3/InternetGame').then(m => m.InternetGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3PaintFilesGame = dynamic(() => import('@/components/simulations/class3/PaintFilesGame').then(m => m.PaintFilesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3LivingEVSGame = dynamic(() => import('@/components/simulations/class3/LivingEVSGame').then(m => m.LivingEVSGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3EarthSkyGame = dynamic(() => import('@/components/simulations/class3/EarthSkyGame').then(m => m.EarthSkyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3FoodShelterGame = dynamic(() => import('@/components/simulations/class3/FoodShelterGame').then(m => m.FoodShelterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3GlobeGame = dynamic(() => import('@/components/simulations/class3/GlobeGame').then(m => m.GlobeGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3ContinentsGame = dynamic(() => import('@/components/simulations/class3/ContinentsGame').then(m => m.ContinentsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3DirectionsMapsGame = dynamic(() => import('@/components/simulations/class3/DirectionsMapsGame').then(m => m.DirectionsMapsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3LandformsGame = dynamic(() => import('@/components/simulations/class3/LandformsGame').then(m => m.LandformsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3ResourcesGame = dynamic(() => import('@/components/simulations/class3/ResourcesGame').then(m => m.ResourcesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3FloatSinkGame = dynamic(() => import('@/components/simulations/class3/FloatSinkGame').then(m => m.FloatSinkGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3SunEnergyGame = dynamic(() => import('@/components/simulations/class3/SunEnergyGame').then(m => m.SunEnergyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3NumbersGame = dynamic(() => import('@/components/simulations/class3/NumbersGame').then(m => m.NumbersGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3AddSubGame = dynamic(() => import('@/components/simulations/class3/AddSubGame').then(m => m.AddSubGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3MulDivGame = dynamic(() => import('@/components/simulations/class3/MulDivGame').then(m => m.MulDivGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3MentalMathGame = dynamic(() => import('@/components/simulations/class3/MentalMathGame').then(m => m.MentalMathGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3ShapesTessellationGame = dynamic(() => import('@/components/simulations/class3/ShapesTessellationGame').then(m => m.ShapesTessellationGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3MapsLengthGame = dynamic(() => import('@/components/simulations/class3/MapsLengthGame').then(m => m.MapsLengthGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3WeightCapacityGame = dynamic(() => import('@/components/simulations/class3/WeightCapacityGame').then(m => m.WeightCapacityGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3TimeCalendarGame = dynamic(() => import('@/components/simulations/class3/TimeCalendarGame').then(m => m.TimeCalendarGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C3DataPatternsGame = dynamic(() => import('@/components/simulations/class3/DataPatternsGame').then(m => m.DataPatternsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

// ─── Class 4 dynamic imports ───
const C4FoodTeethGame = dynamic(() => import('@/components/simulations/class4/FoodTeethGame').then(m => m.FoodTeethGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4DigestionGame = dynamic(() => import('@/components/simulations/class4/DigestionGame').then(m => m.DigestionGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4AdaptationsGame = dynamic(() => import('@/components/simulations/class4/AdaptationsGame').then(m => m.AdaptationsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4PlantsAirGame = dynamic(() => import('@/components/simulations/class4/PlantsAirGame').then(m => m.PlantsAirGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4SkinNervousGame = dynamic(() => import('@/components/simulations/class4/SkinNervousGame').then(m => m.SkinNervousGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4MatterAirGame = dynamic(() => import('@/components/simulations/class4/MatterAirGame').then(m => m.MatterAirGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4SolutionsFloatGame = dynamic(() => import('@/components/simulations/class4/SolutionsFloatGame').then(m => m.SolutionsFloatGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4NumbersGame = dynamic(() => import('@/components/simulations/class4/NumbersGame').then(m => m.NumbersGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4FractionsGame = dynamic(() => import('@/components/simulations/class4/FractionsGame').then(m => m.FractionsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4OperationsGame = dynamic(() => import('@/components/simulations/class4/OperationsGame').then(m => m.OperationsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4FactorsMultiplesGame = dynamic(() => import('@/components/simulations/class4/FactorsMultiplesGame').then(m => m.FactorsMultiplesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4ShapesSymmetryGame = dynamic(() => import('@/components/simulations/class4/ShapesSymmetryGame').then(m => m.ShapesSymmetryGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4LinesMeasurementGame = dynamic(() => import('@/components/simulations/class4/LinesMeasurementGame').then(m => m.LinesMeasurementGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4TimeDataPatternsGame = dynamic(() => import('@/components/simulations/class4/TimeDataPatternsGame').then(m => m.TimeDataPatternsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4LightGame = dynamic(() => import('@/components/simulations/class4/LightGame').then(m => m.LightGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4MeasurementGame = dynamic(() => import('@/components/simulations/class4/MeasurementGame').then(m => m.MeasurementGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4ForceFrictionGame = dynamic(() => import('@/components/simulations/class4/ForceFrictionGame').then(m => m.ForceFrictionGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4ComputerMemoryGame = dynamic(() => import('@/components/simulations/class4/ComputerMemoryGame').then(m => m.ComputerMemoryGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4WordFormattingGame = dynamic(() => import('@/components/simulations/class4/WordFormattingGame').then(m => m.WordFormattingGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4InternetBrowserGame = dynamic(() => import('@/components/simulations/class4/InternetBrowserGame').then(m => m.InternetBrowserGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4PowerPointGame = dynamic(() => import('@/components/simulations/class4/PowerPointGame').then(m => m.PowerPointGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4AlgorithmsLogoGame = dynamic(() => import('@/components/simulations/class4/AlgorithmsLogoGame').then(m => m.AlgorithmsLogoGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4LivingPlantsGame = dynamic(() => import('@/components/simulations/class4/LivingPlantsGame').then(m => m.LivingPlantsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4ChangesTransportGame = dynamic(() => import('@/components/simulations/class4/ChangesTransportGame').then(m => m.ChangesTransportGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4EarthMotionsGame = dynamic(() => import('@/components/simulations/class4/EarthMotionsGame').then(m => m.EarthMotionsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4ContinentsOceansGame = dynamic(() => import('@/components/simulations/class4/ContinentsOceansGame').then(m => m.ContinentsOceansGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4MapsIndiaGame = dynamic(() => import('@/components/simulations/class4/MapsIndiaGame').then(m => m.MapsIndiaGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C4IndiaClimateGame = dynamic(() => import('@/components/simulations/class4/IndiaClimateGame').then(m => m.IndiaClimateGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

// ─── Class 5 dynamic imports ───
const C5LargeNumbersGame = dynamic(() => import('@/components/simulations/class5/LargeNumbersGame').then(m => m.LargeNumbersGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5LargeOperationsGame = dynamic(() => import('@/components/simulations/class5/LargeOperationsGame').then(m => m.LargeOperationsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5FractionsAdvancedGame = dynamic(() => import('@/components/simulations/class5/FractionsAdvancedGame').then(m => m.FractionsAdvancedGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5DecimalsGame = dynamic(() => import('@/components/simulations/class5/DecimalsGame').then(m => m.DecimalsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5FactorsMultiGame = dynamic(() => import('@/components/simulations/class5/FactorsMultiGame').then(m => m.FactorsMultiGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5IntegersGame = dynamic(() => import('@/components/simulations/class5/IntegersGame').then(m => m.IntegersGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5AnglesSymmetryGame = dynamic(() => import('@/components/simulations/class5/AnglesSymmetryGame').then(m => m.AnglesSymmetryGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5AreaPerimeterGame = dynamic(() => import('@/components/simulations/class5/AreaPerimeterGame').then(m => m.AreaPerimeterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5PercentageDataGame = dynamic(() => import('@/components/simulations/class5/PercentageDataGame').then(m => m.PercentageDataGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5CirculatoryGame = dynamic(() => import('@/components/simulations/class5/CirculatoryGame').then(m => m.CirculatoryGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5SkeletalGame = dynamic(() => import('@/components/simulations/class5/SkeletalGame').then(m => m.SkeletalGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5HealthDiseasesGame = dynamic(() => import('@/components/simulations/class5/HealthDiseasesGame').then(m => m.HealthDiseasesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5PlantReproductionGame = dynamic(() => import('@/components/simulations/class5/PlantReproductionGame').then(m => m.PlantReproductionGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5EcosystemWasteGame = dynamic(() => import('@/components/simulations/class5/EcosystemWasteGame').then(m => m.EcosystemWasteGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5AgricultureHygieneGame = dynamic(() => import('@/components/simulations/class5/AgricultureHygieneGame').then(m => m.AgricultureHygieneGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5StatesMatterGame = dynamic(() => import('@/components/simulations/class5/StatesMatterGame').then(m => m.StatesMatterGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5MixturesSeparationGame = dynamic(() => import('@/components/simulations/class5/MixturesSeparationGame').then(m => m.MixturesSeparationGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5ChangesAirGame = dynamic(() => import('@/components/simulations/class5/ChangesAirGame').then(m => m.ChangesAirGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5SoundNoiseGame = dynamic(() => import('@/components/simulations/class5/SoundNoiseGame').then(m => m.SoundNoiseGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5WorkEnergyGame = dynamic(() => import('@/components/simulations/class5/WorkEnergyGame').then(m => m.WorkEnergyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5LightEclipseGame = dynamic(() => import('@/components/simulations/class5/LightEclipseGame').then(m => m.LightEclipseGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5SimpleMachinesGame = dynamic(() => import('@/components/simulations/class5/SimpleMachinesGame').then(m => m.SimpleMachinesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5ComputerHistoryGame = dynamic(() => import('@/components/simulations/class5/ComputerHistoryGame').then(m => m.ComputerHistoryGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5SoftwareGame = dynamic(() => import('@/components/simulations/class5/SoftwareGame').then(m => m.SoftwareGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5WordAdvancedGame = dynamic(() => import('@/components/simulations/class5/WordAdvancedGame').then(m => m.WordAdvancedGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5PowerPointScratchGame = dynamic(() => import('@/components/simulations/class5/PowerPointScratchGame').then(m => m.PowerPointScratchGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5InternetLogoGame = dynamic(() => import('@/components/simulations/class5/InternetLogoGame').then(m => m.InternetLogoGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5LatLongGame = dynamic(() => import('@/components/simulations/class5/LatLongGame').then(m => m.LatLongGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5IndiaLocationGame = dynamic(() => import('@/components/simulations/class5/IndiaLocationGame').then(m => m.IndiaLocationGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5EnvironmentResourcesGame = dynamic(() => import('@/components/simulations/class5/EnvironmentResourcesGame').then(m => m.EnvironmentResourcesGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5EconomyGame = dynamic(() => import('@/components/simulations/class5/EconomyGame').then(m => m.EconomyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5EnvironmentBodyGame = dynamic(() => import('@/components/simulations/class5/EnvironmentBodyGame').then(m => m.EnvironmentBodyGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>
const C5WeatherBuildingsGame = dynamic(() => import('@/components/simulations/class5/WeatherBuildingsGame').then(m => m.WeatherBuildingsGame), { ssr: false }) as unknown as React.ComponentType<{ onComplete?: (score: number) => void; width?: number; height?: number }>

// ─── Game registry ────────────────────────────────────────────

export const GAMES: GameMeta[] = [
  // ── Maths ──
  { id: 'counting', name: 'Counting 1-20', emoji: '🍎', color: '#3B82F6', nodeIds: ['c1_math_001'], subject: 'maths', classLevel: 1, component: CountingGame },
  { id: 'shapes', name: 'Shape Sorting', emoji: '⬜', color: '#6366F1', nodeIds: ['c1_math_013', 'c1_math_016'], subject: 'maths', classLevel: 1, component: ShapeSortGame },
  { id: 'addition', name: 'Addition to 20', emoji: '➕', color: '#10B981', nodeIds: ['c1_math_010'], subject: 'maths', classLevel: 1, component: AdditionGame },
  { id: 'balance', name: 'Heavy or Light?', emoji: '⚖️', color: '#0EA5E9', nodeIds: ['c1_math_021'], subject: 'maths', classLevel: 1, component: BalanceGame },
  { id: 'patterns', name: 'Patterns', emoji: '🔴', color: '#A855F7', nodeIds: ['c1_math_027'], subject: 'maths', classLevel: 1, component: PatternsGame },

  // ── EVS ──
  { id: 'animals', name: 'Animals', emoji: '🐶', color: '#22C55E', nodeIds: ['c1_evs_003'], subject: 'evs', classLevel: 1, component: AnimalsGame },
  { id: 'plants', name: 'Plants', emoji: '🌳', color: '#16A34A', nodeIds: ['c1_evs_004'], subject: 'evs', classLevel: 1, component: PlantsGame },
  { id: 'food', name: 'Food & Health', emoji: '🍎', color: '#F97316', nodeIds: ['c1_evs_006'], subject: 'evs', classLevel: 1, component: FoodGame },
  { id: 'safety', name: 'Safety Rules', emoji: '🦺', color: '#3B82F6', nodeIds: ['c1_evs_009'], subject: 'evs', classLevel: 1, component: SafetyGame },
  { id: 'cleanliness', name: 'Cleanliness', emoji: '🧼', color: '#06B6D4', nodeIds: ['c1_evs_010'], subject: 'evs', classLevel: 1, component: CleanlinessGame },

  // ── Physics ──
  { id: 'air', name: 'Air & Wind', emoji: '💨', color: '#00BFFF', nodeIds: ['c1_phy_001', 'c1_phy_002', 'c1_phy_003'], subject: 'physics', classLevel: 1, component: AirGame },
  { id: 'transport', name: 'Transport', emoji: '🚗', color: '#F59E0B', nodeIds: ['c1_phy_004', 'c1_phy_005'], subject: 'physics', classLevel: 1, component: TransportGame },
  { id: 'sunmoon', name: 'Sun & Moon', emoji: '☀️', color: '#FBBF24', nodeIds: ['c1_phy_006', 'c1_phy_007', 'c1_phy_008'], subject: 'physics', classLevel: 1, component: SunMoonGame },

  // ── Chemistry ──
  { id: 'water', name: 'Water', emoji: '💧', color: '#39FF14', nodeIds: ['c1_chem_001', 'c1_chem_002', 'c1_chem_003', 'c1_chem_004'], subject: 'chem', classLevel: 1, component: WaterGame },

  // ── Biology ──
  { id: 'body', name: 'Body & Senses', emoji: '👤', color: '#FF6B9D', nodeIds: ['c1_bio_001', 'c1_bio_002', 'c1_bio_003'], subject: 'bio', classLevel: 1, component: BodyGame },
  { id: 'planttypes', name: 'Plant Types', emoji: '🌿', color: '#4ADE80', nodeIds: ['c1_bio_015', 'c1_bio_016', 'c1_bio_017'], subject: 'bio', classLevel: 1, component: PlantTypesGame },
  { id: 'animaltypes', name: 'Animal Types', emoji: '🦁', color: '#FB923C', nodeIds: ['c1_bio_019', 'c1_bio_020', 'c1_bio_021', 'c1_bio_022'], subject: 'bio', classLevel: 1, component: AnimalTypesGame },

  // ── Geography ──
  { id: 'earth', name: 'Earth & Weather', emoji: '🌍', color: '#FBBF24', nodeIds: ['c1_geo_001', 'c1_geo_005'], subject: 'geo', classLevel: 1, component: EarthGame },
  { id: 'neighbourhood', name: 'My Neighbourhood', emoji: '🏠', color: '#A78BFA', nodeIds: ['c1_geo_009', 'c1_geo_010'], subject: 'geo', classLevel: 1, component: NeighbourhoodGame },

  // ── Computer Science ──
  { id: 'compbasics', name: 'Computer Basics', emoji: '💻', color: '#60A5FA', nodeIds: ['c1_cs_001', 'c1_cs_002', 'c1_cs_003', 'c1_cs_004', 'c1_cs_005'], subject: 'cs', classLevel: 1, component: ComputerBasicsGame },
  { id: 'compinput', name: 'Computer Input', emoji: '⌨️', color: '#818CF8', nodeIds: ['c1_cs_006', 'c1_cs_007', 'c1_cs_008', 'c1_cs_009', 'c1_cs_010'], subject: 'cs', classLevel: 1, component: ComputerInputGame },

  // ── Class 2 — Biology ──
  { id: 'c2-bodyfunctions', name: 'Body & Senses', emoji: '👤', color: '#FF6B9D', nodeIds: ['c2_bio_001'], subject: 'bio', classLevel: 2, component: C2BodyFunctionsGame },
  { id: 'c2-foodgroups', name: 'Food Groups', emoji: '🍎', color: '#F97316', nodeIds: ['c2_bio_002', 'c2_bio_003', 'c2_bio_004'], subject: 'bio', classLevel: 2, component: C2FoodGroupsGame },
  { id: 'c2-plants', name: 'Plants & Uses', emoji: '🌳', color: '#16A34A', nodeIds: ['c2_bio_010', 'c2_bio_011', 'c2_bio_012'], subject: 'bio', classLevel: 2, component: C2PlantsGame },
  { id: 'c2-animals', name: 'Animals & Habitats', emoji: '🐶', color: '#22C55E', nodeIds: ['c2_bio_013', 'c2_bio_014', 'c2_bio_015'], subject: 'bio', classLevel: 2, component: C2AnimalsGame },
  { id: 'c2-airclean', name: 'Air & Health', emoji: '💨', color: '#00BFFF', nodeIds: ['c2_bio_005', 'c2_bio_006', 'c2_bio_007', 'c2_bio_008', 'c2_bio_009'], subject: 'bio', classLevel: 2, component: C2AirCleanGame },

  // ── Class 2 — Chemistry ──
  { id: 'c2-water', name: 'Water & Storage', emoji: '💧', color: '#39FF14', nodeIds: ['c2_chem_001', 'c2_chem_002', 'c2_chem_003', 'c2_chem_004'], subject: 'chem', classLevel: 2, component: C2WaterGame },

  // ── Class 2 — Computer Science ──
  { id: 'c2-computerbasics', name: 'Computer Basics', emoji: '💻', color: '#60A5FA', nodeIds: ['c2_cs_001', 'c2_cs_002', 'c2_cs_003', 'c2_cs_004', 'c2_cs_005', 'c2_cs_006'], subject: 'cs', classLevel: 2, component: C2ComputerBasicsGame },
  { id: 'c2-computerfiles', name: 'Paint & Files', emoji: '🎨', color: '#818CF8', nodeIds: ['c2_cs_007', 'c2_cs_008', 'c2_cs_009', 'c2_cs_010', 'c2_cs_011', 'c2_cs_012'], subject: 'cs', classLevel: 2, component: C2ComputerFilesGame },

  // ── Class 2 — EVS ──
  { id: 'c2-myenvironment', name: 'My Environment', emoji: '🏠', color: '#A78BFA', nodeIds: ['c2_evs_001', 'c2_evs_002', 'c2_evs_003', 'c2_evs_004', 'c2_evs_005'], subject: 'evs', classLevel: 2, component: C2MyEnvironmentGame },
  { id: 'c2-safetyclean', name: 'Safety & Clean', emoji: '🦺', color: '#3B82F6', nodeIds: ['c2_evs_006', 'c2_evs_007', 'c2_evs_008', 'c2_evs_009', 'c2_evs_010'], subject: 'evs', classLevel: 2, component: C2SafetyCleanGame },

  // ── Class 2 — Geography ──
  { id: 'c2-earthsun', name: 'Earth & Sun', emoji: '🌍', color: '#FBBF24', nodeIds: ['c2_geo_001', 'c2_geo_002', 'c2_geo_003', 'c2_geo_004', 'c2_geo_005'], subject: 'geo', classLevel: 2, component: C2EarthSunGame },
  { id: 'c2-directionsmap', name: 'Directions & Maps', emoji: '🧭', color: '#F59E0B', nodeIds: ['c2_geo_006', 'c2_geo_007', 'c2_geo_008', 'c2_geo_009', 'c2_geo_010'], subject: 'geo', classLevel: 2, component: C2DirectionsMapGame },

  // ── Class 2 — Maths ──
  { id: 'c2-numbers', name: 'Numbers to 999', emoji: '🔢', color: '#3B82F6', nodeIds: ['c2_math_001', 'c2_math_002', 'c2_math_003', 'c2_math_004'], subject: 'maths', classLevel: 2, component: C2NumbersGame },
  { id: 'c2-addsub', name: 'Add & Subtract', emoji: '➕', color: '#10B981', nodeIds: ['c2_math_005', 'c2_math_006', 'c2_math_007', 'c2_math_008', 'c2_math_009', 'c2_math_010', 'c2_math_011', 'c2_math_014'], subject: 'maths', classLevel: 2, component: C2AddSubGame },
  { id: 'c2-muldiv', name: 'Multiply & Divide', emoji: '✖️', color: '#A855F7', nodeIds: ['c2_math_012', 'c2_math_013'], subject: 'maths', classLevel: 2, component: C2MulDivGame },
  { id: 'c2-shapeslines', name: 'Shapes & Lines', emoji: '⬜', color: '#6366F1', nodeIds: ['c2_math_015', 'c2_math_016', 'c2_math_017', 'c2_math_018', 'c2_math_019'], subject: 'maths', classLevel: 2, component: C2ShapesLinesGame },
  { id: 'c2-measurement', name: 'Measurement', emoji: '📏', color: '#0EA5E9', nodeIds: ['c2_math_020', 'c2_math_021', 'c2_math_022', 'c2_math_023'], subject: 'maths', classLevel: 2, component: C2MeasurementGame },
  { id: 'c2-patterns', name: 'Patterns & Graphs', emoji: '📊', color: '#EC4899', nodeIds: ['c2_math_024', 'c2_math_025', 'c2_math_026', 'c2_math_027'], subject: 'maths', classLevel: 2, component: C2PatternsGame },

  // ── Class 2 — Physics ──
  { id: 'c2-airvehicles', name: 'Air & Vehicles', emoji: '🚗', color: '#F59E0B', nodeIds: ['c2_phy_001', 'c2_phy_002', 'c2_phy_003', 'c2_phy_004', 'c2_phy_005'], subject: 'physics', classLevel: 2, component: C2AirVehiclesGame },
  { id: 'c2-solarsystem', name: 'Solar System', emoji: '🚀', color: '#1E40AF', nodeIds: ['c2_phy_006', 'c2_phy_007', 'c2_phy_008', 'c2_phy_009', 'c2_phy_010'], subject: 'physics', classLevel: 2, component: C2SolarSystemGame },

  // ── Class 3 — Biology ──
  { id: 'c3-livingthings', name: 'Living Things & Body', emoji: '🌿', color: '#16A34A', nodeIds: ['c3_bio_001', 'c3_bio_002', 'c3_bio_003', 'c3_bio_004', 'c3_bio_005'], subject: 'bio', classLevel: 3, component: C3LivingThingsGame },
  { id: 'c3-birds', name: 'Birds & Flight', emoji: '🐦', color: '#0EA5E9', nodeIds: ['c3_bio_006', 'c3_bio_007', 'c3_bio_008', 'c3_bio_009'], subject: 'bio', classLevel: 3, component: C3BirdsGame },
  { id: 'c3-insects', name: 'Insects & Life Cycles', emoji: '🐜', color: '#F97316', nodeIds: ['c3_bio_010', 'c3_bio_011', 'c3_bio_012', 'c3_bio_013'], subject: 'bio', classLevel: 3, component: C3InsectsGame },
  { id: 'c3-plants', name: 'Plant Parts & Seeds', emoji: '🌱', color: '#22C55E', nodeIds: ['c3_bio_014', 'c3_bio_015', 'c3_bio_016', 'c3_bio_017'], subject: 'bio', classLevel: 3, component: C3PlantsGame },
  { id: 'c3-plantuses', name: 'Plant Uses & Sun', emoji: '🌻', color: '#EAB308', nodeIds: ['c3_bio_018', 'c3_bio_019', 'c3_bio_020'], subject: 'bio', classLevel: 3, component: C3PlantUsesGame },
  { id: 'c3-health', name: 'Health & Cleanliness', emoji: '🧼', color: '#06B6D4', nodeIds: ['c3_bio_021', 'c3_bio_022', 'c3_bio_023'], subject: 'bio', classLevel: 3, component: C3HealthGame },

  // ── Class 3 — Chemistry ──
  { id: 'c3-matter', name: 'Solids, Liquids & Gases', emoji: '⚗️', color: '#8B5CF6', nodeIds: ['c3_chem_001', 'c3_chem_002', 'c3_chem_003', 'c3_chem_004', 'c3_chem_005'], subject: 'chem', classLevel: 3, component: C3MatterGame },
  { id: 'c3-watersun', name: 'Water & Sun Resources', emoji: '💧', color: '#0284C7', nodeIds: ['c3_chem_006', 'c3_chem_007', 'c3_chem_008'], subject: 'chem', classLevel: 3, component: C3WaterSunGame },

  // ── Class 3 — Computer Science ──
  { id: 'c3-computersystem', name: 'Computer System', emoji: '💻', color: '#60A5FA', nodeIds: ['c3_cs_001', 'c3_cs_002', 'c3_cs_003', 'c3_cs_004', 'c3_cs_005'], subject: 'cs', classLevel: 3, component: C3ComputerSystemGame },
  { id: 'c3-windowsword', name: 'Windows & MS Word', emoji: '📝', color: '#818CF8', nodeIds: ['c3_cs_006', 'c3_cs_007', 'c3_cs_008'], subject: 'cs', classLevel: 3, component: C3WindowsWordGame },
  { id: 'c3-internet', name: 'Internet & Browser', emoji: '🌐', color: '#3B82F6', nodeIds: ['c3_cs_009', 'c3_cs_010'], subject: 'cs', classLevel: 3, component: C3InternetGame },
  { id: 'c3-paintfiles', name: 'Paint, Files & Shortcuts', emoji: '🎨', color: '#A855F7', nodeIds: ['c3_cs_011', 'c3_cs_012', 'c3_cs_013', 'c3_cs_014', 'c3_cs_015'], subject: 'cs', classLevel: 3, component: C3PaintFilesGame },

  // ── Class 3 — EVS ──
  { id: 'c3-livingevs', name: 'Living Things & Body', emoji: '🌳', color: '#10B981', nodeIds: ['c3_evs_001', 'c3_evs_002', 'c3_evs_003'], subject: 'evs', classLevel: 3, component: C3LivingEVSGame },
  { id: 'c3-earthsky', name: 'Earth, Sun & Clean Resources', emoji: '🌍', color: '#F59E0B', nodeIds: ['c3_evs_004', 'c3_evs_005', 'c3_evs_006'], subject: 'evs', classLevel: 3, component: C3EarthSkyGame },
  { id: 'c3-foodshelter', name: 'Food, Shelter & Travel', emoji: '🏠', color: '#EC4899', nodeIds: ['c3_evs_007', 'c3_evs_008', 'c3_evs_009', 'c3_evs_010'], subject: 'evs', classLevel: 3, component: C3FoodShelterGame },

  // ── Class 3 — Geography ──
  { id: 'c3-globe', name: 'Globe & Earth Shape', emoji: '🌐', color: '#2563EB', nodeIds: ['c3_geo_001', 'c3_geo_002'], subject: 'geo', classLevel: 3, component: C3GlobeGame },
  { id: 'c3-continents', name: 'Continents & Oceans', emoji: '🗺️', color: '#1D4ED8', nodeIds: ['c3_geo_003', 'c3_geo_004', 'c3_geo_005'], subject: 'geo', classLevel: 3, component: C3ContinentsGame },
  { id: 'c3-directionsmaps', name: 'Directions & Maps', emoji: '🧭', color: '#F59E0B', nodeIds: ['c3_geo_006', 'c3_geo_007'], subject: 'geo', classLevel: 3, component: C3DirectionsMapsGame },
  { id: 'c3-landforms', name: 'Landforms & Rivers', emoji: '🏔️', color: '#78716C', nodeIds: ['c3_geo_008', 'c3_geo_009', 'c3_geo_010'], subject: 'geo', classLevel: 3, component: C3LandformsGame },
  { id: 'c3-resources', name: 'Natural Resources', emoji: '🌲', color: '#059669', nodeIds: ['c3_geo_011', 'c3_geo_012'], subject: 'geo', classLevel: 3, component: C3ResourcesGame },

  // ── Class 3 — Physics ──
  { id: 'c3-floatsink', name: 'Float & Sink', emoji: '⛵', color: '#0891B2', nodeIds: ['c3_phy_001', 'c3_phy_002'], subject: 'physics', classLevel: 3, component: C3FloatSinkGame },
  { id: 'c3-sunenergy', name: 'Sun & Energy', emoji: '☀️', color: '#F59E0B', nodeIds: ['c3_phy_003', 'c3_phy_004', 'c3_phy_005', 'c3_phy_006'], subject: 'physics', classLevel: 3, component: C3SunEnergyGame },

  // ── Class 3 — Maths ──
  { id: 'c3-numbers', name: '4-Digit Numbers', emoji: '🔢', color: '#3B82F6', nodeIds: ['c3_math_001', 'c3_math_002', 'c3_math_003', 'c3_math_004', 'c3_math_005'], subject: 'maths', classLevel: 3, component: C3NumbersGame },
  { id: 'c3-addsub', name: 'Add & Subtract 3-Digit', emoji: '➕', color: '#10B981', nodeIds: ['c3_math_006', 'c3_math_007', 'c3_math_008'], subject: 'maths', classLevel: 3, component: C3AddSubGame },
  { id: 'c3-muldiv', name: 'Multiply & Divide', emoji: '✖️', color: '#A855F7', nodeIds: ['c3_math_009', 'c3_math_010', 'c3_math_011', 'c3_math_012', 'c3_math_013'], subject: 'maths', classLevel: 3, component: C3MulDivGame },
  { id: 'c3-mentalmath', name: 'Mental Math & Estimation', emoji: '🧠', color: '#EC4899', nodeIds: ['c3_math_014', 'c3_math_015', 'c3_math_016'], subject: 'maths', classLevel: 3, component: C3MentalMathGame },
  { id: 'c3-shapestessellation', name: 'Shapes & Tessellation', emoji: '⬜', color: '#6366F1', nodeIds: ['c3_math_017', 'c3_math_018', 'c3_math_019', 'c3_math_020', 'c3_math_021'], subject: 'maths', classLevel: 3, component: C3ShapesTessellationGame },
  { id: 'c3-mapslength', name: 'Maps & Length', emoji: '📏', color: '#0EA5E9', nodeIds: ['c3_math_022', 'c3_math_023', 'c3_math_024', 'c3_math_025', 'c3_math_026', 'c3_math_027', 'c3_math_028'], subject: 'maths', classLevel: 3, component: C3MapsLengthGame },
  { id: 'c3-weightcapacity', name: 'Weight & Capacity', emoji: '⚖️', color: '#F97316', nodeIds: ['c3_math_029', 'c3_math_030', 'c3_math_031'], subject: 'maths', classLevel: 3, component: C3WeightCapacityGame },
  { id: 'c3-timecalendar', name: 'Time & Calendar', emoji: '🕐', color: '#EAB308', nodeIds: ['c3_math_032', 'c3_math_033', 'c3_math_034', 'c3_math_035'], subject: 'maths', classLevel: 3, component: C3TimeCalendarGame },
  { id: 'c3-datapatterns', name: 'Data & Patterns', emoji: '📊', color: '#DC2626', nodeIds: ['c3_math_036', 'c3_math_037', 'c3_math_038', 'c3_math_039', 'c3_math_040'], subject: 'maths', classLevel: 3, component: C3DataPatternsGame },

  // ── Class 4 — Biology ──
  { id: 'c4-foodteeth', name: 'Food & Teeth', emoji: '🦷', color: '#F97316', nodeIds: ['c4_bio_001', 'c4_bio_002', 'c4_bio_003', 'c4_bio_004', 'c4_bio_005'], subject: 'bio', classLevel: 4, component: C4FoodTeethGame },
  { id: 'c4-digestion', name: 'Digestion', emoji: '🍽️', color: '#EAB308', nodeIds: ['c4_bio_006', 'c4_bio_007', 'c4_bio_008'], subject: 'bio', classLevel: 4, component: C4DigestionGame },
  { id: 'c4-adaptations', name: 'Adaptations', emoji: '🦎', color: '#22C55E', nodeIds: ['c4_bio_009', 'c4_bio_010', 'c4_bio_011', 'c4_bio_012', 'c4_bio_013'], subject: 'bio', classLevel: 4, component: C4AdaptationsGame },
  { id: 'c4-plantsair', name: 'Plants & Air', emoji: '🌿', color: '#16A34A', nodeIds: ['c4_bio_014', 'c4_bio_015', 'c4_bio_016', 'c4_bio_017', 'c4_bio_018'], subject: 'bio', classLevel: 4, component: C4PlantsAirGame },
  { id: 'c4-skinnervous', name: 'Skin & Nervous System', emoji: '🧠', color: '#EF4444', nodeIds: ['c4_bio_019', 'c4_bio_020'], subject: 'bio', classLevel: 4, component: C4SkinNervousGame },

  // ── Class 4 — Chemistry ──
  { id: 'c4-matterair', name: 'Matter & Air', emoji: '💨', color: '#0EA5E9', nodeIds: ['c4_chem_001', 'c4_chem_002', 'c4_chem_003', 'c4_chem_004'], subject: 'chem', classLevel: 4, component: C4MatterAirGame },
  { id: 'c4-solutionsfloat', name: 'Solutions & Float/Sink', emoji: '⚗️', color: '#8B5CF6', nodeIds: ['c4_chem_005', 'c4_chem_006', 'c4_chem_007', 'c4_chem_008', 'c4_chem_009', 'c4_chem_010'], subject: 'chem', classLevel: 4, component: C4SolutionsFloatGame },

  // ── Class 4 — Maths ──
  { id: 'c4-numbers', name: '6-Digit Numbers', emoji: '🔢', color: '#3B82F6', nodeIds: ['c4_math_001', 'c4_math_002', 'c4_math_003', 'c4_math_004', 'c4_math_005'], subject: 'maths', classLevel: 4, component: C4NumbersGame },
  { id: 'c4-fractions', name: 'Fractions', emoji: '🍕', color: '#F97316', nodeIds: ['c4_math_006', 'c4_math_007', 'c4_math_008', 'c4_math_009'], subject: 'maths', classLevel: 4, component: C4FractionsGame },
  { id: 'c4-operations', name: 'Four Operations', emoji: '➕', color: '#10B981', nodeIds: ['c4_math_010', 'c4_math_011', 'c4_math_012', 'c4_math_013', 'c4_math_014', 'c4_math_015', 'c4_math_016'], subject: 'maths', classLevel: 4, component: C4OperationsGame },
  { id: 'c4-factorsmultiples', name: 'Factors & Multiples', emoji: '🔍', color: '#A855F7', nodeIds: ['c4_math_017', 'c4_math_018', 'c4_math_019', 'c4_math_020', 'c4_math_021', 'c4_math_022', 'c4_math_023'], subject: 'maths', classLevel: 4, component: C4FactorsMultiplesGame },
  { id: 'c4-shapessymmetry', name: 'Shapes & Symmetry', emoji: '⬜', color: '#6366F1', nodeIds: ['c4_math_024', 'c4_math_025', 'c4_math_026', 'c4_math_027', 'c4_math_028', 'c4_math_029', 'c4_math_030'], subject: 'maths', classLevel: 4, component: C4ShapesSymmetryGame },
  { id: 'c4-linesmeasurement', name: 'Lines & Measurement', emoji: '📏', color: '#0EA5E9', nodeIds: ['c4_math_031', 'c4_math_032', 'c4_math_033', 'c4_math_034', 'c4_math_035'], subject: 'maths', classLevel: 4, component: C4LinesMeasurementGame },
  { id: 'c4-timedatapatterns', name: 'Time, Data & Patterns', emoji: '🕐', color: '#EAB308', nodeIds: ['c4_math_036', 'c4_math_037', 'c4_math_038', 'c4_math_039', 'c4_math_040', 'c4_math_041'], subject: 'maths', classLevel: 4, component: C4TimeDataPatternsGame },

  // ── Class 4 — Physics ──
  { id: 'c4-light', name: 'Light & Shadows', emoji: '💡', color: '#FBBF24', nodeIds: ['c4_phy_001', 'c4_phy_002', 'c4_phy_003', 'c4_phy_004'], subject: 'physics', classLevel: 4, component: C4LightGame },
  { id: 'c4-measurement', name: 'Measurement', emoji: '📐', color: '#06B6D4', nodeIds: ['c4_phy_005', 'c4_phy_006', 'c4_phy_007'], subject: 'physics', classLevel: 4, component: C4MeasurementGame },
  { id: 'c4-forcefriction', name: 'Force & Friction', emoji: '🔧', color: '#F97316', nodeIds: ['c4_phy_008', 'c4_phy_009', 'c4_phy_010', 'c4_phy_011', 'c4_phy_012', 'c4_phy_013'], subject: 'physics', classLevel: 4, component: C4ForceFrictionGame },

  // ── Class 4 — Computer Science ──
  { id: 'c4-computermemory', name: 'Computer Memory', emoji: '💾', color: '#60A5FA', nodeIds: ['c4_cs_001', 'c4_cs_002', 'c4_cs_003'], subject: 'cs', classLevel: 4, component: C4ComputerMemoryGame },
  { id: 'c4-wordformatting', name: 'Word Formatting', emoji: '📝', color: '#818CF8', nodeIds: ['c4_cs_004', 'c4_cs_005', 'c4_cs_006', 'c4_cs_007'], subject: 'cs', classLevel: 4, component: C4WordFormattingGame },
  { id: 'c4-internetbrowser', name: 'Internet & Browser', emoji: '🌐', color: '#3B82F6', nodeIds: ['c4_cs_008', 'c4_cs_009', 'c4_cs_010'], subject: 'cs', classLevel: 4, component: C4InternetBrowserGame },
  { id: 'c4-powerpoint', name: 'PowerPoint', emoji: '📊', color: '#EF4444', nodeIds: ['c4_cs_011', 'c4_cs_012', 'c4_cs_013'], subject: 'cs', classLevel: 4, component: C4PowerPointGame },
  { id: 'c4-algorithmslogo', name: 'Algorithms & LOGO', emoji: '🐢', color: '#A855F7', nodeIds: ['c4_cs_014', 'c4_cs_015', 'c4_cs_016', 'c4_cs_017', 'c4_cs_018'], subject: 'cs', classLevel: 4, component: C4AlgorithmsLogoGame },

  // ── Class 4 — EVS ──
  { id: 'c4-livingplants', name: 'Living Things & Organs', emoji: '🌱', color: '#10B981', nodeIds: ['c4_evs_001', 'c4_evs_002', 'c4_evs_003'], subject: 'evs', classLevel: 4, component: C4LivingPlantsGame },
  { id: 'c4-changestransport', name: 'Changes & Transport', emoji: '🚗', color: '#F59E0B', nodeIds: ['c4_evs_004', 'c4_evs_005', 'c4_evs_006', 'c4_evs_007', 'c4_evs_008'], subject: 'evs', classLevel: 4, component: C4ChangesTransportGame },

  // ── Class 4 — Geography ──
  { id: 'c4-earthmotions', name: 'Earth Motions & Seasons', emoji: '🌍', color: '#2563EB', nodeIds: ['c4_geo_001', 'c4_geo_002', 'c4_geo_003'], subject: 'geo', classLevel: 4, component: C4EarthMotionsGame },
  { id: 'c4-continentsoceans', name: 'Continents & Oceans', emoji: '🗺️', color: '#1D4ED8', nodeIds: ['c4_geo_004', 'c4_geo_005', 'c4_geo_006'], subject: 'geo', classLevel: 4, component: C4ContinentsOceansGame },
  { id: 'c4-mapsindia', name: 'Maps & India', emoji: '🧭', color: '#F59E0B', nodeIds: ['c4_geo_007', 'c4_geo_008', 'c4_geo_009', 'c4_geo_010'], subject: 'geo', classLevel: 4, component: C4MapsIndiaGame },
  { id: 'c4-indiaclimate', name: 'India Climate & Soils', emoji: '🌤️', color: '#059669', nodeIds: ['c4_geo_011', 'c4_geo_012', 'c4_geo_013', 'c4_geo_014'], subject: 'geo', classLevel: 4, component: C4IndiaClimateGame },

  // ── Class 5 — Maths ──
  { id: 'c5-largenumbers', name: 'Large Numbers', emoji: '🔢', color: '#3B82F6', nodeIds: ['c5_math_001','c5_math_002','c5_math_003','c5_math_004','c5_math_005','c5_math_006','c5_math_007'], subject: 'maths', classLevel: 5, component: C5LargeNumbersGame },
  { id: 'c5-largeoperations', name: 'Large Operations', emoji: '➗', color: '#10B981', nodeIds: ['c5_math_008','c5_math_009','c5_math_010','c5_math_011','c5_math_012','c5_math_013','c5_math_014','c5_math_015'], subject: 'maths', classLevel: 5, component: C5LargeOperationsGame },
  { id: 'c5-fractionsadv', name: 'Fractions Advanced', emoji: '➗', color: '#F59E0B', nodeIds: ['c5_math_016','c5_math_017','c5_math_018','c5_math_019','c5_math_020','c5_math_021'], subject: 'maths', classLevel: 5, component: C5FractionsAdvancedGame },
  { id: 'c5-decimals', name: 'Decimals', emoji: '🔟', color: '#8B5CF6', nodeIds: ['c5_math_022','c5_math_023','c5_math_024','c5_math_025','c5_math_026','c5_math_027','c5_math_028','c5_math_029','c5_math_030','c5_math_031','c5_math_032'], subject: 'maths', classLevel: 5, component: C5DecimalsGame },
  { id: 'c5-factorsmulti', name: 'Factors & Multiples', emoji: '✖️', color: '#EC4899', nodeIds: ['c5_math_033','c5_math_034','c5_math_035','c5_math_036','c5_math_037','c5_math_038','c5_math_039','c5_math_040'], subject: 'maths', classLevel: 5, component: C5FactorsMultiGame },
  { id: 'c5-integers', name: 'Integers', emoji: '🌡️', color: '#0EA5E9', nodeIds: ['c5_math_041','c5_math_042','c5_math_043','c5_math_044','c5_math_045'], subject: 'maths', classLevel: 5, component: C5IntegersGame },
  { id: 'c5-anglessymmetry', name: 'Angles & Symmetry', emoji: '📐', color: '#6366F1', nodeIds: ['c5_math_046','c5_math_047','c5_math_048','c5_math_049','c5_math_050','c5_math_051'], subject: 'maths', classLevel: 5, component: C5AnglesSymmetryGame },
  { id: 'c5-areaperimeter', name: 'Area & Perimeter', emoji: '📏', color: '#14B8A6', nodeIds: ['c5_math_052','c5_math_053','c5_math_054'], subject: 'maths', classLevel: 5, component: C5AreaPerimeterGame },
  { id: 'c5-percentagedata', name: 'Percentage & Data', emoji: '📊', color: '#F43F5E', nodeIds: ['c5_math_055','c5_math_056','c5_math_057','c5_math_058','c5_math_059','c5_math_060','c5_math_061','c5_math_062','c5_math_063','c5_math_064','c5_math_065','c5_math_066','c5_math_067'], subject: 'maths', classLevel: 5, component: C5PercentageDataGame },

  // ── Class 5 — Biology ──
  { id: 'c5-circulatory', name: 'Circulatory System', emoji: '❤️', color: '#EF4444', nodeIds: ['c5_bio_001','c5_bio_002','c5_bio_003'], subject: 'bio', classLevel: 5, component: C5CirculatoryGame },
  { id: 'c5-skeletal', name: 'Skeletal System', emoji: '🦴', color: '#E5E7EB', nodeIds: ['c5_bio_004','c5_bio_005','c5_bio_006'], subject: 'bio', classLevel: 5, component: C5SkeletalGame },
  { id: 'c5-healthdiseases', name: 'Health & Diseases', emoji: '🥗', color: '#22C55E', nodeIds: ['c5_bio_007','c5_bio_008','c5_bio_009'], subject: 'bio', classLevel: 5, component: C5HealthDiseasesGame },
  { id: 'c5-plantreproduction', name: 'Plant Reproduction', emoji: '🌸', color: '#EC4899', nodeIds: ['c5_bio_010','c5_bio_011','c5_bio_012','c5_bio_013','c5_bio_014'], subject: 'bio', classLevel: 5, component: C5PlantReproductionGame },
  { id: 'c5-ecosystemwaste', name: 'Ecosystem & Waste', emoji: '🌱', color: '#16A34A', nodeIds: ['c5_bio_015','c5_bio_016','c5_bio_017','c5_bio_018'], subject: 'bio', classLevel: 5, component: C5EcosystemWasteGame },
  { id: 'c5-agriculturehygiene', name: 'Agriculture & Hygiene', emoji: '🚜', color: '#CA8A04', nodeIds: ['c5_bio_019','c5_bio_020','c5_bio_021','c5_bio_022','c5_bio_023'], subject: 'bio', classLevel: 5, component: C5AgricultureHygieneGame },

  // ── Class 5 — Chemistry ──
  { id: 'c5-statesmatter', name: 'States of Matter', emoji: '🧪', color: '#06B6D4', nodeIds: ['c5_chem_001','c5_chem_002','c5_chem_003','c5_chem_004','c5_chem_005'], subject: 'chem', classLevel: 5, component: C5StatesMatterGame },
  { id: 'c5-mixturesseparation', name: 'Mixtures & Separation', emoji: '🔬', color: '#0EA5E9', nodeIds: ['c5_chem_006','c5_chem_007','c5_chem_008','c5_chem_009'], subject: 'chem', classLevel: 5, component: C5MixturesSeparationGame },
  { id: 'c5-changesair', name: 'Changes & Air', emoji: '🌬️', color: '#3B82F6', nodeIds: ['c5_chem_010','c5_chem_011','c5_chem_012'], subject: 'chem', classLevel: 5, component: C5ChangesAirGame },

  // ── Class 5 — Physics ──
  { id: 'c5-soundnoise', name: 'Sound & Noise', emoji: '🔊', color: '#A855F7', nodeIds: ['c5_phy_001','c5_phy_002','c5_phy_003','c5_phy_004'], subject: 'physics', classLevel: 5, component: C5SoundNoiseGame },
  { id: 'c5-workenergy', name: 'Work & Energy', emoji: '⚡', color: '#F59E0B', nodeIds: ['c5_phy_005','c5_phy_006','c5_phy_007','c5_phy_008'], subject: 'physics', classLevel: 5, component: C5WorkEnergyGame },
  { id: 'c5-lighteclipse', name: 'Light & Eclipse', emoji: '🌗', color: '#6366F1', nodeIds: ['c5_phy_009','c5_phy_010','c5_phy_011','c5_phy_012','c5_phy_013'], subject: 'physics', classLevel: 5, component: C5LightEclipseGame },
  { id: 'c5-simplemachines', name: 'Simple Machines', emoji: '⚙️', color: '#64748B', nodeIds: ['c5_phy_014','c5_phy_015','c5_phy_016','c5_phy_017'], subject: 'physics', classLevel: 5, component: C5SimpleMachinesGame },

  // ── Class 5 — Computer Science ──
  { id: 'c5-computerhistory', name: 'Computer History', emoji: '💻', color: '#3B82F6', nodeIds: ['c5_cs_001','c5_cs_002','c5_cs_003','c5_cs_004'], subject: 'cs', classLevel: 5, component: C5ComputerHistoryGame },
  { id: 'c5-software', name: 'Software Types', emoji: '🖥️', color: '#10B981', nodeIds: ['c5_cs_005','c5_cs_006','c5_cs_007'], subject: 'cs', classLevel: 5, component: C5SoftwareGame },
  { id: 'c5-wordadvanced', name: 'Word Advanced', emoji: '📝', color: '#2563EB', nodeIds: ['c5_cs_008','c5_cs_009','c5_cs_010'], subject: 'cs', classLevel: 5, component: C5WordAdvancedGame },
  { id: 'c5-powerpointscratch', name: 'PowerPoint & Scratch', emoji: '🎨', color: '#F97316', nodeIds: ['c5_cs_011','c5_cs_012','c5_cs_013','c5_cs_014','c5_cs_015','c5_cs_016'], subject: 'cs', classLevel: 5, component: C5PowerPointScratchGame },
  { id: 'c5-internetlogo', name: 'Internet & LOGO', emoji: '🌐', color: '#0891B2', nodeIds: ['c5_cs_017','c5_cs_018','c5_cs_019','c5_cs_020'], subject: 'cs', classLevel: 5, component: C5InternetLogoGame },

  // ── Class 5 — Geography ──
  { id: 'c5-latlong', name: 'Latitudes & Longitudes', emoji: '🧭', color: '#1D4ED8', nodeIds: ['c5_geo_001','c5_geo_002','c5_geo_003','c5_geo_004','c5_geo_005'], subject: 'geo', classLevel: 5, component: C5LatLongGame },
  { id: 'c5-indialocation', name: 'India Location', emoji: '🗺️', color: '#F59E0B', nodeIds: ['c5_geo_006','c5_geo_007','c5_geo_008','c5_geo_009'], subject: 'geo', classLevel: 5, component: C5IndiaLocationGame },
  { id: 'c5-environmentresources', name: 'Environment & Resources', emoji: '🌍', color: '#16A34A', nodeIds: ['c5_geo_010','c5_geo_011','c5_geo_012'], subject: 'geo', classLevel: 5, component: C5EnvironmentResourcesGame },
  { id: 'c5-economy', name: 'Economy', emoji: '💰', color: '#CA8A04', nodeIds: ['c5_geo_013','c5_geo_014','c5_geo_015','c5_geo_016'], subject: 'geo', classLevel: 5, component: C5EconomyGame },

  // ── Class 5 — EVS ──
  { id: 'c5-environmentbody', name: 'Environment & Body', emoji: '🌿', color: '#22C55E', nodeIds: ['c5_evs_001','c5_evs_002','c5_evs_003','c5_evs_004'], subject: 'evs', classLevel: 5, component: C5EnvironmentBodyGame },
  { id: 'c5-weatherbuildings', name: 'Weather & Buildings', emoji: '🌦️', color: '#0EA5E9', nodeIds: ['c5_evs_005','c5_evs_006','c5_evs_007','c5_evs_008'], subject: 'evs', classLevel: 5, component: C5WeatherBuildingsGame },
]

// ─── Lookup helpers ───────────────────────────────────────────

/**
 * Find the game that covers a given node ID.
 * Returns null if no game exists for that node (yet).
 */
// ─── Merge Class 6-12 games ───────────────────────────────────
import { C6_12_GAMES } from './c6_12_gameRegistry'

/** All games: Class 1-5 (hand-coded) + Class 6-12 (VertexAI-generated) */
export const ALL_GAMES: GameMeta[] = [...GAMES, ...C6_12_GAMES]

export function getGameForNode(nodeId: string): GameMeta | null {
  for (const game of ALL_GAMES) {
    if (game.nodeIds.includes(nodeId)) return game
  }
  return null
}

/**
 * Get all games for a given class level and subject.
 */
export function getGamesForClass(classLevel: number, subject?: string): GameMeta[] {
  return ALL_GAMES.filter(g => g.classLevel === classLevel && (!subject || g.subject === subject))
}

/**
 * Check if a node has a game available.
 */
export function hasGameForNode(nodeId: string): boolean {
  return getGameForNode(nodeId) !== null
}
