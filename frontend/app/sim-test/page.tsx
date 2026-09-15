'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { audioManager } from '@/lib/sim-engine/audio';
import { speechManager } from '@/lib/sim-engine/speech';

const CountingGame = dynamic(
  () => import('@/components/simulations/class1/CountingGame').then(m => m.CountingGame),
  { ssr: false }
);
const ShapeSortGame = dynamic(
  () => import('@/components/simulations/class1/ShapeSortGame').then(m => m.ShapeSortGame),
  { ssr: false }
);
const AdditionGame = dynamic(
  () => import('@/components/simulations/class1/AdditionGame').then(m => m.AdditionGame),
  { ssr: false }
);
const BalanceGame = dynamic(
  () => import('@/components/simulations/class1/BalanceGame').then(m => m.BalanceGame),
  { ssr: false }
);
const PatternsGame = dynamic(
  () => import('@/components/simulations/class1/PatternsGame').then(m => m.PatternsGame),
  { ssr: false }
);
const AnimalsGame = dynamic(
  () => import('@/components/simulations/class1/AnimalsGame').then(m => m.AnimalsGame),
  { ssr: false }
);
const PlantsGame = dynamic(
  () => import('@/components/simulations/class1/PlantsGame').then(m => m.PlantsGame),
  { ssr: false }
);
const FoodGame = dynamic(
  () => import('@/components/simulations/class1/FoodGame').then(m => m.FoodGame),
  { ssr: false }
);
const SafetyGame = dynamic(
  () => import('@/components/simulations/class1/SafetyGame').then(m => m.SafetyGame),
  { ssr: false }
);
const CleanlinessGame = dynamic(
  () => import('@/components/simulations/class1/CleanlinessGame').then(m => m.CleanlinessGame),
  { ssr: false }
);
const AirGame = dynamic(
  () => import('@/components/simulations/class1/AirGame').then(m => m.AirGame),
  { ssr: false }
);
const TransportGame = dynamic(
  () => import('@/components/simulations/class1/TransportGame').then(m => m.TransportGame),
  { ssr: false }
);
const SunMoonGame = dynamic(
  () => import('@/components/simulations/class1/SunMoonGame').then(m => m.SunMoonGame),
  { ssr: false }
);
const WaterGame = dynamic(
  () => import('@/components/simulations/class1/WaterGame').then(m => m.WaterGame),
  { ssr: false }
);
const BodyGame = dynamic(
  () => import('@/components/simulations/class1/BodyGame').then(m => m.BodyGame),
  { ssr: false }
);
const PlantTypesGame = dynamic(
  () => import('@/components/simulations/class1/PlantTypesGame').then(m => m.PlantTypesGame),
  { ssr: false }
);
const AnimalTypesGame = dynamic(
  () => import('@/components/simulations/class1/AnimalTypesGame').then(m => m.AnimalTypesGame),
  { ssr: false }
);
const EarthWeatherGame = dynamic(
  () => import('@/components/simulations/class1/EarthWeatherGame').then(m => m.EarthWeatherGame),
  { ssr: false }
);
const NeighbourhoodGame = dynamic(
  () => import('@/components/simulations/class1/NeighbourhoodGame').then(m => m.NeighbourhoodGame),
  { ssr: false }
);
const ComputerBasicsGame = dynamic(
  () => import('@/components/simulations/class1/ComputerBasicsGame').then(m => m.ComputerBasicsGame),
  { ssr: false }
);
const ComputerInputGame = dynamic(
  () => import('@/components/simulations/class1/ComputerInputGame').then(m => m.ComputerInputGame),
  { ssr: false }
);

