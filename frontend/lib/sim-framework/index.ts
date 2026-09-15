/**
 * Simulation Framework — Public API
 *
 * Import this to use the simulation engine:
 *   import { SimulationEngine, simulationRegistry } from '@/lib/sim-framework';
 */

export { SimulationEngine } from './SimulationEngine';
export { simulationRegistry } from './SimulationRegistry';
export type {
  SimulationPlugin,
  SimulationContext,
  SimulationStep,
  SimulationState,
  AdaptiveConfig,
  SimulationRegistry,
} from './types';

// ─── Auto-register all built-in plugins ──────────────────────
// This ensures plugins are available as soon as the framework is imported.

import './sims/MixingSimulation';
import './sims/CirculatorySimulation';
import './sims/PlantGrowthSimulation';
import './sims/PhysicalChemicalSimulation';
import './sims/NaturalDisasterSimulation';
import './sims/AirCompositionSimulation';
import './sims/EnvironmentSimulation';
import './sims/TransportSimulation';
import './sims/ComputerHistorySimulation';
import './sims/SandboxSimulation';
import './sims/AlgebraTilesSimulation';
import './sims/GeometryConstructionSimulation';
import './sims/GraphSimulation';
