const games = [
  'BodyFunctionsGame', 'FoodGroupsGame', 'PlantsGame', 'AnimalsGame', 'AirCleanGame',
  'WaterGame', 'ComputerBasicsGame', 'ComputerFilesGame', 'MyEnvironmentGame', 'SafetyCleanGame',
  'EarthSunGame', 'DirectionsMapGame', 'NumbersGame', 'AddSubGame', 'MulDivGame',
  'ShapesLinesGame', 'MeasurementGame', 'PatternsGame', 'AirVehiclesGame', 'SolarSystemGame'
];
const fs = require('fs');
const path = require('path');
let ok = 0;
let fail = 0;
for (const game of games) {
  const filePath = path.join('components', 'simulations', 'class2', game + '.tsx');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const hasUseClient = content.startsWith("'use client'");
    const hasDefaultExport = content.includes('export default');
    const exportMatch = content.match(/export function (\w+)/);
    const exportedName = exportMatch ? exportMatch[1] : 'NOT FOUND';
    const lines = content.split('\n').length;
    console.log(`${game}: lines=${lines} useClient=${hasUseClient} export=${exportedName} defaultExport=${hasDefaultExport}`);
    ok++;
  } else {
    console.log(`${game}: FILE NOT FOUND`);
    fail++;
  }
}
console.log(`\nTotal: ${ok} OK, ${fail} FAIL`);
