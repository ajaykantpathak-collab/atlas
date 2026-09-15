'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

export default function DragonInspectPage() {
  const [info, setInfo] = useState<string>('loading...');
  const { rive, RiveComponent } = useRive({
    src: '/rive/jellybean-dragon.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
  });

  useEffect(() => {
    if (rive) {
      const lines: string[] = [];
      lines.push(`Artboard: ${(rive as any).artboardName || 'unknown'}`);
      lines.push(`Animation names: ${JSON.stringify(rive.animationNames)}`);
      lines.push(`State machine names: ${JSON.stringify(rive.stateMachineNames)}`);
      
      // Try to get state machine inputs
      try {
        const sm = rive.stateMachineInputs('State Machine 1');
        if (sm) {
          lines.push(`State machine inputs:`);
          sm.forEach(input => {
            lines.push(`  - ${input.name} (type: ${input.type}, value: ${input.value})`);
          });
        }
      } catch (e) {
        lines.push(`Error getting SM inputs: ${e}`);
      }
      
      setInfo(lines.join('\n'));
    }
  }, [rive]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-white text-xl font-bold">Jellybean Dragon Inspection</h1>
      <div style={{ width: 300, height: 300, background: '#1a1a2e', borderRadius: 12 }} className="overflow-hidden">
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </div>
      <pre className="text-green-400 text-sm bg-gray-800 p-4 rounded-xl whitespace-pre-wrap max-w-2xl">{info}</pre>
    </div>
  );
}