// ─── Class 2 games ───
const C2BodyFunctionsGame = dynamic(() => import('@/components/simulations/class2/BodyFunctionsGame').then(m => m.BodyFunctionsGame), { ssr: false });
const C2FoodGroupsGame = dynamic(() => import('@/components/simulations/class2/FoodGroupsGame').then(m => m.FoodGroupsGame), { ssr: false });
const C2PlantsGame = dynamic(() => import('@/components/simulations/class2/PlantsGame').then(m => m.PlantsGame), { ssr: false });
const C2AnimalsGame = dynamic(() => import('@/components/simulations/class2/AnimalsGame').then(m => m.AnimalsGame), { ssr: false });
const C2AirCleanGame = dynamic(() => import('@/components/simulations/class2/AirCleanGame').then(m => m.AirCleanGame), { ssr: false });
const C2WaterGame = dynamic(() => import('@/components/simulations/class2/WaterGame').then(m => m.WaterGame), { ssr: false });
const C2ComputerBasicsGame = dynamic(() => import('@/components/simulations/class2/ComputerBasicsGame').then(m => m.ComputerBasicsGame), { ssr: false });
const C2ComputerFilesGame = dynamic(() => import('@/components/simulations/class2/ComputerFilesGame').then(m => m.ComputerFilesGame), { ssr: false });
const C2MyEnvironmentGame = dynamic(() => import('@/components/simulations/class2/MyEnvironmentGame').then(m => m.MyEnvironmentGame), { ssr: false });
const C2SafetyCleanGame = dynamic(() => import('@/components/simulations/class2/SafetyCleanGame').then(m => m.SafetyCleanGame), { ssr: false });
const C2EarthSunGame = dynamic(() => import('@/components/simulations/class2/EarthSunGame').then(m => m.EarthSunGame), { ssr: false });
const C2DirectionsMapGame = dynamic(() => import('@/components/simulations/class2/DirectionsMapGame').then(m => m.DirectionsMapGame), { ssr: false });
const C2NumbersGame = dynamic(() => import('@/components/simulations/class2/NumbersGame').then(m => m.NumbersGame), { ssr: false });
const C2AddSubGame = dynamic(() => import('@/components/simulations/class2/AddSubGame').then(m => m.AddSubGame), { ssr: false });
const C2MulDivGame = dynamic(() => import('@/components/simulations/class2/MulDivGame').then(m => m.MulDivGame), { ssr: false });
const C2ShapesLinesGame = dynamic(() => import('@/components/simulations/class2/ShapesLinesGame').then(m => m.ShapesLinesGame), { ssr: false });
const C2MeasurementGame = dynamic(() => import('@/components/simulations/class2/MeasurementGame').then(m => m.MeasurementGame), { ssr: false });
const C2PatternsGame = dynamic(() => import('@/components/simulations/class2/PatternsGame').then(m => m.PatternsGame), { ssr: false });
const C2AirVehiclesGame = dynamic(() => import('@/components/simulations/class2/AirVehiclesGame').then(m => m.AirVehiclesGame), { ssr: false });
const C2SolarSystemGame = dynamic(() => import('@/components/simulations/class2/SolarSystemGame').then(m => m.SolarSystemGame), { ssr: false });

// Class 3 games
const C3LivingThingsGame = dynamic(() => import('@/components/simulations/class3/LivingThingsGame').then(m => m.LivingThingsGame), { ssr: false });
const C3BirdsGame = dynamic(() => import('@/components/simulations/class3/BirdsGame').then(m => m.BirdsGame), { ssr: false });
const C3InsectsGame = dynamic(() => import('@/components/simulations/class3/InsectsGame').then(m => m.InsectsGame), { ssr: false });
const C3PlantsGame = dynamic(() => import('@/components/simulations/class3/PlantsGame').then(m => m.PlantsGame), { ssr: false });
const C3PlantUsesGame = dynamic(() => import('@/components/simulations/class3/PlantUsesGame').then(m => m.PlantUsesGame), { ssr: false });
const C3HealthGame = dynamic(() => import('@/components/simulations/class3/HealthGame').then(m => m.HealthGame), { ssr: false });
const C3MatterGame = dynamic(() => import('@/components/simulations/class3/MatterGame').then(m => m.MatterGame), { ssr: false });
const C3WaterSunGame = dynamic(() => import('@/components/simulations/class3/WaterSunGame').then(m => m.WaterSunGame), { ssr: false });
const C3ComputerSystemGame = dynamic(() => import('@/components/simulations/class3/ComputerSystemGame').then(m => m.ComputerSystemGame), { ssr: false });
const C3WindowsWordGame = dynamic(() => import('@/components/simulations/class3/WindowsWordGame').then(m => m.WindowsWordGame), { ssr: false });
const C3InternetGame = dynamic(() => import('@/components/simulations/class3/InternetGame').then(m => m.InternetGame), { ssr: false });
const C3PaintFilesGame = dynamic(() => import('@/components/simulations/class3/PaintFilesGame').then(m => m.PaintFilesGame), { ssr: false });
const C3LivingEVSGame = dynamic(() => import('@/components/simulations/class3/LivingEVSGame').then(m => m.LivingEVSGame), { ssr: false });
const C3EarthSkyGame = dynamic(() => import('@/components/simulations/class3/EarthSkyGame').then(m => m.EarthSkyGame), { ssr: false });
const C3FoodShelterGame = dynamic(() => import('@/components/simulations/class3/FoodShelterGame').then(m => m.FoodShelterGame), { ssr: false });
const C3GlobeGame = dynamic(() => import('@/components/simulations/class3/GlobeGame').then(m => m.GlobeGame), { ssr: false });
const C3ContinentsGame = dynamic(() => import('@/components/simulations/class3/ContinentsGame').then(m => m.ContinentsGame), { ssr: false });
const C3DirectionsMapsGame = dynamic(() => import('@/components/simulations/class3/DirectionsMapsGame').then(m => m.DirectionsMapsGame), { ssr: false });
const C3LandformsGame = dynamic(() => import('@/components/simulations/class3/LandformsGame').then(m => m.LandformsGame), { ssr: false });
const C3ResourcesGame = dynamic(() => import('@/components/simulations/class3/ResourcesGame').then(m => m.ResourcesGame), { ssr: false });
const C3FloatSinkGame = dynamic(() => import('@/components/simulations/class3/FloatSinkGame').then(m => m.FloatSinkGame), { ssr: false });
const C3SunEnergyGame = dynamic(() => import('@/components/simulations/class3/SunEnergyGame').then(m => m.SunEnergyGame), { ssr: false });
const C3NumbersGame = dynamic(() => import('@/components/simulations/class3/NumbersGame').then(m => m.NumbersGame), { ssr: false });
const C3AddSubGame = dynamic(() => import('@/components/simulations/class3/AddSubGame').then(m => m.AddSubGame), { ssr: false });
const C3MulDivGame = dynamic(() => import('@/components/simulations/class3/MulDivGame').then(m => m.MulDivGame), { ssr: false });
const C3MentalMathGame = dynamic(() => import('@/components/simulations/class3/MentalMathGame').then(m => m.MentalMathGame), { ssr: false });
const C3ShapesTessellationGame = dynamic(() => import('@/components/simulations/class3/ShapesTessellationGame').then(m => m.ShapesTessellationGame), { ssr: false });
const C3MapsLengthGame = dynamic(() => import('@/components/simulations/class3/MapsLengthGame').then(m => m.MapsLengthGame), { ssr: false });
const C3WeightCapacityGame = dynamic(() => import('@/components/simulations/class3/WeightCapacityGame').then(m => m.WeightCapacityGame), { ssr: false });
const C3TimeCalendarGame = dynamic(() => import('@/components/simulations/class3/TimeCalendarGame').then(m => m.TimeCalendarGame), { ssr: false });
const C3DataPatternsGame = dynamic(() => import('@/components/simulations/class3/DataPatternsGame').then(m => m.DataPatternsGame), { ssr: false });

