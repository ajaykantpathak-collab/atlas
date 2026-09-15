'use client';

import { useRive } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

function RiveTest({ src, name, author }: { src: string; name: string; author: string }) {
  const [status, setStatus] = useState('loading...');
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    onLoad: () => setStatus('OK'),
    onLoadError: () => setStatus('ERROR'),
  });

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-xl">
      <p className="text-white text-sm font-bold">{name}</p>
      <p className="text-gray-400 text-xs">by {author}</p>
      <p className={`text-xs ${status === 'OK' ? 'text-green-400' : status === 'ERROR' ? 'text-red-400' : 'text-yellow-400'}`}>
        {status}
      </p>
      <div style={{ width: 200, height: 200, background: '#1a1a2e', borderRadius: 8 }} className="overflow-hidden">
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </div>
      <p className="text-gray-500 text-xs">CC BY 4.0</p>
    </div>
  );
}

export default function RivTestPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-white text-xl font-bold">Dog Characters — Pick One</h1>
      <p className="text-gray-400 text-sm">All CC BY 4.0 (free for commercial use with attribution)</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <RiveTest src="/rive/dog-mascot.riv" name="Dog Mascot" author="PraneethKawyaThathsara" />
        <RiveTest src="/rive/doggy-mascot.riv" name="Doggy Mascot Hello" author="Doodh" />
        <RiveTest src="/rive/interactive-dog.riv" name="Interactive Dog" author="jouri" />
        <RiveTest src="/rive/little-dog.riv" name="Little Dog" author="blackdeather666" />
        <RiveTest src="/rive/walking-dog.riv" name="Walking Dog" author="jiska.heringa" />
        <RiveTest src="/rive/atlas-dragon.riv" name="Jellybean Dragon" author="alexsmithdesigns.uk" />
      </div>
    </div>
  );
}
