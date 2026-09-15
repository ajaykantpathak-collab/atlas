#!/usr/bin/env node
/**
 * Read-only diagnostic: runs tsc on the 17 tsc-only NEEDS REVIEW files
 * and reports the actual TypeScript errors for each.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const FRONTEND_DIR = path.join(__dirname, '..');

const tscOnlyFiles = [
  'C10_CommercialStudiesInternetBankingNeftSim',
  'C10_ComputerScienceJavaMathClassSim',
  'C10_HistoryCivicsNoncooperationProgrammeChauriSim',
  'C10_MathematicsQuadraticEquationsIntroductionSim',
  'C10_MathematicsLocusEquidistantFromSim',
  'C11_AccountancyCashBookSimpleSim',
  'C12_AppliedMathsAdjointInverseMatrixSim',
  'C12_HomeScienceIssuesConcernsAdolescentsSim',
  'C12_LegalStudiesStagesElementsCrimeSim',
  'C12_PhysicsElectricChargestypesSim',
  'C6_PhysicsRectilinearPropagationLightSim',
  'C7_HistoryCivicsMeaningmedievalBeginningSim',
  'C7_HistoryCivicsFivePillarsIslamSim',
  'C7_MathematicsUnderstandingShapesPairsSim',
  'C9_EconomicsDefinitionEconomicsAdamSim',
  'C9_EconomicsInterdependenceAgricultureIndustrySim',
  'C9_MathematicsSidesTriangleGreaterSim',
];

const TSC_CMD = `npx tsc --noEmit --skipLibCheck --jsx react-jsx --esModuleInterop --moduleResolution node --target es2020 --module esnext --strict false`;

for (const id of tscOnlyFiles) {
  const filePath = path.join(OUTPUT_DIR, `${id}.tsx`);
  const fileBase = path.basename(filePath);
  console.log(`\n=== ${id} ===`);
  try {
    execSync(`${TSC_CMD} "${filePath}"`, { cwd: FRONTEND_DIR, encoding: 'utf8', timeout: 30000 });
    console.log('  No errors');
  } catch (e) {
    const output = e.stdout || e.message || '';
    const errors = output.split('\n')
      .filter(l => l.includes('error TS') && l.includes(fileBase))
      .map(l => l.trim());
    if (errors.length === 0) {
      console.log('  No errors in generated file (only library errors)');
    } else {
      errors.forEach(err => console.log(`  ${err}`));
    }
  }
}