// Class 4 games
const C4FoodTeethGame = dynamic(() => import('@/components/simulations/class4/FoodTeethGame').then(m => m.FoodTeethGame), { ssr: false });
const C4DigestionGame = dynamic(() => import('@/components/simulations/class4/DigestionGame').then(m => m.DigestionGame), { ssr: false });
const C4AdaptationsGame = dynamic(() => import('@/components/simulations/class4/AdaptationsGame').then(m => m.AdaptationsGame), { ssr: false });
const C4PlantsAirGame = dynamic(() => import('@/components/simulations/class4/PlantsAirGame').then(m => m.PlantsAirGame), { ssr: false });
const C4SkinNervousGame = dynamic(() => import('@/components/simulations/class4/SkinNervousGame').then(m => m.SkinNervousGame), { ssr: false });
const C4MatterAirGame = dynamic(() => import('@/components/simulations/class4/MatterAirGame').then(m => m.MatterAirGame), { ssr: false });
const C4SolutionsFloatGame = dynamic(() => import('@/components/simulations/class4/SolutionsFloatGame').then(m => m.SolutionsFloatGame), { ssr: false });
const C4NumbersGame = dynamic(() => import('@/components/simulations/class4/NumbersGame').then(m => m.NumbersGame), { ssr: false });
const C4FractionsGame = dynamic(() => import('@/components/simulations/class4/FractionsGame').then(m => m.FractionsGame), { ssr: false });
const C4OperationsGame = dynamic(() => import('@/components/simulations/class4/OperationsGame').then(m => m.OperationsGame), { ssr: false });
const C4FactorsMultiplesGame = dynamic(() => import('@/components/simulations/class4/FactorsMultiplesGame').then(m => m.FactorsMultiplesGame), { ssr: false });
const C4ShapesSymmetryGame = dynamic(() => import('@/components/simulations/class4/ShapesSymmetryGame').then(m => m.ShapesSymmetryGame), { ssr: false });
const C4LinesMeasurementGame = dynamic(() => import('@/components/simulations/class4/LinesMeasurementGame').then(m => m.LinesMeasurementGame), { ssr: false });
const C4TimeDataPatternsGame = dynamic(() => import('@/components/simulations/class4/TimeDataPatternsGame').then(m => m.TimeDataPatternsGame), { ssr: false });
const C4LightGame = dynamic(() => import('@/components/simulations/class4/LightGame').then(m => m.LightGame), { ssr: false });
const C4MeasurementGame = dynamic(() => import('@/components/simulations/class4/MeasurementGame').then(m => m.MeasurementGame), { ssr: false });
const C4ForceFrictionGame = dynamic(() => import('@/components/simulations/class4/ForceFrictionGame').then(m => m.ForceFrictionGame), { ssr: false });
const C4ComputerMemoryGame = dynamic(() => import('@/components/simulations/class4/ComputerMemoryGame').then(m => m.ComputerMemoryGame), { ssr: false });
const C4WordFormattingGame = dynamic(() => import('@/components/simulations/class4/WordFormattingGame').then(m => m.WordFormattingGame), { ssr: false });
const C4InternetBrowserGame = dynamic(() => import('@/components/simulations/class4/InternetBrowserGame').then(m => m.InternetBrowserGame), { ssr: false });
const C4PowerPointGame = dynamic(() => import('@/components/simulations/class4/PowerPointGame').then(m => m.PowerPointGame), { ssr: false });
const C4AlgorithmsLogoGame = dynamic(() => import('@/components/simulations/class4/AlgorithmsLogoGame').then(m => m.AlgorithmsLogoGame), { ssr: false });
const C4LivingPlantsGame = dynamic(() => import('@/components/simulations/class4/LivingPlantsGame').then(m => m.LivingPlantsGame), { ssr: false });
const C4ChangesTransportGame = dynamic(() => import('@/components/simulations/class4/ChangesTransportGame').then(m => m.ChangesTransportGame), { ssr: false });
const C4EarthMotionsGame = dynamic(() => import('@/components/simulations/class4/EarthMotionsGame').then(m => m.EarthMotionsGame), { ssr: false });
const C4ContinentsOceansGame = dynamic(() => import('@/components/simulations/class4/ContinentsOceansGame').then(m => m.ContinentsOceansGame), { ssr: false });
const C4MapsIndiaGame = dynamic(() => import('@/components/simulations/class4/MapsIndiaGame').then(m => m.MapsIndiaGame), { ssr: false });
const C4IndiaClimateGame = dynamic(() => import('@/components/simulations/class4/IndiaClimateGame').then(m => m.IndiaClimateGame), { ssr: false });

