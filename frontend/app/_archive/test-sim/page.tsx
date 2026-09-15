'use client';

import { useState } from 'react';
import LightRaySimulation from '../../components/simulations/c6_8/LightRaySimulation';
import CircuitBuilderSimulation from '../../components/simulations/c6_8/CircuitBuilderSimulation';

export default function TestSimPage() {
  const [active, setActive] = useState<'lightray' | 'circuit'>('lightray');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Simulation Preview</h1>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setActive('lightray')}
          style={{
            padding: '10px 24px',
            background: active === 'lightray' ? '#2196f3' : '#e0e0e0',
            color: active === 'lightray' ? 'white' : '#333',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px',
          }}
        >
          Light Ray
        </button>
        <button
          onClick={() => setActive('circuit')}
          style={{
            padding: '10px 24px',
            background: active === 'circuit' ? '#f44336' : '#e0e0e0',
            color: active === 'circuit' ? 'white' : '#333',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px',
          }}
        >
          Circuit Builder
        </button>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
        {active === 'lightray' && (
          <LightRaySimulation
            nodeId="c6_phy_020"
            title="Light and Reflection"
            definition="Light is a form of energy that travels in straight lines. When light hits a surface, it bounces back — this is called reflection. The angle of incidence equals the angle of reflection."
            eli5="Imagine throwing a ball at a wall. If you throw it straight on, it comes straight back. If you throw it at an angle, it bounces off at the same angle. Light works the same way."
            misconceptions={[
              { belief: 'The angle of reflection is different from the angle of incidence.', correction: 'The angle of reflection ALWAYS equals the angle of incidence. They are measured from the normal (perpendicular) to the mirror surface.' },
              { belief: 'Light bends when it hits a mirror.', correction: 'Light does not bend at a mirror — it reflects. Bending happens during refraction, not reflection.' },
            ]}
            diagnosticQuestions={[
              {
                number: 1, bloomLevel: 'recall',
                question: 'Use the simulation: set the Incident Angle Tilt slider to 25°. Look at the LIVE READOUT — what is the Angle of Reflection?',
                answer: '25', answerType: 'number', unit: '°',
                formula: '∠i = ∠r  (Law of Reflection)',
                working: 'Given: ∠i = 25°\nFormula: ∠i = ∠r\nTherefore: ∠r = 25°\n\nThe angle of incidence ALWAYS equals the angle of reflection. Both are measured from the NORMAL (the dashed perpendicular line), not from the mirror surface.',
                hint: 'The Law of Reflection states that the angle of incidence equals the angle of reflection. Look at the readout box in the top-left of the simulation.',
              },
              {
                number: 2, bloomLevel: 'apply',
                question: 'A concave mirror has focal length f = 20 cm. An object is placed 60 cm in front of it. Use the mirror formula to calculate the image distance v.',
                answer: '30', answerType: 'number', unit: 'cm',
                formula: '1/f = 1/u + 1/v   →   1/v = 1/f − 1/u',
                working: 'Given: f = 20 cm, u = 60 cm\nFormula: 1/v = 1/f − 1/u\n\nStep 1: 1/v = 1/20 − 1/60\nStep 2: Find common denominator (60):\n        1/v = 3/60 − 1/60\nStep 3: 1/v = 2/60 = 1/30\nStep 4: v = 30/1 = 30 cm\n\nThe image forms 30 cm in front of the mirror. Since v is positive, the image is REAL and INVERTED.',
                hint: 'Rearrange the mirror formula: 1/v = 1/f − 1/u. Substitute f = 20 and u = 60. Find a common denominator.',
              },
              {
                number: 3, bloomLevel: 'evaluate',
                question: 'Switch to Prism mode in the simulation. Increase the refractive index slider from 1.3 to 1.8. What happens to the spread of the colors? Explain WHY in your own words.',
                answer: 'spread', answerType: 'text', unit: '',
                formula: 'Refractive index n = sin(i) / sin(r). Higher n → more bending → wider spread.',
                working: 'When refractive index increases:\n1. Light bends MORE at each surface of the prism\n2. Each color bends by a different amount (violet bends most, red bends least)\n3. The DIFFERENCE in bending between colors increases\n4. So the rainbow spread becomes WIDER\n\nThis is called DISPERSION.',
                hint: 'Watch the rainbow rays as you drag the slider. Do the colors spread apart more or less?',
              },
            ]}
            masteryCriteria="Can state the law of reflection, measure angles from the normal, and predict reflected ray direction."
            onComplete={(score) => console.log('LightRay complete:', score)}
          />
        )}

        {active === 'circuit' && (
          <CircuitBuilderSimulation
            nodeId="c6_phy_032"
            title="Electric Circuits"
            definition="An electric circuit is a closed path through which electric current flows. It consists of a source (battery), a load (bulb), and a switch connected by wires. When the switch is closed, current flows and the bulb glows."
            eli5="Think of a circuit like a water pipe loop. The battery is the pump pushing water (electricity) through the pipe (wire). The bulb is like a water wheel that turns when water flows through it."
            misconceptions={[
              { belief: 'Current flows from the bulb back to the battery with the same energy.', correction: 'Current is the same everywhere in a series circuit, but energy is used by the bulb. Voltage drops across the bulb.' },
              { belief: 'A circuit with a gap still allows some current to flow.', correction: 'A gap means an open circuit. No current flows in an open circuit.' },
            ]}
            diagnosticQuestions={[
              {
                number: 1, bloomLevel: 'recall',
                question: 'Use the simulation: turn ON the switch. Look at the ammeter — what is the current reading when V = 6V and R = 4Ω?',
                answer: '1.5', answerType: 'number', unit: 'A',
                formula: 'Ohm\'s Law: I = V / R',
                working: 'Given: V = 6V, R = 4Ω\nFormula: I = V / R\nStep 1: I = 6 / 4\nStep 2: I = 1.5 A\n\nThe current is 1.5 amperes. You can verify this by checking the ammeter readout in the simulation.',
                hint: 'Use Ohm\'s Law: I = V ÷ R. The voltage is 6V and the resistance is 4Ω.',
              },
              {
                number: 2, bloomLevel: 'apply',
                question: 'If you increase the battery voltage to 12V while keeping R = 4Ω, what will the new current be?',
                answer: '3', answerType: 'number', unit: 'A',
                formula: 'I = V / R',
                working: 'Given: V = 12V, R = 4Ω\nFormula: I = V / R\nStep 1: I = 12 / 4\nStep 2: I = 3 A\n\nWhen voltage doubles (6→12) and resistance stays the same, current also doubles (1.5→3). This is because I is directly proportional to V when R is constant.',
                hint: 'Use the same formula I = V / R. Substitute V = 12 and R = 4.',
              },
              {
                number: 3, bloomLevel: 'evaluate',
                question: 'Calculate the power dissipated by the bulb when V = 6V and R = 4Ω. Which formula do you use and what is the answer?',
                answer: '9', answerType: 'number', unit: 'W',
                formula: 'P = V × I  or  P = V² / R  or  P = I² × R',
                working: 'Given: V = 6V, R = 4Ω, I = 1.5A (from Q1)\nFormula: P = V × I\nStep 1: P = 6 × 1.5\nStep 2: P = 9 W\n\nAlternatively using P = V²/R:\nP = 6² / 4 = 36 / 4 = 9 W\n\nBoth formulas give the same answer: 9 watts of power is dissipated by the bulb as heat and light.',
                hint: 'Power = Voltage × Current. You already know V = 6V and I = 1.5A from the first question.',
              },
            ]}
            masteryCriteria="Can build a simple circuit, identify open/closed circuits, and explain why current flows."
            onComplete={(score) => console.log('Circuit complete:', score)}
          />
        )}
      </div>
    </div>
  );
}
