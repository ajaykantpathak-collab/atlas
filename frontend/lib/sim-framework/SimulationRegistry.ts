/**
 * Simulation Registry
 *
 * A global registry where simulation plugins register themselves.
 * The SimulationEngine queries this registry to find the right plugin
 * for a given question.
 */

import type { SimulationPlugin, SimulationRegistry as ISimulationRegistry } from './types';

class SimulationRegistryImpl implements ISimulationRegistry {
  private plugins: SimulationPlugin[] = [];

  register(plugin: SimulationPlugin): void {
    // Avoid duplicate registration
    const existing = this.plugins.find(p => p.id === plugin.id);
    if (existing) {
      console.warn(`Simulation plugin "${plugin.id}" already registered, replacing.`);
      this.plugins = this.plugins.filter(p => p.id !== plugin.id);
    }
    this.plugins.push(plugin);
  }

  find(question: string, subject: string): SimulationPlugin | null {
    // First try subject-specific match
    const subjectMatch = this.plugins.find(
      p => p.subject === subject && p.canHandle(question, subject),
    );
    if (subjectMatch) return subjectMatch;

    // Then try any plugin that can handle it
    const anyMatch = this.plugins.find(p => p.canHandle(question, subject));
    return anyMatch || null;
  }

  getAll(): SimulationPlugin[] {
    return [...this.plugins];
  }
}

export const simulationRegistry = new SimulationRegistryImpl();