// Class 5 games
const C5LargeNumbersGame = dynamic(() => import('@/components/simulations/class5/LargeNumbersGame').then(m => m.LargeNumbersGame), { ssr: false });
const C5LargeOperationsGame = dynamic(() => import('@/components/simulations/class5/LargeOperationsGame').then(m => m.LargeOperationsGame), { ssr: false });
const C5FractionsAdvancedGame = dynamic(() => import('@/components/simulations/class5/FractionsAdvancedGame').then(m => m.FractionsAdvancedGame), { ssr: false });
const C5DecimalsGame = dynamic(() => import('@/components/simulations/class5/DecimalsGame').then(m => m.DecimalsGame), { ssr: false });
const C5FactorsMultiGame = dynamic(() => import('@/components/simulations/class5/FactorsMultiGame').then(m => m.FactorsMultiGame), { ssr: false });
const C5IntegersGame = dynamic(() => import('@/components/simulations/class5/IntegersGame').then(m => m.IntegersGame), { ssr: false });
const C5AnglesSymmetryGame = dynamic(() => import('@/components/simulations/class5/AnglesSymmetryGame').then(m => m.AnglesSymmetryGame), { ssr: false });
const C5AreaPerimeterGame = dynamic(() => import('@/components/simulations/class5/AreaPerimeterGame').then(m => m.AreaPerimeterGame), { ssr: false });
const C5PercentageDataGame = dynamic(() => import('@/components/simulations/class5/PercentageDataGame').then(m => m.PercentageDataGame), { ssr: false });
const C5CirculatoryGame = dynamic(() => import('@/components/simulations/class5/CirculatoryGame').then(m => m.CirculatoryGame), { ssr: false });
const C5SkeletalGame = dynamic(() => import('@/components/simulations/class5/SkeletalGame').then(m => m.SkeletalGame), { ssr: false });
const C5HealthDiseasesGame = dynamic(() => import('@/components/simulations/class5/HealthDiseasesGame').then(m => m.HealthDiseasesGame), { ssr: false });
const C5PlantReproductionGame = dynamic(() => import('@/components/simulations/class5/PlantReproductionGame').then(m => m.PlantReproductionGame), { ssr: false });
const C5EcosystemWasteGame = dynamic(() => import('@/components/simulations/class5/EcosystemWasteGame').then(m => m.EcosystemWasteGame), { ssr: false });
const C5AgricultureHygieneGame = dynamic(() => import('@/components/simulations/class5/AgricultureHygieneGame').then(m => m.AgricultureHygieneGame), { ssr: false });
const C5StatesMatterGame = dynamic(() => import('@/components/simulations/class5/StatesMatterGame').then(m => m.StatesMatterGame), { ssr: false });
const C5MixturesSeparationGame = dynamic(() => import('@/components/simulations/class5/MixturesSeparationGame').then(m => m.MixturesSeparationGame), { ssr: false });
const C5ChangesAirGame = dynamic(() => import('@/components/simulations/class5/ChangesAirGame').then(m => m.ChangesAirGame), { ssr: false });
const C5SoundNoiseGame = dynamic(() => import('@/components/simulations/class5/SoundNoiseGame').then(m => m.SoundNoiseGame), { ssr: false });
const C5WorkEnergyGame = dynamic(() => import('@/components/simulations/class5/WorkEnergyGame').then(m => m.WorkEnergyGame), { ssr: false });
const C5LightEclipseGame = dynamic(() => import('@/components/simulations/class5/LightEclipseGame').then(m => m.LightEclipseGame), { ssr: false });
const C5SimpleMachinesGame = dynamic(() => import('@/components/simulations/class5/SimpleMachinesGame').then(m => m.SimpleMachinesGame), { ssr: false });
const C5ComputerHistoryGame = dynamic(() => import('@/components/simulations/class5/ComputerHistoryGame').then(m => m.ComputerHistoryGame), { ssr: false });
const C5SoftwareGame = dynamic(() => import('@/components/simulations/class5/SoftwareGame').then(m => m.SoftwareGame), { ssr: false });
const C5WordAdvancedGame = dynamic(() => import('@/components/simulations/class5/WordAdvancedGame').then(m => m.WordAdvancedGame), { ssr: false });
const C5PowerPointScratchGame = dynamic(() => import('@/components/simulations/class5/PowerPointScratchGame').then(m => m.PowerPointScratchGame), { ssr: false });
const C5InternetLogoGame = dynamic(() => import('@/components/simulations/class5/InternetLogoGame').then(m => m.InternetLogoGame), { ssr: false });
const C5LatLongGame = dynamic(() => import('@/components/simulations/class5/LatLongGame').then(m => m.LatLongGame), { ssr: false });
const C5IndiaLocationGame = dynamic(() => import('@/components/simulations/class5/IndiaLocationGame').then(m => m.IndiaLocationGame), { ssr: false });
const C5EnvironmentResourcesGame = dynamic(() => import('@/components/simulations/class5/EnvironmentResourcesGame').then(m => m.EnvironmentResourcesGame), { ssr: false });
const C5EconomyGame = dynamic(() => import('@/components/simulations/class5/EconomyGame').then(m => m.EconomyGame), { ssr: false });
const C5EnvironmentBodyGame = dynamic(() => import('@/components/simulations/class5/EnvironmentBodyGame').then(m => m.EnvironmentBodyGame), { ssr: false });
const C5WeatherBuildingsGame = dynamic(() => import('@/components/simulations/class5/WeatherBuildingsGame').then(m => m.WeatherBuildingsGame), { ssr: false });
const AtlasDragon = dynamic(
  () => import('@/components/sim-primitives/AtlasDragon').then(m => m.AtlasDragon),
  { ssr: false }
);

export default function SimTestPage() {
  const [score, setScore] = useState<number | null>(null);
  const [activeGame, setActiveGame] = useState<string>('dragon');
  const [dragonMood, setDragonMood] = useState<'idle' | 'celebrate' | 'thinking'>('idle');

  useEffect(() => {
    const unlock = () => {
      audioManager.unlock();
      speechManager.unlock();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-xl font-bold mb-4">Atlas — Interactive Learning</h1>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        <button
          onClick={() => { setScore(null); setActiveGame('dragon'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'dragon' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Meet Your Dragon</button>
        <button
          onClick={() => { setScore(null); setActiveGame('counting'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'counting' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Counting 1-20</button>
        <button
          onClick={() => { setScore(null); setActiveGame('shapes'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'shapes' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Shape Sorting</button>
        <button
          onClick={() => { setScore(null); setActiveGame('addition'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'addition' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Addition to 20</button>
        <button
          onClick={() => { setScore(null); setActiveGame('balance'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'balance' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Heavy or Light?</button>
        <button
          onClick={() => { setScore(null); setActiveGame('patterns'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'patterns' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Patterns</button>
        <button
          onClick={() => { setScore(null); setActiveGame('animals'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'animals' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Animals</button>
        <button
          onClick={() => { setScore(null); setActiveGame('plants'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'plants' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Plants</button>
        <button
          onClick={() => { setScore(null); setActiveGame('food'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'food' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Food & Health</button>
        <button
          onClick={() => { setScore(null); setActiveGame('safety'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'safety' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Safety Rules</button>
        <button
          onClick={() => { setScore(null); setActiveGame('cleanliness'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'cleanliness' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Cleanliness</button>
        <button
          onClick={() => { setScore(null); setActiveGame('air'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'air' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Air & Wind</button>
        <button
          onClick={() => { setScore(null); setActiveGame('transport'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'transport' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Transport</button>
        <button
          onClick={() => { setScore(null); setActiveGame('sunmoon'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'sunmoon' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Sun & Sky</button>
        <button
          onClick={() => { setScore(null); setActiveGame('water'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'water' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Water</button>
        <button
          onClick={() => { setScore(null); setActiveGame('body'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'body' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Body</button>
        <button
          onClick={() => { setScore(null); setActiveGame('planttypes'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'planttypes' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Plant Types</button>
        <button
          onClick={() => { setScore(null); setActiveGame('animaltypes'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'animaltypes' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Animal Types</button>
        <button
          onClick={() => { setScore(null); setActiveGame('earth'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'earth' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Earth & Weather</button>
        <button
          onClick={() => { setScore(null); setActiveGame('neighbourhood'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'neighbourhood' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Neighbourhood</button>
        <button
          onClick={() => { setScore(null); setActiveGame('compbasics'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'compbasics' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Computer Basics</button>
        <button
          onClick={() => { setScore(null); setActiveGame('compinput'); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeGame === 'compinput' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >Computer Input</button>
      </div>

      <h2 className="text-white/60 text-xs font-bold mt-2 mb-1">Class 2 Games</h2>
      <div className="flex gap-2 mb-4 flex-wrap justify-center max-w-4xl">
        <button onClick={() => { setScore(null); setActiveGame('c2-bodyfunctions'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-bodyfunctions' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Body & Senses</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-foodgroups'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-foodgroups' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Food Groups</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-plants'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-plants' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Plants & Uses</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-animals'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-animals' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Animals & Habitats</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-airclean'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-airclean' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Air & Health</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-water'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-water' ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Water & Storage</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-computerbasics'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-computerbasics' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Computer Basics</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-computerfiles'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-computerfiles' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Paint & Files</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-myenvironment'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-myenvironment' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>My Environment</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-safetyclean'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-safetyclean' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Safety & Clean</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-earthsun'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-earthsun' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Earth & Sun</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-directionsmap'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-directionsmap' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Directions & Maps</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-numbers'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-numbers' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Numbers to 999</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-addsub'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-addsub' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Add & Subtract</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-muldiv'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-muldiv' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Multiply & Divide</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-shapeslines'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-shapeslines' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Shapes & Lines</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-measurement'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-measurement' ? 'bg-sky-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Measurement</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-patterns'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-patterns' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Patterns & Graphs</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-airvehicles'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-airvehicles' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Air & Vehicles</button>
        <button onClick={() => { setScore(null); setActiveGame('c2-solarsystem'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c2-solarsystem' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Solar System</button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
        <span className="text-white/60 text-xs w-full text-center mt-2">Class 3 Games</span>
        <button onClick={() => { setScore(null); setActiveGame('c3-livingthings'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-livingthings' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Living Things</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-birds'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-birds' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Birds</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-insects'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-insects' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Insects</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-plants'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-plants' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Plants & Seeds</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-plantuses'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-plantuses' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Plant Uses</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-health'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-health' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Health</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-matter'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-matter' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Matter</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-watersun'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-watersun' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Water & Sun</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-computersystem'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-computersystem' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Computer System</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-windowsword'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-windowsword' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Windows & Word</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-internet'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-internet' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Internet</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-paintfiles'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-paintfiles' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Paint & Files</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-livingevs'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-livingevs' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Living EVS</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-earthsky'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-earthsky' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Earth & Sky</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-foodshelter'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-foodshelter' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Food & Shelter</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-globe'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-globe' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Globe</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-continents'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-continents' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Continents</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-directionsmaps'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-directionsmaps' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Directions</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-landforms'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-landforms' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Landforms</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-resources'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-resources' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Resources</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-floatsink'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-floatsink' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Float & Sink</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-sunenergy'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-sunenergy' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Sun Energy</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-numbers'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-numbers' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Numbers</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-addsub'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-addsub' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Add & Sub</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-muldiv'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-muldiv' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Mul & Div</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-mentalmath'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-mentalmath' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Mental Math</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-shapestessellation'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-shapestessellation' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Shapes</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-mapslength'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-mapslength' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Maps & Length</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-weightcapacity'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-weightcapacity' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Weight & Capacity</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-timecalendar'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-timecalendar' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Time & Calendar</button>
        <button onClick={() => { setScore(null); setActiveGame('c3-datapatterns'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c3-datapatterns' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Data & Patterns</button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
        <span className="text-white/60 text-xs w-full text-center mt-2">Class 4 Games</span>
        <button onClick={() => { setScore(null); setActiveGame('c4-foodteeth'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-foodteeth' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Food & Teeth</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-digestion'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-digestion' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Digestion</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-adaptations'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-adaptations' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Adaptations</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-plantsair'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-plantsair' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Plants & Air</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-skinnervous'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-skinnervous' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Skin & Nervous</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-matterair'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-matterair' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Matter & Air</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-solutionsfloat'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-solutionsfloat' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Solutions & Float</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-numbers'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-numbers' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>6-Digit Numbers</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-fractions'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-fractions' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Fractions</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-operations'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-operations' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Four Operations</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-factorsmultiples'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-factorsmultiples' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Factors & Multiples</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-shapessymmetry'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-shapessymmetry' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Shapes & Symmetry</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-linesmeasurement'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-linesmeasurement' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Lines & Measurement</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-timedatapatterns'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-timedatapatterns' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Time, Data & Patterns</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-light'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-light' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Light & Shadows</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-measurement'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-measurement' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Measurement</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-forcefriction'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-forcefriction' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Force & Friction</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-computermemory'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-computermemory' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Computer Memory</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-wordformatting'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-wordformatting' ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Word Formatting</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-internetbrowser'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-internetbrowser' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Internet & Browser</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-powerpoint'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-powerpoint' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>PowerPoint</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-algorithmslogo'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-algorithmslogo' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Algorithms & LOGO</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-livingplants'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-livingplants' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Living Things & Organs</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-changestransport'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-changestransport' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Changes & Transport</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-earthmotions'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-earthmotions' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Earth Motions</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-continentsoceans'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-continentsoceans' ? 'bg-blue-800 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Continents & Oceans</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-mapsindia'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-mapsindia' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Maps & India</button>
        <button onClick={() => { setScore(null); setActiveGame('c4-indiaclimate'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c4-indiaclimate' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>India Climate & Soils</button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
        <span className="text-white/60 text-xs w-full text-center mt-2">Class 5 Games</span>
        <button onClick={() => { setScore(null); setActiveGame('c5-largenumbers'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-largenumbers' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Large Numbers</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-largeoperations'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-largeoperations' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Large Operations</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-fractionsadv'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-fractionsadv' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Fractions Advanced</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-decimals'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-decimals' ? 'bg-violet-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Decimals</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-factorsmulti'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-factorsmulti' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Factors & Multiples</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-integers'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-integers' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Integers</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-anglessymmetry'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-anglessymmetry' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Angles & Symmetry</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-areaperimeter'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-areaperimeter' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Area & Perimeter</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-percentagedata'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-percentagedata' ? 'bg-rose-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Percentage & Data</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-circulatory'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-circulatory' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Circulatory</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-skeletal'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-skeletal' ? 'bg-gray-400 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Skeletal</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-healthdiseases'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-healthdiseases' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Health & Diseases</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-plantreproduction'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-plantreproduction' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Plant Reproduction</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-ecosystemwaste'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-ecosystemwaste' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Ecosystem & Waste</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-agriculturehygiene'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-agriculturehygiene' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Agriculture & Hygiene</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-statesmatter'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-statesmatter' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>States of Matter</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-mixturesseparation'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-mixturesseparation' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Mixtures & Separation</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-changesair'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-changesair' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Changes & Air</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-soundnoise'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-soundnoise' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Sound & Noise</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-workenergy'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-workenergy' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Work & Energy</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-lighteclipse'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-lighteclipse' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Light & Eclipse</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-simplemachines'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-simplemachines' ? 'bg-slate-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Simple Machines</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-computerhistory'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-computerhistory' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Computer History</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-software'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-software' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Software</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-wordadvanced'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-wordadvanced' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Word Advanced</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-powerpointscratch'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-powerpointscratch' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>PowerPoint & Scratch</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-internetlogo'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-internetlogo' ? 'bg-cyan-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Internet & LOGO</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-latlong'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-latlong' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Lat & Long</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-indialocation'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-indialocation' ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>India Location</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-environmentresources'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-environmentresources' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Environment & Resources</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-economy'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-economy' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Economy</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-environmentbody'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-environmentbody' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Environment & Body</button>
        <button onClick={() => { setScore(null); setActiveGame('c5-weatherbuildings'); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${activeGame === 'c5-weatherbuildings' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Weather & Buildings</button>
      </div>

      {activeGame === 'dragon' && (
        <div className="flex flex-col items-center gap-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-3xl p-8">
          <p className="text-white/80 text-sm">Your Atlas companion — name your dragon!</p>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-800/30 to-purple-800/30 p-6">
            <AtlasDragon mood={dragonMood} size={200} speaking="Hi! I'm your study buddy!" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDragonMood('idle')}
              className={`px-4 py-2 rounded-lg ${dragonMood === 'idle' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >Idle (Floating)</button>
            <button
              onClick={() => setDragonMood('celebrate')}
              className={`px-4 py-2 rounded-lg ${dragonMood === 'celebrate' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >Celebrate</button>
            <button
              onClick={() => setDragonMood('thinking')}
              className={`px-4 py-2 rounded-lg ${dragonMood === 'thinking' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >Thinking (Sat)</button>
          </div>
          <p className="text-white/40 text-xs">
            Rive-rendered • CC BY 4.0 — "Jellybean The Dragon" by alexsmithdesigns.uk
          </p>
        </div>
      )}

      {activeGame !== 'dragon' && (
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          {activeGame === 'counting' && (
            <CountingGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'shapes' && (
            <ShapeSortGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'addition' && (
            <AdditionGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'balance' && (
            <BalanceGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'patterns' && (
            <PatternsGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'animals' && (
            <AnimalsGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'plants' && (
            <PlantsGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'food' && (
            <FoodGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'safety' && (
            <SafetyGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'cleanliness' && (
            <CleanlinessGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'air' && (
            <AirGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'transport' && (
            <TransportGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'sunmoon' && (
            <SunMoonGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'water' && (
            <WaterGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'body' && (
            <BodyGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'planttypes' && (
            <PlantTypesGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'animaltypes' && (
            <AnimalTypesGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'earth' && (
            <EarthWeatherGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'neighbourhood' && (
            <NeighbourhoodGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'compbasics' && (
            <ComputerBasicsGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'compinput' && (
            <ComputerInputGame onComplete={(s) => setScore(s)} width={720} height={560} />
          )}
          {activeGame === 'c2-bodyfunctions' && <C2BodyFunctionsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-foodgroups' && <C2FoodGroupsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-plants' && <C2PlantsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-animals' && <C2AnimalsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-airclean' && <C2AirCleanGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-water' && <C2WaterGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-computerbasics' && <C2ComputerBasicsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-computerfiles' && <C2ComputerFilesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-myenvironment' && <C2MyEnvironmentGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-safetyclean' && <C2SafetyCleanGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-earthsun' && <C2EarthSunGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-directionsmap' && <C2DirectionsMapGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-numbers' && <C2NumbersGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-addsub' && <C2AddSubGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-muldiv' && <C2MulDivGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-shapeslines' && <C2ShapesLinesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-measurement' && <C2MeasurementGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-patterns' && <C2PatternsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-airvehicles' && <C2AirVehiclesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c2-solarsystem' && <C2SolarSystemGame onComplete={(s) => setScore(s)} width={720} height={560} />}

          {/* Class 3 games */}
          {activeGame === 'c3-livingthings' && <C3LivingThingsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-birds' && <C3BirdsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-insects' && <C3InsectsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-plants' && <C3PlantsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-plantuses' && <C3PlantUsesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-health' && <C3HealthGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-matter' && <C3MatterGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-watersun' && <C3WaterSunGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-computersystem' && <C3ComputerSystemGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-windowsword' && <C3WindowsWordGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-internet' && <C3InternetGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-paintfiles' && <C3PaintFilesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-livingevs' && <C3LivingEVSGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-earthsky' && <C3EarthSkyGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-foodshelter' && <C3FoodShelterGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-globe' && <C3GlobeGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-continents' && <C3ContinentsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-directionsmaps' && <C3DirectionsMapsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-landforms' && <C3LandformsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-resources' && <C3ResourcesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-floatsink' && <C3FloatSinkGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-sunenergy' && <C3SunEnergyGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-numbers' && <C3NumbersGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-addsub' && <C3AddSubGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-muldiv' && <C3MulDivGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-mentalmath' && <C3MentalMathGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-shapestessellation' && <C3ShapesTessellationGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-mapslength' && <C3MapsLengthGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-weightcapacity' && <C3WeightCapacityGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-timecalendar' && <C3TimeCalendarGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c3-datapatterns' && <C3DataPatternsGame onComplete={(s) => setScore(s)} width={720} height={560} />}

          {/* Class 4 games */}
          {activeGame === 'c4-foodteeth' && <C4FoodTeethGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-digestion' && <C4DigestionGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-adaptations' && <C4AdaptationsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-plantsair' && <C4PlantsAirGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-skinnervous' && <C4SkinNervousGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-matterair' && <C4MatterAirGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-solutionsfloat' && <C4SolutionsFloatGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-numbers' && <C4NumbersGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-fractions' && <C4FractionsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-operations' && <C4OperationsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-factorsmultiples' && <C4FactorsMultiplesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-shapessymmetry' && <C4ShapesSymmetryGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-linesmeasurement' && <C4LinesMeasurementGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-timedatapatterns' && <C4TimeDataPatternsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-light' && <C4LightGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-measurement' && <C4MeasurementGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-forcefriction' && <C4ForceFrictionGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-computermemory' && <C4ComputerMemoryGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-wordformatting' && <C4WordFormattingGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-internetbrowser' && <C4InternetBrowserGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-powerpoint' && <C4PowerPointGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-algorithmslogo' && <C4AlgorithmsLogoGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-livingplants' && <C4LivingPlantsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-changestransport' && <C4ChangesTransportGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-earthmotions' && <C4EarthMotionsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-continentsoceans' && <C4ContinentsOceansGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-mapsindia' && <C4MapsIndiaGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c4-indiaclimate' && <C4IndiaClimateGame onComplete={(s) => setScore(s)} width={720} height={560} />}

          {/* Class 5 games */}
          {activeGame === 'c5-largenumbers' && <C5LargeNumbersGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-largeoperations' && <C5LargeOperationsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-fractionsadv' && <C5FractionsAdvancedGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-decimals' && <C5DecimalsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-factorsmulti' && <C5FactorsMultiGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-integers' && <C5IntegersGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-anglessymmetry' && <C5AnglesSymmetryGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-areaperimeter' && <C5AreaPerimeterGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-percentagedata' && <C5PercentageDataGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-circulatory' && <C5CirculatoryGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-skeletal' && <C5SkeletalGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-healthdiseases' && <C5HealthDiseasesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-plantreproduction' && <C5PlantReproductionGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-ecosystemwaste' && <C5EcosystemWasteGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-agriculturehygiene' && <C5AgricultureHygieneGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-statesmatter' && <C5StatesMatterGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-mixturesseparation' && <C5MixturesSeparationGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-changesair' && <C5ChangesAirGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-soundnoise' && <C5SoundNoiseGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-workenergy' && <C5WorkEnergyGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-lighteclipse' && <C5LightEclipseGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-simplemachines' && <C5SimpleMachinesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-computerhistory' && <C5ComputerHistoryGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-software' && <C5SoftwareGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-wordadvanced' && <C5WordAdvancedGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-powerpointscratch' && <C5PowerPointScratchGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-internetlogo' && <C5InternetLogoGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-latlong' && <C5LatLongGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-indialocation' && <C5IndiaLocationGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-environmentresources' && <C5EnvironmentResourcesGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-economy' && <C5EconomyGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-environmentbody' && <C5EnvironmentBodyGame onComplete={(s) => setScore(s)} width={720} height={560} />}
          {activeGame === 'c5-weatherbuildings' && <C5WeatherBuildingsGame onComplete={(s) => setScore(s)} width={720} height={560} />}
        </div>
      )}

      {score !== null && (
        <p className="text-green-400 font-bold mt-4">Complete! Score: {score}/100</p>
      )}
    </div>
  );
}

